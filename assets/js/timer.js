!(function () {
    "use strict";
    function H(e) {
        return (H =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                      return typeof e;
                  }
                : function (e) {
                      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                  })(e);
    }
    function t(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(t);
            e &&
                (i = i.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })),
                n.push.apply(n, i);
        }
        return n;
    }
    function R(r) {
        for (var e = 1; e < arguments.length; e++) {
            var o = null != arguments[e] ? arguments[e] : {};
            e % 2
                ? t(Object(o), !0).forEach(function (e) {
                      var t, n, i;
                      (t = r), (i = o[(n = e)]), n in t ? Object.defineProperty(t, n, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (t[n] = i);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o))
                : t(Object(o)).forEach(function (e) {
                      Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e));
                  });
        }
        return r;
    }
    function o(e, t, n) {
        var i,
            r = "";
        if ((e = "number" == typeof e ? String(e) : e).length > t) return e;
        for (i = 0; i < t; i += 1) r += String(n);
        return (r + e).slice(-r.length);
    }
    function M() {
        this.reset();
    }
    function B() {
        this.events = {};
    }
    (M.prototype.toString = function () {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ["minutes", "seconds"],
            t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : ":",
            n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 2;
        (e = e || ["minutes", "seconds"]), (t = t || ":"), (n = n || 2);
        var i,
            r = [];
        for (i = 0; i < e.length; i += 1) void 0 !== this[e[i]] && ("secondTenths" === e[i] ? r.push(this[e[i]]) : r.push(o(this[e[i]], n, "0")));
        return r.join(t);
    }),
        (M.prototype.reset = function () {
            (this.secondTenths = 0), (this.seconds = 0), (this.minutes = 0), (this.hours = 0), (this.days = 0);
        }),
        (B.prototype.on = function (e, t) {
            var n = this;
            return (
                Array.isArray(this.events[e]) || (this.events[e] = []),
                this.events[e].push(t),
                function () {
                    return n.removeListener(e, t);
                }
            );
        }),
        (B.prototype.removeListener = function (e, t) {
            if (Array.isArray(this.events[e])) {
                var n = this.events[e].indexOf(t);
                -1 < n && this.events[e].splice(n, 1);
            }
        }),
        (B.prototype.emit = function (e) {
            for (var t = this, n = arguments.length, i = new Array(1 < n ? n - 1 : 0), r = 1; r < n; r++) i[r - 1] = arguments[r];
            Array.isArray(this.events[e]) &&
                this.events[e].forEach(function (e) {
                    return e.apply(t, i);
                });
        });
    var W = "secondTenths",
        V = "seconds",
        $ = "minutes",
        U = "hours",
        z = "days",
        Q = [W, V, $, U, z],
        X = { secondTenths: 100, seconds: 1e3, minutes: 6e4, hours: 36e5, days: 864e5 },
        Y = { secondTenths: 10, seconds: 60, minutes: 60, hours: 24 };
    function K(e, t) {
        return ((e % t) + t) % t;
    }
    function e() {
        var t,
            n,
            r,
            i,
            o,
            a,
            s,
            l,
            u,
            f,
            c = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            d = new M(),
            h = new M(),
            p = new B(),
            g = !1,
            m = !1,
            v = {},
            y = { detail: { timer: this } };
        function b(e, t) {
            var n,
                i,
                r,
                o = h[t];
            return (i = D(e, X[(n = t)])), (r = Y[n]), (h[n] = i), (d[n] = n === z ? Math.abs(i) : K(0 <= i ? i : r - K(i, r), r)), h[t] !== o;
        }
        function e() {
            _(), d.reset(), h.reset();
        }
        function _() {
            clearInterval(t), (t = void 0), (m = g = !1);
        }
        function w(e) {
            q() ? ((u = x()), (a = N(o.target))) : k(e),
                (function () {
                    var e = X[n];
                    if (S(C(Date.now()))) return;
                    (t = setInterval(E, e)), (g = !0), (m = !1);
                })();
        }
        function x() {
            return C(Date.now()) - h.secondTenths * X[W] * r;
        }
        function E() {
            var e = C(Date.now());
            !(function (e) {
                e[W] && I("secondTenthsUpdated", y);
                e[V] && I("secondsUpdated", y);
                e[$] && I("minutesUpdated", y);
                e[U] && I("hoursUpdated", y);
                e[z] && I("daysUpdated", y);
            })(T()),
                i(y.detail.timer),
                S(e) && (O(), I("targetAchieved", y));
        }
        function T(e) {
            var t = 0 < arguments.length && void 0 !== e ? e : C(Date.now()),
                n = 0 < r ? t - u : u - t,
                i = {};
            return (i[W] = b(n, W)), (i[V] = b(n, V)), (i[$] = b(n, $)), (i[U] = b(n, U)), (i[z] = b(n, z)), i;
        }
        function C(e) {
            return Math.floor(e / X[n]) * X[n];
        }
        function S(e) {
            return a instanceof Array && f <= e;
        }
        function k(e) {
            var t;
            (n = (function (e) {
                if (
                    (function (e) {
                        return 0 <= Q.indexOf(e);
                    })((e = typeof e === "string" ? e : V))
                )
                    return e;
                throw new Error("Error in precision parameter: ".concat(e, " is not a valid value"));
            })((e = e || {}).precision)),
                (i = "function" == typeof e.callback ? e.callback : function () {}),
                (l = !0 === e.countdown),
                (r = !0 == l ? -1 : 1),
                "object" === H(e.startValues) ? ((t = e.startValues), (s = A(t)), (d.secondTenths = s[0]), (d.seconds = s[1]), (d.minutes = s[2]), (d.hours = s[3]), (d.days = s[4]), (h = j(s, h))) : (s = null),
                (u = x()),
                T(),
                (a = "object" === H(e.target) ? N(e.target) : l ? ((e.target = { seconds: 0 }), N(e.target)) : null),
                (v = { precision: n, callback: i, countdown: "object" === H(e) && !0 === e.countdown, target: a, startValues: s }),
                (o = e);
        }
        function A(e) {
            var t;
            if ("object" === H(e))
                if (e instanceof Array) {
                    if (5 !== e.length) throw new Error("Array size not valid");
                    t = e;
                } else {
                    for (var n in e) if (Q.indexOf(n) < 0) throw new Error("Error in startValues or target parameter: ".concat(n, " is not a valid input value"));
                    t = [e.secondTenths || 0, e.seconds || 0, e.minutes || 0, e.hours || 0, e.days || 0];
                }
            var i = t[0],
                r = t[1] + D(i, 10),
                o = t[2] + D(r, 60),
                a = t[3] + D(o, 60),
                s = t[4] + D(a, 24);
            return (t[0] = i % 10), (t[1] = r % 60), (t[2] = o % 60), (t[3] = a % 24), (t[4] = s), t;
        }
        function D(e, t) {
            var n = e / t;
            return n < 0 ? Math.ceil(n) : Math.floor(n);
        }
        function N(e) {
            if (e) {
                var t = j((a = A(e)));
                return (f = u + t.secondTenths * X[W] * r), a;
            }
        }
        function j(e, t) {
            var n = t || {};
            return (n.days = e[4]), (n.hours = 24 * n.days + e[3]), (n.minutes = 60 * n.hours + e[2]), (n.seconds = 60 * n.minutes + e[1]), (n.secondTenths = 10 * n.seconds + e[[0]]), n;
        }
        function O() {
            e(), I("stopped", y);
        }
        function L(e, t) {
            p.on(e, t);
        }
        function P(e, t) {
            p.removeListener(e, t);
        }
        function I(e, t) {
            p.emit(e, t);
        }
        function F() {
            return g;
        }
        function q() {
            return m;
        }
        k(c),
            void 0 !== this &&
                ((this.start = function () {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                    (e = R(R({}, c), e)), F() || (w(e), I("started", y));
                }),
                (this.pause = function () {
                    _(), (m = !0), I("paused", y);
                }),
                (this.stop = O),
                (this.reset = function () {
                    e(), w(o), I("reset", y);
                }),
                (this.isRunning = F),
                (this.isPaused = q),
                (this.getTimeValues = function () {
                    return d;
                }),
                (this.getTotalTimeValues = function () {
                    return h;
                }),
                (this.getConfig = function () {
                    return v;
                }),
                (this.addEventListener = L),
                (this.on = L),
                (this.removeEventListener = P),
                (this.off = P));
    }
    var i = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function n(e, t) {
        return e((t = { exports: {} }), t.exports), t.exports;
    }
    var r = n(function (e) {
        var t, n;
        (t = "undefined" != typeof window ? window : i),
            (n = function (E, e) {
                function g(e) {
                    return null != e && e === e.window;
                }
                var t = [],
                    i = Object.getPrototypeOf,
                    s = t.slice,
                    m = t.flat
                        ? function (e) {
                              return t.flat.call(e);
                          }
                        : function (e) {
                              return t.concat.apply([], e);
                          },
                    l = t.push,
                    r = t.indexOf,
                    n = {},
                    o = n.toString,
                    v = n.hasOwnProperty,
                    a = v.toString,
                    u = a.call(Object),
                    y = {},
                    b = function (e) {
                        return "function" == typeof e && "number" != typeof e.nodeType;
                    },
                    T = E.document,
                    f = { type: !0, src: !0, nonce: !0, noModule: !0 };
                function _(e, t, n) {
                    var i,
                        r,
                        o = (n = n || T).createElement("script");
                    if (((o.text = e), t)) for (i in f) (r = t[i] || (t.getAttribute && t.getAttribute(i))) && o.setAttribute(i, r);
                    n.head.appendChild(o).parentNode.removeChild(o);
                }
                function w(e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e;
                }
                var C = function (e, t) {
                    return new C.fn.init(e, t);
                };
                function c(e) {
                    var t = !!e && "length" in e && e.length,
                        n = w(e);
                    return !b(e) && !g(e) && ("array" === n || 0 === t || ("number" == typeof t && 0 < t && t - 1 in e));
                }
                (C.fn = C.prototype = {
                    jquery: "3.5.1",
                    constructor: C,
                    length: 0,
                    toArray: function () {
                        return s.call(this);
                    },
                    get: function (e) {
                        return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e];
                    },
                    pushStack: function (e) {
                        var t = C.merge(this.constructor(), e);
                        return (t.prevObject = this), t;
                    },
                    each: function (e) {
                        return C.each(this, e);
                    },
                    map: function (n) {
                        return this.pushStack(
                            C.map(this, function (e, t) {
                                return n.call(e, t, e);
                            })
                        );
                    },
                    slice: function () {
                        return this.pushStack(s.apply(this, arguments));
                    },
                    first: function () {
                        return this.eq(0);
                    },
                    last: function () {
                        return this.eq(-1);
                    },
                    even: function () {
                        return this.pushStack(
                            C.grep(this, function (e, t) {
                                return (t + 1) % 2;
                            })
                        );
                    },
                    odd: function () {
                        return this.pushStack(
                            C.grep(this, function (e, t) {
                                return t % 2;
                            })
                        );
                    },
                    eq: function (e) {
                        var t = this.length,
                            n = +e + (e < 0 ? t : 0);
                        return this.pushStack(0 <= n && n < t ? [this[n]] : []);
                    },
                    end: function () {
                        return this.prevObject || this.constructor();
                    },
                    push: l,
                    sort: t.sort,
                    splice: t.splice,
                }),
                    (C.extend = C.fn.extend = function () {
                        var e,
                            t,
                            n,
                            i,
                            r,
                            o,
                            a = arguments[0] || {},
                            s = 1,
                            l = arguments.length,
                            u = !1;
                        for ("boolean" == typeof a && ((u = a), (a = arguments[s] || {}), s++), "object" == typeof a || b(a) || (a = {}), s === l && ((a = this), s--); s < l; s++)
                            if (null != (e = arguments[s]))
                                for (t in e)
                                    (i = e[t]),
                                        "__proto__" !== t &&
                                            a !== i &&
                                            (u && i && (C.isPlainObject(i) || (r = Array.isArray(i)))
                                                ? ((n = a[t]), (o = r && !Array.isArray(n) ? [] : r || C.isPlainObject(n) ? n : {}), (r = !1), (a[t] = C.extend(u, o, i)))
                                                : void 0 !== i && (a[t] = i));
                        return a;
                    }),
                    C.extend({
                        expando: "jQuery" + ("3.5.1" + Math.random()).replace(/\D/g, ""),
                        isReady: !0,
                        error: function (e) {
                            throw new Error(e);
                        },
                        noop: function () {},
                        isPlainObject: function (e) {
                            var t, n;
                            return !(!e || "[object Object]" !== o.call(e)) && (!(t = i(e)) || ("function" == typeof (n = v.call(t, "constructor") && t.constructor) && a.call(n) === u));
                        },
                        isEmptyObject: function (e) {
                            var t;
                            for (t in e) return !1;
                            return !0;
                        },
                        globalEval: function (e, t, n) {
                            _(e, { nonce: t && t.nonce }, n);
                        },
                        each: function (e, t) {
                            var n,
                                i = 0;
                            if (c(e)) for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
                            else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
                            return e;
                        },
                        makeArray: function (e, t) {
                            var n = t || [];
                            return null != e && (c(Object(e)) ? C.merge(n, "string" == typeof e ? [e] : e) : l.call(n, e)), n;
                        },
                        inArray: function (e, t, n) {
                            return null == t ? -1 : r.call(t, e, n);
                        },
                        merge: function (e, t) {
                            for (var n = +t.length, i = 0, r = e.length; i < n; i++) e[r++] = t[i];
                            return (e.length = r), e;
                        },
                        grep: function (e, t, n) {
                            for (var i = [], r = 0, o = e.length, a = !n; r < o; r++) !t(e[r], r) != a && i.push(e[r]);
                            return i;
                        },
                        map: function (e, t, n) {
                            var i,
                                r,
                                o = 0,
                                a = [];
                            if (c(e)) for (i = e.length; o < i; o++) null != (r = t(e[o], o, n)) && a.push(r);
                            else for (o in e) null != (r = t(e[o], o, n)) && a.push(r);
                            return m(a);
                        },
                        guid: 1,
                        support: y,
                    }),
                    "function" == typeof Symbol && (C.fn[Symbol.iterator] = t[Symbol.iterator]),
                    C.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
                        n["[object " + t + "]"] = t.toLowerCase();
                    });
                var d = (function (n) {
                    function c(e, t) {
                        var n = "0x" + e.slice(1) - 65536;
                        return t || (n < 0 ? String.fromCharCode(65536 + n) : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320));
                    }
                    function r() {
                        x();
                    }
                    var e,
                        h,
                        _,
                        o,
                        a,
                        p,
                        d,
                        g,
                        w,
                        l,
                        u,
                        x,
                        E,
                        s,
                        T,
                        m,
                        f,
                        v,
                        y,
                        C = "sizzle" + 1 * new Date(),
                        b = n.document,
                        S = 0,
                        i = 0,
                        k = le(),
                        A = le(),
                        D = le(),
                        N = le(),
                        j = function (e, t) {
                            return e === t && (u = !0), 0;
                        },
                        O = {}.hasOwnProperty,
                        t = [],
                        L = t.pop,
                        P = t.push,
                        I = t.push,
                        F = t.slice,
                        q = function (e, t) {
                            for (var n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
                            return -1;
                        },
                        H = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                        R = "[\\x20\\t\\r\\n\\f]",
                        M = "(?:\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                        B = "\\[" + R + "*(" + M + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + R + "*\\]",
                        W = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + B + ")*)|.*)\\)|)",
                        V = new RegExp(R + "+", "g"),
                        $ = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
                        U = new RegExp("^" + R + "*," + R + "*"),
                        z = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
                        Q = new RegExp(R + "|>"),
                        X = new RegExp(W),
                        Y = new RegExp("^" + M + "$"),
                        K = {
                            ID: new RegExp("^#(" + M + ")"),
                            CLASS: new RegExp("^\\.(" + M + ")"),
                            TAG: new RegExp("^(" + M + "|[*])"),
                            ATTR: new RegExp("^" + B),
                            PSEUDO: new RegExp("^" + W),
                            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
                            bool: new RegExp("^(?:" + H + ")$", "i"),
                            needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i"),
                        },
                        G = /HTML$/i,
                        J = /^(?:input|select|textarea|button)$/i,
                        Z = /^h\d$/i,
                        ee = /^[^{]+\{\s*\[native \w/,
                        te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                        ne = /[+~]/,
                        ie = new RegExp("\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\([^\\r\\n\\f])", "g"),
                        re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                        oe = function (e, t) {
                            return t ? ("\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " ") : "\\" + e;
                        },
                        ae = _e(
                            function (e) {
                                return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
                            },
                            { dir: "parentNode", next: "legend" }
                        );
                    try {
                        I.apply((t = F.call(b.childNodes)), b.childNodes), t[b.childNodes.length].nodeType;
                    } catch (e) {
                        I = {
                            apply: t.length
                                ? function (e, t) {
                                      P.apply(e, F.call(t));
                                  }
                                : function (e, t) {
                                      for (var n = e.length, i = 0; (e[n++] = t[i++]); );
                                      e.length = n - 1;
                                  },
                        };
                    }
                    function se(t, e, n, i) {
                        var r,
                            o,
                            a,
                            s,
                            l,
                            u,
                            f,
                            c = e && e.ownerDocument,
                            d = e ? e.nodeType : 9;
                        if (((n = n || []), "string" != typeof t || !t || (1 !== d && 9 !== d && 11 !== d))) return n;
                        if (!i && (x(e), (e = e || E), T)) {
                            if (11 !== d && (l = te.exec(t)))
                                if ((r = l[1])) {
                                    if (9 === d) {
                                        if (!(a = e.getElementById(r))) return n;
                                        if (a.id === r) return n.push(a), n;
                                    } else if (c && (a = c.getElementById(r)) && y(e, a) && a.id === r) return n.push(a), n;
                                } else {
                                    if (l[2]) return I.apply(n, e.getElementsByTagName(t)), n;
                                    if ((r = l[3]) && h.getElementsByClassName && e.getElementsByClassName) return I.apply(n, e.getElementsByClassName(r)), n;
                                }
                            if (h.qsa && !N[t + " "] && (!m || !m.test(t)) && (1 !== d || "object" !== e.nodeName.toLowerCase())) {
                                if (((f = t), (c = e), 1 === d && (Q.test(t) || z.test(t)))) {
                                    for (((c = (ne.test(t) && ve(e.parentNode)) || e) === e && h.scope) || ((s = e.getAttribute("id")) ? (s = s.replace(re, oe)) : e.setAttribute("id", (s = C))), o = (u = p(t)).length; o--; )
                                        u[o] = (s ? "#" + s : ":scope") + " " + be(u[o]);
                                    f = u.join(",");
                                }
                                try {
                                    return I.apply(n, c.querySelectorAll(f)), n;
                                } catch (e) {
                                    N(t, !0);
                                } finally {
                                    s === C && e.removeAttribute("id");
                                }
                            }
                        }
                        return g(t.replace($, "$1"), e, n, i);
                    }
                    function le() {
                        var i = [];
                        return function e(t, n) {
                            return i.push(t + " ") > _.cacheLength && delete e[i.shift()], (e[t + " "] = n);
                        };
                    }
                    function ue(e) {
                        return (e[C] = !0), e;
                    }
                    function fe(e) {
                        var t = E.createElement("fieldset");
                        try {
                            return !!e(t);
                        } catch (e) {
                            return !1;
                        } finally {
                            t.parentNode && t.parentNode.removeChild(t), (t = null);
                        }
                    }
                    function ce(e, t) {
                        for (var n = e.split("|"), i = n.length; i--; ) _.attrHandle[n[i]] = t;
                    }
                    function de(e, t) {
                        var n = t && e,
                            i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                        if (i) return i;
                        if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
                        return e ? 1 : -1;
                    }
                    function he(t) {
                        return function (e) {
                            return "input" === e.nodeName.toLowerCase() && e.type === t;
                        };
                    }
                    function pe(n) {
                        return function (e) {
                            var t = e.nodeName.toLowerCase();
                            return ("input" === t || "button" === t) && e.type === n;
                        };
                    }
                    function ge(t) {
                        return function (e) {
                            return "form" in e
                                ? e.parentNode && !1 === e.disabled
                                    ? "label" in e
                                        ? "label" in e.parentNode
                                            ? e.parentNode.disabled === t
                                            : e.disabled === t
                                        : e.isDisabled === t || (e.isDisabled !== !t && ae(e) === t)
                                    : e.disabled === t
                                : "label" in e && e.disabled === t;
                        };
                    }
                    function me(a) {
                        return ue(function (o) {
                            return (
                                (o = +o),
                                ue(function (e, t) {
                                    for (var n, i = a([], e.length, o), r = i.length; r--; ) e[(n = i[r])] && (e[n] = !(t[n] = e[n]));
                                })
                            );
                        });
                    }
                    function ve(e) {
                        return e && void 0 !== e.getElementsByTagName && e;
                    }
                    for (e in ((h = se.support = {}),
                    (a = se.isXML = function (e) {
                        var t = e.namespaceURI,
                            n = (e.ownerDocument || e).documentElement;
                        return !G.test(t || (n && n.nodeName) || "HTML");
                    }),
                    (x = se.setDocument = function (e) {
                        var t,
                            n,
                            i = e ? e.ownerDocument || e : b;
                        return (
                            i != E &&
                                9 === i.nodeType &&
                                i.documentElement &&
                                ((s = (E = i).documentElement),
                                (T = !a(E)),
                                b != E && (n = E.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", r, !1) : n.attachEvent && n.attachEvent("onunload", r)),
                                (h.scope = fe(function (e) {
                                    return s.appendChild(e).appendChild(E.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length;
                                })),
                                (h.attributes = fe(function (e) {
                                    return (e.className = "i"), !e.getAttribute("className");
                                })),
                                (h.getElementsByTagName = fe(function (e) {
                                    return e.appendChild(E.createComment("")), !e.getElementsByTagName("*").length;
                                })),
                                (h.getElementsByClassName = ee.test(E.getElementsByClassName)),
                                (h.getById = fe(function (e) {
                                    return (s.appendChild(e).id = C), !E.getElementsByName || !E.getElementsByName(C).length;
                                })),
                                h.getById
                                    ? ((_.filter.ID = function (e) {
                                          var t = e.replace(ie, c);
                                          return function (e) {
                                              return e.getAttribute("id") === t;
                                          };
                                      }),
                                      (_.find.ID = function (e, t) {
                                          if (void 0 !== t.getElementById && T) {
                                              var n = t.getElementById(e);
                                              return n ? [n] : [];
                                          }
                                      }))
                                    : ((_.filter.ID = function (e) {
                                          var n = e.replace(ie, c);
                                          return function (e) {
                                              var t = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                              return t && t.value === n;
                                          };
                                      }),
                                      (_.find.ID = function (e, t) {
                                          if (void 0 !== t.getElementById && T) {
                                              var n,
                                                  i,
                                                  r,
                                                  o = t.getElementById(e);
                                              if (o) {
                                                  if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                                                  for (r = t.getElementsByName(e), i = 0; (o = r[i++]); ) if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                                              }
                                              return [];
                                          }
                                      })),
                                (_.find.TAG = h.getElementsByTagName
                                    ? function (e, t) {
                                          return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : h.qsa ? t.querySelectorAll(e) : void 0;
                                      }
                                    : function (e, t) {
                                          var n,
                                              i = [],
                                              r = 0,
                                              o = t.getElementsByTagName(e);
                                          if ("*" !== e) return o;
                                          for (; (n = o[r++]); ) 1 === n.nodeType && i.push(n);
                                          return i;
                                      }),
                                (_.find.CLASS =
                                    h.getElementsByClassName &&
                                    function (e, t) {
                                        if (void 0 !== t.getElementsByClassName && T) return t.getElementsByClassName(e);
                                    }),
                                (f = []),
                                (m = []),
                                (h.qsa = ee.test(E.querySelectorAll)) &&
                                    (fe(function (e) {
                                        var t;
                                        (s.appendChild(e).innerHTML = "<a id='" + C + "'></a><select id='" + C + "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                            e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + R + "*(?:''|\"\")"),
                                            e.querySelectorAll("[selected]").length || m.push("\\[" + R + "*(?:value|" + H + ")"),
                                            e.querySelectorAll("[id~=" + C + "-]").length || m.push("~="),
                                            (t = E.createElement("input")).setAttribute("name", ""),
                                            e.appendChild(t),
                                            e.querySelectorAll("[name='']").length || m.push("\\[" + R + "*name" + R + "*=" + R + "*(?:''|\"\")"),
                                            e.querySelectorAll(":checked").length || m.push(":checked"),
                                            e.querySelectorAll("a#" + C + "+*").length || m.push(".#.+[+~]"),
                                            e.querySelectorAll("\\\f"),
                                            m.push("[\\r\\n\\f]");
                                    }),
                                    fe(function (e) {
                                        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                        var t = E.createElement("input");
                                        t.setAttribute("type", "hidden"),
                                            e.appendChild(t).setAttribute("name", "D"),
                                            e.querySelectorAll("[name=d]").length && m.push("name" + R + "*[*^$|!~]?="),
                                            2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"),
                                            (s.appendChild(e).disabled = !0),
                                            2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"),
                                            e.querySelectorAll("*,:x"),
                                            m.push(",.*:");
                                    })),
                                (h.matchesSelector = ee.test((v = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector))) &&
                                    fe(function (e) {
                                        (h.disconnectedMatch = v.call(e, "*")), v.call(e, "[s!='']:x"), f.push("!=", W);
                                    }),
                                (m = m.length && new RegExp(m.join("|"))),
                                (f = f.length && new RegExp(f.join("|"))),
                                (t = ee.test(s.compareDocumentPosition)),
                                (y =
                                    t || ee.test(s.contains)
                                        ? function (e, t) {
                                              var n = 9 === e.nodeType ? e.documentElement : e,
                                                  i = t && t.parentNode;
                                              return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)));
                                          }
                                        : function (e, t) {
                                              if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                                              return !1;
                                          }),
                                (j = t
                                    ? function (e, t) {
                                          if (e === t) return (u = !0), 0;
                                          var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                          return (
                                              n ||
                                              (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || (!h.sortDetached && t.compareDocumentPosition(e) === n)
                                                  ? e == E || (e.ownerDocument == b && y(b, e))
                                                      ? -1
                                                      : t == E || (t.ownerDocument == b && y(b, t))
                                                      ? 1
                                                      : l
                                                      ? q(l, e) - q(l, t)
                                                      : 0
                                                  : 4 & n
                                                  ? -1
                                                  : 1)
                                          );
                                      }
                                    : function (e, t) {
                                          if (e === t) return (u = !0), 0;
                                          var n,
                                              i = 0,
                                              r = e.parentNode,
                                              o = t.parentNode,
                                              a = [e],
                                              s = [t];
                                          if (!r || !o) return e == E ? -1 : t == E ? 1 : r ? -1 : o ? 1 : l ? q(l, e) - q(l, t) : 0;
                                          if (r === o) return de(e, t);
                                          for (n = e; (n = n.parentNode); ) a.unshift(n);
                                          for (n = t; (n = n.parentNode); ) s.unshift(n);
                                          for (; a[i] === s[i]; ) i++;
                                          return i ? de(a[i], s[i]) : a[i] == b ? -1 : s[i] == b ? 1 : 0;
                                      })),
                            E
                        );
                    }),
                    (se.matches = function (e, t) {
                        return se(e, null, null, t);
                    }),
                    (se.matchesSelector = function (e, t) {
                        if ((x(e), h.matchesSelector && T && !N[t + " "] && (!f || !f.test(t)) && (!m || !m.test(t))))
                            try {
                                var n = v.call(e, t);
                                if (n || h.disconnectedMatch || (e.document && 11 !== e.document.nodeType)) return n;
                            } catch (e) {
                                N(t, !0);
                            }
                        return 0 < se(t, E, null, [e]).length;
                    }),
                    (se.contains = function (e, t) {
                        return (e.ownerDocument || e) != E && x(e), y(e, t);
                    }),
                    (se.attr = function (e, t) {
                        (e.ownerDocument || e) != E && x(e);
                        var n = _.attrHandle[t.toLowerCase()],
                            i = n && O.call(_.attrHandle, t.toLowerCase()) ? n(e, t, !T) : void 0;
                        return void 0 !== i ? i : h.attributes || !T ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
                    }),
                    (se.escape = function (e) {
                        return (e + "").replace(re, oe);
                    }),
                    (se.error = function (e) {
                        throw new Error("Syntax error, unrecognized expression: " + e);
                    }),
                    (se.uniqueSort = function (e) {
                        var t,
                            n = [],
                            i = 0,
                            r = 0;
                        if (((u = !h.detectDuplicates), (l = !h.sortStable && e.slice(0)), e.sort(j), u)) {
                            for (; (t = e[r++]); ) t === e[r] && (i = n.push(r));
                            for (; i--; ) e.splice(n[i], 1);
                        }
                        return (l = null), e;
                    }),
                    (o = se.getText = function (e) {
                        var t,
                            n = "",
                            i = 0,
                            r = e.nodeType;
                        if (r) {
                            if (1 === r || 9 === r || 11 === r) {
                                if ("string" == typeof e.textContent) return e.textContent;
                                for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
                            } else if (3 === r || 4 === r) return e.nodeValue;
                        } else for (; (t = e[i++]); ) n += o(t);
                        return n;
                    }),
                    ((_ = se.selectors = {
                        cacheLength: 50,
                        createPseudo: ue,
                        match: K,
                        attrHandle: {},
                        find: {},
                        relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                        preFilter: {
                            ATTR: function (e) {
                                return (e[1] = e[1].replace(ie, c)), (e[3] = (e[3] || e[4] || e[5] || "").replace(ie, c)), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                            },
                            CHILD: function (e) {
                                return (
                                    (e[1] = e[1].toLowerCase()),
                                    "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), (e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3]))), (e[5] = +(e[7] + e[8] || "odd" === e[3]))) : e[3] && se.error(e[0]),
                                    e
                                );
                            },
                            PSEUDO: function (e) {
                                var t,
                                    n = !e[6] && e[2];
                                return K.CHILD.test(e[0])
                                    ? null
                                    : (e[3] ? (e[2] = e[4] || e[5] || "") : n && X.test(n) && (t = p(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))), e.slice(0, 3));
                            },
                        },
                        filter: {
                            TAG: function (e) {
                                var t = e.replace(ie, c).toLowerCase();
                                return "*" === e
                                    ? function () {
                                          return !0;
                                      }
                                    : function (e) {
                                          return e.nodeName && e.nodeName.toLowerCase() === t;
                                      };
                            },
                            CLASS: function (e) {
                                var t = k[e + " "];
                                return (
                                    t ||
                                    ((t = new RegExp("(^|" + R + ")" + e + "(" + R + "|$)")) &&
                                        k(e, function (e) {
                                            return t.test(("string" == typeof e.className && e.className) || (void 0 !== e.getAttribute && e.getAttribute("class")) || "");
                                        }))
                                );
                            },
                            ATTR: function (n, i, r) {
                                return function (e) {
                                    var t = se.attr(e, n);
                                    return null == t
                                        ? "!=" === i
                                        : !i ||
                                              ((t += ""),
                                              "=" === i
                                                  ? t === r
                                                  : "!=" === i
                                                  ? t !== r
                                                  : "^=" === i
                                                  ? r && 0 === t.indexOf(r)
                                                  : "*=" === i
                                                  ? r && -1 < t.indexOf(r)
                                                  : "$=" === i
                                                  ? r && t.slice(-r.length) === r
                                                  : "~=" === i
                                                  ? -1 < (" " + t.replace(V, " ") + " ").indexOf(r)
                                                  : "|=" === i && (t === r || t.slice(0, r.length + 1) === r + "-"));
                                };
                            },
                            CHILD: function (p, e, t, g, m) {
                                var v = "nth" !== p.slice(0, 3),
                                    y = "last" !== p.slice(-4),
                                    b = "of-type" === e;
                                return 1 === g && 0 === m
                                    ? function (e) {
                                          return !!e.parentNode;
                                      }
                                    : function (e, t, n) {
                                          var i,
                                              r,
                                              o,
                                              a,
                                              s,
                                              l,
                                              u = v != y ? "nextSibling" : "previousSibling",
                                              f = e.parentNode,
                                              c = b && e.nodeName.toLowerCase(),
                                              d = !n && !b,
                                              h = !1;
                                          if (f) {
                                              if (v) {
                                                  for (; u; ) {
                                                      for (a = e; (a = a[u]); ) if (b ? a.nodeName.toLowerCase() === c : 1 === a.nodeType) return !1;
                                                      l = u = "only" === p && !l && "nextSibling";
                                                  }
                                                  return !0;
                                              }
                                              if (((l = [y ? f.firstChild : f.lastChild]), y && d)) {
                                                  for (
                                                      h = (s = (i = (r = (o = (a = f)[C] || (a[C] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[p] || [])[0] === S && i[1]) && i[2], a = s && f.childNodes[s];
                                                      (a = (++s && a && a[u]) || (h = s = 0) || l.pop());

                                                  )
                                                      if (1 === a.nodeType && ++h && a === e) {
                                                          r[p] = [S, s, h];
                                                          break;
                                                      }
                                              } else if ((d && (h = s = (i = (r = (o = (a = e)[C] || (a[C] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[p] || [])[0] === S && i[1]), !1 === h))
                                                  for (
                                                      ;
                                                      (a = (++s && a && a[u]) || (h = s = 0) || l.pop()) &&
                                                      ((b ? a.nodeName.toLowerCase() !== c : 1 !== a.nodeType) || !++h || (d && ((r = (o = a[C] || (a[C] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[p] = [S, h]), a !== e));

                                                  );
                                              return (h -= m) === g || (h % g == 0 && 0 <= h / g);
                                          }
                                      };
                            },
                            PSEUDO: function (e, o) {
                                var t,
                                    a = _.pseudos[e] || _.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                                return a[C]
                                    ? a(o)
                                    : 1 < a.length
                                    ? ((t = [e, e, "", o]),
                                      _.setFilters.hasOwnProperty(e.toLowerCase())
                                          ? ue(function (e, t) {
                                                for (var n, i = a(e, o), r = i.length; r--; ) e[(n = q(e, i[r]))] = !(t[n] = i[r]);
                                            })
                                          : function (e) {
                                                return a(e, 0, t);
                                            })
                                    : a;
                            },
                        },
                        pseudos: {
                            not: ue(function (e) {
                                var i = [],
                                    r = [],
                                    s = d(e.replace($, "$1"));
                                return s[C]
                                    ? ue(function (e, t, n, i) {
                                          for (var r, o = s(e, null, i, []), a = e.length; a--; ) (r = o[a]) && (e[a] = !(t[a] = r));
                                      })
                                    : function (e, t, n) {
                                          return (i[0] = e), s(i, null, n, r), (i[0] = null), !r.pop();
                                      };
                            }),
                            has: ue(function (t) {
                                return function (e) {
                                    return 0 < se(t, e).length;
                                };
                            }),
                            contains: ue(function (t) {
                                return (
                                    (t = t.replace(ie, c)),
                                    function (e) {
                                        return -1 < (e.textContent || o(e)).indexOf(t);
                                    }
                                );
                            }),
                            lang: ue(function (n) {
                                return (
                                    Y.test(n || "") || se.error("unsupported lang: " + n),
                                    (n = n.replace(ie, c).toLowerCase()),
                                    function (e) {
                                        var t;
                                        do {
                                            if ((t = T ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
                                        } while ((e = e.parentNode) && 1 === e.nodeType);
                                        return !1;
                                    }
                                );
                            }),
                            target: function (e) {
                                var t = n.location && n.location.hash;
                                return t && t.slice(1) === e.id;
                            },
                            root: function (e) {
                                return e === s;
                            },
                            focus: function (e) {
                                return e === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                            },
                            enabled: ge(!1),
                            disabled: ge(!0),
                            checked: function (e) {
                                var t = e.nodeName.toLowerCase();
                                return ("input" === t && !!e.checked) || ("option" === t && !!e.selected);
                            },
                            selected: function (e) {
                                return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                            },
                            empty: function (e) {
                                for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                                return !0;
                            },
                            parent: function (e) {
                                return !_.pseudos.empty(e);
                            },
                            header: function (e) {
                                return Z.test(e.nodeName);
                            },
                            input: function (e) {
                                return J.test(e.nodeName);
                            },
                            button: function (e) {
                                var t = e.nodeName.toLowerCase();
                                return ("input" === t && "button" === e.type) || "button" === t;
                            },
                            text: function (e) {
                                var t;
                                return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                            },
                            first: me(function () {
                                return [0];
                            }),
                            last: me(function (e, t) {
                                return [t - 1];
                            }),
                            eq: me(function (e, t, n) {
                                return [n < 0 ? n + t : n];
                            }),
                            even: me(function (e, t) {
                                for (var n = 0; n < t; n += 2) e.push(n);
                                return e;
                            }),
                            odd: me(function (e, t) {
                                for (var n = 1; n < t; n += 2) e.push(n);
                                return e;
                            }),
                            lt: me(function (e, t, n) {
                                for (var i = n < 0 ? n + t : t < n ? t : n; 0 <= --i; ) e.push(i);
                                return e;
                            }),
                            gt: me(function (e, t, n) {
                                for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                                return e;
                            }),
                        },
                    }).pseudos.nth = _.pseudos.eq),
                    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
                        _.pseudos[e] = he(e);
                    for (e in { submit: !0, reset: !0 }) _.pseudos[e] = pe(e);
                    function ye() {}
                    function be(e) {
                        for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
                        return i;
                    }
                    function _e(s, e, t) {
                        var l = e.dir,
                            u = e.next,
                            f = u || l,
                            c = t && "parentNode" === f,
                            d = i++;
                        return e.first
                            ? function (e, t, n) {
                                  for (; (e = e[l]); ) if (1 === e.nodeType || c) return s(e, t, n);
                                  return !1;
                              }
                            : function (e, t, n) {
                                  var i,
                                      r,
                                      o,
                                      a = [S, d];
                                  if (n) {
                                      for (; (e = e[l]); ) if ((1 === e.nodeType || c) && s(e, t, n)) return !0;
                                  } else
                                      for (; (e = e[l]); )
                                          if (1 === e.nodeType || c)
                                              if (((r = (o = e[C] || (e[C] = {}))[e.uniqueID] || (o[e.uniqueID] = {})), u && u === e.nodeName.toLowerCase())) e = e[l] || e;
                                              else {
                                                  if ((i = r[f]) && i[0] === S && i[1] === d) return (a[2] = i[2]);
                                                  if (((r[f] = a)[2] = s(e, t, n))) return !0;
                                              }
                                  return !1;
                              };
                    }
                    function we(r) {
                        return 1 < r.length
                            ? function (e, t, n) {
                                  for (var i = r.length; i--; ) if (!r[i](e, t, n)) return !1;
                                  return !0;
                              }
                            : r[0];
                    }
                    function xe(e, t, n, i, r) {
                        for (var o, a = [], s = 0, l = e.length, u = null != t; s < l; s++) (o = e[s]) && ((n && !n(o, i, r)) || (a.push(o), u && t.push(s)));
                        return a;
                    }
                    function Ee(h, p, g, m, v, e) {
                        return (
                            m && !m[C] && (m = Ee(m)),
                            v && !v[C] && (v = Ee(v, e)),
                            ue(function (e, t, n, i) {
                                var r,
                                    o,
                                    a,
                                    s = [],
                                    l = [],
                                    u = t.length,
                                    f =
                                        e ||
                                        (function (e, t, n) {
                                            for (var i = 0, r = t.length; i < r; i++) se(e, t[i], n);
                                            return n;
                                        })(p || "*", n.nodeType ? [n] : n, []),
                                    c = !h || (!e && p) ? f : xe(f, s, h, n, i),
                                    d = g ? (v || (e ? h : u || m) ? [] : t) : c;
                                if ((g && g(c, d, n, i), m)) for (r = xe(d, l), m(r, [], n, i), o = r.length; o--; ) (a = r[o]) && (d[l[o]] = !(c[l[o]] = a));
                                if (e) {
                                    if (v || h) {
                                        if (v) {
                                            for (r = [], o = d.length; o--; ) (a = d[o]) && r.push((c[o] = a));
                                            v(null, (d = []), r, i);
                                        }
                                        for (o = d.length; o--; ) (a = d[o]) && -1 < (r = v ? q(e, a) : s[o]) && (e[r] = !(t[r] = a));
                                    }
                                } else (d = xe(d === t ? d.splice(u, d.length) : d)), v ? v(null, t, d, i) : I.apply(t, d);
                            })
                        );
                    }
                    function Te(e) {
                        for (
                            var r,
                                t,
                                n,
                                i = e.length,
                                o = _.relative[e[0].type],
                                a = o || _.relative[" "],
                                s = o ? 1 : 0,
                                l = _e(
                                    function (e) {
                                        return e === r;
                                    },
                                    a,
                                    !0
                                ),
                                u = _e(
                                    function (e) {
                                        return -1 < q(r, e);
                                    },
                                    a,
                                    !0
                                ),
                                f = [
                                    function (e, t, n) {
                                        var i = (!o && (n || t !== w)) || ((r = t).nodeType ? l(e, t, n) : u(e, t, n));
                                        return (r = null), i;
                                    },
                                ];
                            s < i;
                            s++
                        )
                            if ((t = _.relative[e[s].type])) f = [_e(we(f), t)];
                            else {
                                if ((t = _.filter[e[s].type].apply(null, e[s].matches))[C]) {
                                    for (n = ++s; n < i && !_.relative[e[n].type]; n++);
                                    return Ee(
                                        1 < s && we(f),
                                        1 < s && be(e.slice(0, s - 1).concat({ value: " " === e[s - 2].type ? "*" : "" })).replace($, "$1"),
                                        t,
                                        s < n && Te(e.slice(s, n)),
                                        n < i && Te((e = e.slice(n))),
                                        n < i && be(e)
                                    );
                                }
                                f.push(t);
                            }
                        return we(f);
                    }
                    function Ce(m, v) {
                        function e(e, t, n, i, r) {
                            var o,
                                a,
                                s,
                                l = 0,
                                u = "0",
                                f = e && [],
                                c = [],
                                d = w,
                                h = e || (b && _.find.TAG("*", r)),
                                p = (S += null == d ? 1 : Math.random() || 0.1),
                                g = h.length;
                            for (r && (w = t == E || t || r); u !== g && null != (o = h[u]); u++) {
                                if (b && o) {
                                    for (a = 0, t || o.ownerDocument == E || (x(o), (n = !T)); (s = m[a++]); )
                                        if (s(o, t || E, n)) {
                                            i.push(o);
                                            break;
                                        }
                                    r && (S = p);
                                }
                                y && ((o = !s && o) && l--, e && f.push(o));
                            }
                            if (((l += u), y && u !== l)) {
                                for (a = 0; (s = v[a++]); ) s(f, c, t, n);
                                if (e) {
                                    if (0 < l) for (; u--; ) f[u] || c[u] || (c[u] = L.call(i));
                                    c = xe(c);
                                }
                                I.apply(i, c), r && !e && 0 < c.length && 1 < l + v.length && se.uniqueSort(i);
                            }
                            return r && ((S = p), (w = d)), f;
                        }
                        var y = 0 < v.length,
                            b = 0 < m.length;
                        return y ? ue(e) : e;
                    }
                    return (
                        (ye.prototype = _.filters = _.pseudos),
                        (_.setFilters = new ye()),
                        (p = se.tokenize = function (e, t) {
                            var n,
                                i,
                                r,
                                o,
                                a,
                                s,
                                l,
                                u = A[e + " "];
                            if (u) return t ? 0 : u.slice(0);
                            for (a = e, s = [], l = _.preFilter; a; ) {
                                for (o in ((n && !(i = U.exec(a))) || (i && (a = a.slice(i[0].length) || a), s.push((r = []))),
                                (n = !1),
                                (i = z.exec(a)) && ((n = i.shift()), r.push({ value: n, type: i[0].replace($, " ") }), (a = a.slice(n.length))),
                                _.filter))
                                    !(i = K[o].exec(a)) || (l[o] && !(i = l[o](i))) || ((n = i.shift()), r.push({ value: n, type: o, matches: i }), (a = a.slice(n.length)));
                                if (!n) break;
                            }
                            return t ? a.length : a ? se.error(e) : A(e, s).slice(0);
                        }),
                        (d = se.compile = function (e, t) {
                            var n,
                                i = [],
                                r = [],
                                o = D[e + " "];
                            if (!o) {
                                for (n = (t = t || p(e)).length; n--; ) (o = Te(t[n]))[C] ? i.push(o) : r.push(o);
                                (o = D(e, Ce(r, i))).selector = e;
                            }
                            return o;
                        }),
                        (g = se.select = function (e, t, n, i) {
                            var r,
                                o,
                                a,
                                s,
                                l,
                                u = "function" == typeof e && e,
                                f = !i && p((e = u.selector || e));
                            if (((n = n || []), 1 === f.length)) {
                                if (2 < (o = f[0] = f[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && T && _.relative[o[1].type]) {
                                    if (!(t = (_.find.ID(a.matches[0].replace(ie, c), t) || [])[0])) return n;
                                    u && (t = t.parentNode), (e = e.slice(o.shift().value.length));
                                }
                                for (r = K.needsContext.test(e) ? 0 : o.length; r-- && ((a = o[r]), !_.relative[(s = a.type)]); )
                                    if ((l = _.find[s]) && (i = l(a.matches[0].replace(ie, c), (ne.test(o[0].type) && ve(t.parentNode)) || t))) {
                                        if ((o.splice(r, 1), !(e = i.length && be(o)))) return I.apply(n, i), n;
                                        break;
                                    }
                            }
                            return (u || d(e, f))(i, t, !T, n, !t || (ne.test(e) && ve(t.parentNode)) || t), n;
                        }),
                        (h.sortStable = C.split("").sort(j).join("") === C),
                        (h.detectDuplicates = !!u),
                        x(),
                        (h.sortDetached = fe(function (e) {
                            return 1 & e.compareDocumentPosition(E.createElement("fieldset"));
                        })),
                        fe(function (e) {
                            return (e.innerHTML = "<a href='#'></a>"), "#" === e.firstChild.getAttribute("href");
                        }) ||
                            ce("type|href|height|width", function (e, t, n) {
                                if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                            }),
                        (h.attributes &&
                            fe(function (e) {
                                return (e.innerHTML = "<input/>"), e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
                            })) ||
                            ce("value", function (e, t, n) {
                                if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
                            }),
                        fe(function (e) {
                            return null == e.getAttribute("disabled");
                        }) ||
                            ce(H, function (e, t, n) {
                                var i;
                                if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
                            }),
                        se
                    );
                })(E);
                (C.find = d), (C.expr = d.selectors), (C.expr[":"] = C.expr.pseudos), (C.uniqueSort = C.unique = d.uniqueSort), (C.text = d.getText), (C.isXMLDoc = d.isXML), (C.contains = d.contains), (C.escapeSelector = d.escape);
                function h(e, t, n) {
                    for (var i = [], r = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                        if (1 === e.nodeType) {
                            if (r && C(e).is(n)) break;
                            i.push(e);
                        }
                    return i;
                }
                function p(e, t) {
                    for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                    return n;
                }
                var x = C.expr.match.needsContext;
                function S(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
                }
                var k = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
                function A(e, n, i) {
                    return b(n)
                        ? C.grep(e, function (e, t) {
                              return !!n.call(e, t, e) !== i;
                          })
                        : n.nodeType
                        ? C.grep(e, function (e) {
                              return (e === n) !== i;
                          })
                        : "string" != typeof n
                        ? C.grep(e, function (e) {
                              return -1 < r.call(n, e) !== i;
                          })
                        : C.filter(n, e, i);
                }
                (C.filter = function (e, t, n) {
                    var i = t[0];
                    return (
                        n && (e = ":not(" + e + ")"),
                        1 === t.length && 1 === i.nodeType
                            ? C.find.matchesSelector(i, e)
                                ? [i]
                                : []
                            : C.find.matches(
                                  e,
                                  C.grep(t, function (e) {
                                      return 1 === e.nodeType;
                                  })
                              )
                    );
                }),
                    C.fn.extend({
                        find: function (e) {
                            var t,
                                n,
                                i = this.length,
                                r = this;
                            if ("string" != typeof e)
                                return this.pushStack(
                                    C(e).filter(function () {
                                        for (t = 0; t < i; t++) if (C.contains(r[t], this)) return !0;
                                    })
                                );
                            for (n = this.pushStack([]), t = 0; t < i; t++) C.find(e, r[t], n);
                            return 1 < i ? C.uniqueSort(n) : n;
                        },
                        filter: function (e) {
                            return this.pushStack(A(this, e || [], !1));
                        },
                        not: function (e) {
                            return this.pushStack(A(this, e || [], !0));
                        },
                        is: function (e) {
                            return !!A(this, "string" == typeof e && x.test(e) ? C(e) : e || [], !1).length;
                        },
                    });
                var D,
                    N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
                ((C.fn.init = function (e, t, n) {
                    var i, r;
                    if (!e) return this;
                    if (((n = n || D), "string" != typeof e)) return e.nodeType ? ((this[0] = e), (this.length = 1), this) : b(e) ? (void 0 !== n.ready ? n.ready(e) : e(C)) : C.makeArray(e, this);
                    if (!(i = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : N.exec(e)) || (!i[1] && t)) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                    if (i[1]) {
                        if (((t = t instanceof C ? t[0] : t), C.merge(this, C.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : T, !0)), k.test(i[1]) && C.isPlainObject(t)))
                            for (i in t) b(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                        return this;
                    }
                    return (r = T.getElementById(i[2])) && ((this[0] = r), (this.length = 1)), this;
                }).prototype = C.fn),
                    (D = C(T));
                var j = /^(?:parents|prev(?:Until|All))/,
                    O = { children: !0, contents: !0, next: !0, prev: !0 };
                function L(e, t) {
                    for (; (e = e[t]) && 1 !== e.nodeType; );
                    return e;
                }
                C.fn.extend({
                    has: function (e) {
                        var t = C(e, this),
                            n = t.length;
                        return this.filter(function () {
                            for (var e = 0; e < n; e++) if (C.contains(this, t[e])) return !0;
                        });
                    },
                    closest: function (e, t) {
                        var n,
                            i = 0,
                            r = this.length,
                            o = [],
                            a = "string" != typeof e && C(e);
                        if (!x.test(e))
                            for (; i < r; i++)
                                for (n = this[i]; n && n !== t; n = n.parentNode)
                                    if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && C.find.matchesSelector(n, e))) {
                                        o.push(n);
                                        break;
                                    }
                        return this.pushStack(1 < o.length ? C.uniqueSort(o) : o);
                    },
                    index: function (e) {
                        return e ? ("string" == typeof e ? r.call(C(e), this[0]) : r.call(this, e.jquery ? e[0] : e)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                    },
                    add: function (e, t) {
                        return this.pushStack(C.uniqueSort(C.merge(this.get(), C(e, t))));
                    },
                    addBack: function (e) {
                        return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
                    },
                }),
                    C.each(
                        {
                            parent: function (e) {
                                var t = e.parentNode;
                                return t && 11 !== t.nodeType ? t : null;
                            },
                            parents: function (e) {
                                return h(e, "parentNode");
                            },
                            parentsUntil: function (e, t, n) {
                                return h(e, "parentNode", n);
                            },
                            next: function (e) {
                                return L(e, "nextSibling");
                            },
                            prev: function (e) {
                                return L(e, "previousSibling");
                            },
                            nextAll: function (e) {
                                return h(e, "nextSibling");
                            },
                            prevAll: function (e) {
                                return h(e, "previousSibling");
                            },
                            nextUntil: function (e, t, n) {
                                return h(e, "nextSibling", n);
                            },
                            prevUntil: function (e, t, n) {
                                return h(e, "previousSibling", n);
                            },
                            siblings: function (e) {
                                return p((e.parentNode || {}).firstChild, e);
                            },
                            children: function (e) {
                                return p(e.firstChild);
                            },
                            contents: function (e) {
                                return null != e.contentDocument && i(e.contentDocument) ? e.contentDocument : (S(e, "template") && (e = e.content || e), C.merge([], e.childNodes));
                            },
                        },
                        function (i, r) {
                            C.fn[i] = function (e, t) {
                                var n = C.map(this, r, e);
                                return "Until" !== i.slice(-5) && (t = e), t && "string" == typeof t && (n = C.filter(t, n)), 1 < this.length && (O[i] || C.uniqueSort(n), j.test(i) && n.reverse()), this.pushStack(n);
                            };
                        }
                    );
                var P = /[^\x20\t\r\n\f]+/g;
                function I(e) {
                    return e;
                }
                function F(e) {
                    throw e;
                }
                function q(e, t, n, i) {
                    var r;
                    try {
                        e && b((r = e.promise)) ? r.call(e).done(t).fail(n) : e && b((r = e.then)) ? r.call(e, t, n) : t.apply(void 0, [e].slice(i));
                    } catch (e) {
                        n.apply(void 0, [e]);
                    }
                }
                (C.Callbacks = function (i) {
                    var e, n;
                    i =
                        "string" == typeof i
                            ? ((e = i),
                              (n = {}),
                              C.each(e.match(P) || [], function (e, t) {
                                  n[t] = !0;
                              }),
                              n)
                            : C.extend({}, i);
                    function r() {
                        for (s = s || i.once, a = o = !0; u.length; f = -1) for (t = u.shift(); ++f < l.length; ) !1 === l[f].apply(t[0], t[1]) && i.stopOnFalse && ((f = l.length), (t = !1));
                        i.memory || (t = !1), (o = !1), s && (l = t ? [] : "");
                    }
                    var o,
                        t,
                        a,
                        s,
                        l = [],
                        u = [],
                        f = -1,
                        c = {
                            add: function () {
                                return (
                                    l &&
                                        (t && !o && ((f = l.length - 1), u.push(t)),
                                        (function n(e) {
                                            C.each(e, function (e, t) {
                                                b(t) ? (i.unique && c.has(t)) || l.push(t) : t && t.length && "string" !== w(t) && n(t);
                                            });
                                        })(arguments),
                                        t && !o && r()),
                                    this
                                );
                            },
                            remove: function () {
                                return (
                                    C.each(arguments, function (e, t) {
                                        for (var n; -1 < (n = C.inArray(t, l, n)); ) l.splice(n, 1), n <= f && f--;
                                    }),
                                    this
                                );
                            },
                            has: function (e) {
                                return e ? -1 < C.inArray(e, l) : 0 < l.length;
                            },
                            empty: function () {
                                return (l = l && []), this;
                            },
                            disable: function () {
                                return (s = u = []), (l = t = ""), this;
                            },
                            disabled: function () {
                                return !l;
                            },
                            lock: function () {
                                return (s = u = []), t || o || (l = t = ""), this;
                            },
                            locked: function () {
                                return !!s;
                            },
                            fireWith: function (e, t) {
                                return s || ((t = [e, (t = t || []).slice ? t.slice() : t]), u.push(t), o || r()), this;
                            },
                            fire: function () {
                                return c.fireWith(this, arguments), this;
                            },
                            fired: function () {
                                return !!a;
                            },
                        };
                    return c;
                }),
                    C.extend({
                        Deferred: function (e) {
                            var o = [
                                    ["notify", "progress", C.Callbacks("memory"), C.Callbacks("memory"), 2],
                                    ["resolve", "done", C.Callbacks("once memory"), C.Callbacks("once memory"), 0, "resolved"],
                                    ["reject", "fail", C.Callbacks("once memory"), C.Callbacks("once memory"), 1, "rejected"],
                                ],
                                r = "pending",
                                a = {
                                    state: function () {
                                        return r;
                                    },
                                    always: function () {
                                        return s.done(arguments).fail(arguments), this;
                                    },
                                    catch: function (e) {
                                        return a.then(null, e);
                                    },
                                    pipe: function () {
                                        var r = arguments;
                                        return C.Deferred(function (i) {
                                            C.each(o, function (e, t) {
                                                var n = b(r[t[4]]) && r[t[4]];
                                                s[t[1]](function () {
                                                    var e = n && n.apply(this, arguments);
                                                    e && b(e.promise) ? e.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[t[0] + "With"](this, n ? [e] : arguments);
                                                });
                                            }),
                                                (r = null);
                                        }).promise();
                                    },
                                    then: function (t, n, i) {
                                        var l = 0;
                                        function u(r, o, a, s) {
                                            return function () {
                                                function e() {
                                                    var e, t;
                                                    if (!(r < l)) {
                                                        if ((e = a.apply(n, i)) === o.promise()) throw new TypeError("Thenable self-resolution");
                                                        (t = e && ("object" == typeof e || "function" == typeof e) && e.then),
                                                            b(t)
                                                                ? s
                                                                    ? t.call(e, u(l, o, I, s), u(l, o, F, s))
                                                                    : (l++, t.call(e, u(l, o, I, s), u(l, o, F, s), u(l, o, I, o.notifyWith)))
                                                                : (a !== I && ((n = void 0), (i = [e])), (s || o.resolveWith)(n, i));
                                                    }
                                                }
                                                var n = this,
                                                    i = arguments,
                                                    t = s
                                                        ? e
                                                        : function () {
                                                              try {
                                                                  e();
                                                              } catch (e) {
                                                                  C.Deferred.exceptionHook && C.Deferred.exceptionHook(e, t.stackTrace), l <= r + 1 && (a !== F && ((n = void 0), (i = [e])), o.rejectWith(n, i));
                                                              }
                                                          };
                                                r ? t() : (C.Deferred.getStackHook && (t.stackTrace = C.Deferred.getStackHook()), E.setTimeout(t));
                                            };
                                        }
                                        return C.Deferred(function (e) {
                                            o[0][3].add(u(0, e, b(i) ? i : I, e.notifyWith)), o[1][3].add(u(0, e, b(t) ? t : I)), o[2][3].add(u(0, e, b(n) ? n : F));
                                        }).promise();
                                    },
                                    promise: function (e) {
                                        return null != e ? C.extend(e, a) : a;
                                    },
                                },
                                s = {};
                            return (
                                C.each(o, function (e, t) {
                                    var n = t[2],
                                        i = t[5];
                                    (a[t[1]] = n.add),
                                        i &&
                                            n.add(
                                                function () {
                                                    r = i;
                                                },
                                                o[3 - e][2].disable,
                                                o[3 - e][3].disable,
                                                o[0][2].lock,
                                                o[0][3].lock
                                            ),
                                        n.add(t[3].fire),
                                        (s[t[0]] = function () {
                                            return s[t[0] + "With"](this === s ? void 0 : this, arguments), this;
                                        }),
                                        (s[t[0] + "With"] = n.fireWith);
                                }),
                                a.promise(s),
                                e && e.call(s, s),
                                s
                            );
                        },
                        when: function (e) {
                            function t(t) {
                                return function (e) {
                                    (r[t] = this), (o[t] = 1 < arguments.length ? s.call(arguments) : e), --n || a.resolveWith(r, o);
                                };
                            }
                            var n = arguments.length,
                                i = n,
                                r = Array(i),
                                o = s.call(arguments),
                                a = C.Deferred();
                            if (n <= 1 && (q(e, a.done(t(i)).resolve, a.reject, !n), "pending" === a.state() || b(o[i] && o[i].then))) return a.then();
                            for (; i--; ) q(o[i], t(i), a.reject);
                            return a.promise();
                        },
                    });
                var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                (C.Deferred.exceptionHook = function (e, t) {
                    E.console && E.console.warn && e && H.test(e.name) && E.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
                }),
                    (C.readyException = function (e) {
                        E.setTimeout(function () {
                            throw e;
                        });
                    });
                var R = C.Deferred();
                function M() {
                    T.removeEventListener("DOMContentLoaded", M), E.removeEventListener("load", M), C.ready();
                }
                (C.fn.ready = function (e) {
                    return (
                        R.then(e).catch(function (e) {
                            C.readyException(e);
                        }),
                        this
                    );
                }),
                    C.extend({
                        isReady: !1,
                        readyWait: 1,
                        ready: function (e) {
                            (!0 === e ? --C.readyWait : C.isReady) || ((C.isReady = !0) !== e && 0 < --C.readyWait) || R.resolveWith(T, [C]);
                        },
                    }),
                    (C.ready.then = R.then),
                    "complete" === T.readyState || ("loading" !== T.readyState && !T.documentElement.doScroll) ? E.setTimeout(C.ready) : (T.addEventListener("DOMContentLoaded", M), E.addEventListener("load", M));
                var B = function (e, t, n, i, r, o, a) {
                        var s = 0,
                            l = e.length,
                            u = null == n;
                        if ("object" === w(n)) for (s in ((r = !0), n)) B(e, t, s, n[s], !0, o, a);
                        else if (
                            void 0 !== i &&
                            ((r = !0),
                            b(i) || (a = !0),
                            u &&
                                (t = a
                                    ? (t.call(e, i), null)
                                    : ((u = t),
                                      function (e, t, n) {
                                          return u.call(C(e), n);
                                      })),
                            t)
                        )
                            for (; s < l; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
                        return r ? e : u ? t.call(e) : l ? t(e[0], n) : o;
                    },
                    W = /^-ms-/,
                    V = /-([a-z])/g;
                function $(e, t) {
                    return t.toUpperCase();
                }
                function U(e) {
                    return e.replace(W, "ms-").replace(V, $);
                }
                function z(e) {
                    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
                }
                function Q() {
                    this.expando = C.expando + Q.uid++;
                }
                (Q.uid = 1),
                    (Q.prototype = {
                        cache: function (e) {
                            var t = e[this.expando];
                            return t || ((t = {}), z(e) && (e.nodeType ? (e[this.expando] = t) : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))), t;
                        },
                        set: function (e, t, n) {
                            var i,
                                r = this.cache(e);
                            if ("string" == typeof t) r[U(t)] = n;
                            else for (i in t) r[U(i)] = t[i];
                            return r;
                        },
                        get: function (e, t) {
                            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][U(t)];
                        },
                        access: function (e, t, n) {
                            return void 0 === t || (t && "string" == typeof t && void 0 === n) ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
                        },
                        remove: function (e, t) {
                            var n,
                                i = e[this.expando];
                            if (void 0 !== i) {
                                if (void 0 !== t) {
                                    n = (t = Array.isArray(t) ? t.map(U) : (t = U(t)) in i ? [t] : t.match(P) || []).length;
                                    for (; n--; ) delete i[t[n]];
                                }
                                (void 0 !== t && !C.isEmptyObject(i)) || (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
                            }
                        },
                        hasData: function (e) {
                            var t = e[this.expando];
                            return void 0 !== t && !C.isEmptyObject(t);
                        },
                    });
                var X = new Q(),
                    Y = new Q(),
                    K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                    G = /[A-Z]/g;
                function J(e, t, n) {
                    var i, r;
                    if (void 0 === n && 1 === e.nodeType)
                        if (((i = "data-" + t.replace(G, "-$&").toLowerCase()), "string" == typeof (n = e.getAttribute(i)))) {
                            try {
                                n = "true" === (r = n) || ("false" !== r && ("null" === r ? null : r === +r + "" ? +r : K.test(r) ? JSON.parse(r) : r));
                            } catch (e) {}
                            Y.set(e, t, n);
                        } else n = void 0;
                    return n;
                }
                C.extend({
                    hasData: function (e) {
                        return Y.hasData(e) || X.hasData(e);
                    },
                    data: function (e, t, n) {
                        return Y.access(e, t, n);
                    },
                    removeData: function (e, t) {
                        Y.remove(e, t);
                    },
                    _data: function (e, t, n) {
                        return X.access(e, t, n);
                    },
                    _removeData: function (e, t) {
                        X.remove(e, t);
                    },
                }),
                    C.fn.extend({
                        data: function (n, e) {
                            var t,
                                i,
                                r,
                                o = this[0],
                                a = o && o.attributes;
                            if (void 0 !== n)
                                return "object" == typeof n
                                    ? this.each(function () {
                                          Y.set(this, n);
                                      })
                                    : B(
                                          this,
                                          function (e) {
                                              var t;
                                              if (o && void 0 === e) return void 0 !== (t = Y.get(o, n)) ? t : void 0 !== (t = J(o, n)) ? t : void 0;
                                              this.each(function () {
                                                  Y.set(this, n, e);
                                              });
                                          },
                                          null,
                                          e,
                                          1 < arguments.length,
                                          null,
                                          !0
                                      );
                            if (this.length && ((r = Y.get(o)), 1 === o.nodeType && !X.get(o, "hasDataAttrs"))) {
                                for (t = a.length; t--; ) a[t] && 0 === (i = a[t].name).indexOf("data-") && ((i = U(i.slice(5))), J(o, i, r[i]));
                                X.set(o, "hasDataAttrs", !0);
                            }
                            return r;
                        },
                        removeData: function (e) {
                            return this.each(function () {
                                Y.remove(this, e);
                            });
                        },
                    }),
                    C.extend({
                        queue: function (e, t, n) {
                            var i;
                            if (e) return (t = (t || "fx") + "queue"), (i = X.get(e, t)), n && (!i || Array.isArray(n) ? (i = X.access(e, t, C.makeArray(n))) : i.push(n)), i || [];
                        },
                        dequeue: function (e, t) {
                            t = t || "fx";
                            var n = C.queue(e, t),
                                i = n.length,
                                r = n.shift(),
                                o = C._queueHooks(e, t);
                            "inprogress" === r && ((r = n.shift()), i--),
                                r &&
                                    ("fx" === t && n.unshift("inprogress"),
                                    delete o.stop,
                                    r.call(
                                        e,
                                        function () {
                                            C.dequeue(e, t);
                                        },
                                        o
                                    )),
                                !i && o && o.empty.fire();
                        },
                        _queueHooks: function (e, t) {
                            var n = t + "queueHooks";
                            return (
                                X.get(e, n) ||
                                X.access(e, n, {
                                    empty: C.Callbacks("once memory").add(function () {
                                        X.remove(e, [t + "queue", n]);
                                    }),
                                })
                            );
                        },
                    }),
                    C.fn.extend({
                        queue: function (t, n) {
                            var e = 2;
                            return (
                                "string" != typeof t && ((n = t), (t = "fx"), e--),
                                arguments.length < e
                                    ? C.queue(this[0], t)
                                    : void 0 === n
                                    ? this
                                    : this.each(function () {
                                          var e = C.queue(this, t, n);
                                          C._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && C.dequeue(this, t);
                                      })
                            );
                        },
                        dequeue: function (e) {
                            return this.each(function () {
                                C.dequeue(this, e);
                            });
                        },
                        clearQueue: function (e) {
                            return this.queue(e || "fx", []);
                        },
                        promise: function (e, t) {
                            function n() {
                                --r || o.resolveWith(a, [a]);
                            }
                            var i,
                                r = 1,
                                o = C.Deferred(),
                                a = this,
                                s = this.length;
                            for ("string" != typeof e && ((t = e), (e = void 0)), e = e || "fx"; s--; ) (i = X.get(a[s], e + "queueHooks")) && i.empty && (r++, i.empty.add(n));
                            return n(), o.promise(t);
                        },
                    });
                var Z = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                    ee = new RegExp("^(?:([+-])=|)(" + Z + ")([a-z%]*)$", "i"),
                    te = ["Top", "Right", "Bottom", "Left"],
                    ne = T.documentElement,
                    ie = function (e) {
                        return C.contains(e.ownerDocument, e);
                    },
                    re = { composed: !0 };
                ne.getRootNode &&
                    (ie = function (e) {
                        return C.contains(e.ownerDocument, e) || e.getRootNode(re) === e.ownerDocument;
                    });
                var oe = function (e, t) {
                    return "none" === (e = t || e).style.display || ("" === e.style.display && ie(e) && "none" === C.css(e, "display"));
                };
                function ae(e, t, n, i) {
                    var r,
                        o,
                        a = 20,
                        s = i
                            ? function () {
                                  return i.cur();
                              }
                            : function () {
                                  return C.css(e, t, "");
                              },
                        l = s(),
                        u = (n && n[3]) || (C.cssNumber[t] ? "" : "px"),
                        f = e.nodeType && (C.cssNumber[t] || ("px" !== u && +l)) && ee.exec(C.css(e, t));
                    if (f && f[3] !== u) {
                        for (l /= 2, u = u || f[3], f = +l || 1; a--; ) C.style(e, t, f + u), (1 - o) * (1 - (o = s() / l || 0.5)) <= 0 && (a = 0), (f /= o);
                        (f *= 2), C.style(e, t, f + u), (n = n || []);
                    }
                    return n && ((f = +f || +l || 0), (r = n[1] ? f + (n[1] + 1) * n[2] : +n[2]), i && ((i.unit = u), (i.start = f), (i.end = r))), r;
                }
                var se = {};
                function le(e, t) {
                    for (var n, i, r, o, a, s, l, u = [], f = 0, c = e.length; f < c; f++)
                        (i = e[f]).style &&
                            ((n = i.style.display),
                            t
                                ? ("none" === n && ((u[f] = X.get(i, "display") || null), u[f] || (i.style.display = "")),
                                  "" === i.style.display &&
                                      oe(i) &&
                                      (u[f] =
                                          ((l = a = o = void 0),
                                          (a = (r = i).ownerDocument),
                                          (s = r.nodeName),
                                          (l = se[s]) || ((o = a.body.appendChild(a.createElement(s))), (l = C.css(o, "display")), o.parentNode.removeChild(o), "none" === l && (l = "block"), (se[s] = l)))))
                                : "none" !== n && ((u[f] = "none"), X.set(i, "display", n)));
                    for (f = 0; f < c; f++) null != u[f] && (e[f].style.display = u[f]);
                    return e;
                }
                C.fn.extend({
                    show: function () {
                        return le(this, !0);
                    },
                    hide: function () {
                        return le(this);
                    },
                    toggle: function (e) {
                        return "boolean" == typeof e
                            ? e
                                ? this.show()
                                : this.hide()
                            : this.each(function () {
                                  oe(this) ? C(this).show() : C(this).hide();
                              });
                    },
                });
                var ue,
                    fe,
                    ce = /^(?:checkbox|radio)$/i,
                    de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
                    he = /^$|^module$|\/(?:java|ecma)script/i;
                (ue = T.createDocumentFragment().appendChild(T.createElement("div"))),
                    (fe = T.createElement("input")).setAttribute("type", "radio"),
                    fe.setAttribute("checked", "checked"),
                    fe.setAttribute("name", "t"),
                    ue.appendChild(fe),
                    (y.checkClone = ue.cloneNode(!0).cloneNode(!0).lastChild.checked),
                    (ue.innerHTML = "<textarea>x</textarea>"),
                    (y.noCloneChecked = !!ue.cloneNode(!0).lastChild.defaultValue),
                    (ue.innerHTML = "<option></option>"),
                    (y.option = !!ue.lastChild);
                var pe = {
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""],
                };
                function ge(e, t) {
                    var n;
                    return (n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : []), void 0 === t || (t && S(e, t)) ? C.merge([e], n) : n;
                }
                function me(e, t) {
                    for (var n = 0, i = e.length; n < i; n++) X.set(e[n], "globalEval", !t || X.get(t[n], "globalEval"));
                }
                (pe.tbody = pe.tfoot = pe.colgroup = pe.caption = pe.thead), (pe.th = pe.td), y.option || (pe.optgroup = pe.option = [1, "<select multiple='multiple'>", "</select>"]);
                var ve = /<|&#?\w+;/;
                function ye(e, t, n, i, r) {
                    for (var o, a, s, l, u, f, c = t.createDocumentFragment(), d = [], h = 0, p = e.length; h < p; h++)
                        if ((o = e[h]) || 0 === o)
                            if ("object" === w(o)) C.merge(d, o.nodeType ? [o] : o);
                            else if (ve.test(o)) {
                                for (a = a || c.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), l = pe[s] || pe._default, a.innerHTML = l[1] + C.htmlPrefilter(o) + l[2], f = l[0]; f--; ) a = a.lastChild;
                                C.merge(d, a.childNodes), ((a = c.firstChild).textContent = "");
                            } else d.push(t.createTextNode(o));
                    for (c.textContent = "", h = 0; (o = d[h++]); )
                        if (i && -1 < C.inArray(o, i)) r && r.push(o);
                        else if (((u = ie(o)), (a = ge(c.appendChild(o), "script")), u && me(a), n)) for (f = 0; (o = a[f++]); ) he.test(o.type || "") && n.push(o);
                    return c;
                }
                var be = /^key/,
                    _e = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                    we = /^([^.]*)(?:\.(.+)|)/;
                function xe() {
                    return !0;
                }
                function Ee() {
                    return !1;
                }
                function Te(e, t) {
                    return (
                        (e ===
                            (function () {
                                try {
                                    return T.activeElement;
                                } catch (e) {}
                            })()) ==
                        ("focus" === t)
                    );
                }
                function Ce(e, t, n, i, r, o) {
                    var a, s;
                    if ("object" == typeof t) {
                        for (s in ("string" != typeof n && ((i = i || n), (n = void 0)), t)) Ce(e, s, n, i, t[s], o);
                        return e;
                    }
                    if ((null == i && null == r ? ((r = n), (i = n = void 0)) : null == r && ("string" == typeof n ? ((r = i), (i = void 0)) : ((r = i), (i = n), (n = void 0))), !1 === r)) r = Ee;
                    else if (!r) return e;
                    return (
                        1 === o &&
                            ((a = r),
                            ((r = function (e) {
                                return C().off(e), a.apply(this, arguments);
                            }).guid = a.guid || (a.guid = C.guid++))),
                        e.each(function () {
                            C.event.add(this, t, r, i, n);
                        })
                    );
                }
                function Se(e, r, o) {
                    o
                        ? (X.set(e, r, !1),
                          C.event.add(e, r, {
                              namespace: !1,
                              handler: function (e) {
                                  var t,
                                      n,
                                      i = X.get(this, r);
                                  if (1 & e.isTrigger && this[r]) {
                                      if (i.length) (C.event.special[r] || {}).delegateType && e.stopPropagation();
                                      else if (((i = s.call(arguments)), X.set(this, r, i), (t = o(this, r)), this[r](), i !== (n = X.get(this, r)) || t ? X.set(this, r, !1) : (n = {}), i !== n))
                                          return e.stopImmediatePropagation(), e.preventDefault(), n.value;
                                  } else i.length && (X.set(this, r, { value: C.event.trigger(C.extend(i[0], C.Event.prototype), i.slice(1), this) }), e.stopImmediatePropagation());
                              },
                          }))
                        : void 0 === X.get(e, r) && C.event.add(e, r, xe);
                }
                (C.event = {
                    global: {},
                    add: function (t, e, n, i, r) {
                        var o,
                            a,
                            s,
                            l,
                            u,
                            f,
                            c,
                            d,
                            h,
                            p,
                            g,
                            m = X.get(t);
                        if (z(t))
                            for (
                                n.handler && ((n = (o = n).handler), (r = o.selector)),
                                    r && C.find.matchesSelector(ne, r),
                                    n.guid || (n.guid = C.guid++),
                                    (l = m.events) || (l = m.events = Object.create(null)),
                                    (a = m.handle) ||
                                        (a = m.handle = function (e) {
                                            return void 0 !== C && C.event.triggered !== e.type ? C.event.dispatch.apply(t, arguments) : void 0;
                                        }),
                                    u = (e = (e || "").match(P) || [""]).length;
                                u--;

                            )
                                (h = g = (s = we.exec(e[u]) || [])[1]),
                                    (p = (s[2] || "").split(".").sort()),
                                    h &&
                                        ((c = C.event.special[h] || {}),
                                        (h = (r ? c.delegateType : c.bindType) || h),
                                        (c = C.event.special[h] || {}),
                                        (f = C.extend({ type: h, origType: g, data: i, handler: n, guid: n.guid, selector: r, needsContext: r && C.expr.match.needsContext.test(r), namespace: p.join(".") }, o)),
                                        (d = l[h]) || (((d = l[h] = []).delegateCount = 0), (c.setup && !1 !== c.setup.call(t, i, p, a)) || (t.addEventListener && t.addEventListener(h, a))),
                                        c.add && (c.add.call(t, f), f.handler.guid || (f.handler.guid = n.guid)),
                                        r ? d.splice(d.delegateCount++, 0, f) : d.push(f),
                                        (C.event.global[h] = !0));
                    },
                    remove: function (e, t, n, i, r) {
                        var o,
                            a,
                            s,
                            l,
                            u,
                            f,
                            c,
                            d,
                            h,
                            p,
                            g,
                            m = X.hasData(e) && X.get(e);
                        if (m && (l = m.events)) {
                            for (u = (t = (t || "").match(P) || [""]).length; u--; )
                                if (((h = g = (s = we.exec(t[u]) || [])[1]), (p = (s[2] || "").split(".").sort()), h)) {
                                    for (c = C.event.special[h] || {}, d = l[(h = (i ? c.delegateType : c.bindType) || h)] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--; )
                                        (f = d[o]),
                                            (!r && g !== f.origType) ||
                                                (n && n.guid !== f.guid) ||
                                                (s && !s.test(f.namespace)) ||
                                                (i && i !== f.selector && ("**" !== i || !f.selector)) ||
                                                (d.splice(o, 1), f.selector && d.delegateCount--, c.remove && c.remove.call(e, f));
                                    a && !d.length && ((c.teardown && !1 !== c.teardown.call(e, p, m.handle)) || C.removeEvent(e, h, m.handle), delete l[h]);
                                } else for (h in l) C.event.remove(e, h + t[u], n, i, !0);
                            C.isEmptyObject(l) && X.remove(e, "handle events");
                        }
                    },
                    dispatch: function (e) {
                        var t,
                            n,
                            i,
                            r,
                            o,
                            a,
                            s = new Array(arguments.length),
                            l = C.event.fix(e),
                            u = (X.get(this, "events") || Object.create(null))[l.type] || [],
                            f = C.event.special[l.type] || {};
                        for (s[0] = l, t = 1; t < arguments.length; t++) s[t] = arguments[t];
                        if (((l.delegateTarget = this), !f.preDispatch || !1 !== f.preDispatch.call(this, l))) {
                            for (a = C.event.handlers.call(this, l, u), t = 0; (r = a[t++]) && !l.isPropagationStopped(); )
                                for (l.currentTarget = r.elem, n = 0; (o = r.handlers[n++]) && !l.isImmediatePropagationStopped(); )
                                    (l.rnamespace && !1 !== o.namespace && !l.rnamespace.test(o.namespace)) ||
                                        ((l.handleObj = o),
                                        (l.data = o.data),
                                        void 0 !== (i = ((C.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, s)) && !1 === (l.result = i) && (l.preventDefault(), l.stopPropagation()));
                            return f.postDispatch && f.postDispatch.call(this, l), l.result;
                        }
                    },
                    handlers: function (e, t) {
                        var n,
                            i,
                            r,
                            o,
                            a,
                            s = [],
                            l = t.delegateCount,
                            u = e.target;
                        if (l && u.nodeType && !("click" === e.type && 1 <= e.button))
                            for (; u !== this; u = u.parentNode || this)
                                if (1 === u.nodeType && ("click" !== e.type || !0 !== u.disabled)) {
                                    for (o = [], a = {}, n = 0; n < l; n++) void 0 === a[(r = (i = t[n]).selector + " ")] && (a[r] = i.needsContext ? -1 < C(r, this).index(u) : C.find(r, this, null, [u]).length), a[r] && o.push(i);
                                    o.length && s.push({ elem: u, handlers: o });
                                }
                        return (u = this), l < t.length && s.push({ elem: u, handlers: t.slice(l) }), s;
                    },
                    addProp: function (t, e) {
                        Object.defineProperty(C.Event.prototype, t, {
                            enumerable: !0,
                            configurable: !0,
                            get: b(e)
                                ? function () {
                                      if (this.originalEvent) return e(this.originalEvent);
                                  }
                                : function () {
                                      if (this.originalEvent) return this.originalEvent[t];
                                  },
                            set: function (e) {
                                Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e });
                            },
                        });
                    },
                    fix: function (e) {
                        return e[C.expando] ? e : new C.Event(e);
                    },
                    special: {
                        load: { noBubble: !0 },
                        click: {
                            setup: function (e) {
                                var t = this || e;
                                return ce.test(t.type) && t.click && S(t, "input") && Se(t, "click", xe), !1;
                            },
                            trigger: function (e) {
                                var t = this || e;
                                return ce.test(t.type) && t.click && S(t, "input") && Se(t, "click"), !0;
                            },
                            _default: function (e) {
                                var t = e.target;
                                return (ce.test(t.type) && t.click && S(t, "input") && X.get(t, "click")) || S(t, "a");
                            },
                        },
                        beforeunload: {
                            postDispatch: function (e) {
                                void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                            },
                        },
                    },
                }),
                    (C.removeEvent = function (e, t, n) {
                        e.removeEventListener && e.removeEventListener(t, n);
                    }),
                    (C.Event = function (e, t) {
                        if (!(this instanceof C.Event)) return new C.Event(e, t);
                        e && e.type
                            ? ((this.originalEvent = e),
                              (this.type = e.type),
                              (this.isDefaultPrevented = e.defaultPrevented || (void 0 === e.defaultPrevented && !1 === e.returnValue) ? xe : Ee),
                              (this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target),
                              (this.currentTarget = e.currentTarget),
                              (this.relatedTarget = e.relatedTarget))
                            : (this.type = e),
                            t && C.extend(this, t),
                            (this.timeStamp = (e && e.timeStamp) || Date.now()),
                            (this[C.expando] = !0);
                    }),
                    (C.Event.prototype = {
                        constructor: C.Event,
                        isDefaultPrevented: Ee,
                        isPropagationStopped: Ee,
                        isImmediatePropagationStopped: Ee,
                        isSimulated: !1,
                        preventDefault: function () {
                            var e = this.originalEvent;
                            (this.isDefaultPrevented = xe), e && !this.isSimulated && e.preventDefault();
                        },
                        stopPropagation: function () {
                            var e = this.originalEvent;
                            (this.isPropagationStopped = xe), e && !this.isSimulated && e.stopPropagation();
                        },
                        stopImmediatePropagation: function () {
                            var e = this.originalEvent;
                            (this.isImmediatePropagationStopped = xe), e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
                        },
                    }),
                    C.each(
                        {
                            altKey: !0,
                            bubbles: !0,
                            cancelable: !0,
                            changedTouches: !0,
                            ctrlKey: !0,
                            detail: !0,
                            eventPhase: !0,
                            metaKey: !0,
                            pageX: !0,
                            pageY: !0,
                            shiftKey: !0,
                            view: !0,
                            char: !0,
                            code: !0,
                            charCode: !0,
                            key: !0,
                            keyCode: !0,
                            button: !0,
                            buttons: !0,
                            clientX: !0,
                            clientY: !0,
                            offsetX: !0,
                            offsetY: !0,
                            pointerId: !0,
                            pointerType: !0,
                            screenX: !0,
                            screenY: !0,
                            targetTouches: !0,
                            toElement: !0,
                            touches: !0,
                            which: function (e) {
                                var t = e.button;
                                return null == e.which && be.test(e.type) ? (null != e.charCode ? e.charCode : e.keyCode) : !e.which && void 0 !== t && _e.test(e.type) ? (1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0) : e.which;
                            },
                        },
                        C.event.addProp
                    ),
                    C.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
                        C.event.special[e] = {
                            setup: function () {
                                return Se(this, e, Te), !1;
                            },
                            trigger: function () {
                                return Se(this, e), !0;
                            },
                            delegateType: t,
                        };
                    }),
                    C.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, r) {
                        C.event.special[e] = {
                            delegateType: r,
                            bindType: r,
                            handle: function (e) {
                                var t,
                                    n = e.relatedTarget,
                                    i = e.handleObj;
                                return (n && (n === this || C.contains(this, n))) || ((e.type = i.origType), (t = i.handler.apply(this, arguments)), (e.type = r)), t;
                            },
                        };
                    }),
                    C.fn.extend({
                        on: function (e, t, n, i) {
                            return Ce(this, e, t, n, i);
                        },
                        one: function (e, t, n, i) {
                            return Ce(this, e, t, n, i, 1);
                        },
                        off: function (e, t, n) {
                            var i, r;
                            if (e && e.preventDefault && e.handleObj) return (i = e.handleObj), C(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                            if ("object" != typeof e)
                                return (
                                    (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
                                    !1 === n && (n = Ee),
                                    this.each(function () {
                                        C.event.remove(this, e, n, t);
                                    })
                                );
                            for (r in e) this.off(r, t, e[r]);
                            return this;
                        },
                    });
                var ke = /<script|<style|<link/i,
                    Ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
                    De = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
                function Ne(e, t) {
                    return (S(e, "table") && S(11 !== t.nodeType ? t : t.firstChild, "tr") && C(e).children("tbody")[0]) || e;
                }
                function je(e) {
                    return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
                }
                function Oe(e) {
                    return "true/" === (e.type || "").slice(0, 5) ? (e.type = e.type.slice(5)) : e.removeAttribute("type"), e;
                }
                function Le(e, t) {
                    var n, i, r, o, a, s;
                    if (1 === t.nodeType) {
                        if (X.hasData(e) && (s = X.get(e).events)) for (r in (X.remove(t, "handle events"), s)) for (n = 0, i = s[r].length; n < i; n++) C.event.add(t, r, s[r][n]);
                        Y.hasData(e) && ((o = Y.access(e)), (a = C.extend({}, o)), Y.set(t, a));
                    }
                }
                function Pe(n, i, r, o) {
                    i = m(i);
                    var e,
                        t,
                        a,
                        s,
                        l,
                        u,
                        f = 0,
                        c = n.length,
                        d = c - 1,
                        h = i[0],
                        p = b(h);
                    if (p || (1 < c && "string" == typeof h && !y.checkClone && Ae.test(h)))
                        return n.each(function (e) {
                            var t = n.eq(e);
                            p && (i[0] = h.call(this, e, t.html())), Pe(t, i, r, o);
                        });
                    if (c && ((t = (e = ye(i, n[0].ownerDocument, !1, n, o)).firstChild), 1 === e.childNodes.length && (e = t), t || o)) {
                        for (s = (a = C.map(ge(e, "script"), je)).length; f < c; f++) (l = e), f !== d && ((l = C.clone(l, !0, !0)), s && C.merge(a, ge(l, "script"))), r.call(n[f], l, f);
                        if (s)
                            for (u = a[a.length - 1].ownerDocument, C.map(a, Oe), f = 0; f < s; f++)
                                (l = a[f]),
                                    he.test(l.type || "") &&
                                        !X.access(l, "globalEval") &&
                                        C.contains(u, l) &&
                                        (l.src && "module" !== (l.type || "").toLowerCase() ? C._evalUrl && !l.noModule && C._evalUrl(l.src, { nonce: l.nonce || l.getAttribute("nonce") }, u) : _(l.textContent.replace(De, ""), l, u));
                    }
                    return n;
                }
                function Ie(e, t, n) {
                    for (var i, r = t ? C.filter(t, e) : e, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || C.cleanData(ge(i)), i.parentNode && (n && ie(i) && me(ge(i, "script")), i.parentNode.removeChild(i));
                    return e;
                }
                C.extend({
                    htmlPrefilter: function (e) {
                        return e;
                    },
                    clone: function (e, t, n) {
                        var i,
                            r,
                            o,
                            a,
                            s,
                            l,
                            u,
                            f = e.cloneNode(!0),
                            c = ie(e);
                        if (!(y.noCloneChecked || (1 !== e.nodeType && 11 !== e.nodeType) || C.isXMLDoc(e)))
                            for (a = ge(f), i = 0, r = (o = ge(e)).length; i < r; i++)
                                (s = o[i]), (l = a[i]), "input" === (u = l.nodeName.toLowerCase()) && ce.test(s.type) ? (l.checked = s.checked) : ("input" !== u && "textarea" !== u) || (l.defaultValue = s.defaultValue);
                        if (t)
                            if (n) for (o = o || ge(e), a = a || ge(f), i = 0, r = o.length; i < r; i++) Le(o[i], a[i]);
                            else Le(e, f);
                        return 0 < (a = ge(f, "script")).length && me(a, !c && ge(e, "script")), f;
                    },
                    cleanData: function (e) {
                        for (var t, n, i, r = C.event.special, o = 0; void 0 !== (n = e[o]); o++)
                            if (z(n)) {
                                if ((t = n[X.expando])) {
                                    if (t.events) for (i in t.events) r[i] ? C.event.remove(n, i) : C.removeEvent(n, i, t.handle);
                                    n[X.expando] = void 0;
                                }
                                n[Y.expando] && (n[Y.expando] = void 0);
                            }
                    },
                }),
                    C.fn.extend({
                        detach: function (e) {
                            return Ie(this, e, !0);
                        },
                        remove: function (e) {
                            return Ie(this, e);
                        },
                        text: function (e) {
                            return B(
                                this,
                                function (e) {
                                    return void 0 === e
                                        ? C.text(this)
                                        : this.empty().each(function () {
                                              (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = e);
                                          });
                                },
                                null,
                                e,
                                arguments.length
                            );
                        },
                        append: function () {
                            return Pe(this, arguments, function (e) {
                                (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || Ne(this, e).appendChild(e);
                            });
                        },
                        prepend: function () {
                            return Pe(this, arguments, function (e) {
                                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                    var t = Ne(this, e);
                                    t.insertBefore(e, t.firstChild);
                                }
                            });
                        },
                        before: function () {
                            return Pe(this, arguments, function (e) {
                                this.parentNode && this.parentNode.insertBefore(e, this);
                            });
                        },
                        after: function () {
                            return Pe(this, arguments, function (e) {
                                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                            });
                        },
                        empty: function () {
                            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (C.cleanData(ge(e, !1)), (e.textContent = ""));
                            return this;
                        },
                        clone: function (e, t) {
                            return (
                                (e = null != e && e),
                                (t = null == t ? e : t),
                                this.map(function () {
                                    return C.clone(this, e, t);
                                })
                            );
                        },
                        html: function (e) {
                            return B(
                                this,
                                function (e) {
                                    var t = this[0] || {},
                                        n = 0,
                                        i = this.length;
                                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                                    if ("string" == typeof e && !ke.test(e) && !pe[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                                        e = C.htmlPrefilter(e);
                                        try {
                                            for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (C.cleanData(ge(t, !1)), (t.innerHTML = e));
                                            t = 0;
                                        } catch (e) {}
                                    }
                                    t && this.empty().append(e);
                                },
                                null,
                                e,
                                arguments.length
                            );
                        },
                        replaceWith: function () {
                            var n = [];
                            return Pe(
                                this,
                                arguments,
                                function (e) {
                                    var t = this.parentNode;
                                    C.inArray(this, n) < 0 && (C.cleanData(ge(this)), t && t.replaceChild(e, this));
                                },
                                n
                            );
                        },
                    }),
                    C.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, a) {
                        C.fn[e] = function (e) {
                            for (var t, n = [], i = C(e), r = i.length - 1, o = 0; o <= r; o++) (t = o === r ? this : this.clone(!0)), C(i[o])[a](t), l.apply(n, t.get());
                            return this.pushStack(n);
                        };
                    });
                function Fe(e, t, n) {
                    var i,
                        r,
                        o = {};
                    for (r in t) (o[r] = e.style[r]), (e.style[r] = t[r]);
                    for (r in ((i = n.call(e)), t)) e.style[r] = o[r];
                    return i;
                }
                var qe,
                    He,
                    Re,
                    Me,
                    Be,
                    We,
                    Ve,
                    $e,
                    Ue = new RegExp("^(" + Z + ")(?!px)[a-z%]+$", "i"),
                    ze = function (e) {
                        var t = e.ownerDocument.defaultView;
                        return (t && t.opener) || (t = E), t.getComputedStyle(e);
                    },
                    Qe = new RegExp(te.join("|"), "i");
                function Xe() {
                    if ($e) {
                        (Ve.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
                            ($e.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
                            ne.appendChild(Ve).appendChild($e);
                        var e = E.getComputedStyle($e);
                        (qe = "1%" !== e.top),
                            (We = 12 === Ye(e.marginLeft)),
                            ($e.style.right = "60%"),
                            (Me = 36 === Ye(e.right)),
                            (He = 36 === Ye(e.width)),
                            ($e.style.position = "absolute"),
                            (Re = 12 === Ye($e.offsetWidth / 3)),
                            ne.removeChild(Ve),
                            ($e = null);
                    }
                }
                function Ye(e) {
                    return Math.round(parseFloat(e));
                }
                function Ke(e, t, n) {
                    var i,
                        r,
                        o,
                        a,
                        s = e.style;
                    return (
                        (n = n || ze(e)) &&
                            ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = C.style(e, t)),
                            !y.pixelBoxStyles() && Ue.test(a) && Qe.test(t) && ((i = s.width), (r = s.minWidth), (o = s.maxWidth), (s.minWidth = s.maxWidth = s.width = a), (a = n.width), (s.width = i), (s.minWidth = r), (s.maxWidth = o))),
                        void 0 !== a ? a + "" : a
                    );
                }
                function Ge(e, t) {
                    return {
                        get: function () {
                            if (!e()) return (this.get = t).apply(this, arguments);
                            delete this.get;
                        },
                    };
                }
                (Ve = T.createElement("div")),
                    ($e = T.createElement("div")).style &&
                        (($e.style.backgroundClip = "content-box"),
                        ($e.cloneNode(!0).style.backgroundClip = ""),
                        (y.clearCloneStyle = "content-box" === $e.style.backgroundClip),
                        C.extend(y, {
                            boxSizingReliable: function () {
                                return Xe(), He;
                            },
                            pixelBoxStyles: function () {
                                return Xe(), Me;
                            },
                            pixelPosition: function () {
                                return Xe(), qe;
                            },
                            reliableMarginLeft: function () {
                                return Xe(), We;
                            },
                            scrollboxSize: function () {
                                return Xe(), Re;
                            },
                            reliableTrDimensions: function () {
                                var e, t, n, i;
                                return (
                                    null == Be &&
                                        ((e = T.createElement("table")),
                                        (t = T.createElement("tr")),
                                        (n = T.createElement("div")),
                                        (e.style.cssText = "position:absolute;left:-11111px"),
                                        (t.style.height = "1px"),
                                        (n.style.height = "9px"),
                                        ne.appendChild(e).appendChild(t).appendChild(n),
                                        (i = E.getComputedStyle(t)),
                                        (Be = 3 < parseInt(i.height)),
                                        ne.removeChild(e)),
                                    Be
                                );
                            },
                        }));
                var Je = ["Webkit", "Moz", "ms"],
                    Ze = T.createElement("div").style,
                    et = {};
                function tt(e) {
                    var t = C.cssProps[e] || et[e];
                    return (
                        t ||
                        (e in Ze
                            ? e
                            : (et[e] =
                                  (function (e) {
                                      for (var t = e[0].toUpperCase() + e.slice(1), n = Je.length; n--; ) if ((e = Je[n] + t) in Ze) return e;
                                  })(e) || e))
                    );
                }
                var nt = /^(none|table(?!-c[ea]).+)/,
                    it = /^--/,
                    rt = { position: "absolute", visibility: "hidden", display: "block" },
                    ot = { letterSpacing: "0", fontWeight: "400" };
                function at(e, t, n) {
                    var i = ee.exec(t);
                    return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t;
                }
                function st(e, t, n, i, r, o) {
                    var a = "width" === t ? 1 : 0,
                        s = 0,
                        l = 0;
                    if (n === (i ? "border" : "content")) return 0;
                    for (; a < 4; a += 2)
                        "margin" === n && (l += C.css(e, n + te[a], !0, r)),
                            i
                                ? ("content" === n && (l -= C.css(e, "padding" + te[a], !0, r)), "margin" !== n && (l -= C.css(e, "border" + te[a] + "Width", !0, r)))
                                : ((l += C.css(e, "padding" + te[a], !0, r)), "padding" !== n ? (l += C.css(e, "border" + te[a] + "Width", !0, r)) : (s += C.css(e, "border" + te[a] + "Width", !0, r)));
                    return !i && 0 <= o && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - s - 0.5)) || 0), l;
                }
                function lt(e, t, n) {
                    var i = ze(e),
                        r = (!y.boxSizingReliable() || n) && "border-box" === C.css(e, "boxSizing", !1, i),
                        o = r,
                        a = Ke(e, t, i),
                        s = "offset" + t[0].toUpperCase() + t.slice(1);
                    if (Ue.test(a)) {
                        if (!n) return a;
                        a = "auto";
                    }
                    return (
                        ((!y.boxSizingReliable() && r) || (!y.reliableTrDimensions() && S(e, "tr")) || "auto" === a || (!parseFloat(a) && "inline" === C.css(e, "display", !1, i))) &&
                            e.getClientRects().length &&
                            ((r = "border-box" === C.css(e, "boxSizing", !1, i)), (o = s in e) && (a = e[s])),
                        (a = parseFloat(a) || 0) + st(e, t, n || (r ? "border" : "content"), o, i, a) + "px"
                    );
                }
                function ut(e, t, n, i, r) {
                    return new ut.prototype.init(e, t, n, i, r);
                }
                C.extend({
                    cssHooks: {
                        opacity: {
                            get: function (e, t) {
                                if (t) {
                                    var n = Ke(e, "opacity");
                                    return "" === n ? "1" : n;
                                }
                            },
                        },
                    },
                    cssNumber: {
                        animationIterationCount: !0,
                        columnCount: !0,
                        fillOpacity: !0,
                        flexGrow: !0,
                        flexShrink: !0,
                        fontWeight: !0,
                        gridArea: !0,
                        gridColumn: !0,
                        gridColumnEnd: !0,
                        gridColumnStart: !0,
                        gridRow: !0,
                        gridRowEnd: !0,
                        gridRowStart: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0,
                    },
                    cssProps: {},
                    style: function (e, t, n, i) {
                        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                            var r,
                                o,
                                a,
                                s = U(t),
                                l = it.test(t),
                                u = e.style;
                            if ((l || (t = tt(s)), (a = C.cssHooks[t] || C.cssHooks[s]), void 0 === n)) return a && "get" in a && void 0 !== (r = a.get(e, !1, i)) ? r : u[t];
                            "string" === (o = typeof n) && (r = ee.exec(n)) && r[1] && ((n = ae(e, t, r)), (o = "number")),
                                null != n &&
                                    n == n &&
                                    ("number" !== o || l || (n += (r && r[3]) || (C.cssNumber[s] ? "" : "px")),
                                    y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"),
                                    (a && "set" in a && void 0 === (n = a.set(e, n, i))) || (l ? u.setProperty(t, n) : (u[t] = n)));
                        }
                    },
                    css: function (e, t, n, i) {
                        var r,
                            o,
                            a,
                            s = U(t);
                        return (
                            it.test(t) || (t = tt(s)),
                            (a = C.cssHooks[t] || C.cssHooks[s]) && "get" in a && (r = a.get(e, !0, n)),
                            void 0 === r && (r = Ke(e, t, i)),
                            "normal" === r && t in ot && (r = ot[t]),
                            "" === n || n ? ((o = parseFloat(r)), !0 === n || isFinite(o) ? o || 0 : r) : r
                        );
                    },
                }),
                    C.each(["height", "width"], function (e, l) {
                        C.cssHooks[l] = {
                            get: function (e, t, n) {
                                if (t)
                                    return !nt.test(C.css(e, "display")) || (e.getClientRects().length && e.getBoundingClientRect().width)
                                        ? lt(e, l, n)
                                        : Fe(e, rt, function () {
                                              return lt(e, l, n);
                                          });
                            },
                            set: function (e, t, n) {
                                var i,
                                    r = ze(e),
                                    o = !y.scrollboxSize() && "absolute" === r.position,
                                    a = (o || n) && "border-box" === C.css(e, "boxSizing", !1, r),
                                    s = n ? st(e, l, n, a, r) : 0;
                                return (
                                    a && o && (s -= Math.ceil(e["offset" + l[0].toUpperCase() + l.slice(1)] - parseFloat(r[l]) - st(e, l, "border", !1, r) - 0.5)),
                                    s && (i = ee.exec(t)) && "px" !== (i[3] || "px") && ((e.style[l] = t), (t = C.css(e, l))),
                                    at(0, t, s)
                                );
                            },
                        };
                    }),
                    (C.cssHooks.marginLeft = Ge(y.reliableMarginLeft, function (e, t) {
                        if (t)
                            return (
                                (parseFloat(Ke(e, "marginLeft")) ||
                                    e.getBoundingClientRect().left -
                                        Fe(e, { marginLeft: 0 }, function () {
                                            return e.getBoundingClientRect().left;
                                        })) + "px"
                            );
                    })),
                    C.each({ margin: "", padding: "", border: "Width" }, function (r, o) {
                        (C.cssHooks[r + o] = {
                            expand: function (e) {
                                for (var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[r + te[t] + o] = i[t] || i[t - 2] || i[0];
                                return n;
                            },
                        }),
                            "margin" !== r && (C.cssHooks[r + o].set = at);
                    }),
                    C.fn.extend({
                        css: function (e, t) {
                            return B(
                                this,
                                function (e, t, n) {
                                    var i,
                                        r,
                                        o = {},
                                        a = 0;
                                    if (Array.isArray(t)) {
                                        for (i = ze(e), r = t.length; a < r; a++) o[t[a]] = C.css(e, t[a], !1, i);
                                        return o;
                                    }
                                    return void 0 !== n ? C.style(e, t, n) : C.css(e, t);
                                },
                                e,
                                t,
                                1 < arguments.length
                            );
                        },
                    }),
                    (((C.Tween = ut).prototype = {
                        constructor: ut,
                        init: function (e, t, n, i, r, o) {
                            (this.elem = e), (this.prop = n), (this.easing = r || C.easing._default), (this.options = t), (this.start = this.now = this.cur()), (this.end = i), (this.unit = o || (C.cssNumber[n] ? "" : "px"));
                        },
                        cur: function () {
                            var e = ut.propHooks[this.prop];
                            return e && e.get ? e.get(this) : ut.propHooks._default.get(this);
                        },
                        run: function (e) {
                            var t,
                                n = ut.propHooks[this.prop];
                            return (
                                this.options.duration ? (this.pos = t = C.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration)) : (this.pos = t = e),
                                (this.now = (this.end - this.start) * t + this.start),
                                this.options.step && this.options.step.call(this.elem, this.now, this),
                                n && n.set ? n.set(this) : ut.propHooks._default.set(this),
                                this
                            );
                        },
                    }).init.prototype = ut.prototype),
                    ((ut.propHooks = {
                        _default: {
                            get: function (e) {
                                var t;
                                return 1 !== e.elem.nodeType || (null != e.elem[e.prop] && null == e.elem.style[e.prop]) ? e.elem[e.prop] : (t = C.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
                            },
                            set: function (e) {
                                C.fx.step[e.prop] ? C.fx.step[e.prop](e) : 1 !== e.elem.nodeType || (!C.cssHooks[e.prop] && null == e.elem.style[tt(e.prop)]) ? (e.elem[e.prop] = e.now) : C.style(e.elem, e.prop, e.now + e.unit);
                            },
                        },
                    }).scrollTop = ut.propHooks.scrollLeft = {
                        set: function (e) {
                            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                        },
                    }),
                    (C.easing = {
                        linear: function (e) {
                            return e;
                        },
                        swing: function (e) {
                            return 0.5 - Math.cos(e * Math.PI) / 2;
                        },
                        _default: "swing",
                    }),
                    (C.fx = ut.prototype.init),
                    (C.fx.step = {});
                var ft,
                    ct,
                    dt,
                    ht,
                    pt = /^(?:toggle|show|hide)$/,
                    gt = /queueHooks$/;
                function mt() {
                    ct && (!1 === T.hidden && E.requestAnimationFrame ? E.requestAnimationFrame(mt) : E.setTimeout(mt, C.fx.interval), C.fx.tick());
                }
                function vt() {
                    return (
                        E.setTimeout(function () {
                            ft = void 0;
                        }),
                        (ft = Date.now())
                    );
                }
                function yt(e, t) {
                    var n,
                        i = 0,
                        r = { height: e };
                    for (t = t ? 1 : 0; i < 4; i += 2 - t) r["margin" + (n = te[i])] = r["padding" + n] = e;
                    return t && (r.opacity = r.width = e), r;
                }
                function bt(e, t, n) {
                    for (var i, r = (_t.tweeners[t] || []).concat(_t.tweeners["*"]), o = 0, a = r.length; o < a; o++) if ((i = r[o].call(n, t, e))) return i;
                }
                function _t(o, e, t) {
                    var n,
                        a,
                        i = 0,
                        r = _t.prefilters.length,
                        s = C.Deferred().always(function () {
                            delete l.elem;
                        }),
                        l = function () {
                            if (a) return !1;
                            for (var e = ft || vt(), t = Math.max(0, u.startTime + u.duration - e), n = 1 - (t / u.duration || 0), i = 0, r = u.tweens.length; i < r; i++) u.tweens[i].run(n);
                            return s.notifyWith(o, [u, n, t]), n < 1 && r ? t : (r || s.notifyWith(o, [u, 1, 0]), s.resolveWith(o, [u]), !1);
                        },
                        u = s.promise({
                            elem: o,
                            props: C.extend({}, e),
                            opts: C.extend(!0, { specialEasing: {}, easing: C.easing._default }, t),
                            originalProperties: e,
                            originalOptions: t,
                            startTime: ft || vt(),
                            duration: t.duration,
                            tweens: [],
                            createTween: function (e, t) {
                                var n = C.Tween(o, u.opts, e, t, u.opts.specialEasing[e] || u.opts.easing);
                                return u.tweens.push(n), n;
                            },
                            stop: function (e) {
                                var t = 0,
                                    n = e ? u.tweens.length : 0;
                                if (a) return this;
                                for (a = !0; t < n; t++) u.tweens[t].run(1);
                                return e ? (s.notifyWith(o, [u, 1, 0]), s.resolveWith(o, [u, e])) : s.rejectWith(o, [u, e]), this;
                            },
                        }),
                        f = u.props;
                    for (
                        !(function (e, t) {
                            var n, i, r, o, a;
                            for (n in e)
                                if (((r = t[(i = U(n))]), (o = e[n]), Array.isArray(o) && ((r = o[1]), (o = e[n] = o[0])), n !== i && ((e[i] = o), delete e[n]), (a = C.cssHooks[i]) && ("expand" in a)))
                                    for (n in ((o = a.expand(o)), delete e[i], o)) (n in e) || ((e[n] = o[n]), (t[n] = r));
                                else t[i] = r;
                        })(f, u.opts.specialEasing);
                        i < r;
                        i++
                    )
                        if ((n = _t.prefilters[i].call(u, o, f, u.opts))) return b(n.stop) && (C._queueHooks(u.elem, u.opts.queue).stop = n.stop.bind(n)), n;
                    return (
                        C.map(f, bt, u),
                        b(u.opts.start) && u.opts.start.call(o, u),
                        u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always),
                        C.fx.timer(C.extend(l, { elem: o, anim: u, queue: u.opts.queue })),
                        u
                    );
                }
                (C.Animation = C.extend(_t, {
                    tweeners: {
                        "*": [
                            function (e, t) {
                                var n = this.createTween(e, t);
                                return ae(n.elem, e, ee.exec(t), n), n;
                            },
                        ],
                    },
                    tweener: function (e, t) {
                        for (var n, i = 0, r = (e = b(e) ? ((t = e), ["*"]) : e.match(P)).length; i < r; i++) (n = e[i]), (_t.tweeners[n] = _t.tweeners[n] || []), _t.tweeners[n].unshift(t);
                    },
                    prefilters: [
                        function (e, t, n) {
                            var i,
                                r,
                                o,
                                a,
                                s,
                                l,
                                u,
                                f,
                                c = "width" in t || "height" in t,
                                d = this,
                                h = {},
                                p = e.style,
                                g = e.nodeType && oe(e),
                                m = X.get(e, "fxshow");
                            for (i in (n.queue ||
                                (null == (a = C._queueHooks(e, "fx")).unqueued &&
                                    ((a.unqueued = 0),
                                    (s = a.empty.fire),
                                    (a.empty.fire = function () {
                                        a.unqueued || s();
                                    })),
                                a.unqueued++,
                                d.always(function () {
                                    d.always(function () {
                                        a.unqueued--, C.queue(e, "fx").length || a.empty.fire();
                                    });
                                })),
                            t))
                                if (((r = t[i]), pt.test(r))) {
                                    if ((delete t[i], (o = o || "toggle" === r), r === (g ? "hide" : "show"))) {
                                        if ("show" !== r || !m || void 0 === m[i]) continue;
                                        g = !0;
                                    }
                                    h[i] = (m && m[i]) || C.style(e, i);
                                }
                            if ((l = !C.isEmptyObject(t)) || !C.isEmptyObject(h))
                                for (i in (c &&
                                    1 === e.nodeType &&
                                    ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
                                    null == (u = m && m.display) && (u = X.get(e, "display")),
                                    "none" === (f = C.css(e, "display")) && (u ? (f = u) : (le([e], !0), (u = e.style.display || u), (f = C.css(e, "display")), le([e]))),
                                    ("inline" === f || ("inline-block" === f && null != u)) &&
                                        "none" === C.css(e, "float") &&
                                        (l ||
                                            (d.done(function () {
                                                p.display = u;
                                            }),
                                            null == u && ((f = p.display), (u = "none" === f ? "" : f))),
                                        (p.display = "inline-block"))),
                                n.overflow &&
                                    ((p.overflow = "hidden"),
                                    d.always(function () {
                                        (p.overflow = n.overflow[0]), (p.overflowX = n.overflow[1]), (p.overflowY = n.overflow[2]);
                                    })),
                                (l = !1),
                                h))
                                    l ||
                                        (m ? "hidden" in m && (g = m.hidden) : (m = X.access(e, "fxshow", { display: u })),
                                        o && (m.hidden = !g),
                                        g && le([e], !0),
                                        d.done(function () {
                                            for (i in (g || le([e]), X.remove(e, "fxshow"), h)) C.style(e, i, h[i]);
                                        })),
                                        (l = bt(g ? m[i] : 0, i, d)),
                                        i in m || ((m[i] = l.start), g && ((l.end = l.start), (l.start = 0)));
                        },
                    ],
                    prefilter: function (e, t) {
                        t ? _t.prefilters.unshift(e) : _t.prefilters.push(e);
                    },
                })),
                    (C.speed = function (e, t, n) {
                        var i = e && "object" == typeof e ? C.extend({}, e) : { complete: n || (!n && t) || (b(e) && e), duration: e, easing: (n && t) || (t && !b(t) && t) };
                        return (
                            C.fx.off ? (i.duration = 0) : "number" != typeof i.duration && (i.duration in C.fx.speeds ? (i.duration = C.fx.speeds[i.duration]) : (i.duration = C.fx.speeds._default)),
                            (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
                            (i.old = i.complete),
                            (i.complete = function () {
                                b(i.old) && i.old.call(this), i.queue && C.dequeue(this, i.queue);
                            }),
                            i
                        );
                    }),
                    C.fn.extend({
                        fadeTo: function (e, t, n, i) {
                            return this.filter(oe).css("opacity", 0).show().end().animate({ opacity: t }, e, n, i);
                        },
                        animate: function (t, e, n, i) {
                            function r() {
                                var e = _t(this, C.extend({}, t), a);
                                (o || X.get(this, "finish")) && e.stop(!0);
                            }
                            var o = C.isEmptyObject(t),
                                a = C.speed(e, n, i);
                            return (r.finish = r), o || !1 === a.queue ? this.each(r) : this.queue(a.queue, r);
                        },
                        stop: function (r, e, o) {
                            function a(e) {
                                var t = e.stop;
                                delete e.stop, t(o);
                            }
                            return (
                                "string" != typeof r && ((o = e), (e = r), (r = void 0)),
                                e && this.queue(r || "fx", []),
                                this.each(function () {
                                    var e = !0,
                                        t = null != r && r + "queueHooks",
                                        n = C.timers,
                                        i = X.get(this);
                                    if (t) i[t] && i[t].stop && a(i[t]);
                                    else for (t in i) i[t] && i[t].stop && gt.test(t) && a(i[t]);
                                    for (t = n.length; t--; ) n[t].elem !== this || (null != r && n[t].queue !== r) || (n[t].anim.stop(o), (e = !1), n.splice(t, 1));
                                    (!e && o) || C.dequeue(this, r);
                                })
                            );
                        },
                        finish: function (a) {
                            return (
                                !1 !== a && (a = a || "fx"),
                                this.each(function () {
                                    var e,
                                        t = X.get(this),
                                        n = t[a + "queue"],
                                        i = t[a + "queueHooks"],
                                        r = C.timers,
                                        o = n ? n.length : 0;
                                    for (t.finish = !0, C.queue(this, a, []), i && i.stop && i.stop.call(this, !0), e = r.length; e--; ) r[e].elem === this && r[e].queue === a && (r[e].anim.stop(!0), r.splice(e, 1));
                                    for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                                    delete t.finish;
                                })
                            );
                        },
                    }),
                    C.each(["toggle", "show", "hide"], function (e, i) {
                        var r = C.fn[i];
                        C.fn[i] = function (e, t, n) {
                            return null == e || "boolean" == typeof e ? r.apply(this, arguments) : this.animate(yt(i, !0), e, t, n);
                        };
                    }),
                    C.each({ slideDown: yt("show"), slideUp: yt("hide"), slideToggle: yt("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, i) {
                        C.fn[e] = function (e, t, n) {
                            return this.animate(i, e, t, n);
                        };
                    }),
                    (C.timers = []),
                    (C.fx.tick = function () {
                        var e,
                            t = 0,
                            n = C.timers;
                        for (ft = Date.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
                        n.length || C.fx.stop(), (ft = void 0);
                    }),
                    (C.fx.timer = function (e) {
                        C.timers.push(e), C.fx.start();
                    }),
                    (C.fx.interval = 13),
                    (C.fx.start = function () {
                        ct || ((ct = !0), mt());
                    }),
                    (C.fx.stop = function () {
                        ct = null;
                    }),
                    (C.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
                    (C.fn.delay = function (i, e) {
                        return (
                            (i = (C.fx && C.fx.speeds[i]) || i),
                            (e = e || "fx"),
                            this.queue(e, function (e, t) {
                                var n = E.setTimeout(e, i);
                                t.stop = function () {
                                    E.clearTimeout(n);
                                };
                            })
                        );
                    }),
                    (dt = T.createElement("input")),
                    (ht = T.createElement("select").appendChild(T.createElement("option"))),
                    (dt.type = "checkbox"),
                    (y.checkOn = "" !== dt.value),
                    (y.optSelected = ht.selected),
                    ((dt = T.createElement("input")).value = "t"),
                    (dt.type = "radio"),
                    (y.radioValue = "t" === dt.value);
                var wt,
                    xt = C.expr.attrHandle;
                C.fn.extend({
                    attr: function (e, t) {
                        return B(this, C.attr, e, t, 1 < arguments.length);
                    },
                    removeAttr: function (e) {
                        return this.each(function () {
                            C.removeAttr(this, e);
                        });
                    },
                }),
                    C.extend({
                        attr: function (e, t, n) {
                            var i,
                                r,
                                o = e.nodeType;
                            if (3 !== o && 8 !== o && 2 !== o)
                                return void 0 === e.getAttribute
                                    ? C.prop(e, t, n)
                                    : ((1 === o && C.isXMLDoc(e)) || (r = C.attrHooks[t.toLowerCase()] || (C.expr.match.bool.test(t) ? wt : void 0)),
                                      void 0 !== n
                                          ? null === n
                                              ? void C.removeAttr(e, t)
                                              : r && "set" in r && void 0 !== (i = r.set(e, n, t))
                                              ? i
                                              : (e.setAttribute(t, n + ""), n)
                                          : r && "get" in r && null !== (i = r.get(e, t))
                                          ? i
                                          : null == (i = C.find.attr(e, t))
                                          ? void 0
                                          : i);
                        },
                        attrHooks: {
                            type: {
                                set: function (e, t) {
                                    if (!y.radioValue && "radio" === t && S(e, "input")) {
                                        var n = e.value;
                                        return e.setAttribute("type", t), n && (e.value = n), t;
                                    }
                                },
                            },
                        },
                        removeAttr: function (e, t) {
                            var n,
                                i = 0,
                                r = t && t.match(P);
                            if (r && 1 === e.nodeType) for (; (n = r[i++]); ) e.removeAttribute(n);
                        },
                    }),
                    (wt = {
                        set: function (e, t, n) {
                            return !1 === t ? C.removeAttr(e, n) : e.setAttribute(n, n), n;
                        },
                    }),
                    C.each(C.expr.match.bool.source.match(/\w+/g), function (e, t) {
                        var a = xt[t] || C.find.attr;
                        xt[t] = function (e, t, n) {
                            var i,
                                r,
                                o = t.toLowerCase();
                            return n || ((r = xt[o]), (xt[o] = i), (i = null != a(e, t, n) ? o : null), (xt[o] = r)), i;
                        };
                    });
                var Et = /^(?:input|select|textarea|button)$/i,
                    Tt = /^(?:a|area)$/i;
                function Ct(e) {
                    return (e.match(P) || []).join(" ");
                }
                function St(e) {
                    return (e.getAttribute && e.getAttribute("class")) || "";
                }
                function kt(e) {
                    return Array.isArray(e) ? e : ("string" == typeof e && e.match(P)) || [];
                }
                C.fn.extend({
                    prop: function (e, t) {
                        return B(this, C.prop, e, t, 1 < arguments.length);
                    },
                    removeProp: function (e) {
                        return this.each(function () {
                            delete this[C.propFix[e] || e];
                        });
                    },
                }),
                    C.extend({
                        prop: function (e, t, n) {
                            var i,
                                r,
                                o = e.nodeType;
                            if (3 !== o && 8 !== o && 2 !== o)
                                return (
                                    (1 === o && C.isXMLDoc(e)) || ((t = C.propFix[t] || t), (r = C.propHooks[t])),
                                    void 0 !== n ? (r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e[t] = n)) : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
                                );
                        },
                        propHooks: {
                            tabIndex: {
                                get: function (e) {
                                    var t = C.find.attr(e, "tabindex");
                                    return t ? parseInt(t, 10) : Et.test(e.nodeName) || (Tt.test(e.nodeName) && e.href) ? 0 : -1;
                                },
                            },
                        },
                        propFix: { for: "htmlFor", class: "className" },
                    }),
                    y.optSelected ||
                        (C.propHooks.selected = {
                            get: function (e) {
                                var t = e.parentNode;
                                return t && t.parentNode && t.parentNode.selectedIndex, null;
                            },
                            set: function (e) {
                                var t = e.parentNode;
                                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
                            },
                        }),
                    C.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                        C.propFix[this.toLowerCase()] = this;
                    }),
                    C.fn.extend({
                        addClass: function (t) {
                            var e,
                                n,
                                i,
                                r,
                                o,
                                a,
                                s,
                                l = 0;
                            if (b(t))
                                return this.each(function (e) {
                                    C(this).addClass(t.call(this, e, St(this)));
                                });
                            if ((e = kt(t)).length)
                                for (; (n = this[l++]); )
                                    if (((r = St(n)), (i = 1 === n.nodeType && " " + Ct(r) + " "))) {
                                        for (a = 0; (o = e[a++]); ) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                                        r !== (s = Ct(i)) && n.setAttribute("class", s);
                                    }
                            return this;
                        },
                        removeClass: function (t) {
                            var e,
                                n,
                                i,
                                r,
                                o,
                                a,
                                s,
                                l = 0;
                            if (b(t))
                                return this.each(function (e) {
                                    C(this).removeClass(t.call(this, e, St(this)));
                                });
                            if (!arguments.length) return this.attr("class", "");
                            if ((e = kt(t)).length)
                                for (; (n = this[l++]); )
                                    if (((r = St(n)), (i = 1 === n.nodeType && " " + Ct(r) + " "))) {
                                        for (a = 0; (o = e[a++]); ) for (; -1 < i.indexOf(" " + o + " "); ) i = i.replace(" " + o + " ", " ");
                                        r !== (s = Ct(i)) && n.setAttribute("class", s);
                                    }
                            return this;
                        },
                        toggleClass: function (r, t) {
                            var o = typeof r,
                                a = "string" == o || Array.isArray(r);
                            return "boolean" == typeof t && a
                                ? t
                                    ? this.addClass(r)
                                    : this.removeClass(r)
                                : b(r)
                                ? this.each(function (e) {
                                      C(this).toggleClass(r.call(this, e, St(this), t), t);
                                  })
                                : this.each(function () {
                                      var e, t, n, i;
                                      if (a) for (t = 0, n = C(this), i = kt(r); (e = i[t++]); ) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                                      else (void 0 !== r && "boolean" != o) || ((e = St(this)) && X.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === r ? "" : X.get(this, "__className__") || ""));
                                  });
                        },
                        hasClass: function (e) {
                            var t,
                                n,
                                i = 0;
                            for (t = " " + e + " "; (n = this[i++]); ) if (1 === n.nodeType && -1 < (" " + Ct(St(n)) + " ").indexOf(t)) return !0;
                            return !1;
                        },
                    });
                var At = /\r/g;
                C.fn.extend({
                    val: function (n) {
                        var i,
                            e,
                            r,
                            t = this[0];
                        return arguments.length
                            ? ((r = b(n)),
                              this.each(function (e) {
                                  var t;
                                  1 === this.nodeType &&
                                      (null == (t = r ? n.call(this, e, C(this).val()) : n)
                                          ? (t = "")
                                          : "number" == typeof t
                                          ? (t += "")
                                          : Array.isArray(t) &&
                                            (t = C.map(t, function (e) {
                                                return null == e ? "" : e + "";
                                            })),
                                      ((i = C.valHooks[this.type] || C.valHooks[this.nodeName.toLowerCase()]) && "set" in i && void 0 !== i.set(this, t, "value")) || (this.value = t));
                              }))
                            : t
                            ? (i = C.valHooks[t.type] || C.valHooks[t.nodeName.toLowerCase()]) && "get" in i && void 0 !== (e = i.get(t, "value"))
                                ? e
                                : "string" == typeof (e = t.value)
                                ? e.replace(At, "")
                                : null == e
                                ? ""
                                : e
                            : void 0;
                    },
                }),
                    C.extend({
                        valHooks: {
                            option: {
                                get: function (e) {
                                    var t = C.find.attr(e, "value");
                                    return null != t ? t : Ct(C.text(e));
                                },
                            },
                            select: {
                                get: function (e) {
                                    var t,
                                        n,
                                        i,
                                        r = e.options,
                                        o = e.selectedIndex,
                                        a = "select-one" === e.type,
                                        s = a ? null : [],
                                        l = a ? o + 1 : r.length;
                                    for (i = o < 0 ? l : a ? o : 0; i < l; i++)
                                        if (((n = r[i]).selected || i === o) && !n.disabled && (!n.parentNode.disabled || !S(n.parentNode, "optgroup"))) {
                                            if (((t = C(n).val()), a)) return t;
                                            s.push(t);
                                        }
                                    return s;
                                },
                                set: function (e, t) {
                                    for (var n, i, r = e.options, o = C.makeArray(t), a = r.length; a--; ) ((i = r[a]).selected = -1 < C.inArray(C.valHooks.option.get(i), o)) && (n = !0);
                                    return n || (e.selectedIndex = -1), o;
                                },
                            },
                        },
                    }),
                    C.each(["radio", "checkbox"], function () {
                        (C.valHooks[this] = {
                            set: function (e, t) {
                                if (Array.isArray(t)) return (e.checked = -1 < C.inArray(C(e).val(), t));
                            },
                        }),
                            y.checkOn ||
                                (C.valHooks[this].get = function (e) {
                                    return null === e.getAttribute("value") ? "on" : e.value;
                                });
                    }),
                    (y.focusin = "onfocusin" in E);
                function Dt(e) {
                    e.stopPropagation();
                }
                var Nt = /^(?:focusinfocus|focusoutblur)$/;
                C.extend(C.event, {
                    trigger: function (e, t, n, i) {
                        var r,
                            o,
                            a,
                            s,
                            l,
                            u,
                            f,
                            c,
                            d = [n || T],
                            h = v.call(e, "type") ? e.type : e,
                            p = v.call(e, "namespace") ? e.namespace.split(".") : [];
                        if (
                            ((o = c = a = n = n || T),
                            3 !== n.nodeType &&
                                8 !== n.nodeType &&
                                !Nt.test(h + C.event.triggered) &&
                                (-1 < h.indexOf(".") && ((h = (p = h.split(".")).shift()), p.sort()),
                                (l = h.indexOf(":") < 0 && "on" + h),
                                ((e = e[C.expando] ? e : new C.Event(h, "object" == typeof e && e)).isTrigger = i ? 2 : 3),
                                (e.namespace = p.join(".")),
                                (e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                                (e.result = void 0),
                                e.target || (e.target = n),
                                (t = null == t ? [e] : C.makeArray(t, [e])),
                                (f = C.event.special[h] || {}),
                                i || !f.trigger || !1 !== f.trigger.apply(n, t)))
                        ) {
                            if (!i && !f.noBubble && !g(n)) {
                                for (s = f.delegateType || h, Nt.test(s + h) || (o = o.parentNode); o; o = o.parentNode) d.push(o), (a = o);
                                a === (n.ownerDocument || T) && d.push(a.defaultView || a.parentWindow || E);
                            }
                            for (r = 0; (o = d[r++]) && !e.isPropagationStopped(); )
                                (c = o),
                                    (e.type = 1 < r ? s : f.bindType || h),
                                    (u = (X.get(o, "events") || Object.create(null))[e.type] && X.get(o, "handle")) && u.apply(o, t),
                                    (u = l && o[l]) && u.apply && z(o) && ((e.result = u.apply(o, t)), !1 === e.result && e.preventDefault());
                            return (
                                (e.type = h),
                                i ||
                                    e.isDefaultPrevented() ||
                                    (f._default && !1 !== f._default.apply(d.pop(), t)) ||
                                    !z(n) ||
                                    (l &&
                                        b(n[h]) &&
                                        !g(n) &&
                                        ((a = n[l]) && (n[l] = null),
                                        (C.event.triggered = h),
                                        e.isPropagationStopped() && c.addEventListener(h, Dt),
                                        n[h](),
                                        e.isPropagationStopped() && c.removeEventListener(h, Dt),
                                        (C.event.triggered = void 0),
                                        a && (n[l] = a))),
                                e.result
                            );
                        }
                    },
                    simulate: function (e, t, n) {
                        var i = C.extend(new C.Event(), n, { type: e, isSimulated: !0 });
                        C.event.trigger(i, null, t);
                    },
                }),
                    C.fn.extend({
                        trigger: function (e, t) {
                            return this.each(function () {
                                C.event.trigger(e, t, this);
                            });
                        },
                        triggerHandler: function (e, t) {
                            var n = this[0];
                            if (n) return C.event.trigger(e, t, n, !0);
                        },
                    }),
                    y.focusin ||
                        C.each({ focus: "focusin", blur: "focusout" }, function (n, i) {
                            function r(e) {
                                C.event.simulate(i, e.target, C.event.fix(e));
                            }
                            C.event.special[i] = {
                                setup: function () {
                                    var e = this.ownerDocument || this.document || this,
                                        t = X.access(e, i);
                                    t || e.addEventListener(n, r, !0), X.access(e, i, (t || 0) + 1);
                                },
                                teardown: function () {
                                    var e = this.ownerDocument || this.document || this,
                                        t = X.access(e, i) - 1;
                                    t ? X.access(e, i, t) : (e.removeEventListener(n, r, !0), X.remove(e, i));
                                },
                            };
                        });
                var jt = E.location,
                    Ot = { guid: Date.now() },
                    Lt = /\?/;
                C.parseXML = function (e) {
                    var t;
                    if (!e || "string" != typeof e) return null;
                    try {
                        t = new E.DOMParser().parseFromString(e, "text/xml");
                    } catch (e) {
                        t = void 0;
                    }
                    return (t && !t.getElementsByTagName("parsererror").length) || C.error("Invalid XML: " + e), t;
                };
                var Pt = /\[\]$/,
                    It = /\r?\n/g,
                    Ft = /^(?:submit|button|image|reset|file)$/i,
                    qt = /^(?:input|select|textarea|keygen)/i;
                function Ht(n, e, i, r) {
                    var t;
                    if (Array.isArray(e))
                        C.each(e, function (e, t) {
                            i || Pt.test(n) ? r(n, t) : Ht(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, i, r);
                        });
                    else if (i || "object" !== w(e)) r(n, e);
                    else for (t in e) Ht(n + "[" + t + "]", e[t], i, r);
                }
                (C.param = function (e, t) {
                    function n(e, t) {
                        var n = b(t) ? t() : t;
                        r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
                    }
                    var i,
                        r = [];
                    if (null == e) return "";
                    if (Array.isArray(e) || (e.jquery && !C.isPlainObject(e)))
                        C.each(e, function () {
                            n(this.name, this.value);
                        });
                    else for (i in e) Ht(i, e[i], t, n);
                    return r.join("&");
                }),
                    C.fn.extend({
                        serialize: function () {
                            return C.param(this.serializeArray());
                        },
                        serializeArray: function () {
                            return this.map(function () {
                                var e = C.prop(this, "elements");
                                return e ? C.makeArray(e) : this;
                            })
                                .filter(function () {
                                    var e = this.type;
                                    return this.name && !C(this).is(":disabled") && qt.test(this.nodeName) && !Ft.test(e) && (this.checked || !ce.test(e));
                                })
                                .map(function (e, t) {
                                    var n = C(this).val();
                                    return null == n
                                        ? null
                                        : Array.isArray(n)
                                        ? C.map(n, function (e) {
                                              return { name: t.name, value: e.replace(It, "\r\n") };
                                          })
                                        : { name: t.name, value: n.replace(It, "\r\n") };
                                })
                                .get();
                        },
                    });
                var Rt = /%20/g,
                    Mt = /#.*$/,
                    Bt = /([?&])_=[^&]*/,
                    Wt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                    Vt = /^(?:GET|HEAD)$/,
                    $t = /^\/\//,
                    Ut = {},
                    zt = {},
                    Qt = "*/".concat("*"),
                    Xt = T.createElement("a");
                function Yt(o) {
                    return function (e, t) {
                        "string" != typeof e && ((t = e), (e = "*"));
                        var n,
                            i = 0,
                            r = e.toLowerCase().match(P) || [];
                        if (b(t)) for (; (n = r[i++]); ) "+" === n[0] ? ((n = n.slice(1) || "*"), (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t);
                    };
                }
                function Kt(t, r, o, a) {
                    var s = {},
                        l = t === zt;
                    function u(e) {
                        var i;
                        return (
                            (s[e] = !0),
                            C.each(t[e] || [], function (e, t) {
                                var n = t(r, o, a);
                                return "string" != typeof n || l || s[n] ? (l ? !(i = n) : void 0) : (r.dataTypes.unshift(n), u(n), !1);
                            }),
                            i
                        );
                    }
                    return u(r.dataTypes[0]) || (!s["*"] && u("*"));
                }
                function Gt(e, t) {
                    var n,
                        i,
                        r = C.ajaxSettings.flatOptions || {};
                    for (n in t) void 0 !== t[n] && ((r[n] ? e : (i = i || {}))[n] = t[n]);
                    return i && C.extend(!0, e, i), e;
                }
                (Xt.href = jt.href),
                    C.extend({
                        active: 0,
                        lastModified: {},
                        etag: {},
                        ajaxSettings: {
                            url: jt.href,
                            type: "GET",
                            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(jt.protocol),
                            global: !0,
                            processData: !0,
                            async: !0,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            accepts: { "*": Qt, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                            contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                            responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                            converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": C.parseXML },
                            flatOptions: { url: !0, context: !0 },
                        },
                        ajaxSetup: function (e, t) {
                            return t ? Gt(Gt(e, C.ajaxSettings), t) : Gt(C.ajaxSettings, e);
                        },
                        ajaxPrefilter: Yt(Ut),
                        ajaxTransport: Yt(zt),
                        ajax: function (e, t) {
                            "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
                            var f,
                                c,
                                d,
                                n,
                                h,
                                i,
                                p,
                                g,
                                r,
                                o,
                                m = C.ajaxSetup({}, t),
                                v = m.context || m,
                                y = m.context && (v.nodeType || v.jquery) ? C(v) : C.event,
                                b = C.Deferred(),
                                _ = C.Callbacks("once memory"),
                                w = m.statusCode || {},
                                a = {},
                                s = {},
                                l = "canceled",
                                x = {
                                    readyState: 0,
                                    getResponseHeader: function (e) {
                                        var t;
                                        if (p) {
                                            if (!n) for (n = {}; (t = Wt.exec(d)); ) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                            t = n[e.toLowerCase() + " "];
                                        }
                                        return null == t ? null : t.join(", ");
                                    },
                                    getAllResponseHeaders: function () {
                                        return p ? d : null;
                                    },
                                    setRequestHeader: function (e, t) {
                                        return null == p && ((e = s[e.toLowerCase()] = s[e.toLowerCase()] || e), (a[e] = t)), this;
                                    },
                                    overrideMimeType: function (e) {
                                        return null == p && (m.mimeType = e), this;
                                    },
                                    statusCode: function (e) {
                                        var t;
                                        if (e)
                                            if (p) x.always(e[x.status]);
                                            else for (t in e) w[t] = [w[t], e[t]];
                                        return this;
                                    },
                                    abort: function (e) {
                                        var t = e || l;
                                        return f && f.abort(t), u(0, t), this;
                                    },
                                };
                            if (
                                (b.promise(x),
                                (m.url = ((e || m.url || jt.href) + "").replace($t, jt.protocol + "//")),
                                (m.type = t.method || t.type || m.method || m.type),
                                (m.dataTypes = (m.dataType || "*").toLowerCase().match(P) || [""]),
                                null == m.crossDomain)
                            ) {
                                i = T.createElement("a");
                                try {
                                    (i.href = m.url), (i.href = i.href), (m.crossDomain = Xt.protocol + "//" + Xt.host != i.protocol + "//" + i.host);
                                } catch (e) {
                                    m.crossDomain = !0;
                                }
                            }
                            if ((m.data && m.processData && "string" != typeof m.data && (m.data = C.param(m.data, m.traditional)), Kt(Ut, m, t, x), p)) return x;
                            for (r in ((g = C.event && m.global) && 0 == C.active++ && C.event.trigger("ajaxStart"),
                            (m.type = m.type.toUpperCase()),
                            (m.hasContent = !Vt.test(m.type)),
                            (c = m.url.replace(Mt, "")),
                            m.hasContent
                                ? m.data && m.processData && 0 === (m.contentType || "").indexOf("application/x-www-form-urlencoded") && (m.data = m.data.replace(Rt, "+"))
                                : ((o = m.url.slice(c.length)),
                                  m.data && (m.processData || "string" == typeof m.data) && ((c += (Lt.test(c) ? "&" : "?") + m.data), delete m.data),
                                  !1 === m.cache && ((c = c.replace(Bt, "$1")), (o = (Lt.test(c) ? "&" : "?") + "_=" + Ot.guid++ + o)),
                                  (m.url = c + o)),
                            m.ifModified && (C.lastModified[c] && x.setRequestHeader("If-Modified-Since", C.lastModified[c]), C.etag[c] && x.setRequestHeader("If-None-Match", C.etag[c])),
                            ((m.data && m.hasContent && !1 !== m.contentType) || t.contentType) && x.setRequestHeader("Content-Type", m.contentType),
                            x.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Qt + "; q=0.01" : "") : m.accepts["*"]),
                            m.headers))
                                x.setRequestHeader(r, m.headers[r]);
                            if (m.beforeSend && (!1 === m.beforeSend.call(v, x, m) || p)) return x.abort();
                            if (((l = "abort"), _.add(m.complete), x.done(m.success), x.fail(m.error), (f = Kt(zt, m, t, x)))) {
                                if (((x.readyState = 1), g && y.trigger("ajaxSend", [x, m]), p)) return x;
                                m.async &&
                                    0 < m.timeout &&
                                    (h = E.setTimeout(function () {
                                        x.abort("timeout");
                                    }, m.timeout));
                                try {
                                    (p = !1), f.send(a, u);
                                } catch (e) {
                                    if (p) throw e;
                                    u(-1, e);
                                }
                            } else u(-1, "No Transport");
                            function u(e, t, n, i) {
                                var r,
                                    o,
                                    a,
                                    s,
                                    l,
                                    u = t;
                                p ||
                                    ((p = !0),
                                    h && E.clearTimeout(h),
                                    (f = void 0),
                                    (d = i || ""),
                                    (x.readyState = 0 < e ? 4 : 0),
                                    (r = (200 <= e && e < 300) || 304 === e),
                                    n &&
                                        (s = (function (e, t, n) {
                                            for (var i, r, o, a, s = e.contents, l = e.dataTypes; "*" === l[0]; ) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                                            if (i)
                                                for (r in s)
                                                    if (s[r] && s[r].test(i)) {
                                                        l.unshift(r);
                                                        break;
                                                    }
                                            if (l[0] in n) o = l[0];
                                            else {
                                                for (r in n) {
                                                    if (!l[0] || e.converters[r + " " + l[0]]) {
                                                        o = r;
                                                        break;
                                                    }
                                                    a = a || r;
                                                }
                                                o = o || a;
                                            }
                                            if (o) return o !== l[0] && l.unshift(o), n[o];
                                        })(m, x, n)),
                                    !r && -1 < C.inArray("script", m.dataTypes) && (m.converters["text script"] = function () {}),
                                    (s = (function (e, t, n, i) {
                                        var r,
                                            o,
                                            a,
                                            s,
                                            l,
                                            u = {},
                                            f = e.dataTypes.slice();
                                        if (f[1]) for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
                                        for (o = f.shift(); o; )
                                            if ((e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), (l = o), (o = f.shift())))
                                                if ("*" === o) o = l;
                                                else if ("*" !== l && l !== o) {
                                                    if (!(a = u[l + " " + o] || u["* " + o]))
                                                        for (r in u)
                                                            if ((s = r.split(" "))[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                                                                !0 === a ? (a = u[r]) : !0 !== u[r] && ((o = s[0]), f.unshift(s[1]));
                                                                break;
                                                            }
                                                    if (!0 !== a)
                                                        if (a && e.throws) t = a(t);
                                                        else
                                                            try {
                                                                t = a(t);
                                                            } catch (e) {
                                                                return { state: "parsererror", error: a ? e : "No conversion from " + l + " to " + o };
                                                            }
                                                }
                                        return { state: "success", data: t };
                                    })(m, s, x, r)),
                                    r
                                        ? (m.ifModified && ((l = x.getResponseHeader("Last-Modified")) && (C.lastModified[c] = l), (l = x.getResponseHeader("etag")) && (C.etag[c] = l)),
                                          204 === e || "HEAD" === m.type ? (u = "nocontent") : 304 === e ? (u = "notmodified") : ((u = s.state), (o = s.data), (r = !(a = s.error))))
                                        : ((a = u), (!e && u) || ((u = "error"), e < 0 && (e = 0))),
                                    (x.status = e),
                                    (x.statusText = (t || u) + ""),
                                    r ? b.resolveWith(v, [o, u, x]) : b.rejectWith(v, [x, u, a]),
                                    x.statusCode(w),
                                    (w = void 0),
                                    g && y.trigger(r ? "ajaxSuccess" : "ajaxError", [x, m, r ? o : a]),
                                    _.fireWith(v, [x, u]),
                                    g && (y.trigger("ajaxComplete", [x, m]), --C.active || C.event.trigger("ajaxStop")));
                            }
                            return x;
                        },
                        getJSON: function (e, t, n) {
                            return C.get(e, t, n, "json");
                        },
                        getScript: function (e, t) {
                            return C.get(e, void 0, t, "script");
                        },
                    }),
                    C.each(["get", "post"], function (e, r) {
                        C[r] = function (e, t, n, i) {
                            return b(t) && ((i = i || n), (n = t), (t = void 0)), C.ajax(C.extend({ url: e, type: r, dataType: i, data: t, success: n }, C.isPlainObject(e) && e));
                        };
                    }),
                    C.ajaxPrefilter(function (e) {
                        var t;
                        for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
                    }),
                    (C._evalUrl = function (e, t, n) {
                        return C.ajax({
                            url: e,
                            type: "GET",
                            dataType: "script",
                            cache: !0,
                            async: !1,
                            global: !1,
                            converters: { "text script": function () {} },
                            dataFilter: function (e) {
                                C.globalEval(e, t, n);
                            },
                        });
                    }),
                    C.fn.extend({
                        wrapAll: function (e) {
                            var t;
                            return (
                                this[0] &&
                                    (b(e) && (e = e.call(this[0])),
                                    (t = C(e, this[0].ownerDocument).eq(0).clone(!0)),
                                    this[0].parentNode && t.insertBefore(this[0]),
                                    t
                                        .map(function () {
                                            for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                                            return e;
                                        })
                                        .append(this)),
                                this
                            );
                        },
                        wrapInner: function (n) {
                            return b(n)
                                ? this.each(function (e) {
                                      C(this).wrapInner(n.call(this, e));
                                  })
                                : this.each(function () {
                                      var e = C(this),
                                          t = e.contents();
                                      t.length ? t.wrapAll(n) : e.append(n);
                                  });
                        },
                        wrap: function (t) {
                            var n = b(t);
                            return this.each(function (e) {
                                C(this).wrapAll(n ? t.call(this, e) : t);
                            });
                        },
                        unwrap: function (e) {
                            return (
                                this.parent(e)
                                    .not("body")
                                    .each(function () {
                                        C(this).replaceWith(this.childNodes);
                                    }),
                                this
                            );
                        },
                    }),
                    (C.expr.pseudos.hidden = function (e) {
                        return !C.expr.pseudos.visible(e);
                    }),
                    (C.expr.pseudos.visible = function (e) {
                        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
                    }),
                    (C.ajaxSettings.xhr = function () {
                        try {
                            return new E.XMLHttpRequest();
                        } catch (e) {}
                    });
                var Jt = { 0: 200, 1223: 204 },
                    Zt = C.ajaxSettings.xhr();
                (y.cors = !!Zt && "withCredentials" in Zt),
                    (y.ajax = Zt = !!Zt),
                    C.ajaxTransport(function (r) {
                        var o, a;
                        if (y.cors || (Zt && !r.crossDomain))
                            return {
                                send: function (e, t) {
                                    var n,
                                        i = r.xhr();
                                    if ((i.open(r.type, r.url, r.async, r.username, r.password), r.xhrFields)) for (n in r.xhrFields) i[n] = r.xhrFields[n];
                                    for (n in (r.mimeType && i.overrideMimeType && i.overrideMimeType(r.mimeType), r.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e)) i.setRequestHeader(n, e[n]);
                                    (o = function (e) {
                                        return function () {
                                            o &&
                                                ((o = a = i.onload = i.onerror = i.onabort = i.ontimeout = i.onreadystatechange = null),
                                                "abort" === e
                                                    ? i.abort()
                                                    : "error" === e
                                                    ? "number" != typeof i.status
                                                        ? t(0, "error")
                                                        : t(i.status, i.statusText)
                                                    : t(
                                                          Jt[i.status] || i.status,
                                                          i.statusText,
                                                          "text" !== (i.responseType || "text") || "string" != typeof i.responseText ? { binary: i.response } : { text: i.responseText },
                                                          i.getAllResponseHeaders()
                                                      ));
                                        };
                                    }),
                                        (i.onload = o()),
                                        (a = i.onerror = i.ontimeout = o("error")),
                                        void 0 !== i.onabort
                                            ? (i.onabort = a)
                                            : (i.onreadystatechange = function () {
                                                  4 === i.readyState &&
                                                      E.setTimeout(function () {
                                                          o && a();
                                                      });
                                              }),
                                        (o = o("abort"));
                                    try {
                                        i.send((r.hasContent && r.data) || null);
                                    } catch (e) {
                                        if (o) throw e;
                                    }
                                },
                                abort: function () {
                                    o && o();
                                },
                            };
                    }),
                    C.ajaxPrefilter(function (e) {
                        e.crossDomain && (e.contents.script = !1);
                    }),
                    C.ajaxSetup({
                        accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
                        contents: { script: /\b(?:java|ecma)script\b/ },
                        converters: {
                            "text script": function (e) {
                                return C.globalEval(e), e;
                            },
                        },
                    }),
                    C.ajaxPrefilter("script", function (e) {
                        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
                    }),
                    C.ajaxTransport("script", function (n) {
                        var i, r;
                        if (n.crossDomain || n.scriptAttrs)
                            return {
                                send: function (e, t) {
                                    (i = C("<script>")
                                        .attr(n.scriptAttrs || {})
                                        .prop({ charset: n.scriptCharset, src: n.url })
                                        .on(
                                            "load error",
                                            (r = function (e) {
                                                i.remove(), (r = null), e && t("error" === e.type ? 404 : 200, e.type);
                                            })
                                        )),
                                        T.head.appendChild(i[0]);
                                },
                                abort: function () {
                                    r && r();
                                },
                            };
                    });
                var en,
                    tn = [],
                    nn = /(=)\?(?=&|$)|\?\?/;
                C.ajaxSetup({
                    jsonp: "callback",
                    jsonpCallback: function () {
                        var e = tn.pop() || C.expando + "_" + Ot.guid++;
                        return (this[e] = !0), e;
                    },
                }),
                    C.ajaxPrefilter("json jsonp", function (e, t, n) {
                        var i,
                            r,
                            o,
                            a = !1 !== e.jsonp && (nn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && nn.test(e.data) && "data");
                        if (a || "jsonp" === e.dataTypes[0])
                            return (
                                (i = e.jsonpCallback = b(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
                                a ? (e[a] = e[a].replace(nn, "$1" + i)) : !1 !== e.jsonp && (e.url += (Lt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i),
                                (e.converters["script json"] = function () {
                                    return o || C.error(i + " was not called"), o[0];
                                }),
                                (e.dataTypes[0] = "json"),
                                (r = E[i]),
                                (E[i] = function () {
                                    o = arguments;
                                }),
                                n.always(function () {
                                    void 0 === r ? C(E).removeProp(i) : (E[i] = r), e[i] && ((e.jsonpCallback = t.jsonpCallback), tn.push(i)), o && b(r) && r(o[0]), (o = r = void 0);
                                }),
                                "script"
                            );
                    }),
                    (y.createHTMLDocument = (((en = T.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>"), 2 === en.childNodes.length)),
                    (C.parseHTML = function (e, t, n) {
                        return "string" != typeof e
                            ? []
                            : ("boolean" == typeof t && ((n = t), (t = !1)),
                              t || (y.createHTMLDocument ? (((i = (t = T.implementation.createHTMLDocument("")).createElement("base")).href = T.location.href), t.head.appendChild(i)) : (t = T)),
                              (o = !n && []),
                              (r = k.exec(e)) ? [t.createElement(r[1])] : ((r = ye([e], t, o)), o && o.length && C(o).remove(), C.merge([], r.childNodes)));
                        var i, r, o;
                    }),
                    (C.fn.load = function (e, t, n) {
                        var i,
                            r,
                            o,
                            a = this,
                            s = e.indexOf(" ");
                        return (
                            -1 < s && ((i = Ct(e.slice(s))), (e = e.slice(0, s))),
                            b(t) ? ((n = t), (t = void 0)) : t && "object" == typeof t && (r = "POST"),
                            0 < a.length &&
                                C.ajax({ url: e, type: r || "GET", dataType: "html", data: t })
                                    .done(function (e) {
                                        (o = arguments), a.html(i ? C("<div>").append(C.parseHTML(e)).find(i) : e);
                                    })
                                    .always(
                                        n &&
                                            function (e, t) {
                                                a.each(function () {
                                                    n.apply(this, o || [e.responseText, t, e]);
                                                });
                                            }
                                    ),
                            this
                        );
                    }),
                    (C.expr.pseudos.animated = function (t) {
                        return C.grep(C.timers, function (e) {
                            return t === e.elem;
                        }).length;
                    }),
                    (C.offset = {
                        setOffset: function (e, t, n) {
                            var i,
                                r,
                                o,
                                a,
                                s,
                                l,
                                u = C.css(e, "position"),
                                f = C(e),
                                c = {};
                            "static" === u && (e.style.position = "relative"),
                                (s = f.offset()),
                                (o = C.css(e, "top")),
                                (l = C.css(e, "left")),
                                (r = ("absolute" === u || "fixed" === u) && -1 < (o + l).indexOf("auto") ? ((a = (i = f.position()).top), i.left) : ((a = parseFloat(o) || 0), parseFloat(l) || 0)),
                                b(t) && (t = t.call(e, n, C.extend({}, s))),
                                null != t.top && (c.top = t.top - s.top + a),
                                null != t.left && (c.left = t.left - s.left + r),
                                "using" in t ? t.using.call(e, c) : ("number" == typeof c.top && (c.top += "px"), "number" == typeof c.left && (c.left += "px"), f.css(c));
                        },
                    }),
                    C.fn.extend({
                        offset: function (t) {
                            if (arguments.length)
                                return void 0 === t
                                    ? this
                                    : this.each(function (e) {
                                          C.offset.setOffset(this, t, e);
                                      });
                            var e,
                                n,
                                i = this[0];
                            return i ? (i.getClientRects().length ? ((e = i.getBoundingClientRect()), (n = i.ownerDocument.defaultView), { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset }) : { top: 0, left: 0 }) : void 0;
                        },
                        position: function () {
                            if (this[0]) {
                                var e,
                                    t,
                                    n,
                                    i = this[0],
                                    r = { top: 0, left: 0 };
                                if ("fixed" === C.css(i, "position")) t = i.getBoundingClientRect();
                                else {
                                    for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === C.css(e, "position"); ) e = e.parentNode;
                                    e && e !== i && 1 === e.nodeType && (((r = C(e).offset()).top += C.css(e, "borderTopWidth", !0)), (r.left += C.css(e, "borderLeftWidth", !0)));
                                }
                                return { top: t.top - r.top - C.css(i, "marginTop", !0), left: t.left - r.left - C.css(i, "marginLeft", !0) };
                            }
                        },
                        offsetParent: function () {
                            return this.map(function () {
                                for (var e = this.offsetParent; e && "static" === C.css(e, "position"); ) e = e.offsetParent;
                                return e || ne;
                            });
                        },
                    }),
                    C.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, r) {
                        var o = "pageYOffset" === r;
                        C.fn[t] = function (e) {
                            return B(
                                this,
                                function (e, t, n) {
                                    var i;
                                    if ((g(e) ? (i = e) : 9 === e.nodeType && (i = e.defaultView), void 0 === n)) return i ? i[r] : e[t];
                                    i ? i.scrollTo(o ? i.pageXOffset : n, o ? n : i.pageYOffset) : (e[t] = n);
                                },
                                t,
                                e,
                                arguments.length
                            );
                        };
                    }),
                    C.each(["top", "left"], function (e, n) {
                        C.cssHooks[n] = Ge(y.pixelPosition, function (e, t) {
                            if (t) return (t = Ke(e, n)), Ue.test(t) ? C(e).position()[n] + "px" : t;
                        });
                    }),
                    C.each({ Height: "height", Width: "width" }, function (a, s) {
                        C.each({ padding: "inner" + a, content: s, "": "outer" + a }, function (i, o) {
                            C.fn[o] = function (e, t) {
                                var n = arguments.length && (i || "boolean" != typeof e),
                                    r = i || (!0 === e || !0 === t ? "margin" : "border");
                                return B(
                                    this,
                                    function (e, t, n) {
                                        var i;
                                        return g(e)
                                            ? 0 === o.indexOf("outer")
                                                ? e["inner" + a]
                                                : e.document.documentElement["client" + a]
                                            : 9 === e.nodeType
                                            ? ((i = e.documentElement), Math.max(e.body["scroll" + a], i["scroll" + a], e.body["offset" + a], i["offset" + a], i["client" + a]))
                                            : void 0 === n
                                            ? C.css(e, t, r)
                                            : C.style(e, t, n, r);
                                    },
                                    s,
                                    n ? e : void 0,
                                    n
                                );
                            };
                        });
                    }),
                    C.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
                        C.fn[t] = function (e) {
                            return this.on(t, e);
                        };
                    }),
                    C.fn.extend({
                        bind: function (e, t, n) {
                            return this.on(e, null, t, n);
                        },
                        unbind: function (e, t) {
                            return this.off(e, null, t);
                        },
                        delegate: function (e, t, n, i) {
                            return this.on(t, e, n, i);
                        },
                        undelegate: function (e, t, n) {
                            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
                        },
                        hover: function (e, t) {
                            return this.mouseenter(e).mouseleave(t || e);
                        },
                    }),
                    C.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) {
                        C.fn[n] = function (e, t) {
                            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
                        };
                    });
                var rn = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                (C.proxy = function (e, t) {
                    var n, i, r;
                    if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), b(e)))
                        return (
                            (i = s.call(arguments, 2)),
                            ((r = function () {
                                return e.apply(t || this, i.concat(s.call(arguments)));
                            }).guid = e.guid = e.guid || C.guid++),
                            r
                        );
                }),
                    (C.holdReady = function (e) {
                        e ? C.readyWait++ : C.ready(!0);
                    }),
                    (C.isArray = Array.isArray),
                    (C.parseJSON = JSON.parse),
                    (C.nodeName = S),
                    (C.isFunction = b),
                    (C.isWindow = g),
                    (C.camelCase = U),
                    (C.type = w),
                    (C.now = Date.now),
                    (C.isNumeric = function (e) {
                        var t = C.type(e);
                        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
                    }),
                    (C.trim = function (e) {
                        return null == e ? "" : (e + "").replace(rn, "");
                    });
                var on = E.jQuery,
                    an = E.$;
                return (
                    (C.noConflict = function (e) {
                        return E.$ === C && (E.$ = an), e && E.jQuery === C && (E.jQuery = on), C;
                    }),
                    void 0 === e && (E.jQuery = E.$ = C),
                    C
                );
            }),
            (e.exports = t.document
                ? n(t, !0)
                : function (e) {
                      if (!e.document) throw new Error("jQuery requires a window with a document");
                      return n(e);
                  });
    });
    window.jQuery = r;
    var a = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
        s = (function () {
            for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1) if (a && 0 <= navigator.userAgent.indexOf(e[t])) return 1;
            return 0;
        })();
    var l =
        a && window.Promise
            ? function (e) {
                  var t = !1;
                  return function () {
                      t ||
                          ((t = !0),
                          window.Promise.resolve().then(function () {
                              (t = !1), e();
                          }));
                  };
              }
            : function (e) {
                  var t = !1;
                  return function () {
                      t ||
                          ((t = !0),
                          setTimeout(function () {
                              (t = !1), e();
                          }, s));
                  };
              };
    function u(e) {
        return e && "[object Function]" === {}.toString.call(e);
    }
    function _(e, t) {
        if (1 !== e.nodeType) return [];
        var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
        return t ? n[t] : n;
    }
    function p(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host;
    }
    function g(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case "HTML":
            case "BODY":
                return e.ownerDocument.body;
            case "#document":
                return e.body;
        }
        var t = _(e),
            n = t.overflow,
            i = t.overflowX,
            r = t.overflowY;
        return /(auto|scroll|overlay)/.test(n + r + i) ? e : g(p(e));
    }
    function m(e) {
        return e && e.referenceNode ? e.referenceNode : e;
    }
    var f = a && !(!window.MSInputMethodContext || !document.documentMode),
        c = a && /MSIE 10/.test(navigator.userAgent);
    function v(e) {
        return 11 === e ? f : 10 === e ? c : f || c;
    }
    function b(e) {
        if (!e) return document.documentElement;
        for (var t = v(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling; ) n = (e = e.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && "BODY" !== i && "HTML" !== i ? (-1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === _(n, "position") ? b(n) : n) : e ? e.ownerDocument.documentElement : document.documentElement;
    }
    function d(e) {
        return null !== e.parentNode ? d(e.parentNode) : e;
    }
    function y(e, t) {
        if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
        var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? e : t,
            r = n ? t : e,
            o = document.createRange();
        o.setStart(i, 0), o.setEnd(r, 0);
        var a,
            s,
            l = o.commonAncestorContainer;
        if ((e !== l && t !== l) || i.contains(r)) return "BODY" === (s = (a = l).nodeName) || ("HTML" !== s && b(a.firstElementChild) !== a) ? b(l) : l;
        var u = d(e);
        return u.host ? y(u.host, t) : y(e, d(t).host);
    }
    function w(e, t) {
        var n = "top" === (1 < arguments.length && void 0 !== t ? t : "top") ? "scrollTop" : "scrollLeft",
            i = e.nodeName;
        if ("BODY" !== i && "HTML" !== i) return e[n];
        var r = e.ownerDocument.documentElement;
        return (e.ownerDocument.scrollingElement || r)[n];
    }
    function h(e, t) {
        var n = "x" === t ? "Left" : "Top",
            i = "Left" == n ? "Right" : "Bottom";
        return parseFloat(e["border" + n + "Width"]) + parseFloat(e["border" + i + "Width"]);
    }
    function x(e, t, n, i) {
        return Math.max(
            t["offset" + e],
            t["scroll" + e],
            n["client" + e],
            n["offset" + e],
            n["scroll" + e],
            v(10) ? parseInt(n["offset" + e]) + parseInt(i["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0
        );
    }
    function E(e) {
        var t = e.body,
            n = e.documentElement,
            i = v(10) && getComputedStyle(n);
        return { height: x("Height", t, n, i), width: x("Width", t, n, i) };
    }
    var T = function (e, t, n) {
        return t && C(e.prototype, t), n && C(e, n), e;
    };
    function C(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            (i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
    }
    function S(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
    }
    var k =
        Object.assign ||
        function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
            }
            return e;
        };
    function A(e) {
        return k({}, e, { right: e.left + e.width, bottom: e.top + e.height });
    }
    function D(e) {
        var t = {};
        try {
            if (v(10)) {
                t = e.getBoundingClientRect();
                var n = w(e, "top"),
                    i = w(e, "left");
                (t.top += n), (t.left += i), (t.bottom += n), (t.right += i);
            } else t = e.getBoundingClientRect();
        } catch (e) {}
        var r = { left: t.left, top: t.top, width: t.right - t.left, height: t.bottom - t.top },
            o = "HTML" === e.nodeName ? E(e.ownerDocument) : {},
            a = o.width || e.clientWidth || r.width,
            s = o.height || e.clientHeight || r.height,
            l = e.offsetWidth - a,
            u = e.offsetHeight - s;
        if (l || u) {
            var f = _(e);
            (l -= h(f, "x")), (u -= h(f, "y")), (r.width -= l), (r.height -= u);
        }
        return A(r);
    }
    function N(e, t, n) {
        var i = 2 < arguments.length && void 0 !== n && n,
            r = v(10),
            o = "HTML" === t.nodeName,
            a = D(e),
            s = D(t),
            l = g(e),
            u = _(t),
            f = parseFloat(u.borderTopWidth),
            c = parseFloat(u.borderLeftWidth);
        i && o && ((s.top = Math.max(s.top, 0)), (s.left = Math.max(s.left, 0)));
        var d = A({ top: a.top - s.top - f, left: a.left - s.left - c, width: a.width, height: a.height });
        if (((d.marginTop = 0), (d.marginLeft = 0), !r && o)) {
            var h = parseFloat(u.marginTop),
                p = parseFloat(u.marginLeft);
            (d.top -= f - h), (d.bottom -= f - h), (d.left -= c - p), (d.right -= c - p), (d.marginTop = h), (d.marginLeft = p);
        }
        return (
            (r && !i ? t.contains(l) : t === l && "BODY" !== l.nodeName) &&
                (d = (function (e, t, n) {
                    var i = 2 < arguments.length && void 0 !== n && n,
                        r = w(t, "top"),
                        o = w(t, "left"),
                        a = i ? -1 : 1;
                    return (e.top += r * a), (e.bottom += r * a), (e.left += o * a), (e.right += o * a), e;
                })(d, t)),
            d
        );
    }
    function j(e) {
        if (!e || !e.parentElement || v()) return document.documentElement;
        for (var t = e.parentElement; t && "none" === _(t, "transform"); ) t = t.parentElement;
        return t || document.documentElement;
    }
    function O(e, t, n, i, r) {
        var o = 4 < arguments.length && void 0 !== r && r,
            a = { top: 0, left: 0 },
            s = o ? j(e) : y(e, m(t));
        if ("viewport" === i)
            a = (function (e, t) {
                var n = 1 < arguments.length && void 0 !== t && t,
                    i = e.ownerDocument.documentElement,
                    r = N(e, i),
                    o = Math.max(i.clientWidth, window.innerWidth || 0),
                    a = Math.max(i.clientHeight, window.innerHeight || 0),
                    s = n ? 0 : w(i),
                    l = n ? 0 : w(i, "left");
                return A({ top: s - r.top + r.marginTop, left: l - r.left + r.marginLeft, width: o, height: a });
            })(s, o);
        else {
            var l = void 0;
            "scrollParent" === i ? "BODY" === (l = g(p(t))).nodeName && (l = e.ownerDocument.documentElement) : (l = "window" === i ? e.ownerDocument.documentElement : i);
            var u = N(l, s, o);
            if (
                "HTML" !== l.nodeName ||
                (function e(t) {
                    var n = t.nodeName;
                    if ("BODY" === n || "HTML" === n) return !1;
                    if ("fixed" === _(t, "position")) return !0;
                    var i = p(t);
                    return !!i && e(i);
                })(s)
            )
                a = u;
            else {
                var f = E(e.ownerDocument),
                    c = f.height,
                    d = f.width;
                (a.top += u.top - u.marginTop), (a.bottom = c + u.top), (a.left += u.left - u.marginLeft), (a.right = d + u.left);
            }
        }
        var h = "number" == typeof (n = n || 0);
        return (a.left += h ? n : n.left || 0), (a.top += h ? n : n.top || 0), (a.right -= h ? n : n.right || 0), (a.bottom -= h ? n : n.bottom || 0), a;
    }
    function L(e, t, i, n, r, o) {
        var a = 5 < arguments.length && void 0 !== o ? o : 0;
        if (-1 === e.indexOf("auto")) return e;
        var s = O(i, n, a, r),
            l = { top: { width: s.width, height: t.top - s.top }, right: { width: s.right - t.right, height: s.height }, bottom: { width: s.width, height: s.bottom - t.bottom }, left: { width: t.left - s.left, height: s.height } },
            u = Object.keys(l)
                .map(function (e) {
                    return k({ key: e }, l[e], { area: (t = l[e]).width * t.height });
                    var t;
                })
                .sort(function (e, t) {
                    return t.area - e.area;
                }),
            f = u.filter(function (e) {
                var t = e.width,
                    n = e.height;
                return t >= i.clientWidth && n >= i.clientHeight;
            }),
            c = 0 < f.length ? f[0].key : u[0].key,
            d = e.split("-")[1];
        return c + (d ? "-" + d : "");
    }
    function P(e, t, n, i) {
        var r = 3 < arguments.length && void 0 !== i ? i : null;
        return N(n, r ? j(t) : y(t, m(n)), r);
    }
    function I(e) {
        var t = e.ownerDocument.defaultView.getComputedStyle(e),
            n = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
            i = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
        return { width: e.offsetWidth + i, height: e.offsetHeight + n };
    }
    function F(e) {
        var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
        return e.replace(/left|right|bottom|top/g, function (e) {
            return t[e];
        });
    }
    function q(e, t, n) {
        n = n.split("-")[0];
        var i = I(e),
            r = { width: i.width, height: i.height },
            o = -1 !== ["right", "left"].indexOf(n),
            a = o ? "top" : "left",
            s = o ? "left" : "top",
            l = o ? "height" : "width",
            u = o ? "width" : "height";
        return (r[a] = t[a] + t[l] / 2 - i[l] / 2), (r[s] = n === s ? t[s] - i[u] : t[F(s)]), r;
    }
    function G(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0];
    }
    function J(e, n, t) {
        return (
            (void 0 === t
                ? e
                : e.slice(
                      0,
                      (function (e, t, n) {
                          if (Array.prototype.findIndex)
                              return e.findIndex(function (e) {
                                  return e[t] === n;
                              });
                          var i = G(e, function (e) {
                              return e[t] === n;
                          });
                          return e.indexOf(i);
                      })(e, "name", t)
                  )
            ).forEach(function (e) {
                e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                var t = e.function || e.fn;
                e.enabled && u(t) && ((n.offsets.popper = A(n.offsets.popper)), (n.offsets.reference = A(n.offsets.reference)), (n = t(n, e)));
            }),
            n
        );
    }
    function Z(e, n) {
        return e.some(function (e) {
            var t = e.name;
            return e.enabled && t === n;
        });
    }
    function ee(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), i = 0; i < t.length; i++) {
            var r = t[i],
                o = r ? "" + r + n : e;
            if (void 0 !== document.body.style[o]) return o;
        }
        return null;
    }
    function te(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window;
    }
    function ne(e, t, n, i) {
        (n.updateBound = i), te(e).addEventListener("resize", n.updateBound, { passive: !0 });
        var r = g(e);
        return (
            (function e(t, n, i, r) {
                var o = "BODY" === t.nodeName,
                    a = o ? t.ownerDocument.defaultView : t;
                a.addEventListener(n, i, { passive: !0 }), o || e(g(a.parentNode), n, i, r), r.push(a);
            })(r, "scroll", n.updateBound, n.scrollParents),
            (n.scrollElement = r),
            (n.eventsEnabled = !0),
            n
        );
    }
    function ie() {
        var e, t;
        this.state.eventsEnabled &&
            (cancelAnimationFrame(this.scheduleUpdate),
            (this.state =
                ((e = this.reference),
                (t = this.state),
                te(e).removeEventListener("resize", t.updateBound),
                t.scrollParents.forEach(function (e) {
                    e.removeEventListener("scroll", t.updateBound);
                }),
                (t.updateBound = null),
                (t.scrollParents = []),
                (t.scrollElement = null),
                (t.eventsEnabled = !1),
                t)));
    }
    function re(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
    }
    function oe(n, i) {
        Object.keys(i).forEach(function (e) {
            var t = "";
            -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(e) && re(i[e]) && (t = "px"), (n.style[e] = i[e] + t);
        });
    }
    function ae(e, t) {
        function n(e) {
            return e;
        }
        var i = e.offsets,
            r = i.popper,
            o = i.reference,
            a = Math.round,
            s = Math.floor,
            l = a(o.width),
            u = a(r.width),
            f = -1 !== ["left", "right"].indexOf(e.placement),
            c = -1 !== e.placement.indexOf("-"),
            d = t ? (f || c || l % 2 == u % 2 ? a : s) : n,
            h = t ? a : n;
        return { left: d(l % 2 == 1 && u % 2 == 1 && !c && t ? r.left - 1 : r.left), top: h(r.top), bottom: h(r.bottom), right: d(r.right) };
    }
    var se = a && /Firefox/i.test(navigator.userAgent);
    function le(e, t, n) {
        var i = G(e, function (e) {
                return e.name === t;
            }),
            r =
                !!i &&
                e.some(function (e) {
                    return e.name === n && e.enabled && e.order < i.order;
                });
        if (!r) {
            var o = "`" + t + "`",
                a = "`" + n + "`";
            console.warn(a + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!");
        }
        return r;
    }
    var ue = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        fe = ue.slice(3);
    function ce(e, t) {
        var n = 1 < arguments.length && void 0 !== t && t,
            i = fe.indexOf(e),
            r = fe.slice(i + 1).concat(fe.slice(0, i));
        return n ? r.reverse() : r;
    }
    var de = "flip",
        he = "clockwise",
        pe = "counterclockwise";
    function ge(e, r, o, t) {
        var a = [0, 0],
            s = -1 !== ["right", "left"].indexOf(t),
            n = e.split(/(\+|\-)/).map(function (e) {
                return e.trim();
            }),
            i = n.indexOf(
                G(n, function (e) {
                    return -1 !== e.search(/,|\s/);
                })
            );
        n[i] && -1 === n[i].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            u = -1 !== i ? [n.slice(0, i).concat([n[i].split(l)[0]]), [n[i].split(l)[1]].concat(n.slice(i + 1))] : [n];
        return (
            (u = u.map(function (e, t) {
                var n = (1 === t ? !s : s) ? "height" : "width",
                    i = !1;
                return e
                    .reduce(function (e, t) {
                        return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? ((e[e.length - 1] = t), (i = !0), e) : i ? ((e[e.length - 1] += t), (i = !1), e) : e.concat(t);
                    }, [])
                    .map(function (e) {
                        return (function (e, t, n, i) {
                            var r = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                o = +r[1],
                                a = r[2];
                            if (!o) return e;
                            if (0 !== a.indexOf("%"))
                                return "vh" !== a && "vw" !== a
                                    ? o
                                    : (("vh" === a ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100) * o;
                            var s = void 0;
                            switch (a) {
                                case "%p":
                                    s = n;
                                    break;
                                case "%":
                                case "%r":
                                default:
                                    s = i;
                            }
                            return (A(s)[t] / 100) * o;
                        })(e, n, r, o);
                    });
            })).forEach(function (n, i) {
                n.forEach(function (e, t) {
                    re(e) && (a[i] += e * ("-" === n[t - 1] ? -1 : 1));
                });
            }),
            a
        );
    }
    var me = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function () {},
            onUpdate: function () {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function (e) {
                        var t = e.placement,
                            n = t.split("-")[0],
                            i = t.split("-")[1];
                        if (i) {
                            var r = e.offsets,
                                o = r.reference,
                                a = r.popper,
                                s = -1 !== ["bottom", "top"].indexOf(n),
                                l = s ? "left" : "top",
                                u = s ? "width" : "height",
                                f = { start: S({}, l, o[l]), end: S({}, l, o[l] + o[u] - a[u]) };
                            e.offsets.popper = k({}, a, f[i]);
                        }
                        return e;
                    },
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: function (e, t) {
                        var n = t.offset,
                            i = e.placement,
                            r = e.offsets,
                            o = r.popper,
                            a = r.reference,
                            s = i.split("-")[0],
                            l = void 0;
                        return (
                            (l = re(+n) ? [+n, 0] : ge(n, o, a, s)),
                            "left" === s
                                ? ((o.top += l[0]), (o.left -= l[1]))
                                : "right" === s
                                ? ((o.top += l[0]), (o.left += l[1]))
                                : "top" === s
                                ? ((o.left += l[0]), (o.top -= l[1]))
                                : "bottom" === s && ((o.left += l[0]), (o.top += l[1])),
                            (e.popper = o),
                            e
                        );
                    },
                    offset: 0,
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function (e, i) {
                        var t = i.boundariesElement || b(e.instance.popper);
                        e.instance.reference === t && (t = b(t));
                        var n = ee("transform"),
                            r = e.instance.popper.style,
                            o = r.top,
                            a = r.left,
                            s = r[n];
                        (r.top = ""), (r.left = ""), (r[n] = "");
                        var l = O(e.instance.popper, e.instance.reference, i.padding, t, e.positionFixed);
                        (r.top = o), (r.left = a), (r[n] = s), (i.boundaries = l);
                        var u = i.priority,
                            f = e.offsets.popper,
                            c = {
                                primary: function (e) {
                                    var t = f[e];
                                    return f[e] < l[e] && !i.escapeWithReference && (t = Math.max(f[e], l[e])), S({}, e, t);
                                },
                                secondary: function (e) {
                                    var t = "right" === e ? "left" : "top",
                                        n = f[t];
                                    return f[e] > l[e] && !i.escapeWithReference && (n = Math.min(f[t], l[e] - ("right" === e ? f.width : f.height))), S({}, t, n);
                                },
                            };
                        return (
                            u.forEach(function (e) {
                                var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                                f = k({}, f, c[t](e));
                            }),
                            (e.offsets.popper = f),
                            e
                        );
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent",
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function (e) {
                        var t = e.offsets,
                            n = t.popper,
                            i = t.reference,
                            r = e.placement.split("-")[0],
                            o = Math.floor,
                            a = -1 !== ["top", "bottom"].indexOf(r),
                            s = a ? "right" : "bottom",
                            l = a ? "left" : "top",
                            u = a ? "width" : "height";
                        return n[s] < o(i[l]) && (e.offsets.popper[l] = o(i[l]) - n[u]), n[l] > o(i[s]) && (e.offsets.popper[l] = o(i[s])), e;
                    },
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function (e, t) {
                        var n;
                        if (!le(e.instance.modifiers, "arrow", "keepTogether")) return e;
                        var i = t.element;
                        if ("string" == typeof i) {
                            if (!(i = e.instance.popper.querySelector(i))) return e;
                        } else if (!e.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                        var r = e.placement.split("-")[0],
                            o = e.offsets,
                            a = o.popper,
                            s = o.reference,
                            l = -1 !== ["left", "right"].indexOf(r),
                            u = l ? "height" : "width",
                            f = l ? "Top" : "Left",
                            c = f.toLowerCase(),
                            d = l ? "left" : "top",
                            h = l ? "bottom" : "right",
                            p = I(i)[u];
                        s[h] - p < a[c] && (e.offsets.popper[c] -= a[c] - (s[h] - p)), s[c] + p > a[h] && (e.offsets.popper[c] += s[c] + p - a[h]), (e.offsets.popper = A(e.offsets.popper));
                        var g = s[c] + s[u] / 2 - p / 2,
                            m = _(e.instance.popper),
                            v = parseFloat(m["margin" + f]),
                            y = parseFloat(m["border" + f + "Width"]),
                            b = g - e.offsets.popper[c] - v - y;
                        return (b = Math.max(Math.min(a[u] - p, b), 0)), (e.arrowElement = i), (e.offsets.arrow = (S((n = {}), c, Math.round(b)), S(n, d, ""), n)), e;
                    },
                    element: "[x-arrow]",
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function (m, v) {
                        if (Z(m.instance.modifiers, "inner")) return m;
                        if (m.flipped && m.placement === m.originalPlacement) return m;
                        var y = O(m.instance.popper, m.instance.reference, v.padding, v.boundariesElement, m.positionFixed),
                            b = m.placement.split("-")[0],
                            _ = F(b),
                            w = m.placement.split("-")[1] || "",
                            x = [];
                        switch (v.behavior) {
                            case de:
                                x = [b, _];
                                break;
                            case he:
                                x = ce(b);
                                break;
                            case pe:
                                x = ce(b, !0);
                                break;
                            default:
                                x = v.behavior;
                        }
                        return (
                            x.forEach(function (e, t) {
                                if (b !== e || x.length === t + 1) return m;
                                (b = m.placement.split("-")[0]), (_ = F(b));
                                var n,
                                    i = m.offsets.popper,
                                    r = m.offsets.reference,
                                    o = Math.floor,
                                    a = ("left" === b && o(i.right) > o(r.left)) || ("right" === b && o(i.left) < o(r.right)) || ("top" === b && o(i.bottom) > o(r.top)) || ("bottom" === b && o(i.top) < o(r.bottom)),
                                    s = o(i.left) < o(y.left),
                                    l = o(i.right) > o(y.right),
                                    u = o(i.top) < o(y.top),
                                    f = o(i.bottom) > o(y.bottom),
                                    c = ("left" === b && s) || ("right" === b && l) || ("top" === b && u) || ("bottom" === b && f),
                                    d = -1 !== ["top", "bottom"].indexOf(b),
                                    h = !!v.flipVariations && ((d && "start" === w && s) || (d && "end" === w && l) || (!d && "start" === w && u) || (!d && "end" === w && f)),
                                    p = !!v.flipVariationsByContent && ((d && "start" === w && l) || (d && "end" === w && s) || (!d && "start" === w && f) || (!d && "end" === w && u)),
                                    g = h || p;
                                (a || c || g) &&
                                    ((m.flipped = !0),
                                    (a || c) && (b = x[t + 1]),
                                    g && (w = "end" === (n = w) ? "start" : "start" === n ? "end" : n),
                                    (m.placement = b + (w ? "-" + w : "")),
                                    (m.offsets.popper = k({}, m.offsets.popper, q(m.instance.popper, m.offsets.reference, m.placement))),
                                    (m = J(m.instance.modifiers, m, "flip")));
                            }),
                            m
                        );
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport",
                    flipVariations: !1,
                    flipVariationsByContent: !1,
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function (e) {
                        var t = e.placement,
                            n = t.split("-")[0],
                            i = e.offsets,
                            r = i.popper,
                            o = i.reference,
                            a = -1 !== ["left", "right"].indexOf(n),
                            s = -1 === ["top", "left"].indexOf(n);
                        return (r[a ? "left" : "top"] = o[n] - (s ? r[a ? "width" : "height"] : 0)), (e.placement = F(t)), (e.offsets.popper = A(r)), e;
                    },
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function (e) {
                        if (!le(e.instance.modifiers, "hide", "preventOverflow")) return e;
                        var t = e.offsets.reference,
                            n = G(e.instance.modifiers, function (e) {
                                return "preventOverflow" === e.name;
                            }).boundaries;
                        if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                            if (!0 === e.hide) return e;
                            (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
                        } else {
                            if (!1 === e.hide) return e;
                            (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
                        }
                        return e;
                    },
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function (e, t) {
                        var n = t.x,
                            i = t.y,
                            r = e.offsets.popper,
                            o = G(e.instance.modifiers, function (e) {
                                return "applyStyle" === e.name;
                            }).gpuAcceleration;
                        void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                        var a = void 0 !== o ? o : t.gpuAcceleration,
                            s = b(e.instance.popper),
                            l = D(s),
                            u = { position: r.position },
                            f = ae(e, window.devicePixelRatio < 2 || !se),
                            c = "bottom" === n ? "top" : "bottom",
                            d = "right" === i ? "left" : "right",
                            h = ee("transform"),
                            p = void 0,
                            g = void 0;
                        if (
                            ((g = "bottom" == c ? ("HTML" === s.nodeName ? -s.clientHeight + f.bottom : -l.height + f.bottom) : f.top),
                            (p = "right" == d ? ("HTML" === s.nodeName ? -s.clientWidth + f.right : -l.width + f.right) : f.left),
                            a && h)
                        )
                            (u[h] = "translate3d(" + p + "px, " + g + "px, 0)"), (u[c] = 0), (u[d] = 0), (u.willChange = "transform");
                        else {
                            var m = "bottom" == c ? -1 : 1,
                                v = "right" == d ? -1 : 1;
                            (u[c] = g * m), (u[d] = p * v), (u.willChange = c + ", " + d);
                        }
                        var y = { "x-placement": e.placement };
                        return (e.attributes = k({}, y, e.attributes)), (e.styles = k({}, u, e.styles)), (e.arrowStyles = k({}, e.offsets.arrow, e.arrowStyles)), e;
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right",
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function (e) {
                        var t, n;
                        return (
                            oe(e.instance.popper, e.styles),
                            (t = e.instance.popper),
                            (n = e.attributes),
                            Object.keys(n).forEach(function (e) {
                                !1 !== n[e] ? t.setAttribute(e, n[e]) : t.removeAttribute(e);
                            }),
                            e.arrowElement && Object.keys(e.arrowStyles).length && oe(e.arrowElement, e.arrowStyles),
                            e
                        );
                    },
                    onLoad: function (e, t, n, i, r) {
                        var o = P(r, t, e, n.positionFixed),
                            a = L(n.placement, o, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                        return t.setAttribute("x-placement", a), oe(t, { position: n.positionFixed ? "fixed" : "absolute" }), n;
                    },
                    gpuAcceleration: void 0,
                },
            },
        },
        ve =
            (T(ye, [
                {
                    key: "update",
                    value: function () {
                        return function () {
                            if (!this.state.isDestroyed) {
                                var e = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} };
                                (e.offsets.reference = P(this.state, this.popper, this.reference, this.options.positionFixed)),
                                    (e.placement = L(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding)),
                                    (e.originalPlacement = e.placement),
                                    (e.positionFixed = this.options.positionFixed),
                                    (e.offsets.popper = q(this.popper, e.offsets.reference, e.placement)),
                                    (e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute"),
                                    (e = J(this.modifiers, e)),
                                    this.state.isCreated ? this.options.onUpdate(e) : ((this.state.isCreated = !0), this.options.onCreate(e));
                            }
                        }.call(this);
                    },
                },
                {
                    key: "destroy",
                    value: function () {
                        return function () {
                            return (
                                (this.state.isDestroyed = !0),
                                Z(this.modifiers, "applyStyle") &&
                                    (this.popper.removeAttribute("x-placement"),
                                    (this.popper.style.position = ""),
                                    (this.popper.style.top = ""),
                                    (this.popper.style.left = ""),
                                    (this.popper.style.right = ""),
                                    (this.popper.style.bottom = ""),
                                    (this.popper.style.willChange = ""),
                                    (this.popper.style[ee("transform")] = "")),
                                this.disableEventListeners(),
                                this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
                                this
                            );
                        }.call(this);
                    },
                },
                {
                    key: "enableEventListeners",
                    value: function () {
                        return function () {
                            this.state.eventsEnabled || (this.state = ne(this.reference, this.options, this.state, this.scheduleUpdate));
                        }.call(this);
                    },
                },
                {
                    key: "disableEventListeners",
                    value: function () {
                        return ie.call(this);
                    },
                },
            ]),
            ye);
    function ye(e, t) {
        var n = this,
            i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        !(function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        })(this, ye),
            (this.scheduleUpdate = function () {
                return requestAnimationFrame(n.update);
            }),
            (this.update = l(this.update.bind(this))),
            (this.options = k({}, ye.Defaults, i)),
            (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
            (this.reference = e && e.jquery ? e[0] : e),
            (this.popper = t && t.jquery ? t[0] : t),
            (this.options.modifiers = {}),
            Object.keys(k({}, ye.Defaults.modifiers, i.modifiers)).forEach(function (e) {
                n.options.modifiers[e] = k({}, ye.Defaults.modifiers[e] || {}, i.modifiers ? i.modifiers[e] : {});
            }),
            (this.modifiers = Object.keys(this.options.modifiers)
                .map(function (e) {
                    return k({ name: e }, n.options.modifiers[e]);
                })
                .sort(function (e, t) {
                    return e.order - t.order;
                })),
            this.modifiers.forEach(function (e) {
                e.enabled && u(e.onLoad) && e.onLoad(n.reference, n.popper, n.options, e, n.state);
            }),
            this.update();
        var r = this.options.eventsEnabled;
        r && this.enableEventListeners(), (this.state.eventsEnabled = r);
    }
    (ve.Utils = ("undefined" != typeof window ? window : global).PopperUtils), (ve.placements = ue), (ve.Defaults = me);
    var be,
        _e = n(function (e, t) {
            !(function (e, t, n) {
                function i(e) {
                    return e && typeof e === "object" && "default" in e ? e : { default: e };
                }
                var g = i(t),
                    d = i(n);
                function r(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || false;
                        i.configurable = true;
                        if ("value" in i) i.writable = true;
                        Object.defineProperty(e, i.key, i);
                    }
                }
                function o(e, t, n) {
                    if (t) r(e.prototype, t);
                    if (n) r(e, n);
                    return e;
                }
                function s() {
                    s =
                        Object.assign ||
                        function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var n = arguments[t];
                                for (var i in n) {
                                    if (Object.prototype.hasOwnProperty.call(n, i)) {
                                        e[i] = n[i];
                                    }
                                }
                            }
                            return e;
                        };
                    return s.apply(this, arguments);
                }
                function a(e, t) {
                    e.prototype = Object.create(t.prototype);
                    e.prototype.constructor = e;
                    e.__proto__ = t;
                }
                var l = "transitionend",
                    u = 1e6,
                    f = 1e3;
                function c(e) {
                    if (e === null || typeof e === "undefined") {
                        return "" + e;
                    }
                    return {}.toString
                        .call(e)
                        .match(/\s([a-z]+)/i)[1]
                        .toLowerCase();
                }
                function h() {
                    return {
                        bindType: l,
                        delegateType: l,
                        handle: function e(t) {
                            if (g["default"](t.target).is(this)) {
                                return t.handleObj.handler.apply(this, arguments);
                            }
                            return undefined;
                        },
                    };
                }
                function p(e) {
                    var t = this;
                    var n = false;
                    g["default"](this).one(v.TRANSITION_END, function () {
                        n = true;
                    });
                    setTimeout(function () {
                        if (!n) {
                            v.triggerTransitionEnd(t);
                        }
                    }, e);
                    return this;
                }
                function m() {
                    g["default"].fn.emulateTransitionEnd = p;
                    g["default"].event.special[v.TRANSITION_END] = h();
                }
                var v = {
                    TRANSITION_END: "bsTransitionEnd",
                    getUID: function e(t) {
                        do {
                            t += ~~(Math.random() * u);
                        } while (document.getElementById(t));
                        return t;
                    },
                    getSelectorFromElement: function e(t) {
                        var n = t.getAttribute("data-target");
                        if (!n || n === "#") {
                            var i = t.getAttribute("href");
                            n = i && i !== "#" ? i.trim() : "";
                        }
                        try {
                            return document.querySelector(n) ? n : null;
                        } catch (e) {
                            return null;
                        }
                    },
                    getTransitionDurationFromElement: function e(t) {
                        if (!t) {
                            return 0;
                        }
                        var n = g["default"](t).css("transition-duration");
                        var i = g["default"](t).css("transition-delay");
                        var r = parseFloat(n);
                        var o = parseFloat(i);
                        if (!r && !o) {
                            return 0;
                        }
                        n = n.split(",")[0];
                        i = i.split(",")[0];
                        return (parseFloat(n) + parseFloat(i)) * f;
                    },
                    reflow: function e(t) {
                        return t.offsetHeight;
                    },
                    triggerTransitionEnd: function e(t) {
                        g["default"](t).trigger(l);
                    },
                    supportsTransitionEnd: function e() {
                        return Boolean(l);
                    },
                    isElement: function e(t) {
                        return (t[0] || t).nodeType;
                    },
                    typeCheckConfig: function e(t, n, i) {
                        for (var r in i) {
                            if (Object.prototype.hasOwnProperty.call(i, r)) {
                                var o = i[r];
                                var a = n[r];
                                var s = a && v.isElement(a) ? "element" : c(a);
                                if (!new RegExp(o).test(s)) {
                                    throw new Error(t.toUpperCase() + ": " + ('Option "' + r + '" provided type "' + s + '" ') + ('but expected type "' + o + '".'));
                                }
                            }
                        }
                    },
                    findShadowRoot: function e(t) {
                        if (!document.documentElement.attachShadow) {
                            return null;
                        }
                        if (typeof t.getRootNode === "function") {
                            var n = t.getRootNode();
                            return n instanceof ShadowRoot ? n : null;
                        }
                        if (t instanceof ShadowRoot) {
                            return t;
                        }
                        if (!t.parentNode) {
                            return null;
                        }
                        return v.findShadowRoot(t.parentNode);
                    },
                    jQueryDetection: function e() {
                        if (typeof g["default"] === "undefined") {
                            throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
                        }
                        var t = g["default"].fn.jquery.split(" ")[0].split(".");
                        var n = 1;
                        var i = 2;
                        var r = 9;
                        var o = 1;
                        var a = 4;
                        if ((t[0] < i && t[1] < r) || (t[0] === n && t[1] === r && t[2] < o) || t[0] >= a) {
                            throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
                        }
                    },
                };
                v.jQueryDetection(), m();
                var y = "alert",
                    b = "4.6.0",
                    _ = "bs.alert",
                    w = "." + _,
                    x = ".data-api",
                    E = g["default"].fn[y],
                    T = '[data-dismiss="alert"]',
                    C = "close" + w,
                    S = "closed" + w,
                    k = "click" + w + x,
                    A = "alert",
                    D = "fade",
                    N = "show",
                    j = (function () {
                        function i(e) {
                            this._element = e;
                        }
                        var e = i.prototype;
                        e.close = function e(t) {
                            var n = this._element;
                            if (t) {
                                n = this._getRootElement(t);
                            }
                            var i = this._triggerCloseEvent(n);
                            if (i.isDefaultPrevented()) {
                                return;
                            }
                            this._removeElement(n);
                        };
                        e.dispose = function e() {
                            g["default"].removeData(this._element, _);
                            this._element = null;
                        };
                        e._getRootElement = function e(t) {
                            var n = v.getSelectorFromElement(t);
                            var i = false;
                            if (n) {
                                i = document.querySelector(n);
                            }
                            if (!i) {
                                i = g["default"](t).closest("." + A)[0];
                            }
                            return i;
                        };
                        e._triggerCloseEvent = function e(t) {
                            var n = g["default"].Event(C);
                            g["default"](t).trigger(n);
                            return n;
                        };
                        e._removeElement = function e(t) {
                            var n = this;
                            g["default"](t).removeClass(N);
                            if (!g["default"](t).hasClass(D)) {
                                this._destroyElement(t);
                                return;
                            }
                            var i = v.getTransitionDurationFromElement(t);
                            g["default"](t)
                                .one(v.TRANSITION_END, function (e) {
                                    return n._destroyElement(t, e);
                                })
                                .emulateTransitionEnd(i);
                        };
                        e._destroyElement = function e(t) {
                            g["default"](t).detach().trigger(S).remove();
                        };
                        i._jQueryInterface = function e(n) {
                            return this.each(function () {
                                var e = g["default"](this);
                                var t = e.data(_);
                                if (!t) {
                                    t = new i(this);
                                    e.data(_, t);
                                }
                                if (n === "close") {
                                    t[n](this);
                                }
                            });
                        };
                        i._handleDismiss = function e(t) {
                            return function (e) {
                                if (e) {
                                    e.preventDefault();
                                }
                                t.close(this);
                            };
                        };
                        o(i, null, [
                            {
                                key: "VERSION",
                                get: function e() {
                                    return b;
                                },
                            },
                        ]);
                        return i;
                    })();
                g["default"](document).on(k, T, j._handleDismiss(new j())),
                    (g["default"].fn[y] = j._jQueryInterface),
                    (g["default"].fn[y].Constructor = j),
                    (g["default"].fn[y].noConflict = function () {
                        g["default"].fn[y] = E;
                        return j._jQueryInterface;
                    });
                var O = "button",
                    L = "4.6.0",
                    P = "bs.button",
                    I = "." + P,
                    F = ".data-api",
                    q = g["default"].fn[O],
                    H = "active",
                    R = "btn",
                    M = "focus",
                    B = '[data-toggle^="button"]',
                    W = '[data-toggle="buttons"]',
                    V = '[data-toggle="button"]',
                    $ = '[data-toggle="buttons"] .btn',
                    U = 'input:not([type="hidden"])',
                    z = ".active",
                    Q = ".btn",
                    X = "click" + I + F,
                    Y = "focus" + I + F + " " + ("blur" + I + F),
                    K = "load" + I + F,
                    G = (function () {
                        function r(e) {
                            this._element = e;
                            this.shouldAvoidTriggerChange = false;
                        }
                        var e = r.prototype;
                        e.toggle = function e() {
                            var t = true;
                            var n = true;
                            var i = g["default"](this._element).closest(W)[0];
                            if (i) {
                                var r = this._element.querySelector(U);
                                if (r) {
                                    if (r.type === "radio") {
                                        if (r.checked && this._element.classList.contains(H)) {
                                            t = false;
                                        } else {
                                            var o = i.querySelector(z);
                                            if (o) {
                                                g["default"](o).removeClass(H);
                                            }
                                        }
                                    }
                                    if (t) {
                                        if (r.type === "checkbox" || r.type === "radio") {
                                            r.checked = !this._element.classList.contains(H);
                                        }
                                        if (!this.shouldAvoidTriggerChange) {
                                            g["default"](r).trigger("change");
                                        }
                                    }
                                    r.focus();
                                    n = false;
                                }
                            }
                            if (!(this._element.hasAttribute("disabled") || this._element.classList.contains("disabled"))) {
                                if (n) {
                                    this._element.setAttribute("aria-pressed", !this._element.classList.contains(H));
                                }
                                if (t) {
                                    g["default"](this._element).toggleClass(H);
                                }
                            }
                        };
                        e.dispose = function e() {
                            g["default"].removeData(this._element, P);
                            this._element = null;
                        };
                        r._jQueryInterface = function e(n, i) {
                            return this.each(function () {
                                var e = g["default"](this);
                                var t = e.data(P);
                                if (!t) {
                                    t = new r(this);
                                    e.data(P, t);
                                }
                                t.shouldAvoidTriggerChange = i;
                                if (n === "toggle") {
                                    t[n]();
                                }
                            });
                        };
                        o(r, null, [
                            {
                                key: "VERSION",
                                get: function e() {
                                    return L;
                                },
                            },
                        ]);
                        return r;
                    })();
                g["default"](document)
                    .on(X, B, function (e) {
                        var t = e.target;
                        var n = t;
                        if (!g["default"](t).hasClass(R)) {
                            t = g["default"](t).closest(Q)[0];
                        }
                        if (!t || t.hasAttribute("disabled") || t.classList.contains("disabled")) {
                            e.preventDefault();
                        } else {
                            var i = t.querySelector(U);
                            if (i && (i.hasAttribute("disabled") || i.classList.contains("disabled"))) {
                                e.preventDefault();
                                return;
                            }
                            if (n.tagName === "INPUT" || t.tagName !== "LABEL") {
                                G._jQueryInterface.call(g["default"](t), "toggle", n.tagName === "INPUT");
                            }
                        }
                    })
                    .on(Y, B, function (e) {
                        var t = g["default"](e.target).closest(Q)[0];
                        g["default"](t).toggleClass(M, /^focus(in)?$/.test(e.type));
                    }),
                    g["default"](window).on(K, function () {
                        var e = [].slice.call(document.querySelectorAll($));
                        for (var t = 0, n = e.length; t < n; t++) {
                            var i = e[t];
                            var r = i.querySelector(U);
                            if (r.checked || r.hasAttribute("checked")) {
                                i.classList.add(H);
                            } else {
                                i.classList.remove(H);
                            }
                        }
                        e = [].slice.call(document.querySelectorAll(V));
                        for (var o = 0, a = e.length; o < a; o++) {
                            var s = e[o];
                            if (s.getAttribute("aria-pressed") === "true") {
                                s.classList.add(H);
                            } else {
                                s.classList.remove(H);
                            }
                        }
                    }),
                    (g["default"].fn[O] = G._jQueryInterface),
                    (g["default"].fn[O].Constructor = G),
                    (g["default"].fn[O].noConflict = function () {
                        g["default"].fn[O] = q;
                        return G._jQueryInterface;
                    });
                var J = "carousel",
                    Z = "4.6.0",
                    ee = "bs.carousel",
                    te = "." + ee,
                    ne = ".data-api",
                    ie = g["default"].fn[J],
                    re = 37,
                    oe = 39,
                    ae = 500,
                    se = 40,
                    le = { interval: 5e3, keyboard: true, slide: false, pause: "hover", wrap: true, touch: true },
                    ue = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean", touch: "boolean" },
                    fe = "next",
                    ce = "prev",
                    de = "left",
                    he = "right",
                    pe = "slide" + te,
                    ge = "slid" + te,
                    me = "keydown" + te,
                    ve = "mouseenter" + te,
                    ye = "mouseleave" + te,
                    be = "touchstart" + te,
                    _e = "touchmove" + te,
                    we = "touchend" + te,
                    xe = "pointerdown" + te,
                    Ee = "pointerup" + te,
                    Te = "dragstart" + te,
                    Ce = "load" + te + ne,
                    Se = "click" + te + ne,
                    ke = "carousel",
                    Ae = "active",
                    De = "slide",
                    Ne = "carousel-item-right",
                    je = "carousel-item-left",
                    Oe = "carousel-item-next",
                    Le = "carousel-item-prev",
                    Pe = "pointer-event",
                    Ie = ".active",
                    Fe = ".active.carousel-item",
                    qe = ".carousel-item",
                    He = ".carousel-item img",
                    Re = ".carousel-item-next, .carousel-item-prev",
                    Me = ".carousel-indicators",
                    Be = "[data-slide], [data-slide-to]",
                    We = '[data-ride="carousel"]',
                    Ve = { TOUCH: "touch", PEN: "pen" },
                    $e = (function () {
                        function a(e, t) {
                            this._items = null;
                            this._interval = null;
                            this._activeElement = null;
                            this._isPaused = false;
                            this._isSliding = false;
                            this.touchTimeout = null;
                            this.touchStartX = 0;
                            this.touchDeltaX = 0;
                            this._config = this._getConfig(t);
                            this._element = e;
                            this._indicatorsElement = this._element.querySelector(Me);
                            this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
                            this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);
                            this._addEventListeners();
                        }
                        var e = a.prototype;
                        e.next = function e() {
                            if (!this._isSliding) {
                                this._slide(fe);
                            }
                        };
                        e.nextWhenVisible = function e() {
                            var t = g["default"](this._element);
                            if (!document.hidden && t.is(":visible") && t.css("visibility") !== "hidden") {
                                this.next();
                            }
                        };
                        e.prev = function e() {
                            if (!this._isSliding) {
                                this._slide(ce);
                            }
                        };
                        e.pause = function e(t) {
                            if (!t) {
                                this._isPaused = true;
                            }
                            if (this._element.querySelector(Re)) {
                                v.triggerTransitionEnd(this._element);
                                this.cycle(true);
                            }
                            clearInterval(this._interval);
                            this._interval = null;
                        };
                        e.cycle = function e(t) {
                            if (!t) {
                                this._isPaused = false;
                            }
                            if (this._interval) {
                                clearInterval(this._interval);
                                this._interval = null;
                            }
                            if (this._config.interval && !this._isPaused) {
                                this._updateInterval();
                                this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
                            }
                        };
                        e.to = function e(t) {
                            var n = this;
                            this._activeElement = this._element.querySelector(Fe);
                            var i = this._getItemIndex(this._activeElement);
                            if (t > this._items.length - 1 || t < 0) {
                                return;
                            }
                            if (this._isSliding) {
                                g["default"](this._element).one(ge, function () {
                                    return n.to(t);
                                });
                                return;
                            }
                            if (i === t) {
                                this.pause();
                                this.cycle();
                                return;
                            }
                            var r = t > i ? fe : ce;
                            this._slide(r, this._items[t]);
                        };
                        e.dispose = function e() {
                            g["default"](this._element).off(te);
                            g["default"].removeData(this._element, ee);
                            this._items = null;
                            this._config = null;
                            this._element = null;
                            this._interval = null;
                            this._isPaused = null;
                            this._isSliding = null;
                            this._activeElement = null;
                            this._indicatorsElement = null;
                        };
                        e._getConfig = function e(t) {
                            t = s({}, le, t);
                            v.typeCheckConfig(J, t, ue);
                            return t;
                        };
                        e._handleSwipe = function e() {
                            var t = Math.abs(this.touchDeltaX);
                            if (t <= se) {
                                return;
                            }
                            var n = t / this.touchDeltaX;
                            this.touchDeltaX = 0;
                            if (n > 0) {
                                this.prev();
                            }
                            if (n < 0) {
                                this.next();
                            }
                        };
                        e._addEventListeners = function e() {
                            var t = this;
                            if (this._config.keyboard) {
                                g["default"](this._element).on(me, function (e) {
                                    return t._keydown(e);
                                });
                            }
                            if (this._config.pause === "hover") {
                                g["default"](this._element)
                                    .on(ve, function (e) {
                                        return t.pause(e);
                                    })
                                    .on(ye, function (e) {
                                        return t.cycle(e);
                                    });
                            }
                            if (this._config.touch) {
                                this._addTouchEventListeners();
                            }
                        };
                        e._addTouchEventListeners = function e() {
                            var n = this;
                            if (!this._touchSupported) {
                                return;
                            }
                            var t = function e(t) {
                                if (n._pointerEvent && Ve[t.originalEvent.pointerType.toUpperCase()]) {
                                    n.touchStartX = t.originalEvent.clientX;
                                } else if (!n._pointerEvent) {
                                    n.touchStartX = t.originalEvent.touches[0].clientX;
                                }
                            };
                            var i = function e(t) {
                                if (t.originalEvent.touches && t.originalEvent.touches.length > 1) {
                                    n.touchDeltaX = 0;
                                } else {
                                    n.touchDeltaX = t.originalEvent.touches[0].clientX - n.touchStartX;
                                }
                            };
                            var r = function e(t) {
                                if (n._pointerEvent && Ve[t.originalEvent.pointerType.toUpperCase()]) {
                                    n.touchDeltaX = t.originalEvent.clientX - n.touchStartX;
                                }
                                n._handleSwipe();
                                if (n._config.pause === "hover") {
                                    n.pause();
                                    if (n.touchTimeout) {
                                        clearTimeout(n.touchTimeout);
                                    }
                                    n.touchTimeout = setTimeout(function (e) {
                                        return n.cycle(e);
                                    }, ae + n._config.interval);
                                }
                            };
                            g["default"](this._element.querySelectorAll(He)).on(Te, function (e) {
                                return e.preventDefault();
                            });
                            if (this._pointerEvent) {
                                g["default"](this._element).on(xe, function (e) {
                                    return t(e);
                                });
                                g["default"](this._element).on(Ee, function (e) {
                                    return r(e);
                                });
                                this._element.classList.add(Pe);
                            } else {
                                g["default"](this._element).on(be, function (e) {
                                    return t(e);
                                });
                                g["default"](this._element).on(_e, function (e) {
                                    return i(e);
                                });
                                g["default"](this._element).on(we, function (e) {
                                    return r(e);
                                });
                            }
                        };
                        e._keydown = function e(t) {
                            if (/input|textarea/i.test(t.target.tagName)) {
                                return;
                            }
                            switch (t.which) {
                                case re:
                                    t.preventDefault();
                                    this.prev();
                                    break;
                                case oe:
                                    t.preventDefault();
                                    this.next();
                                    break;
                            }
                        };
                        e._getItemIndex = function e(t) {
                            this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(qe)) : [];
                            return this._items.indexOf(t);
                        };
                        e._getItemByDirection = function e(t, n) {
                            var i = t === fe;
                            var r = t === ce;
                            var o = this._getItemIndex(n);
                            var a = this._items.length - 1;
                            var s = (r && o === 0) || (i && o === a);
                            if (s && !this._config.wrap) {
                                return n;
                            }
                            var l = t === ce ? -1 : 1;
                            var u = (o + l) % this._items.length;
                            return u === -1 ? this._items[this._items.length - 1] : this._items[u];
                        };
                        e._triggerSlideEvent = function e(t, n) {
                            var i = this._getItemIndex(t);
                            var r = this._getItemIndex(this._element.querySelector(Fe));
                            var o = g["default"].Event(pe, { relatedTarget: t, direction: n, from: r, to: i });
                            g["default"](this._element).trigger(o);
                            return o;
                        };
                        e._setActiveIndicatorElement = function e(t) {
                            if (this._indicatorsElement) {
                                var n = [].slice.call(this._indicatorsElement.querySelectorAll(Ie));
                                g["default"](n).removeClass(Ae);
                                var i = this._indicatorsElement.children[this._getItemIndex(t)];
                                if (i) {
                                    g["default"](i).addClass(Ae);
                                }
                            }
                        };
                        e._updateInterval = function e() {
                            var t = this._activeElement || this._element.querySelector(Fe);
                            if (!t) {
                                return;
                            }
                            var n = parseInt(t.getAttribute("data-interval"), 10);
                            if (n) {
                                this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
                                this._config.interval = n;
                            } else {
                                this._config.interval = this._config.defaultInterval || this._config.interval;
                            }
                        };
                        e._slide = function e(t, n) {
                            var i = this;
                            var r = this._element.querySelector(Fe);
                            var o = this._getItemIndex(r);
                            var a = n || (r && this._getItemByDirection(t, r));
                            var s = this._getItemIndex(a);
                            var l = Boolean(this._interval);
                            var u;
                            var f;
                            var c;
                            if (t === fe) {
                                u = je;
                                f = Oe;
                                c = de;
                            } else {
                                u = Ne;
                                f = Le;
                                c = he;
                            }
                            if (a && g["default"](a).hasClass(Ae)) {
                                this._isSliding = false;
                                return;
                            }
                            var d = this._triggerSlideEvent(a, c);
                            if (d.isDefaultPrevented()) {
                                return;
                            }
                            if (!r || !a) {
                                return;
                            }
                            this._isSliding = true;
                            if (l) {
                                this.pause();
                            }
                            this._setActiveIndicatorElement(a);
                            this._activeElement = a;
                            var h = g["default"].Event(ge, { relatedTarget: a, direction: c, from: o, to: s });
                            if (g["default"](this._element).hasClass(De)) {
                                g["default"](a).addClass(f);
                                v.reflow(a);
                                g["default"](r).addClass(u);
                                g["default"](a).addClass(u);
                                var p = v.getTransitionDurationFromElement(r);
                                g["default"](r)
                                    .one(v.TRANSITION_END, function () {
                                        g["default"](a)
                                            .removeClass(u + " " + f)
                                            .addClass(Ae);
                                        g["default"](r).removeClass(Ae + " " + f + " " + u);
                                        i._isSliding = false;
                                        setTimeout(function () {
                                            return g["default"](i._element).trigger(h);
                                        }, 0);
                                    })
                                    .emulateTransitionEnd(p);
                            } else {
                                g["default"](r).removeClass(Ae);
                                g["default"](a).addClass(Ae);
                                this._isSliding = false;
                                g["default"](this._element).trigger(h);
                            }
                            if (l) {
                                this.cycle();
                            }
                        };
                        a._jQueryInterface = function e(i) {
                            return this.each(function () {
                                var e = g["default"](this).data(ee);
                                var t = s({}, le, g["default"](this).data());
                                if (typeof i === "object") {
                                    t = s({}, t, i);
                                }
                                var n = typeof i === "string" ? i : t.slide;
                                if (!e) {
                                    e = new a(this, t);
                                    g["default"](this).data(ee, e);
                                }
                                if (typeof i === "number") {
                                    e.to(i);
                                } else if (typeof n === "string") {
                                    if (typeof e[n] === "undefined") {
                                        throw new TypeError('No method named "' + n + '"');
                                    }
                                    e[n]();
                                } else if (t.interval && t.ride) {
                                    e.pause();
                                    e.cycle();
                                }
                            });
                        };
                        a._dataApiClickHandler = function e(t) {
                            var n = v.getSelectorFromElement(this);
                            if (!n) {
                                return;
                            }
                            var i = g["default"](n)[0];
                            if (!i || !g["default"](i).hasClass(ke)) {
                                return;
                            }
                            var r = s({}, g["default"](i).data(), g["default"](this).data());
                            var o = this.getAttribute("data-slide-to");
                            if (o) {
                                r.interval = false;
                            }
                            a._jQueryInterface.call(g["default"](i), r);
                            if (o) {
                                g["default"](i).data(ee).to(o);
                            }
                            t.preventDefault();
                        };
                        o(a, null, [
                            {
                                key: "VERSION",
                                get: function e() {
                                    return Z;
                                },
                            },
                            {
                                key: "Default",
                                get: function e() {
                                    return le;
                                },
                            },
                        ]);
                        return a;
                    })();
                g["default"](document).on(Se, Be, $e._dataApiClickHandler),
                    g["default"](window).on(Ce, function () {
                        var e = [].slice.call(document.querySelectorAll(We));
                        for (var t = 0, n = e.length; t < n; t++) {
                            var i = g["default"](e[t]);
                            $e._jQueryInterface.call(i, i.data());
                        }
                    }),
                    (g["default"].fn[J] = $e._jQueryInterface),
                    (g["default"].fn[J].Constructor = $e),
                    (g["default"].fn[J].noConflict = function () {
                        g["default"].fn[J] = ie;
                        return $e._jQueryInterface;
                    });
                var Ue = "collapse",
                    ze = "4.6.0",
                    Qe = "bs.collapse",
                    Xe = "." + Qe,
                    Ye = ".data-api",
                    Ke = g["default"].fn[Ue],
                    Ge = { toggle: true, parent: "" },
                    Je = { toggle: "boolean", parent: "(string|element)" },
                    Ze = "show" + Xe,
                    et = "shown" + Xe,
                    tt = "hide" + Xe,
                    nt = "hidden" + Xe,
                    it = "click" + Xe + Ye,
                    rt = "show",
                    ot = "collapse",
                    at = "collapsing",
                    st = "collapsed",
                    lt = "width",
                    ut = "height",
                    ft = ".show, .collapsing",
                    ct = '[data-toggle="collapse"]',
                    dt = (function () {
                        function f(t, e) {
                            this._isTransitioning = false;
                            this._element = t;
                            this._config = this._getConfig(e);
                            this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],' + ('[data-toggle="collapse"][data-target="#' + t.id + '"]')));
                            var n = [].slice.call(document.querySelectorAll(ct));
                            for (var i = 0, r = n.length; i < r; i++) {
                                var o = n[i];
                                var a = v.getSelectorFromElement(o);
                                var s = [].slice.call(document.querySelectorAll(a)).filter(function (e) {
                                    return e === t;
                                });
                                if (a !== null && s.length > 0) {
                                    this._selector = a;
                                    this._triggerArray.push(o);
                                }
                            }
                            this._parent = this._config.parent ? this._getParent() : null;
                            if (!this._config.parent) {
                                this._addAriaAndCollapsedClass(this._element, this._triggerArray);
                            }
                            if (this._config.toggle) {
                                this.toggle();
                            }
                        }
                        var e = f.prototype;
                        e.toggle = function e() {
                            if (g["default"](this._element).hasClass(rt)) {
                                this.hide();
                            } else {
                                this.show();
                            }
                        };
                        e.show = function e() {
                            var t = this;
                            if (this._isTransitioning || g["default"](this._element).hasClass(rt)) {
                                return;
                            }
                            var n;
                            var i;
                            if (this._parent) {
                                n = [].slice.call(this._parent.querySelectorAll(ft)).filter(function (e) {
                                    if (typeof t._config.parent === "string") {
                                        return e.getAttribute("data-parent") === t._config.parent;
                                    }
                                    return e.classList.contains(ot);
                                });
                                if (n.length === 0) {
                                    n = null;
                                }
                            }
                            if (n) {
                                i = g["default"](n).not(this._selector).data(Qe);
                                if (i && i._isTransitioning) {
                                    return;
                                }
                            }
                            var r = g["default"].Event(Ze);
                            g["default"](this._element).trigger(r);
                            if (r.isDefaultPrevented()) {
                                return;
                            }
                            if (n) {
                                f._jQueryInterface.call(g["default"](n).not(this._selector), "hide");
                                if (!i) {
                                    g["default"](n).data(Qe, null);
                                }
                            }
                            var o = this._getDimension();
                            g["default"](this._element).removeClass(ot).addClass(at);
                            this._element.style[o] = 0;
                            if (this._triggerArray.length) {
                                g["default"](this._triggerArray).removeClass(st).attr("aria-expanded", true);
                            }
                            this.setTransitioning(true);
                            var a = function e() {
                                g["default"](t._element)
                                    .removeClass(at)
                                    .addClass(ot + " " + rt);
                                t._element.style[o] = "";
                                t.setTransitioning(false);
                                g["default"](t._element).trigger(et);
                            };
                            var s = o[0].toUpperCase() + o.slice(1);
                            var l = "scroll" + s;
                            var u = v.getTransitionDurationFromElement(this._element);
                            g["default"](this._element).one(v.TRANSITION_END, a).emulateTransitionEnd(u);
                            this._element.style[o] = this._element[l] + "px";
                        };
                        e.hide = function e() {
                            var t = this;
                            if (this._isTransitioning || !g["default"](this._element).hasClass(rt)) {
                                return;
                            }
                            var n = g["default"].Event(tt);
                            g["default"](this._element).trigger(n);
                            if (n.isDefaultPrevented()) {
                                return;
                            }
                            var i = this._getDimension();
                            this._element.style[i] = this._element.getBoundingClientRect()[i] + "px";
                            v.reflow(this._element);
                            g["default"](this._element)
                                .addClass(at)
                                .removeClass(ot + " " + rt);
                            var r = this._triggerArray.length;
                            if (r > 0) {
                                for (var o = 0; o < r; o++) {
                                    var a = this._triggerArray[o];
                                    var s = v.getSelectorFromElement(a);
                                    if (s !== null) {
                                        var l = g["default"]([].slice.call(document.querySelectorAll(s)));
                                        if (!l.hasClass(rt)) {
                                            g["default"](a).addClass(st).attr("aria-expanded", false);
                                        }
                                    }
                                }
                            }
                            this.setTransitioning(true);
                            var u = function e() {
                                t.setTransitioning(false);
                                g["default"](t._element).removeClass(at).addClass(ot).trigger(nt);
                            };
                            this._element.style[i] = "";
                            var f = v.getTransitionDurationFromElement(this._element);
                            g["default"](this._element).one(v.TRANSITION_END, u).emulateTransitionEnd(f);
                        };
                        e.setTransitioning = function e(t) {
                            this._isTransitioning = t;
                        };
                        e.dispose = function e() {
                            g["default"].removeData(this._element, Qe);
                            this._config = null;
                            this._parent = null;
                            this._element = null;
                            this._triggerArray = null;
                            this._isTransitioning = null;
                        };
                        e._getConfig = function e(t) {
                            t = s({}, Ge, t);
                            t.toggle = Boolean(t.toggle);
                            v.typeCheckConfig(Ue, t, Je);
                            return t;
                        };
                        e._getDimension = function e() {
                            var t = g["default"](this._element).hasClass(lt);
                            return t ? lt : ut;
                        };
                        e._getParent = function e() {
                            var n = this;
                            var t;
                            if (v.isElement(this._config.parent)) {
                                t = this._config.parent;
                                if (typeof this._config.parent.jquery !== "undefined") {
                                    t = this._config.parent[0];
                                }
                            } else {
                                t = document.querySelector(this._config.parent);
                            }
                            var i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                            var r = [].slice.call(t.querySelectorAll(i));
                            g["default"](r).each(function (e, t) {
                                n._addAriaAndCollapsedClass(f._getTargetFromElement(t), [t]);
                            });
                            return t;
                        };
                        e._addAriaAndCollapsedClass = function e(t, n) {
                            var i = g["default"](t).hasClass(rt);
                            if (n.length) {
                                g["default"](n).toggleClass(st, !i).attr("aria-expanded", i);
                            }
                        };
                        f._getTargetFromElement = function e(t) {
                            var n = v.getSelectorFromElement(t);
                            return n ? document.querySelector(n) : null;
                        };
                        f._jQueryInterface = function e(i) {
                            return this.each(function () {
                                var e = g["default"](this);
                                var t = e.data(Qe);
                                var n = s({}, Ge, e.data(), typeof i === "object" && i ? i : {});
                                if (!t && n.toggle && typeof i === "string" && /show|hide/.test(i)) {
                                    n.toggle = false;
                                }
                                if (!t) {
                                    t = new f(this, n);
                                    e.data(Qe, t);
                                }
                                if (typeof i === "string") {
                                    if (typeof t[i] === "undefined") {
                                        throw new TypeError('No method named "' + i + '"');
                                    }
                                    t[i]();
                                }
                            });
                        };
                        o(f, null, [
                            {
                                key: "VERSION",
                                get: function e() {
                                    return ze;
                                },
                            },
                            {
                                key: "Default",
                                get: function e() {
                                    return Ge;
                                },
                            },
                        ]);
                        return f;
                    })();
                g["default"](document).on(it, ct, function (e) {
                    if (e.currentTarget.tagName === "A") {
                        e.preventDefault();
                    }
                    var i = g["default"](this);
                    var t = v.getSelectorFromElement(this);
                    var n = [].slice.call(document.querySelectorAll(t));
                    g["default"](n).each(function () {
                        var e = g["default"](this);
                        var t = e.data(Qe);
                        var n = t ? "toggle" : i.data();
                        dt._jQueryInterface.call(e, n);
                    });
                }),
                    (g["default"].fn[Ue] = dt._jQueryInterface),
                    (g["default"].fn[Ue].Constructor = dt),
                    (g["default"].fn[Ue].noConflict = function () {
                        g["default"].fn[Ue] = Ke;
                        return dt._jQueryInterface;
                    });
                var ht = "dropdown",
                    pt = "4.6.0",
                    gt = "bs.dropdown",
                    mt = "." + gt,
                    vt = ".data-api",
                    yt = g["default"].fn[ht],
                    bt = 27,
                    _t = 32,
                    wt = 9,
                    xt = 38,
                    Et = 40,
                    Tt = 3,
                    Ct = new RegExp(xt + "|" + Et + "|" + bt),
                    St = "hide" + mt,
                    kt = "hidden" + mt,
                    At = "show" + mt,
                    Dt = "shown" + mt,
                    Nt = "click" + mt,
                    jt = "click" + mt + vt,
                    Ot = "keydown" + mt + vt,
                    Lt = "keyup" + mt + vt,
                    Pt = "disabled",
                    It = "show",
                    Ft = "dropup",
                    qt = "dropright",
                    Ht = "dropleft",
                    Rt = "dropdown-menu-right",
                    Mt = "position-static",
                    Bt = '[data-toggle="dropdown"]',
                    Wt = ".dropdown form",
                    Vt = ".dropdown-menu",
                    $t = ".navbar-nav",
                    Ut = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
                    zt = "top-start",
                    Qt = "top-end",
                    Xt = "bottom-start",
                    Yt = "bottom-end",
                    Kt = "right-start",
                    Gt = "left-start",
                    Jt = { offset: 0, flip: true, boundary: "scrollParent", reference: "toggle", display: "dynamic", popperConfig: null },
                    Zt = { offset: "(number|string|function)", flip: "boolean", boundary: "(string|element)", reference: "(string|element)", display: "string", popperConfig: "(null|object)" },
                    en = (function () {
                        function f(e, t) {
                            this._element = e;
                            this._popper = null;
                            this._config = this._getConfig(t);
                            this._menu = this._getMenuElement();
                            this._inNavbar = this._detectNavbar();
                            this._addEventListeners();
                        }
                        var e = f.prototype;
                        e.toggle = function e() {
                            if (this._element.disabled || g["default"](this._element).hasClass(Pt)) {
                                return;
                            }
                            var t = g["default"](this._menu).hasClass(It);
                            f._clearMenus();
                            if (t) {
                                return;
                            }
                            this.show(true);
                        };
                        e.show = function e(t) {
                            if (t === void 0) {
                                t = false;
                            }
                            if (this._element.disabled || g["default"](this._element).hasClass(Pt) || g["default"](this._menu).hasClass(It)) {
                                return;
                            }
                            var n = { relatedTarget: this._element };
                            var i = g["default"].Event(At, n);
                            var r = f._getParentFromElement(this._element);
                            g["default"](r).trigger(i);
                            if (i.isDefaultPrevented()) {
                                return;
                            }
                            if (!this._inNavbar && t) {
                                if (typeof d["default"] === "undefined") {
                                    throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
                                }
                                var o = this._element;
                                if (this._config.reference === "parent") {
                                    o = r;
                                } else if (v.isElement(this._config.reference)) {
                                    o = this._config.reference;
                                    if (typeof this._config.reference.jquery !== "undefined") {
                                        o = this._config.reference[0];
                                    }
                                }
                                if (this._config.boundary !== "scrollParent") {
                                    g["default"](r).addClass(Mt);
                                }
                                this._popper = new d["default"](o, this._menu, this._getPopperConfig());
                            }
                            if ("ontouchstart" in document.documentElement && g["default"](r).closest($t).length === 0) {
                                g["default"](document.body).children().on("mouseover", null, g["default"].noop);
                            }
                            this._element.focus();
                            this._element.setAttribute("aria-expanded", true);
                            g["default"](this._menu).toggleClass(It);
                            g["default"](r).toggleClass(It).trigger(g["default"].Event(Dt, n));
                        };
                        e.hide = function e() {
                            if (this._element.disabled || g["default"](this._element).hasClass(Pt) || !g["default"](this._menu).hasClass(It)) {
                                return;
                            }
                            var t = { relatedTarget: this._element };
                            var n = g["default"].Event(St, t);
                            var i = f._getParentFromElement(this._element);
                            g["default"](i).trigger(n);
                            if (n.isDefaultPrevented()) {
                                return;
                            }
                            if (this._popper) {
                                this._popper.destroy();
                            }
                            g["default"](this._menu).toggleClass(It);
                            g["default"](i).toggleClass(It).trigger(g["default"].Event(kt, t));
                        };
                        e.dispose = function e() {
                            g["default"].removeData(this._element, gt);
                            g["default"](this._element).off(mt);
                            this._element = null;
                            this._menu = null;
                            if (this._popper !== null) {
                                this._popper.destroy();
                                this._popper = null;
                            }
                        };
                        e.update = function e() {
                            this._inNavbar = this._detectNavbar();
                            if (this._popper !== null) {
                                this._popper.scheduleUpdate();
                            }
                        };
                        e._addEventListeners = function e() {
                            var t = this;
                            g["default"](this._element).on(Nt, function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                t.toggle();
                            });
                        };
                        e._getConfig = function e(t) {
                            t = s({}, this.constructor.Default, g["default"](this._element).data(), t);
                            v.typeCheckConfig(ht, t, this.constructor.DefaultType);
                            return t;
                        };
                        e._getMenuElement = function e() {
                            if (!this._menu) {
                                var t = f._getParentFromElement(this._element);
                                if (t) {
                                    this._menu = t.querySelector(Vt);
                                }
                            }
                            return this._menu;
                        };
                        e._getPlacement = function e() {
                            var t = g["default"](this._element.parentNode);
                            var n = Xt;
                            if (t.hasClass(Ft)) {
                                n = g["default"](this._menu).hasClass(Rt) ? Qt : zt;
                            } else if (t.hasClass(qt)) {
                                n = Kt;
                            } else if (t.hasClass(Ht)) {
                                n = Gt;
                            } else if (g["default"](this._menu).hasClass(Rt)) {
                                n = Yt;
                            }
                            return n;
                        };
                        e._detectNavbar = function e() {
                            return g["default"](this._element).closest(".navbar").length > 0;
                        };
                        e._getOffset = function e() {
                            var t = this;
                            var n = {};
                            if (typeof this._config.offset === "function") {
                                n.fn = function (e) {
                                    e.offsets = s({}, e.offsets, t._config.offset(e.offsets, t._element) || {});
                                    return e;
                                };
                            } else {
                                n.offset = this._config.offset;
                            }
                            return n;
                        };
                        e._getPopperConfig = function e() {
                            var t = { placement: this._getPlacement(), modifiers: { offset: this._getOffset(), flip: { enabled: this._config.flip }, preventOverflow: { boundariesElement: this._config.boundary } } };
                            if (this._config.display === "static") {
                                t.modifiers.applyStyle = { enabled: false };
                            }
                            return s({}, t, this._config.popperConfig);
                        };
                        f._jQueryInterface = function e(n) {
                            return this.each(function () {
                                var e = g["default"](this).data(gt);
                                var t = typeof n === "object" ? n : null;
                                if (!e) {
                                    e = new f(this, t);
                                    g["default"](this).data(gt, e);
                                }
                                if (typeof n === "string") {
                                    if (typeof e[n] === "undefined") {
                                        throw new TypeError('No method named "' + n + '"');
                                    }
                                    e[n]();
                                }
                            });
                        };
                        f._clearMenus = function e(t) {
                            if (t && (t.which === Tt || (t.type === "keyup" && t.which !== wt))) {
                                return;
                            }
                            var n = [].slice.call(document.querySelectorAll(Bt));
                            for (var i = 0, r = n.length; i < r; i++) {
                                var o = f._getParentFromElement(n[i]);
                                var a = g["default"](n[i]).data(gt);
                                var s = { relatedTarget: n[i] };
                                if (t && t.type === "click") {
                                    s.clickEvent = t;
                                }
                                if (!a) {
                                    continue;
                                }
                                var l = a._menu;
                                if (!g["default"](o).hasClass(It)) {
                                    continue;
                                }
                                if (t && ((t.type === "click" && /input|textarea/i.test(t.target.tagName)) || (t.type === "keyup" && t.which === wt)) && g["default"].contains(o, t.target)) {
                                    continue;
                                }
                                var u = g["default"].Event(St, s);
                                g["default"](o).trigger(u);
                                if (u.isDefaultPrevented()) {
                                    continue;
                                }
                                if ("ontouchstart" in document.documentElement) {
                                    g["default"](document.body).children().off("mouseover", null, g["default"].noop);
                                }
                                n[i].setAttribute("aria-expanded", "false");
                                if (a._popper) {
                                    a._popper.destroy();
                                }
                                g["default"](l).removeClass(It);
                                g["default"](o).removeClass(It).trigger(g["default"].Event(kt, s));
                            }
                        };
                        f._getParentFromElement = function e(t) {
                            var n;
                            var i = v.getSelectorFromElement(t);
                            if (i) {
                                n = document.querySelector(i);
                            }
                            return n || t.parentNode;
                        };
                        f._dataApiKeydownHandler = function e(t) {
                            if (/input|textarea/i.test(t.target.tagName) ? t.which === _t || (t.which !== bt && ((t.which !== Et && t.which !== xt) || g["default"](t.target).closest(Vt).length)) : !Ct.test(t.which)) {
                                return;
                            }
                            if (this.disabled || g["default"](this).hasClass(Pt)) {
                                return;
                            }
                            var n = f._getParentFromElement(this);
                            var i = g["default"](n).hasClass(It);
                            if (!i && t.which === bt) {
                                return;
                            }
                            t.preventDefault();
                            t.stopPropagation();
                            if (!i || t.which === bt || t.which === _t) {
                                if (t.which === bt) {
                                    g["default"](n.querySelector(Bt)).trigger("focus");
                                }
                                g["default"](this).trigger("click");
                                return;
                            }
                            var r = [].slice.call(n.querySelectorAll(Ut)).filter(function (e) {
                                return g["default"](e).is(":visible");
                            });
                            if (r.length === 0) {
                                return;
                            }
                            var o = r.indexOf(t.target);
                            if (t.which === xt && o > 0) {
                                o--;
                            }
                            if (t.which === Et && o < r.length - 1) {
                                o++;
                            }
                            if (o < 0) {
                                o = 0;
                            }
                            r[o].focus();
                        };
                        o(f, null, [
                            {
                                key: "VERSION",
                                get: function e() {
                                    return pt;
                                },
                            },
                            {
                                key: "Default",
                                get: function e() {
                                    return Jt;
                                },
                            },
                            {
                                key: "DefaultType",
                                get: function e() {
                                    return Zt;
                                },
                            },
                        ]);
                        return f;
                    })();
                g["default"](document)
                    .on(Ot, Bt, en._dataApiKeydownHandler)
                    .on(Ot, Vt, en._dataApiKeydownHandler)
                    .on(jt + " " + Lt, en._clearMenus)
                    .on(jt, Bt, function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        en._jQueryInterface.call(g["default"](this), "toggle");
                    })
                    .on(jt, Wt, function (e) {
                        e.stopPropagation();
                    }),
                    (g["default"].fn[ht] = en._jQueryInterface),
                    (g["default"].fn[ht].Constructor = en),
                    (g["default"].fn[ht].noConflict = function () {
                        g["default"].fn[ht] = yt;
                        return en._jQueryInterface;
                    });
                var tn = "modal",
                    nn = "4.6.0",
                    rn = "bs.modal",
                    on = "." + rn,
                    an = ".data-api",
                    sn = g["default"].fn[tn],
                    ln = 27,
                    un = { backdrop: true, keyboard: true, focus: true, show: true },
                    fn = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean" },
                    cn = "hide" + on,
                    dn = "hidePrevented" + on,
                    hn = "hidden" + on,
                    pn = "show" + on,
                    gn = "shown" + on,
                    mn = "focusin" + on,
                    vn = "resize" + on,
                    yn = "click.dismiss" + on,
                    bn = "keydown.dismiss" + on,
                    _n = "mouseup.dismiss" + on,
                    wn = "mousedown.dismiss" + on,
                    xn = "click" + on + an,
                    En = "modal-dialog-scrollable",
                    Tn = "modal-scrollbar-measure",
                    Cn = "modal-backdrop",
                    Sn = "modal-open",
                    kn = "fade",
                    An = "show",
                    Dn = "modal-static",
                    Nn = ".modal-dialog",
                    jn = ".modal-body",
                    On = '[data-toggle="modal"]',
                    Ln = '[data-dismiss="modal"]',
                    Pn = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                    In = ".sticky-top",
                    Fn = (function () {
                        function r(e, t) {
                            this._config = this._getConfig(t);
                            this._element = e;
                            this._dialog = e.querySelector(Nn);
                            this._backdrop = null;
                            this._isShown = false;
                            this._isBodyOverflowing = false;
                            this._ignoreBackdropClick = false;
                            this._isTransitioning = false;
                            this._scrollbarWidth = 0;
                        }
                        var e = r.prototype;
                        e.toggle = function e(t) {
                            return this._isShown ? this.hide() : this.show(t);
                        };
                        e.show = function e(t) {
                            var n = this;
                            if (this._isShown || this._isTransitioning) {
                                return;
                            }
                            if (g["default"](this._element).hasClass(kn)) {
                                this._isTransitioning = true;
                            }
                            var i = g["default"].Event(pn, { relatedTarget: t });
                            g["default"](this._element).trigger(i);
                            if (this._isShown || i.isDefaultPrevented()) {
                                return;
                            }
                            this._isShown = true;
                            this._checkScrollbar();
                            this._setScrollbar();
                            this._adjustDialog();
                            this._setEscapeEvent();
                            this._setResizeEvent();
                            g["default"](this._element).on(yn, Ln, function (e) {
                                return n.hide(e);
                            });
                            g["default"](this._dialog).on(wn, function () {
                                g["default"](n._element).one(_n, function (e) {
                                    if (g["default"](e.target).is(n._element)) {
                                        n._ignoreBackdropClick = true;
                                    }
                                });
                            });
                            this._showBackdrop(function () {
                                return n._showElement(t);
                            });
                        };
                        e.hide = function e(t) {
                            var n = this;
                            if (t) {
                                t.preventDefault();
                            }
                            if (!this._isShown || this._isTransitioning) {
                                return;
                            }
                            var i = g["default"].Event(cn);
                            g["default"](this._element).trigger(i);
                            if (!this._isShown || i.isDefaultPrevented()) {
                                return;
                            }
                            this._isShown = false;
                            var r = g["default"](this._element).hasClass(kn);
                            if (r) {
                                this._isTransitioning = true;
                            }
                            this._setEscapeEvent();
                            this._setResizeEvent();
                            g["default"](document).off(mn);
                            g["default"](this._element).removeClass(An);
                            g["default"](this._element).off(yn);
                            g["default"](this._dialog).off(wn);
                            if (r) {
                                var o = v.getTransitionDurationFromElement(this._element);
                                g["default"](this._element)
                                    .one(v.TRANSITION_END, function (e) {
                                        return n._hideModal(e);
                                    })
                                    .emulateTransitionEnd(o);
                            } else {
                                this._hideModal();
                            }
                        };
                        e.dispose = function e() {
                            [window, this._element, this._dialog].forEach(function (e) {
                                return g["default"](e).off(on);
                            });
                            g["default"](document).off(mn);
                            g["default"].removeData(this._element, rn);
                            this._config = null;
                            this._element = null;
                            this._dialog = null;
                            this._backdrop = null;
                            this._isShown = null;
                            this._isBodyOverflowing = null;
                            this._ignoreBackdropClick = null;
                            this._isTransitioning = null;
                            this._scrollbarWidth = null;
                        };
                        e.handleUpdate = function e() {
                            this._adjustDialog();
                        };
                        e._getConfig = function e(t) {
                            t = s({}, un, t);
                            v.typeCheckConfig(tn, t, fn);
                            return t;
                        };
                        e._triggerBackdropTransition = function e() {
                            var t = this;
                            var n = g["default"].Event(dn);
                            g["default"](this._element).trigger(n);
                            if (n.isDefaultPrevented()) {
                                return;
                            }
                            var i = this._element.scrollHeight > document.documentElement.clientHeight;
                            if (!i) {
                                this._element.style.overflowY = "hidden";
                            }
                            this._element.classList.add(Dn);
                            var r = v.getTransitionDurationFromElement(this._dialog);
                            g["default"](this._element).off(v.TRANSITION_END);
                            g["default"](this._element)
                                .one(v.TRANSITION_END, function () {
                                    t._element.classList.remove(Dn);
                                    if (!i) {
                                        g["default"](t._element)
                                            .one(v.TRANSITION_END, function () {
                                                t._element.style.overflowY = "";
                                            })
                                            .emulateTransitionEnd(t._element, r);
                                    }
                                })
                                .emulateTransitionEnd(r);
                            this._element.focus();
                        };
                        e._showElement = function e(t) {
                            var n = this;
                            var i = g["default"](this._element).hasClass(kn);
                            var r = this._dialog ? this._dialog.querySelector(jn) : null;
                            if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                                document.body.appendChild(this._element);
                            }
                            this._element.style.display = "block";
                            this._element.removeAttribute("aria-hidden");
                            this._element.setAttribute("aria-modal", true);
                            this._element.setAttribute("role", "dialog");
                            if (g["default"](this._dialog).hasClass(En) && r) {
                                r.scrollTop = 0;
                            } else {
                                this._element.scrollTop = 0;
                            }
                            if (i) {
                                v.reflow(this._element);
                            }
                            g["default"](this._element).addClass(An);
                            if (this._config.focus) {
                                this._enforceFocus();
                            }
                            var o = g["default"].Event(gn, { relatedTarget: t });
                            var a = function e() {
                                if (n._config.focus) {
                                    n._element.focus();
                                }
                                n._isTransitioning = false;
                                g["default"](n._element).trigger(o);
                            };
                            if (i) {
                                var s = v.getTransitionDurationFromElement(this._dialog);
                                g["default"](this._dialog).one(v.TRANSITION_END, a).emulateTransitionEnd(s);
                            } else {
                                a();
                            }
                        };
                        e._enforceFocus = function e() {
                            var t = this;
                            g["default"](document)
                                .off(mn)
                                .on(mn, function (e) {
                                    if (document !== e.target && t._element !== e.target && g["default"](t._element).has(e.target).length === 0) {
                                        t._element.focus();
                                    }
                                });
                        };
                        e._setEscapeEvent = function e() {
                            var t = this;
                            if (this._isShown) {
                                g["default"](this._element).on(bn, function (e) {
                                    if (t._config.keyboard && e.which === ln) {
                                        e.preventDefault();
                                        t.hide();
                                    } else if (!t._config.keyboard && e.which === ln) {
                                        t._triggerBackdropTransition();
                                    }
                                });
                            } else if (!this._isShown) {
                                g["default"](this._element).off(bn);
                            }
                        };
                        e._setResizeEvent = function e() {
                            var t = this;
                            if (this._isShown) {
                                g["default"](window).on(vn, function (e) {
                                    return t.handleUpdate(e);
                                });
                            } else {
                                g["default"](window).off(vn);
                            }
                        };
                        e._hideModal = function e() {
                            var t = this;
                            this._element.style.display = "none";
                            this._element.setAttribute("aria-hidden", true);
                            this._element.removeAttribute("aria-modal");
                            this._element.removeAttribute("role");
                            this._isTransitioning = false;
                            this._showBackdrop(function () {
                                g["default"](document.body).removeClass(Sn);
                                t._resetAdjustments();
                                t._resetScrollbar();
                                g["default"](t._element).trigger(hn);
                            });
                        };
                        e._removeBackdrop = function e() {
                            if (this._backdrop) {
                                g["default"](this._backdrop).remove();
                                this._backdrop = null;
                            }
                        };
                        e._showBackdrop = function e(t) {
                            var n = this;
                            var i = g["default"](this._element).hasClass(kn) ? kn : "";
                            if (this._isShown && this._config.backdrop) {
                                this._backdrop = document.createElement("div");
                                this._backdrop.className = Cn;
                                if (i) {
                                    this._backdrop.classList.add(i);
                                }
                                g["default"](this._backdrop).appendTo(document.body);
                                g["default"](this._element).on(yn, function (e) {
                                    if (n._ignoreBackdropClick) {
                                        n._ignoreBackdropClick = false;
                                        return;
                                    }
                                    if (e.target !== e.currentTarget) {
                                        return;
                                    }
                                    if (n._config.backdrop === "static") {
                                        n._triggerBackdropTransition();
                                    } else {
                                        n.hide();
                                    }
                                });
                                if (i) {
                                    v.reflow(this._backdrop);
                                }
                                g["default"](this._backdrop).addClass(An);
                                if (!t) {
                                    return;
                                }
                                if (!i) {
                                    t();
                                    return;
                                }
                                var r = v.getTransitionDurationFromElement(this._backdrop);
                                g["default"](this._backdrop).one(v.TRANSITION_END, t).emulateTransitionEnd(r);
                            } else if (!this._isShown && this._backdrop) {
                                g["default"](this._backdrop).removeClass(An);
                                var o = function e() {
                                    n._removeBackdrop();
                                    if (t) {
                                        t();
                                    }
                                };
                                if (g["default"](this._element).hasClass(kn)) {
                                    var a = v.getTransitionDurationFromElement(this._backdrop);
                                    g["default"](this._backdrop).one(v.TRANSITION_END, o).emulateTransitionEnd(a);
                                } else {
                                    o();
                                }
                            } else if (t) {
                                t();
                            }
                        };
                        e._adjustDialog = function e() {
                            var t = this._element.scrollHeight > document.documentElement.clientHeight;
                            if (!this._isBodyOverflowing && t) {
                                this._element.style.paddingLeft = this._scrollbarWidth + "px";
                            }
                            if (this._isBodyOverflowing && !t) {
                                this._element.style.paddingRight = this._scrollbarWidth + "px";
                            }
                        };
                        e._resetAdjustments = function e() {
                            this._element.style.paddingLeft = "";
                            this._element.style.paddingRight = "";
                        };
                        e._checkScrollbar = function e() {
                            var t = document.body.getBoundingClientRect();
                            this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth;
                            this._scrollbarWidth = this._getScrollbarWidth();
                        };
                        e._setScrollbar = function e() {
                            var r = this;
                            if (this._isBodyOverflowing) {
                                var t = [].slice.call(document.querySelectorAll(Pn));
                                var n = [].slice.call(document.querySelectorAll(In));
                                g["default"](t).each(function (e, t) {
                                    var n = t.style.paddingRight;
                                    var i = g["default"](t).css("padding-right");
                                    g["default"](t)
                                        .data("padding-right", n)
                                        .css("padding-right", parseFloat(i) + r._scrollbarWidth + "px");
                                });
                                g["default"](n).each(function (e, t) {
                                    var n = t.style.marginRight;
                                    var i = g["default"](t).css("margin-right");
                                    g["default"](t)
                                        .data("margin-right", n)
                                        .css("margin-right", parseFloat(i) - r._scrollbarWidth + "px");
                                });
                                var i = document.body.style.paddingRight;
                                var o = g["default"](document.body).css("padding-right");
                                g["default"](document.body)
                                    .data("padding-right", i)
                                    .css("padding-right", parseFloat(o) + this._scrollbarWidth + "px");
                            }
                            g["default"](document.body).addClass(Sn);
                        };
                        e._resetScrollbar = function e() {
                            var t = [].slice.call(document.querySelectorAll(Pn));
                            g["default"](t).each(function (e, t) {
                                var n = g["default"](t).data("padding-right");
                                g["default"](t).removeData("padding-right");
                                t.style.paddingRight = n ? n : "";
                            });
                            var n = [].slice.call(document.querySelectorAll("" + In));
                            g["default"](n).each(function (e, t) {
                                var n = g["default"](t).data("margin-right");
                                if (typeof n !== "undefined") {
                                    g["default"](t).css("margin-right", n).removeData("margin-right");
                                }
                            });
                            var i = g["default"](document.body).data("padding-right");
                            g["default"](document.body).removeData("padding-right");
                            document.body.style.paddingRight = i ? i : "";
                        };
                        e._getScrollbarWidth = function e() {
                            var t = document.createElement("div");
                            t.className = Tn;
                            document.body.appendChild(t);
                            var n = t.getBoundingClientRect().width - t.clientWidth;
                            document.body.removeChild(t);
                            return n;
                        };
                        r._jQueryInterface = function e(n, i) {
                            return this.each(function () {
                                var e = g["default"](this).data(rn);
                                var t = s({}, un, g["default"](this).data(), typeof n === "object" && n ? n : {});
                                if (!e) {
                                    e = new r(this, t);
                                    g["default"](this).data(rn, e);
                                }
                                if (typeof n === "string") {
                                    if (typeof e[n] === "undefined") {
                                        throw new TypeError('No method named "' + n + '"');
                                    }
                                    e[n](i);
                                } else if (t.show) {
                                    e.show(i);
                                }
                            });
                        };
                        o(r, null, [
                            {
                                key: "VERSION",
                                get: function e() {
                                    return nn;
                                },
                            },
                            {
                                key: "Default",
                                get: function e() {
                                    return un;
                                },
                            },
                        ]);
                        return r;
                    })();
                g["default"](document).on(xn, On, function (e) {
                    var t = this;
                    var n;
                    var i = v.getSelectorFromElement(this);
                    if (i) {
                        n = document.querySelector(i);
                    }
                    var r = g["default"](n).data(rn) ? "toggle" : s({}, g["default"](n).data(), g["default"](this).data());
                    if (this.tagName === "A" || this.tagName === "AREA") {
                        e.preventDefault();
                    }
                    var o = g["default"](n).one(pn, function (e) {
                        if (e.isDefaultPrevented()) {
                            return;
                        }
                        o.one(hn, function () {
                            if (g["default"](t).is(":visible")) {
                                t.focus();
                            }
                        });
                    });
                    Fn._jQueryInterface.call(g["default"](n), r, this);
                }),
                    (g["default"].fn[tn] = Fn._jQueryInterface),
                    (g["default"].fn[tn].Constructor = Fn),
                    (g["default"].fn[tn].noConflict = function () {
                        g["default"].fn[tn] = sn;
                        return Fn._jQueryInterface;
                    });
                var qn = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
                    Hn,
                    Rn = {
                        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                        a: ["target", "href", "title", "rel"],
                        area: [],
                        b: [],
                        br: [],
                        col: [],
                        code: [],
                        div: [],
                        em: [],
                        hr: [],
                        h1: [],
                        h2: [],
                        h3: [],
                        h4: [],
                        h5: [],
                        h6: [],
                        i: [],
                        img: ["src", "srcset", "alt", "title", "width", "height"],
                        li: [],
                        ol: [],
                        p: [],
                        pre: [],
                        s: [],
                        small: [],
                        span: [],
                        sub: [],
                        sup: [],
                        strong: [],
                        u: [],
                        ul: [],
                    },
                    Mn = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
                    Bn = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
                function Wn(e, t) {
                    var n = e.nodeName.toLowerCase();
                    if (t.indexOf(n) !== -1) {
                        if (qn.indexOf(n) !== -1) {
                            return Boolean(e.nodeValue.match(Mn) || e.nodeValue.match(Bn));
                        }
                        return true;
                    }
                    var i = t.filter(function (e) {
                        return e instanceof RegExp;
                    });
                    for (var r = 0, o = i.length; r < o; r++) {
                        if (n.match(i[r])) {
                            return true;
                        }
                    }
                    return false;
                }
                function Vn(e, s, t) {
                    if (e.length === 0) {
                        return e;
                    }
                    if (t && typeof t === "function") {
                        return t(e);
                    }
                    var n = new window.DOMParser();
                    var i = n.parseFromString(e, "text/html");
                    var l = Object.keys(s);
                    var u = [].slice.call(i.body.querySelectorAll("*"));
                    var r = function e(t, n) {
                        var i = u[t];
                        var r = i.nodeName.toLowerCase();
                        if (l.indexOf(i.nodeName.toLowerCase()) === -1) {
                            i.parentNode.removeChild(i);
                            return "continue";
                        }
                        var o = [].slice.call(i.attributes);
                        var a = [].concat(s["*"] || [], s[r] || []);
                        o.forEach(function (e) {
                            if (!Wn(e, a)) {
                                i.removeAttribute(e.nodeName);
                            }
                        });
                    };
                    for (var o = 0, a = u.length; o < a; o++) {
                        var f = r(o);
                        if (f === "continue") continue;
                    }
                    return i.body.innerHTML;
                }
                var $n = "tooltip",
                    Un = "4.6.0",
                    zn = "bs.tooltip",
                    Qn = "." + zn,
                    Xn = g["default"].fn[$n],
                    Yn = "bs-tooltip",
                    Kn = new RegExp("(^|\\s)" + Yn + "\\S+", "g"),
                    Gn = ["sanitize", "whiteList", "sanitizeFn"],
                    Jn = {
                        animation: "boolean",
                        template: "string",
                        title: "(string|element|function)",
                        trigger: "string",
                        delay: "(number|object)",
                        html: "boolean",
                        selector: "(string|boolean)",
                        placement: "(string|function)",
                        offset: "(number|string|function)",
                        container: "(string|element|boolean)",
                        fallbackPlacement: "(string|array)",
                        boundary: "(string|element)",
                        customClass: "(string|function)",
                        sanitize: "boolean",
                        sanitizeFn: "(null|function)",
                        whiteList: "object",
                        popperConfig: "(null|object)",
                    },
                    Zn = { AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" },
                    ei = {
                        animation: true,
                        template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
                        trigger: "hover focus",
                        title: "",
                        delay: 0,
                        html: false,
                        selector: false,
                        placement: "top",
                        offset: 0,
                        container: false,
                        fallbackPlacement: "flip",
                        boundary: "scrollParent",
                        customClass: "",
                        sanitize: true,
                        sanitizeFn: null,
                        whiteList: Rn,
                        popperConfig: null,
                    },
                    ti = "show",
                    ni = "out",
                    ii = {
                        HIDE: "hide" + Qn,
                        HIDDEN: "hidden" + Qn,
                        SHOW: "show" + Qn,
                        SHOWN: "shown" + Qn,
                        INSERTED: "inserted" + Qn,
                        CLICK: "click" + Qn,
                        FOCUSIN: "focusin" + Qn,
                        FOCUSOUT: "focusout" + Qn,
                        MOUSEENTER: "mouseenter" + Qn,
                        MOUSELEAVE: "mouseleave" + Qn,
                    },
                    ri = "fade",
                    oi = "show",
                    ai = ".tooltip-inner",
                    si = ".arrow",
                    li = "hover",
                    ui = "focus",
                    fi = "click",
                    ci = "manual",
                    di = (function () {
                        function r(e, t) {
                            if (typeof d["default"] === "undefined") {
                                throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
                            }
                            this._isEnabled = true;
                            this._timeout = 0;
                            this._hoverState = "";
                            this._activeTrigger = {};
                            this._popper = null;
                            this.element = e;
                            this.config = this._getConfig(t);
                            this.tip = null;
                            this._setListeners();
                        }
                        var e = r.prototype;
                        e.enable = function e() {
                            this._isEnabled = true;
                        };
                        e.disable = function e() {
                            this._isEnabled = false;
                        };
                        e.toggleEnabled = function e() {
                            this._isEnabled = !this._isEnabled;
                        };
                        e.toggle = function e(t) {
                            if (!this._isEnabled) {
                                return;
                            }
                            if (t) {
                                var n = this.constructor.DATA_KEY;
                                var i = g["default"](t.currentTarget).data(n);
                                if (!i) {
                                    i = new this.constructor(t.currentTarget, this._getDelegateConfig());
                                    g["default"](t.currentTarget).data(n, i);
                                }
                                i._activeTrigger.click = !i._activeTrigger.click;
                                if (i._isWithActiveTrigger()) {
                                    i._enter(null, i);
                                } else {
                                    i._leave(null, i);
                                }
                            } else {
                                if (g["default"](this.getTipElement()).hasClass(oi)) {
                                    this._leave(null, this);
                                    return;
                                }
                                this._enter(null, this);
                            }
                        };
                        e.dispose = function e() {
                            clearTimeout(this._timeout);
                            g["default"].removeData(this.element, this.constructor.DATA_KEY);
                            g["default"](this.element).off(this.constructor.EVENT_KEY);
                            g["default"](this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler);
                            if (this.tip) {
                                g["default"](this.tip).remove();
                            }
                            this._isEnabled = null;
                            this._timeout = null;
                            this._hoverState = null;
                            this._activeTrigger = null;
                            if (this._popper) {
                                this._popper.destroy();
                            }
                            this._popper = null;
                            this.element = null;
                            this.config = null;
                            this.tip = null;
                        };
                        e.show = function e() {
                            var n = this;
                            if (g["default"](this.element).css("display") === "none") {
                                throw new Error("Please use show on visible elements");
                            }
                            var t = g["default"].Event(this.constructor.Event.SHOW);
                            if (this.isWithContent() && this._isEnabled) {
                                g["default"](this.element).trigger(t);
                                var i = v.findShadowRoot(this.element);
                                var r = g["default"].contains(i !== null ? i : this.element.ownerDocument.documentElement, this.element);
                                if (t.isDefaultPrevented() || !r) {
                                    return;
                                }
                                var o = this.getTipElement();
                                var a = v.getUID(this.constructor.NAME);
                                o.setAttribute("id", a);
                                this.element.setAttribute("aria-describedby", a);
                                this.setContent();
                                if (this.config.animation) {
                                    g["default"](o).addClass(ri);
                                }
                                var s = typeof this.config.placement === "function" ? this.config.placement.call(this, o, this.element) : this.config.placement;
                                var l = this._getAttachment(s);
                                this.addAttachmentClass(l);
                                var u = this._getContainer();
                                g["default"](o).data(this.constructor.DATA_KEY, this);
                                if (!g["default"].contains(this.element.ownerDocument.documentElement, this.tip)) {
                                    g["default"](o).appendTo(u);
                                }
                                g["default"](this.element).trigger(this.constructor.Event.INSERTED);
                                this._popper = new d["default"](this.element, o, this._getPopperConfig(l));
                                g["default"](o).addClass(oi);
                                g["default"](o).addClass(this.config.customClass);
                                if ("ontouchstart" in document.documentElement) {
                                    g["default"](document.body).children().on("mouseover", null, g["default"].noop);
                                }
                                var f = function e() {
                                    if (n.config.animation) {
                                        n._fixTransition();
                                    }
                                    var t = n._hoverState;
                                    n._hoverState = null;
                                    g["default"](n.element).trigger(n.constructor.Event.SHOWN);
                                    if (t === ni) {
                                        n._leave(null, n);
                                    }
                                };
                                if (g["default"](this.tip).hasClass(ri)) {
                                    var c = v.getTransitionDurationFromElement(this.tip);
                                    g["default"](this.tip).one(v.TRANSITION_END, f).emulateTransitionEnd(c);
                                } else {
                                    f();
                                }
                            }
                        };
                        e.hide = function e(t) {
                            var n = this;
                            var i = this.getTipElement();
                            var r = g["default"].Event(this.constructor.Event.HIDE);
                            var o = function e() {
                                if (n._hoverState !== ti && i.parentNode) {
                                    i.parentNode.removeChild(i);
                                }
                                n._cleanTipClass();
                                n.element.removeAttribute("aria-describedby");
                                g["default"](n.element).trigger(n.constructor.Event.HIDDEN);
                                if (n._popper !== null) {
                                    n._popper.destroy();
                                }
                                if (t) {
                                    t();
                                }
                            };
                            g["default"](this.element).trigger(r);
                            if (r.isDefaultPrevented()) {
                                return;
                            }
                            g["default"](i).removeClass(oi);
                            if ("ontouchstart" in document.documentElement) {
                                g["default"](document.body).children().off("mouseover", null, g["default"].noop);
                            }
                            this._activeTrigger[fi] = false;
                            this._activeTrigger[ui] = false;
                            this._activeTrigger[li] = false;
                            if (g["default"](this.tip).hasClass(ri)) {
                                var a = v.getTransitionDurationFromElement(i);
                                g["default"](i).one(v.TRANSITION_END, o).emulateTransitionEnd(a);
                            } else {
                                o();
                            }
                            this._hoverState = "";
                        };
                        e.update = function e() {
                            if (this._popper !== null) {
                                this._popper.scheduleUpdate();
                            }
                        };
                        e.isWithContent = function e() {
                            return Boolean(this.getTitle());
                        };
                        e.addAttachmentClass = function e(t) {
                            g["default"](this.getTipElement()).addClass(Yn + "-" + t);
                        };
                        e.getTipElement = function e() {
                            this.tip = this.tip || g["default"](this.config.template)[0];
                            return this.tip;
                        };
                        e.setContent = function e() {
                            var t = this.getTipElement();
                            this.setElementContent(g["default"](t.querySelectorAll(ai)), this.getTitle());
                            g["default"](t).removeClass(ri + " " + oi);
                        };
                        e.setElementContent = function e(t, n) {
                            if (typeof n === "object" && (n.nodeType || n.jquery)) {
                                if (this.config.html) {
                                    if (!g["default"](n).parent().is(t)) {
                                        t.empty().append(n);
                                    }
                                } else {
                                    t.text(g["default"](n).text());
                                }
                                return;
                            }
                            if (this.config.html) {
                                if (this.config.sanitize) {
                                    n = Vn(n, this.config.whiteList, this.config.sanitizeFn);
                                }
                                t.html(n);
                            } else {
                                t.text(n);
                            }
                        };
                        e.getTitle = function e() {
                            var t = this.element.getAttribute("data-original-title");
                            if (!t) {
                                t = typeof this.config.title === "function" ? this.config.title.call(this.element) : this.config.title;
                            }
                            return t;
                        };
                        e._getPopperConfig = function e(t) {
                            var n = this;
                            var i = {
                                placement: t,
                                modifiers: { offset: this._getOffset(), flip: { behavior: this.config.fallbackPlacement }, arrow: { element: si }, preventOverflow: { boundariesElement: this.config.boundary } },
                                onCreate: function e(t) {
                                    if (t.originalPlacement !== t.placement) {
                                        n._handlePopperPlacementChange(t);
                                    }
                                },
                                onUpdate: function e(t) {
                                    return n._handlePopperPlacementChange(t);
                                },
                            };
                            return s({}, i, this.config.popperConfig);
                        };
                        e._getOffset = function e() {
                            var t = this;
                            var n = {};
                            if (typeof this.config.offset === "function") {
                                n.fn = function (e) {
                                    e.offsets = s({}, e.offsets, t.config.offset(e.offsets, t.element) || {});
                                    return e;
                                };
                            } else {
                                n.offset = this.config.offset;
                            }
                            return n;
                        };
                        e._getContainer = function e() {
                            if (this.config.container === false) {
                                return document.body;
                            }
                            if (v.isElement(this.config.container)) {
                                return g["default"](this.config.container);
                            }
                            return g["default"](document).find(this.config.container);
                        };
                        e._getAttachment = function e(t) {
                            return Zn[t.toUpperCase()];
                        };
                        e._setListeners = function e() {
                            var i = this;
                            var t = this.config.trigger.split(" ");
                            t.forEach(function (e) {
                                if (e === "click") {
                                    g["default"](i.element).on(i.constructor.Event.CLICK, i.config.selector, function (e) {
                                        return i.toggle(e);
                                    });
                                } else if (e !== ci) {
                                    var t = e === li ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN;
                                    var n = e === li ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
                                    g["default"](i.element)
                                        .on(t, i.config.selector, function (e) {
                                            return i._enter(e);
                                        })
                                        .on(n, i.config.selector, function (e) {
                                            return i._leave(e);
                                        });
                                }
                            });
                            this._hideModalHandler = function () {
                                if (i.element) {
                                    i.hide();
                                }
                            };
                            g["default"](this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler);
                            if (this.config.selector) {
                                this.config = s({}, this.config, { trigger: "manual", selector: "" });
                            } else {
                                this._fixTitle();
                            }
                        };
                        e._fixTitle = function e() {
                            var t = typeof this.element.getAttribute("data-original-title");
                            if (this.element.getAttribute("title") || t !== "string") {
                                this.element.setAttribute("data-original-title", this.element.getAttribute("title") || "");
                                this.element.setAttribute("title", "");
                            }
                        };
                        e._enter = function e(t, n) {
                            var i = this.constructor.DATA_KEY;
                            n = n || g["default"](t.currentTarget).data(i);
                            if (!n) {
                                n = new this.constructor(t.currentTarget, this._getDelegateConfig());
                                g["default"](t.currentTarget).data(i, n);
                            }
                            if (t) {
                                n._activeTrigger[t.type === "focusin" ? ui : li] = true;
                            }
                            if (g["default"](n.getTipElement()).hasClass(oi) || n._hoverState === ti) {
                                n._hoverState = ti;
                                return;
                            }
                            clearTimeout(n._timeout);
                            n._hoverState = ti;
                            if (!n.config.delay || !n.config.delay.show) {
                                n.show();
                                return;
                            }
                            n._timeout = setTimeout(function () {
                                if (n._hoverState === ti) {
                                    n.show();
                                }
                            }, n.config.delay.show);
                        };
                        e._leave = function e(t, n) {
                            var i = this.constructor.DATA_KEY;
                            n = n || g["default"](t.currentTarget).data(i);
                            if (!n) {
                                n = new this.constructor(t.currentTarget, this._getDelegateConfig());
                                g["default"](t.currentTarget).data(i, n);
                            }
                            if (t) {
                                n._activeTrigger[t.type === "focusout" ? ui : li] = false;
                            }
                            if (n._isWithActiveTrigger()) {
                                return;
                            }
                            clearTimeout(n._timeout);
                            n._hoverState = ni;
                            if (!n.config.delay || !n.config.delay.hide) {
                                n.hide();
                                return;
                            }
                            n._timeout = setTimeout(function () {
                                if (n._hoverState === ni) {
                                    n.hide();
                                }
                            }, n.config.delay.hide);
                        };
                        e._isWithActiveTrigger = function e() {
                            for (var t in this._activeTrigger) {
                                if (this._activeTrigger[t]) {
                                    return true;
                                }
                            }
                            return false;
                        };
                        e._getConfig = function e(t) {
                            var n = g["default"](this.element).data();
                            Object.keys(n).forEach(function (e) {
                                if (Gn.indexOf(e) !== -1) {
                                    delete n[e];
                                }
                            });
                            t = s({}, this.constructor.Default, n, typeof t === "object" && t ? t : {});
                            if (typeof t.delay === "number") {
                                t.delay = { show: t.delay, hide: t.delay };
                            }
                            if (typeof t.title === "number") {
                                t.title = t.title.toString();
                            }
                            if (typeof t.content === "number") {
                                t.content = t.content.toString();
                            }
                            v.typeCheckConfig($n, t, this.constructor.DefaultType);
                            if (t.sanitize) {
                                t.template = Vn(t.template, t.whiteList, t.sanitizeFn);
                            }
                            return t;
                        };
                        e._getDelegateConfig = function e() {
                            var t = {};
                            if (this.config) {
                                for (var n in this.config) {
                                    if (this.constructor.Default[n] !== this.config[n]) {
                                        t[n] = this.config[n];
                                    }
                                }
                            }
                            return t;
                        };
                        e._cleanTipClass = function e() {
                            var t = g["default"](this.getTipElement());
                            var n = t.attr("class").match(Kn);
                            if (n !== null && n.length) {
                                t.removeClass(n.join(""));
                            }
                        };
                        e._handlePopperPlacementChange = function e(t) {
                            this.tip = t.instance.popper;
                            this._cleanTipClass();
                            this.addAttachmentClass(this._getAttachment(t.placement));
                        };
                        e._fixTransition = function e() {
                            var t = this.getTipElement();
                            var n = this.config.animation;
                            if (t.getAttribute("x-placement") !== null) {
                                return;
                            }
                            g["default"](t).removeClass(ri);
                            this.config.animation = false;
                            this.hide();
                            this.show();
                            this.config.animation = n;
                        };
                        r._jQueryInterface = function e(i) {
                            return this.each(function () {
                                var e = g["default"](this);
                                var t = e.data(zn);
                                var n = typeof i === "object" && i;
                                if (!t && /dispose|hide/.test(i)) {
                                    return;
                                }
                                if (!t) {
                                    t = new r(this, n);
                                    e.data(zn, t);
                                }
                                if (typeof i === "string") {
                                    if (typeof t[i] === "undefined") {
                                        throw new TypeError('No method named "' + i + '"');
                                    }
                                    t[i]();
                                }
                            });
                        };
                        o(r, null, [
                            {
                                key: "VERSION",
                                get: function e() {
                                    return Un;
                                },
                            },
                            {
                                key: "Default",
                                get: function e() {
                                    return ei;
                                },
                            },
                            {
                                key: "NAME",
                                get: function e() {
                                    return $n;
                                },
                            },
                            {
                                key: "DATA_KEY",
                                get: function e() {
                                    return zn;
                                },
                            },
                            {
                                key: "Event",
                                get: function e() {
                                    return ii;
                                },
                            },
                            {
                                key: "EVENT_KEY",
                                get: function e() {
                                    return Qn;
                                },
                            },
                            {
                                key: "DefaultType",
                                get: function e() {
                                    return Jn;
                                },
                            },
                        ]);
                        return r;
                    })();
                (g["default"].fn[$n] = di._jQueryInterface),
                    (g["default"].fn[$n].Constructor = di),
                    (g["default"].fn[$n].noConflict = function () {
                        g["default"].fn[$n] = Xn;
                        return di._jQueryInterface;
                    });
                var hi = "popover",
                    pi = "4.6.0",
                    gi = "bs.popover",
                    mi = "." + gi,
                    vi = g["default"].fn[hi],
                    yi = "bs-popover",
                    bi = new RegExp("(^|\\s)" + yi + "\\S+", "g"),
                    _i = s({}, di.Default, {
                        placement: "right",
                        trigger: "click",
                        content: "",
                        template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>',
                    }),
                    wi = s({}, di.DefaultType, { content: "(string|element|function)" }),
                    xi = "fade",
                    Ei = "show",
                    Ti = ".popover-header",
                    Ci = ".popover-body",
                    Si = {
                        HIDE: "hide" + mi,
                        HIDDEN: "hidden" + mi,
                        SHOW: "show" + mi,
                        SHOWN: "shown" + mi,
                        INSERTED: "inserted" + mi,
                        CLICK: "click" + mi,
                        FOCUSIN: "focusin" + mi,
                        FOCUSOUT: "focusout" + mi,
                        MOUSEENTER: "mouseenter" + mi,
                        MOUSELEAVE: "mouseleave" + mi,
                    },
                    ki = (function (e) {
                        a(i, e);
                        function i() {
                            return e.apply(this, arguments) || this;
                        }
                        var t = i.prototype;
                        t.isWithContent = function e() {
                            return this.getTitle() || this._getContent();
                        };
                        t.addAttachmentClass = function e(t) {
                            g["default"](this.getTipElement()).addClass(yi + "-" + t);
                        };
                        t.getTipElement = function e() {
                            this.tip = this.tip || g["default"](this.config.template)[0];
                            return this.tip;
                        };
                        t.setContent = function e() {
                            var t = g["default"](this.getTipElement());
                            this.setElementContent(t.find(Ti), this.getTitle());
                            var n = this._getContent();
                            if (typeof n === "function") {
                                n = n.call(this.element);
                            }
                            this.setElementContent(t.find(Ci), n);
                            t.removeClass(xi + " " + Ei);
                        };
                        t._getContent = function e() {
                            return this.element.getAttribute("data-content") || this.config.content;
                        };
                        t._cleanTipClass = function e() {
                            var t = g["default"](this.getTipElement());
                            var n = t.attr("class").match(bi);
                            if (n !== null && n.length > 0) {
                                t.removeClass(n.join(""));
                            }
                        };
                        i._jQueryInterface = function e(n) {
                            return this.each(function () {
                                var e = g["default"](this).data(gi);
                                var t = typeof n === "object" ? n : null;
                                if (!e && /dispose|hide/.test(n)) {
                                    return;
                                }
                                if (!e) {
                                    e = new i(this, t);
                                    g["default"](this).data(gi, e);
                                }
                                if (typeof n === "string") {
                                    if (typeof e[n] === "undefined") {
                                        throw new TypeError('No method named "' + n + '"');
                                    }
                                    e[n]();
                                }
                            });
                        };
                        o(i, null, [
                            {
                                key: "VERSION",
                                get: function e() {
                                    return pi;
                                },
                            },
                            {
                                key: "Default",
                                get: function e() {
                                    return _i;
                                },
                            },
                            {
                                key: "NAME",
                                get: function e() {
                                    return hi;
                                },
                            },
                            {
                                key: "DATA_KEY",
                                get: function e() {
                                    return gi;
                                },
                            },
                            {
                                key: "Event",
                                get: function e() {
                                    return Si;
                                },
                            },
                            {
                                key: "EVENT_KEY",
                                get: function e() {
                                    return mi;
                                },
                            },
                            {
                                key: "DefaultType",
                                get: function e() {
                                    return wi;
                                },
                            },
                        ]);
                        return i;
                    })(di);
                (g["default"].fn[hi] = ki._jQueryInterface),
                    (g["default"].fn[hi].Constructor = ki),
                    (g["default"].fn[hi].noConflict = function () {
                        g["default"].fn[hi] = vi;
                        return ki._jQueryInterface;
                    });
                var Ai = "scrollspy",
                    Di = "4.6.0",
                    Ni = "bs.scrollspy",
                    ji = "." + Ni,
                    Oi = ".data-api",
                    Li = g["default"].fn[Ai],
                    Pi = { offset: 10, method: "auto", target: "" },
                    Ii = { offset: "number", method: "string", target: "(string|element)" },
                    Fi = "activate" + ji,
                    qi = "scroll" + ji,
                    Hi = "load" + ji + Oi,
                    Ri = "dropdown-item",
                    Mi = "active",
                    Bi = '[data-spy="scroll"]',
                    Wi = ".nav, .list-group",
                    Vi = ".nav-link",
                    $i = ".nav-item",
                    Ui = ".list-group-item",
                    zi = ".dropdown",
                    Qi = ".dropdown-item",
                    Xi = ".dropdown-toggle",
                    Yi = "offset",
                    Ki = "position",
                    Gi = (function () {
                        function i(e, t) {
                            var n = this;
                            this._element = e;
                            this._scrollElement = e.tagName === "BODY" ? window : e;
                            this._config = this._getConfig(t);
                            this._selector = this._config.target + " " + Vi + "," + (this._config.target + " " + Ui + ",") + (this._config.target + " " + Qi);
                            this._offsets = [];
                            this._targets = [];
                            this._activeTarget = null;
                            this._scrollHeight = 0;
                            g["default"](this._scrollElement).on(qi, function (e) {
                                return n._process(e);
                            });
                            this.refresh();
                            this._process();
                        }
                        var e = i.prototype;
                        e.refresh = function e() {
                            var t = this;
                            var n = this._scrollElement === this._scrollElement.window ? Yi : Ki;
                            var r = this._config.method === "auto" ? n : this._config.method;
                            var o = r === Ki ? this._getScrollTop() : 0;
                            this._offsets = [];
                            this._targets = [];
                            this._scrollHeight = this._getScrollHeight();
                            var i = [].slice.call(document.querySelectorAll(this._selector));
                            i.map(function (e) {
                                var t;
                                var n = v.getSelectorFromElement(e);
                                if (n) {
                                    t = document.querySelector(n);
                                }
                                if (t) {
                                    var i = t.getBoundingClientRect();
                                    if (i.width || i.height) {
                                        return [g["default"](t)[r]().top + o, n];
                                    }
                                }
                                return null;
                            })
                                .filter(function (e) {
                                    return e;
                                })
                                .sort(function (e, t) {
                                    return e[0] - t[0];
                                })
                                .forEach(function (e) {
                                    t._offsets.push(e[0]);
                                    t._targets.push(e[1]);
                                });
                        };
                        e.dispose = function e() {
                            g["default"].removeData(this._element, Ni);
                            g["default"](this._scrollElement).off(ji);
                            this._element = null;
                            this._scrollElement = null;
                            this._config = null;
                            this._selector = null;
                            this._offsets = null;
                            this._targets = null;
                            this._activeTarget = null;
                            this._scrollHeight = null;
                        };
                        e._getConfig = function e(t) {
                            t = s({}, Pi, typeof t === "object" && t ? t : {});
                            if (typeof t.target !== "string" && v.isElement(t.target)) {
                                var n = g["default"](t.target).attr("id");
                                if (!n) {
                                    n = v.getUID(Ai);
                                    g["default"](t.target).attr("id", n);
                                }
                                t.target = "#" + n;
                            }
                            v.typeCheckConfig(Ai, t, Ii);
                            return t;
                        };
                        e._getScrollTop = function e() {
                            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
                        };
                        e._getScrollHeight = function e() {
                            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                        };
                        e._getOffsetHeight = function e() {
                            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
                        };
                        e._process = function e() {
                            var t = this._getScrollTop() + this._config.offset;
                            var n = this._getScrollHeight();
                            var i = this._config.offset + n - this._getOffsetHeight();
                            if (this._scrollHeight !== n) {
                                this.refresh();
                            }
                            if (t >= i) {
                                var r = this._targets[this._targets.length - 1];
                                if (this._activeTarget !== r) {
                                    this._activate(r);
                                }
                                return;
                            }
                            if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) {
                                this._activeTarget = null;
                                this._clear();
                                return;
                            }
                            for (var o = this._offsets.length; o--; ) {
                                var a = this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (typeof this._offsets[o + 1] === "undefined" || t < this._offsets[o + 1]);
                                if (a) {
                                    this._activate(this._targets[o]);
                                }
                            }
                        };
                        e._activate = function e(t) {
                            this._activeTarget = t;
                            this._clear();
                            var n = this._selector.split(",").map(function (e) {
                                return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]';
                            });
                            var i = g["default"]([].slice.call(document.querySelectorAll(n.join(","))));
                            if (i.hasClass(Ri)) {
                                i.closest(zi).find(Xi).addClass(Mi);
                                i.addClass(Mi);
                            } else {
                                i.addClass(Mi);
                                i.parents(Wi)
                                    .prev(Vi + ", " + Ui)
                                    .addClass(Mi);
                                i.parents(Wi).prev($i).children(Vi).addClass(Mi);
                            }
                            g["default"](this._scrollElement).trigger(Fi, { relatedTarget: t });
                        };
                        e._clear = function e() {
                            [].slice
                                .call(document.querySelectorAll(this._selector))
                                .filter(function (e) {
                                    return e.classList.contains(Mi);
                                })
                                .forEach(function (e) {
                                    return e.classList.remove(Mi);
                                });
                        };
                        i._jQueryInterface = function e(n) {
                            return this.each(function () {
                                var e = g["default"](this).data(Ni);
                                var t = typeof n === "object" && n;
                                if (!e) {
                                    e = new i(this, t);
                                    g["default"](this).data(Ni, e);
                                }
                                if (typeof n === "string") {
                                    if (typeof e[n] === "undefined") {
                                        throw new TypeError('No method named "' + n + '"');
                                    }
                                    e[n]();
                                }
                            });
                        };
                        o(i, null, [
                            {
                                key: "VERSION",
                                get: function e() {
                                    return Di;
                                },
                            },
                            {
                                key: "Default",
                                get: function e() {
                                    return Pi;
                                },
                            },
                        ]);
                        return i;
                    })();
                g["default"](window).on(Hi, function () {
                    var e = [].slice.call(document.querySelectorAll(Bi));
                    var t = e.length;
                    for (var n = t; n--; ) {
                        var i = g["default"](e[n]);
                        Gi._jQueryInterface.call(i, i.data());
                    }
                }),
                    (g["default"].fn[Ai] = Gi._jQueryInterface),
                    (g["default"].fn[Ai].Constructor = Gi),
                    (g["default"].fn[Ai].noConflict = function () {
                        g["default"].fn[Ai] = Li;
                        return Gi._jQueryInterface;
                    });
                var Ji = "tab",
                    Zi = "4.6.0",
                    er = "bs.tab",
                    tr = "." + er,
                    nr = ".data-api",
                    ir = g["default"].fn[Ji],
                    rr = "hide" + tr,
                    or = "hidden" + tr,
                    ar = "show" + tr,
                    sr = "shown" + tr,
                    lr = "click" + tr + nr,
                    ur = "dropdown-menu",
                    fr = "active",
                    cr = "disabled",
                    dr = "fade",
                    hr = "show",
                    pr = ".dropdown",
                    gr = ".nav, .list-group",
                    mr = ".active",
                    vr = "> li > .active",
                    yr = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                    br = ".dropdown-toggle",
                    _r = "> .dropdown-menu .active",
                    wr = (function () {
                        function i(e) {
                            this._element = e;
                        }
                        var e = i.prototype;
                        e.show = function e() {
                            var i = this;
                            if ((this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && g["default"](this._element).hasClass(fr)) || g["default"](this._element).hasClass(cr)) {
                                return;
                            }
                            var t;
                            var r;
                            var n = g["default"](this._element).closest(gr)[0];
                            var o = v.getSelectorFromElement(this._element);
                            if (n) {
                                var a = n.nodeName === "UL" || n.nodeName === "OL" ? vr : mr;
                                r = g["default"].makeArray(g["default"](n).find(a));
                                r = r[r.length - 1];
                            }
                            var s = g["default"].Event(rr, { relatedTarget: this._element });
                            var l = g["default"].Event(ar, { relatedTarget: r });
                            if (r) {
                                g["default"](r).trigger(s);
                            }
                            g["default"](this._element).trigger(l);
                            if (l.isDefaultPrevented() || s.isDefaultPrevented()) {
                                return;
                            }
                            if (o) {
                                t = document.querySelector(o);
                            }
                            this._activate(this._element, n);
                            var u = function e() {
                                var t = g["default"].Event(or, { relatedTarget: i._element });
                                var n = g["default"].Event(sr, { relatedTarget: r });
                                g["default"](r).trigger(t);
                                g["default"](i._element).trigger(n);
                            };
                            if (t) {
                                this._activate(t, t.parentNode, u);
                            } else {
                                u();
                            }
                        };
                        e.dispose = function e() {
                            g["default"].removeData(this._element, er);
                            this._element = null;
                        };
                        e._activate = function e(t, n, i) {
                            var r = this;
                            var o = n && (n.nodeName === "UL" || n.nodeName === "OL") ? g["default"](n).find(vr) : g["default"](n).children(mr);
                            var a = o[0];
                            var s = i && a && g["default"](a).hasClass(dr);
                            var l = function e() {
                                return r._transitionComplete(t, a, i);
                            };
                            if (a && s) {
                                var u = v.getTransitionDurationFromElement(a);
                                g["default"](a).removeClass(hr).one(v.TRANSITION_END, l).emulateTransitionEnd(u);
                            } else {
                                l();
                            }
                        };
                        e._transitionComplete = function e(t, n, i) {
                            if (n) {
                                g["default"](n).removeClass(fr);
                                var r = g["default"](n.parentNode).find(_r)[0];
                                if (r) {
                                    g["default"](r).removeClass(fr);
                                }
                                if (n.getAttribute("role") === "tab") {
                                    n.setAttribute("aria-selected", false);
                                }
                            }
                            g["default"](t).addClass(fr);
                            if (t.getAttribute("role") === "tab") {
                                t.setAttribute("aria-selected", true);
                            }
                            v.reflow(t);
                            if (t.classList.contains(dr)) {
                                t.classList.add(hr);
                            }
                            if (t.parentNode && g["default"](t.parentNode).hasClass(ur)) {
                                var o = g["default"](t).closest(pr)[0];
                                if (o) {
                                    var a = [].slice.call(o.querySelectorAll(br));
                                    g["default"](a).addClass(fr);
                                }
                                t.setAttribute("aria-expanded", true);
                            }
                            if (i) {
                                i();
                            }
                        };
                        i._jQueryInterface = function e(n) {
                            return this.each(function () {
                                var e = g["default"](this);
                                var t = e.data(er);
                                if (!t) {
                                    t = new i(this);
                                    e.data(er, t);
                                }
                                if (typeof n === "string") {
                                    if (typeof t[n] === "undefined") {
                                        throw new TypeError('No method named "' + n + '"');
                                    }
                                    t[n]();
                                }
                            });
                        };
                        o(i, null, [
                            {
                                key: "VERSION",
                                get: function e() {
                                    return Zi;
                                },
                            },
                        ]);
                        return i;
                    })();
                g["default"](document).on(lr, yr, function (e) {
                    e.preventDefault();
                    wr._jQueryInterface.call(g["default"](this), "show");
                }),
                    (g["default"].fn[Ji] = wr._jQueryInterface),
                    (g["default"].fn[Ji].Constructor = wr),
                    (g["default"].fn[Ji].noConflict = function () {
                        g["default"].fn[Ji] = ir;
                        return wr._jQueryInterface;
                    });
                var xr = "toast",
                    Er = "4.6.0",
                    Tr = "bs.toast",
                    Cr = "." + Tr,
                    Sr = g["default"].fn[xr],
                    kr = "click.dismiss" + Cr,
                    Ar = "hide" + Cr,
                    Dr = "hidden" + Cr,
                    Nr = "show" + Cr,
                    jr = "shown" + Cr,
                    Or = "fade",
                    Lr = "hide",
                    Pr = "show",
                    Ir = "showing",
                    Fr = { animation: "boolean", autohide: "boolean", delay: "number" },
                    qr = { animation: true, autohide: true, delay: 500 },
                    Hr = '[data-dismiss="toast"]',
                    Rr = (function () {
                        function r(e, t) {
                            this._element = e;
                            this._config = this._getConfig(t);
                            this._timeout = null;
                            this._setListeners();
                        }
                        var e = r.prototype;
                        e.show = function e() {
                            var t = this;
                            var n = g["default"].Event(Nr);
                            g["default"](this._element).trigger(n);
                            if (n.isDefaultPrevented()) {
                                return;
                            }
                            this._clearTimeout();
                            if (this._config.animation) {
                                this._element.classList.add(Or);
                            }
                            var i = function e() {
                                t._element.classList.remove(Ir);
                                t._element.classList.add(Pr);
                                g["default"](t._element).trigger(jr);
                                if (t._config.autohide) {
                                    t._timeout = setTimeout(function () {
                                        t.hide();
                                    }, t._config.delay);
                                }
                            };
                            this._element.classList.remove(Lr);
                            v.reflow(this._element);
                            this._element.classList.add(Ir);
                            if (this._config.animation) {
                                var r = v.getTransitionDurationFromElement(this._element);
                                g["default"](this._element).one(v.TRANSITION_END, i).emulateTransitionEnd(r);
                            } else {
                                i();
                            }
                        };
                        e.hide = function e() {
                            if (!this._element.classList.contains(Pr)) {
                                return;
                            }
                            var t = g["default"].Event(Ar);
                            g["default"](this._element).trigger(t);
                            if (t.isDefaultPrevented()) {
                                return;
                            }
                            this._close();
                        };
                        e.dispose = function e() {
                            this._clearTimeout();
                            if (this._element.classList.contains(Pr)) {
                                this._element.classList.remove(Pr);
                            }
                            g["default"](this._element).off(kr);
                            g["default"].removeData(this._element, Tr);
                            this._element = null;
                            this._config = null;
                        };
                        e._getConfig = function e(t) {
                            t = s({}, qr, g["default"](this._element).data(), typeof t === "object" && t ? t : {});
                            v.typeCheckConfig(xr, t, this.constructor.DefaultType);
                            return t;
                        };
                        e._setListeners = function e() {
                            var t = this;
                            g["default"](this._element).on(kr, Hr, function () {
                                return t.hide();
                            });
                        };
                        e._close = function e() {
                            var t = this;
                            var n = function e() {
                                t._element.classList.add(Lr);
                                g["default"](t._element).trigger(Dr);
                            };
                            this._element.classList.remove(Pr);
                            if (this._config.animation) {
                                var i = v.getTransitionDurationFromElement(this._element);
                                g["default"](this._element).one(v.TRANSITION_END, n).emulateTransitionEnd(i);
                            } else {
                                n();
                            }
                        };
                        e._clearTimeout = function e() {
                            clearTimeout(this._timeout);
                            this._timeout = null;
                        };
                        r._jQueryInterface = function e(i) {
                            return this.each(function () {
                                var e = g["default"](this);
                                var t = e.data(Tr);
                                var n = typeof i === "object" && i;
                                if (!t) {
                                    t = new r(this, n);
                                    e.data(Tr, t);
                                }
                                if (typeof i === "string") {
                                    if (typeof t[i] === "undefined") {
                                        throw new TypeError('No method named "' + i + '"');
                                    }
                                    t[i](this);
                                }
                            });
                        };
                        o(r, null, [
                            {
                                key: "VERSION",
                                get: function e() {
                                    return Er;
                                },
                            },
                            {
                                key: "DefaultType",
                                get: function e() {
                                    return Fr;
                                },
                            },
                            {
                                key: "Default",
                                get: function e() {
                                    return qr;
                                },
                            },
                        ]);
                        return r;
                    })();
                (g["default"].fn[xr] = Rr._jQueryInterface),
                    (g["default"].fn[xr].Constructor = Rr),
                    (g["default"].fn[xr].noConflict = function () {
                        g["default"].fn[xr] = Sr;
                        return Rr._jQueryInterface;
                    }),
                    (e.Alert = j),
                    (e.Button = G),
                    (e.Carousel = $e),
                    (e.Collapse = dt),
                    (e.Dropdown = en),
                    (e.Modal = Fn),
                    (e.Popover = ki),
                    (e.Scrollspy = Gi),
                    (e.Tab = wr),
                    (e.Toast = Rr),
                    (e.Tooltip = di),
                    (e.Util = v),
                    Object.defineProperty(e, "__esModule", { value: true });
            })(t, r, ve);
        });
    (be = _e) && be.__esModule && Object.prototype.hasOwnProperty.call(be, "default") && be.default;
    var we = n(function (e) {
        var t = (function (u) {
            var f = /\blang(?:uage)?-([\w-]+)\b/i,
                t = 0,
                O = {
                    manual: u.Prism && u.Prism.manual,
                    disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
                    util: {
                        encode: function e(t) {
                            return t instanceof L
                                ? new L(t.type, e(t.content), t.alias)
                                : Array.isArray(t)
                                ? t.map(e)
                                : t
                                      .replace(/&/g, "&amp;")
                                      .replace(/</g, "&lt;")
                                      .replace(/\u00a0/g, " ");
                        },
                        type: function (e) {
                            return Object.prototype.toString.call(e).slice(8, -1);
                        },
                        objId: function (e) {
                            return e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id;
                        },
                        clone: function n(e, i) {
                            var r, t;
                            switch (((i = i || {}), O.util.type(e))) {
                                case "Object":
                                    if (((t = O.util.objId(e)), i[t])) return i[t];
                                    for (var o in ((r = {}), (i[t] = r), e)) e.hasOwnProperty(o) && (r[o] = n(e[o], i));
                                    return r;
                                case "Array":
                                    return (
                                        (t = O.util.objId(e)),
                                        i[t]
                                            ? i[t]
                                            : ((r = []),
                                              (i[t] = r),
                                              e.forEach(function (e, t) {
                                                  r[t] = n(e, i);
                                              }),
                                              r)
                                    );
                                default:
                                    return e;
                            }
                        },
                        getLanguage: function (e) {
                            for (; e && !f.test(e.className); ) e = e.parentElement;
                            return e ? (e.className.match(f) || [, "none"])[1].toLowerCase() : "none";
                        },
                        currentScript: function () {
                            if ("undefined" == typeof document) return null;
                            if ("currentScript" in document) return document.currentScript;
                            try {
                                throw new Error();
                            } catch (e) {
                                var t = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
                                if (t) {
                                    var n = document.getElementsByTagName("script");
                                    for (var i in n) if (n[i].src == t) return n[i];
                                }
                                return null;
                            }
                        },
                        isActive: function (e, t, n) {
                            for (var i = "no-" + t; e; ) {
                                var r = e.classList;
                                if (r.contains(t)) return !0;
                                if (r.contains(i)) return !1;
                                e = e.parentElement;
                            }
                            return !!n;
                        },
                    },
                    languages: {
                        extend: function (e, t) {
                            var n = O.util.clone(O.languages[e]);
                            for (var i in t) n[i] = t[i];
                            return n;
                        },
                        insertBefore: function (n, e, t, i) {
                            var r = (i = i || O.languages)[n],
                                o = {};
                            for (var a in r)
                                if (r.hasOwnProperty(a)) {
                                    if (a == e) for (var s in t) t.hasOwnProperty(s) && (o[s] = t[s]);
                                    t.hasOwnProperty(a) || (o[a] = r[a]);
                                }
                            var l = i[n];
                            return (
                                (i[n] = o),
                                O.languages.DFS(O.languages, function (e, t) {
                                    t === l && e != n && (this[e] = o);
                                }),
                                o
                            );
                        },
                        DFS: function e(t, n, i, r) {
                            r = r || {};
                            var o = O.util.objId;
                            for (var a in t)
                                if (t.hasOwnProperty(a)) {
                                    n.call(t, a, t[a], i || a);
                                    var s = t[a],
                                        l = O.util.type(s);
                                    "Object" !== l || r[o(s)] ? "Array" !== l || r[o(s)] || ((r[o(s)] = !0), e(s, n, a, r)) : ((r[o(s)] = !0), e(s, n, null, r));
                                }
                        },
                    },
                    plugins: {},
                    highlightAll: function (e, t) {
                        O.highlightAllUnder(document, e, t);
                    },
                    highlightAllUnder: function (e, t, n) {
                        var i = { callback: n, container: e, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };
                        O.hooks.run("before-highlightall", i), (i.elements = Array.prototype.slice.apply(i.container.querySelectorAll(i.selector))), O.hooks.run("before-all-elements-highlight", i);
                        for (var r, o = 0; (r = i.elements[o++]); ) O.highlightElement(r, !0 === t, i.callback);
                    },
                    highlightElement: function (e, t, n) {
                        var i = O.util.getLanguage(e),
                            r = O.languages[i];
                        e.className = e.className.replace(f, "").replace(/\s+/g, " ") + " language-" + i;
                        var o = e.parentElement;
                        o && "pre" === o.nodeName.toLowerCase() && (o.className = o.className.replace(f, "").replace(/\s+/g, " ") + " language-" + i);
                        var a = { element: e, language: i, grammar: r, code: e.textContent };
                        function s(e) {
                            (a.highlightedCode = e), O.hooks.run("before-insert", a), (a.element.innerHTML = a.highlightedCode), O.hooks.run("after-highlight", a), O.hooks.run("complete", a), n && n.call(a.element);
                        }
                        if ((O.hooks.run("before-sanity-check", a), !a.code)) return O.hooks.run("complete", a), void (n && n.call(a.element));
                        if ((O.hooks.run("before-highlight", a), a.grammar))
                            if (t && u.Worker) {
                                var l = new Worker(O.filename);
                                (l.onmessage = function (e) {
                                    s(e.data);
                                }),
                                    l.postMessage(JSON.stringify({ language: a.language, code: a.code, immediateClose: !0 }));
                            } else s(O.highlight(a.code, a.grammar, a.language));
                        else s(O.util.encode(a.code));
                    },
                    hooks: {
                        all: {},
                        add: function (e, t) {
                            var n = O.hooks.all;
                            (n[e] = n[e] || []), n[e].push(t);
                        },
                        run: function (e, t) {
                            var n = O.hooks.all[e];
                            if (n && n.length) for (var i, r = 0; (i = n[r++]); ) i(t);
                        },
                    },
                    Token: L,
                };
            function L(e, t, n, i) {
                (this.type = e), (this.content = t), (this.alias = n), (this.length = 0 | (i || "").length);
            }
            function P(e, t, n, i) {
                e.lastIndex = t;
                var r = e.exec(n);
                if (r && i && r[1]) {
                    var o = r[1].length;
                    (r.index += o), (r[0] = r[0].slice(o));
                }
                return r;
            }
            function o() {
                var e = { value: null, prev: null, next: null },
                    t = { value: null, prev: e, next: null };
                (e.next = t), (this.head = e), (this.tail = t), (this.length = 0);
            }
            function I(e, t, n) {
                var i = t.next,
                    r = { value: n, prev: t, next: i };
                return (t.next = r), (i.prev = r), e.length++, r;
            }
            function F(e, t, n) {
                for (var i = t.next, r = 0; r < n && i !== e.tail; r++) i = i.next;
                ((t.next = i).prev = t), (e.length -= r);
            }
            var e = O.util.currentScript();
            function n() {
                O.manual || O.highlightAll();
            }
            if ((e && ((O.filename = e.src), e.hasAttribute("data-manual") && (O.manual = !0)), !O.manual)) {
                var i = document.readyState;
                "loading" === i || ("interactive" === i && e && e.defer) ? document.addEventListener("DOMContentLoaded", n) : window.requestAnimationFrame ? window.requestAnimationFrame(n) : window.setTimeout(n, 16);
            }
            return O;
        })("undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {});
        e.exports && (e.exports = t), void 0 !== i && (i.Prism = t);
    });
    Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"),
    (Prism.languages.js = Prism.languages.javascript),
    (window.jQuery = r),
    we.highlightAll(),
    r(function () {
        var t = new e();
        t.start({ countdown: !0, startValues: { seconds: 3600 } }),
            r("#countdownExample .values").html(t.getTimeValues().toString()),
            r("#countdown1 .values").html(t.getTimeValues().toString()),
            t.addEventListener("secondsUpdated", function (e) {
                r("#countdownExample .values").html(t.getTimeValues().toString());
                r("#countdown1 .values").html(t.getTimeValues().toString());
            }),
            t.addEventListener("targetAchieved", function (e) {
                r("#countdownExample .values").html("Promo Selesai");
                r("#countdownExample h5").html("Rp. 149.000");
                r("#countdownExample .values").addClass("over");
                r("#countdownExample h4").addClass("over");
                r("#countdownExample .khusus").addClass("over");

                r("#countdown1 .values").html("Promo Selesai");
                r("#countdown1 .values").addClass("over");
                r("#countdown1 p").html("Harga :");
                r("#countdown1 h4").addClass("over");
                r("#countdown1 h5").addClass("over");
                r("#countdown1 h5").html("Rp. 149.000");
            });
    });
})();
