import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"
import fs from "fs"
import path from "path"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const ALGOD_TOKEN = ""

const APP_ID = Number(process.env.APP_ID || process.env.NEXT_PUBLIC_CONTRACT_APP_ID)
const DATA_DIR = path.join(process.cwd(), "data", "certificates")

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// POST /api/quiz/complete — save local JSON and trigger on-chain certificate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      userAddress, 
      finalMarks, 
      totalQuestions, 
      correctAnswers, 
      passed, 
      cheated,
      timeSpent 
    } = body

    if (!userAddress || typeof userAddress !== "string") {
      return NextResponse.json({ error: "User address is required" }, { status: 400 })
    }

    // Save local JSON file
    const timestamp = Date.now()
    const certificateData = {
      walletAddress: userAddress,
      timestamp,
      date: new Date(timestamp).toISOString(),
      finalMarks,
      totalQuestions,
      correctAnswers,
      passed,
      cheated,
      timeSpent,
      score: Math.round((correctAnswers / totalQuestions) * 100),
    }

    const fileName = `${userAddress}_${timestamp}.json`
    const filePath = path.join(DATA_DIR, fileName)
    fs.writeFileSync(filePath, JSON.stringify(certificateData, null, 2))

    // If passed, trigger on-chain certificate minting
    // If failed, trigger on-chain slashing
    let nftId = 0
    let txid = ""
    
    if (passed && !cheated) {
      // PASSED: mint NFT, return stake, give scholarship
      const mnemonic = process.env.DEPLOYER_MNEMONIC
      if (!mnemonic) {
        return NextResponse.json({ error: "Contract call not configured" }, { status: 500 })
      }
      
      const deployer = algosdk.mnemonicToSecretKey(mnemonic)
      const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)

      try {
        const sp = await algod.getTransactionParams().do()
        
        // Helper to get box names
        const getStudentBoxName = (address: string): Uint8Array => {
          const prefix = new Uint8Array([0x73]) // "s" prefix
          const addrBytes = algosdk.decodeAddress(address).publicKey
          return new Uint8Array([...prefix, ...addrBytes])
        }
        
        const getCertBoxName = (address: string): Uint8Array => {
          const prefix = new Uint8Array([0x63]) // "c" prefix
          const addrBytes = algosdk.decodeAddress(address).publicKey
          return new Uint8Array([...prefix, ...addrBytes])
        }

        const completeMethod = new algosdk.ABIMethod({
          name: "complete_exam",
          args: [
            { type: "address", name: "student" },
            { type: "uint64", name: "final_marks" },
            { type: "uint64", name: "total_q" },
          ],
          returns: { type: "uint64" },
        })

        const atc = new algosdk.AtomicTransactionComposer()
        atc.addMethodCall({
          appID: APP_ID,
          method: completeMethod,
          methodArgs: [userAddress, finalMarks, totalQuestions],
          sender: deployer.addr,
          signer: algosdk.makeBasicAccountTransactionSigner(deployer),
          suggestedParams: { ...sp, fee: 4000, flatFee: true },
          boxes: [
            { appIndex: APP_ID, name: getStudentBoxName(userAddress) },
            { appIndex: APP_ID, name: getCertBoxName(userAddress) },
          ],
        })

        const result = await atc.execute(algod, 4)
        txid = result.txIDs[0]
        
        // Extract NFT ID from return value
        if (result.methodResults && result.methodResults[0]) {
          const returnValue = result.methodResults[0].returnValue
          if (returnValue) {
            nftId = Number(returnValue)
          }
        }

        return NextResponse.json({
          success: true,
          saved: true,
          filePath: fileName,
          nftId,
          txid,
          certificateData,
        })
      } catch (e: any) {
        console.error("[complete exam - passed]", e)
        return NextResponse.json({ 
          error: `Certificate minting failed: ${e.message}`,
          saved: true,
          filePath: fileName,
        }, { status: 500 })
      }
    } else {
      // FAILED or CHEATED: slash stake to 0, no NFT
      const mnemonic = process.env.DEPLOYER_MNEMONIC
      if (mnemonic) {
        const deployer = algosdk.mnemonicToSecretKey(mnemonic)
        const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)

        try {
          const sp = await algod.getTransactionParams().do()
          
          const getStudentBoxName = (address: string): Uint8Array => {
            const prefix = new Uint8Array([0x73])
            const addrBytes = algosdk.decodeAddress(address).publicKey
            return new Uint8Array([...prefix, ...addrBytes])
          }

          const recordCheatMethod = new algosdk.ABIMethod({
            name: "record_cheat",
            args: [{ type: "address", name: "student" }],
            returns: { type: "void" },
          })

          const completeMethod = new algosdk.ABIMethod({
            name: "complete_exam",
            args: [
              { type: "address", name: "student" },
              { type: "uint64", name: "final_marks" },
              { type: "uint64", name: "total_q" },
            ],
            returns: { type: "uint64" },
          })

          const boxRef = { appIndex: APP_ID, name: getStudentBoxName(userAddress) }

          // Call 1: record_cheat (slashes stake to 0)
          const atc1 = new algosdk.AtomicTransactionComposer()
          atc1.addMethodCall({
            appID: APP_ID,
            method: recordCheatMethod,
            methodArgs: [userAddress],
            sender: deployer.addr,
            signer: algosdk.makeBasicAccountTransactionSigner(deployer),
            suggestedParams: { ...sp, fee: 2000, flatFee: true },
            boxes: [boxRef],
          })
          await atc1.execute(algod, 4)

          // Call 2: complete_exam with 0 marks (deletes record, keeps slashed stake)
          const atc2 = new algosdk.AtomicTransactionComposer()
          atc2.addMethodCall({
            appID: APP_ID,
            method: completeMethod,
            methodArgs: [userAddress, 0, totalQuestions],
            sender: deployer.addr,
            signer: algosdk.makeBasicAccountTransactionSigner(deployer),
            suggestedParams: { ...sp, fee: 2000, flatFee: true },
            boxes: [boxRef],
          })
          const result = await atc2.execute(algod, 4)
          txid = result.txIDs[0]
        } catch (e: any) {
          console.error("[complete exam - failed]", e)
          // Non-fatal - local JSON is still saved
        }
      }

      return NextResponse.json({
        success: true,
        saved: true,
        filePath: fileName,
        nftId: 0,
        txid,
        certificateData,
      })
    }
  } catch (error: any) {
    console.error("Complete exam error:", error)
    return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 })
  }
}

// GET /api/quiz/complete?address=WALLET — get certificate history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    if (!address) {
      return NextResponse.json({ error: "Address parameter required" }, { status: 400 })
    }

    // Find all certificate files for this address
    const files = fs.readdirSync(DATA_DIR)
    const userFiles = files.filter(f => f.startsWith(address))
    
    const certificates = userFiles.map(fileName => {
      const filePath = path.join(DATA_DIR, fileName)
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"))
      return { fileName, ...data }
    }).sort((a, b) => b.timestamp - a.timestamp)

    return NextResponse.json({
      address,
      totalAttempts: certificates.length,
      passedAttempts: certificates.filter(c => c.passed).length,
      certificates,
    })
  } catch (error: any) {
    console.error("Get certificate error:", error)
    return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 })
  }
}
