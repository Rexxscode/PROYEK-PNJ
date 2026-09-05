(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/app/components/ui/scroll-to-top.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollToTop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/arrow-up.mjs [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ScrollToTop() {
    _s();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollToTop.useEffect": ()=>{
            const onScroll = {
                "ScrollToTop.useEffect.onScroll": ()=>setVisible(window.scrollY > 300)
            }["ScrollToTop.useEffect.onScroll"];
            const onSidebar = {
                "ScrollToTop.useEffect.onSidebar": (e)=>setSidebarOpen(e.detail.open)
            }["ScrollToTop.useEffect.onSidebar"];
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            window.addEventListener("sidebar-toggle", onSidebar);
            return ({
                "ScrollToTop.useEffect": ()=>{
                    window.removeEventListener("scroll", onScroll);
                    window.removeEventListener("sidebar-toggle", onSidebar);
                }
            })["ScrollToTop.useEffect"];
        }
    }["ScrollToTop.useEffect"], []);
    if (!visible || sidebarOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>window.scrollTo({
                top: 0,
                behavior: "smooth"
            }),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed top-20 left-1/2 -translate-x-1/2 z-50 p-2 sm:p-2.5 rounded-full", "bg-primary text-white shadow-lg shadow-primary/25", "hover:bg-primary-dark hover:shadow-xl transition-all", "animate-fade-in"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
            className: "w-4 h-4 sm:w-4.5 sm:h-4.5"
        }, void 0, false, {
            fileName: "[project]/frontend/app/components/ui/scroll-to-top.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/app/components/ui/scroll-to-top.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(ScrollToTop, "LI2vfCPySg/A384fszmXb+hIJ7Q=");
_c = ScrollToTop;
var _c;
__turbopack_context__.k.register(_c, "ScrollToTop");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/lib/api-contract.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BACKEND_ENDPOINTS",
    ()=>BACKEND_ENDPOINTS,
    "CLIENT_STORAGE_KEYS",
    ()=>CLIENT_STORAGE_KEYS
]);
const BACKEND_ENDPOINTS = {
    auth: {
        login: "/api/v1/auth/login",
        register: "/api/v1/auth/register",
        logout: "/api/v1/auth/logout",
        me: "/api/v1/auth/me",
        changePassword: "/api/v1/auth/change-password"
    },
    students: {
        list: "/api/v1/students",
        bySlug: (slug)=>`/api/v1/students/${slug}`,
        updateGrade: (email)=>`/api/v1/students/${email}/grade`,
        avatar: "/api/v1/students/avatar"
    },
    industries: {
        list: "/api/v1/industries",
        register: "/api/v1/industries/register",
        me: "/api/v1/industries/me",
        profile: "/api/v1/industries/profile",
        candidates: "/api/v1/industries/candidates",
        approval: (email)=>`/api/v1/industries/${email}/approval`
    },
    majors: {
        list: "/api/v1/majors",
        materi: (major)=>`/api/v1/majors/${major}/materi`
    },
    assessment: {
        questions: (major)=>`/api/v1/assessment/questions/${encodeURIComponent(major)}`,
        adminQuestions: (major)=>major ? `/api/v1/assessment/questions/admin/${encodeURIComponent(major)}` : "/api/v1/assessment/questions/admin",
        submit: "/api/v1/assessment/submit",
        results: "/api/v1/assessment/results",
        update: (major)=>`/api/v1/assessment/questions?major=${encodeURIComponent(major)}`,
        reset: (major)=>`/api/v1/assessment/questions/reset?major=${encodeURIComponent(major)}`
    },
    materiQuiz: {
        questions: (materiId)=>`/api/v1/materi/${materiId}/questions`,
        adminQuestions: (materiId)=>`/api/v1/materi/${materiId}/questions/admin`,
        submit: (materiId)=>`/api/v1/materi/${materiId}/submit`,
        update: (materiId)=>`/api/v1/materi/${materiId}/questions`,
        reset: (materiId)=>`/api/v1/materi/${materiId}/questions/reset`
    },
    registrations: {
        list: "/api/v1/registrations/students",
        approve: (email)=>`/api/v1/registrations/students/${email}/approve`,
        reject: (email)=>`/api/v1/registrations/students/${email}/reject`,
        cardUpload: "/api/v1/registrations/students/card"
    },
    admins: {
        list: "/api/v1/admins",
        create: "/api/v1/admins"
    },
    statistics: {
        dashboard: "/api/v1/admin/statistics",
        readiness: "/api/v1/admin/statistics/readiness"
    },
    certificates: {
        list: "/api/v1/certificates",
        detail: (materiId)=>`/api/v1/certificates/${materiId}`
    },
    jobs: {
        list: "/api/v1/jobs",
        mine: "/api/v1/jobs/mine",
        create: "/api/v1/jobs",
        apply: (id)=>`/api/v1/jobs/${id}/apply`,
        myApplications: "/api/v1/jobs/applications/mine",
        jobApplicants: (id)=>`/api/v1/jobs/${id}/applications`,
        setApplicationStatus: (jobId, applicationId)=>`/api/v1/jobs/${jobId}/applications/${applicationId}/status`
    },
    portfolios: {
        list: (email)=>`/api/v1/portfolios/${email}/projects`,
        save: "/api/v1/portfolios",
        public: (slug)=>`/api/v1/portfolios/public/${slug}`
    },
    notifications: {
        list: "/api/v1/notifications",
        unreadCount: "/api/v1/notifications/unread-count",
        create: "/api/v1/notifications",
        markRead: (id)=>`/api/v1/notifications/${id}/read`,
        markAllRead: "/api/v1/notifications/read-all"
    }
};
const CLIENT_STORAGE_KEYS = {
    session: [
        "studentEmail",
        "loggedUserName",
        "loggedUserRole",
        "loggedUserCompany"
    ],
    profile: [
        "profilePhoto"
    ],
    theme: [
        "theme"
    ],
    registrations: [
        "registeredUsers"
    ],
    gradeOverrides: [
        "student_grade_overrides"
    ],
    quizOverrides: (materiId)=>`quiz_overrides_${materiId}`,
    majorQuizOverrides: (major)=>`quiz_overrides_${major.toLowerCase().trim().replace(/\s+/g, "-")}`,
    assessment: [
        "major_quiz_result",
        "major_quiz_answers"
    ],
    certificates: (email)=>`certificate_results_${email}`,
    industryJobs: (email)=>`industryJobs_${email}`,
    portfolioProjects: (email)=>`portfolio_projects_${email}`,
    notifications: "app_notifications"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/lib/api.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "api",
    ()=>api,
    "apiUpload",
    ()=>apiUpload,
    "getToken",
    ()=>getToken,
    "removeToken",
    ()=>removeToken,
    "setToken",
    ()=>setToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2d$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/lib/api-contract.ts [app-client] (ecmascript)");
;
const API_BASE = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
function getToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("auth_token");
}
function setToken(token) {
    localStorage.setItem("auth_token", token);
}
function removeToken() {
    localStorage.removeItem("auth_token");
}
class ApiError extends Error {
    status;
    errors;
    constructor(status, message, errors){
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errors = errors;
    }
}
async function request(method, url, body) {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json"
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const config = {
        method,
        headers
    };
    if (body && method !== "GET") {
        config.body = JSON.stringify(body);
    }
    const response = await fetch(`${API_BASE}${url}`, config);
    if (response.status === 401) {
        removeToken();
        if ("TURBOPACK compile-time truthy", 1) {
            window.location.href = "/auth/login";
        }
        throw new ApiError(401, "Session expired. Please login again.");
    }
    const data = await response.json();
    if (!response.ok) {
        throw new ApiError(response.status, data.message || "Request failed", data.errors);
    }
    return data;
}
const api = {
    get: (url)=>request("GET", url),
    post: (url, body)=>request("POST", url, body),
    put: (url, body)=>request("PUT", url, body),
    patch: (url, body)=>request("PATCH", url, body),
    delete: (url)=>request("DELETE", url)
};
async function requestFile(method, url, formData) {
    const token = getToken();
    const headers = {
        Accept: "application/json"
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE}${url}`, {
        method,
        headers,
        body: formData
    });
    if (response.status === 401) {
        removeToken();
        if ("TURBOPACK compile-time truthy", 1) {
            window.location.href = "/auth/login";
        }
        throw new ApiError(401, "Session expired. Please login again.");
    }
    const data = await response.json();
    if (!response.ok) {
        throw new ApiError(response.status, data.message || "Request failed", data.errors);
    }
    return data;
}
const apiUpload = {
    post: (url, formData)=>requestFile("POST", url, formData),
    put: (url, formData)=>requestFile("PUT", url, formData),
    patch: (url, formData)=>requestFile("PATCH", url, formData)
};
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/lib/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/app/lib/api.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2d$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/lib/api-contract.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const refreshUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[refreshUser]": async ()=>{
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getToken"])();
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }
            try {
                const res = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2d$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_ENDPOINTS"].auth.me);
                setUser(res.data.user);
                try {
                    if (res.data.user.role === "student") {
                        localStorage.setItem("studentEmail", res.data.user.email);
                    }
                } catch  {}
            } catch  {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["removeToken"])();
                setUser(null);
            } finally{
                setLoading(false);
            }
        }
    }["AuthProvider.useCallback[refreshUser]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            refreshUser();
        }
    }["AuthProvider.useEffect"], [
        refreshUser
    ]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": async (email, password)=>{
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2d$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_ENDPOINTS"].auth.login, {
                email,
                password
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setToken"])(res.data.token);
            setUser(res.data.user);
            try {
                if (res.data.user.role === "student") {
                    localStorage.setItem("studentEmail", res.data.user.email);
                }
            } catch  {}
            return res.data.user;
        }
    }["AuthProvider.useCallback[login]"], []);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[register]": async (data)=>{
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2d$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_ENDPOINTS"].auth.register, data);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setToken"])(res.data.token);
            setUser(res.data.user);
            try {
                if (res.data.user.role === "student") {
                    localStorage.setItem("studentEmail", res.data.user.email);
                }
            } catch  {}
            return res.data.user;
        }
    }["AuthProvider.useCallback[register]"], []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": async ()=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2d$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_ENDPOINTS"].auth.logout);
            } catch  {
            // ignore logout errors
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["removeToken"])();
            setUser(null);
            try {
                localStorage.removeItem("studentEmail");
                localStorage.removeItem("profilePhoto");
                localStorage.removeItem("loggedUserRole");
                localStorage.removeItem("loggedUserName");
                localStorage.removeItem("loggedUserCompany");
            } catch  {}
        }
    }["AuthProvider.useCallback[logout]"], []);
    const changePassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[changePassword]": async (currentPassword, newPassword)=>{
            await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$lib$2f$api$2d$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_ENDPOINTS"].auth.changePassword, {
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: newPassword
            });
        }
    }["AuthProvider.useCallback[changePassword]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            loading,
            login,
            register,
            logout,
            refreshUser,
            changePassword,
            isAuthenticated: !!user
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/app/lib/auth-context.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "DNn/heBpw6AjWQkgmaFX6JoY4O4=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/lib/theme-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    theme: "light",
    toggleTheme: ()=>{}
});
function ThemeProvider({ children }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const themeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("light");
    const transitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const applyTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ThemeProvider.useCallback[applyTheme]": (next)=>{
            themeRef.current = next;
            localStorage.setItem("theme", next);
            document.documentElement.classList.toggle("dark", next === "dark");
        }
    }["ThemeProvider.useCallback[applyTheme]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const saved = localStorage.getItem("theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const initial = saved || (prefersDark ? "dark" : "light");
            applyTheme(initial);
            setTheme(initial);
            setMounted(true);
        }
    }["ThemeProvider.useEffect"], [
        applyTheme
    ]);
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ThemeProvider.useCallback[toggleTheme]": ()=>{
            const next = themeRef.current === "light" ? "dark" : "light";
            if (typeof document === "undefined" || !("startViewTransition" in document)) {
                applyTheme(next);
                setTheme(next);
                return;
            }
            // Batalkan transisi yang sedang berjalan agar tidak terjadi tabrakan saat toggle cepat.
            const prev = transitionRef.current;
            try {
                prev?.skipTransition();
            } catch  {
            // Abaikan bila transisi sudah selesai/dibatalkan.
            }
            const viewTransition = document.startViewTransition({
                "ThemeProvider.useCallback[toggleTheme].viewTransition": ()=>applyTheme(next)
            }["ThemeProvider.useCallback[toggleTheme].viewTransition"]);
            transitionRef.current = viewTransition;
            // Tangkap rejection dari transisi yang dibatalkan ("Transition was skipped" / AbortError)
            // di finished & ready agar tidak menjadi unhandled promise rejection.
            if (prev) {
                prev.finished.catch({
                    "ThemeProvider.useCallback[toggleTheme]": ()=>{}
                }["ThemeProvider.useCallback[toggleTheme]"]);
                prev.ready.catch({
                    "ThemeProvider.useCallback[toggleTheme]": ()=>{}
                }["ThemeProvider.useCallback[toggleTheme]"]);
            }
            viewTransition.finished.catch({
                "ThemeProvider.useCallback[toggleTheme]": ()=>{}
            }["ThemeProvider.useCallback[toggleTheme]"]);
            viewTransition.ready.catch({
                "ThemeProvider.useCallback[toggleTheme]": ()=>{}
            }["ThemeProvider.useCallback[toggleTheme]"]);
            setTheme(next);
        }
    }["ThemeProvider.useCallback[toggleTheme]"], [
        applyTheme
    ]);
    if (!mounted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/app/lib/theme-context.tsx",
        lineNumber: 83,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/app/lib/theme-context.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "tm0Xwnno3zvM72TiHkvOIMzOxOk=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
}
_s1(useTheme, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/lib/toast-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    toast: ()=>{}
});
function useToast() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
}
_s(useToast, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function ToastProvider({ children }) {
    _s1();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[toast]": (message, type = "success")=>{
            const id = Date.now();
            setToasts({
                "ToastProvider.useCallback[toast]": (prev)=>[
                        ...prev,
                        {
                            id,
                            message,
                            type
                        }
                    ]
            }["ToastProvider.useCallback[toast]"]);
            setTimeout({
                "ToastProvider.useCallback[toast]": ()=>{
                    setToasts({
                        "ToastProvider.useCallback[toast]": (prev)=>prev.filter({
                                "ToastProvider.useCallback[toast]": (t)=>t.id !== id
                            }["ToastProvider.useCallback[toast]"])
                    }["ToastProvider.useCallback[toast]"]);
                }
            }["ToastProvider.useCallback[toast]"], 3500);
        }
    }["ToastProvider.useCallback[toast]"], []);
    const remove = (id)=>{
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
    };
    const icons = {
        success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
            className: "w-5 h-5 text-emerald-500 shrink-0"
        }, void 0, false, {
            fileName: "[project]/frontend/app/lib/toast-context.tsx",
            lineNumber: 40,
            columnNumber: 14
        }, this),
        error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            className: "w-5 h-5 text-red-500 shrink-0"
        }, void 0, false, {
            fileName: "[project]/frontend/app/lib/toast-context.tsx",
            lineNumber: 41,
            columnNumber: 12
        }, this),
        warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
            className: "w-5 h-5 text-amber-500 shrink-0"
        }, void 0, false, {
            fileName: "[project]/frontend/app/lib/toast-context.tsx",
            lineNumber: 42,
            columnNumber: 14
        }, this),
        info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
            className: "w-5 h-5 text-blue-500 shrink-0"
        }, void 0, false, {
            fileName: "[project]/frontend/app/lib/toast-context.tsx",
            lineNumber: 43,
            columnNumber: 11
        }, this)
    };
    const borderColors = {
        success: "border-l-emerald-500",
        error: "border-l-red-500",
        warning: "border-l-amber-500",
        info: "border-l-blue-500"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            toast
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none",
                children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `pointer-events-auto flex items-center gap-3 px-4 py-3 bg-card border border-border border-l-4 ${borderColors[t.type]} rounded-xl shadow-lg min-w-[200px] max-w-[min(400px,calc(100vw-3rem))] animate-slide-in`,
                        children: [
                            icons[t.type],
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-foreground flex-1",
                                children: t.message
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/lib/toast-context.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>remove(t.id),
                                className: "text-muted hover:text-foreground transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/lib/toast-context.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/lib/toast-context.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/frontend/app/lib/toast-context.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/app/lib/toast-context.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/lib/toast-context.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s1(ToastProvider, "OPZKGrTNnwp+klP+pH502F/rcGc=");
_c = ToastProvider;
var _c;
__turbopack_context__.k.register(_c, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate,
    "getInitials",
    ()=>getInitials,
    "getMatchBg",
    ()=>getMatchBg,
    "getMatchColor",
    ()=>getMatchColor,
    "getReadinessTier",
    ()=>getReadinessTier
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function getMatchColor(percentage) {
    if (percentage >= 80) return "text-emerald-600";
    if (percentage >= 60) return "text-amber-600";
    return "text-red-500";
}
function getMatchBg(percentage) {
    if (percentage >= 80) return "bg-emerald-100 text-emerald-700";
    if (percentage >= 60) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-600";
}
function getReadinessTier(score) {
    if (score >= 85) return {
        level: 4,
        label: "Job Ready",
        status: "Siap Bekerja",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-100 dark:bg-emerald-900/50",
        borderColor: "border-emerald-300 dark:border-emerald-700",
        icon: "🟢",
        description: "Skill kamu sudah memenuhi standar industri. Siap melamar pekerjaan!"
    };
    if (score >= 70) return {
        level: 3,
        label: "Almost Ready",
        status: "Hampir Siap",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-100 dark:bg-amber-900/50",
        borderColor: "border-amber-300 dark:border-amber-700",
        icon: "🟡",
        description: "Kamu sudah memiliki dasar yang kuat. Tingkatkan skill gap yang tersisa."
    };
    if (score >= 50) return {
        level: 2,
        label: "Developing",
        status: "Sedang Berkembang",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-100 dark:bg-orange-900/50",
        borderColor: "border-orange-300 dark:border-orange-700",
        icon: "🟠",
        description: "Kamu sedang dalam proses belajar. Fokus pada skill gap utama."
    };
    return {
        level: 1,
        label: "Exploration",
        status: "Eksplorasi",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/50",
        borderColor: "border-red-300 dark:border-red-700",
        icon: "🔴",
        description: "Mulai petualangan karier kamu! Ikuti assessment untuk mengetahui potensimu."
    };
}
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}
function getInitials(name) {
    return name.split(" ").map((n)=>n[0]).join("").toUpperCase().slice(0, 2);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_app_1fzaf26._.js.map