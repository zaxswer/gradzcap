"""
Find the GZCToken App ID from the creator address, then call buyGZC to mint tokens.
"""
import os, algosdk
from algosdk.v2client import algod, indexer
from algosdk.transaction import (
    PaymentTxn, ApplicationCallTxn, wait_for_confirmation
)
from dotenv import load_dotenv

load_dotenv()

GZC_ASA_ID = int(os.getenv("GZC_ASA_ID", "756321188"))
GZC_CONTRACT_ADDR = "TXHHYTME4ESBRKOO7HHJB5C2CI7F4WPG4IDMQ5CIFKL4IW4MXVJIHD67CI"

mnemonic = os.getenv("DEPLOYER_MNEMONIC")
if not mnemonic:
    print("Error: DEPLOYER_MNEMONIC not set in .env")
    exit(1)

sk      = algosdk.mnemonic.to_private_key(mnemonic)
address = algosdk.account.address_from_private_key(sk)

client = algod.AlgodClient("", "https://testnet-api.algonode.cloud")
idx    = indexer.IndexerClient("", "https://testnet-idx.algonode.cloud")

# Find the App ID for the GZCToken contract
print(f"Looking up GZCToken contract at address: {GZC_CONTRACT_ADDR}")
try:
    acct = idx.lookup_account_by_id(GZC_CONTRACT_ADDR)
    apps_created = acct.get("account", {}).get("created-apps", [])
    print(f"Found {len(apps_created)} app(s) created by this address")
    for app in apps_created:
        print(f"  App ID: {app['id']}")
except Exception as e:
    print(f"Indexer lookup failed: {e}")
    print("Trying to determine app ID from address...")

# Alternative: search for apps whose address matches
result = idx.search_applications(creator=address)
apps = result.get("applications", [])
print(f"\nApps created by deployer ({address}):")
for app in apps:
    app_addr = algosdk.logic.get_application_address(app["id"])
    print(f"  App ID: {app['id']} -> Address: {app_addr}")
    if app_addr == GZC_CONTRACT_ADDR:
        print(f"  ^^ THIS IS THE GZCToken CONTRACT!")
