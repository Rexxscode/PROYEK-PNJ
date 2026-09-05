(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/app/components/charts/skillradar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/chart.js/dist/chart.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/react-chartjs-2/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/lib/theme-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Chart"].register(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RadialLinearScale"], __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PointElement"], __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LineElement"], __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Filler"], __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tooltip"], __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Legend"]);
function createCircularGridPlugin(gridColor) {
    return {
        id: "circularGrid",
        beforeDraw (chart) {
            const scale = chart.scales.r;
            if (!scale) return;
            const ctx = chart.ctx;
            const cx = scale.xCenter;
            const cy = scale.yCenter;
            const maxVal = scale.max;
            const stepSize = Number(scale.options.ticks?.stepSize) || 1;
            const ticks = [];
            for(let v = stepSize; v <= maxVal; v += stepSize){
                ticks.push(v);
            }
            ctx.save();
            ticks.forEach((v)=>{
                const radius = scale.getDistanceFromCenterForValue(v);
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                ctx.strokeStyle = gridColor;
                ctx.lineWidth = 1;
                ctx.stroke();
            });
            ctx.restore();
        }
    };
}
const SkillRadar = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s(function SkillRadar({ skills, title, max = 5, color = "rgba(37, 99, 235, 0.8)" }) {
    _s();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SkillRadar.SkillRadar.useEffect": ()=>{
            const t = setTimeout({
                "SkillRadar.SkillRadar.useEffect.t": ()=>setReady(true)
            }["SkillRadar.SkillRadar.useEffect.t"], 0);
            return ({
                "SkillRadar.SkillRadar.useEffect": ()=>clearTimeout(t)
            })["SkillRadar.SkillRadar.useEffect"];
        }
    }["SkillRadar.SkillRadar.useEffect"], []);
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const isDark = theme === "dark";
    const labelColor = isDark ? "#94a3b8" : "#475569";
    const gridColor = isDark ? "rgba(148,163,184,0.2)" : "rgba(226, 232, 240, 0.8)";
    const angleLineColor = isDark ? "rgba(148,163,184,0.15)" : "rgba(226, 232, 240, 0.5)";
    const circularPlugin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SkillRadar.SkillRadar.useMemo[circularPlugin]": ()=>createCircularGridPlugin(gridColor)
    }["SkillRadar.SkillRadar.useMemo[circularPlugin]"], [
        gridColor
    ]);
    const plugins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SkillRadar.SkillRadar.useMemo[plugins]": ()=>[
                circularPlugin
            ]
    }["SkillRadar.SkillRadar.useMemo[plugins]"], [
        circularPlugin
    ]);
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SkillRadar.SkillRadar.useMemo[data]": ()=>({
                labels: skills.map({
                    "SkillRadar.SkillRadar.useMemo[data]": (s)=>s.name
                }["SkillRadar.SkillRadar.useMemo[data]"]),
                datasets: [
                    {
                        label: "Level Skill",
                        data: skills.map({
                            "SkillRadar.SkillRadar.useMemo[data]": (s)=>s.level
                        }["SkillRadar.SkillRadar.useMemo[data]"]),
                        backgroundColor: color.replace("0.8", "0.15"),
                        borderColor: color,
                        borderWidth: 2,
                        pointBackgroundColor: color,
                        pointBorderColor: "#fff",
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            })
    }["SkillRadar.SkillRadar.useMemo[data]"], [
        skills,
        color
    ]);
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SkillRadar.SkillRadar.useMemo[options]": ()=>({
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: "easeOutQuart"
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max,
                        ticks: {
                            stepSize: max <= 10 ? 1 : Math.ceil(max / 5),
                            display: false
                        },
                        pointLabels: {
                            font: {
                                size: 11,
                                family: "inherit"
                            },
                            color: labelColor
                        },
                        grid: {
                            color: "transparent"
                        },
                        angleLines: {
                            color: angleLineColor
                        }
                    }
                }
            })
    }["SkillRadar.SkillRadar.useMemo[options]"], [
        labelColor,
        angleLineColor,
        max
    ]);
    if (!ready) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-64"
    }, void 0, false, {
        fileName: "[project]/frontend/app/components/charts/skillradar.tsx",
        lineNumber: 127,
        columnNumber: 22
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-semibold text-foreground mb-3",
                children: title
            }, void 0, false, {
                fileName: "[project]/frontend/app/components/charts/skillradar.tsx",
                lineNumber: 131,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radar"], {
                    data: data,
                    options: options,
                    plugins: plugins
                }, theme, false, {
                    fileName: "[project]/frontend/app/components/charts/skillradar.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/components/charts/skillradar.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/components/charts/skillradar.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}, "s45RLWCLYFu9d1rfDEOSIt63tOQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
})), "s45RLWCLYFu9d1rfDEOSIt63tOQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c1 = SkillRadar;
const __TURBOPACK__default__export__ = SkillRadar;
var _c, _c1;
__turbopack_context__.k.register(_c, "SkillRadar$memo");
__turbopack_context__.k.register(_c1, "SkillRadar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/components/charts/skillradar.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/app/components/charts/skillradar.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=frontend_app_components_charts_skillradar_tsx_0n3aip5._.js.map