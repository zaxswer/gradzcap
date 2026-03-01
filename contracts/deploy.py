import os
from pathlib import Path
from dotenv import load_dotenv
import algosdk
from algosdk.transaction import PaymentTxn, wait_for_confirmation
from algokit_utils import AlgorandClient, SigningAccount
from algokit_utils.applications.app_factory import AppFactory, AppFactoryParams
from algokit_utils.applications.app_client import AppClientMethodCallCreateParams
import json

load_dotenv()

# ── Setup ─────────────────────────────────────────────────────
algorand    = AlgorandClient.testnet()
mnemonic    = os.getenv("DEPLOYER_MNEMONIC")
GZC_ASA_ID  = int(os.getenv("GZC_ASA_ID", "756321188"))

if not mnemonic:
    print("Error: DEPLOYER_MNEMONIC not set in .env")
    exit(1)

private_key     = algosdk.mnemonic.to_private_key(mnemonic)
deployer_addr   = algosdk.account.address_from_private_key(private_key)
signing_account = SigningAccount(private_key=private_key, address=deployer_addr)
print(f"Deployer : {deployer_addr}")

# ── Load ARC-56 spec ──────────────────────────────────────────
app_spec_path = Path(__file__).parent / "out" / "IntegrityExam.arc56.json"
if not app_spec_path.exists():
    print(f"Error: {app_spec_path} not found.")
    print("Run: puya contracts/IntegrityExam.py --out-dir contracts/out")
    exit(1)

app_spec = json.loads(app_spec_path.read_text())

# ── Deploy ────────────────────────────────────────────────────
def deploy():
    print("Deploying IntegrityExam to Algorand Testnet...")
    try:
        factory = AppFactory(AppFactoryParams(
            algorand=algorand,
            app_spec=app_spec,
            default_sender=deployer_addr,
            default_signer=signing_account.signer,
        ))

        app_client, result = factory.deploy(
            create_params=AppClientMethodCallCreateParams(
                method="create_application",
                args=[GZC_ASA_ID],
            ),
            on_schema_break="append",
            on_update="append",
        )

        # ✅ get app_id and app_address directly from app_client
        app_id      = app_client.app_id
        app_address = app_client.app_address

        print(f"\n{'='*40}")
        print(f"App ID      : {app_id}")
        print(f"App Address : {app_address}")
        print(f"GZC ASA ID  : {GZC_ASA_ID}")
        print(f"{'='*40}")

        # ── Fund contract with 2 ALGO ─────────────────────────
        print("\nFunding contract with 2 ALGO...")
        sp  = algorand.client.algod.suggested_params()
        txn = PaymentTxn(
            sender=deployer_addr,
            receiver=app_address,
            amt=2_000_000,
            sp=sp,
        )
        txid = algorand.client.algod.send_transaction(txn.sign(private_key))
        wait_for_confirmation(algorand.client.algod, txid, 4)
        print(f"Funded! TX : {txid}")

        # ── Opt contract into GZC ASA ─────────────────────────
        print("\nOpting contract into GZC ASA...")
        app_client.send.opt_in_to_asset(args=[GZC_ASA_ID])
        print("Contract opted into GZC!")

        print("\n✅ Deployment complete!")
        print(f"   App ID      : {app_id}")
        print(f"   App Address : {app_address}")
        print(f"   GZC ASA ID  : {GZC_ASA_ID}")

    except Exception as e:
        import traceback
        print(f"\n❌ Deployment Failed: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    deploy()