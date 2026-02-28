import { Contract } from '@algorandfoundation/tealscript';

export class IntegrityExam extends Contract {
  // Use GlobalStateKey for both AssetID and standard integers
  gzcAsaId = GlobalStateKey<AssetID>({ key: 'asaId' });
  scholarshipAmount = GlobalStateKey<uint64>({ key: 'reward' });

  // Local State: Data stored per student account
  stakedAmount = LocalStateKey<uint64>({ key: 'staked' });
  marks = LocalStateKey<uint64>({ key: 'marks' });
  cheatCount = LocalStateKey<uint64>({ key: 'cheats' });
  isExamActive = LocalStateKey<uint64>({ key: 'active' });

  /**
   * Initialize the contract
   */
  createApplication(gzcId: AssetID): void {
    this.gzcAsaId.value = gzcId;
    // 10,000 GZC (assuming 6 decimals)
    this.scholarshipAmount.value = 10_000_000_000; 
  }

  /**
   * Opt the contract into the GZC ASA so it can receive tokens.
   * Only the creator can call this.
   */
  optInToAsset(): void {
    assert(this.txn.sender === globals.creatorAddress, 'Only creator can opt in');
    sendAssetTransfer({
      xferAsset: this.gzcAsaId.value,
      assetReceiver: this.app.address,
      assetAmount: 0,
      fee: 1000,
    });
  }

  /**
   * Student stakes balance to start the exam.
   * User must opt-in to the app before calling this.
   */
  stakeAndStart(stakePmt: AssetTransferTxn): void {
    verifyAssetTransferTxn(stakePmt, {
      assetReceiver: this.app.address,
      xferAsset: this.gzcAsaId.value,
      assetAmount: { greaterThan: 0 },
    });

    // Correct way to set Local State for the sender
    this.stakedAmount(this.txn.sender).value = stakePmt.assetAmount;
    this.isExamActive(this.txn.sender).value = 1;
    this.cheatCount(this.txn.sender).value = 0;
    this.marks(this.txn.sender).value = 0;
  }

  /**
   * AI Proctor / Backend records a cheat event.
   */
  recordCheat(student: Address): void {
    assert(this.txn.sender === globals.creatorAddress, 'Only proctor can flag');
    
    const currentCheats = this.cheatCount(student).value;
    this.cheatCount(student).value = currentCheats + 1;
    
    // Slashing: If cheatCount >= 3, slash 50% of stake
    if (this.cheatCount(student).value >= 3) {
      const currentStake = this.stakedAmount(student).value;
      this.stakedAmount(student).value = currentStake / 2;
    }
  }

  /**
   * Complete exam and handle scholarship/refund
   */
  completeExam(student: Address, finalMarks: uint64): void {
    assert(this.txn.sender === globals.creatorAddress, 'Only proctor can submit marks');
    
    this.marks(student).value = finalMarks;
    this.isExamActive(student).value = 0;

    // RULE: Scholarship granted if Marks >= 80 AND CheatCount == 0
    if (finalMarks >= 80 && this.cheatCount(student).value === 0) {
      sendAssetTransfer({
        xferAsset: this.gzcAsaId.value,
        assetReceiver: student,
        assetAmount: this.scholarshipAmount.value,
        fee: 1000, // Inner txn fee
      });
    }

    // Refund whatever is left of the stake
    const remainingStake = this.stakedAmount(student).value;
    if (remainingStake > 0) {
      sendAssetTransfer({
        xferAsset: this.gzcAsaId.value,
        assetReceiver: student,
        assetAmount: remainingStake,
        fee: 1000,
      });
    }

    // Reset local stake to prevent double-claiming
    this.stakedAmount(student).value = 0;
  }
}