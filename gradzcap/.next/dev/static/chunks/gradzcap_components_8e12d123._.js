(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/gradzcap/components/providers/AlgorandProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlgorandProvider",
    ()=>AlgorandProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/gradzcap/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/@txnlab/use-wallet-react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/@txnlab/use-wallet/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function createWalletManager() {
    const wcProjectId = ("TURBOPACK compile-time value", "1b31b72bc2e4720c20177b0263e9fd94");
    return new __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletManager"]({
        wallets: [
            __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletId"].KIBISIS,
            __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletId"].EXODUS,
            __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletId"].PERA,
            __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletId"].DEFLY,
            ...("TURBOPACK compile-time truthy", 1) ? [
                {
                    id: __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletId"].WALLETCONNECT,
                    options: {
                        projectId: wcProjectId
                    }
                }
            ] : "TURBOPACK unreachable"
        ],
        networks: {
            [__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkId"].TESTNET]: {
                algod: {
                    token: "",
                    baseServer: "https://testnet-api.algonode.cloud",
                    port: 443
                }
            }
        },
        defaultNetwork: __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkId"].TESTNET
    });
}
function AlgorandProvider({ children }) {
    _s();
    // Defer WalletManager creation until after client mount so browser extension
    // providers (e.g. Kibisis via window.algorand / AVM Web Provider) have had a
    // chance to inject into the page before we scan for them.
    const [walletManager, setWalletManager] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AlgorandProvider.useEffect": ()=>{
            // Small delay lets extension content-scripts inject window.algorand
            const id = setTimeout({
                "AlgorandProvider.useEffect.id": ()=>setWalletManager(createWalletManager())
            }["AlgorandProvider.useEffect.id"], 100);
            return ({
                "AlgorandProvider.useEffect": ()=>clearTimeout(id)
            })["AlgorandProvider.useEffect"];
        }
    }["AlgorandProvider.useEffect"], []);
    if (!walletManager) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f40$txnlab$2f$use$2d$wallet$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WalletProvider"], {
        manager: walletManager,
        children: children
    }, void 0, false, {
        fileName: "[project]/gradzcap/components/providers/AlgorandProvider.tsx",
        lineNumber: 49,
        columnNumber: 10
    }, this);
}
_s(AlgorandProvider, "BxOmuDwDX0zpTGIgPPAQyubHRWk=");
_c = AlgorandProvider;
var _c;
__turbopack_context__.k.register(_c, "AlgorandProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/gradzcap/components/custom-cursor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomCursor",
    ()=>CustomCursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/gradzcap/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function CustomCursor() {
    _s();
    const outerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const innerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const positionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const targetPositionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const isPointerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomCursor.useEffect": ()=>{
            let animationFrameId;
            const lerp = {
                "CustomCursor.useEffect.lerp": (start, end, factor)=>{
                    return start + (end - start) * factor;
                }
            }["CustomCursor.useEffect.lerp"];
            const updateCursor = {
                "CustomCursor.useEffect.updateCursor": ()=>{
                    positionRef.current.x = lerp(positionRef.current.x, targetPositionRef.current.x, 0.15);
                    positionRef.current.y = lerp(positionRef.current.y, targetPositionRef.current.y, 0.15);
                    if (outerRef.current && innerRef.current) {
                        const scale = isPointerRef.current ? 1.5 : 1;
                        const innerScale = isPointerRef.current ? 0.5 : 1;
                        outerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
                        innerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${innerScale})`;
                    }
                    animationFrameId = requestAnimationFrame(updateCursor);
                }
            }["CustomCursor.useEffect.updateCursor"];
            const handleMouseMove = {
                "CustomCursor.useEffect.handleMouseMove": (e)=>{
                    targetPositionRef.current = {
                        x: e.clientX,
                        y: e.clientY
                    };
                    const target = e.target;
                    isPointerRef.current = window.getComputedStyle(target).cursor === "pointer" || target.tagName === "BUTTON" || target.tagName === "A";
                }
            }["CustomCursor.useEffect.handleMouseMove"];
            window.addEventListener("mousemove", handleMouseMove, {
                passive: true
            });
            animationFrameId = requestAnimationFrame(updateCursor);
            return ({
                "CustomCursor.useEffect": ()=>{
                    window.removeEventListener("mousemove", handleMouseMove);
                    cancelAnimationFrame(animationFrameId);
                }
            })["CustomCursor.useEffect"];
        }
    }["CustomCursor.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: outerRef,
                className: "pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference will-change-transform",
                style: {
                    contain: "layout style paint"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-4 w-4 rounded-full border-2 border-white"
                }, void 0, false, {
                    fileName: "[project]/gradzcap/components/custom-cursor.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/gradzcap/components/custom-cursor.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: innerRef,
                className: "pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference will-change-transform",
                style: {
                    contain: "layout style paint"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$gradzcap$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-2 w-2 rounded-full bg-white"
                }, void 0, false, {
                    fileName: "[project]/gradzcap/components/custom-cursor.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/gradzcap/components/custom-cursor.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(CustomCursor, "rLPlVjHXDoR+dBsogG7T3awhpzk=");
_c = CustomCursor;
var _c;
__turbopack_context__.k.register(_c, "CustomCursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=gradzcap_components_8e12d123._.js.map