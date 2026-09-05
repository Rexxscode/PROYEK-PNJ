(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/app/components/layout/dashboardheader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function DashboardHeader({ title, subtitle, actions }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-6 sm:mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 sm:gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-12 lg:hidden flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/components/layout/dashboardheader.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "flex-1 min-w-0 text-lg sm:text-2xl font-bold text-foreground",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/components/layout/dashboardheader.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 sm:gap-2 flex-shrink-0",
                        children: actions
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/components/layout/dashboardheader.tsx",
                        lineNumber: 20,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/components/layout/dashboardheader.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs sm:text-sm text-muted mt-1 pl-14 lg:pl-0 pr-4 leading-relaxed break-words",
                children: subtitle
            }, void 0, false, {
                fileName: "[project]/frontend/app/components/layout/dashboardheader.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/components/layout/dashboardheader.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = DashboardHeader;
var _c;
__turbopack_context__.k.register(_c, "DashboardHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/lib/utils.ts [app-client] (ecmascript)");
;
;
const variantStyles = {
    default: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    primary: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    danger: "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300",
    secondary: "bg-primary/10 text-primary"
};
function Badge({ children, variant = "default", className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variantStyles[variant], className),
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/app/components/ui/badge.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ children, className, hover = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card rounded-xl border border-border p-6", hover && "hover-lift hover:shadow-md hover:border-primary/20 cursor-pointer", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/app/components/ui/card.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SkeletonCard",
    ()=>SkeletonCard,
    "SkeletonDashboard",
    ()=>SkeletonDashboard,
    "SkeletonTable",
    ()=>SkeletonTable,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "skeleton",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Skeleton;
function SkeletonCard({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-2xl border border-border bg-card p-6", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 mb-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                    className: "w-10 h-10 rounded-lg"
                }, void 0, false, {
                    fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                            className: "h-3 w-24"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                            className: "h-5 w-16"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c1 = SkeletonCard;
function SkeletonDashboard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                        className: "h-8 w-64 mb-2"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                        className: "h-4 w-48"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8",
                children: Array.from({
                    length: 4
                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonCard, {}, i, false, {
                        fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                        className: "h-64 rounded-2xl"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                        className: "h-64 rounded-2xl"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                className: "h-48 rounded-2xl"
            }, void 0, false, {
                fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c2 = SkeletonDashboard;
function SkeletonTable({ rows = 5 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                className: "h-4 w-40 mb-4"
            }, void 0, false, {
                fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            Array.from({
                length: rows
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4 p-4 rounded-xl border border-border",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                            className: "w-10 h-10 rounded-full shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                                    className: "h-4 w-32"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                                    className: "h-3 w-48"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                            className: "h-6 w-16 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/components/ui/skeleton.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c3 = SkeletonTable;
const __TURBOPACK__default__export__ = Skeleton;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Skeleton");
__turbopack_context__.k.register(_c1, "SkeletonCard");
__turbopack_context__.k.register(_c2, "SkeletonDashboard");
__turbopack_context__.k.register(_c3, "SkeletonTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/lib/career-match.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateCareerMatches",
    ()=>generateCareerMatches,
    "loadCareerMatches",
    ()=>loadCareerMatches,
    "saveCareerMatches",
    ()=>saveCareerMatches
]);
const rplCareers = [
    {
        id: "rpl-cm-01",
        title: "Backend Developer",
        description: "Mengembangkan server-side application, API, dan database.",
        category: "Software Engineering",
        requiredSkills: [
            {
                name: "Node.js",
                requiredLevel: 4
            },
            {
                name: "Express.js",
                requiredLevel: 4
            },
            {
                name: "SQL/Database",
                requiredLevel: 4
            },
            {
                name: "REST API",
                requiredLevel: 4
            }
        ]
    },
    {
        id: "rpl-cm-02",
        title: "Fullstack Developer",
        description: "Mengembangkan aplikasi web end-to-end frontend hingga backend.",
        category: "Software Engineering",
        requiredSkills: [
            {
                name: "React/Next.js",
                requiredLevel: 4
            },
            {
                name: "Node.js",
                requiredLevel: 4
            },
            {
                name: "TypeScript",
                requiredLevel: 3
            },
            {
                name: "SQL/Database",
                requiredLevel: 3
            }
        ]
    },
    {
        id: "rpl-cm-03",
        title: "Frontend Developer",
        description: "Membangun antarmuka pengguna responsif dan interaktif.",
        category: "Software Engineering",
        requiredSkills: [
            {
                name: "React/Next.js",
                requiredLevel: 5
            },
            {
                name: "TypeScript",
                requiredLevel: 4
            },
            {
                name: "HTML/CSS",
                requiredLevel: 5
            },
            {
                name: "JavaScript",
                requiredLevel: 5
            }
        ]
    },
    {
        id: "rpl-cm-04",
        title: "DevOps Engineer",
        description: "Mengelola infrastruktur, CI/CD, dan deployment.",
        category: "Infrastructure",
        requiredSkills: [
            {
                name: "Docker",
                requiredLevel: 5
            },
            {
                name: "Git",
                requiredLevel: 5
            },
            {
                name: "CI/CD",
                requiredLevel: 4
            },
            {
                name: "Linux Basics",
                requiredLevel: 3
            }
        ]
    },
    {
        id: "rpl-cm-05",
        title: "Mobile App Developer",
        description: "Membangun aplikasi mobile cross-platform dengan Flutter atau React Native.",
        category: "Software Engineering",
        requiredSkills: [
            {
                name: "React Native",
                requiredLevel: 4
            },
            {
                name: "JavaScript",
                requiredLevel: 4
            },
            {
                name: "REST API",
                requiredLevel: 3
            },
            {
                name: "Mobile UI/UX",
                requiredLevel: 3
            }
        ]
    }
];
const dkvCareers = [
    {
        id: "dkv-cm-01",
        title: "UI/UX Designer",
        description: "Merancang antarmuka pengguna yang intuitif dan user-friendly.",
        category: "Design",
        requiredSkills: [
            {
                name: "UI/UX Design",
                requiredLevel: 5
            },
            {
                name: "Figma",
                requiredLevel: 5
            },
            {
                name: "Adobe Photoshop",
                requiredLevel: 3
            }
        ]
    },
    {
        id: "dkv-cm-02",
        title: "Graphic Designer",
        description: "Membuat visual branding, marketing material, dan ilustrasi.",
        category: "Design",
        requiredSkills: [
            {
                name: "Adobe Photoshop",
                requiredLevel: 5
            },
            {
                name: "Adobe Illustrator",
                requiredLevel: 5
            },
            {
                name: "UI/UX Design",
                requiredLevel: 2
            }
        ]
    },
    {
        id: "dkv-cm-03",
        title: "Motion Graphics Designer",
        description: "Membuat animasi dan video motion graphics untuk konten digital.",
        category: "Design",
        requiredSkills: [
            {
                name: "Adobe Photoshop",
                requiredLevel: 4
            },
            {
                name: "Adobe Illustrator",
                requiredLevel: 3
            },
            {
                name: "UI/UX Design",
                requiredLevel: 3
            }
        ]
    },
    {
        id: "dkv-cm-04",
        title: "Brand Identity Designer",
        description: "Merancang identitas visual merek dan guidelines.",
        category: "Design",
        requiredSkills: [
            {
                name: "Adobe Illustrator",
                requiredLevel: 5
            },
            {
                name: "Adobe Photoshop",
                requiredLevel: 4
            },
            {
                name: "UI/UX Design",
                requiredLevel: 4
            }
        ]
    },
    {
        id: "dkv-cm-05",
        title: "Product Designer",
        description: "Mendesain produk digital dari riset hingga prototype interaktif.",
        category: "Design",
        requiredSkills: [
            {
                name: "Figma",
                requiredLevel: 5
            },
            {
                name: "UI/UX Design",
                requiredLevel: 5
            },
            {
                name: "Adobe Photoshop",
                requiredLevel: 3
            }
        ]
    }
];
const tkjCareers = [
    {
        id: "tkj-cm-01",
        title: "System Administrator",
        description: "Mengelola server, sistem operasi, dan infrastruktur IT.",
        category: "IT Infrastructure",
        requiredSkills: [
            {
                name: "Linux Administration",
                requiredLevel: 4
            },
            {
                name: "Docker",
                requiredLevel: 3
            },
            {
                name: "Cloud (AWS/GCP)",
                requiredLevel: 3
            }
        ]
    },
    {
        id: "tkj-cm-02",
        title: "Network Administrator",
        description: "Mengelola dan mengamankan jaringan perusahaan.",
        category: "IT Infrastructure",
        requiredSkills: [
            {
                name: "Networking",
                requiredLevel: 5
            },
            {
                name: "Cisco Networking",
                requiredLevel: 4
            },
            {
                name: "MikroTik",
                requiredLevel: 3
            }
        ]
    },
    {
        id: "tkj-cm-03",
        title: "Cloud Engineer",
        description: "Mengelola infrastruktur cloud, deployment, dan scaling.",
        category: "Cloud",
        requiredSkills: [
            {
                name: "Cloud (AWS/GCP)",
                requiredLevel: 5
            },
            {
                name: "Docker",
                requiredLevel: 4
            },
            {
                name: "Linux Administration",
                requiredLevel: 3
            }
        ]
    },
    {
        id: "tkj-cm-04",
        title: "Cybersecurity Analyst",
        description: "Melindungi sistem dari serangan dan melakukan forensik digital.",
        category: "Security",
        requiredSkills: [
            {
                name: "Cybersecurity Basics",
                requiredLevel: 5
            },
            {
                name: "Linux Administration",
                requiredLevel: 4
            },
            {
                name: "Networking",
                requiredLevel: 3
            }
        ]
    },
    {
        id: "tkj-cm-05",
        title: "IT Support Specialist",
        description: "Troubleshooting hardware, software, dan user support.",
        category: "IT Support",
        requiredSkills: [
            {
                name: "Networking",
                requiredLevel: 3
            },
            {
                name: "Linux Administration",
                requiredLevel: 3
            },
            {
                name: "Cybersecurity Basics",
                requiredLevel: 2
            }
        ]
    }
];
const transmisiCareers = [
    {
        id: "tt-cm-01",
        title: "Network Engineer",
        description: "Mengelola dan memelihara infrastruktur jaringan backbone.",
        category: "Networking",
        requiredSkills: [
            {
                name: "Networking Basics",
                requiredLevel: 5
            },
            {
                name: "Fiber Optics",
                requiredLevel: 4
            },
            {
                name: "Radio Frequency",
                requiredLevel: 3
            }
        ]
    },
    {
        id: "tt-cm-02",
        title: "Telecom Technician",
        description: "Instalasi dan maintenance sistem telekomunikasi.",
        category: "Telecom",
        requiredSkills: [
            {
                name: "Fiber Optics",
                requiredLevel: 5
            },
            {
                name: "Networking Basics",
                requiredLevel: 4
            },
            {
                name: "Radio Frequency",
                requiredLevel: 3
            }
        ]
    },
    {
        id: "tt-cm-03",
        title: "NOC Analyst",
        description: "Monitoring dan troubleshooting jaringan 24/7.",
        category: "Networking",
        requiredSkills: [
            {
                name: "Networking Basics",
                requiredLevel: 4
            },
            {
                name: "Fiber Optics",
                requiredLevel: 3
            },
            {
                name: "Radio Frequency",
                requiredLevel: 3
            }
        ]
    },
    {
        id: "tt-cm-04",
        title: "RF Engineer",
        description: "Perencanaan dan optimasi radio link wireless.",
        category: "Radio",
        requiredSkills: [
            {
                name: "Radio Frequency",
                requiredLevel: 5
            },
            {
                name: "Networking Basics",
                requiredLevel: 4
            },
            {
                name: "Fiber Optics",
                requiredLevel: 2
            }
        ]
    },
    {
        id: "tt-cm-05",
        title: "Fiber Optic Specialist",
        description: "Instalasi, splicing, dan testing kabel fiber optik.",
        category: "Fiber",
        requiredSkills: [
            {
                name: "Fiber Optics",
                requiredLevel: 5
            },
            {
                name: "Networking Basics",
                requiredLevel: 3
            },
            {
                name: "Radio Frequency",
                requiredLevel: 2
            }
        ]
    }
];
const careerMap = {
    "Rekayasa Perangkat Lunak": rplCareers,
    "Desain Komunikasi Visual": dkvCareers,
    "Teknik Jaringan, Komputer, dan Telekomunikasi": [
        ...tkjCareers,
        ...transmisiCareers
    ]
};
const shortCodeToMajorName = {
    RPL: "Rekayasa Perangkat Lunak",
    DKV: "Desain Komunikasi Visual",
    TJKT: "Teknik Jaringan, Komputer, dan Telekomunikasi"
};
function normalizeMajorKey(major) {
    return shortCodeToMajorName[major] || major;
}
function skillNameToScore(skillScores) {
    const result = {};
    for (const [skill, scores] of Object.entries(skillScores)){
        result[skill] = scores.total > 0 ? scores.correct / scores.total : 0;
    }
    return result;
}
function levelFromScore(ratio) {
    if (ratio >= 0.9) return 5;
    if (ratio >= 0.7) return 4;
    if (ratio >= 0.5) return 3;
    if (ratio >= 0.3) return 2;
    return 1;
}
function generateCareerMatches(major, quizResult) {
    const normalizedMajor = normalizeMajorKey(major);
    const careers = careerMap[normalizedMajor] || rplCareers;
    const skillRatios = skillNameToScore(quizResult.skillScores);
    const matches = careers.map((career)=>{
        let totalMatch = 0;
        let totalReadiness = 0;
        const skillGaps = [];
        const requiredSkills = career.requiredSkills.map((req)=>{
            const ratio = skillRatios[req.name] ?? 0;
            const currentLevel = levelFromScore(ratio);
            const matchForSkill = Math.min(currentLevel / req.requiredLevel, 1);
            totalMatch += matchForSkill;
            const readinessForSkill = currentLevel / 5;
            totalReadiness += readinessForSkill;
            if (currentLevel < req.requiredLevel) {
                skillGaps.push({
                    name: req.name,
                    current: currentLevel,
                    required: req.requiredLevel
                });
            }
            return {
                id: `skill-${req.name}`,
                name: req.name,
                category: "hard",
                level: currentLevel
            };
        });
        const matchPercentage = Math.round(totalMatch / career.requiredSkills.length * 100);
        const readinessScore = Math.round(totalReadiness / career.requiredSkills.length * 100);
        return {
            id: career.id,
            title: career.title,
            description: career.description,
            matchPercentage,
            readinessScore,
            requiredSkills,
            skillGaps,
            category: career.category
        };
    });
    matches.sort((a, b)=>b.matchPercentage - a.matchPercentage);
    return matches;
}
function getUserEmail() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("studentEmail") || "";
}
function loadCareerMatches() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const email = getUserEmail();
    const key = email ? `career_matches_${email}` : "career_matches";
    try {
        const stored = localStorage.getItem(key);
        if (stored) return JSON.parse(stored);
    } catch  {}
    return null;
}
function saveCareerMatches(matches) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const email = getUserEmail();
    const key = email ? `career_matches_${email}` : "career_matches";
    localStorage.setItem(key, JSON.stringify(matches));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/lib/major-roadmap.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAssessmentData",
    ()=>clearAssessmentData,
    "getQuizAnswers",
    ()=>getQuizAnswers,
    "getQuizResult",
    ()=>getQuizResult,
    "getRoadmapForScore",
    ()=>getRoadmapForScore,
    "getScoreLevel",
    ()=>getScoreLevel,
    "loadRoadmapProgress",
    ()=>loadRoadmapProgress,
    "loadViewedResources",
    ()=>loadViewedResources,
    "majorRoadmapMap",
    ()=>majorRoadmapMap,
    "markResourceViewed",
    ()=>markResourceViewed,
    "saveQuizAnswers",
    ()=>saveQuizAnswers,
    "saveQuizResult",
    ()=>saveQuizResult,
    "saveRoadmapProgress",
    ()=>saveRoadmapProgress
]);
const rplRoadmap = {
    fundamental: [
        {
            id: "rpl-f1",
            title: "HTML & CSS Fundamental",
            description: "Pelajari struktur markup HTML dan styling CSS dari nol. Pahami selector, box model, flexbox, dan responsive design.",
            status: "available",
            skills: [
                "HTML/CSS"
            ],
            estimatedHours: 20,
            level: "fundamental",
            resources: [
                {
                    title: "MDN Web Docs: HTML Basics",
                    url: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
                    type: "article"
                },
                {
                    title: "W3Schools: CSS Tutorial Lengkap",
                    url: "https://www.w3schools.com/css/",
                    type: "article"
                },
                {
                    title: "CSS Flexbox Crash Course",
                    url: "https://www.youtube.com/watch?v=fYq5PXgSsbE",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/fYq5PXgSsbE"
                },
                {
                    title: "HTML & CSS Full Course (freeCodeCamp)",
                    url: "https://www.youtube.com/watch?v=qz0aGYrrlhU",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/qz0aGYrrlhU"
                },
                {
                    title: "freeCodeCamp: Responsive Web Design",
                    url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
                    type: "course"
                },
                {
                    title: "Coursera: Web Design for Everybody",
                    url: "https://www.coursera.org/specializations/web-design",
                    type: "course"
                },
                {
                    title: "Build a Landing Page with HTML/CSS",
                    url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Create_a_html_layout",
                    type: "practice"
                },
                {
                    title: "Build a Portfolio Website",
                    url: "https://www.frontendmentor.io/challenges",
                    type: "practice"
                }
            ]
        },
        {
            id: "rpl-f2",
            title: "JavaScript Dasar",
            description: "Kuasai variabel, tipe data, fungsi, array, object, conditional, loop, dan DOM manipulation.",
            status: "locked",
            skills: [
                "JavaScript"
            ],
            estimatedHours: 25,
            level: "fundamental",
            resources: [
                {
                    title: "JavaScript.info: The Modern Tutorial",
                    url: "https://javascript.info/",
                    type: "article"
                },
                {
                    title: "MDN: JavaScript Guide",
                    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
                    type: "article"
                },
                {
                    title: "JavaScript Crash Course for Beginners",
                    url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/hdI2bqOjy3c"
                },
                {
                    title: "JavaScript Full Course (SuperSimpleDev)",
                    url: "https://www.youtube.com/watch?v=SBmABt2qD2k",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/SBmABt2qD2k"
                },
                {
                    title: "The Odin Project: JS Fundamentals",
                    url: "https://www.theodinproject.com/paths/foundations/courses/foundations",
                    type: "course"
                },
                {
                    title: "Coursera: Programming with JavaScript",
                    url: "https://www.coursera.org/learn/programming-with-javascript",
                    type: "course"
                },
                {
                    title: "Build a Calculator App",
                    url: "https://javascript.info/task/calculator",
                    type: "practice"
                },
                {
                    title: "Build a Todo List with Vanilla JS",
                    url: "https://javascript.info/task/article-behind-the-scene/confirmation",
                    type: "practice"
                }
            ]
        },
        {
            id: "rpl-f3",
            title: "Version Control dengan Git",
            description: "Pelajari branch, commit, merge, pull request, dan workflow Git untuk kolaborasi tim.",
            status: "locked",
            skills: [
                "Git"
            ],
            estimatedHours: 10,
            level: "fundamental",
            resources: [
                {
                    title: "Pro Git Book (Free)",
                    url: "https://git-scm.com/book/en/v2",
                    type: "article"
                },
                {
                    title: "Atlassian: Git Tutorial",
                    url: "https://www.atlassian.com/git/tutorials",
                    type: "article"
                },
                {
                    title: "Git & GitHub Crash Course",
                    url: "https://www.youtube.com/watch?v=SWYqp7iY_Tc",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/SWYqp7iY_Tc"
                },
                {
                    title: "Git for Professionals (freeCodeCamp)",
                    url: "https://www.youtube.com/watch?v=UscaqWoUWH0",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/UscaqWoUWH0"
                },
                {
                    title: "GitHub Learning Lab",
                    url: "https://lab.github.com/",
                    type: "course"
                },
                {
                    title: "Udacity: Version Control with Git",
                    url: "https://www.udacity.com/course/version-control-with-git--ud123",
                    type: "course"
                },
                {
                    title: "Create a Repo & Make 5 Commits",
                    url: "https://github.com/new",
                    type: "practice"
                },
                {
                    title: "Fork a Repo & Open a Pull Request",
                    url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request",
                    type: "practice"
                }
            ]
        },
        {
            id: "rpl-f4",
            title: "Node.js & npm Fundamental",
            description: "Kenali runtime JavaScript di server, package manager npm, dan membuat REST API sederhana.",
            status: "locked",
            skills: [
                "Node.js"
            ],
            estimatedHours: 15,
            level: "fundamental",
            resources: [
                {
                    title: "Node.js Official Docs",
                    url: "https://nodejs.org/en/docs/",
                    type: "article"
                },
                {
                    title: "W3Schools: Node.js Tutorial",
                    url: "https://www.w3schools.com/nodejs/",
                    type: "article"
                },
                {
                    title: "Node.js Crash Course",
                    url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/fBNz5xF-Kx4"
                },
                {
                    title: "Node.js Full Course (Bro Code)",
                    url: "https://www.youtube.com/watch?v=f2EqmEfI7XI",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/f2EqmEfI7XI"
                },
                {
                    title: "Node.js Intro (The Odin Project)",
                    url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs",
                    type: "course"
                },
                {
                    title: "Udemy: Node.js for Beginners",
                    url: "https://www.udemy.com/course/nodejs-the-complete-guide/",
                    type: "course"
                },
                {
                    title: "Build a Simple REST API",
                    url: "https://expressjs.com/en/starter/hello-world.html",
                    type: "practice"
                },
                {
                    title: "Build a File Upload Server",
                    url: "https://nodejs.org/en/learn/getting-started/drag-and-drop",
                    type: "practice"
                }
            ]
        }
    ],
    intermediate: [
        {
            id: "rpl-i1",
            title: "React & Component Architecture",
            description: "Pelajari komponen, props, state, hooks, dan lifecycle dalam React.",
            status: "available",
            skills: [
                "React/Next.js"
            ],
            estimatedHours: 30,
            level: "intermediate",
            resources: [
                {
                    title: "React Official Tutorial",
                    url: "https://react.dev/learn",
                    type: "article"
                },
                {
                    title: "MDN: React Tutorial",
                    url: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_tools_frameworks/React_getting_started",
                    type: "article"
                },
                {
                    title: "React Full Course for Free",
                    url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/bMknfKXIFA8"
                },
                {
                    title: "React Tutorial for Beginners ( Programming with Mosh)",
                    url: "https://www.youtube.com/watch?v=LDB4uaJ87e0",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/LDB4uaJ87e0"
                },
                {
                    title: "Scrimba: Learn React",
                    url: "https://scrimba.com/learn/learnreact",
                    type: "course"
                },
                {
                    title: "Coursera: Meta Front-End Developer (React)",
                    url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
                    type: "course"
                },
                {
                    title: "Build a Todo App with React",
                    url: "https://react.dev/learn/thinking-in-react",
                    type: "practice"
                },
                {
                    title: "Build a Weather App with React API",
                    url: "https://react.dev/learn/synchronizing-with-effects",
                    type: "practice"
                }
            ]
        },
        {
            id: "rpl-i2",
            title: "REST API & Backend Development",
            description: "Bangun API RESTful dengan Express.js, pelajari routing, middleware, error handling, dan autentikasi.",
            status: "locked",
            skills: [
                "Express.js",
                "REST API"
            ],
            estimatedHours: 25,
            level: "intermediate",
            resources: [
                {
                    title: "Express.js Guide",
                    url: "https://expressjs.com/guide/routing.html",
                    type: "article"
                },
                {
                    title: "MDN: Express Tutorial",
                    url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs",
                    type: "article"
                },
                {
                    title: "Build a REST API with Node.js & Express",
                    url: "https://www.youtube.com/watch?v=CnH3kAXSFBc",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/CnH3kAXSFBc"
                },
                {
                    title: "Express.js Crash Course (Traversy Media)",
                    url: "https://www.youtube.com/watch?v=CnH3kAXSFBc",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/CnH3kAXSFBc"
                },
                {
                    title: "Udemy: RESTful API with Node.js",
                    url: "https://www.udemy.com/course/nodejs-the-complete-guide/",
                    type: "course"
                },
                {
                    title: "freeCodeCamp: APIs and Microservices",
                    url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/",
                    type: "course"
                },
                {
                    title: "Build a CRUD API",
                    url: "https://expressjs.com/en/starter/hello-world.html",
                    type: "practice"
                },
                {
                    title: "Build an Auth API with JWT",
                    url: "https://expressjs.com/en/advanced/best-practice-security.html",
                    type: "practice"
                }
            ]
        },
        {
            id: "rpl-i3",
            title: "Database SQL & ORM",
            description: "Pelajari desain database, SQL queries, relasi, dan ORM seperti Prisma atau Sequelize.",
            status: "locked",
            skills: [
                "SQL/Database"
            ],
            estimatedHours: 20,
            level: "intermediate",
            resources: [
                {
                    title: "SQLBolt Interactive Tutorial",
                    url: "https://sqlbolt.com/",
                    type: "article"
                },
                {
                    title: "Mode: SQL Tutorial",
                    url: "https://mode.com/sql-tutorial/",
                    type: "article"
                },
                {
                    title: "Database Design Course",
                    url: "https://www.youtube.com/watch?v=ztHopE5Wnpc",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/ztHopE5Wnpc"
                },
                {
                    title: "SQL Full Course (freeCodeCamp)",
                    url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/HXV3zeQKqGY"
                },
                {
                    title: "Prisma Docs",
                    url: "https://www.prisma.io/docs/getting-started",
                    type: "course"
                },
                {
                    title: "PostgreSQL Tutorial",
                    url: "https://www.postgresqltutorial.com/",
                    type: "course"
                },
                {
                    title: "Design & Query a Library DB",
                    url: "https://sqlbolt.com/",
                    type: "practice"
                },
                {
                    title: "Build a Blog Database Schema",
                    url: "https://dbdiagram.io/",
                    type: "practice"
                }
            ]
        },
        {
            id: "rpl-i4",
            title: "Linux & Command Line Basics",
            description: "Pelajari dasar-dasar Linux: command line, file system, permissions, dan shell scripting.",
            status: "locked",
            skills: [
                "Linux Basics"
            ],
            estimatedHours: 15,
            level: "intermediate",
            resources: [
                {
                    title: "Linux Journey",
                    url: "https://linuxjourney.com/",
                    type: "article"
                },
                {
                    title: "Linuxcommand.org Tutorial",
                    url: "https://linuxcommand.org/lc3_lts0010.php",
                    type: "article"
                },
                {
                    title: "Linux Command Line Crash Course",
                    url: "https://www.youtube.com/watch?v=sWbUDq4S6Y8",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/sWbUDq4S6Y8"
                },
                {
                    title: "Linux Full Course (freeCodeCamp)",
                    url: "https://www.youtube.com/watch?v=sWbUDq4S6Y8",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/sWbUDq4S6Y8"
                },
                {
                    title: "Linux Essentials (NDG)",
                    url: "https://www.netacad.com/courses/os-it/ndg-linux-essentials",
                    type: "course"
                },
                {
                    title: "KodeKloud: Linux Basics",
                    url: "https://kodekloud.com/courses/linux-basics/",
                    type: "course"
                },
                {
                    title: "Complete 10 Linux Tasks",
                    url: "https://linuxjourney.com/",
                    type: "practice"
                },
                {
                    title: "Build a Shell Script Automation",
                    url: "https://linuxcommand.org/lc3_lts0020.php",
                    type: "practice"
                }
            ]
        }
    ],
    advanced: [
        {
            id: "rpl-a1",
            title: "TypeScript untuk Skala Besar",
            description: "Kuasai type system, generics, utility types, dan best practices TypeScript dalam project besar.",
            status: "available",
            skills: [
                "TypeScript"
            ],
            estimatedHours: 20,
            level: "advanced",
            resources: [
                {
                    title: "TypeScript Handbook",
                    url: "https://www.typescriptlang.org/docs/handbook/",
                    type: "article"
                },
                {
                    title: "Total TypeScript: TypeScript Tips",
                    url: "https://www.totaltypescript.com/tips",
                    type: "article"
                },
                {
                    title: "TypeScript Full Course",
                    url: "https://www.youtube.com/watch?v=BwuLxPH8IDs",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/BwuLxPH8IDs"
                },
                {
                    title: "TypeScript Crash Course (Traversy)",
                    url: "https://www.youtube.com/watch?v=gp5H0Vw39yw",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/gp5H0Vw39yw"
                },
                {
                    title: "Total TypeScript",
                    url: "https://www.totaltypescript.com/",
                    type: "course"
                },
                {
                    title: "Coursera: TypeScript for Node.js",
                    url: "https://www.coursera.org/learn/typescript-for-node-js",
                    type: "course"
                },
                {
                    title: "Convert JS Project to TS",
                    url: "https://www.typescriptlang.org/docs/handbook/",
                    type: "practice"
                },
                {
                    title: "Build a Type-Safe API with Zod",
                    url: "https://zod.dev/",
                    type: "practice"
                }
            ]
        },
        {
            id: "rpl-a2",
            title: "Testing & CI/CD",
            description: "Pelajari unit testing, integration testing, dan setup pipeline CI/CD untuk deploy otomatis.",
            status: "locked",
            skills: [
                "CI/CD"
            ],
            estimatedHours: 15,
            level: "advanced",
            resources: [
                {
                    title: "Jest Official Docs",
                    url: "https://jestjs.io/docs/getting-started",
                    type: "article"
                },
                {
                    title: "GitHub Actions Documentation",
                    url: "https://docs.github.com/en/actions",
                    type: "article"
                },
                {
                    title: "Testing JavaScript Course",
                    url: "https://www.youtube.com/watch?v=7r4FfJ1x7to",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/7r4FfJ1x7to"
                },
                {
                    title: "CI/CD Pipeline Tutorial (freeCodeCamp)",
                    url: "https://www.youtube.com/watch?v=scEDHsr3APg",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/scEDHsr3APg"
                },
                {
                    title: "GitHub Actions Docs",
                    url: "https://docs.github.com/en/actions",
                    type: "course"
                },
                {
                    title: "Udemy: Testing Node.js Applications",
                    url: "https://www.udemy.com/course/test-nodejs-apps/",
                    type: "course"
                },
                {
                    title: "Write Tests & Setup CI",
                    url: "https://jestjs.io/docs/getting-started",
                    type: "practice"
                },
                {
                    title: "Setup GitHub Actions for Next.js",
                    url: "https://nextjs.org/docs/deploying",
                    type: "practice"
                }
            ]
        },
        {
            id: "rpl-a3",
            title: "DevOps & Docker",
            description: "Pelajari containerization dengan Docker, image management, Docker Compose, dan deployment.",
            status: "locked",
            skills: [
                "Docker"
            ],
            estimatedHours: 20,
            level: "advanced",
            resources: [
                {
                    title: "Docker Getting Started",
                    url: "https://docs.docker.com/get-started/",
                    type: "article"
                },
                {
                    title: "Docker Curriculum: Beginner Guide",
                    url: "https://docker-curriculum.com/",
                    type: "article"
                },
                {
                    title: "Docker Crash Course",
                    url: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/fqMOX6JJhGo"
                },
                {
                    title: "Docker Tutorial for Beginners (TechWorld with Nana)",
                    url: "https://www.youtube.com/watch?v=3c-iBn73dDE",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/3c-iBn73dDE"
                },
                {
                    title: "Docker for Beginners (KodeKloud)",
                    url: "https://kodekloud.com/courses/docker-for-the-absolute-beginner/",
                    type: "course"
                },
                {
                    title: "Coursera: DevOps and Docker",
                    url: "https://www.coursera.org/learn/devops-with-docker",
                    type: "course"
                },
                {
                    title: "Dockerize a Web App",
                    url: "https://docs.docker.com/get-started/",
                    type: "practice"
                },
                {
                    title: "Build a Multi-Container App with Docker Compose",
                    url: "https://docs.docker.com/compose/getting-started/",
                    type: "practice"
                }
            ]
        },
        {
            id: "rpl-a4",
            title: "React Native Mobile Development",
            description: "Bangun aplikasi mobile cross-platform dengan React Native: components, navigation, dan native APIs.",
            status: "locked",
            skills: [
                "React Native",
                "Mobile UI/UX"
            ],
            estimatedHours: 25,
            level: "advanced",
            resources: [
                {
                    title: "React Native Official Docs",
                    url: "https://reactnative.dev/docs/getting-started",
                    type: "article"
                },
                {
                    title: "Expo Documentation",
                    url: "https://docs.expo.dev/",
                    type: "article"
                },
                {
                    title: "React Native Course for Beginners",
                    url: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/0-S5a0eXPoc"
                },
                {
                    title: "React Native Tutorial (Programming with Mosh)",
                    url: "https://www.youtube.com/watch?v=0-TJY5WHZKM",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/0-TJY5WHZKM"
                },
                {
                    title: "Expo: Start React Native",
                    url: "https://docs.expo.dev/",
                    type: "course"
                },
                {
                    title: "Coursera: Meta React Native",
                    url: "https://www.coursera.org/learn/meta-react-native",
                    type: "course"
                },
                {
                    title: "Build a Todo Mobile App",
                    url: "https://reactnative.dev/docs/tutorial",
                    type: "practice"
                },
                {
                    title: "Build a Weather App with Expo",
                    url: "https://docs.expo.dev/get-started/set-up-your-environment/",
                    type: "practice"
                }
            ]
        }
    ]
};
const dkvRoadmap = {
    fundamental: [
        {
            id: "dkv-f1",
            title: "Color Theory & Typography",
            description: "Pelajari dasar-dasar warna, harmoni warna, dan tipografi yang efektif untuk desain.",
            status: "available",
            skills: [
                "Color Theory",
                "Typography"
            ],
            estimatedHours: 15,
            level: "fundamental",
            resources: [
                {
                    title: "Color Theory for Designers",
                    url: "https://www.canva.com/learn/color-theory/",
                    type: "article"
                },
                {
                    title: "Color Theory Explained",
                    url: "https://www.youtube.com/watch?v=Qj1K8QraAXY",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/Qj1K8QraAXY"
                },
                {
                    title: "Canva Design School",
                    url: "https://www.canva.com/designschool/",
                    type: "course"
                },
                {
                    title: "Buat Color Palette Sendiri",
                    url: "https://coolors.co/",
                    type: "practice"
                }
            ]
        },
        {
            id: "dkv-f2",
            title: "Adobe Photoshop Fundamental",
            description: "Kuasai tools dasar Photoshop: selection, layers, masking, retouching, dan export.",
            status: "locked",
            skills: [
                "Adobe Photoshop",
                "Image Editing"
            ],
            estimatedHours: 20,
            level: "fundamental",
            resources: [
                {
                    title: "Adobe Photoshop Tutorials",
                    url: "https://helpx.adobe.com/photoshop/tutorials.html",
                    type: "article"
                },
                {
                    title: "Photoshop in 30 Minutes",
                    url: "https://www.youtube.com/watch?v=IeGtiDdY1BE",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/IeGtiDdY1BE"
                },
                {
                    title: "Phlearn Photoshop 101",
                    url: "https://phlearn.com/tutorial/photoshop-basics/",
                    type: "course"
                },
                {
                    title: "Edit & Retouch a Photo",
                    url: "https://helpx.adobe.com/photoshop/tutorials.html",
                    type: "practice"
                }
            ]
        },
        {
            id: "dkv-f3",
            title: "Adobe Illustrator Dasar",
            description: "Belajar membuat vektor, logo, dan illustration menggunakan path, shape builder, dan pen tool.",
            status: "locked",
            skills: [
                "Adobe Illustrator",
                "Vector"
            ],
            estimatedHours: 18,
            level: "fundamental",
            resources: [
                {
                    title: "Illustrator Getting Started",
                    url: "https://helpx.adobe.com/illustrator/get-started.html",
                    type: "article"
                },
                {
                    title: "Illustrator for Beginners",
                    url: "https://www.youtube.com/watch?v=IZhGIEF-eHg",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/IZhGIEF-eHg"
                },
                {
                    title: "Tuts+ Illustrator Tutorials",
                    url: "https://design.tutsplus.com/categories/illustrator",
                    type: "course"
                },
                {
                    title: "Design a Simple Logo",
                    url: "https://helpx.adobe.com/illustrator/get-started.html",
                    type: "practice"
                }
            ]
        },
        {
            id: "dkv-f4",
            title: "Layout & Composition Principles",
            description: "Pelajari prinsip desain: alignment, contrast, repetition, proximity, hierarchy, dan balance.",
            status: "locked",
            skills: [
                "Layout",
                "Design Principles"
            ],
            estimatedHours: 12,
            level: "fundamental",
            resources: [
                {
                    title: "The Principles of Design",
                    url: "https://www.interaction-design.org/literature/article/the-principles-of-design",
                    type: "article"
                },
                {
                    title: "Design Principles Crash Course",
                    url: "https://www.youtube.com/watch?v=KkQX6VmT7bY",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/KkQX6VmT7bY"
                },
                {
                    title: "Coursera: Fundamentals of Graphic Design",
                    url: "https://www.coursera.org/learn/fundamentals-of-graphic-design",
                    type: "course"
                },
                {
                    title: "Recreate a Magazine Layout",
                    url: "https://www.canva.com/",
                    type: "practice"
                }
            ]
        }
    ],
    intermediate: [
        {
            id: "dkv-i1",
            title: "UI/UX Design & User Research",
            description: "Pelajari user persona, journey map, wireframing, dan prototyping untuk design yang user-centric.",
            status: "available",
            skills: [
                "UI/UX",
                "User Research",
                "Wireframing"
            ],
            estimatedHours: 25,
            level: "intermediate",
            resources: [
                {
                    title: "Google UX Design Certificate",
                    url: "https://www.coursera.org/professional-certificates/google-ux-design",
                    type: "article"
                },
                {
                    title: "UX Design Full Course",
                    url: "https://www.youtube.com/watch?v=wIuVvCuiJhU",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/wIuVvCuiJhU"
                },
                {
                    title: "Coursera: UX Design Professional Certificate",
                    url: "https://www.coursera.org/professional-certificates/google-ux-design",
                    type: "course"
                },
                {
                    title: "Buat Wireframe untuk App",
                    url: "https://www.figma.com/",
                    type: "practice"
                }
            ]
        },
        {
            id: "dkv-i2",
            title: "Figma Intermediate: Components & Auto Layout",
            description: "Bangun design system dengan komponen reusable, auto layout, dan variabel di Figma.",
            status: "locked",
            skills: [
                "Figma",
                "Components",
                "Auto Layout"
            ],
            estimatedHours: 20,
            level: "intermediate",
            resources: [
                {
                    title: "Figma Official Blog",
                    url: "https://www.figma.com/blog/",
                    type: "article"
                },
                {
                    title: "Figma Intermediate Tutorial",
                    url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/FTFaQWZBqQ8"
                },
                {
                    title: "Figma Academy",
                    url: "https://www.figma.com/resources/learn-design/",
                    type: "course"
                },
                {
                    title: "Build a Mini Design System",
                    url: "https://www.figma.com/",
                    type: "practice"
                }
            ]
        },
        {
            id: "dkv-i3",
            title: "Motion Graphics & Video Editing",
            description: "Buat animasi dan video editing menggunakan After Effects atau CapCut untuk konten digital.",
            status: "locked",
            skills: [
                "Motion Graphics",
                "Video Editing"
            ],
            estimatedHours: 20,
            level: "intermediate",
            resources: [
                {
                    title: "After Effects Tutorials",
                    url: "https://helpx.adobe.com/after-effects/tutorials.html",
                    type: "article"
                },
                {
                    title: "Motion Graphics Tutorial",
                    url: "https://www.youtube.com/watch?v=5p1nK7uAMCg",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/5p1nK7uAMCg"
                },
                {
                    title: "School of Motion",
                    url: "https://www.schoolofmotion.com/",
                    type: "course"
                },
                {
                    title: "Buat Logo Animation 5 Detik",
                    url: "https://www.capcut.com/",
                    type: "practice"
                }
            ]
        },
        {
            id: "dkv-i4",
            title: "Digital Marketing Design",
            description: "Desain konten untuk social media, iklan digital, dan campaign marketing visual.",
            status: "locked",
            skills: [
                "Digital Marketing",
                "Social Media Design"
            ],
            estimatedHours: 15,
            level: "intermediate",
            resources: [
                {
                    title: "Social Media Design Guide",
                    url: "https://www.canva.com/designschool/courses/social-media-design/",
                    type: "article"
                },
                {
                    title: "Social Media Design Tips",
                    url: "https://www.youtube.com/watch?v=0aM3vZCxmBc",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/0aM3vZCxmBc"
                },
                {
                    title: "HubSpot Social Media Course",
                    url: "https://academy.hubspot.com/courses/social-media-marketing",
                    type: "course"
                },
                {
                    title: "Create Instagram Campaign",
                    url: "https://www.canva.com/",
                    type: "practice"
                }
            ]
        }
    ],
    advanced: [
        {
            id: "dkv-a1",
            title: "Design System & Brand Guideline",
            description: "Buat design system lengkap dari komponen atom hingga dokumentasi brand.",
            status: "available",
            skills: [
                "Design System",
                "Brand Identity"
            ],
            estimatedHours: 25,
            level: "advanced",
            resources: [
                {
                    title: "Design Systems Repo",
                    url: "https://designsystemsrepo.com/",
                    type: "article"
                },
                {
                    title: "Building Design Systems",
                    url: "https://www.youtube.com/watch?v=wc1T7MeBgZA",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/wc1T7MeBgZA"
                },
                {
                    title: "Design Systems Course (Figma)",
                    url: "https://www.figma.com/resources/learn-design/",
                    type: "course"
                },
                {
                    title: "Buat Design System Sendiri",
                    url: "https://www.figma.com/",
                    type: "practice"
                }
            ]
        },
        {
            id: "dkv-a2",
            title: "Advanced Prototyping & Interaction Design",
            description: "Prototipe tingkat lanjut: animasi transisi, micro-interaction, dan conditional logic di Figma.",
            status: "locked",
            skills: [
                "Prototyping",
                "Interaction Design"
            ],
            estimatedHours: 20,
            level: "advanced",
            resources: [
                {
                    title: "Figma Prototyping Docs",
                    url: "https://help.figma.com/hc/en-us/articles/360040318013",
                    type: "article"
                },
                {
                    title: "Advanced Figma Prototyping",
                    url: "https://www.youtube.com/watch?v=kyKbHxUvb2E",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/kyKbHxUvb2E"
                },
                {
                    title: "Figma Advanced Features",
                    url: "https://www.figma.com/resources/learn-design/",
                    type: "course"
                },
                {
                    title: "Prototipe App dengan Transisi",
                    url: "https://www.figma.com/",
                    type: "practice"
                }
            ]
        },
        {
            id: "dkv-a3",
            title: "Accessibility & Responsive Web Design",
            description: "Desain yang accessible untuk semua pengguna, WCAG compliance, dan responsive untuk semua device.",
            status: "locked",
            skills: [
                "Accessibility",
                "WCAG",
                "Responsive"
            ],
            estimatedHours: 15,
            level: "advanced",
            resources: [
                {
                    title: "WCAG 2.1 Guidelines",
                    url: "https://www.w3.org/WAI/WCAG21/quickref/",
                    type: "article"
                },
                {
                    title: "Accessibility in Design",
                    url: "https://www.youtube.com/watch?v=5tlh8mN_rGI",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/5tlh8mN_rGI"
                },
                {
                    title: "Accessibility Course (Deque)",
                    url: "https://dequeuniversity.com/",
                    type: "course"
                },
                {
                    title: "Audit & Fix an Existing Design",
                    url: "https://wave.webaim.org/",
                    type: "practice"
                }
            ]
        }
    ]
};
const tkjRoadmap = {
    fundamental: [
        {
            id: "tkj-f1",
            title: "Networking Fundamental",
            description: "Pelajari model OSI, TCP/IP, subnetting, IP addressing, dan konsep dasar jaringan.",
            status: "available",
            skills: [
                "Networking"
            ],
            estimatedHours: 20,
            level: "fundamental",
            resources: [
                {
                    title: "Cisco Networking Academy",
                    url: "https://www.netacad.com/",
                    type: "article"
                },
                {
                    title: "Networking Fundamentals",
                    url: "https://www.youtube.com/watch?v=qiQR5rda7zk",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/qiQR5rda7zk"
                },
                {
                    title: "CCNA Full Course",
                    url: "https://www.netacad.com/courses/ccna",
                    type: "course"
                },
                {
                    title: "Setup Home Network Lab",
                    url: "https://www.netacad.com/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tkj-f2",
            title: "Linux Administration Dasar",
            description: "Kuasai command line, file system, permissions, user management, dan service management di Linux.",
            status: "locked",
            skills: [
                "Linux Administration"
            ],
            estimatedHours: 25,
            level: "fundamental",
            resources: [
                {
                    title: "Linux Journey",
                    url: "https://linuxjourney.com/",
                    type: "article"
                },
                {
                    title: "Linux for Beginners",
                    url: "https://www.youtube.com/watch?v=sWbUDq4S6Y8",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/sWbUDq4S6Y8"
                },
                {
                    title: "Linux Essentials (NDG)",
                    url: "https://www.netacad.com/courses/os-it/ndg-linux-essentials",
                    type: "course"
                },
                {
                    title: "Install Ubuntu & Complete 10 Tasks",
                    url: "https://ubuntu.com/download",
                    type: "practice"
                }
            ]
        },
        {
            id: "tkj-f3",
            title: "Cisco Router & Switch Basic",
            description: "Konfigurasi dasar router dan switch Cisco: CLI, VLAN, IP addressing, dan ping test.",
            status: "locked",
            skills: [
                "Cisco Networking"
            ],
            estimatedHours: 20,
            level: "fundamental",
            resources: [
                {
                    title: "Cisco IOS Commands",
                    url: "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst_command_reference/command_ref/b_book.html",
                    type: "article"
                },
                {
                    title: "Cisco Packet Tracer Lab",
                    url: "https://www.youtube.com/watch?v=HX5h5bH6tSg",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/HX5h5bH6tSg"
                },
                {
                    title: "Cisco Packet Tracer Labs",
                    url: "https://skillsforall.com/course/getting-started-cisco-packet-tracer",
                    type: "course"
                },
                {
                    title: "Build a 3-Switch Network",
                    url: "https://www.netacad.com/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tkj-f4",
            title: "MikroTik RouterOS Basic",
            description: "Pelajari konfigurasi MikroTik: IP, firewall, NAT, DHCP server, dan wireless.",
            status: "locked",
            skills: [
                "MikroTik"
            ],
            estimatedHours: 18,
            level: "fundamental",
            resources: [
                {
                    title: "MikroTik Wiki",
                    url: "https://wiki.mikrotik.com/wiki/Manual:Table_of_contents",
                    type: "article"
                },
                {
                    title: "MikroTik Beginner Tutorial",
                    url: "https://www.youtube.com/watch?v=aQMxZmVGDqQ",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/aQMxZmVGDqQ"
                },
                {
                    title: "MikroTik Training",
                    url: "https://mikrotik.com/training",
                    type: "course"
                },
                {
                    title: "Setup Hotspot with MikroTik",
                    url: "https://mikrotik.com/products",
                    type: "practice"
                }
            ]
        }
    ],
    intermediate: [
        {
            id: "tkj-i1",
            title: "Advanced Routing & Switching",
            description: "Pelajari OSPF, EIGRP, STP, VLAN trunking, dan inter-VLAN routing.",
            status: "available",
            skills: [
                "Networking",
                "Cisco Networking"
            ],
            estimatedHours: 25,
            level: "intermediate",
            resources: [
                {
                    title: "CCNA Routing & Switching",
                    url: "https://www.netacad.com/courses/ccna",
                    type: "article"
                },
                {
                    title: "CCNA Full Course",
                    url: "https://www.youtube.com/watch?v=8zVbui6dGbE",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/8zVbui6dGbE"
                },
                {
                    title: "Cisco NetAcad CCNA",
                    url: "https://www.netacad.com/courses/ccna",
                    type: "course"
                },
                {
                    title: "OSPF Lab in Packet Tracer",
                    url: "https://www.netacad.com/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tkj-i2",
            title: "Cloud Computing AWS/GCP",
            description: "Deploy VM, storage, dan networking di cloud public; pelajari VPC, EC2, S3.",
            status: "locked",
            skills: [
                "Cloud (AWS/GCP)"
            ],
            estimatedHours: 25,
            level: "intermediate",
            resources: [
                {
                    title: "AWS Well-Architected",
                    url: "https://aws.amazon.com/architecture/well-architected/",
                    type: "article"
                },
                {
                    title: "AWS Cloud Practitioner",
                    url: "https://www.youtube.com/watch?v=SOTamWNgDKc",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/SOTamWNgDKc"
                },
                {
                    title: "AWS Free Tier Training",
                    url: "https://aws.amazon.com/free/",
                    type: "course"
                },
                {
                    title: "Deploy a Web App on EC2",
                    url: "https://aws.amazon.com/console/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tkj-i3",
            title: "Cybersecurity & Ethical Hacking",
            description: "Pelajari vulnerability assessment, penetration testing, dan keamanan jaringan dasar.",
            status: "locked",
            skills: [
                "Cybersecurity Basics"
            ],
            estimatedHours: 20,
            level: "intermediate",
            resources: [
                {
                    title: "OWASP Top 10",
                    url: "https://owasp.org/www-project-top-ten/",
                    type: "article"
                },
                {
                    title: "Ethical Hacking Full Course",
                    url: "https://www.youtube.com/watch?v=fNzpcB7ODxQ",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/fNzpcB7ODxQ"
                },
                {
                    title: "TryHackMe Platform",
                    url: "https://tryhackme.com/",
                    type: "course"
                },
                {
                    title: "Complete 5 TryHackMe Rooms",
                    url: "https://tryhackme.com/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tkj-i4",
            title: "Docker & Containerization",
            description: "Pelajari containerization dengan Docker: image, container, compose, dan deployment.",
            status: "locked",
            skills: [
                "Docker"
            ],
            estimatedHours: 15,
            level: "intermediate",
            resources: [
                {
                    title: "Docker Docs",
                    url: "https://docs.docker.com/get-started/",
                    type: "article"
                },
                {
                    title: "Docker Crash Course",
                    url: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/fqMOX6JJhGo"
                },
                {
                    title: "Docker 101 Tutorial (Resmi)",
                    url: "https://www.docker.com/101-tutorial/",
                    type: "course"
                },
                {
                    title: "Dockerize a Web App",
                    url: "https://docs.docker.com/get-started/",
                    type: "practice"
                }
            ]
        }
    ],
    advanced: [
        {
            id: "tkj-a1",
            title: "Infrastructure as Code (Terraform)",
            description: "Kelola infrastruktur cloud menggunakan kode: provision VM, network, dan storage secara otomatis.",
            status: "available",
            skills: [
                "Cloud (AWS/GCP)"
            ],
            estimatedHours: 20,
            level: "advanced",
            resources: [
                {
                    title: "Terraform Docs",
                    url: "https://developer.hashicorp.com/terraform/tutorials",
                    type: "article"
                },
                {
                    title: "Terraform Full Course",
                    url: "https://www.youtube.com/watch?v=l5k1ai_GBDE",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/l5k1ai_GBDE"
                },
                {
                    title: "HashiCorp Learn",
                    url: "https://developer.hashicorp.com/terraform/tutorials",
                    type: "course"
                },
                {
                    title: "Provision EC2 with Terraform",
                    url: "https://developer.hashicorp.com/terraform/tutorials",
                    type: "practice"
                }
            ]
        },
        {
            id: "tkj-a2",
            title: "Zero Trust & Advanced Security",
            description: "Implement zero trust architecture, SIEM, IDS/IPS, dan incident response.",
            status: "locked",
            skills: [
                "Cybersecurity Basics"
            ],
            estimatedHours: 20,
            level: "advanced",
            resources: [
                {
                    title: "NIST Zero Trust Framework",
                    url: "https://csrc.nist.gov/publications/detail/sp/800-207/final",
                    type: "article"
                },
                {
                    title: "Zero Trust Explained",
                    url: "https://www.youtube.com/watch?v=oLT7Krc-YZg",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/oLT7Krc-YZg"
                },
                {
                    title: "Splunk Free Training",
                    url: "https://www.splunk.com/en_us/training/free-courses.html",
                    type: "course"
                },
                {
                    title: "Setup ELK Stack Monitoring",
                    url: "https://www.elastic.co/guide/en/elastic-stack/current/index.html",
                    type: "practice"
                }
            ]
        },
        {
            id: "tkj-a3",
            title: "Kubernetes & Cloud Orchestration",
            description: "Deploy dan manage aplikasi di Kubernetes: pods, services, deployments, dan scaling.",
            status: "locked",
            skills: [
                "Docker"
            ],
            estimatedHours: 25,
            level: "advanced",
            resources: [
                {
                    title: "Kubernetes Docs",
                    url: "https://kubernetes.io/docs/home/",
                    type: "article"
                },
                {
                    title: "Kubernetes Course for Beginners",
                    url: "https://www.youtube.com/watch?v=X48VuDVv4do",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/X48VuDVv4do"
                },
                {
                    title: "KodeKloud",
                    url: "https://kodekloud.com/",
                    type: "course"
                },
                {
                    title: "Deploy App to Minikube",
                    url: "https://minikube.sigs.k8s.io/docs/start/",
                    type: "practice"
                }
            ]
        }
    ]
};
const transmisiRoadmap = {
    fundamental: [
        {
            id: "tt-f1",
            title: "Telecom Fundamental & Signal Theory",
            description: "Pelajari konsep dasar sinyal analog/digital, frekuensi, bandwidth, dan modulasi.",
            status: "available",
            skills: [
                "Networking Basics"
            ],
            estimatedHours: 20,
            level: "fundamental",
            resources: [
                {
                    title: "Data Communication Basics",
                    url: "https://www.tutorialspoint.com/data_communication_computer_network/",
                    type: "article"
                },
                {
                    title: "Communication Systems Course",
                    url: "https://www.youtube.com/watch?v=8e4Sf6rL3zk",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/8e4Sf6rL3zk"
                },
                {
                    title: "MIT OCW: Signals & Systems",
                    url: "https://ocw.mit.edu/courses/res-6-007-signals-and-systems-spring-2011/",
                    type: "course"
                },
                {
                    title: "Lab: Analisis Spektrum Sinyal",
                    url: "https://octave-online.net/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tt-f2",
            title: "Fiber Optic Fundamentals",
            description: "Pelajari struktur kabel fiber, jenis (SMF/MMF), princip kerja, dan keuntungan vs kabel tembaga.",
            status: "locked",
            skills: [
                "Fiber Optics"
            ],
            estimatedHours: 18,
            level: "fundamental",
            resources: [
                {
                    title: "Fiber Optic Basics (Corning)",
                    url: "https://www.corning.com/worldwide/en/products/communications/cables/fundamentals-of-fiber-optics.html",
                    type: "article"
                },
                {
                    title: "Fiber Optic Explained",
                    url: "https://www.youtube.com/watch?v=zAVsTubdd_Q",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/zAVsTubdd_Q"
                },
                {
                    title: "FOA Fiber Optic Association",
                    url: "https://foa.org/",
                    type: "course"
                },
                {
                    title: "Identifikasi Jenis Kabel FO",
                    url: "https://foa.org/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tt-f3",
            title: "Radio Frequency (RF) Basic",
            description: "Pelajari konsep RF: frekuensi, gelombang, antena, dan propagasi sinyal radio.",
            status: "locked",
            skills: [
                "Radio Frequency"
            ],
            estimatedHours: 18,
            level: "fundamental",
            resources: [
                {
                    title: "RF Basics",
                    url: "https://www.everythingrf.com/community/radio-frequency-rf-basics",
                    type: "article"
                },
                {
                    title: "RF Engineering Crash Course",
                    url: "https://www.youtube.com/watch?v=Rvti1TYI5NE",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/Rvti1TYI5NE"
                },
                {
                    title: "MIT OCW: Circuits & Electronics",
                    url: "https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/",
                    type: "course"
                },
                {
                    title: "Analisis Spesifikasi Antena",
                    url: "https://www.everythingrf.com/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tt-f4",
            title: "Network Engineering Basic",
            description: "Pelajari konsep jaringan transmisi: OSI model, TCP/IP, dan protokol dasar telekomunikasi.",
            status: "locked",
            skills: [
                "Networking Basics"
            ],
            estimatedHours: 15,
            level: "fundamental",
            resources: [
                {
                    title: "Telecom Network Overview",
                    url: "https://en.wikipedia.org/wiki/Telecommunications_network",
                    type: "article"
                },
                {
                    title: "Telecom Networking 101",
                    url: "https://www.youtube.com/watch?v=qiQR5rda7zk",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/qiQR5rda7zk"
                },
                {
                    title: "Cisco Networking Academy",
                    url: "https://www.netacad.com/",
                    type: "course"
                },
                {
                    title: "Build a Simple Network Diagram",
                    url: "https://app.diagrams.net/",
                    type: "practice"
                }
            ]
        }
    ],
    intermediate: [
        {
            id: "tt-i1",
            title: "Fiber Optic Splicing & Testing",
            description: "Pelajari fusion splicing, connector termination, penggunaan OTDR, dan Power Meter.",
            status: "available",
            skills: [
                "Fiber Optics"
            ],
            estimatedHours: 20,
            level: "intermediate",
            resources: [
                {
                    title: "Fiber Optic Communication (Wikipedia)",
                    url: "https://en.wikipedia.org/wiki/Fiber-optic_communication",
                    type: "article"
                },
                {
                    title: "OTDR Tutorial",
                    url: "https://www.youtube.com/watch?v=qZU6fPnoEvg",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/qZU6fPnoEvg"
                },
                {
                    title: "FOA Fiber Optics Guide",
                    url: "https://www.thefoa.org/tech/",
                    type: "course"
                },
                {
                    title: "Hands-on Splicing & OTDR Test",
                    url: "https://www.thefoa.org/tech/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tt-i2",
            title: "RF Link Planning & Calculations",
            description: "Hitung link budget, fade margin, rain fade, dan perencanaan radio link point-to-point.",
            status: "locked",
            skills: [
                "Radio Frequency"
            ],
            estimatedHours: 20,
            level: "intermediate",
            resources: [
                {
                    title: "RF Link Budget Calculator",
                    url: "https://www.pasternack.com/tutorials/rf-link-budget.aspx",
                    type: "article"
                },
                {
                    title: "Radio Link Planning",
                    url: "https://www.youtube.com/watch?v=EzFh8OTVBjQ",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/EzFh8OTVBjQ"
                },
                {
                    title: "MikroTik Wireless Training",
                    url: "https://mikrotik.com/training",
                    type: "course"
                },
                {
                    title: "Rencanakan Link 5km di RouterOS",
                    url: "https://mikrotik.com/products",
                    type: "practice"
                }
            ]
        },
        {
            id: "tt-i3",
            title: "Tower Installation & Mekanik Radio",
            description: "Pelajari instalasi tower, guy wire, grounding, wind load calculation, dan antenna alignment.",
            status: "locked",
            skills: [
                "Teknik Mekanik Radio"
            ],
            estimatedHours: 18,
            level: "intermediate",
            resources: [
                {
                    title: "Radio Masts & Towers (Wikipedia)",
                    url: "https://en.wikipedia.org/wiki/Radio_masts_and_towers",
                    type: "article"
                },
                {
                    title: "Tower Climbing Safety",
                    url: "https://www.youtube.com/watch?v=qCOLcE9iR2I",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/qCOLcE9iR2I"
                },
                {
                    title: "Tower Safety Certification",
                    url: "https://www.comtrain.org/",
                    type: "course"
                },
                {
                    title: "Tower Site Survey Report",
                    url: "https://www.comtrain.org/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tt-i4",
            title: "MikroTik Advanced & RouterOS",
            description: "Konfigurasi advanced: routing, VPN, QoS, hotspot, bandwidth management dengan MikroTik.",
            status: "locked",
            skills: [
                "Networking Basics"
            ],
            estimatedHours: 18,
            level: "intermediate",
            resources: [
                {
                    title: "MikroTik Advanced Guide",
                    url: "https://wiki.mikrotik.com/wiki/Manual:TOC",
                    type: "article"
                },
                {
                    title: "MikroTik Advanced Tutorial",
                    url: "https://www.youtube.com/watch?v=aQMxZmVGDqQ",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/aQMxZmVGDqQ"
                },
                {
                    title: "MikroTik MTCNA Training",
                    url: "https://mikrotik.com/training",
                    type: "course"
                },
                {
                    title: "Setup VPN & QoS on RouterOS",
                    url: "https://mikrotik.com/products",
                    type: "practice"
                }
            ]
        }
    ],
    advanced: [
        {
            id: "tt-a1",
            title: "DWDM & Coherent Optics",
            description: "Pelajari DWDM technology, coherent detection, amplifikasi optik (EDFA), dan managed wavelength.",
            status: "available",
            skills: [
                "Fiber Optics"
            ],
            estimatedHours: 20,
            level: "advanced",
            resources: [
                {
                    title: "DWDM Technology (Cisco)",
                    url: "https://www.cisco.com/c/en/us/products/optical-networking/dense-wavelength-division-multiplexing-dwdm-technology.html",
                    type: "article"
                },
                {
                    title: "DWDM Explained",
                    url: "https://www.youtube.com/watch?v=pLEUX2C0qgc",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/pLEUX2C0qgc"
                },
                {
                    title: "Corning Optical Communications",
                    url: "https://www.corning.com/worldwide/en/products/communications",
                    type: "course"
                },
                {
                    title: "Design a DWDM Link",
                    url: "https://www.viavisolutions.com/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tt-a2",
            title: "5G & Next-Gen Wireless",
            description: "Pelajari arsitektur 5G NR, Massive MIMO, beamforming, dan network slicing.",
            status: "locked",
            skills: [
                "Radio Frequency"
            ],
            estimatedHours: 20,
            level: "advanced",
            resources: [
                {
                    title: "5G Architecture Overview",
                    url: "https://www.3gpp.org/technologies/5g-system-overview",
                    type: "article"
                },
                {
                    title: "5G Technology Explained",
                    url: "https://www.youtube.com/watch?v=ULEjpsSc5pU",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/ULEjpsSc5pU"
                },
                {
                    title: "5G Training (Nokia)",
                    url: "https://www.nokia.com/networks/5g-training/",
                    type: "course"
                },
                {
                    title: "5G Network Design Simulator",
                    url: "https://www.3gpp.org/",
                    type: "practice"
                }
            ]
        },
        {
            id: "tt-a3",
            title: "Network Monitoring & SLA Management",
            description: "Setup monitoring (SNMP, Zabbix/PRTG), SLA measurement (latency, jitter, availability), dan reporting.",
            status: "locked",
            skills: [
                "Networking Basics"
            ],
            estimatedHours: 18,
            level: "advanced",
            resources: [
                {
                    title: "SNMP Monitoring Guide",
                    url: "https://www.manageengine.com/network-monitoring/what-is-snmp.html",
                    type: "article"
                },
                {
                    title: "Zabbix Full Course",
                    url: "https://www.youtube.com/watch?v=W_HIIvuZFUg",
                    type: "video",
                    embedUrl: "https://www.youtube.com/embed/W_HIIvuZFUg"
                },
                {
                    title: "Zabbix Official Training",
                    url: "https://www.zabbix.com/documentation/current/en/manual",
                    type: "course"
                },
                {
                    title: "Setup Monitoring untuk 3 Link",
                    url: "https://www.zabbix.com/",
                    type: "practice"
                }
            ]
        }
    ]
};
const majorRoadmapMap = {
    "Rekayasa Perangkat Lunak": rplRoadmap,
    "Desain Komunikasi Visual": dkvRoadmap,
    "Teknik Jaringan, Komputer, dan Telekomunikasi": {
        fundamental: [
            ...tkjRoadmap.fundamental,
            ...transmisiRoadmap.fundamental
        ],
        intermediate: [
            ...tkjRoadmap.intermediate,
            ...transmisiRoadmap.intermediate
        ],
        advanced: [
            ...tkjRoadmap.advanced,
            ...transmisiRoadmap.advanced
        ]
    }
};
const shortCodeToMajorName = {
    RPL: "Rekayasa Perangkat Lunak",
    DKV: "Desain Komunikasi Visual",
    TJKT: "Teknik Jaringan, Komputer, dan Telekomunikasi"
};
function normalizeMajorKey(major) {
    return shortCodeToMajorName[major] || major;
}
function getScoreLevel(score) {
    if (score <= 20) return {
        level: 1,
        label: "Belum",
        trackLabel: "Fundamental Track"
    };
    if (score <= 40) return {
        level: 2,
        label: "Dasar",
        trackLabel: "Fundamental Track"
    };
    if (score <= 60) return {
        level: 3,
        label: "Menengah",
        trackLabel: "Intermediate Track"
    };
    if (score <= 80) return {
        level: 4,
        label: "Mahir",
        trackLabel: "Advanced Track"
    };
    return {
        level: 5,
        label: "Ahli",
        trackLabel: "Expert Track"
    };
}
function getRoadmapForScore(major, score) {
    const roadmap = majorRoadmapMap[normalizeMajorKey(major)] || rplRoadmap;
    const all = [
        ...roadmap.fundamental,
        ...roadmap.intermediate,
        ...roadmap.advanced
    ];
    const total = all.length;
    return all.map((m, i)=>{
        const threshold = i === 0 ? 0 : i / total * 100;
        const status = score >= threshold ? "available" : "locked";
        return {
            ...m,
            status
        };
    });
}
function currentStudentEmail() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("studentEmail") || "";
}
function getQuizResult() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const email = currentStudentEmail();
        const key = email ? `major_quiz_result_${email}` : "major_quiz_result";
        const stored = JSON.parse(localStorage.getItem(key) || "null");
        if (stored && stored.skillScores) return stored;
    } catch  {}
    return null;
}
function saveQuizResult(result) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const email = currentStudentEmail();
    const key = email ? `major_quiz_result_${email}` : "major_quiz_result";
    localStorage.setItem(key, JSON.stringify(result));
}
function getQuizAnswers() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const email = currentStudentEmail();
        const key = email ? `major_quiz_answers_${email}` : "major_quiz_answers";
        return JSON.parse(localStorage.getItem(key) || "{}");
    } catch  {
        return {};
    }
}
function saveQuizAnswers(answers) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const email = currentStudentEmail();
    const key = email ? `major_quiz_answers_${email}` : "major_quiz_answers";
    localStorage.setItem(key, JSON.stringify(answers));
}
function clearAssessmentData(email) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const e = email || currentStudentEmail();
    if (e) {
        localStorage.removeItem(`major_quiz_result_${e}`);
        localStorage.removeItem(`major_quiz_answers_${e}`);
        localStorage.removeItem(`career_matches_${e}`);
        localStorage.removeItem(`${ROADMAP_PROGRESS_KEY}_${e}`);
        localStorage.removeItem(`${RESOURCES_VIEWED_KEY}_${e}`);
    }
    localStorage.removeItem("major_quiz_result");
    localStorage.removeItem("major_quiz_answers");
}
const ROADMAP_PROGRESS_KEY = "roadmap_progress";
const RESOURCES_VIEWED_KEY = "roadmap_resources_viewed";
function loadRoadmapProgress(studentEmail) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const key = studentEmail || currentStudentEmail() ? `${ROADMAP_PROGRESS_KEY}_${studentEmail || currentStudentEmail()}` : ROADMAP_PROGRESS_KEY;
    try {
        return JSON.parse(localStorage.getItem(key) || "{}");
    } catch  {
        return {};
    }
}
function saveRoadmapProgress(progress, studentEmail) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const key = studentEmail || currentStudentEmail() ? `${ROADMAP_PROGRESS_KEY}_${studentEmail || currentStudentEmail()}` : ROADMAP_PROGRESS_KEY;
    localStorage.setItem(key, JSON.stringify(progress));
}
function loadViewedResources(studentEmail) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const key = `${RESOURCES_VIEWED_KEY}_${studentEmail}`;
    try {
        return JSON.parse(localStorage.getItem(key) || "{}");
    } catch  {
        return {};
    }
}
function markResourceViewed(studentEmail, milestoneId, resourceTitle) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const key = `${RESOURCES_VIEWED_KEY}_${studentEmail}`;
    const viewed = loadViewedResources(studentEmail);
    const current = viewed[milestoneId] || [];
    if (!current.includes(resourceTitle)) {
        current.push(resourceTitle);
    }
    viewed[milestoneId] = current;
    localStorage.setItem(key, JSON.stringify(viewed));
    return viewed;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/student/roadmap/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoadmapPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/chart-column.mjs [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/clipboard-check.mjs [app-client] (ecmascript) <export default as ClipboardCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/book-open.mjs [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/badge-check.mjs [app-client] (ecmascript) <export default as BadgeCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$layout$2f$dashboardheader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/components/layout/dashboardheader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/lib/auth-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$student$2d$card$2d$gate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/components/student-card-gate.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$major$2d$roadmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/lib/major-roadmap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$career$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/lib/career-match.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const levelConfig = {
    fundamental: {
        label: "Fundamental",
        color: "bg-emerald-500"
    },
    intermediate: {
        label: "Intermediate",
        color: "bg-amber-500"
    },
    advanced: {
        label: "Advanced",
        color: "bg-red-500"
    }
};
const resourceTypeLabel = {
    article: {
        label: "Artikel",
        color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
    },
    video: {
        label: "Video",
        color: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
    },
    course: {
        label: "Kursus",
        color: "bg-primary/10 text-primary"
    },
    practice: {
        label: "Praktik",
        color: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
    }
};
function RoadmapPage() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [milestones, setMilestones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [quizResult, setQuizResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [careerMatches, setCareerMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCareer, setSelectedCareer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expandedId, setExpandedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoadmapPage.useEffect": ()=>{
            setMounted(true);
        }
    }["RoadmapPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoadmapPage.useEffect": ()=>{
            if (!mounted || !user) return;
            const qr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$major$2d$roadmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQuizResult"])();
            setQuizResult(qr);
            const major = user.student?.major || "";
            const roadmap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$major$2d$roadmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoadmapForScore"])(major, qr?.score || 0);
            setMilestones(roadmap);
            const matches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$career$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadCareerMatches"])() || [];
            if (qr && matches.length > 0 && matches.some({
                "RoadmapPage.useEffect": (m)=>!m.skillGaps || m.skillGaps.length === 0
            }["RoadmapPage.useEffect"])) {
                const fresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$career$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateCareerMatches"])(major, qr);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$career$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCareerMatches"])(fresh);
                setCareerMatches(fresh);
                if (fresh.length > 0) setSelectedCareer(fresh[0]);
            } else {
                setCareerMatches(matches);
                if (matches.length > 0) setSelectedCareer(matches[0]);
            }
        }
    }["RoadmapPage.useEffect"], [
        mounted,
        user
    ]);
    const { approved } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$student$2d$card$2d$gate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCardStatus"])();
    if (!mounted || !user) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonDashboard"], {}, void 0, false, {
            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
            lineNumber: 81,
            columnNumber: 54
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
        lineNumber: 81,
        columnNumber: 33
    }, this);
    if (!approved) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$layout$2f$dashboardheader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Learning Recommendation",
                    subtitle: "Rekomendasi belajar berdasarkan skill gap kamu"
                }, void 0, false, {
                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "max-w-xl mx-auto text-center py-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-5",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                className: "w-8 h-8 text-amber-600 dark:text-amber-400"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-bold text-foreground mb-2",
                            children: "Learning Recommendation Terkunci"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted mb-6 max-w-sm mx-auto",
                            children: "Selesaikan Verifikasi Kartu Pelajar agar bisa mengakses rekomendasi belajar dan skill gap analysis."
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/student/profile",
                            className: "inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                "Ke Profil & Upload Kartu"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this);
    }
    const gapSkillNames = (selectedCareer?.skillGaps || []).map((g)=>g.name.toLowerCase());
    const unlockedMilestones = gapSkillNames.length > 0 ? milestones.filter((m)=>m.skills.some((s)=>gapSkillNames.includes(s.toLowerCase()))) : milestones.filter((m)=>m.status !== "locked");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$layout$2f$dashboardheader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Learning Recommendation",
                subtitle: "Rekomendasi belajar berdasarkan skill gap kamu"
            }, void 0, false, {
                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            !quizResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "mb-6 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center text-center py-8 px-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"], {
                                className: "w-8 h-8 text-amber-600 dark:text-amber-400"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold text-foreground mb-2",
                            children: "Isi Tes Know Yourself Dulu!"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted max-w-md mb-6",
                            children: "Sebelum melihat rekomendasi belajar, kamu harus mengikuti tes jurusan terlebih dahulu. Hasil tes akan menentukan skill gap dan rekomendasi yang sesuai."
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/student/assessment",
                            className: "inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this),
                                "Mulai Tes Sekarang"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                    lineNumber: 122,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this),
            quizResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "mb-6 bg-primary/5 border-primary/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                className: "w-5 h-5 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-foreground",
                                children: "Hasil Tes Jurusan"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-3 bg-card rounded-xl border border-border",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold text-primary",
                                        children: [
                                            quizResult.score,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted mt-1",
                                        children: "Skor"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-3 bg-card rounded-xl border border-border",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold text-foreground",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$major$2d$roadmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScoreLevel"])(quizResult.score).label
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted mt-1",
                                        children: [
                                            "Tingkatan ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$major$2d$roadmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScoreLevel"])(quizResult.score).level,
                                            "/5"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-3 bg-card rounded-xl border border-border",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-bold text-emerald-500",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$major$2d$roadmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScoreLevel"])(quizResult.score).trackLabel
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted mt-1",
                                        children: "Jalur Belajar"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                lineNumber: 144,
                columnNumber: 9
            }, this),
            quizResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold text-foreground",
                                children: "Skill Gap per Karier"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this),
                            careerMatches.map((career)=>{
                                const tier = getReadinessTier(career.readinessScore || 0);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedCareer(career),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full text-left p-3 rounded-xl border transition-all", selectedCareer?.id === career.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-700"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-foreground text-sm",
                                                    children: career.title
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-xs font-bold ${getMatchBg(career.matchPercentage)} px-2 py-0.5 rounded-full`,
                                                    children: [
                                                        career.matchPercentage,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                            lineNumber: 186,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted",
                                                    children: career.category
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-[10px] font-medium ${tier.color}`,
                                                    children: [
                                                        tier.icon,
                                                        " ",
                                                        career.readinessScore || 0,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                            lineNumber: 192,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, career.id, true, {
                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                    lineNumber: 176,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-6",
                        children: selectedCareer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            variant: "primary",
                                                            className: "mb-2",
                                                            children: selectedCareer.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-xl font-bold text-foreground",
                                                            children: selectedCareer.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-muted mt-1",
                                                            children: selectedCareer.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `w-16 h-16 rounded-2xl ${getMatchBg(selectedCareer.matchPercentage)} flex items-center justify-center`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xl font-bold",
                                                                children: [
                                                                    selectedCareer.matchPercentage,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 216,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-muted mt-1",
                                                            children: "Match"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 219,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                            lineNumber: 209,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-muted mb-1",
                                                            children: "Career Match"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-lg font-bold text-primary",
                                                            children: [
                                                                selectedCareer.matchPercentage,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-muted mb-1",
                                                            children: "Readiness"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 230,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-bold", getReadinessTier(selectedCareer.readinessScore || 0).color),
                                                            children: [
                                                                selectedCareer.readinessScore || 0,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                            lineNumber: 224,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                    lineNumber: 208,
                                    columnNumber: 17
                                }, this),
                                (selectedCareer.skillGaps || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                        className: "w-5 h-5 text-amber-600 dark:text-amber-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-foreground",
                                                            children: "Prioritas Belajar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-muted",
                                                            children: "Skill yang perlu kamu tingkatkan"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 247,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                            lineNumber: 241,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: (selectedCareer.skillGaps || []).map((gap, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center",
                                                                            children: i + 1
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                            lineNumber: 256,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm font-medium text-foreground",
                                                                            children: gap.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                            lineNumber: 257,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                    lineNumber: 255,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted",
                                                                            children: [
                                                                                "Kamu: ",
                                                                                gap.current,
                                                                                "/5"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                            lineNumber: 260,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                            className: "w-3 h-3 text-red-400"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                            lineNumber: 261,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs font-medium text-foreground",
                                                                            children: [
                                                                                "Butuh: ",
                                                                                gap.required,
                                                                                "/5"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                            lineNumber: 262,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                    lineNumber: 259,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-full rounded-full bg-red-400",
                                                                        style: {
                                                                            width: `${gap.current / 5 * 100}%`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                        lineNumber: 267,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                    lineNumber: 266,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-full rounded-full bg-primary",
                                                                        style: {
                                                                            width: `${gap.required / 5 * 100}%`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                        lineNumber: 270,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                    lineNumber: 269,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, gap.name, true, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                            lineNumber: 251,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 19
                                }, this),
                                (selectedCareer.skillGaps || []).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    className: "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "w-5 h-5 text-emerald-600 dark:text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                lineNumber: 282,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-emerald-700 dark:text-emerald-300",
                                                children: "Semua skill kamu sudah memenuhi standar untuk role ini!"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                lineNumber: 283,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                        lineNumber: 281,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                    lineNumber: 280,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                        className: "w-5 h-5 text-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-foreground",
                                                            children: "Rekomendasi Materi Belajar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 297,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-muted",
                                                            children: selectedCareer ? `Berdasarkan skill gap untuk ${selectedCareer.title}` : "Sumber belajar untuk meningkatkan skill kamu"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                            lineNumber: 298,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                            lineNumber: 292,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                unlockedMilestones.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted text-center py-4",
                                                    children: "Tidak ada materi belajar yang cocok untuk skill gap karir ini."
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 23
                                                }, this),
                                                unlockedMilestones.map((milestone)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border border-border rounded-xl overflow-hidden",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setExpandedId(expandedId === milestone.id ? null : milestone.id),
                                                                className: "w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-8 h-8 rounded-full flex items-center justify-center", levelConfig[milestone.level].color),
                                                                                children: milestone.status === "completed" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                                    className: "w-4 h-4 text-white"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                    lineNumber: 319,
                                                                                    columnNumber: 33
                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                                    className: "w-4 h-4 text-white"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                    lineNumber: 321,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                lineNumber: 317,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "font-medium text-foreground text-sm",
                                                                                        children: milestone.title
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                        lineNumber: 325,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2 mt-0.5",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-1.5 py-0.5 rounded text-[10px] font-medium text-white", levelConfig[milestone.level].color),
                                                                                                children: levelConfig[milestone.level].label
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                                lineNumber: 327,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-xs text-muted",
                                                                                                children: [
                                                                                                    "~",
                                                                                                    milestone.estimatedHours,
                                                                                                    " jam"
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                                lineNumber: 330,
                                                                                                columnNumber: 33
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                        lineNumber: 326,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                lineNumber: 324,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                        lineNumber: 316,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-wrap gap-1",
                                                                        children: milestone.skills.slice(0, 2).map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                variant: "primary",
                                                                                className: "text-[10px]",
                                                                                children: skill
                                                                            }, skill, false, {
                                                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                lineNumber: 336,
                                                                                columnNumber: 31
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                        lineNumber: 334,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                lineNumber: 312,
                                                                columnNumber: 25
                                                            }, this),
                                                            expandedId === milestone.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "px-3 pb-3 border-t border-border",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-muted mt-3 mb-3",
                                                                        children: milestone.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                        lineNumber: 343,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-2",
                                                                        children: milestone.resources.map((resource)=>{
                                                                            const typeInfo = resourceTypeLabel[resource.type] || resourceTypeLabel.article;
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                                href: resource.url,
                                                                                target: "_blank",
                                                                                rel: "noopener noreferrer",
                                                                                className: "flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-2 py-0.5 rounded text-[10px] font-medium", typeInfo.color),
                                                                                        children: typeInfo.label
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                        lineNumber: 355,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-sm text-foreground flex-1",
                                                                                        children: resource.title
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                        lineNumber: 358,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                                        className: "w-3 h-3 text-muted flex-shrink-0"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                        lineNumber: 359,
                                                                                        columnNumber: 37
                                                                                    }, this)
                                                                                ]
                                                                            }, resource.title, true, {
                                                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                                lineNumber: 348,
                                                                                columnNumber: 35
                                                                            }, this);
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                        lineNumber: 344,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                                lineNumber: 342,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, milestone.id, true, {
                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                            lineNumber: 304,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                    lineNumber: 291,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    className: "border-primary/20 bg-primary/5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                    className: "w-6 h-6 text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                    lineNumber: 375,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                lineNumber: 374,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center sm:text-left flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold text-foreground",
                                                        children: "Re-Assessment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-muted",
                                                        children: "Setelah belajar, lakukan tes ulang untuk melihat peningkatan skill kamu."
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                lineNumber: 377,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/student/assessment?retake=true",
                                                className: "inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors text-sm whitespace-nowrap",
                                                children: "Tes Ulang"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                                lineNumber: 381,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                        lineNumber: 373,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                                    lineNumber: 372,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                            lineNumber: 206,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/student/roadmap/page.tsx",
                lineNumber: 169,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/student/roadmap/page.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(RoadmapPage, "tbuNAUig/DPYBxFrzM5G6LkE1fM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$student$2d$card$2d$gate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCardStatus"]
    ];
});
_c = RoadmapPage;
function getReadinessTier(score) {
    if (score >= 85) return {
        level: 4,
        label: "Job Ready",
        status: "Siap Bekerja",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-100 dark:bg-emerald-900/50",
        borderColor: "border-emerald-300 dark:border-emerald-700",
        icon: "🟢",
        description: "Skill kamu sudah memenuhi standar industri."
    };
    if (score >= 70) return {
        level: 3,
        label: "Almost Ready",
        status: "Hampir Siap",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-100 dark:bg-amber-900/50",
        borderColor: "border-amber-300 dark:border-amber-700",
        icon: "🟡",
        description: "Kamu sudah memiliki dasar yang kuat."
    };
    if (score >= 50) return {
        level: 2,
        label: "Developing",
        status: "Sedang Berkembang",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-100 dark:bg-orange-900/50",
        borderColor: "border-orange-300 dark:border-orange-700",
        icon: "🟠",
        description: "Kamu sedang dalam proses belajar."
    };
    return {
        level: 1,
        label: "Exploration",
        status: "Eksplorasi",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/50",
        borderColor: "border-red-300 dark:border-red-700",
        icon: "🔴",
        description: "Mulai petualangan karier kamu!"
    };
}
function getMatchBg(percentage) {
    if (percentage >= 80) return "bg-emerald-100 text-emerald-700";
    if (percentage >= 60) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-600";
}
var _c;
__turbopack_context__.k.register(_c, "RoadmapPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_app_0zlsu3p._.js.map