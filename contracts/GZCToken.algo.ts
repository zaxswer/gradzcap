import { Contract } from '@algorandfoundation/tealscript';

export class GZCToken extends Contract {
  gzcAsaId = GlobalStateKey<AssetID>({ key: 'asaId' });
  owner = GlobalStateKey<Address>({ key: 'owner' });

  // 1. Just set the owner on creation. No inner txns here.
  createApplication(): void {
    this.owner.value = this.txn.sender;
  }

  // 2. New method to mint the ASA after the contract is funded.
  bootstrap(): void {
    assert(this.txn.sender === this.owner.value, 'Only owner can bootstrap');
    assert(!this.gzcAsaId.exists, 'Already bootstrapped');

    const createdAsset = sendAssetCreation({
      configAssetTotal: 1_000_000_000_000_000 as uint64,
      configAssetDecimals: 6 as uint64,
      configAssetUnitName: 'GZC',
      configAssetName: 'GZC Coin',
      configAssetURL: 'https://gzc.expose.software',
      configAssetManager: this.app.address,
      configAssetReserve: this.app.address,
      configAssetFreeze: this.app.address,
      configAssetClawback: this.app.address,
      configAssetDefaultFrozen: 0 as uint64,
      fee: 0, // We will use Fee Pooling from the caller
    });

    this.gzcAsaId.value = createdAsset;
  }

  buyGZC(payment: PayTxn): void {
    verifyPayTxn(payment, {
      receiver: this.app.address,
      amount: { greaterThan: 0 as uint64 },
    });

    // 1 ALGO (1_000_000 microALGO) = 1_000_000 GZC (1_000_000_000_000 microGZC)
    const gzcAmount = payment.amount * 1_000_000;

    assert(
      this.app.address.assetBalance(this.gzcAsaId.value) >= gzcAmount,
      'GZC: insufficient reserve'
    );

    sendAssetTransfer({
      xferAsset: this.gzcAsaId.value,
      assetReceiver: this.txn.sender,
      assetAmount: gzcAmount,
      fee: 1_000,
    });
  }

  sellGZC(gzcPayment: AssetTransferTxn): void {
    verifyAssetTransferTxn(gzcPayment, {
      xferAsset: this.gzcAsaId.value,
      assetReceiver: this.app.address,
      assetAmount: { greaterThan: 0 as uint64 },
    });

    // Reverse: 1_000_000 GZC = 1 ALGO
    const algoReturn = gzcPayment.assetAmount / 1_000_000;

    assert(
      algoReturn > 0,
      'GZC: amount too small to convert'
    );

    assert(
      this.app.address.balance >= algoReturn + this.app.address.minBalance,
      'GZC: insufficient ALGO reserve'
    );

    sendPayment({
      receiver: this.txn.sender,
      amount: algoReturn,
      fee: 1_000,
    });
  }

  withdrawAlgo(amount: uint64): void {
    assert(this.txn.sender === this.owner.value, 'GZC: not owner');
    assert(
      this.app.address.balance >= amount + this.app.address.minBalance + 100_000,
      'GZC: would deplete reserve'
    );
    
    // IMPORTANT: Added fee: 1_000
    sendPayment({
      receiver: this.owner.value,
      amount: amount,
      fee: 1_000,
    });
  }

  transferOwnership(newOwner: Address): void {
    assert(this.txn.sender === this.owner.value, 'GZC: not owner');
    assert(newOwner !== globals.zeroAddress, 'GZC: zero address');
    this.owner.value = newOwner;
  }

  getAsaId(): AssetID {
    return this.gzcAsaId.value;
  }

  getGZCReserve(): uint64 {
    return this.app.address.assetBalance(this.gzcAsaId.value);
  }

  getAlgoReserve(): uint64 {
    return this.app.address.balance;
  }
}