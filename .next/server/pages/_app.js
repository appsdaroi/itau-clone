(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ App)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./src/styles/globals.css
var globals = __webpack_require__(108);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(649);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: external "next/router"
const router_namespaceObject = require("next/router");
;// CONCATENATED MODULE: ./src/modules/layout/index.jsx



const Layout = ({ children , session  })=>{
    const router = (0,router_namespaceObject.useRouter)();
    console.log(session);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-col h-screen",
        children: [
            children,
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
                className: "fixed bottom-0 left-0 right-0 grid h-[4.5rem] grid-cols-5 gap-3 px-2 pt-2 pb-3 bg-white border-t",
                children: [
                    router.pathname == "/" ? /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/",
                        className: "flex justify-center items-top",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                className: "icon text-2xl before:content-['\\e995'] text-white"
                            })
                        })
                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        href: "/",
                        className: "flex flex-col items-center justify-start gap-1.5",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                className: "icon text-[1.5rem] before:content-['\\e995'] text-primary leading-none"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-xs",
                                children: "in\xedcio"
                            })
                        ]
                    }),
                    router.pathname == "/balance" ? /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/balance",
                        className: "flex justify-center items-top",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                className: "icon text-2xl before:content-['\\ea87'] text-white"
                            })
                        })
                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        href: "/balance",
                        className: "flex flex-col items-center justify-start gap-1.5",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                className: "icon text-[1.5rem] before:content-['\\ea87'] text-primary leading-none"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-xs",
                                children: "extrato"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: "flex flex-col items-center justify-start gap-1.5",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                className: "icon text-[1.5rem] before:content-['\\e929'] text-primary leading-none"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-xs",
                                children: "transa\xe7\xf5es"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: "flex flex-col items-center justify-start gap-1.5",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                className: "icon text-[1.5rem] before:content-['\\e98f'] text-primary leading-none"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-xs",
                                children: "produtos"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: "flex flex-col items-center justify-start gap-1.5",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                className: "icon text-[1.5rem] before:content-['\\ea7c'] text-primary leading-none"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-xs",
                                children: "ajuda"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};


;// CONCATENATED MODULE: ./src/pages/_app.js




function App({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(react_.SessionProvider, {
        session: pageProps.session,
        children: pageProps.session ? /*#__PURE__*/ jsx_runtime_.jsx(Layout, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        }) : /*#__PURE__*/ jsx_runtime_.jsx(Component, {
            ...pageProps
        })
    });
}


/***/ }),

/***/ 108:
/***/ (() => {



/***/ }),

/***/ 649:
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ 280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664], () => (__webpack_exec__(852)));
module.exports = __webpack_exports__;

})();