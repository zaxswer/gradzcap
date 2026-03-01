(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/gradzcap/node_modules/algosdk/dist/esm/types/intDecoding.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * Configure how integers in JSON response will be decoded.
 */ var IntDecoding;
(function(IntDecoding) {
    /**
     * All integers will be decoded as Numbers, meaning any values greater than
     * Number.MAX_SAFE_INTEGER will lose precision.
     */ IntDecoding["UNSAFE"] = "unsafe";
    /**
     * All integers will be decoded as Numbers, but if any values are greater than
     * Number.MAX_SAFE_INTEGER an error will be thrown.
     */ IntDecoding["SAFE"] = "safe";
    /**
     * Integers will be decoded as Numbers if they are less than or equal to
     * Number.MAX_SAFE_INTEGER, otherwise they will be decoded as BigInts.
     */ IntDecoding["MIXED"] = "mixed";
    /**
     * All integers will be decoded as BigInts.
     */ IntDecoding["BIGINT"] = "bigint";
})(IntDecoding || (IntDecoding = {}));
const __TURBOPACK__default__export__ = IntDecoding;
 //# sourceMappingURL=intDecoding.js.map
}),
"[project]/gradzcap/node_modules/algosdk/dist/esm/types/transactions/base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Enum for application transaction types.
 */ __turbopack_context__.s([
    "OnApplicationComplete",
    ()=>OnApplicationComplete,
    "TransactionType",
    ()=>TransactionType,
    "isOnApplicationComplete",
    ()=>isOnApplicationComplete,
    "isTransactionType",
    ()=>isTransactionType
]);
var TransactionType;
(function(TransactionType) {
    /**
     * Payment transaction
     */ TransactionType["pay"] = "pay";
    /**
     * Key registration transaction
     */ TransactionType["keyreg"] = "keyreg";
    /**
     * Asset configuration transaction
     */ TransactionType["acfg"] = "acfg";
    /**
     * Asset transfer transaction
     */ TransactionType["axfer"] = "axfer";
    /**
     * Asset freeze transaction
     */ TransactionType["afrz"] = "afrz";
    /**
     * Application transaction
     */ TransactionType["appl"] = "appl";
    /**
     * State proof transaction
     */ TransactionType["stpf"] = "stpf";
    /**
     * Heartbeat transaction
     */ TransactionType["hb"] = "hb";
})(TransactionType || (TransactionType = {}));
function isTransactionType(s) {
    return s === TransactionType.pay || s === TransactionType.keyreg || s === TransactionType.acfg || s === TransactionType.axfer || s === TransactionType.afrz || s === TransactionType.appl || s === TransactionType.stpf || s === TransactionType.hb;
}
var OnApplicationComplete;
(function(OnApplicationComplete) {
    /**
     * NoOpOC indicates that an application transaction will simply call its
     * ApprovalProgram
     */ OnApplicationComplete[OnApplicationComplete["NoOpOC"] = 0] = "NoOpOC";
    /**
     * OptInOC indicates that an application transaction will allocate some
     * LocalState for the application in the sender's account
     */ OnApplicationComplete[OnApplicationComplete["OptInOC"] = 1] = "OptInOC";
    /**
     * CloseOutOC indicates that an application transaction will deallocate
     * some LocalState for the application from the user's account
     */ OnApplicationComplete[OnApplicationComplete["CloseOutOC"] = 2] = "CloseOutOC";
    /**
     * ClearStateOC is similar to CloseOutOC, but may never fail. This
     * allows users to reclaim their minimum balance from an application
     * they no longer wish to opt in to.
     */ OnApplicationComplete[OnApplicationComplete["ClearStateOC"] = 3] = "ClearStateOC";
    /**
     * UpdateApplicationOC indicates that an application transaction will
     * update the ApprovalProgram and ClearStateProgram for the application
     */ OnApplicationComplete[OnApplicationComplete["UpdateApplicationOC"] = 4] = "UpdateApplicationOC";
    /**
     * DeleteApplicationOC indicates that an application transaction will
     * delete the AppParams for the application from the creator's balance
     * record
     */ OnApplicationComplete[OnApplicationComplete["DeleteApplicationOC"] = 5] = "DeleteApplicationOC";
})(OnApplicationComplete || (OnApplicationComplete = {}));
function isOnApplicationComplete(v) {
    return v === OnApplicationComplete.NoOpOC || v === OnApplicationComplete.OptInOC || v === OnApplicationComplete.CloseOutOC || v === OnApplicationComplete.ClearStateOC || v === OnApplicationComplete.UpdateApplicationOC || v === OnApplicationComplete.DeleteApplicationOC;
} //# sourceMappingURL=base.js.map
}),
"[project]/gradzcap/node_modules/algosdk/dist/esm/types/transactions/encoded.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ENCODED_MULTISIG_SCHEMA",
    ()=>ENCODED_MULTISIG_SCHEMA,
    "ENCODED_SUBSIG_SCHEMA",
    ()=>ENCODED_SUBSIG_SCHEMA,
    "encodedMultiSigFromEncodingData",
    ()=>encodedMultiSigFromEncodingData,
    "encodedMultiSigToEncodingData",
    ()=>encodedMultiSigToEncodingData,
    "encodedSubsigFromEncodingData",
    ()=>encodedSubsigFromEncodingData,
    "encodedSubsigToEncodingData",
    ()=>encodedSubsigToEncodingData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/bytearray.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/uint64.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/optional.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/utils/utils.js [app-client] (ecmascript)");
