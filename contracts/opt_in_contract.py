import os, algosdk
from dotenv import load_dotenv
from algokit_utils import AlgorandClient, SigningAccount
from algokit_utils.applications.app_client import (
    AppClient, AppClientParams, AppClientMethodCallParams
)
from algokit_utils.models.amount import AlgoAmount
import json
from pathlib import Path

load_dotenv()

algorand        = AlgorandClient.testnet()
private_key     = algosdk.mnemonic.to_private_key(os.getenv("DEPLOYER_MNEMONIC"))
deployer_addr   = algosdk.account.address_from_private_key(private_key)
signing_account = SigningAccount(private_key=private_key, address=deployer_addr)
app_spec        = json.loads((Path(__file__).parent / "out" / "IntegrityExam.arc56.json").read_text())
GZC_ASA_ID      = int(os.getenv("GZC_ASA_ID", "756356387"))
APP_ID          = int(os.getenv("APP_ID", "756359161"))

print(f"Sender     : {deployer_addr}")
print(f"App ID     : {APP_ID}")
print(f"GZC ASA ID : {GZC_ASA_ID}")

app_client = AppClient(AppClientParams(
    algorand=algorand,
    app_spec=app_spec,
    app_id=APP_ID,
    default_sender=deployer_addr,
    default_signer=signing_account.signer,
))

print("Sending opt_in_to_asset...")
try:
    result = app_client.send.call(
        AppClientMethodCallParams(
            method="opt_in_to_asset",
            args=[GZC_ASA_ID],
            extra_fee=AlgoAmount(micro_algo=1000),
            asset_references=[GZC_ASA_ID],
        )
    )
    print("TX ID:", result.tx_id)
    print(f"✅ Contract (App {APP_ID}) opted into GZC ASA {GZC_ASA_ID}!")
except Exception as e:
    error_str = str(e).lower()
    if "asset 756356387 exists" in error_str or "already opted in" in error_str:
        print(f"✅ Contract is already opted in to GZC ASA {GZC_ASA_ID}!")
    else:
        print(f"❌ Error: {e}")
        raise
