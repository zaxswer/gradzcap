import os, algosdk
from algosdk.transaction import AssetTransferTxn, wait_for_confirmation
from algosdk.v2client import algod
from dotenv import load_dotenv

load_dotenv()

APP_ID     = int(os.getenv("APP_ID", "756353912"))
GZC_ASA_ID = int(os.getenv("GZC_ASA_ID", "756321188"))
AMOUNT     = 100_000_000_000  # 100,000 GZC (6 decimals) for demo pool

mnemonic = os.getenv("DEPLOYER_MNEMONIC")
if not mnemonic:
    print("Error: DEPLOYER_MNEMONIC not set in .env")
    exit(1)

sk      = algosdk.mnemonic.to_private_key(mnemonic)
address = algosdk.account.address_from_private_key(sk)
app_address = algosdk.logic.get_application_address(APP_ID)

client = algod.AlgodClient("", "https://testnet-api.algonode.cloud")
sp     = client.suggested_params()

# Check deployer's GZC balance first
acct_info = client.account_info(address)
gzc_holding = next((a for a in acct_info.get("assets", []) if a["asset-id"] == GZC_ASA_ID), None)
deployer_balance = gzc_holding["amount"] if gzc_holding else 0
print(f"Deployer address: {address}")
print(f"Deployer GZC balance: {deployer_balance / 1_000_000} GZC")

# Check contract's current GZC balance
contract_info = client.account_info(app_address)
contract_gzc = next((a for a in contract_info.get("assets", []) if a["asset-id"] == GZC_ASA_ID), None)
contract_balance = contract_gzc["amount"] if contract_gzc else 0
print(f"Contract address: {app_address}")
print(f"Contract GZC balance: {contract_balance / 1_000_000} GZC")

if deployer_balance < AMOUNT:
    print(f"\n❌ Deployer only has {deployer_balance / 1_000_000} GZC, need {AMOUNT / 1_000_000} GZC")
    print("   Adjust AMOUNT or mint more GZC tokens first.")
    exit(1)

print(f"\nSending {AMOUNT / 1_000_000} GZC to contract {app_address}...")

txn    = AssetTransferTxn(
    sender=address,
    receiver=app_address,
    index=GZC_ASA_ID,
    amt=AMOUNT,
    sp=sp,
)
txid   = client.send_transaction(txn.sign(sk))
wait_for_confirmation(client, txid, 4)
print(f"✅ Funded! TX: {txid}")
print(f"   Contract now has {(contract_balance + AMOUNT) / 1_000_000} GZC for demo claims")
