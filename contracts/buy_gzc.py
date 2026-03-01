"""
Buy GZC tokens from the GZCToken contract by sending ALGO.
The GZCToken contract exchanges ALGO for GZC at 1:1 (microunits).
"""
import os, algosdk
from algosdk.v2client import algod
from algosdk.transaction import (
    PaymentTxn, ApplicationCallTxn, wait_for_confirmation
)
from dotenv import load_dotenv

load_dotenv()

GZC_APP_ID  = 756356382
GZC_ASA_ID  = int(os.getenv("GZC_ASA_ID", "756356387"))
# Buy GZC with 1 ALGO — new rate: 1 ALGO = 1,000,000 GZC
BUY_AMOUNT  = 1_000_000  # 1 ALGO in microALGO

mnemonic = os.getenv("DEPLOYER_MNEMONIC")
if not mnemonic:
    print("Error: DEPLOYER_MNEMONIC not set in .env")
    exit(1)

sk          = algosdk.mnemonic.to_private_key(mnemonic)
address     = algosdk.account.address_from_private_key(sk)
gzc_app_addr = algosdk.logic.get_application_address(GZC_APP_ID)

client = algod.AlgodClient("", "https://testnet-api.algonode.cloud")

# Check deployer ALGO balance 
acct = client.account_info(address)
algo_balance = acct.get("amount", 0)
print(f"Deployer: {address}")
print(f"ALGO balance: {algo_balance / 1_000_000} ALGO")

# Check if deployer is opted into GZC
assets = acct.get("assets", [])
gzc_holding = next((a for a in assets if a["asset-id"] == GZC_ASA_ID), None)

if not gzc_holding:
    print("\nDeployer not opted into GZC. Opting in first...")
    sp = client.suggested_params()
    from algosdk.transaction import AssetTransferTxn
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
else:
    print(f"GZC balance: {gzc_holding['amount'] / 1_000_000} GZC")

# buyGZC requires an atomic group: PaymentTxn + ApplicationCallTxn
# The payment goes to the GZCToken contract, and the app call triggers buyGZC
sp = client.suggested_params()

# Check GZCToken contract's GZC reserve
gzc_acct = client.account_info(gzc_app_addr)
gzc_reserve = next((a for a in gzc_acct.get("assets", []) if a["asset-id"] == GZC_ASA_ID), None)
reserve_amount = gzc_reserve["amount"] if gzc_reserve else 0
print(f"\nGZCToken contract address: {gzc_app_addr}")
print(f"GZC reserve: {reserve_amount / 1_000_000} GZC")
print(f"Contract ALGO balance: {gzc_acct.get('amount', 0) / 1_000_000} ALGO")

# Adjust buy amount to what we can afford and what's available
max_algo = algo_balance - 1_000_000  # Keep 1 ALGO for fees
actual_buy = min(BUY_AMOUNT, max_algo, reserve_amount)
if actual_buy <= 0:
    print("\n❌ Not enough ALGO or GZC reserve is empty")
    exit(1)

print(f"\nBuying {actual_buy / 1_000_000} GZC for {actual_buy / 1_000_000} ALGO...")

# Step 1: Payment to GZCToken contract
pay_txn = PaymentTxn(
    sender=address,
    receiver=gzc_app_addr,
    amt=actual_buy,
    sp=sp,
)

# Step 2: Application call to buyGZC
# buyGZC(payment: PayTxn) - the payment txn is a preceding txn in the group
from algosdk.abi import Method as ABIMethod
method_selector = ABIMethod.from_signature("buyGZC(pay)void").get_selector()
app_sp = client.suggested_params()
app_sp.fee = 2000  # Cover inner asset transfer fee
app_sp.flat_fee = True

app_txn = ApplicationCallTxn(
    sender=address,
    index=GZC_APP_ID,
    on_complete=algosdk.transaction.OnComplete.NoOpOC,
    app_args=[method_selector],
    foreign_assets=[GZC_ASA_ID],
    sp=app_sp,
)

# Group the transactions
gid = algosdk.transaction.calculate_group_id([pay_txn, app_txn])
pay_txn.group = gid
app_txn.group = gid

# Sign and send
signed_pay = pay_txn.sign(sk)
signed_app = app_txn.sign(sk)

txid = client.send_transactions([signed_pay, signed_app])
wait_for_confirmation(client, txid, 4)

print(f"✅ Bought GZC! TX: {txid}")

# Final balance check
acct = client.account_info(address)
gzc = next((a for a in acct.get("assets", []) if a["asset-id"] == GZC_ASA_ID), None)
print(f"\nDeployer GZC balance: {gzc['amount'] / 1_000_000 if gzc else 0} GZC")
print(f"Deployer ALGO balance: {acct.get('amount', 0) / 1_000_000} ALGO")
