import algosdk from 'algosdk';
import nacl from 'tweetnacl';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

async function deployGZCToken() {
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

    // 2. Pre-flight Check
    const accountInfo = await algod.accountInformation(address).do();
    const balance = Number(accountInfo.amount) / 1e6;
    
    console.log(`--- Deployment Start ---`);
    console.log(`Address : ${address}`);
    console.log(`Balance : ${balance.toFixed(2)} ALGO\n`);

    // 3. Compile Contracts
    const compile = async (filePath: string) => {
      const teal = fs.readFileSync(filePath, 'utf8');
      const result = await algod.compile(teal).do();
      return new Uint8Array(Buffer.from(result.result, 'base64'));
    };
    const approval = await compile('contracts/artifacts/GZCToken.approval.teal');
    const clear = await compile('contracts/artifacts/GZCToken.clear.teal');

    const sp = await algod.getTransactionParams().do();

    // Step 1: Creating Application
    console.log(`Step 1: Creating Application...`);
    const methodSelector = algosdk.ABIMethod.fromSignature('createApplication()void').getSelector();
    const createTxn = algosdk.makeApplicationCreateTxnFromObject({
      sender: address,
      suggestedParams: sp,
      approvalProgram: approval,
      clearProgram: clear,
      numGlobalByteSlices: 1,
      numGlobalInts: 1,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [methodSelector],
    });
    const { txid: cTxId } = await algod.sendRawTransaction(createTxn.signTxn(kp.secretKey)).do();
    const cResult = await algosdk.waitForConfirmation(algod, cTxId, 4);
    const appId = cResult.applicationIndex!;
    const appAddress = algosdk.getApplicationAddress(appId);
    console.log(`App Created! ID: ${appId} | Address: ${appAddress}\n`);

    // Step 2: Funding Contract GZC
    console.log(`Step 2: Funding Contract GZC (1 ALGO)...`);
    const fundTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: address,
      receiver: appAddress,
      amount: 1_000_000, 
      suggestedParams: sp,
    });
    const { txid: fTxId } = await algod.sendRawTransaction(fundTxn.signTxn(kp.secretKey)).do();
    await algosdk.waitForConfirmation(algod, fTxId, 4);
    console.log(` Contract Funded.\n`);

    // Step 3: Minting GZC Token (Bootstrap)
    console.log(`Step 3: Minting GZC Token...`);
    const bSp = await algod.getTransactionParams().do();
    bSp.fee = 2000n; bSp.flatFee = true; // Pool fee for the inner creation
    const bootstrapTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: address,
      appIndex: appId,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [algosdk.ABIMethod.fromSignature('bootstrap()void').getSelector()],
      suggestedParams: bSp,
    });
    const { txid: bTxId } = await algod.sendRawTransaction(bootstrapTxn.signTxn(kp.secretKey)).do();
    const bResult = await algosdk.waitForConfirmation(algod, bTxId, 4);
    const innerTxns = bResult.innerTxns as any[];
    const asaId = innerTxns?.[0]?.assetIndex;
    console.log(` Bootstrap Successful.\n`);

    //FINAL OUTPUT
    console.log(`---MISSION ACCOMPLISHED ---`);
    console.log(`App ID  : ${appId}`);
    console.log(`ASA ID  : ${asaId} (GZC Coin)`);
    console.log(`Address : ${appAddress}`);
    console.log(`Explorer: https://testnet.explorer.perawallet.app/application/${appId}`);

  } catch (err: any) {
    console.error(`\n ERROR: ${err.message}`);
  }
}

deployGZCToken();