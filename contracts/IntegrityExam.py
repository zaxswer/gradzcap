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
    staked_amount:  arc4.UInt64
    marks:          arc4.UInt64
    cheat_count:    arc4.UInt64
    is_exam_active: arc4.UInt64

class CertificateData(arc4.Struct):
    student_address: arc4.Address
    final_marks:     arc4.UInt64
    total_questions: arc4.UInt64
    timestamp:       arc4.UInt64
    nft_id:          arc4.UInt64

class IntegrityExam(ARC4Contract):

    def __init__(self) -> None:
        # ✅ BoxMap must be initialized in __init__, not just declared
        self.student_records  = BoxMap(arc4.Address, StudentData, key_prefix=b"s")
        self.has_claimed_demo = BoxMap(arc4.Address, arc4.UInt64, key_prefix=b"d")
        self.certificates     = BoxMap(arc4.Address, CertificateData, key_prefix=b"c")
        self.gzc_asa_id         = UInt64(0)
        self.scholarship_amount = UInt64(0)
        self.total_questions    = UInt64(10)

    @arc4.abimethod(create="require")
    def create_application(self, gzc_id: Asset) -> None:
        self.gzc_asa_id         = gzc_id.id
        self.scholarship_amount = UInt64(10_000_000_000)

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
        assert sender_address not in self.has_claimed_demo, "Already claimed"
        itxn.AssetTransfer(
            xfer_asset=Asset(self.gzc_asa_id),
            asset_receiver=Txn.sender,
            asset_amount=UInt64(1_000_000_000),
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
            is_exam_active=arc4.UInt64(1),
        )

    @arc4.abimethod
    def record_cheat(self, student: arc4.Address) -> None:
        assert Txn.sender == Global.creator_address, "Only proctor"
        record = self.student_records[student].copy()
        new_cheats = record.cheat_count.native + 1
        record.cheat_count = arc4.UInt64(new_cheats)
        # 100% slash on ANY cheat - keep all stake in contract
        record.staked_amount = arc4.UInt64(0)
        self.student_records[student] = record.copy()

    @arc4.abimethod
    def complete_exam(self, student: arc4.Address, final_marks: UInt64, total_q: UInt64) -> arc4.UInt64:
        assert Txn.sender == Global.creator_address, "Only proctor"
        record = self.student_records[student].copy()
        
        # Only issue certificate, return stake, and give scholarship if passed with NO cheats
        nft_id = UInt64(0)
        if final_marks >= 80 and record.cheat_count.native == 0:
            # Mint scholarship NFT certificate
            nft_id = itxn.AssetConfig(
                total=1,
                decimals=0,
                default_frozen=False,
                unit_name=b"GZCERT",
                asset_name=b"GradZCap Scholarship Certificate",
                url=b"https://gradzcap.com/verify",
                manager=Global.current_application_address,
                reserve=Global.current_application_address,
                freeze=Global.current_application_address,
                clawback=Global.current_application_address,
            ).submit().created_asset.id
            
            # Transfer NFT to student
            itxn.AssetTransfer(
                xfer_asset=Asset(nft_id),
                asset_receiver=student.native,
                asset_amount=1,
            ).submit()
            
            # Store certificate data on-chain
            self.certificates[student] = CertificateData(
                student_address=student,
                final_marks=arc4.UInt64(final_marks),
                total_questions=arc4.UInt64(total_q),
                timestamp=arc4.UInt64(Global.latest_timestamp),
                nft_id=arc4.UInt64(nft_id),
            )
            
            # Return stake
            if record.staked_amount.native > 0:
                itxn.AssetTransfer(
                    xfer_asset=Asset(self.gzc_asa_id),
                    asset_receiver=student.native,
                    asset_amount=record.staked_amount.native,
                ).submit()
            
            # Give scholarship tokens
            itxn.AssetTransfer(
                xfer_asset=Asset(self.gzc_asa_id),
                asset_receiver=student.native,
                asset_amount=self.scholarship_amount,
            ).submit()
        
        # If failed or cheated, keep stake in contract (already slashed)
        del self.student_records[student]
        return arc4.UInt64(nft_id)

    @arc4.abimethod
    def admin_withdraw(self, amount: UInt64) -> None:
        assert Txn.sender == Global.creator_address, "Only creator"
        itxn.AssetTransfer(
            xfer_asset=Asset(self.gzc_asa_id),
            asset_receiver=Global.creator_address,
            asset_amount=amount,
        ).submit()
    
    @arc4.abimethod(readonly=True)
    def get_certificate(self, student: arc4.Address) -> CertificateData:
        """Get certificate data for a student"""
        return self.certificates[student].copy()