from algopy import (
    ARC4Contract,
    Asset,
    BoxMap,
    Global,
    Txn,
    UInt64,
    arc4,
    itxn,
    gtxn,
)

class StudentData(arc4.Struct):
    staked_amount: arc4.UInt64
    marks: arc4.UInt64
    cheat_count: arc4.UInt64
    is_exam_active: arc4.UInt64

# Rename this class if you want the .teal files to have a different name
class ClaimDemoTokens(ARC4Contract):
    def __init__(self) -> None:
        # FIX: Add the type hint ': UInt64' here
        self.gzc_asa_id: UInt64 = UInt64(756321188)
        self.scholarship_amount: UInt64 = UInt64(10_000_000_000)
        
        self.student_records = BoxMap(arc4.Address, StudentData)
        self.has_claimed_demo = BoxMap(arc4.Address, arc4.UInt64)

    @arc4.abimethod(allow_actions=["NoOp"])
    def create_application(self, gzc_id: Asset) -> None:
        """Initialize the contract with the GZC Asset ID."""
        assert Txn.sender == Global.creator_address, "Only creator"
        # Since we hardcoded it to 756321188, this method is now redundant 
        # but if you keep it, ensure the types match:
        self.gzc_asa_id = gzc_id.id

    @arc4.abimethod
    def opt_in_to_asset(self, gzc_asset: Asset) -> None:
        assert Txn.sender == Global.creator_address, "Only creator"
        assert gzc_asset.id == self.gzc_asa_id, "Asset mismatch"
        
        itxn.AssetTransfer(
            xfer_asset=gzc_asset,
            asset_receiver=Global.current_application_address,
            asset_amount=0,
        ).submit()

    @arc4.abimethod
    def claim_demo_tokens(self) -> None:
        sender_address = arc4.Address(Txn.sender)
        assert sender_address not in self.has_claimed_demo, "Already claimed demo tokens"
        
        giveaway_val = UInt64(1_000_000_000) 

        itxn.AssetTransfer(
            xfer_asset=Asset(self.gzc_asa_id),
            asset_receiver=Txn.sender,
            asset_amount=giveaway_val,
        ).submit()

        self.has_claimed_demo[sender_address] = arc4.UInt64(1)

    @arc4.abimethod
    def stake_and_start(self, stake_pmt: gtxn.AssetTransferTransaction) -> None:
        assert arc4.Address(Txn.sender) not in self.student_records, "Exam in progress"
        assert stake_pmt.asset_receiver == Global.current_application_address
        assert stake_pmt.xfer_asset.id == self.gzc_asa_id
        assert stake_pmt.asset_amount > 0

        self.student_records[arc4.Address(Txn.sender)] = StudentData(
            staked_amount=arc4.UInt64(stake_pmt.asset_amount),
            marks=arc4.UInt64(0),
            cheat_count=arc4.UInt64(0),
            is_exam_active=arc4.UInt64(1)
        )

    @arc4.abimethod
    def record_cheat(self, student: arc4.Address) -> None:
        assert Txn.sender == Global.creator_address, "Only proctor"
        record = self.student_records[student].copy()
        new_cheats = record.cheat_count.native + 1
        record.cheat_count = arc4.UInt64(new_cheats)
        if new_cheats == 3:
            record.staked_amount = arc4.UInt64(record.staked_amount.native // 2)
        self.student_records[student] = record.copy()

    @arc4.abimethod
    def complete_exam(self, student: arc4.Address, final_marks: UInt64) -> None:
        assert Txn.sender == Global.creator_address, "Only proctor"
        record = self.student_records[student].copy()
        if final_marks >= 80 and record.cheat_count.native == 0:
            itxn.AssetTransfer(
                xfer_asset=Asset(self.gzc_asa_id),
                asset_receiver=student.native,
                asset_amount=self.scholarship_amount,
            ).submit()
        if record.staked_amount.native > 0:
            itxn.AssetTransfer(
                xfer_asset=Asset(self.gzc_asa_id),
                asset_receiver=student.native,
                asset_amount=record.staked_amount.native,
            ).submit()
        del self.student_records[student]