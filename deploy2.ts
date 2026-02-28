import algosdk from 'algosdk';
import nacl from 'tweetnacl';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

async function deployIntegrityExam() {
  try {
    // 1. Setup Account from HEX Seed
    const hexSeed = process.env.SECRET_KEY;

    if (!hexSeed || hexSeed.length !== 64) {
        throw new Error(" ERROR: SECRET_KEY not found in .env or is not a valid 32-byte (64 char) hex string.");
    }
    const seedBytes = new Uint8Array(Buffer.from(hexSeed, 'hex'));
    const kp = seedBytes.length === 32 
      ? nacl.sign.keyPair.fromSeed(seedBytes) 
      : { secretKey: seedBytes, publicKey: seedBytes.slice(32) };
    
    const address = algosdk.encodeAddress(kp.publicKey);
    const algod = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '443');

    // 2. Get GZC ASA ID from environment
    const gzcAsaId = process.env.GZC_ASA_ID;
    if (!gzcAsaId || isNaN(Number(gzcAsaId)) || Number(gzcAsaId) <= 0) {
      throw new Error(" ERROR: GZC_ASA_ID not found in .env or is not a valid positive integer.");
    }
    const assetId = BigInt(gzcAsaId);

    // 3. Pre-flight Check
    const accountInfo = await algod.accountInformation(address).do();
    const balance = Number(accountInfo.amount) / 1e6;
    
    console.log(`--- IntegrityExam Deployment Start ---`);
    console.log(`Address    : ${address}`);
    console.log(`Balance    : ${balance.toFixed(2)} ALGO`);
    console.log(`GZC ASA ID : ${assetId}\n`);

    // 4. Compile Contracts
    const compile = async (filePath: string) => {
      const teal = fs.readFileSync(filePath, 'utf8');
      const result = await algod.compile(teal).do();
      return new Uint8Array(Buffer.from(result.result, 'base64'));
    };
    const approval = await compile('contracts/artifacts/IntegrityExam.approval.teal');
    const clear = await compile('contracts/artifacts/IntegrityExam.clear.teal');

    const sp = await algod.getTransactionParams().do();

    // Step 1: Creating Application
    console.log(`Step 1: Creating Application...`);
    const methodSelector = algosdk.ABIMethod.fromSignature('createApplication(uint64)void').getSelector();
    // Encode the asset ID as a uint64 (8 bytes big-endian)
    const assetArg = algosdk.encodeUint64(assetId);
    
    const createTxn = algosdk.makeApplicationCreateTxnFromObject({
      sender: address,
      suggestedParams: sp,
      approvalProgram: approval,
      clearProgram: clear,
      numGlobalByteSlices: 0,
      numGlobalInts: 2,
      numLocalByteSlices: 0,
      numLocalInts: 4,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [methodSelector, assetArg],
    });
    const { txid: cTxId } = await algod.sendRawTransaction(createTxn.signTxn(kp.secretKey)).do();
    const cResult = await algosdk.waitForConfirmation(algod, cTxId, 4);
    const appId = cResult.applicationIndex!;
    const appAddress = algosdk.getApplicationAddress(appId);
    console.log(`App Created! ID: ${appId} | Address: ${appAddress}\n`);

    // Step 2: Funding Contract (for MBR + inner txn fees)
    console.log(`Step 2: Funding Contract (0.5 ALGO)...`);
    const fundSp = await algod.getTransactionParams().do();
    const fundTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: address,
      receiver: appAddress,
      amount: 500_000,
      suggestedParams: fundSp,
    });
    const { txid: fTxId } = await algod.sendRawTransaction(fundTxn.signTxn(kp.secretKey)).do();
    await algosdk.waitForConfirmation(algod, fTxId, 4);
    console.log(` Contract Funded.\n`);

    // Step 3: Opt-in Contract to GZC ASA
    console.log(`Step 3: Opting Contract into GZC ASA...`);
    const optInSp = await algod.getTransactionParams().do();
    optInSp.fee = 2000n; optInSp.flatFee = true; // Cover inner txn fee
    const optInTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: address,
      appIndex: appId,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [algosdk.ABIMethod.fromSignature('optInToAsset()void').getSelector()],
      foreignAssets: [assetId],
      suggestedParams: optInSp,
    });
    const { txid: oTxId } = await algod.sendRawTransaction(optInTxn.signTxn(kp.secretKey)).do();
    await algosdk.waitForConfirmation(algod, oTxId, 4);
    console.log(` Contract opted into GZC ASA.\n`);

    // FINAL OUTPUT
    console.log(`--- MISSION ACCOMPLISHED ---`);
    console.log(`App ID      : ${appId}`);
    console.log(`App Address : ${appAddress}`);
    console.log(`GZC ASA ID  : ${assetId}`);
    console.log(`Explorer    : https://testnet.explorer.perawallet.app/application/${appId}`);

    // Save deployment info
    const deploymentInfo = {
      appId: Number(appId),
      appAddress,
      gzcAsaId: Number(assetId),
      creator: address,
      deployedAt: new Date().toISOString(),
    };
    fs.writeFileSync(
      'contracts/artifacts/exam_integrity_deployment.json',
      JSON.stringify(deploymentInfo, null, 2)
    );
    console.log(`\nDeployment info saved to contracts/artifacts/exam_integrity_deployment.json`);

  } catch (err: any) {
    console.error(`\n ERROR: ${err.message}`);
  }
}

deployIntegrityExam();
