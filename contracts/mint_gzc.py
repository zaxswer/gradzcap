"""
Mint GZC tokens to the deployer address.
The deployer must be the manager/reserve of the GZC ASA.
"""
import os, algosdk
from algosdk.transaction import AssetTransferTxn, wait_for_confirmation
from algosdk.v2client import algod
from dotenv import load_dotenv

load_dotenv()

GZC_ASA_ID = int(os.getenv("GZC_ASA_ID", "756321188"))
MINT_AMOUNT = 1_000_000_000_000  # 1,000,000 GZC (6 decimals)

mnemonic = os.getenv("DEPLOYER_MNEMONIC")
if not mnemonic:
    print("Error: DEPLOYER_MNEMONIC not set in .env")
    exit(1)

sk      = algosdk.mnemonic.to_private_key(mnemonic)
address = algosdk.account.address_from_private_key(sk)

client = algod.AlgodClient("", "https://testnet-api.algonode.cloud")

# Check asset info
asset_info = client.asset_info(GZC_ASA_ID)
params = asset_info.get("params", {})
print(f"Asset: {params.get('name', 'Unknown')} (ID: {GZC_ASA_ID})")
print(f"  Total supply: {params.get('total', 0) / 1_000_000}")
print(f"  Decimals: {params.get('decimals', 0)}")
print(f"  Creator: {params.get('creator', 'N/A')}")
print(f"  Manager: {params.get('manager', 'N/A')}")
print(f"  Reserve: {params.get('reserve', 'N/A')}")
print(f"  Clawback: {params.get('clawback', 'N/A')}")
print(f"Deployer: {address}")

# Check if deployer is opted in
acct = client.account_info(address)
gzc = next((a for a in acct.get("assets", []) if a["asset-id"] == GZC_ASA_ID), None)
if gzc:
    print(f"Deployer GZC balance: {gzc['amount'] / 1_000_000}")
else:
    print("Deployer is NOT opted into GZC. Opting in first...")
    sp = client.suggested_params()
    opt_txn = AssetTransferTxn(
        sender=address,
        receiver=address,
        index=GZC_ASA_ID,
        amt=0,
        sp=sp,
    )
    txid = client.send_transaction(opt_txn.sign(sk))
    wait_for_confirmation(client, txid, 4)
    print(f"Opted in! TX: {txid}")

# If deployer is the reserve address, they can mint (clawback from reserve)
reserve = params.get("reserve", "")
clawback = params.get("clawback", "")

sp = client.suggested_params()

if reserve == address:
    print(f"\nDeployer IS the reserve address. Minting {MINT_AMOUNT / 1_000_000} GZC...")
    # "Minting" for ASAs = sending from the reserve address
    # The reserve address holds the unminted supply
    txn = AssetTransferTxn(
        sender=address,
        receiver=address,
        index=GZC_ASA_ID,
        amt=MINT_AMOUNT,
        sp=sp,
    )
    txid = client.send_transaction(txn.sign(sk))
    wait_for_confirmation(client, txid, 4)
    print(f"✅ Minted! TX: {txid}")
elif clawback == address:
    print(f"\nDeployer IS the clawback address. Clawback-minting {MINT_AMOUNT / 1_000_000} GZC...")
    txn = AssetTransferTxn(
        sender=address,
        receiver=address,
        index=GZC_ASA_ID,
        amt=MINT_AMOUNT,
        revocation_target=reserve if reserve else params.get("creator", ""),
        sp=sp,
    )
    txid = client.send_transaction(txn.sign(sk))
    wait_for_confirmation(client, txid, 4)
    print(f"✅ Minted via clawback! TX: {txid}")
else:
    print(f"\n❌ Deployer is NOT the reserve ({reserve}) or clawback ({clawback}).")
    print("   Cannot mint. The GZC tokens must be sent from the reserve address.")

# Final balance check
acct = client.account_info(address)
gzc = next((a for a in acct.get("assets", []) if a["asset-id"] == GZC_ASA_ID), None)
print(f"\nDeployer GZC balance: {gzc['amount'] / 1_000_000 if gzc else 0} GZC")