;
;
const ENCODED_SUBSIG_SCHEMA = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'pk',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FixedLengthByteArraySchema"](32)
    },
    {
        key: 's',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FixedLengthByteArraySchema"](64))
    }
]));
function encodedSubsigFromEncodingData(data) {
    if (!(data instanceof Map)) {
        throw new Error(`Invalid decoded EncodedSubsig: ${data}`);
    }
    const subsig = {
        pk: data.get('pk')
    };
    if (data.get('s')) {
        subsig.s = data.get('s');
    }
    return subsig;
}
function encodedSubsigToEncodingData(subsig) {
    const data = new Map([
        [
            'pk',
            subsig.pk
        ]
    ]);
    if (subsig.s) {
        data.set('s', subsig.s);
    }
    return data;
}
const ENCODED_MULTISIG_SCHEMA = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'v',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'thr',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'subsig',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySchema"](ENCODED_SUBSIG_SCHEMA)
    }
]));
function encodedMultiSigFromEncodingData(data) {
    if (!(data instanceof Map)) {
        throw new Error(`Invalid decoded EncodedMultiSig: ${data}`);
    }
    return {
        v: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureSafeUnsignedInteger"])(data.get('v')),
        thr: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureSafeUnsignedInteger"])(data.get('thr')),
        subsig: data.get('subsig').map(encodedSubsigFromEncodingData)
    };
}
function encodedMultiSigToEncodingData(msig) {
    return new Map([
        [
            'v',
            msig.v
        ],
        [
            'thr',
            msig.thr
        ],
        [
            'subsig',
            msig.subsig.map(encodedSubsigToEncodingData)
        ]
    ]);
} //# sourceMappingURL=encoded.js.map
}),
"[project]/gradzcap/node_modules/algosdk/dist/esm/types/transactions/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/types/transactions/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$encoded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/types/transactions/encoded.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
}),
"[project]/gradzcap/node_modules/algosdk/dist/esm/types/block.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApplyData",
    ()=>ApplyData,
    "Block",
    ()=>Block,
    "BlockHeader",
    ()=>BlockHeader,
    "EvalDelta",
    ()=>EvalDelta,
    "ParticipationUpdates",
    ()=>ParticipationUpdates,
    "RewardState",
    ()=>RewardState,
    "SignedTxnInBlock",
    ()=>SignedTxnInBlock,
    "SignedTxnWithAD",
    ()=>SignedTxnWithAD,
    "StateProofTrackingData",
    ()=>StateProofTrackingData,
    "TxnCommitments",
    ()=>TxnCommitments,
    "UpgradeState",
    ()=>UpgradeState,
    "UpgradeVote",
    ()=>UpgradeVote,
    "ValueDelta",
    ()=>ValueDelta
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$binarystring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/binarystring.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/string.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/boolean.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/uint64.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/bytearray.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/optional.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$blockhash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/blockhash.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$signedTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/signedTransaction.js [app-client] (ecmascript)");
;
;
class StateProofTrackingData {
    constructor(params){
        this.stateProofVotersCommitment = params.stateProofVotersCommitment;
        this.stateProofOnlineTotalWeight = params.stateProofOnlineTotalWeight;
        this.stateProofNextRound = params.stateProofNextRound;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return StateProofTrackingData.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'v',
                this.stateProofVotersCommitment
            ],
            [
                't',
                this.stateProofOnlineTotalWeight
            ],
            [
                'n',
                this.stateProofNextRound
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded StateProofTrackingData: ${data}`);
        }
        return new StateProofTrackingData({
            stateProofVotersCommitment: data.get('v'),
            stateProofOnlineTotalWeight: data.get('t'),
            stateProofNextRound: data.get('n')
        });
    }
}
StateProofTrackingData.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'v',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ByteArraySchema"]()
    },
    {
        key: 't',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'n',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class TxnCommitments {
    constructor(params){
        this.nativeSha512_256Commitment = params.nativeSha512_256Commitment;
        this.sha256Commitment = params.sha256Commitment;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return TxnCommitments.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'txn',
                this.nativeSha512_256Commitment
            ],
            [
                'txn256',
                this.sha256Commitment
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded TxnCommitments: ${data}`);
        }
        return new TxnCommitments({
            nativeSha512_256Commitment: data.get('txn'),
            sha256Commitment: data.get('txn256')
        });
    }
}
TxnCommitments.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'txn',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FixedLengthByteArraySchema"](32)
    },
    {
        key: 'txn256',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FixedLengthByteArraySchema"](32)
    }
]));
class RewardState {
    constructor(params){
        this.feeSink = params.feeSink;
        this.rewardsPool = params.rewardsPool;
        this.rewardsLevel = params.rewardsLevel;
        this.rewardsRate = params.rewardsRate;
        this.rewardsResidue = params.rewardsResidue;
        this.rewardsRecalculationRound = params.rewardsRecalculationRound;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return RewardState.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'fees',
                this.feeSink
            ],
            [
                'rwd',
                this.rewardsPool
            ],
            [
                'earn',
                this.rewardsLevel
            ],
            [
                'rate',
                this.rewardsRate
            ],
            [
                'frac',
                this.rewardsResidue
            ],
            [
                'rwcalr',
                this.rewardsRecalculationRound
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded RewardState: ${data}`);
        }
        return new RewardState({
            feeSink: data.get('fees'),
            rewardsPool: data.get('rwd'),
            rewardsLevel: data.get('earn'),
            rewardsRate: data.get('rate'),
            rewardsResidue: data.get('frac'),
            rewardsRecalculationRound: data.get('rwcalr')
        });
    }
}
RewardState.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'fees',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]()
    },
    {
        key: 'rwd',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]()
    },
    {
        key: 'earn',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'rate',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'frac',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'rwcalr',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class UpgradeState {
    constructor(params){
        this.currentProtocol = params.currentProtocol;
        this.nextProtocol = params.nextProtocol;
        this.nextProtocolApprovals = params.nextProtocolApprovals;
        this.nextProtocolVoteBefore = params.nextProtocolVoteBefore;
        this.nextProtocolSwitchOn = params.nextProtocolSwitchOn;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return UpgradeState.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'proto',
                this.currentProtocol
            ],
            [
                'nextproto',
                this.nextProtocol
            ],
            [
                'nextyes',
                this.nextProtocolApprovals
            ],
            [
                'nextbefore',
                this.nextProtocolVoteBefore
            ],
            [
                'nextswitch',
                this.nextProtocolSwitchOn
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded UpgradeState: ${data}`);
        }
        return new UpgradeState({
            currentProtocol: data.get('proto'),
            nextProtocol: data.get('nextproto'),
            nextProtocolApprovals: data.get('nextyes'),
            nextProtocolVoteBefore: data.get('nextbefore'),
            nextProtocolSwitchOn: data.get('nextswitch')
        });
    }
}
UpgradeState.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'proto',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringSchema"]()
    },
    {
        key: 'nextproto',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringSchema"]()
    },
    {
        key: 'nextyes',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'nextbefore',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'nextswitch',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class UpgradeVote {
    constructor(params){
        this.upgradePropose = params.upgradePropose;
        this.upgradeDelay = params.upgradeDelay;
        this.upgradeApprove = params.upgradeApprove;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return UpgradeVote.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'upgradeprop',
                this.upgradePropose
            ],
            [
                'upgradedelay',
                this.upgradeDelay
            ],
            [
                'upgradeyes',
                this.upgradeApprove
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded UpgradeVote: ${data}`);
        }
        return new UpgradeVote({
            upgradePropose: data.get('upgradeprop'),
            upgradeDelay: data.get('upgradedelay'),
            upgradeApprove: data.get('upgradeyes')
        });
    }
}
UpgradeVote.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'upgradeprop',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringSchema"]()
    },
    {
        key: 'upgradedelay',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'upgradeyes',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanSchema"]()
    }
]));
class ParticipationUpdates {
    constructor(params){
        this.expiredParticipationAccounts = params.expiredParticipationAccounts;
        this.absentParticipationAccounts = params.absentParticipationAccounts;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return ParticipationUpdates.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'partupdrmv',
                this.expiredParticipationAccounts
            ],
            [
                'partupdabs',
                this.absentParticipationAccounts
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded ParticipationUpdates: ${data}`);
        }
        return new ParticipationUpdates({
            expiredParticipationAccounts: data.get('partupdrmv'),
            absentParticipationAccounts: data.get('partupdabs')
        });
    }
}
ParticipationUpdates.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'partupdrmv',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]())
    },
    {
        key: 'partupdabs',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]())
    }
]));
class BlockHeader {
    constructor(params){
        this.round = params.round;
        this.branch = params.branch;
        this.seed = params.seed;
        this.txnCommitments = params.txnCommitments;
        this.timestamp = params.timestamp;
        this.genesisID = params.genesisID;
        this.genesisHash = params.genesisHash;
        this.proposer = params.proposer;
        this.feesCollected = params.feesCollected;
        this.bonus = params.bonus;
        this.proposerPayout = params.proposerPayout;
        this.rewardState = params.rewardState;
        this.upgradeState = params.upgradeState;
        this.upgradeVote = params.upgradeVote;
        this.txnCounter = params.txnCounter;
        this.stateproofTracking = params.stateproofTracking;
        this.participationUpdates = params.participationUpdates;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return BlockHeader.encodingSchema;
    }
    toEncodingData() {
        const data = new Map([
            [
                'rnd',
                this.round
            ],
            [
                'prev',
                this.branch
            ],
            [
                'seed',
                this.seed
            ],
            [
                'ts',
                this.timestamp
            ],
            [
                'gen',
                this.genesisID
            ],
            [
                'gh',
                this.genesisHash
            ],
            [
                'prp',
                this.proposer
            ],
            [
                'fc',
                this.feesCollected
            ],
            [
                'bi',
                this.bonus
            ],
            [
                'pp',
                this.proposerPayout
            ],
            [
                'tc',
                this.txnCounter
            ],
            [
                'spt',
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(this.stateproofTracking, (key, value)=>[
                        key,
                        value.toEncodingData()
                    ])
            ]
        ]);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["combineMaps"])(data, this.txnCommitments.toEncodingData(), this.rewardState.toEncodingData(), this.upgradeState.toEncodingData(), this.upgradeVote.toEncodingData(), this.participationUpdates.toEncodingData());
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded BlockHeader: ${data}`);
        }
        return new BlockHeader({
            round: data.get('rnd'),
            branch: data.get('prev'),
            seed: data.get('seed'),
            txnCommitments: TxnCommitments.fromEncodingData(data),
            timestamp: data.get('ts'),
            genesisID: data.get('gen'),
            genesisHash: data.get('gh'),
            proposer: data.get('prp'),
            feesCollected: data.get('fc'),
            bonus: data.get('bi'),
            proposerPayout: data.get('pp'),
            rewardState: RewardState.fromEncodingData(data),
            upgradeState: UpgradeState.fromEncodingData(data),
            upgradeVote: UpgradeVote.fromEncodingData(data),
            txnCounter: data.get('tc'),
            stateproofTracking: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(data.get('spt'), (key, value)=>[
                    Number(key),
                    StateProofTrackingData.fromEncodingData(value)
                ]),
            participationUpdates: ParticipationUpdates.fromEncodingData(data)
        });
    }
}
BlockHeader.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'rnd',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'prev',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$blockhash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockHashSchema"]()
    },
    {
        key: 'seed',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ByteArraySchema"]()
    },
    {
        key: '',
        valueSchema: TxnCommitments.encodingSchema,
        embedded: true
    },
    {
        key: 'ts',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'gen',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringSchema"]()
    },
    {
        key: 'gh',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FixedLengthByteArraySchema"](32)
    },
    {
        key: 'prp',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]()
    },
    {
        key: 'fc',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'bi',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'pp',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: '',
        valueSchema: RewardState.encodingSchema,
        embedded: true
    },
    {
        key: '',
        valueSchema: UpgradeState.encodingSchema,
        embedded: true
    },
    {
        key: '',
        valueSchema: UpgradeVote.encodingSchema,
        embedded: true
    },
    {
        key: 'tc',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'spt',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64MapSchema"](StateProofTrackingData.encodingSchema)
    },
    {
        key: '',
        valueSchema: ParticipationUpdates.encodingSchema,
        embedded: true
    }
]));
class ValueDelta {
    constructor(params){
        this.action = params.action;
        this.bytes = params.bytes;
        this.uint = params.uint;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return ValueDelta.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'at',
                this.action
            ],
            [
                'bs',
                this.bytes
            ],
            [
                'ui',
                this.uint
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded ValueDelta: ${data}`);
        }
        return new ValueDelta({
            action: Number(data.get('at')),
            bytes: data.get('bs'),
            uint: data.get('ui')
        });
    }
}
ValueDelta.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'at',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'bs',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$binarystring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecialCaseBinaryStringSchema"]()
    },
    {
        key: 'ui',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class EvalDelta {
    static get encodingSchema() {
        // This is declared like this in order to break the circular dependency of
        // SignedTxnWithAD -> ApplyData -> EvalDelta -> SignedTxnWithAD
        if (!this.encodingSchemaValue) {
            this.encodingSchemaValue = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]([]);
            this.encodingSchemaValue.pushEntries(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
                {
                    key: 'gd',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecialCaseBinaryStringMapSchema"](ValueDelta.encodingSchema))
                },
                {
                    key: 'ld',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64MapSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecialCaseBinaryStringMapSchema"](ValueDelta.encodingSchema)))
                },
                {
                    key: 'sa',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]()))
                },
                {
                    key: 'lg',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$binarystring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecialCaseBinaryStringSchema"]()))
                },
                {
                    key: 'itx',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](// eslint-disable-next-line no-use-before-define
                    new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySchema"](SignedTxnWithAD.encodingSchema))
                }
            ]));
        }
        return this.encodingSchemaValue;
    }
    constructor(params){
        this.globalDelta = params.globalDelta ?? new Map();
        this.localDeltas = params.localDeltas ?? new Map();
        this.sharedAccts = params.sharedAccts ?? [];
        this.logs = params.logs ?? [];
        this.innerTxns = params.innerTxns ?? [];
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return EvalDelta.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'gd',
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(this.globalDelta, (key, value)=>[
                        key,
                        value.toEncodingData()
                    ])
            ],
            [
                'ld',
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(this.localDeltas, (key, value)=>[
                        key,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(value, (k, v)=>[
                                k,
                                v.toEncodingData()
                            ])
                    ])
            ],
            [
                'sa',
                this.sharedAccts
            ],
            [
                'lg',
                this.logs
            ],
            [
                'itx',
                this.innerTxns.map((t)=>t.toEncodingData())
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded EvalDelta: ${data}`);
        }
        return new EvalDelta({
            globalDelta: data.get('gd') ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(data.get('gd'), (key, value)=>[
                    key,
                    ValueDelta.fromEncodingData(value)
                ]) : undefined,
            localDeltas: data.get('ld') ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(data.get('ld'), (key, value)=>[
                    Number(key),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(value, (k, v)=>[
                            k,
                            ValueDelta.fromEncodingData(v)
                        ])
                ]) : undefined,
            sharedAccts: data.get('sa'),
            logs: data.get('lg'),
            // eslint-disable-next-line no-use-before-define
            innerTxns: (data.get('itx') ?? []).map(SignedTxnWithAD.fromEncodingData)
        });
    }
}
class ApplyData {
    static get encodingSchema() {
        // This is declared like this in order to break the circular dependency of
        // SignedTxnWithAD -> ApplyData -> EvalDelta -> SignedTxnWithAD
        if (!this.encodingSchemaValue) {
            this.encodingSchemaValue = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]([]);
            this.encodingSchemaValue.pushEntries(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
                {
                    key: 'ca',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]())
                },
                {
                    key: 'aca',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]())
                },
                {
                    key: 'rs',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]())
                },
                {
                    key: 'rr',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]())
                },
                {
                    key: 'rc',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]())
                },
                {
                    key: 'dt',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](EvalDelta.encodingSchema)
                },
                {
                    key: 'caid',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]())
                },
                {
                    key: 'apid',
                    valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]())
                }
            ]));
        }
        return this.encodingSchemaValue;
    }
    constructor(params){
        this.closingAmount = params.closingAmount;
        this.assetClosingAmount = params.assetClosingAmount;
        this.senderRewards = params.senderRewards;
        this.receiverRewards = params.receiverRewards;
        this.closeRewards = params.closeRewards;
        this.evalDelta = params.evalDelta;
        this.configAsset = params.configAsset;
        this.applicationID = params.applicationID;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return ApplyData.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'ca',
                this.closingAmount
            ],
            [
                'aca',
                this.assetClosingAmount
            ],
            [
                'rs',
                this.senderRewards
            ],
            [
                'rr',
                this.receiverRewards
            ],
            [
                'rc',
                this.closeRewards
            ],
            [
                'dt',
                this.evalDelta ? this.evalDelta.toEncodingData() : undefined
            ],
            [
                'caid',
                this.configAsset
            ],
            [
                'apid',
                this.applicationID
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded ApplyData: ${data}`);
        }
        return new ApplyData({
            closingAmount: data.get('ca'),
            assetClosingAmount: data.get('aca'),
            senderRewards: data.get('rs'),
            receiverRewards: data.get('rr'),
            closeRewards: data.get('rc'),
            evalDelta: data.get('dt') ? EvalDelta.fromEncodingData(data.get('dt')) : undefined,
            configAsset: data.get('caid'),
            applicationID: data.get('apid')
        });
    }
}
class SignedTxnWithAD {
    static get encodingSchema() {
        // This is declared like this in order to break the circular dependency of
        // SignedTxnWithAD -> ApplyData -> EvalDelta -> SignedTxnWithAD
        if (!this.encodingSchemaValue) {
            this.encodingSchemaValue = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]([]);
            this.encodingSchemaValue.pushEntries(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
                {
                    key: '',
                    valueSchema: __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$signedTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignedTransaction"].encodingSchema,
                    embedded: true
                },
                {
                    key: '',
                    valueSchema: ApplyData.encodingSchema,
                    embedded: true
                }
            ]));
        }
        return this.encodingSchemaValue;
    }
    constructor(params){
        this.signedTxn = params.signedTxn;
        this.applyData = params.applyData;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return SignedTxnWithAD.encodingSchema;
    }
    toEncodingData() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["combineMaps"])(this.signedTxn.toEncodingData(), this.applyData.toEncodingData());
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded SignedTxnWithAD: ${data}`);
        }
        return new SignedTxnWithAD({
            signedTxn: __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$signedTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignedTransaction"].fromEncodingData(data),
            applyData: ApplyData.fromEncodingData(data)
        });
    }
}
class SignedTxnInBlock {
    constructor(params){
        this.signedTxn = params.signedTxn;
        this.hasGenesisID = params.hasGenesisID;
        this.hasGenesisHash = params.hasGenesisHash;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return SignedTxnInBlock.encodingSchema;
    }
    toEncodingData() {
        const data = new Map([
            [
                'hgi',
                this.hasGenesisID
            ],
            [
                'hgh',
                this.hasGenesisHash
            ]
        ]);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["combineMaps"])(data, this.signedTxn.toEncodingData());
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded SignedTxnInBlock: ${data}`);
        }
        return new SignedTxnInBlock({
            signedTxn: SignedTxnWithAD.fromEncodingData(data),
            hasGenesisID: data.get('hgi'),
            hasGenesisHash: data.get('hgh')
        });
    }
}
SignedTxnInBlock.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: '',
        valueSchema: SignedTxnWithAD.encodingSchema,
        embedded: true
    },
    {
        key: 'hgi',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanSchema"]()
    },
    {
        key: 'hgh',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanSchema"]()
    }
]));
class Block {
    constructor(params){
        this.header = params.header;
        this.payset = params.payset;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return Block.encodingSchema;
    }
    toEncodingData() {
        const data = new Map([
            [
                'txns',
                this.payset.map((p)=>p.toEncodingData())
            ]
        ]);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["combineMaps"])(data, this.header.toEncodingData());
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded BlockHeader: ${data}`);
        }
        return new Block({
            header: BlockHeader.fromEncodingData(data),
            payset: data.get('txns').map(SignedTxnInBlock.fromEncodingData)
        });
    }
}
Block.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: '',
        valueSchema: BlockHeader.encodingSchema,
        embedded: true
    },
    {
        key: 'txns',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySchema"](SignedTxnInBlock.encodingSchema)
    }
])); //# sourceMappingURL=block.js.map
}),
"[project]/gradzcap/node_modules/algosdk/dist/esm/types/statedelta.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountBaseData",
    ()=>AccountBaseData,
    "AccountData",
    ()=>AccountData,
    "AccountDeltas",
    ()=>AccountDeltas,
    "AccountTotals",
    ()=>AccountTotals,
    "AlgoCount",
    ()=>AlgoCount,
    "AppLocalState",
    ()=>AppLocalState,
    "AppLocalStateDelta",
    ()=>AppLocalStateDelta,
    "AppParams",
    ()=>AppParams,
    "AppParamsDelta",
    ()=>AppParamsDelta,
    "AppResourceRecord",
    ()=>AppResourceRecord,
    "AssetHolding",
    ()=>AssetHolding,
    "AssetHoldingDelta",
    ()=>AssetHoldingDelta,
    "AssetParams",
    ()=>AssetParams,
    "AssetParamsDelta",
    ()=>AssetParamsDelta,
    "AssetResourceRecord",
    ()=>AssetResourceRecord,
    "BalanceRecord",
    ()=>BalanceRecord,
    "IncludedTransactions",
    ()=>IncludedTransactions,
    "KvValueDelta",
    ()=>KvValueDelta,
    "LedgerStateDelta",
    ()=>LedgerStateDelta,
    "ModifiedCreatable",
    ()=>ModifiedCreatable,
    "StateSchema",
    ()=>StateSchema,
    "TealValue",
    ()=>TealValue,
    "VotingData",
    ()=>VotingData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$binarystring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/binarystring.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/boolean.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/uint64.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/bytearray.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/optional.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$untyped$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/encoding/schema/untyped.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$block$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/types/block.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$client$2f$v2$2f$untypedmodel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/client/v2/untypedmodel.js [app-client] (ecmascript)");
;
;
;
class TealValue {
    constructor(params){
        this.type = params.type;
        this.bytes = params.bytes;
        this.uint = params.uint;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return TealValue.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'tt',
                this.type
            ],
            [
                'tb',
                this.bytes
            ],
            [
                'ui',
                this.uint
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded TealValue: ${data}`);
        }
        return new TealValue({
            type: Number(data.get('tt')),
            bytes: data.get('tb'),
            uint: data.get('ui')
        });
    }
}
TealValue.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'tt',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'tb',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$binarystring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecialCaseBinaryStringSchema"]())
    },
    {
        key: 'ui',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]())
    }
]));
class StateSchema {
    constructor(params){
        this.numUints = params.numUints;
        this.numByteSlices = params.numByteSlices;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return StateSchema.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'nui',
                this.numUints
            ],
            [
                'nbs',
                this.numByteSlices
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded StateSchema: ${data}`);
        }
        return new StateSchema({
            numUints: Number(data.get('nui')),
            numByteSlices: Number(data.get('nbs'))
        });
    }
}
StateSchema.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'nui',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'nbs',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class AppParams {
    constructor(params){
        this.approvalProgram = params.approvalProgram;
        this.clearStateProgram = params.clearStateProgram;
        this.globalState = params.globalState;
        this.localStateSchema = params.localStateSchema;
        this.globalStateSchema = params.globalStateSchema;
        this.extraProgramPages = params.extraProgramPages;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AppParams.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'approv',
                this.approvalProgram
            ],
            [
                'clearp',
                this.clearStateProgram
            ],
            [
                'gs',
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(this.globalState, (k, v)=>[
                        k,
                        v.toEncodingData()
                    ])
            ],
            [
                'lsch',
                this.localStateSchema.toEncodingData()
            ],
            [
                'gsch',
                this.globalStateSchema.toEncodingData()
            ],
            [
                'epp',
                this.extraProgramPages
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AppParams: ${data}`);
        }
        return new AppParams({
            approvalProgram: data.get('approv'),
            clearStateProgram: data.get('clearp'),
            globalState: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(data.get('gs'), (k, v)=>[
                    k,
                    TealValue.fromEncodingData(v)
                ]),
            localStateSchema: StateSchema.fromEncodingData(data.get('lsch')),
            globalStateSchema: StateSchema.fromEncodingData(data.get('gsch')),
            extraProgramPages: Number(data.get('epp'))
        });
    }
}
AppParams.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'approv',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ByteArraySchema"]()
    },
    {
        key: 'clearp',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ByteArraySchema"]()
    },
    {
        key: 'gs',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecialCaseBinaryStringMapSchema"](TealValue.encodingSchema)
    },
    {
        key: 'lsch',
        valueSchema: StateSchema.encodingSchema
    },
    {
        key: 'gsch',
        valueSchema: StateSchema.encodingSchema
    },
    {
        key: 'epp',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class AppLocalState {
    constructor(params){
        this.schema = params.schema;
        this.keyValue = params.keyValue;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AppLocalState.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'hsch',
                this.schema.toEncodingData()
            ],
            [
                'tkv',
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(this.keyValue, (k, v)=>[
                        k,
                        v.toEncodingData()
                    ])
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AppLocalState: ${data}`);
        }
        return new AppLocalState({
            schema: StateSchema.fromEncodingData(data.get('hsch')),
            keyValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(data.get('tkv'), (k, v)=>[
                    k,
                    TealValue.fromEncodingData(v)
                ])
        });
    }
}
AppLocalState.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'hsch',
        valueSchema: StateSchema.encodingSchema
    },
    {
        key: 'tkv',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecialCaseBinaryStringMapSchema"](TealValue.encodingSchema)
    }
]));
class AppLocalStateDelta {
    constructor(params){
        this.localState = params.localState;
        this.deleted = params.deleted;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AppLocalStateDelta.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'LocalState',
                this.localState ? this.localState.toEncodingData() : undefined
            ],
            [
                'Deleted',
                this.deleted
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AppLocalStateDelta: ${data}`);
        }
        return new AppLocalStateDelta({
            localState: data.get('LocalState') ? AppLocalState.fromEncodingData(data.get('LocalState')) : undefined,
            deleted: data.get('Deleted')
        });
    }
}
AppLocalStateDelta.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'LocalState',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](AppLocalState.encodingSchema)
    },
    {
        key: 'Deleted',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanSchema"]()
    }
]));
class AppParamsDelta {
    constructor(params){
        this.params = params.params;
        this.deleted = params.deleted;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AppParamsDelta.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'Params',
                this.params ? this.params.toEncodingData() : undefined
            ],
            [
                'Deleted',
                this.deleted
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AppParamsDelta: ${data}`);
        }
        return new AppParamsDelta({
            params: data.get('Params') ? AppParams.fromEncodingData(data.get('Params')) : undefined,
            deleted: data.get('Deleted')
        });
    }
}
AppParamsDelta.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'Params',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](AppParams.encodingSchema)
    },
    {
        key: 'Deleted',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanSchema"]()
    }
]));
class AppResourceRecord {
    constructor(params){
        this.id = params.id;
        this.address = params.address;
        this.params = params.params;
        this.state = params.state;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AppResourceRecord.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'Aidx',
                this.id
            ],
            [
                'Addr',
                this.address
            ],
            [
                'Params',
                this.params.toEncodingData()
            ],
            [
                'State',
                this.state.toEncodingData()
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AppResourceRecord: ${data}`);
        }
        return new AppResourceRecord({
            id: data.get('Aidx'),
            address: data.get('Addr'),
            params: AppParamsDelta.fromEncodingData(data.get('Params')),
            state: AppLocalStateDelta.fromEncodingData(data.get('State'))
        });
    }
}
AppResourceRecord.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'Aidx',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'Addr',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]()
    },
    {
        key: 'Params',
        valueSchema: AppParamsDelta.encodingSchema
    },
    {
        key: 'State',
        valueSchema: AppLocalStateDelta.encodingSchema
    }
]));
class AssetHolding {
    constructor(params){
        this.amount = params.amount;
        this.frozen = params.frozen;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AssetHolding.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'a',
                this.amount
            ],
            [
                'f',
                this.frozen
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AssetHolding: ${data}`);
        }
        return new AssetHolding({
            amount: data.get('a'),
            frozen: data.get('f')
        });
    }
}
AssetHolding.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'a',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'f',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanSchema"]()
    }
]));
class AssetHoldingDelta {
    constructor(params){
        this.holding = params.holding;
        this.deleted = params.deleted;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AssetHoldingDelta.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'Holding',
                this.holding ? this.holding.toEncodingData() : undefined
            ],
            [
                'Deleted',
                this.deleted
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AssetHoldingDelta: ${data}`);
        }
        return new AssetHoldingDelta({
            holding: data.get('Holding') ? AssetHolding.fromEncodingData(data.get('Holding')) : undefined,
            deleted: data.get('Deleted')
        });
    }
}
AssetHoldingDelta.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'Holding',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](AssetHolding.encodingSchema)
    },
    {
        key: 'Deleted',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanSchema"]()
    }
]));
class AssetParams {
    constructor(params){
        this.total = params.total;
        this.decimals = params.decimals;
        this.defaultFrozen = params.defaultFrozen;
        this.unitName = params.unitName;
        this.assetName = params.assetName;
        this.url = params.url;
        this.metadataHash = params.metadataHash;
        this.manager = params.manager;
        this.reserve = params.reserve;
        this.freeze = params.freeze;
        this.clawback = params.clawback;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AssetParams.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                't',
                this.total
            ],
            [
                'dc',
                this.decimals
            ],
            [
                'df',
                this.defaultFrozen
            ],
            [
                'un',
                this.unitName
            ],
            [
                'an',
                this.assetName
            ],
            [
                'au',
                this.url
            ],
            [
                'am',
                this.metadataHash
            ],
            [
                'm',
                this.manager
            ],
            [
                'r',
                this.reserve
            ],
            [
                'f',
                this.freeze
            ],
            [
                'c',
                this.clawback
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AssetParams: ${data}`);
        }
        return new AssetParams({
            total: data.get('t'),
            decimals: data.get('dc'),
            defaultFrozen: data.get('df'),
            unitName: data.get('un'),
            assetName: data.get('an'),
            url: data.get('au'),
            metadataHash: data.get('am'),
            manager: data.get('m'),
            reserve: data.get('r'),
            freeze: data.get('f'),
            clawback: data.get('c')
        });
    }
}
AssetParams.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 't',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'dc',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'df',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanSchema"]()
    },
    {
        key: 'un',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$binarystring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecialCaseBinaryStringSchema"]())
    },
    {
        key: 'an',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$binarystring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecialCaseBinaryStringSchema"]())
    },
    {
        key: 'au',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$binarystring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecialCaseBinaryStringSchema"]())
    },
    {
        key: 'am',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FixedLengthByteArraySchema"](32)
    },
    {
        key: 'm',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]())
    },
    {
        key: 'r',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]())
    },
    {
        key: 'f',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]())
    },
    {
        key: 'c',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]())
    }
]));
class AssetParamsDelta {
    constructor(params){
        this.params = params.params;
        this.deleted = params.deleted;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AssetParamsDelta.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'Params',
                this.params ? this.params.toEncodingData() : undefined
            ],
            [
                'Deleted',
                this.deleted
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AssetParamsDelta: ${data}`);
        }
        return new AssetParamsDelta({
            params: data.get('Params') ? AssetParams.fromEncodingData(data.get('Params')) : undefined,
            deleted: data.get('Deleted')
        });
    }
}
AssetParamsDelta.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'Params',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](AssetParams.encodingSchema)
    },
    {
        key: 'Deleted',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanSchema"]()
    }
]));
class AssetResourceRecord {
    constructor(params){
        this.id = params.id;
        this.address = params.address;
        this.params = params.params;
        this.holding = params.holding;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AssetResourceRecord.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'Aidx',
                this.id
            ],
            [
                'Addr',
                this.address
            ],
            [
                'Params',
                this.params.toEncodingData()
            ],
            [
                'Holding',
                this.holding.toEncodingData()
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AssetResourceRecord: ${data}`);
        }
        return new AssetResourceRecord({
            id: data.get('Aidx'),
            address: data.get('Addr'),
            params: AssetParamsDelta.fromEncodingData(data.get('Params')),
            holding: AssetHoldingDelta.fromEncodingData(data.get('Holding'))
        });
    }
}
AssetResourceRecord.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'Aidx',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'Addr',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]()
    },
    {
        key: 'Params',
        valueSchema: AssetParamsDelta.encodingSchema
    },
    {
        key: 'Holding',
        valueSchema: AssetHoldingDelta.encodingSchema
    }
]));
class VotingData {
    constructor(params){
        this.voteID = params.voteID;
        this.selectionID = params.selectionID;
        this.stateProofID = params.stateProofID;
        this.voteFirstValid = params.voteFirstValid;
        this.voteLastValid = params.voteLastValid;
        this.voteKeyDilution = params.voteKeyDilution;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return VotingData.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'VoteID',
                this.voteID
            ],
            [
                'SelectionID',
                this.selectionID
            ],
            [
                'StateProofID',
                this.stateProofID
            ],
            [
                'VoteFirstValid',
                this.voteFirstValid
            ],
            [
                'VoteLastValid',
                this.voteLastValid
            ],
            [
                'VoteKeyDilution',
                this.voteKeyDilution
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded VotingData: ${data}`);
        }
        return new VotingData({
            voteID: data.get('VoteID'),
            selectionID: data.get('SelectionID'),
            stateProofID: data.get('StateProofID'),
            voteFirstValid: data.get('VoteFirstValid'),
            voteLastValid: data.get('VoteLastValid'),
            voteKeyDilution: data.get('VoteKeyDilution')
        });
    }
}
VotingData.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'VoteID',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FixedLengthByteArraySchema"](32)
    },
    {
        key: 'SelectionID',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FixedLengthByteArraySchema"](32)
    },
    {
        key: 'StateProofID',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FixedLengthByteArraySchema"](64)
    },
    {
        key: 'VoteFirstValid',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'VoteLastValid',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'VoteKeyDilution',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class AccountBaseData {
    constructor(params){
        this.status = params.status;
        this.microAlgos = params.microAlgos;
        this.rewardsBase = params.rewardsBase;
        this.rewardedMicroAlgos = params.rewardedMicroAlgos;
        this.authAddr = params.authAddr;
        this.incentiveEligible = params.incentiveEligible;
        this.totalAppSchema = params.totalAppSchema;
        this.totalExtraAppPages = params.totalExtraAppPages;
        this.totalAppParams = params.totalAppParams;
        this.totalAppLocalStates = params.totalAppLocalStates;
        this.totalAssetParams = params.totalAssetParams;
        this.totalAssets = params.totalAssets;
        this.totalBoxes = params.totalBoxes;
        this.totalBoxBytes = params.totalBoxBytes;
        this.lastProposed = params.lastProposed;
        this.lastHeartbeat = params.lastHeartbeat;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AccountBaseData.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'Status',
                this.status
            ],
            [
                'MicroAlgos',
                this.microAlgos
            ],
            [
                'RewardsBase',
                this.rewardsBase
            ],
            [
                'RewardedMicroAlgos',
                this.rewardedMicroAlgos
            ],
            [
                'AuthAddr',
                this.authAddr
            ],
            [
                'IncentiveEligible',
                this.incentiveEligible
            ],
            [
                'TotalAppSchema',
                this.totalAppSchema.toEncodingData()
            ],
            [
                'TotalExtraAppPages',
                this.totalExtraAppPages
            ],
            [
                'TotalAppParams',
                this.totalAppParams
            ],
            [
                'TotalAppLocalStates',
                this.totalAppLocalStates
            ],
            [
                'TotalAssetParams',
                this.totalAssetParams
            ],
            [
                'TotalAssets',
                this.totalAssets
            ],
            [
                'TotalBoxes',
                this.totalBoxes
            ],
            [
                'TotalBoxBytes',
                this.totalBoxBytes
            ],
            [
                'LastProposed',
                this.lastProposed
            ],
            [
                'LastHeartbeat',
                this.lastHeartbeat
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AccountBaseData: ${data}`);
        }
        return new AccountBaseData({
            status: Number(data.get('Status')),
            microAlgos: data.get('MicroAlgos'),
            rewardsBase: data.get('RewardsBase'),
            rewardedMicroAlgos: data.get('RewardedMicroAlgos'),
            authAddr: data.get('AuthAddr'),
            incentiveEligible: data.get('IncentiveEligible'),
            totalAppSchema: StateSchema.fromEncodingData(data.get('TotalAppSchema')),
            totalExtraAppPages: Number(data.get('TotalExtraAppPages')),
            totalAppParams: data.get('TotalAppParams'),
            totalAppLocalStates: data.get('TotalAppLocalStates'),
            totalAssetParams: data.get('TotalAssetParams'),
            totalAssets: data.get('TotalAssets'),
            totalBoxes: data.get('TotalBoxes'),
            totalBoxBytes: data.get('TotalBoxBytes'),
            lastProposed: data.get('LastProposed'),
            lastHeartbeat: data.get('LastHeartbeat')
        });
    }
}
AccountBaseData.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'Status',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'MicroAlgos',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'RewardsBase',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'RewardedMicroAlgos',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'AuthAddr',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]()
    },
    {
        key: 'IncentiveEligible',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanSchema"]()
    },
    {
        key: 'TotalAppSchema',
        valueSchema: StateSchema.encodingSchema
    },
    {
        key: 'TotalExtraAppPages',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'TotalAppParams',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'TotalAppLocalStates',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'TotalAssetParams',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'TotalAssets',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'TotalBoxes',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'TotalBoxBytes',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'LastProposed',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'LastHeartbeat',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class AccountData {
    constructor(params){
        this.accountBaseData = params.accountBaseData;
        this.votingData = params.votingData;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AccountData.encodingSchema;
    }
    toEncodingData() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["combineMaps"])(this.accountBaseData.toEncodingData(), this.votingData.toEncodingData());
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AccountData: ${data}`);
        }
        return new AccountData({
            accountBaseData: AccountBaseData.fromEncodingData(data),
            votingData: VotingData.fromEncodingData(data)
        });
    }
}
AccountData.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: '',
        valueSchema: AccountBaseData.encodingSchema,
        embedded: true
    },
    {
        key: '',
        valueSchema: VotingData.encodingSchema,
        embedded: true
    }
]));
class BalanceRecord {
    constructor(params){
        this.addr = params.addr;
        this.accountData = params.accountData;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return BalanceRecord.encodingSchema;
    }
    toEncodingData() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["combineMaps"])(new Map([
            [
                'Addr',
                this.addr
            ]
        ]), this.accountData.toEncodingData());
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded BalanceRecord: ${data}`);
        }
        return new BalanceRecord({
            addr: data.get('Addr'),
            accountData: AccountData.fromEncodingData(data)
        });
    }
}
BalanceRecord.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'Addr',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]()
    },
    {
        key: '',
        valueSchema: AccountData.encodingSchema,
        embedded: true
    }
]));
class AccountDeltas {
    constructor(params){
        this.accounts = params.accounts;
        this.appResources = params.appResources;
        this.assetResources = params.assetResources;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AccountDeltas.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'Accts',
                this.accounts.map((account)=>account.toEncodingData())
            ],
            [
                'AppResources',
                this.appResources.length === 0 ? undefined : this.appResources.map((appResource)=>appResource.toEncodingData())
            ],
            [
                'AssetResources',
                this.assetResources.length === 0 ? undefined : this.assetResources.map((assetResource)=>assetResource.toEncodingData())
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AccountDeltas: ${data}`);
        }
        return new AccountDeltas({
            accounts: (data.get('Accts') ?? []).map(BalanceRecord.fromEncodingData),
            appResources: (data.get('AppResources') ?? []).map(AppResourceRecord.fromEncodingData),
            assetResources: (data.get('AssetResources') ?? []).map(AssetResourceRecord.fromEncodingData)
        });
    }
}
AccountDeltas.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'Accts',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySchema"](BalanceRecord.encodingSchema)
    },
    {
        key: 'AppResources',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySchema"](AppResourceRecord.encodingSchema))
    },
    {
        key: 'AssetResources',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySchema"](AssetResourceRecord.encodingSchema))
    }
]));
class KvValueDelta {
    constructor(params){
        this.data = params.data;
        this.oldData = params.oldData;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return KvValueDelta.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'Data',
                this.data
            ],
            [
                'OldData',
                this.oldData
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded KvValueDelta: ${data}`);
        }
        return new KvValueDelta({
            data: data.get('Data'),
            oldData: data.get('OldData')
        });
    }
}
KvValueDelta.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'Data',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ByteArraySchema"]())
    },
    {
        key: 'OldData',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$bytearray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ByteArraySchema"]())
    }
]));
class IncludedTransactions {
    constructor(params){
        this.lastValid = params.lastValid;
        this.intra = params.intra;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return IncludedTransactions.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'LastValid',
                this.lastValid
            ],
            [
                'Intra',
                this.intra
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded IncludedTransactions: ${data}`);
        }
        return new IncludedTransactions({
            lastValid: data.get('LastValid'),
            intra: Number(data.get('Intra'))
        });
    }
}
IncludedTransactions.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'LastValid',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'Intra',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class ModifiedCreatable {
    constructor(params){
        this.creatableType = params.creatableType;
        this.created = params.created;
        this.creator = params.creator;
        this.ndeltas = params.ndeltas;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return ModifiedCreatable.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'Ctype',
                this.creatableType
            ],
            [
                'Created',
                this.created
            ],
            [
                'Creator',
                this.creator
            ],
            [
                'Ndeltas',
                this.ndeltas
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded ModifiedCreatable: ${data}`);
        }
        return new ModifiedCreatable({
            creatableType: Number(data.get('Ctype')),
            created: data.get('Created'),
            creator: data.get('Creator'),
            ndeltas: Number(data.get('Ndeltas'))
        });
    }
}
ModifiedCreatable.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'Ctype',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'Created',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$boolean$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanSchema"]()
    },
    {
        key: 'Creator',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressSchema"]()
    },
    {
        key: 'Ndeltas',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class AlgoCount {
    constructor(params){
        this.money = params.money;
        this.rewardUnits = params.rewardUnits;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AlgoCount.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'mon',
                this.money
            ],
            [
                'rwd',
                this.rewardUnits
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AlgoCount: ${data}`);
        }
        return new AlgoCount({
            money: data.get('mon'),
            rewardUnits: data.get('rwd')
        });
    }
}
AlgoCount.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'mon',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'rwd',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class AccountTotals {
    constructor(params){
        this.online = params.online;
        this.offline = params.offline;
        this.notParticipating = params.notParticipating;
        this.rewardsLevel = params.rewardsLevel;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return AccountTotals.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'online',
                this.online.toEncodingData()
            ],
            [
                'offline',
                this.offline.toEncodingData()
            ],
            [
                'notpart',
                this.notParticipating.toEncodingData()
            ],
            [
                'rwdlvl',
                this.rewardsLevel
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded AccountTotals: ${data}`);
        }
        return new AccountTotals({
            online: AlgoCount.fromEncodingData(data.get('online')),
            offline: AlgoCount.fromEncodingData(data.get('offline')),
            notParticipating: AlgoCount.fromEncodingData(data.get('notpart')),
            rewardsLevel: data.get('rwdlvl')
        });
    }
}
AccountTotals.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'online',
        valueSchema: AlgoCount.encodingSchema
    },
    {
        key: 'offline',
        valueSchema: AlgoCount.encodingSchema
    },
    {
        key: 'notpart',
        valueSchema: AlgoCount.encodingSchema
    },
    {
        key: 'rwdlvl',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    }
]));
class LedgerStateDelta {
    constructor(params){
        this.accounts = params.accounts;
        this.kvMods = params.kvMods;
        this.txids = params.txids;
        this.txleases = params.txleases;
        this.creatables = params.creatables;
        this.blockHeader = params.blockHeader;
        this.stateProofNext = params.stateProofNext;
        this.prevTimestamp = params.prevTimestamp;
        this.totals = params.totals;
    }
    // eslint-disable-next-line class-methods-use-this
    getEncodingSchema() {
        return LedgerStateDelta.encodingSchema;
    }
    toEncodingData() {
        return new Map([
            [
                'Accts',
                this.accounts.toEncodingData()
            ],
            [
                'KvMods',
                this.kvMods.size === 0 ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(this.kvMods, (key, value)=>[
                        key,
                        value.toEncodingData()
                    ])
            ],
            [
                'Txids',
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(this.txids, (key, value)=>[
                        key,
                        value.toEncodingData()
                    ])
            ],
            [
                'Txleases',
                this.txleases.toEncodingData()
            ],
            [
                'Creatables',
                this.creatables.size === 0 ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(this.creatables, (key, value)=>[
                        key,
                        value.toEncodingData()
                    ])
            ],
            [
                'Hdr',
                this.blockHeader.toEncodingData()
            ],
            [
                'StateProofNext',
                this.stateProofNext
            ],
            [
                'PrevTimestamp',
                this.prevTimestamp
            ],
            [
                'Totals',
                this.totals.toEncodingData()
            ]
        ]);
    }
    static fromEncodingData(data) {
        if (!(data instanceof Map)) {
            throw new Error(`Invalid decoded LedgerStateDelta: ${data}`);
        }
        return new LedgerStateDelta({
            accounts: AccountDeltas.fromEncodingData(data.get('Accts')),
            kvMods: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(data.get('KvMods') ?? new Map(), (key, value)=>[
                    key,
                    KvValueDelta.fromEncodingData(value)
                ]),
            txids: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(data.get('Txids'), (key, value)=>[
                    key,
                    IncludedTransactions.fromEncodingData(value)
                ]),
            txleases: __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$client$2f$v2$2f$untypedmodel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UntypedValue"].fromEncodingData(data.get('Txleases')),
            creatables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMap"])(data.get('Creatables') ?? new Map(), (key, value)=>[
                    key,
                    ModifiedCreatable.fromEncodingData(value)
                ]),
            blockHeader: __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$block$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockHeader"].fromEncodingData(data.get('Hdr')),
            stateProofNext: data.get('StateProofNext'),
            prevTimestamp: data.get('PrevTimestamp'),
            totals: AccountTotals.fromEncodingData(data.get('Totals'))
        });
    }
}
LedgerStateDelta.encodingSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NamedMapSchema"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allOmitEmpty"])([
    {
        key: 'Accts',
        valueSchema: AccountDeltas.encodingSchema
    },
    {
        key: 'KvMods',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecialCaseBinaryStringMapSchema"](KvValueDelta.encodingSchema))
    },
    {
        key: 'Txids',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ByteArrayMapSchema"](IncludedTransactions.encodingSchema)
    },
    {
        key: 'Txleases',
        // Note: because txleases is currently just an UntypedSchema and we are expected to decode
        // null values for this field, we use OptionalSchema to coerce null values to undefined so
        // that the values can be properly omitted during encoding.
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$untyped$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UntypedSchema"]())
    },
    {
        key: 'Creatables',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$optional$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionalSchema"](new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64MapSchema"](ModifiedCreatable.encodingSchema))
    },
    {
        key: 'Hdr',
        valueSchema: __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$block$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockHeader"].encodingSchema
    },
    {
        key: 'StateProofNext',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'PrevTimestamp',
        valueSchema: new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$encoding$2f$schema$2f$uint64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint64Schema"]()
    },
    {
        key: 'Totals',
        valueSchema: AccountTotals.encodingSchema
    }
])); //# sourceMappingURL=statedelta.js.map
}),
"[project]/gradzcap/node_modules/algosdk/dist/esm/types/transactions/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ENCODED_MULTISIG_SCHEMA",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$encoded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENCODED_MULTISIG_SCHEMA"],
    "ENCODED_SUBSIG_SCHEMA",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$encoded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENCODED_SUBSIG_SCHEMA"],
    "OnApplicationComplete",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnApplicationComplete"],
    "TransactionType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionType"],
    "encodedMultiSigFromEncodingData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$encoded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodedMultiSigFromEncodingData"],
    "encodedMultiSigToEncodingData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$encoded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodedMultiSigToEncodingData"],
    "encodedSubsigFromEncodingData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$encoded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodedSubsigFromEncodingData"],
    "encodedSubsigToEncodingData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$encoded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodedSubsigToEncodingData"],
    "isOnApplicationComplete",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOnApplicationComplete"],
    "isTransactionType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTransactionType"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/types/transactions/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/types/transactions/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$types$2f$transactions$2f$encoded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/algosdk/dist/esm/types/transactions/encoded.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=81719_algosdk_dist_esm_types_ed98c5b0._.js.map