(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/providers/AlgorandProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlgorandProvider",
    ()=>AlgorandProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@txnlab/use-wallet-react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@txnlab/use-wallet/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AlgorandProvider({ children }) {
    _s();
    // Initialise inside useMemo so the manager is never recreated on re-renders
    // and is never constructed during SSR (this component is "use client")
    const walletManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AlgorandProvider.useMemo[walletManager]": ()=>{
            const wcProjectId = ("TURBOPACK compile-time value", "1b31b72bc2e4720c20177b0263e9fd94");
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletManager"]({
                wallets: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletId"].EXODUS,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletId"].PERA,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletId"].DEFLY,
                    ...("TURBOPACK compile-time truthy", 1) ? [
                        {
                            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletId"].WALLETCONNECT,
                            options: {
                                projectId: wcProjectId
                            }
                        }
                    ] : "TURBOPACK unreachable"
                ],
                networks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_NETWORK_CONFIG"],
                defaultNetwork: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkId"].TESTNET
            });
        }
    }["AlgorandProvider.useMemo[walletManager]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WalletProvider"], {
        manager: walletManager,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/providers/AlgorandProvider.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_s(AlgorandProvider, "/xYNpZK3nRZeufwPPErdQbUaXEs=");
_c = AlgorandProvider;
var _c;
__turbopack_context__.k.register(_c, "AlgorandProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_providers_AlgorandProvider_tsx_f484df7a._.js.map