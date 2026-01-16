// ==UserScript==
// @name         Hentai Heroes Penta Drill Sim
// @namespace    https://github.com/rena-jp/hh-penta-drill-sim
// @version      0.0.16
// @description  Add Penta Drill simulator for Hentai Heroes
// @author       rena
// @match        https://*.hentaiheroes.com/*
// @match        https://nutaku.haremheroes.com/*
// @match        https://*.gayharem.com/*
// @match        https://*.comixharem.com/*
// @match        https://*.pornstarharem.com/*
// @match        https://*.transpornstarharem.com/*
// @match        https://*.gaypornstarharem.com/*
// @match        https://*.mangarpg.com/*
// @grant        GM.getValue
// @grant        GM.setValue
// @run-at       document-body
// @updateURL    https://raw.githubusercontent.com/rena-jp/hh-penta-drill-sim/main/dist/hh-penta-drill-sim.meta.js
// @downloadURL  https://raw.githubusercontent.com/rena-jp/hh-penta-drill-sim/main/dist/hh-penta-drill-sim.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/common/types.ts
  var Rarities = [
    "starting",
    "common",
    "rare",
    "epic",
    "legendary",
    "mythic"
  ];
  var Elements = [
    "darkness",
    "light",
    "psychic",
    "water",
    "fire",
    "nature",
    "stone",
    "sun"
  ];
  var RoleIds = [4, 10, 9, 3, 1, 2, 5, 6];
  var RoleId = {
    Masochist: 1,
    Spermcaster: 2,
    Dominator: 3,
    Fluffer: 4,
    Corkscrewer: 5,
    Bugger: 6,
    Pleasurelock: 9,
    Sexomancer: 10
  };

  // src/modules/index.ts
  var modules_exports = {};
  __export(modules_exports, {
    AddResoureBarModule: () => AddResoureBarModule,
    CompactRewardsModule: () => CompactRewardsModule,
    FasterSkipButtonModule: () => FasterSkipButtonModule,
    PentaDrillSimModule: () => PentaDrillSimModule,
    TeamEditingTweaksModule: () => TeamEditingTweaksModule
  });

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var o;
  var r;
  var e;
  var f;
  var c;
  var s;
  var a;
  var h;
  var p = {};
  var v = [];
  var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var d = Array.isArray;
  function w(n2, l3) {
    for (var u4 in l3) n2[u4] = l3[u4];
    return n2;
  }
  function g(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function _(l3, u4, t2) {
    var i3, o3, r3, e2 = {};
    for (r3 in u4) "key" == r3 ? i3 = u4[r3] : "ref" == r3 ? o3 = u4[r3] : e2[r3] = u4[r3];
    if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l3 && null != l3.defaultProps) for (r3 in l3.defaultProps) void 0 === e2[r3] && (e2[r3] = l3.defaultProps[r3]);
    return m(l3, e2, i3, o3, null);
  }
  function m(n2, t2, i3, o3, r3) {
    var e2 = { type: n2, props: t2, key: i3, ref: o3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == r3 ? ++u : r3, __i: -1, __u: 0 };
    return null == r3 && null != l.vnode && l.vnode(e2), e2;
  }
  function k(n2) {
    return n2.children;
  }
  function x(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function S(n2, l3) {
    if (null == l3) return n2.__ ? S(n2.__, n2.__i + 1) : null;
    for (var u4; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) return u4.__e;
    return "function" == typeof n2.type ? S(n2) : null;
  }
  function C(n2) {
    var l3, u4;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) {
        n2.__e = n2.__c.base = u4.__e;
        break;
      }
      return C(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !$2.__r++ || o != l.debounceRendering) && ((o = l.debounceRendering) || r)($2);
  }
  function $2() {
    for (var n2, u4, t2, o3, r3, f4, c3, s3 = 1; i.length; ) i.length > s3 && i.sort(e), n2 = i.shift(), s3 = i.length, n2.__d && (t2 = void 0, o3 = void 0, r3 = (o3 = (u4 = n2).__v).__e, f4 = [], c3 = [], u4.__P && ((t2 = w({}, o3)).__v = o3.__v + 1, l.vnode && l.vnode(t2), O(u4.__P, t2, o3, u4.__n, u4.__P.namespaceURI, 32 & o3.__u ? [r3] : null, f4, null == r3 ? S(o3) : r3, !!(32 & o3.__u), c3), t2.__v = o3.__v, t2.__.__k[t2.__i] = t2, N(f4, t2, c3), o3.__e = o3.__ = null, t2.__e != r3 && C(t2)));
    $2.__r = 0;
  }
  function I(n2, l3, u4, t2, i3, o3, r3, e2, f4, c3, s3) {
    var a3, h3, y3, d3, w3, g3, _3, m3 = t2 && t2.__k || v, b2 = l3.length;
    for (f4 = P(u4, l3, m3, f4, b2), a3 = 0; a3 < b2; a3++) null != (y3 = u4.__k[a3]) && (h3 = -1 == y3.__i ? p : m3[y3.__i] || p, y3.__i = a3, g3 = O(n2, y3, h3, i3, o3, r3, e2, f4, c3, s3), d3 = y3.__e, y3.ref && h3.ref != y3.ref && (h3.ref && B(h3.ref, null, y3), s3.push(y3.ref, y3.__c || d3, y3)), null == w3 && null != d3 && (w3 = d3), (_3 = !!(4 & y3.__u)) || h3.__k === y3.__k ? f4 = A(y3, f4, n2, _3) : "function" == typeof y3.type && void 0 !== g3 ? f4 = g3 : d3 && (f4 = d3.nextSibling), y3.__u &= -7);
    return u4.__e = w3, f4;
  }
  function P(n2, l3, u4, t2, i3) {
    var o3, r3, e2, f4, c3, s3 = u4.length, a3 = s3, h3 = 0;
    for (n2.__k = new Array(i3), o3 = 0; o3 < i3; o3++) null != (r3 = l3[o3]) && "boolean" != typeof r3 && "function" != typeof r3 ? ("string" == typeof r3 || "number" == typeof r3 || "bigint" == typeof r3 || r3.constructor == String ? r3 = n2.__k[o3] = m(null, r3, null, null, null) : d(r3) ? r3 = n2.__k[o3] = m(k, { children: r3 }, null, null, null) : void 0 === r3.constructor && r3.__b > 0 ? r3 = n2.__k[o3] = m(r3.type, r3.props, r3.key, r3.ref ? r3.ref : null, r3.__v) : n2.__k[o3] = r3, f4 = o3 + h3, r3.__ = n2, r3.__b = n2.__b + 1, e2 = null, -1 != (c3 = r3.__i = L(r3, u4, f4, a3)) && (a3--, (e2 = u4[c3]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c3 && (i3 > s3 ? h3-- : i3 < s3 && h3++), "function" != typeof r3.type && (r3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, r3.__u |= 4))) : n2.__k[o3] = null;
    if (a3) for (o3 = 0; o3 < s3; o3++) null != (e2 = u4[o3]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = S(e2)), D(e2, e2));
    return t2;
  }
  function A(n2, l3, u4, t2) {
    var i3, o3;
    if ("function" == typeof n2.type) {
      for (i3 = n2.__k, o3 = 0; i3 && o3 < i3.length; o3++) i3[o3] && (i3[o3].__ = n2, l3 = A(i3[o3], l3, u4, t2));
      return l3;
    }
    n2.__e != l3 && (t2 && (l3 && n2.type && !l3.parentNode && (l3 = S(n2)), u4.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function L(n2, l3, u4, t2) {
    var i3, o3, r3, e2 = n2.key, f4 = n2.type, c3 = l3[u4], s3 = null != c3 && 0 == (2 & c3.__u);
    if (null === c3 && null == e2 || s3 && e2 == c3.key && f4 == c3.type) return u4;
    if (t2 > (s3 ? 1 : 0)) {
      for (i3 = u4 - 1, o3 = u4 + 1; i3 >= 0 || o3 < l3.length; ) if (null != (c3 = l3[r3 = i3 >= 0 ? i3-- : o3++]) && 0 == (2 & c3.__u) && e2 == c3.key && f4 == c3.type) return r3;
    }
    return -1;
  }
  function T(n2, l3, u4) {
    "-" == l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || y.test(l3) ? u4 : u4 + "px";
  }
  function j(n2, l3, u4, t2, i3) {
    var o3, r3;
    n: if ("style" == l3) if ("string" == typeof u4) n2.style.cssText = u4;
    else {
      if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l3 in t2) u4 && l3 in u4 || T(n2.style, l3, "");
      if (u4) for (l3 in u4) t2 && u4[l3] == t2[l3] || T(n2.style, l3, u4[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) o3 = l3 != (l3 = l3.replace(f, "$1")), r3 = l3.toLowerCase(), l3 = r3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? r3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + o3] = u4, u4 ? t2 ? u4.u = t2.u : (u4.u = c, n2.addEventListener(l3, o3 ? a : s, o3)) : n2.removeEventListener(l3, o3 ? a : s, o3);
    else {
      if ("http://www.w3.org/2000/svg" == i3) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == u4 ? "" : u4;
        break n;
      } catch (n3) {
      }
      "function" == typeof u4 || (null == u4 || false === u4 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u4 ? "" : u4));
    }
  }
  function F(n2) {
    return function(u4) {
      if (this.l) {
        var t2 = this.l[u4.type + n2];
        if (null == u4.t) u4.t = c++;
        else if (u4.t < t2.u) return;
        return t2(l.event ? l.event(u4) : u4);
      }
    };
  }
  function O(n2, u4, t2, i3, o3, r3, e2, f4, c3, s3) {
    var a3, h3, p3, v3, y3, _3, m3, b2, S2, C3, M3, $4, P3, A3, H2, L2, T2, j2 = u4.type;
    if (void 0 !== u4.constructor) return null;
    128 & t2.__u && (c3 = !!(32 & t2.__u), r3 = [f4 = u4.__e = t2.__e]), (a3 = l.__b) && a3(u4);
    n: if ("function" == typeof j2) try {
      if (b2 = u4.props, S2 = "prototype" in j2 && j2.prototype.render, C3 = (a3 = j2.contextType) && i3[a3.__c], M3 = a3 ? C3 ? C3.props.value : a3.__ : i3, t2.__c ? m3 = (h3 = u4.__c = t2.__c).__ = h3.__E : (S2 ? u4.__c = h3 = new j2(b2, M3) : (u4.__c = h3 = new x(b2, M3), h3.constructor = j2, h3.render = E), C3 && C3.sub(h3), h3.state || (h3.state = {}), h3.__n = i3, p3 = h3.__d = true, h3.__h = [], h3._sb = []), S2 && null == h3.__s && (h3.__s = h3.state), S2 && null != j2.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = w({}, h3.__s)), w(h3.__s, j2.getDerivedStateFromProps(b2, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u4, p3) S2 && null == j2.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), S2 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
      else {
        if (S2 && null == j2.getDerivedStateFromProps && b2 !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(b2, M3), u4.__v == t2.__v || !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(b2, h3.__s, M3)) {
          for (u4.__v != t2.__v && (h3.props = b2, h3.state = h3.__s, h3.__d = false), u4.__e = t2.__e, u4.__k = t2.__k, u4.__k.some(function(n3) {
            n3 && (n3.__ = u4);
          }), $4 = 0; $4 < h3._sb.length; $4++) h3.__h.push(h3._sb[$4]);
          h3._sb = [], h3.__h.length && e2.push(h3);
          break n;
        }
        null != h3.componentWillUpdate && h3.componentWillUpdate(b2, h3.__s, M3), S2 && null != h3.componentDidUpdate && h3.__h.push(function() {
          h3.componentDidUpdate(v3, y3, _3);
        });
      }
      if (h3.context = M3, h3.props = b2, h3.__P = n2, h3.__e = false, P3 = l.__r, A3 = 0, S2) {
        for (h3.state = h3.__s, h3.__d = false, P3 && P3(u4), a3 = h3.render(h3.props, h3.state, h3.context), H2 = 0; H2 < h3._sb.length; H2++) h3.__h.push(h3._sb[H2]);
        h3._sb = [];
      } else do {
        h3.__d = false, P3 && P3(u4), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++A3 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i3 = w(w({}, i3), h3.getChildContext())), S2 && !p3 && null != h3.getSnapshotBeforeUpdate && (_3 = h3.getSnapshotBeforeUpdate(v3, y3)), L2 = a3, null != a3 && a3.type === k && null == a3.key && (L2 = V(a3.props.children)), f4 = I(n2, d(L2) ? L2 : [L2], u4, t2, i3, o3, r3, e2, f4, c3, s3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && e2.push(h3), m3 && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (u4.__v = null, c3 || null != r3) if (n3.then) {
        for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
        r3[r3.indexOf(f4)] = null, u4.__e = f4;
      } else {
        for (T2 = r3.length; T2--; ) g(r3[T2]);
        z(u4);
      }
      else u4.__e = t2.__e, u4.__k = t2.__k, n3.then || z(u4);
      l.__e(n3, u4, t2);
    }
    else null == r3 && u4.__v == t2.__v ? (u4.__k = t2.__k, u4.__e = t2.__e) : f4 = u4.__e = q(t2.__e, u4, t2, i3, o3, r3, e2, c3, s3);
    return (a3 = l.diffed) && a3(u4), 128 & u4.__u ? void 0 : f4;
  }
  function z(n2) {
    n2 && n2.__c && (n2.__c.__e = true), n2 && n2.__k && n2.__k.forEach(z);
  }
  function N(n2, u4, t2) {
    for (var i3 = 0; i3 < t2.length; i3++) B(t2[i3], t2[++i3], t2[++i3]);
    l.__c && l.__c(u4, n2), n2.some(function(u5) {
      try {
        n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
          n3.call(u5);
        });
      } catch (n3) {
        l.__e(n3, u5.__v);
      }
    });
  }
  function V(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : d(n2) ? n2.map(V) : w({}, n2);
  }
  function q(u4, t2, i3, o3, r3, e2, f4, c3, s3) {
    var a3, h3, v3, y3, w3, _3, m3, b2 = i3.props || p, k3 = t2.props, x3 = t2.type;
    if ("svg" == x3 ? r3 = "http://www.w3.org/2000/svg" : "math" == x3 ? r3 = "http://www.w3.org/1998/Math/MathML" : r3 || (r3 = "http://www.w3.org/1999/xhtml"), null != e2) {
      for (a3 = 0; a3 < e2.length; a3++) if ((w3 = e2[a3]) && "setAttribute" in w3 == !!x3 && (x3 ? w3.localName == x3 : 3 == w3.nodeType)) {
        u4 = w3, e2[a3] = null;
        break;
      }
    }
    if (null == u4) {
      if (null == x3) return document.createTextNode(k3);
      u4 = document.createElementNS(r3, x3, k3.is && k3), c3 && (l.__m && l.__m(t2, e2), c3 = false), e2 = null;
    }
    if (null == x3) b2 === k3 || c3 && u4.data == k3 || (u4.data = k3);
    else {
      if (e2 = e2 && n.call(u4.childNodes), !c3 && null != e2) for (b2 = {}, a3 = 0; a3 < u4.attributes.length; a3++) b2[(w3 = u4.attributes[a3]).name] = w3.value;
      for (a3 in b2) if (w3 = b2[a3], "children" == a3) ;
      else if ("dangerouslySetInnerHTML" == a3) v3 = w3;
      else if (!(a3 in k3)) {
        if ("value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3) continue;
        j(u4, a3, null, w3, r3);
      }
      for (a3 in k3) w3 = k3[a3], "children" == a3 ? y3 = w3 : "dangerouslySetInnerHTML" == a3 ? h3 = w3 : "value" == a3 ? _3 = w3 : "checked" == a3 ? m3 = w3 : c3 && "function" != typeof w3 || b2[a3] === w3 || j(u4, a3, w3, b2[a3], r3);
      if (h3) c3 || v3 && (h3.__html == v3.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t2.__k = [];
      else if (v3 && (u4.innerHTML = ""), I("template" == t2.type ? u4.content : u4, d(y3) ? y3 : [y3], t2, i3, o3, "foreignObject" == x3 ? "http://www.w3.org/1999/xhtml" : r3, e2, f4, e2 ? e2[0] : i3.__k && S(i3, 0), c3, s3), null != e2) for (a3 = e2.length; a3--; ) g(e2[a3]);
      c3 || (a3 = "value", "progress" == x3 && null == _3 ? u4.removeAttribute("value") : null != _3 && (_3 !== u4[a3] || "progress" == x3 && !_3 || "option" == x3 && _3 != b2[a3]) && j(u4, a3, _3, b2[a3], r3), a3 = "checked", null != m3 && m3 != u4[a3] && j(u4, a3, m3, b2[a3], r3));
    }
    return u4;
  }
  function B(n2, u4, t2) {
    try {
      if ("function" == typeof n2) {
        var i3 = "function" == typeof n2.__u;
        i3 && n2.__u(), i3 && null == u4 || (n2.__u = n2(u4));
      } else n2.current = u4;
    } catch (n3) {
      l.__e(n3, t2);
    }
  }
  function D(n2, u4, t2) {
    var i3, o3;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current != n2.__e || B(i3, null, u4)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u4);
      }
      i3.base = i3.__P = null;
    }
    if (i3 = n2.__k) for (o3 = 0; o3 < i3.length; o3++) i3[o3] && D(i3[o3], u4, t2 || "function" != typeof n2.type);
    t2 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function E(n2, l3, u4) {
    return this.constructor(n2, u4);
  }
  n = v.slice, l = { __e: function(n2, l3, u4, t2) {
    for (var i3, o3, r3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
      if ((o3 = i3.constructor) && null != o3.getDerivedStateFromError && (i3.setState(o3.getDerivedStateFromError(n2)), r3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t2 || {}), r3 = i3.__d), r3) return i3.__E = i3;
    } catch (l4) {
      n2 = l4;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, x.prototype.setState = function(n2, l3) {
    var u4;
    u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n2 && (n2 = n2(w({}, u4), this.props)), n2 && w(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), M(this));
  }, x.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, x.prototype.render = k, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
    return n2.__v.__b - l3.__v.__b;
  }, $2.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;

  // node_modules/preact-render-to-string/dist/index.module.js
  var r2 = "diffed";
  var o2 = "__c";
  var i2 = "__s";
  var a2 = "__c";
  var c2 = "__k";
  var u2 = "__d";
  var s2 = "__s";
  var l2 = /[\s\n\\/='"\0<>]/;
  var f2 = /^(xlink|xmlns|xml)([A-Z])/;
  var p2 = /^(?:accessK|auto[A-Z]|cell|ch|col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z])/;
  var h2 = /^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/;
  var d2 = /* @__PURE__ */ new Set(["draggable", "spellcheck"]);
  function v2(e2) {
    void 0 !== e2.__g ? e2.__g |= 8 : e2[u2] = true;
  }
  function m2(e2) {
    void 0 !== e2.__g ? e2.__g &= -9 : e2[u2] = false;
  }
  function y2(e2) {
    return void 0 !== e2.__g ? !!(8 & e2.__g) : true === e2[u2];
  }
  var _2 = /["&<]/;
  function g2(e2) {
    if (0 === e2.length || false === _2.test(e2)) return e2;
    for (var t2 = 0, n2 = 0, r3 = "", o3 = ""; n2 < e2.length; n2++) {
      switch (e2.charCodeAt(n2)) {
        case 34:
          o3 = "&quot;";
          break;
        case 38:
          o3 = "&amp;";
          break;
        case 60:
          o3 = "&lt;";
          break;
        default:
          continue;
      }
      n2 !== t2 && (r3 += e2.slice(t2, n2)), r3 += o3, t2 = n2 + 1;
    }
    return n2 !== t2 && (r3 += e2.slice(t2, n2)), r3;
  }
  var b = {};
  var x2 = /* @__PURE__ */ new Set(["animation-iteration-count", "border-image-outset", "border-image-slice", "border-image-width", "box-flex", "box-flex-group", "box-ordinal-group", "column-count", "fill-opacity", "flex", "flex-grow", "flex-negative", "flex-order", "flex-positive", "flex-shrink", "flood-opacity", "font-weight", "grid-column", "grid-row", "line-clamp", "line-height", "opacity", "order", "orphans", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "widows", "z-index", "zoom"]);
  var k2 = /[A-Z]/g;
  function w2(e2) {
    var t2 = "";
    for (var n2 in e2) {
      var r3 = e2[n2];
      if (null != r3 && "" !== r3) {
        var o3 = "-" == n2[0] ? n2 : b[n2] || (b[n2] = n2.replace(k2, "-$&").toLowerCase()), i3 = ";";
        "number" != typeof r3 || o3.startsWith("--") || x2.has(o3) || (i3 = "px;"), t2 = t2 + o3 + ":" + r3 + i3;
      }
    }
    return t2 || void 0;
  }
  function C2() {
    this.__d = true;
  }
  function A2(e2, t2) {
    return { __v: e2, context: t2, props: e2.props, setState: C2, forceUpdate: C2, __d: true, __h: new Array(0) };
  }
  var D2;
  var P2;
  var $3;
  var U;
  var F2 = {};
  var M2 = [];
  var W = Array.isArray;
  var z2 = Object.assign;
  var H = "";
  var N2 = "<!--$s-->";
  var q2 = "<!--/$s-->";
  function B2(a3, u4, s3) {
    var l3 = l[i2];
    l[i2] = true, D2 = l.__b, P2 = l[r2], $3 = l.__r, U = l.unmount;
    var f4 = _(k, null);
    f4[c2] = [a3];
    try {
      var p3 = O2(a3, u4 || F2, false, void 0, f4, false, s3);
      return W(p3) ? p3.join(H) : p3;
    } catch (e2) {
      if (e2.then) throw new Error('Use "renderToStringAsync" for suspenseful rendering.');
      throw e2;
    } finally {
      l[o2] && l[o2](a3, M2), l[i2] = l3, M2.length = 0;
    }
  }
  function I2(e2, t2) {
    var n2, r3 = e2.type, o3 = true;
    return e2[a2] ? (o3 = false, (n2 = e2[a2]).state = n2[s2]) : n2 = new r3(e2.props, t2), e2[a2] = n2, n2.__v = e2, n2.props = e2.props, n2.context = t2, v2(n2), null == n2.state && (n2.state = F2), null == n2[s2] && (n2[s2] = n2.state), r3.getDerivedStateFromProps ? n2.state = z2({}, n2.state, r3.getDerivedStateFromProps(n2.props, n2.state)) : o3 && n2.componentWillMount ? (n2.componentWillMount(), n2.state = n2[s2] !== n2.state ? n2[s2] : n2.state) : !o3 && n2.componentWillUpdate && n2.componentWillUpdate(), $3 && $3(e2), n2.render(n2.props, n2.state, t2);
  }
  function O2(t2, r3, o3, i3, u4, _3, b2) {
    if (null == t2 || true === t2 || false === t2 || t2 === H) return H;
    var x3 = typeof t2;
    if ("object" != x3) return "function" == x3 ? H : "string" == x3 ? g2(t2) : t2 + H;
    if (W(t2)) {
      var k3, C3 = H;
      u4[c2] = t2;
      for (var S2 = t2.length, L2 = 0; L2 < S2; L2++) {
        var E2 = t2[L2];
        if (null != E2 && "boolean" != typeof E2) {
          var j2, T2 = O2(E2, r3, o3, i3, u4, _3, b2);
          "string" == typeof T2 ? C3 += T2 : (k3 || (k3 = new Array(S2)), C3 && k3.push(C3), C3 = H, W(T2) ? (j2 = k3).push.apply(j2, T2) : k3.push(T2));
        }
      }
      return k3 ? (C3 && k3.push(C3), k3) : C3;
    }
    if (void 0 !== t2.constructor) return H;
    t2.__ = u4, D2 && D2(t2);
    var Z = t2.type, M3 = t2.props;
    if ("function" == typeof Z) {
      var B3, V3, K, J = r3;
      if (Z === k) {
        if ("tpl" in M3) {
          for (var Q = H, X = 0; X < M3.tpl.length; X++) if (Q += M3.tpl[X], M3.exprs && X < M3.exprs.length) {
            var Y = M3.exprs[X];
            if (null == Y) continue;
            "object" != typeof Y || void 0 !== Y.constructor && !W(Y) ? Q += Y : Q += O2(Y, r3, o3, i3, t2, _3, b2);
          }
          return Q;
        }
        if ("UNSTABLE_comment" in M3) return "<!--" + g2(M3.UNSTABLE_comment) + "-->";
        V3 = M3.children;
      } else {
        if (null != (B3 = Z.contextType)) {
          var ee = r3[B3.__c];
          J = ee ? ee.props.value : B3.__;
        }
        var te = Z.prototype && "function" == typeof Z.prototype.render;
        if (te) V3 = /**#__NOINLINE__**/
        I2(t2, J), K = t2[a2];
        else {
          t2[a2] = K = /**#__NOINLINE__**/
          A2(t2, J);
          for (var ne = 0; y2(K) && ne++ < 25; ) {
            m2(K), $3 && $3(t2);
            try {
              V3 = Z.call(K, M3, J);
            } catch (e2) {
              throw _3 && e2 && "function" == typeof e2.then && (t2._suspended = true), e2;
            }
          }
          v2(K);
        }
        if (null != K.getChildContext && (r3 = z2({}, r3, K.getChildContext())), te && l.errorBoundaries && (Z.getDerivedStateFromError || K.componentDidCatch)) {
          V3 = null != V3 && V3.type === k && null == V3.key && null == V3.props.tpl ? V3.props.children : V3;
          try {
            return O2(V3, r3, o3, i3, t2, _3, false);
          } catch (e2) {
            return Z.getDerivedStateFromError && (K[s2] = Z.getDerivedStateFromError(e2)), K.componentDidCatch && K.componentDidCatch(e2, F2), y2(K) ? (V3 = I2(t2, r3), null != (K = t2[a2]).getChildContext && (r3 = z2({}, r3, K.getChildContext())), O2(V3 = null != V3 && V3.type === k && null == V3.key && null == V3.props.tpl ? V3.props.children : V3, r3, o3, i3, t2, _3, b2)) : H;
          } finally {
            P2 && P2(t2), U && U(t2);
          }
        }
      }
      V3 = null != V3 && V3.type === k && null == V3.key && null == V3.props.tpl ? V3.props.children : V3;
      try {
        var re = O2(V3, r3, o3, i3, t2, _3, b2);
        return P2 && P2(t2), l.unmount && l.unmount(t2), t2._suspended ? "string" == typeof re ? N2 + re + q2 : W(re) ? (re.unshift(N2), re.push(q2), re) : re.then(function(e2) {
          return N2 + e2 + q2;
        }) : re;
      } catch (n2) {
        if (!_3 && b2 && b2.onError) {
          var oe = (function e2(n3) {
            return b2.onError(n3, t2, function(t3, n4) {
              try {
                return O2(t3, r3, o3, i3, n4, _3, b2);
              } catch (t4) {
                return e2(t4);
              }
            });
          })(n2);
          if (void 0 !== oe) return oe;
          var ie = l.__e;
          return ie && ie(n2, t2), H;
        }
        if (!_3) throw n2;
        if (!n2 || "function" != typeof n2.then) throw n2;
        return n2.then(function e2() {
          try {
            var n3 = O2(V3, r3, o3, i3, t2, _3, b2);
            return t2._suspended ? N2 + n3 + q2 : n3;
          } catch (t3) {
            if (!t3 || "function" != typeof t3.then) throw t3;
            return t3.then(e2);
          }
        });
      }
    }
    var ae, ce = "<" + Z, ue = H;
    for (var se in M3) {
      var le = M3[se];
      if ("function" != typeof (le = G(le) ? le.value : le) || "class" === se || "className" === se) {
        switch (se) {
          case "children":
            ae = le;
            continue;
          case "key":
          case "ref":
          case "__self":
          case "__source":
            continue;
          case "htmlFor":
            if ("for" in M3) continue;
            se = "for";
            break;
          case "className":
            if ("class" in M3) continue;
            se = "class";
            break;
          case "defaultChecked":
            se = "checked";
            break;
          case "defaultSelected":
            se = "selected";
            break;
          case "defaultValue":
          case "value":
            switch (se = "value", Z) {
              case "textarea":
                ae = le;
                continue;
              case "select":
                i3 = le;
                continue;
              case "option":
                i3 != le || "selected" in M3 || (ce += " selected");
            }
            break;
          case "dangerouslySetInnerHTML":
            ue = le && le.__html;
            continue;
          case "style":
            "object" == typeof le && (le = w2(le));
            break;
          case "acceptCharset":
            se = "accept-charset";
            break;
          case "httpEquiv":
            se = "http-equiv";
            break;
          default:
            if (f2.test(se)) se = se.replace(f2, "$1:$2").toLowerCase();
            else {
              if (l2.test(se)) continue;
              "-" !== se[4] && !d2.has(se) || null == le ? o3 ? h2.test(se) && (se = "panose1" === se ? "panose-1" : se.replace(/([A-Z])/g, "-$1").toLowerCase()) : p2.test(se) && (se = se.toLowerCase()) : le += H;
            }
        }
        null != le && false !== le && (ce = true === le || le === H ? ce + " " + se : ce + " " + se + '="' + ("string" == typeof le ? g2(le) : le + H) + '"');
      }
    }
    if (l2.test(Z)) throw new Error(Z + " is not a valid HTML tag name in " + ce + ">");
    if (ue || ("string" == typeof ae ? ue = g2(ae) : null != ae && false !== ae && true !== ae && (ue = O2(ae, r3, "svg" === Z || "foreignObject" !== Z && o3, i3, t2, _3, b2))), P2 && P2(t2), U && U(t2), !ue && R.has(Z)) return ce + "/>";
    var fe = "</" + Z + ">", pe = ce + ">";
    return W(ue) ? [pe].concat(ue, [fe]) : "string" != typeof ue ? [pe, ue, fe] : pe + ue + fe;
  }
  var R = /* @__PURE__ */ new Set(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
  var V2 = B2;
  function G(e2) {
    return null !== e2 && "object" == typeof e2 && "function" == typeof e2.peek && "value" in e2;
  }

  // src/utils/async.ts
  var async_exports = {};
  __export(async_exports, {
    afterBodyLoaded: () => afterBodyLoaded,
    afterDomContentLoaded: () => afterDomContentLoaded,
    afterGameScriptsRun: () => afterGameScriptsRun,
    afterHeadLoaded: () => afterHeadLoaded,
    afterThirdpartyScriptsRun: () => afterThirdpartyScriptsRun,
    importHHPlusPlusConfig: () => importHHPlusPlusConfig,
    querySelector: () => querySelector,
    querySelectorAll: () => querySelectorAll,
    run: () => run
  });
  var bodyPromise = new Promise((resolve) => {
    const document2 = unsafeWindow.document;
    if (document2.body != null) {
      resolve(document2.body);
    } else {
      const htmlObserver = new MutationObserver(() => {
        if (document2.body != null) {
          htmlObserver.disconnect();
          resolve(document2.body);
        }
      });
      const html = document2.documentElement;
      htmlObserver.observe(html, { childList: true });
    }
  });
  var pagePromise = bodyPromise.then((body) => {
    const page = body.getAttribute("page");
    if (page != null) {
      return page;
    } else {
      return new Promise((resolve) => {
        const bodyObserver = new MutationObserver(() => {
          const page2 = body.getAttribute("page");
          if (page2 != null) {
            bodyObserver.disconnect();
            resolve(page2);
          }
        });
        bodyObserver.observe(body, {
          attributes: true,
          attributeFilter: ["page"]
        });
      });
    }
  });
  var domContentLoadedCapturePromise = new Promise((resolve) => {
    if (document.readyState === "loading") {
      unsafeWindow.addEventListener("DOMContentLoaded", () => resolve(), {
        capture: true,
        once: true
      });
    } else {
      resolve();
    }
  });
  var domContentLoadedBubblePromise = new Promise((resolve) => {
    if (document.readyState === "loading") {
      unsafeWindow.addEventListener("DOMContentLoaded", () => resolve(), {
        capture: false,
        once: true
      });
    } else {
      resolve();
    }
  });
  var gameScriptsRunPromise = domContentLoadedCapturePromise.then(() => {
    return new Promise((resolve) => {
      $(() => resolve());
    });
  });
  var thirdpartyScriptsRunPromise = new Promise((resolve) => {
    void gameScriptsRunPromise.then(() => {
      $(() => resolve());
    });
  });
  async function afterHeadLoaded() {
    await pagePromise;
  }
  function afterBodyLoaded() {
    return domContentLoadedCapturePromise;
  }
  function afterDomContentLoaded() {
    return domContentLoadedBubblePromise;
  }
  function afterGameScriptsRun() {
    return gameScriptsRunPromise;
  }
  function afterThirdpartyScriptsRun() {
    return thirdpartyScriptsRunPromise;
  }
  function run(f4) {
    return new Promise((resolve) => {
      queueMicrotask(() => {
        void Promise.resolve(f4()).then(resolve);
      });
    });
  }
  async function importHHPlusPlusConfig() {
    if (unsafeWindow.hhPlusPlusConfig) return unsafeWindow.hhPlusPlusConfig;
    await afterHeadLoaded();
    if (unsafeWindow.hhPlusPlusConfig) return unsafeWindow.hhPlusPlusConfig;
    await afterBodyLoaded();
    if (unsafeWindow.hhPlusPlusConfig) return unsafeWindow.hhPlusPlusConfig;
    await afterDomContentLoaded();
    if (unsafeWindow.hhPlusPlusConfig) return unsafeWindow.hhPlusPlusConfig;
    await afterGameScriptsRun();
    if (unsafeWindow.hhPlusPlusConfig) return unsafeWindow.hhPlusPlusConfig;
    await afterThirdpartyScriptsRun();
    return unsafeWindow.hhPlusPlusConfig;
  }
  function querySelector(target, selector) {
    return new Promise((resolve) => {
      const tryResolve = () => {
        const element = target.querySelector(selector);
        const found = element !== null;
        if (found) resolve(element);
        return found;
      };
      if (tryResolve()) return;
      const observer = new MutationObserver((mutations) => {
        if (mutations.every((mutation) => mutation.addedNodes.length === 0))
          return;
        if (tryResolve()) observer.disconnect();
      });
      observer.observe(target, { childList: true, subtree: true });
    });
  }
  function querySelectorAll(target, selector) {
    return new Promise((resolve) => {
      const tryResolve = () => {
        const elements = target.querySelectorAll(selector);
        const found = elements.length > 0;
        if (found) resolve(elements);
        return found;
      };
      if (tryResolve()) return;
      const observer = new MutationObserver((mutations) => {
        if (mutations.every((mutation) => mutation.addedNodes.length === 0))
          return;
        if (tryResolve()) observer.disconnect();
      });
      observer.observe(target, { childList: true, subtree: true });
    });
  }

  // src/utils/color.ts
  var color_exports = {};
  __export(color_exports, {
    getChanceColor: () => getChanceColor,
    getLPointsColor: () => getLPointsColor,
    getMojoColor: () => getMojoColor,
    getPDPointsColor: () => getPDPointsColor,
    getRoundsColor: () => getRoundsColor
  });
  function clamp(value, min, max) {
    return value <= min ? min : value >= max ? max : value;
  }
  function getGammaCorrectedValue(value) {
    return Math.round(255 * Math.sqrt(clamp(value, 0, 1)));
  }
  function getRatingColor(rate) {
    const red = getGammaCorrectedValue(2 - 2 * rate);
    const green = getGammaCorrectedValue(2 * rate);
    return `rgb(${red}, ${green}, 0)`;
  }
  function getChanceColor(chance) {
    const rate = clamp(chance, 0, 1) ** 3;
    return getRatingColor(rate);
  }
  function getMojoColor(mojo) {
    let rate = clamp(mojo + 10, 0, 40) / 40;
    rate = 0.5 - 0.5 * Math.cos(rate ** 2 * Math.PI);
    return getRatingColor(rate);
  }
  function getLPointsColor(points) {
    const rate = ((clamp(points, 3, 25) - 3) / 22) ** 3;
    return getRatingColor(rate);
  }
  function getPDPointsColor(points) {
    const rate = clamp(points / 10, 0, 1) ** 3;
    return getRatingColor(rate);
  }
  function getRoundsColor(rounds) {
    const rate = clamp((100 - rounds) / 20, 0, 1);
    return getRatingColor(rate);
  }

  // src/utils/page.ts
  var page_exports = {};
  __export(page_exports, {
    startsWith: () => startsWith
  });
  function startsWith(searchString) {
    return unsafeWindow.location.pathname.startsWith(searchString);
  }

  // src/utils/style.ts
  var style_exports = {};
  __export(style_exports, {
    injectToHead: () => injectToHead
  });
  function injectToHead(css) {
    const head = document.head;
    if (head == null) throw new Error("document.head not found");
    const style = document.createElement("style");
    style.classList.add("pdsim-style");
    style.innerHTML = css;
    head.append(style);
    return style;
  }

  // src/utils/storage.ts
  function getStorageKey(key) {
    const universe = unsafeWindow.HH_UNIVERSE;
    const id = unsafeWindow.shared.Hero.infos.id;
    return `${universe}-${id}-${key}`;
  }
  function getData(key, defaultValue) {
    return GM.getValue(getStorageKey(key), defaultValue);
  }
  function setData(key, value) {
    return GM.setValue(getStorageKey(key), value);
  }
  var ObjectDataPort = class {
    constructor(key, defaultValue) {
      this.key = key;
      this.defaultValue = defaultValue;
    }
    async read() {
      return { ...this.defaultValue, ...await getData(this.key) };
    }
    write(value) {
      return setData(this.key, value);
    }
  };

  // src/modules/add-resoure-bar/style.css
  var style_default = ".pdsim-resource-box {\n  width: 100%;\n  height: 0;\n  position: relative;\n}\n.pdsim-resource-box #drill_energy {\n  position: absolute;\n  bottom: 6rem;\n  left: 38%;\n  right: 38%;\n}\n.pdsim-resource-box #drill_energy.energy_counter span[rel=count_txt] {\n  margin-top: 0;\n}\n";

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var f3 = 0;
  function u3(e2, t2, n2, o3, i3, u4) {
    t2 || (t2 = {});
    var a3, c3, p3 = t2;
    if ("ref" in p3) for (c3 in p3 = {}, t2) "ref" == c3 ? a3 = t2[c3] : p3[c3] = t2[c3];
    var l3 = { type: e2, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i3, __self: u4 };
    if ("function" == typeof e2 && (a3 = e2.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
    return l.vnode && l.vnode(l3), l3;
  }

  // src/modules/add-resoure-bar/index.tsx
  var AddResoureBarModule = {
    key: "CompactRewardsModule",
    label: "Add Resouce Bar on pre-battle page",
    default: false,
    async run() {
      if (!page_exports.startsWith("/penta-drill-pre-battle")) return;
      style_exports.injectToHead(style_default);
      await async_exports.afterBodyLoaded();
      $(".penta-drill-pre-battle-container").append(
        V2(
          /* @__PURE__ */ u3("div", { className: "pdsim-resource-box", children: /* @__PURE__ */ u3(
            "div",
            {
              id: "drill_energy",
              className: "energy_counter",
              ...{ type: "drill" }
            }
          ) })
        )
      );
    }
  };

  // src/modules/compact-rewards/style.css
  var style_default2 = "body .popup_wrapper #rewards_popup .flex-container .rewards .container .scrolling_area,\nbody .popup_wrapper #rewards_popup .flex-container .rewards .container .rewards_scrollable,\nbody .popup_wrapper #rewards_popup .flex-container .rewards .rewards_background {\n  max-height: unset;\n}\nbody #rewards_big_header:not(.losing) {\n  zoom: 0.4;\n}\nbody .popup_wrapper #rewards_popup .flex-container .rewards .container .rewards_scrollable {\n  zoom: 0.65;\n}\n";

  // src/modules/compact-rewards/index.ts
  var CompactRewardsModule = {
    key: "CompactRewardsModule",
    label: "Compact battle rewards",
    default: false,
    run() {
      if (page_exports.startsWith("/penta-drill-battle") || page_exports.startsWith("/penta-drill-arena") || page_exports.startsWith("/penta-drill-pre-battle")) {
        style_exports.injectToHead(style_default2);
      }
    }
  };

  // src/modules/faster-skip-button/clickable-skip-buttons.css
  var clickable_skip_buttons_default = "#named-attack-background,\n#named-attack-container,\n.pvp-girls {\n  pointer-events: none;\n}\n";

  // src/modules/faster-skip-button/index.ts
  var FasterSkipButtonModule = {
    key: "FasterSkipButtonModule",
    label: "Make the skip button appear faster",
    default: false,
    settings: [
      {
        key: "clickableSkipButton",
        default: true,
        label: "Skip button remains clickable even during skill triggering"
      }
    ],
    async run(settings) {
      if (!page_exports.startsWith("/penta-drill-battle.html")) return;
      if (settings.clickableSkipButton) {
        style_exports.injectToHead(clickable_skip_buttons_default);
      }
      await async_exports.afterBodyLoaded();
      $(document).ajaxComplete((_event, _jqXHR, ajaxOptions) => {
        const { url, data } = ajaxOptions;
        if (!url?.startsWith("/ajax.php")) return;
        if (typeof data === "string" && data.includes("action=do_battles_penta_drill")) {
          $(".skip-buttons-container").attr("style", "");
        }
      });
    }
  };

  // src/modules/team-editing-tweaks/add-info.css
  var add_info_default = 'body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-level {\n  pointer-events: none;\n  position: absolute;\n  font-size: 11px;\n  line-height: 1;\n  background-color: #fff;\n  padding: 2px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-level.capped {\n  color: #c33;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-level.uncapped {\n  color: #33c;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-grade {\n  pointer-events: none;\n  position: absolute;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-grade.new_girl_tooltip {\n  background: none;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-grade.new_girl_tooltip .girl_tooltip_grade {\n  margin: 0;\n  line-height: 0;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-grade.new_girl_tooltip .girl_tooltip_grade > g {\n  width: 8px;\n  height: 8px;\n  margin: 0;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-grade.bar-section {\n  padding: 0;\n  width: max-content;\n  height: min-content;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-grade.bar-section > .top-text > .girl_quests {\n  position: static;\n  z-index: 0;\n  line-height: 0;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-grade.bar-section > .top-text > .girl_quests > g {\n  width: 8px;\n  height: 10px;\n  background-size: 10px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-class {\n  pointer-events: none;\n  position: absolute;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-class::before {\n  display: block;\n  position: absolute;\n  background-position: center;\n  background-color: #fff;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill .pdsim-role {\n  pointer-events: none;\n  position: absolute;\n  background-position: center;\n  background-color: #fff;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.player-panel .icon.hexagon-girl-element {\n  display: none;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.player-panel .pdsim-level {\n  top: 5px;\n  border-radius: 5px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.player-panel .pdsim-grade.new_girl_tooltip {\n  bottom: 6px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.player-panel .pdsim-grade.bar-section {\n  bottom: 4px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.player-panel .pdsim-class {\n  left: 0;\n  bottom: 12px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.player-panel .pdsim-class::before {\n  left: 0;\n  bottom: 0;\n  width: 20px;\n  height: 20px;\n  background-size: 16px;\n  border-radius: 10px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.player-panel .pdsim-role {\n  bottom: 12px;\n  right: 1px;\n  width: 20px;\n  height: 20px;\n  background-size: 16px;\n  border-radius: 10px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body {\n  border-radius: 5px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls {\n  grid-row-gap: 0;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container {\n  border-radius: 5px;\n  justify-content: start;\n  padding: 0 2px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container[team_slot]:not(.part-of-another-team)::after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 1.5rem;\n  height: 1.5rem;\n  font-size: 1rem;\n  text-shadow:\n    1px 1px 0 #000000,\n    -1px 1px 0 #000000,\n    -1px -1px 0 #000000,\n    1px -1px 0 #000000;\n  border-radius: 5px;\n  border: 0.125rem solid #feb825;\n  background:\n    linear-gradient(\n      to bottom,\n      #ffa23e 0%,\n      #ff545c 100%);\n  z-index: 3;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container[team_slot]:not(.part-of-another-team)[team_slot="1"]::after {\n  content: "1";\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container[team_slot]:not(.part-of-another-team)[team_slot="2"]::after {\n  content: "2";\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container[team_slot]:not(.part-of-another-team)[team_slot="3"]::after {\n  content: "3";\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container[team_slot]:not(.part-of-another-team)[team_slot="4"]::after {\n  content: "4";\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container[team_slot]:not(.part-of-another-team)[team_slot="5"]::after {\n  content: "5";\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container:not(.selected)[team_slot] .grey-overlay {\n  border-radius: 3px;\n  opacity: 0.6;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container .girl_img {\n  border-radius: 5px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container > .girl-element,\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container > .girl-power-icon {\n  display: none;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container .pdsim-level {\n  top: 0;\n  right: 2px;\n  border-radius: 0 5px 0 5px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container .pdsim-grade.new_girl_tooltip,\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container .pdsim-grade.bar-section {\n  bottom: 0;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container .pdsim-class {\n  left: 2px;\n  bottom: 12px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container .pdsim-class::before {\n  left: 0;\n  bottom: 0;\n  width: 16px;\n  height: 16px;\n  background-size: 14px;\n  border-radius: 0 5px 0 5px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container .pdsim-role {\n  right: 2px;\n  bottom: 12px;\n  width: 16px;\n  height: 16px;\n  background-size: 14px;\n  border-radius: 5px 0 5px 0;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container .pdsim-filter-value {\n  pointer-events: none;\n  position: absolute;\n  bottom: 0;\n  font-size: 9px;\n  line-height: 10px;\n  white-space: nowrap;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container .pdsim-filter-value .girl-power-icon {\n  display: inline-block;\n  margin: 0;\n  width: 8px;\n  height: 10px;\n  background-size: 10px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container .pdsim-filter-value [carac]::before {\n  width: 10px;\n  height: 10px;\n}\nbody.page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container {\n  height: 78px;\n}\n';

  // src/modules/team-editing-tweaks/aff-table.json
  var aff_table_default = {
    starting: [0, 90, 315, 878, 2003, 4253],
    common: [0, 180, 630, 1755, 4005, 8505],
    rare: [0, 540, 1890, 5265, 12015, 25515],
    epic: [0, 1260, 4410, 12285, 28035, 59535],
    legendary: [0, 1800, 6300, 17550, 40050, 85050],
    mythic: [0, 4500, 15750, 43875, 100125, 212625, 437625]
  };

  // src/modules/team-editing-tweaks/compact-grid.css
  var compact_grid_default = "body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel .panel-title {\n  height: 2.5rem;\n  margin-bottom: 0.5rem;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body {\n  height: calc(100% - 3rem);\n  border-radius: 5px;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls {\n  padding: 0;\n  grid-row-gap: 2px;\n  grid-template-columns: repeat(5, 58px);\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container {\n  width: 56px;\n  height: 64px;\n  padding: 0 2px;\n  justify-content: start;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container .girl-power-icon {\n  font-size: 9px;\n  margin-top: 0;\n  width: 16px;\n  height: 12px;\n  background-size: 16px;\n  line-height: 12px;\n}\n";

  // src/components/selectric.tsx
  function Selectric({
    id,
    label,
    selected,
    children
  }) {
    return /* @__PURE__ */ u3("div", { className: "form-control", children: /* @__PURE__ */ u3("div", { className: "select-group", children: [
      /* @__PURE__ */ u3("label", { className: "head-group", htmlFor: id, children: label }),
      /* @__PURE__ */ u3("select", { id, name: id, ...{ icon: "down-arrow" }, children: children.flatMap((e2) => e2).map((vNode) => /* @__PURE__ */ u3(
        "option",
        {
          value: String(vNode.key),
          selected: String(vNode.key) === selected,
          children: vNode
        },
        String(vNode.key)
      )) })
    ] }) });
  }

  // src/modules/team-editing-tweaks/filter-box.tsx
  var FilterList = [
    "grade",
    "sort",
    "element",
    "role",
    "class",
    "rarity",
    "affection",
    "level"
  ];
  var defaultSettings = {
    grade: "all",
    sort: "power",
    class: "all",
    rarity: "all",
    element: "all",
    role: "all",
    affection: "all",
    level: "all",
    open: false
  };
  var filterDataPort = new ObjectDataPort("pd_filter", defaultSettings);
  var FilterBox = class {
    callbacks;
    initialSettings;
    $filterBox;
    defaultSettings;
    constructor() {
      this.callbacks = [];
      this.$filterBox = null;
      this.initialSettings = filterDataPort.read();
      this.defaultSettings = { ...defaultSettings };
    }
    replaceGameFilter = async () => {
      const settings = await this.initialSettings;
      if (settings.sort === "xp") settings.sort = "xp_desc";
      if (settings.sort === "affection") settings.sort = "affection_desc";
      const $filterBox = $(getFilterBoxHtml(settings));
      this.$filterBox = $filterBox;
      const options = {
        disableOnMobile: false,
        nativeOnMobile: false
      };
      FilterList.forEach((e2) => {
        $filterBox.find(`#filter_${e2}`).selectric(options);
      });
      $filterBox.find(".shortcut-bar button.check-btn").each((_3, _e) => {
        const e2 = _e;
        const value = e2.value;
        $(e2).on("click", () => {
          $filterBox.find("#filter_role").prop("value", value).selectric("refresh").trigger("change");
        });
      });
      if (settings.open) $filterBox.addClass("visible-filters-panel");
      FilterList.forEach((e2) => {
        $filterBox.find(`#filter_${e2}`).on("change", this.triggerChangeEvent);
      });
      $(".panel-filters").after($filterBox);
      new MutationObserver(() => {
        const settings2 = this.getSettings();
        void filterDataPort.write(settings2);
      }).observe($filterBox.get(0), {
        attributes: true,
        attributeFilter: ["class"]
      });
    };
    triggerChangeEvent = () => {
      const settings = this.getSettings();
      void filterDataPort.write(settings);
      this.callbacks.forEach((f4) => {
        try {
          f4({ ...settings });
        } catch (e2) {
          console.error(e2);
        }
      });
    };
    refresh = async () => {
      await this.initialSettings;
      this.$filterBox.find("#filter_sort").trigger("change");
    };
    getSettings = () => {
      return getFilterSettings(this.$filterBox);
    };
    onChange = (callback) => {
      this.callbacks.push(callback);
    };
  };
  function getFilterSettings($filterBox) {
    const getValue = (e2) => String($filterBox.find(`#filter_${e2}`).val());
    const settings = {};
    [
      "grade",
      "sort",
      "class",
      "rarity",
      "element",
      "role",
      "affection",
      "level"
    ].forEach((e2) => {
      settings[e2] = getValue(e2);
    });
    settings.open = $filterBox.hasClass("visible-filters-panel");
    return settings;
  }
  function getFilterBoxHtml(settings) {
    if (unsafeWindow.GT?.design == null) {
      console.error("window.GT.design not found");
    }
    const design = unsafeWindow.GT?.design ?? {};
    return V2(
      /* @__PURE__ */ u3("div", { id: "pdsim-filter-box", className: "panel-filters", children: [
        /* @__PURE__ */ u3("div", { className: "form-wrapper", children: [
          /* @__PURE__ */ u3(
            Selectric,
            {
              id: "filter_grade",
              label: design.affection_category,
              selected: settings.grade,
              children: [
                /* @__PURE__ */ u3(k, { children: design.selectors_All }, "all"),
                /* @__PURE__ */ u3(k, { children: "1 ★" }, "1"),
                /* @__PURE__ */ u3(k, { children: "3 ★" }, "3"),
                /* @__PURE__ */ u3(k, { children: "5 ★" }, "5"),
                /* @__PURE__ */ u3(k, { children: "6 ★" }, "6"),
                /* @__PURE__ */ u3(k, { children: "5 ★, 6 ★" }, "11")
              ]
            }
          ),
          /* @__PURE__ */ u3(
            Selectric,
            {
              id: "filter_sort",
              label: design.haremdex_sort_by,
              selected: settings.sort,
              children: [
                /* @__PURE__ */ u3(k, { children: [
                  /* @__PURE__ */ u3("span", { className: "girl-power-icon" }),
                  design.caracs_sum
                ] }, "power"),
                /* @__PURE__ */ u3("span", { ...{ carac: "ego" }, children: design.carac_ego }, "ego"),
                /* @__PURE__ */ u3("span", { ...{ carac: "chance" }, children: design.carac_harmony }, "chance"),
                /* @__PURE__ */ u3("span", { ...{ carac: "damage" }, children: design.damage }, "damage"),
                /* @__PURE__ */ u3("span", { ...{ carac: "defense" }, children: design.carac_def }, "defense"),
                /* @__PURE__ */ u3("span", { ...{ carac: "mana" }, children: design.carac_starting_mana }, "starting_mana"),
                /* @__PURE__ */ u3("span", { ...{ carac: "mana-generation" }, children: design.carac_mana_generation }, "mana"),
                /* @__PURE__ */ u3("span", { ...{ carac: "speed" }, children: design.pvp_battle_speed }, "speed"),
                /* @__PURE__ */ u3(k, { children: [
                  "▲ ",
                  design.Level
                ] }, "level_asc"),
                /* @__PURE__ */ u3(k, { children: [
                  "▼ ",
                  design.Level
                ] }, "level_desc"),
                /* @__PURE__ */ u3("span", { className: "clip", children: [
                  "▲ ",
                  design.XP,
                  " (",
                  design.pop_description,
                  ")"
                ] }, "xp_asc"),
                /* @__PURE__ */ u3("span", { className: "clip", children: [
                  "▼ ",
                  design.XP,
                  " (",
                  design.pop_description,
                  ")"
                ] }, "xp_desc"),
                /* @__PURE__ */ u3("span", { className: "clip", children: [
                  "▲ ",
                  design.Affection,
                  " (",
                  design.pop_description,
                  ")"
                ] }, "affection_asc"),
                /* @__PURE__ */ u3("span", { className: "clip", children: [
                  "▼ ",
                  design.Affection,
                  " (",
                  design.pop_description,
                  ")"
                ] }, "affection_desc")
              ]
            }
          ),
          /* @__PURE__ */ u3(
            Selectric,
            {
              id: "filter_element",
              label: design.element,
              selected: settings.element,
              children: [
                /* @__PURE__ */ u3(k, { children: design.selectors_All }, "all"),
                Elements.map((e2) => /* @__PURE__ */ u3(k, { children: [
                  /* @__PURE__ */ u3("span", { className: `pdsim-selectric-icon ${e2}_element_icn` }),
                  design[`${e2}_flavor_element`]
                ] }, e2))
              ]
            }
          ),
          /* @__PURE__ */ u3(
            Selectric,
            {
              id: "filter_role",
              label: design.girl_role,
              selected: settings.role,
              children: [
                /* @__PURE__ */ u3(k, { children: design.selectors_All }, "all"),
                RoleIds.map((e2) => /* @__PURE__ */ u3(k, { children: [
                  /* @__PURE__ */ u3(
                    "span",
                    {
                      className: `pdsim-selectric-icon girl_role_${e2}_icn`,
                      ...{ "role-tooltip": e2 }
                    }
                  ),
                  design[`girl_role_${e2}_name`]
                ] }, e2))
              ]
            }
          ),
          /* @__PURE__ */ u3(
            Selectric,
            {
              id: "filter_class",
              label: design.mythic_equipment_class,
              selected: settings.class,
              children: [
                /* @__PURE__ */ u3(k, { children: design.selectors_All }, "all"),
                /* @__PURE__ */ u3("span", { ...{ carac: "1" }, children: design.clubup_hardcore_stats_bonus }, "1"),
                /* @__PURE__ */ u3("span", { ...{ carac: "2" }, children: design.clubup_charm_stats_bonus }, "2"),
                /* @__PURE__ */ u3("span", { ...{ carac: "3" }, children: design.clubup_know_how_stats_bonus }, "3")
              ]
            }
          ),
          /* @__PURE__ */ u3(
            Selectric,
            {
              id: "filter_rarity",
              label: design.selectors_Rarity,
              selected: settings.rarity,
              children: [
                /* @__PURE__ */ u3(k, { children: design.selectors_All }, "all"),
                Rarities.map((e2) => /* @__PURE__ */ u3(k, { children: [
                  /* @__PURE__ */ u3(
                    "span",
                    {
                      className: `pdsim-selectric-icon rarity-background ${e2}`
                    }
                  ),
                  design[`girls_rarity_${e2}`]
                ] }, e2))
              ]
            }
          ),
          /* @__PURE__ */ u3(
            Selectric,
            {
              id: "filter_affection",
              label: design.affection_cap,
              selected: settings.affection,
              children: [
                /* @__PURE__ */ u3(k, { children: design.selectors_All }, "all"),
                /* @__PURE__ */ u3(k, { children: design.capped }, "capped"),
                /* @__PURE__ */ u3(k, { children: design.uncapped }, "uncapped")
              ]
            }
          ),
          /* @__PURE__ */ u3(
            Selectric,
            {
              id: "filter_level",
              label: design.level_cap,
              selected: settings.level,
              children: [
                /* @__PURE__ */ u3(k, { children: design.selectors_All }, "all"),
                /* @__PURE__ */ u3(k, { children: design.capped }, "capped"),
                /* @__PURE__ */ u3(k, { children: design.uncapped }, "uncapped")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ u3("div", { className: "checkbox-group shortcut-bar", children: [
          /* @__PURE__ */ u3(
            "button",
            {
              className: "check-btn element-state",
              value: "all",
              ...{ tooltip: "All Roles" }
            }
          ),
          RoleIds.map((roleId, i3) => /* @__PURE__ */ u3(
            "button",
            {
              className: "check-btn element-state",
              value: roleId,
              ...{ "role-tooltip": roleId },
              children: /* @__PURE__ */ u3("span", { className: `role-icn girl_role_${roleId}_icn` })
            },
            i3
          ))
        ] })
      ] })
    );
  }

  // src/modules/team-editing-tweaks/filter-box.css
  var filter_box_default = 'body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > .change-team-panel.harem-panel .harem-panel-girls .harem-girl-container {\n  transition: none;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > .change-team-panel.harem-panel > #arena_filter {\n  display: none;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > .change-team-panel.harem-panel > #filter_girls {\n  display: inline-block;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > .panel-filters {\n  display: none;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters {\n  display: none;\n  white-space: nowrap;\n  position: absolute;\n  width: auto;\n  height: auto;\n  transition: none;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters.panel-filters.visible-filters-panel {\n  display: block;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .form-wrapper {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-gap: 0 0.5rem;\n  width: 24rem;\n  margin-right: 0.5rem;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .form-wrapper > .form-control > .select-group .selectric-open {\n  z-index: unset;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .form-wrapper > .form-control > .select-group .selectric-items {\n  z-index: 20;\n  height: auto;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .form-wrapper > .form-control > .select-group .selectric-items li {\n  height: auto;\n  line-height: 1.5rem;\n  padding: 0.25rem 0.5rem;\n  display: flex;\n  align-items: center;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .form-wrapper > .form-control > .select-group .selectric-items li > span.clip {\n  width: unset;\n  height: unset;\n  float: unset;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .selectric-wrapper > .selectric > span.label {\n  display: flex;\n  align-items: center;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .selectric-wrapper > .selectric > span.label > span.clip {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 8.5rem;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters span[carac] {\n  width: 1.5rem;\n  height: 1.5rem;\n  line-height: 1.5rem;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters span[carac]::before {\n  width: 1.5rem;\n  height: 1.5rem;\n  margin-right: 0.25rem;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .girl-power-icon,\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .pdsim-selectric-icon {\n  height: 1.5rem;\n  width: 1.5rem;\n  background-size: contain;\n  background-position: center;\n  margin-right: 0.25rem;\n}\n:is(body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .girl-power-icon, body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .pdsim-selectric-icon).rarity-background {\n  border: 2px solid #fff;\n  border-radius: 4px;\n}\n:is(body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .girl-power-icon, body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .pdsim-selectric-icon).rarity-background:after {\n  line-height: 20px;\n  font-size: 14px;\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  text-align: center;\n  color: white;\n  text-shadow:\n    1px -1px black,\n    1px 1px black,\n    -1px -1px black,\n    -1px 1px black,\n    0px -1px black,\n    0px 1px black,\n    -1px 0px black,\n    1px 0px black;\n}\n:is(body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .girl-power-icon, body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .pdsim-selectric-icon).rarity-background.starting:after {\n  content: "S";\n}\n:is(body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .girl-power-icon, body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .pdsim-selectric-icon).rarity-background.common:after {\n  content: "C";\n}\n:is(body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .girl-power-icon, body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .pdsim-selectric-icon).rarity-background.rare:after {\n  content: "R";\n}\n:is(body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .girl-power-icon, body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .pdsim-selectric-icon).rarity-background.epic:after {\n  content: "E";\n}\n:is(body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .girl-power-icon, body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .pdsim-selectric-icon).rarity-background.legendary:after {\n  content: "L";\n}\n:is(body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .girl-power-icon, body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .pdsim-selectric-icon).rarity-background.mythic:after {\n  content: "M";\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .shortcut-bar {\n  width: auto;\n  margin: 0;\n  padding: 0.5rem 0.5rem 0 0;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .shortcut-bar .check-btn.element-state {\n  width: 38px;\n  height: 38px;\n  padding: 0;\n}\nbody[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.container.penta-drill > #pdsim-filter-box.panel-filters .shortcut-bar .check-btn.element-state .role-icn {\n  width: 36px;\n  height: 36px;\n  background-size: 27px;\n}\n@media (min-width: 1026px) {\n  #pdsim-filter-box {\n    top: 8rem;\n  }\n}\n@media (max-width: 1025px) {\n  #pdsim-filter-box {\n    top: 9rem;\n  }\n}\n';

  // src/modules/team-editing-tweaks/skip-outside.css
  var skip_outside_default = "body[page=edit-penta-drill-team].page-edit-penta-drill-team > #contains_all > section > #edit-team-page.penta-drill > .change-team-panel.harem-panel > .panel-body > .harem-panel-girls > .harem-girl-container {\n  content-visibility: auto;\n}\n";

  // src/modules/team-editing-tweaks/tooltip-on-locked-girl.css
  var tooltip_on_locked_girl_default = "body.page-edit-penta-drill-team #edit-team-page.penta-drill .harem-panel .panel-body .harem-panel-girls .harem-girl-container:not(.selected)[team_slot] .grey-overlay {\n  pointer-events: none;\n}\n";

  // src/modules/team-editing-tweaks/xp-table.json
  var xp_table_default = {
    starting: [
      7359,
      11265,
      16928,
      25146,
      37077,
      54402,
      79562,
      116109,
      169196,
      246320,
      358361
    ],
    common: [
      7359,
      11265,
      16928,
      25146,
      37077,
      54402,
      79562,
      116109,
      169196,
      246320,
      358361
    ],
    rare: [
      8806,
      13487,
      20285,
      30144,
      44455,
      65241,
      95430,
      139277,
      202979,
      295522,
      429970
    ],
    epic: [
      10255,
      15714,
      23632,
      35126,
      51821,
      76066,
      111279,
      162431,
      236740,
      344704,
      501554
    ],
    legendary: [
      11703,
      17936,
      26984,
      40119,
      59191,
      86896,
      127137,
      185595,
      270519,
      393897,
      573149
    ],
    mythic: [
      29073,
      44622,
      67203,
      100007,
      147659,
      216880,
      317447,
      463551,
      675825,
      984238,
      1432338
    ]
  };

  // src/modules/team-editing-tweaks/index.tsx
  var TeamEditingTweaksModule = {
    key: "TeamEditingTweaksModule",
    label: "Team editing tweaks",
    default: true,
    settings: [
      { key: "compactGrid", default: true, label: "Compact grid" },
      {
        key: "tooltipOnLocked",
        default: true,
        label: "Show tooltip on locked girl"
      },
      {
        key: "overrideFilter",
        default: true,
        label: "Override Filter"
      },
      {
        key: "lazyLoad",
        default: true,
        label: "Do not load girl icons until it is shown"
      },
      {
        key: "showInfo",
        default: true,
        label: "Show Level, Grade, Class and Role"
      },
      {
        key: "fixBugs",
        default: true,
        label: "Fix game bugs"
      },
      {
        key: "skipOutside",
        default: false,
        label: "Stop drawing icons outside the screen (improve speed but cause flickering during scrolling)"
      }
    ],
    async run(settings) {
      if (!page_exports.startsWith("/edit-penta-drill-team")) {
        return;
      }
      if (settings.showInfo) {
        style_exports.injectToHead(add_info_default);
      }
      if (settings.compactGrid) {
        style_exports.injectToHead(compact_grid_default);
      }
      if (settings.tooltipOnLocked) {
        style_exports.injectToHead(tooltip_on_locked_girl_default);
      }
      if (settings.overrideFilter) {
        style_exports.injectToHead(filter_box_default);
      }
      if (settings.skipOutside) {
        style_exports.injectToHead(skip_outside_default);
      }
      await async_exports.afterBodyLoaded();
      let inited = false;
      const filterBox = new FilterBox();
      const availableGirls = unsafeWindow.availableGirls ?? [];
      if (availableGirls.length === 0) console.error("availableGirls not found");
      const filterGirls = createFilterGirls(availableGirls);
      const girlDataMap = new Map(
        filterGirls.map((e2) => [e2.id_girl, e2])
      );
      const unloadedIconMap = /* @__PURE__ */ new Map();
      if (settings.overrideFilter && settings.lazyLoad && typeof String.prototype.toImageUrl === "function") {
        filterGirls.forEach((e2) => {
          e2.visible = false;
        });
        document.querySelectorAll(".harem-panel-girls > div[id_girl]").forEach((e2) => {
          const id_girl = Number(e2.getAttribute("id_girl"));
          unloadGirlIcon(unloadedIconMap, id_girl, e2);
        });
      }
      const hexagonContainer = document.querySelector(
        ".change-team-panel.player-panel"
      );
      const hexagonLineObserver = new MutationObserver((m3) => {
        if (settings.fixBugs) fixTeamData(girlDataMap);
        m3.forEach((e2) => {
          const target = e2.target;
          const id = Number(target.dataset.girlId);
          loadHexagonGirlIcon(unloadedIconMap, id);
          onGirlChanged(target);
        });
      });
      const observeHexagonLine = () => {
        hexagonContainer.querySelectorAll(".team-member-container").forEach((e2) => {
          hexagonLineObserver.observe(e2, {
            attributes: true,
            attributeFilter: ["data-girl-id"]
          });
        });
      };
      const teamObserver = new MutationObserver(() => {
        onCurrentTeamChanged();
        observeHexagonLine();
      });
      teamObserver.observe(hexagonContainer, { childList: true });
      if (settings.overrideFilter) await filterBox.replaceGameFilter();
      let currentFilterSettings = filterBox.defaultSettings;
      await async_exports.afterGameScriptsRun();
      if (settings.lazyLoad) {
        document.querySelectorAll(".harem-panel-girls > div[id_girl]").forEach((e2) => {
          const id_girl = Number(e2.getAttribute("id_girl"));
          fixGirlIcon(unloadedIconMap, id_girl);
        });
      }
      if (settings.overrideFilter) {
        filterBox.onChange((e2) => onFilterChanged(e2));
        void filterBox.refresh();
      }
      if (!inited) onCurrentTeamChanged();
      if (settings.showInfo)
        addInfoToGridSlots(girlDataMap, currentFilterSettings);
      function onFilterChanged(filterSettings) {
        currentFilterSettings = filterSettings;
        if (settings.overrideFilter) {
          applyFilterToGridSlots(filterSettings, filterGirls, unloadedIconMap);
          applyFilterToHexagonSlots(filterSettings, girlDataMap);
        }
      }
      function onCurrentTeamChanged() {
        inited = true;
        if (settings.fixBugs) fixTeamData(girlDataMap);
        hexagonContainer.querySelectorAll(".team-member-container").forEach((e2) => {
          onGirlChanged(e2);
        });
      }
      function onGirlChanged(container) {
        const id = Number(container.dataset.girlId);
        const girl = girlDataMap.get(id);
        if (settings.showInfo) addInfo(container, girl);
        if (settings.overrideFilter) {
          applyFilterToHexagonSlot(currentFilterSettings, container, girl);
        }
      }
    }
  };
  function applyFilterToGridSlots(settings, filterGirls, unloadedIconMap) {
    const grid = document.querySelector(".harem-panel-girls");
    const oldDisplay = grid.style.display;
    grid.style.display = "none";
    try {
      filterGirls.forEach((e2) => {
        const id_girl = e2.id_girl;
        const matched = matchesFilter(settings, e2.availableGirl);
        if (matched && unloadedIconMap.has(id_girl)) {
          loadGirlIcon(unloadedIconMap, id_girl);
        }
        e2.visible = matched;
        e2.dom.style.display = matched ? "" : "none";
        addInfoToGridSlot(e2, settings, e2.dom);
      });
      const sort = settings.sort;
      filterGirls.sort((x3, y3) => y3[sort] - x3[sort]);
      grid.prepend(
        ...filterGirls.map((e2) => e2.dom).filter((e2) => e2.style.display !== "none")
      );
    } catch (_e) {
    }
    grid.style.display = oldDisplay;
  }
  function applyFilterToHexagonSlots(settings, girlDataMap) {
    document.querySelectorAll(
      ".change-team-panel.player-panel .team-member-container .team-member img"
    ).forEach((img) => {
      const id = getIdFromImg(img);
      const girl = girlDataMap.get(id);
      const container = img.closest(".team-member-container");
      if (container == null) return;
      applyFilterToHexagonSlot(settings, container, girl);
    });
  }
  function applyFilterToHexagonSlot(settings, container, girl) {
    if (girl != null) {
      const matches = matchesFilter(settings, girl.availableGirl);
      container.style.opacity = matches ? "1" : "0.5";
    } else {
      container.style.opacity = "1";
    }
  }
  function addInfoToGridSlots(girlDataMap, filter) {
    const girls = document.querySelectorAll(".harem-panel [id_girl]");
    girls.forEach((e2) => {
      const id = e2.getAttribute("id_girl");
      const girl = girlDataMap.get(Number(id));
      addInfoToGridSlot(girl, filter, e2);
    });
  }
  function addInfoToGridSlot(girl, filter, slot) {
    addInfo(slot, girl?.visible ? girl : void 0, filter);
  }
  function fixTeamData(girlDataMap) {
    unsafeWindow.all_teams.forEach((e2) => {
      e2.girls = e2.girls.map((e3) => ({
        ...e3,
        ...girlDataMap.get(Number(e3.id_girl))?.availableGirl
      }));
    });
  }
  function unloadGirlIcon(unloadedIconMap, id_girl, element) {
    const img = element.querySelector("img[girl-ico-src]");
    if (img == null) return;
    element.style.display = "none";
    const url = img.getAttribute("girl-ico-src");
    unloadedIconMap.set(id_girl, { img, url });
    img.removeAttribute("girl-ico-src");
  }
  function fixGirlIcon(unloadedIconMap, id_girl) {
    const iconData = unloadedIconMap.get(id_girl);
    if (iconData == null) return;
    const { img, url } = iconData;
    img.setAttribute("girl-ico-src", url);
  }
  function loadGirlIcon(unloadedIconMap, id_girl) {
    const iconData = unloadedIconMap.get(id_girl);
    if (iconData == null) return;
    const { img, url } = iconData;
    const icoUrl = url.toImageUrl("ico");
    img.setAttribute("girl-ico-src", url);
    img.setAttribute("src", icoUrl);
    unloadedIconMap.delete(id_girl);
  }
  function loadHexagonGirlIcon(unloadedIconMap, id_girl) {
    const iconData = unloadedIconMap.get(id_girl);
    if (iconData == null) return;
    const { img, url } = iconData;
    const icoUrl = url.toImageUrl("ico");
    img.setAttribute("girl-ico-src", url);
    img.setAttribute("src", icoUrl);
    unloadedIconMap.delete(id_girl);
    const hexagonImg = document.querySelector(`[data-girl-id="${id_girl}"] img`);
    if (hexagonImg != null) {
      hexagonImg.setAttribute("girl-ico-src", url);
      hexagonImg.setAttribute("src", icoUrl);
    }
  }
  function addInfo(container, girl, filter) {
    container.querySelectorAll(
      ".pdsim-level, .pdsim-grade, .pdsim-class, .pdsim-role, .pdsim-filter-value"
    ).forEach((e2) => e2.remove());
    if (girl == null) return;
    container.insertAdjacentHTML("beforeend", getLevelHtml(girl));
    const sortType = filter?.sort;
    container.insertAdjacentHTML("beforeend", getFilterValueHtml(girl, sortType));
    container.insertAdjacentHTML("beforeend", getClassHtml(girl));
    container.insertAdjacentHTML("beforeend", getRoleHtml(girl));
  }
  function getIdFromImg(img) {
    return Number(
      img.getAttribute("src")?.match(/\/(\d+)\/(?:ico|grade_skins)/)?.[1]
    );
  }
  function getLevelHtml(girl) {
    const { level, awakening_level } = girl.availableGirl;
    const capped = level >= 250 + 50 * awakening_level;
    const classList = ["pdsim-level", capped ? "capped" : "uncapped"];
    return V2(/* @__PURE__ */ u3("div", { className: classList.join(" "), children: level }));
  }
  function getGradeHtmlV2(girl) {
    const { graded, nb_grades, rarity, affection } = girl.availableGirl;
    const orange = graded;
    const green = graded < nb_grades && affection >= aff_table_default[rarity][graded + 1] ? 1 : 0;
    const grey = nb_grades - orange - green;
    return V2(
      /* @__PURE__ */ u3("div", { className: "pdsim-grade bar-section", children: /* @__PURE__ */ u3("div", { className: "top-text", children: /* @__PURE__ */ u3("div", { className: "girl_quests", children: [
        ...Array(orange).fill(/* @__PURE__ */ u3("g", {})),
        ...Array(green).fill(/* @__PURE__ */ u3("g", { className: "green" })),
        ...Array(grey).fill(/* @__PURE__ */ u3("g", { className: "grey" }))
      ] }) }) })
    );
  }
  function getClassHtml(girl) {
    const classId = girl.availableGirl.class;
    return V2(
      /* @__PURE__ */ u3("div", { className: "pdsim-class", ...{ carac: classId }, children: " " })
    );
  }
  function getRoleHtml(girl) {
    const id_role = girl.availableGirl.id_role;
    const classList = [`pdsim-role girl_role_${id_role}_icn`];
    return V2(/* @__PURE__ */ u3("div", { className: classList.join(" ") }));
  }
  function getFilterValueHtml(girl, key) {
    switch (key) {
      case "xp":
      case "xp_asc":
      case "xp_desc":
        return V2(
          /* @__PURE__ */ u3("div", { className: "pdsim-filter-value", children: Math.max(0, girl.xp_desc).toLocaleString() })
        );
      case "affection":
      case "affection_asc":
      case "affection_desc":
        return V2(
          /* @__PURE__ */ u3("div", { className: "pdsim-filter-value", children: Math.max(0, girl.affection_desc).toLocaleString() })
        );
      case "power":
        return V2(
          /* @__PURE__ */ u3("div", { className: "pdsim-filter-value", children: [
            /* @__PURE__ */ u3("span", { className: "girl-power-icon" }),
            girl.power.toLocaleString()
          ] })
        );
      case "ego":
        return V2(
          /* @__PURE__ */ u3("div", { className: "pdsim-filter-value", children: /* @__PURE__ */ u3("span", { ...{ carac: "ego" }, children: girl.ego.toLocaleString() }) })
        );
      case "chance":
        return V2(
          /* @__PURE__ */ u3("div", { className: "pdsim-filter-value", children: /* @__PURE__ */ u3("span", { ...{ carac: "chance" }, children: girl.chance.toLocaleString() }) })
        );
      case "damage":
        return V2(
          /* @__PURE__ */ u3("div", { className: "pdsim-filter-value", children: /* @__PURE__ */ u3("span", { ...{ carac: "damage" }, children: girl.damage.toLocaleString() }) })
        );
      case "defense":
        return V2(
          /* @__PURE__ */ u3("div", { className: "pdsim-filter-value", children: /* @__PURE__ */ u3("span", { ...{ carac: "defense" }, children: girl.defense.toLocaleString() }) })
        );
      case "starting_mana":
        return V2(
          /* @__PURE__ */ u3("div", { className: "pdsim-filter-value", children: /* @__PURE__ */ u3("span", { ...{ carac: "mana" }, children: girl.starting_mana.toLocaleString() }) })
        );
      case "mana":
        return V2(
          /* @__PURE__ */ u3("div", { className: "pdsim-filter-value", children: /* @__PURE__ */ u3("span", { ...{ carac: "mana-generation" }, children: girl.mana.toLocaleString() }) })
        );
      case "speed":
        return V2(
          /* @__PURE__ */ u3("div", { className: "pdsim-filter-value", children: /* @__PURE__ */ u3("span", { ...{ carac: "speed" }, children: girl.speed.toLocaleString() }, "speed") })
        );
      default:
        return getGradeHtmlV2(girl);
    }
  }
  function createFilterGirls(availableGirls) {
    const girlDomMap = /* @__PURE__ */ new Map();
    document.querySelectorAll(".harem-panel-girls > div[id_girl]").forEach((e2) => {
      const id_girl = e2.getAttribute("id_girl");
      girlDomMap.set(Number(id_girl), e2);
    });
    return availableGirls.map((girl) => {
      const caracs = girl.battle_caracs;
      const ego = caracs.ego;
      let damage = caracs.damage;
      if (girl.id_role === RoleId.Dominator) damage *= 1.05;
      if (girl.id_role === RoleId.Bugger) damage *= 0.8;
      damage = Math.ceil(damage);
      let defense = caracs.defense;
      if (girl.id_role === RoleId.Masochist) defense *= 1.15;
      defense = Math.ceil(defense);
      const mana = girl.id_role === RoleId.Spermcaster ? 35 : 20;
      const speed = caracs.speed;
      const requiredXp = xp_table_default[girl.rarity][girl.awakening_level] - girl.xp;
      const xp = requiredXp > 0 ? requiredXp : girl.awakening_level < 10 ? Math.min(
        0,
        girl.xp - xp_table_default[girl.rarity][girl.awakening_level + 1]
      ) : Number.MIN_SAFE_INTEGER;
      const requiredAffection = girl.graded < girl.nb_grades ? aff_table_default[girl.rarity][girl.graded + 1] - girl.affection : 0;
      const affection = requiredAffection > 0 ? requiredAffection : girl.graded + 1 < girl.nb_grades ? Math.min(
        0,
        girl.affection - aff_table_default[girl.rarity][girl.graded + 2]
      ) : Number.MIN_SAFE_INTEGER;
      const power = Math.ceil(ego + 7.5 * (damage + defense) + 0.625 * speed);
      return {
        id_girl: girl.id_girl,
        availableGirl: girl,
        dom: girlDomMap.get(girl.id_girl),
        power,
        ego,
        chance: caracs.chance,
        damage,
        defense,
        speed,
        starting_mana: caracs.mana_starting,
        mana,
        level_asc: -girl.level,
        level_desc: girl.level,
        xp,
        xp_asc: -xp,
        xp_desc: xp,
        affection,
        affection_asc: -affection,
        affection_desc: affection,
        visible: true
      };
    });
  }
  function matchesFilter(settings, girl) {
    const {
      grade,
      element,
      role,
      class: classId,
      rarity,
      affection,
      level
    } = settings;
    let matched = true;
    matched &&= grade === "all" || (grade === "11" ? girl.nb_grades >= 5 : String(girl.nb_grades) === grade);
    matched &&= element === "all" || girl.element === element;
    matched &&= role === "all" || String(girl.id_role) === role;
    matched &&= classId === "all" || String(girl.class) === classId;
    matched &&= rarity === "all" || girl.rarity === rarity;
    matched &&= affection === "all" || affection === "capped" === isAffectionCapped(girl);
    matched &&= level === "all" || level === "capped" === isLevelCapped(girl);
    return matched;
    function isAffectionCapped(girl2) {
      return girl2.graded >= girl2.nb_grades || girl2.affection >= aff_table_default[girl2.rarity][girl2.graded + 1];
    }
    function isLevelCapped(girl2) {
      return girl2.level >= girl2.awakening_level * 50 + 250;
    }
  }

  // src/common/data.ts
  function getTeamsFromFighters(fighter) {
    const { is_hero } = fighter;
    return fighter.fighters.map((fighters) => {
      const list = fighters.map((e2) => getGirlFromFighter(e2));
      const ids = list.map((e2) => e2.id_girl);
      const map = Object.fromEntries(list.map((e2) => [e2.id_girl, e2]));
      const team = {
        ids,
        is_hero,
        list,
        map,
        front: [2, 3].map((e2) => list[e2]).filter((e2) => e2 != null),
        middle: [0, 1, 4].map((e2) => list[e2]).filter((e2) => e2 != null),
        back: [5, 6].map((e2) => list[e2]).filter((e2) => e2 != null),
        reassurance_summary: [],
        pleasurelock_damage: 0
      };
      return team;
    });
  }
  function getTeamsFromGamePlayer(player) {
    return player.team.map((e2) => getTeamFromGameTeam(e2, player.is_hero));
  }
  function getTeamFromGameTeam(team, isHero) {
    const list = team.girls.map((e2) => getGirlFromTeamGirl(e2, isHero));
    const ids = list.map((e2) => e2.id_girl);
    const map = Object.fromEntries(list.map((e2) => [e2.id_girl, e2]));
    return {
      ids,
      is_hero: isHero,
      list,
      map,
      front: [2, 3].map((e2) => list[e2]).filter((e2) => e2 != null),
      middle: [0, 1, 4].map((e2) => list[e2]).filter((e2) => e2 != null),
      back: [5, 6].map((e2) => list[e2]).filter((e2) => e2 != null),
      reassurance_summary: [],
      pleasurelock_damage: 0
    };
  }
  function getGirlFromFighter(girl) {
    return {
      id_fighter: girl.id_fighter,
      id_girl: girl.id_girl,
      is_hero_fighter: girl.is_hero_fighter,
      damage: girl.damage,
      defense: girl.defense,
      chance: girl.chance,
      speed: girl.speed,
      id_role: girl.girl.girl.id_role,
      tier4_skill: getSkill4(girl.girl),
      tier4_count: 0,
      trigger_skill: girl.trigger_skill,
      initial_defense: girl.defense,
      initial_ego: girl.initial_ego,
      mana_starting: girl.remaining_mana,
      // mana_generation: girl.girl.battle_caracs.mana_generation, // 20
      remaining_ego: girl.initial_ego,
      remaining_mana: girl.remaining_mana,
      total_shields_amount: girl.total_shields_amount,
      is_defeated: false,
      burn_summary: [],
      stun_summary: 0
    };
  }
  function getGirlFromTeamGirl(girl, isHero) {
    const caracs = girl.battle_caracs;
    return {
      id_fighter: girl.id_member,
      id_girl: girl.id_girl,
      is_hero_fighter: isHero,
      damage: caracs.damage,
      defense: caracs.defense,
      chance: caracs.chance,
      speed: caracs.speed,
      id_role: girl.girl.id_role,
      tier4_skill: getSkill4(girl),
      tier4_count: 0,
      trigger_skill: getSkill5(girl),
      initial_defense: caracs.defense,
      initial_ego: caracs.ego,
      mana_starting: caracs.mana_starting,
      // mana_generation: girl.girl.battle_caracs.mana_generation, // 20 or 35
      remaining_ego: caracs.ego,
      remaining_mana: caracs.mana_starting,
      total_shields_amount: 0,
      is_defeated: false,
      burn_summary: [],
      stun_summary: 0
    };
  }
  function getSkill4(girl) {
    return girl.skills[9]?.skill.percentage_value ?? 0;
  }
  function getSkill5(girl) {
    return [
      15,
      // darkness, Spank!, 'punch'
      16,
      // light, Recovery, 'heal_up'
      17,
      // psychic, Mana Steal, mana_steal
      18,
      // water, Shields Up, 'shield_many'
      19,
      // fire, Burnout!, 'burn'
      20,
      // nature, Mana Boost, 'mana_boost'
      21,
      // stone, Reassurance, 'defenses_up'
      22
      // sun, Lovestruck, 'stun_many'
      // 23, // Spank!, "light_punch"
    ].reduce((p3, c3) => {
      return p3 ?? girl.skills[c3]?.skill;
    }, void 0) ?? {
      id_skill: 23,
      level: 0,
      skill_type: "light_punch",
      flat_value: null,
      percentage_value: 50
    };
  }
  function resetTeams(teams) {
    teams.forEach((e2) => resetTeam(e2));
  }
  function resetTeam(team) {
    team.list.forEach((e2) => resetGirl(e2));
    team.reassurance_summary = [];
    team.pleasurelock_damage = 0;
  }
  function resetGirl(girl) {
    girl.defense = girl.initial_defense;
    girl.remaining_ego = girl.initial_ego;
    girl.remaining_mana = girl.mana_starting;
    girl.total_shields_amount = 0;
    girl.is_defeated = false;
    girl.burn_summary = [];
    girl.stun_summary = 0;
    girl.tier4_count = 0;
  }

  // src/simulator/common.ts
  function receiveDamage(defender, damage) {
    if (defender.total_shields_amount >= damage) {
      defender.total_shields_amount -= damage;
    } else {
      defender.remaining_ego -= damage - defender.total_shields_amount;
      defender.total_shields_amount = 0;
      if (defender.remaining_ego <= 0) defender.is_defeated = true;
    }
  }
  function getLowestEgoValue(team) {
    return team.list.filter((e2) => !e2.is_defeated).reduce((p3, c3) => p3.remaining_ego <= c3.remaining_ego ? p3 : c3);
  }

  // src/simulator/effects/burn.ts
  function simulate({ attacker }) {
    if (attacker.burn_summary.length > 0) {
      const burn = attacker.burn_summary[0];
      burn.rounds_left--;
      receiveDamage(attacker, burn.damage);
      if (burn.rounds_left <= 0) {
        attacker.burn_summary.shift();
      }
    }
  }
  function validate() {
  }
  var burn_default = { simulate, validate };

  // src/simulator/effects/stun.ts
  function simulate2({ attacker }) {
    if (attacker.stun_summary > 0) {
      attacker.stun_summary--;
      return { isStunned: true };
    }
    return { isStunned: false };
  }
  function validate2() {
  }
  var stun_default = { simulate: simulate2, validate: validate2 };

  // src/simulator/effects/defenses_up.ts
  function simulate3(teams) {
    teams.forEach((team) => {
      team.reassurance_summary.forEach((e2) => {
        e2.rounds_left--;
        if (e2.rounds_left <= 0) {
          e2.buffs.forEach(([girl, value]) => {
            girl.defense -= value;
          });
        }
      });
      team.reassurance_summary = team.reassurance_summary.filter(
        (e2) => e2.rounds_left <= 0
      );
    });
  }
  function validate3() {
  }
  var defenses_up_default = { simulate: simulate3, validate: validate3 };

  // src/simulator/random.ts
  function isCritical(attacker, defender) {
    const p3 = 0.3 * attacker.chance / (attacker.chance + defender.chance);
    return Math.random() < p3;
  }
  function selectTargetFrom(targets) {
    return targets[Math.floor(targets.length * Math.random())];
  }
  function selectTargetsFrom(targets, maxCount) {
    if (targets.length <= maxCount) return targets;
    const temp = [...targets];
    const ret = [];
    [...Array(maxCount)].forEach(() => {
      const i3 = Math.floor(Math.random() * temp.length);
      ret.push(temp[i3]);
      temp[i3] = temp[temp.length - 1];
      temp.length--;
    });
    return ret;
  }

  // src/simulator/skills/burn.ts
  function simulate4({ attacker, defenderTeam }) {
    const flat = attacker.trigger_skill.flat_value;
    const percentage = attacker.trigger_skill.percentage_value / 100;
    let targets = defenderTeam.list.filter((e2) => !e2.is_defeated);
    targets = selectTargetsFrom(targets, 2);
    targets.forEach((e2) => {
      const damage = Math.ceil(e2.initial_ego * percentage);
      e2.burn_summary.push({ damage, rounds_left: flat });
    });
    attacker.remaining_mana -= 100;
  }
  function validate4() {
  }
  var burn_default2 = { simulate: simulate4, validate: validate4 };

  // src/simulator/skills/stun_many.ts
  function simulate5({ attacker, defenderTeam }) {
    const level = attacker.trigger_skill.level;
    const p3 = 0.1 + level * 0.035;
    if (Math.random() < p3) {
      let targets = defenderTeam.list.filter((e2) => !e2.is_defeated);
      targets = selectTargetsFrom(targets, 2);
      targets.forEach((e2) => {
        e2.stun_summary += 2;
      });
      attacker.remaining_mana -= 100;
    }
  }
  function validate5() {
  }
  var stun_many_default = { simulate: simulate5, validate: validate5 };

  // src/simulator/skills/mana_boost.ts
  function simulate6({ attacker, attackerTeam }) {
    const flat = attacker.trigger_skill.flat_value;
    let targets = attackerTeam.list.filter(
      (e2) => e2 != attacker && !e2.is_defeated
    );
    targets = selectTargetsFrom(targets, 2);
    targets.forEach((e2) => {
      e2.remaining_mana += flat;
    });
    attacker.remaining_mana -= 100;
  }
  function validate6() {
  }
  var mana_boost_default = { simulate: simulate6, validate: validate6 };

  // src/simulator/skills/mana_steal.ts
  function simulate7({ attacker, defenderTeam }) {
    const percentage = attacker.trigger_skill.percentage_value / 100;
    const targets = defenderTeam.list.filter((e2) => e2.remaining_mana > 0);
    const stolenMana = Math.floor(
      percentage * targets.reduce((p3, c3) => {
        const mana = Math.floor(c3.remaining_mana * percentage);
        c3.remaining_mana -= mana;
        return p3 + c3.remaining_mana + mana;
      }, 0)
    );
    attacker.remaining_mana = Math.min(
      100,
      attacker.remaining_mana - 100 + stolenMana
    );
  }
  function validate7() {
  }
  var mana_steal_default = { simulate: simulate7, validate: validate7 };

  // src/simulator/skills/defenses_up.ts
  function simulate8({ attacker, attackerTeam }) {
    const flat = attacker.trigger_skill.flat_value;
    const percentage = attacker.trigger_skill.percentage_value / 100;
    const targets = attackerTeam.list.filter((e2) => !e2.is_defeated);
    const buffs = targets.map((e2) => {
      const buff = Math.ceil(e2.initial_defense * percentage);
      e2.defense += buff;
      return [e2, buff];
    });
    attackerTeam.reassurance_summary.push({
      buffs,
      rounds_left: flat
    });
    attacker.remaining_mana -= 100;
  }
  function validate8() {
  }
  var defenses_up_default2 = { simulate: simulate8, validate: validate8 };

  // src/simulator/skills/heal_up.ts
  function simulate9({ attacker, attackerTeam }) {
    const percentage = attacker.trigger_skill.percentage_value / 100;
    attackerTeam.list.filter((e2) => !e2.is_defeated).forEach((e2) => {
      let heal = Math.ceil(e2.initial_ego * percentage);
      if (!attacker.is_hero_fighter) {
        heal = Math.ceil(heal * 0.05);
      }
      e2.remaining_ego = Math.min(e2.initial_ego, e2.remaining_ego + heal);
    });
    attacker.remaining_mana -= 100;
  }
  function validate9() {
  }
  var heal_up_default = { simulate: simulate9, validate: validate9 };

  // src/simulator/skills/necro_revive.ts
  function simulate10({ attacker, attackerTeam }) {
    const targets = attackerTeam.list.filter((e2) => e2.is_defeated);
    if (targets.length) {
      const target = selectTargetFrom(targets);
      let heal = attacker.remaining_ego;
      if (!attacker.is_hero_fighter) {
        heal = Math.ceil(heal * 0.05);
      }
      heal = Math.min(heal, target.initial_ego);
      target.remaining_ego += heal;
      if (target.remaining_ego > 0) target.is_defeated = false;
      attacker.remaining_mana -= 100;
    }
  }
  function validate10() {
  }
  var necro_revive_default = { simulate: simulate10, validate: validate10 };

  // src/simulator/skills/shield_many.ts
  function simulate11({ attacker, attackerTeam }) {
    const percentage = attacker.trigger_skill.percentage_value / 100;
    let targets = attackerTeam.list.filter(
      (e2) => e2 != attacker && !e2.is_defeated && e2.total_shields_amount >= e2.initial_ego
    );
    targets = selectTargetsFrom(targets, 3);
    targets.forEach((e2) => {
      const shield = Math.ceil(e2.initial_ego * percentage);
      e2.total_shields_amount = Math.min(
        e2.initial_ego,
        e2.total_shields_amount + shield
      );
    });
    attacker.remaining_mana -= 100;
  }
  function validate11() {
  }
  var shield_many_default = { simulate: simulate11, validate: validate11 };

  // src/simulator/skills/punch.ts
  function simulate12({ attacker, defenderTeam, teamSlot }) {
    const percentage = attacker.trigger_skill.percentage_value / 100;
    const targets = defenderTeam.list.filter((e2) => !e2.is_defeated);
    const defender = selectTargetFrom(targets);
    let attackPower = attacker.damage;
    if (teamSlot === 5 && attacker.tier4_skill > 0) {
      attackPower *= (1 + attacker.tier4_skill / 100) ** attacker.tier4_count;
    }
    let damage = Math.ceil(attackPower * percentage) - defender.defense;
    damage = Math.max(0, damage);
    receiveDamage(defender, damage);
    attacker.remaining_mana -= 100;
  }
  function validate12() {
  }
  var punch_default = { simulate: simulate12, validate: validate12 };

  // src/simulator/simulator.ts
  function simulatePentaDrill(heroTeams, opponentTeams, count) {
    const pointTable = Array(11).fill(0);
    let totalPoints = 0;
    let totalRounds = 0;
    let minRounds = Number.MAX_SAFE_INTEGER;
    let maxRounds = 0;
    for (let i3 = 0; i3 < count; i3++) {
      [heroTeams, opponentTeams].forEach((e2) => resetTeams(e2));
      const { points, rounds } = simulateBattle(heroTeams, opponentTeams);
      pointTable[points]++;
      totalPoints += points;
      totalRounds += rounds;
      minRounds = Math.min(minRounds, rounds);
      maxRounds = Math.max(maxRounds, rounds);
    }
    return {
      points: totalPoints / count,
      pointTable: pointTable.map((e2) => e2 / count),
      rounds: totalRounds / count,
      minRounds,
      maxRounds
    };
  }
  function simulateBattle(heroTeams, opponentTeams) {
    const matches = Math.min(heroTeams.length, opponentTeams.length);
    let points = 0;
    let currentRounds = 0;
    let sumRounds = 0;
    for (let i3 = 0; i3 < matches; i3++) {
      const heroTeam = heroTeams[i3];
      const opponentTeam = opponentTeams[i3];
      const result = simulateMatch(heroTeam, opponentTeam, currentRounds, i3 + 1);
      points += result.points;
      sumRounds += result.rounds - currentRounds;
      currentRounds = result.rounds;
      if (result.points === 1) currentRounds = 0;
    }
    return { points, rounds: sumRounds };
  }
  function simulateMatch(heroTeam, opponentTeam, startRounds, teamSlot) {
    const order = [
      ...opponentTeam.list.map((girl) => ({
        attacker: girl,
        attackerTeam: opponentTeam,
        defenderTeam: heroTeam,
        heroTeam,
        opponentTeam,
        teamSlot
      })),
      ...heroTeam.list.map((girl) => ({
        attacker: girl,
        attackerTeam: heroTeam,
        defenderTeam: opponentTeam,
        heroTeam,
        opponentTeam,
        teamSlot
      }))
    ];
    order.sort((x3, y3) => y3.attacker.speed - x3.attacker.speed);
    for (let i3 = startRounds + 1; i3 <= 100; i3++) {
      const results = simulateRound(order);
      if (results.isOver) {
        return { points: results.points, rounds: i3 };
      }
    }
    return { points: 1, rounds: 100 };
  }
  function simulateRound(order) {
    for (let i3 = 0, n2 = order.length; i3 < n2; i3++) {
      const turn = order[i3 % n2];
      if (i3 === 0) {
        defenses_up_default.simulate([turn.attackerTeam, turn.defenderTeam]);
      }
      const results = simulateTurn(turn);
      if (results.isOver) return results;
    }
    return { isOver: false };
  }
  function simulateTurn(params) {
    const { attacker, attackerTeam, defenderTeam } = params;
    if (attacker.is_defeated) return { isOver: false };
    attacker.tier4_count++;
    const { isStunned } = stun_default.simulate(params);
    if (!isStunned) {
      if (attacker.id_role === RoleId.Fluffer) {
        const { noHeal } = simulateFlufferHeal(params);
        if (noHeal) simulateAttack(params);
      } else {
        simulateAttack(params);
      }
      simulateManaGeneration(params);
      if (isDefeated(defenderTeam)) {
        return createResult(attacker.is_hero_fighter);
      }
      simulateSkill(params);
      if (isDefeated(defenderTeam)) {
        return createResult(attacker.is_hero_fighter);
      }
    }
    burn_default.simulate({ attacker });
    if (isDefeated(attackerTeam)) {
      return createResult(!attacker.is_hero_fighter);
    }
    return { isOver: false };
  }
  function createResult(isWin) {
    return { isOver: true, points: isWin ? 2 : 0 };
  }
  function isDefeated(team) {
    return team.list.every((e2) => e2.is_defeated);
  }
  function simulateManaGeneration({ attacker }) {
    if (attacker.remaining_mana < 100) {
      const addingMana = attacker.id_role === RoleId.Spermcaster ? 35 : 20;
      attacker.remaining_mana += addingMana;
      if (attacker.remaining_mana > 100) attacker.remaining_mana = 100;
    }
  }
  function simulateSkill(turn) {
    const { attacker } = turn;
    if (attacker.remaining_mana >= 100) {
      const skill = attacker.trigger_skill;
      const params = {
        ...turn,
        level: skill.level,
        flat: skill.flat_value,
        percentage: skill.percentage_value / 100
      };
      const roleId = attacker.id_role;
      if (roleId === 10) {
        necro_revive_default.simulate(params);
      } else {
        const skillId = skill.id_skill;
        if (skillId === 15) punch_default.simulate(params);
        if (skillId === 16) heal_up_default.simulate(params);
        if (skillId === 17) mana_steal_default.simulate(params);
        if (skillId === 18) shield_many_default.simulate(params);
        if (skillId === 19) burn_default2.simulate(params);
        if (skillId === 20) mana_boost_default.simulate(params);
        if (skillId === 21) defenses_up_default2.simulate(params);
        if (skillId === 22) stun_many_default.simulate(params);
        if (skillId === 23) punch_default.simulate(params);
      }
    }
  }
  function simulateFlufferHeal({ attacker, attackerTeam }) {
    const flufferTargets = attackerTeam.list.filter(
      (e2) => e2 !== attacker && !e2.is_defeated && e2.remaining_ego < e2.initial_ego
    );
    if (flufferTargets.length === 0) return { noHeal: true };
    const target = flufferTargets.length === 1 ? flufferTargets[0] : flufferTargets.reduce(
      (p3, c3) => p3.remaining_ego <= c3.remaining_ego ? p3 : c3
    );
    let heal = attacker.damage;
    if (isCritical(attacker, target)) {
      heal += Math.max(0, attacker.damage - target.defense);
    }
    if (!attacker.is_hero_fighter) heal = Math.ceil(heal * 0.05);
    heal = Math.min(heal, target.initial_ego - target.remaining_ego);
    target.remaining_ego += heal;
    return { noHeal: false };
  }
  function simulateAttack({ attacker, defenderTeam }) {
    let defender;
    if (attacker.id_role === RoleId.Corkscrewer) {
      defender = getLowestEgoValue(defenderTeam);
    } else {
      let targets = defenderTeam.front.filter((e2) => !e2.is_defeated);
      if (targets.length == 0)
        targets = defenderTeam.middle.filter((e2) => !e2.is_defeated);
      if (targets.length == 0)
        targets = defenderTeam.back.filter((e2) => !e2.is_defeated);
      defender = selectTargetFrom(targets);
    }
    let damage = Math.max(0, attacker.damage - defender.defense);
    if (isCritical(attacker, defender)) {
      if (attacker.id_role === RoleId.Bugger) {
        damage = Math.ceil(damage * 2.4);
      } else {
        damage *= 2;
      }
    }
    receiveDamage(defender, damage);
  }

  // src/modules/penta-drill-sim/style.css
  var style_default3 = ".pdsim-result-box {\n  position: relative;\n  width: 100%;\n  height: 0;\n}\n.pdsim-result-box .pdsim-result {\n  position: absolute;\n  width: max-content;\n  height: 0;\n  line-height: 1.25rem;\n  text-align: center;\n  text-shadow:\n    -1px -1px 0 #000,\n    -1px 1px 0 #000,\n    1px -1px 0 #000,\n    1px 1px 0 #000;\n  z-index: 1;\n}\n.pdsim-result-box .pdsim-result .pdsim-label {\n  font-size: 0.75rem;\n}\n.pdsim-result-box .pdsim-result.pdsim-pending {\n  color: #999;\n}\n.penta-drill-battle .pdsim-result-box .pdsim-result {\n  bottom: 3rem;\n}\n.penta-drill-battle .pdsim-result-box .pdsim-result.pdsim-right {\n  right: 0;\n}\n.penta-drill-battle .pdsim-result-box .pdsim-result.pdsim-left {\n  left: 0;\n}\n.opponent-info-container .pdsim-result-box .pdsim-result {\n  bottom: 3.5rem;\n}\n.opponent-info-container .pdsim-result-box .pdsim-result.pdsim-right {\n  right: 9%;\n}\n.opponent-info-container .pdsim-result-box .pdsim-result.pdsim-left {\n  left: 9%;\n}\n";

  // src/modules/penta-drill-sim/index.tsx
  var PentaDrillSimModule = {
    key: "PentaDrillSimModule",
    label: "Penta Drill Sim",
    default: true,
    settings: [
      { key: "arena", default: true, label: "Run on table page" },
      { key: "preBattle", default: true, label: "Run on pre-battle page" },
      { key: "heavy", default: false, label: "Heavy simulation (slow)" }
      // { key: 'developer', default: false, label: 'Developer mode' },
    ],
    async run(settings) {
      if (settings.arena && page_exports.startsWith("/penta-drill-arena.html")) {
        style_exports.injectToHead(style_default3);
        await async_exports.afterBodyLoaded();
        const { player_datas, opponents_list } = unsafeWindow;
        if (player_datas == null || opponents_list == null) {
          console.log("Not found", { player_datas, opponents_list });
          return;
        }
        const numSimulation = settings.heavy ? 300 : 100;
        opponents_list.forEach((opponent) => {
          void async_exports.run(async () => {
            const heroTeams = getTeamsFromGamePlayer(player_datas);
            const opponentTeams = getTeamsFromGamePlayer(opponent.player);
            const expected = simulatePentaDrill(
              heroTeams,
              opponentTeams,
              numSimulation
            );
            await async_exports.afterGameScriptsRun();
            const $box = createSimResultsBox(expected);
            let $button = $(
              `a[href$="id_opponent=${opponent.player.id_fighter}"]`
            );
            if ($button.length === 0) {
              $button = $(
                `a[href*="id_opponent=${opponent.player.id_fighter}&"]`
              );
            }
            $button.parent().after($box);
            await async_exports.afterThirdpartyScriptsRun();
            if ($box.parent().find("#perform_opponent").length > 0) {
              $box.find(".pdsim-right").css("right", "6%");
              $box.find(".pdsim-left").css("left", "6%");
            }
          });
        });
      }
      if (page_exports.startsWith("/penta-drill-pre-battle")) {
        style_exports.injectToHead(style_default3);
        await async_exports.afterBodyLoaded();
        if (settings.preBattle) {
          const { hero_fighter, opponent_fighter } = unsafeWindow;
          if (hero_fighter == null || opponent_fighter == null) {
            console.log("Not found", { hero_fighter, opponent_fighter });
            return;
          }
          const numSimulation = settings.heavy ? 1e3 : 100;
          const heroTeams = getTeamsFromFighters(hero_fighter);
          const opponentTeams = getTeamsFromFighters(opponent_fighter);
          const expected = simulatePentaDrill(
            heroTeams,
            opponentTeams,
            numSimulation
          );
          await async_exports.afterGameScriptsRun();
          const $box = createSimResultsBox(expected);
          $(".opponent_rewards").after($box);
        }
      }
      function createSimResultsBox(expected) {
        const $box = $(V2(/* @__PURE__ */ u3("div", { className: "pdsim-result-box" })));
        const $left = $(V2(/* @__PURE__ */ u3("div", { className: "pdsim-result pdsim-left" }))).html(
          V2(
            /* @__PURE__ */ u3(k, { children: [
              /* @__PURE__ */ u3("div", { className: "pdsim-label", children: "E[Points]:" }),
              /* @__PURE__ */ u3("span", { className: "pdsim-points", children: expected.points.toFixed(2) })
            ] })
          )
        ).attr(
          "tooltip",
          V2(
            /* @__PURE__ */ u3("table", { children: expected.pointTable.map((e2, i3) => [i3, e2]).filter(([_3, e2]) => e2 > 0).map(([i3, e2]) => /* @__PURE__ */ u3("tr", { style: { color: color_exports.getPDPointsColor(i3) }, children: [
              /* @__PURE__ */ u3("td", { children: i3 }),
              /* @__PURE__ */ u3("td", { children: ":" }),
              /* @__PURE__ */ u3("td", { children: [
                (100 * e2).toFixed(0),
                "%"
              ] })
            ] }, i3)) })
          )
        ).css("color", color_exports.getPDPointsColor(expected.points));
        const $right = $(V2(/* @__PURE__ */ u3("div", { className: "pdsim-result pdsim-right" }))).html(
          V2(
            /* @__PURE__ */ u3(k, { children: [
              /* @__PURE__ */ u3("div", { className: "pdsim-label", children: "E[Rounds]:" }),
              /* @__PURE__ */ u3("span", { className: "pdsim-rounds", children: expected.rounds.toFixed(1) })
            ] })
          )
        ).attr("tooltip", `${expected.minRounds} - ${expected.maxRounds}`).css("color", color_exports.getRoundsColor(expected.maxRounds));
        $box.append($left);
        $box.append($right);
        return $box;
      }
    }
  };

  // src/index.ts
  void (async function() {
    "use strict";
    await async_exports.afterHeadLoaded();
    const moduleList = Object.values(modules_exports);
    const HHPlusPlus = await async_exports.importHHPlusPlusConfig();
    if (HHPlusPlus) {
      if (registerModules()) return;
    }
    moduleList.forEach((module) => {
      if (module.default) {
        const settings = module.settings?.reduce(
          (p3, c3) => (p3[c3.key] = c3.default, p3),
          {}
        ) ?? {};
        void module.run(settings);
      }
    });
    return;
    function registerModules() {
      const { hhPlusPlusConfig } = unsafeWindow;
      if (!hhPlusPlusConfig) return false;
      const GROUP_KEY = "pdsim";
      hhPlusPlusConfig.registerGroup({ key: GROUP_KEY, name: `PD Sim` });
      moduleList.forEach((module) => {
        if (!module || !module.run) return;
        hhPlusPlusConfig.registerModule({
          group: GROUP_KEY,
          configSchema: {
            baseKey: module.key,
            label: module.label,
            default: module.default ?? true,
            subSettings: module.settings
          },
          hasRun: false,
          run(subSettings) {
            if (!this.hasRun) {
              const maybePromise = module.run(subSettings);
              this.hasRun = true;
              void Promise.resolve(maybePromise).then((result) => {
                this.hasRun = result !== false;
              });
            }
          },
          tearDown() {
            if (this.hasRun && module.undo) {
              this.hasRun = module.undo() === false;
            }
          }
          // updateSubSetting(subKey, value) { }, // No one uses it
        });
      });
      hhPlusPlusConfig.loadConfig();
      hhPlusPlusConfig.runModules();
      return true;
    }
  })();
})();
