"""Deploy the IntegrityExam contract to Algorand TestNet."""

from __future__ import annotations

import base64
import json
import os
from pathlib import Path

from algosdk import account, mnemonic, transaction, v2client
from algosdk.abi import Method
from algosdk.logic import get_application_address
from dotenv import load_dotenv
from nacl.signing import SigningKey

load_dotenv()

ALGOD_URL = os.getenv("ALGOD_SERVER", "https://testnet-api.algonode.cloud")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN", "")
ALGOD_PORT = os.getenv("ALGOD_PORT", "443")

SECRET_KEY_HEX = os.getenv("SECRET_KEY")
DEPLOYER_MNEMONIC = os.getenv("DEPLOYER_MNEMONIC")


def _private_key_bytes_from_hex(hex_key: str) -> bytes:
    raw = bytes.fromhex(hex_key)
    if len(raw) == 32:
        signing_key = SigningKey(raw)
        return raw + signing_key.verify_key.encode()
    if len(raw) == 64:
        return raw
    raise ValueError("SECRET_KEY must represent 32 or 64 bytes of hex data.")


if not DEPLOYER_MNEMONIC:
    if not SECRET_KEY_HEX:
        raise ValueError("Provide either SECRET_KEY (hex) or DEPLOYER_MNEMONIC in the environment.")
    try:
        private_key_bytes = _private_key_bytes_from_hex(SECRET_KEY_HEX)
        DEPLOYER_MNEMONIC = mnemonic.from_private_key(private_key_bytes)
        print("✅ Derived deployer mnemonic from SECRET_KEY.")
    except Exception as exc:
        raise ValueError(f"Failed to derive mnemonic from SECRET_KEY: {exc}") from exc

GZC_ASA_ID = int(os.getenv("GZC_ASA_ID", "0"))
if GZC_ASA_ID <= 0:
    raise ValueError("Provide the already-created GZC ASA ID via the GZC_ASA_ID environment variable.")

FUNDING_MICROALGOS = int(os.getenv("CONTRACT_FUNDING", "400000"))

ARTIFACTS_DIR = Path(__file__).parent / "contracts" / "artifacts"
APPROVAL_TEAL = ARTIFACTS_DIR / "IntegrityExam.approval.teal"
CLEAR_TEAL = ARTIFACTS_DIR / "IntegrityExam.clear.teal"
OUTPUT_JSON = ARTIFACTS_DIR / "exam_integrity_deployment.json"


def load_program(client: v2client.algod.AlgodClient, teal_path: Path) -> bytes:
    source = teal_path.read_text()
    compiled = client.compile(source)
    return base64.b64decode(compiled["result"])


def wait_for_confirmation(client: v2client.algod.AlgodClient, tx_id: str) -> dict:
    return transaction.wait_for_confirmation(client, tx_id, wait_rounds=8)


def main() -> None:
    # Construct the client with correct arguments.
    # AlgodClient(algod_token, algod_address, headers)
    # If using AlgoNode, the token is often empty, but we can pass it as a header if needed.
    # The third argument is 'headers', not port.
    
    # Ensure URL includes port if not already present, or trust the SDK/URL.
    # For AlgoNode, usually just the URL is enough.
    algod = v2client.algod.AlgodClient(ALGOD_TOKEN, ALGOD_URL)

    deployer_sk = mnemonic.to_private_key(DEPLOYER_MNEMONIC)
    deployer_addr = account.address_from_private_key(deployer_sk)
    print("Deploying IntegrityExam contract from:", deployer_addr)

    approval_program = load_program(algod, APPROVAL_TEAL)
    clear_program = load_program(algod, CLEAR_TEAL)

    params = algod.suggested_params()
    create_method = Method.from_signature("createApplication(asset)void")
    selector = create_method.get_selector()
    asset_arg = create_method.args[0].type.encode(GZC_ASA_ID)

    create_txn = transaction.ApplicationCreateTxn(
        sender=deployer_addr,
        sp=params,
        on_complete=transaction.OnComplete.NoOpOC,
        approval_program=approval_program,
        clear_program=clear_program,
        global_schema=transaction.StateSchema(num_uints=2, num_byte_slices=0),
        local_schema=transaction.StateSchema(num_uints=4, num_byte_slices=0),
        app_args=[selector, asset_arg],
    )

    signed_create = create_txn.sign(deployer_sk)
    create_tx_id = algod.send_transaction(signed_create)
    create_receipt = wait_for_confirmation(algod, create_tx_id)
    app_id = create_receipt["application-index"]
    app_address = get_application_address(app_id)
    print(f"✓ Application created. ID: {app_id}")

    params = algod.suggested_params()
    params.flat_fee = True
    params.fee = 1000
    fund_txn = transaction.PaymentTxn(
        sender=deployer_addr,
        receiver=app_address,
        amt=FUNDING_MICROALGOS,
        sp=params,
    )
    signed_fund = fund_txn.sign(deployer_sk)
    fund_tx_id = algod.send_transaction(signed_fund)
    wait_for_confirmation(algod, fund_tx_id)
    print(
        f"✓ Funded contract address with {FUNDING_MICROALGOS / 1_000_000:.3f} ALGO to cover MBR"
    )

    OUTPUT_JSON.write_text(
        json.dumps(
            {
                "app_id": app_id,
                "app_address": app_address,
                "gzc_asa_id": GZC_ASA_ID,
                "creator": deployer_addr,
            },
            indent=2,
        )
    )
    print(f"Deployment details written to {OUTPUT_JSON}")


if __name__ == "__main__":
    main()
