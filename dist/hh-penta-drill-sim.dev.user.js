// ==UserScript==
// @name         Hentai Heroes Penta Drill Sim
// @namespace    https://github.com/rena-jp/hh-penta-drill-sim
// @version      0.0.4
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
// @grant        none
// @run-at       document-body
// @updateURL    https://github.com/rena-jp/hh-penta-drill-sim/raw/main/dist/hh-penta-drill-sim.dev.meta.js
// @downloadURL  https://github.com/rena-jp/hh-penta-drill-sim/raw/main/dist/hh-penta-drill-sim.dev.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/common/types.ts
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
  var RoleIds = [1, 2, 3, 4, 5, 6, 9, 10];
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
  var SkillNameFromSkillType = {
    punch: "Spank!",
    heal_up: "Recovery",
    mana_steal: "Mana Steal",
    shield_many: "Shields Up",
    burn: "Burnout!",
    mana_boost: "Mana Boost",
    defenses_up: "Reassurance",
    stun_many: "Lovestruck",
    light_punch: "No Skill",
    necro_revive: "Sexomancer"
  };
  var SkillTypeFromElement = {
    darkness: "punch",
    light: "heal_up",
    psychic: "mana_steal",
    water: "shield_many",
    fire: "burn",
    nature: "mana_boost",
    stone: "defenses_up",
    sun: "stun_many"
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
  var r;
  var o;
  var e;
  var f;
  var c;
  var s;
  var a;
  var h;
  var p = {};
  var v = [];
  var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var w = Array.isArray;
  function d(n2, l3) {
    for (var u4 in l3) n2[u4] = l3[u4];
    return n2;
  }
  function g(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function _(l3, u4, t2) {
    var i3, r3, o3, e2 = {};
    for (o3 in u4) "key" == o3 ? i3 = u4[o3] : "ref" == o3 ? r3 = u4[o3] : e2[o3] = u4[o3];
    if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e2[o3] && (e2[o3] = l3.defaultProps[o3]);
    return m(l3, e2, i3, r3, null);
  }
  function m(n2, t2, i3, r3, o3) {
    var e2 = { type: n2, props: t2, key: i3, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e2), e2;
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
    (!n2.__d && (n2.__d = true) && i.push(n2) && !$2.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)($2);
  }
  function $2() {
    for (var n2, u4, t2, r3, o3, f4, c3, s3 = 1; i.length; ) i.length > s3 && i.sort(e), n2 = i.shift(), s3 = i.length, n2.__d && (t2 = void 0, r3 = void 0, o3 = (r3 = (u4 = n2).__v).__e, f4 = [], c3 = [], u4.__P && ((t2 = d({}, r3)).__v = r3.__v + 1, l.vnode && l.vnode(t2), O(u4.__P, t2, r3, u4.__n, u4.__P.namespaceURI, 32 & r3.__u ? [o3] : null, f4, null == o3 ? S(r3) : o3, !!(32 & r3.__u), c3), t2.__v = r3.__v, t2.__.__k[t2.__i] = t2, N(f4, t2, c3), r3.__e = r3.__ = null, t2.__e != o3 && C(t2)));
    $2.__r = 0;
  }
  function I(n2, l3, u4, t2, i3, r3, o3, e2, f4, c3, s3) {
    var a3, h3, y3, w3, d3, g3, _3, m3 = t2 && t2.__k || v, b2 = l3.length;
    for (f4 = P(u4, l3, m3, f4, b2), a3 = 0; a3 < b2; a3++) null != (y3 = u4.__k[a3]) && (h3 = -1 == y3.__i ? p : m3[y3.__i] || p, y3.__i = a3, g3 = O(n2, y3, h3, i3, r3, o3, e2, f4, c3, s3), w3 = y3.__e, y3.ref && h3.ref != y3.ref && (h3.ref && B(h3.ref, null, y3), s3.push(y3.ref, y3.__c || w3, y3)), null == d3 && null != w3 && (d3 = w3), (_3 = !!(4 & y3.__u)) || h3.__k === y3.__k ? f4 = A(y3, f4, n2, _3) : "function" == typeof y3.type && void 0 !== g3 ? f4 = g3 : w3 && (f4 = w3.nextSibling), y3.__u &= -7);
    return u4.__e = d3, f4;
  }
  function P(n2, l3, u4, t2, i3) {
    var r3, o3, e2, f4, c3, s3 = u4.length, a3 = s3, h3 = 0;
    for (n2.__k = new Array(i3), r3 = 0; r3 < i3; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? ("string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? o3 = n2.__k[r3] = m(null, o3, null, null, null) : w(o3) ? o3 = n2.__k[r3] = m(k, { children: o3 }, null, null, null) : null == o3.constructor && o3.__b > 0 ? o3 = n2.__k[r3] = m(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : n2.__k[r3] = o3, f4 = r3 + h3, o3.__ = n2, o3.__b = n2.__b + 1, e2 = null, -1 != (c3 = o3.__i = L(o3, u4, f4, a3)) && (a3--, (e2 = u4[c3]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c3 && (i3 > s3 ? h3-- : i3 < s3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
    if (a3) for (r3 = 0; r3 < s3; r3++) null != (e2 = u4[r3]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = S(e2)), D(e2, e2));
    return t2;
  }
  function A(n2, l3, u4, t2) {
    var i3, r3;
    if ("function" == typeof n2.type) {
      for (i3 = n2.__k, r3 = 0; i3 && r3 < i3.length; r3++) i3[r3] && (i3[r3].__ = n2, l3 = A(i3[r3], l3, u4, t2));
      return l3;
    }
    n2.__e != l3 && (t2 && (l3 && n2.type && !l3.parentNode && (l3 = S(n2)), u4.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function L(n2, l3, u4, t2) {
    var i3, r3, o3, e2 = n2.key, f4 = n2.type, c3 = l3[u4], s3 = null != c3 && 0 == (2 & c3.__u);
    if (null === c3 && null == e2 || s3 && e2 == c3.key && f4 == c3.type) return u4;
    if (t2 > (s3 ? 1 : 0)) {
      for (i3 = u4 - 1, r3 = u4 + 1; i3 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i3 >= 0 ? i3-- : r3++]) && 0 == (2 & c3.__u) && e2 == c3.key && f4 == c3.type) return o3;
    }
    return -1;
  }
  function T(n2, l3, u4) {
    "-" == l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || y.test(l3) ? u4 : u4 + "px";
  }
  function j(n2, l3, u4, t2, i3) {
    var r3, o3;
    n: if ("style" == l3) if ("string" == typeof u4) n2.style.cssText = u4;
    else {
      if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l3 in t2) u4 && l3 in u4 || T(n2.style, l3, "");
      if (u4) for (l3 in u4) t2 && u4[l3] == t2[l3] || T(n2.style, l3, u4[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(f, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u4, u4 ? t2 ? u4.u = t2.u : (u4.u = c, n2.addEventListener(l3, r3 ? a : s, r3)) : n2.removeEventListener(l3, r3 ? a : s, r3);
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
  function O(n2, u4, t2, i3, r3, o3, e2, f4, c3, s3) {
    var a3, h3, p3, v3, y3, _3, m3, b2, S2, C3, M3, $4, P3, A3, H2, L2, T2, j2 = u4.type;
    if (null != u4.constructor) return null;
    128 & t2.__u && (c3 = !!(32 & t2.__u), o3 = [f4 = u4.__e = t2.__e]), (a3 = l.__b) && a3(u4);
    n: if ("function" == typeof j2) try {
      if (b2 = u4.props, S2 = "prototype" in j2 && j2.prototype.render, C3 = (a3 = j2.contextType) && i3[a3.__c], M3 = a3 ? C3 ? C3.props.value : a3.__ : i3, t2.__c ? m3 = (h3 = u4.__c = t2.__c).__ = h3.__E : (S2 ? u4.__c = h3 = new j2(b2, M3) : (u4.__c = h3 = new x(b2, M3), h3.constructor = j2, h3.render = E), C3 && C3.sub(h3), h3.state || (h3.state = {}), h3.__n = i3, p3 = h3.__d = true, h3.__h = [], h3._sb = []), S2 && null == h3.__s && (h3.__s = h3.state), S2 && null != j2.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = d({}, h3.__s)), d(h3.__s, j2.getDerivedStateFromProps(b2, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u4, p3) S2 && null == j2.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), S2 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
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
      h3.state = h3.__s, null != h3.getChildContext && (i3 = d(d({}, i3), h3.getChildContext())), S2 && !p3 && null != h3.getSnapshotBeforeUpdate && (_3 = h3.getSnapshotBeforeUpdate(v3, y3)), L2 = a3, null != a3 && a3.type === k && null == a3.key && (L2 = V(a3.props.children)), f4 = I(n2, w(L2) ? L2 : [L2], u4, t2, i3, r3, o3, e2, f4, c3, s3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && e2.push(h3), m3 && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (u4.__v = null, c3 || null != o3) if (n3.then) {
        for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
        o3[o3.indexOf(f4)] = null, u4.__e = f4;
      } else {
        for (T2 = o3.length; T2--; ) g(o3[T2]);
        z(u4);
      }
      else u4.__e = t2.__e, u4.__k = t2.__k, n3.then || z(u4);
      l.__e(n3, u4, t2);
    }
    else null == o3 && u4.__v == t2.__v ? (u4.__k = t2.__k, u4.__e = t2.__e) : f4 = u4.__e = q(t2.__e, u4, t2, i3, r3, o3, e2, c3, s3);
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
    return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : w(n2) ? n2.map(V) : d({}, n2);
  }
  function q(u4, t2, i3, r3, o3, e2, f4, c3, s3) {
    var a3, h3, v3, y3, d3, _3, m3, b2 = i3.props || p, k3 = t2.props, x3 = t2.type;
    if ("svg" == x3 ? o3 = "http://www.w3.org/2000/svg" : "math" == x3 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e2) {
      for (a3 = 0; a3 < e2.length; a3++) if ((d3 = e2[a3]) && "setAttribute" in d3 == !!x3 && (x3 ? d3.localName == x3 : 3 == d3.nodeType)) {
        u4 = d3, e2[a3] = null;
        break;
      }
    }
    if (null == u4) {
      if (null == x3) return document.createTextNode(k3);
      u4 = document.createElementNS(o3, x3, k3.is && k3), c3 && (l.__m && l.__m(t2, e2), c3 = false), e2 = null;
    }
    if (null == x3) b2 === k3 || c3 && u4.data == k3 || (u4.data = k3);
    else {
      if (e2 = e2 && n.call(u4.childNodes), !c3 && null != e2) for (b2 = {}, a3 = 0; a3 < u4.attributes.length; a3++) b2[(d3 = u4.attributes[a3]).name] = d3.value;
      for (a3 in b2) if (d3 = b2[a3], "children" == a3) ;
      else if ("dangerouslySetInnerHTML" == a3) v3 = d3;
      else if (!(a3 in k3)) {
        if ("value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3) continue;
        j(u4, a3, null, d3, o3);
      }
      for (a3 in k3) d3 = k3[a3], "children" == a3 ? y3 = d3 : "dangerouslySetInnerHTML" == a3 ? h3 = d3 : "value" == a3 ? _3 = d3 : "checked" == a3 ? m3 = d3 : c3 && "function" != typeof d3 || b2[a3] === d3 || j(u4, a3, d3, b2[a3], o3);
      if (h3) c3 || v3 && (h3.__html == v3.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t2.__k = [];
      else if (v3 && (u4.innerHTML = ""), I("template" == t2.type ? u4.content : u4, w(y3) ? y3 : [y3], t2, i3, r3, "foreignObject" == x3 ? "http://www.w3.org/1999/xhtml" : o3, e2, f4, e2 ? e2[0] : i3.__k && S(i3, 0), c3, s3), null != e2) for (a3 = e2.length; a3--; ) g(e2[a3]);
      c3 || (a3 = "value", "progress" == x3 && null == _3 ? u4.removeAttribute("value") : null != _3 && (_3 !== u4[a3] || "progress" == x3 && !_3 || "option" == x3 && _3 != b2[a3]) && j(u4, a3, _3, b2[a3], o3), a3 = "checked", null != m3 && m3 != u4[a3] && j(u4, a3, m3, b2[a3], o3));
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
    var i3, r3;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current != n2.__e || B(i3, null, u4)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u4);
      }
      i3.base = i3.__P = null;
    }
    if (i3 = n2.__k) for (r3 = 0; r3 < i3.length; r3++) i3[r3] && D(i3[r3], u4, t2 || "function" != typeof n2.type);
    t2 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function E(n2, l3, u4) {
    return this.constructor(n2, u4);
  }
  n = v.slice, l = { __e: function(n2, l3, u4, t2) {
    for (var i3, r3, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
      if ((r3 = i3.constructor) && null != r3.getDerivedStateFromError && (i3.setState(r3.getDerivedStateFromError(n2)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t2 || {}), o3 = i3.__d), o3) return i3.__E = i3;
    } catch (l4) {
      n2 = l4;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && null == n2.constructor;
  }, x.prototype.setState = function(n2, l3) {
    var u4;
    u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n2 && (n2 = n2(d({}, u4), this.props)), n2 && d(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), M(this));
  }, x.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
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
    afterDomContentLoaded: () => afterDomContentLoaded,
    afterGameScriptsRun: () => afterGameScriptsRun,
    afterJQueryLoaded: () => afterJQueryLoaded,
    afterThirdpartyScriptsRun: () => afterThirdpartyScriptsRun,
    importHHPlusPlusConfig: () => importHHPlusPlusConfig,
    querySelector: () => querySelector,
    querySelectorAll: () => querySelectorAll,
    run: () => run
  });
  var DomContentLoaded = new Promise((resolve) => {
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => resolve(), {
        capture: true,
        once: true
      });
    } else {
      resolve();
    }
  });
  var JQueryLoaded = new Promise((resolve) => {
    if (window.$ != null) {
      resolve();
    } else {
      void DomContentLoaded.then(() => {
        if (window.$ != null) {
          resolve();
        }
      });
    }
  });
  var GameScriptsRun = new Promise((resolve) => {
    void DomContentLoaded.then(() => {
      $(() => {
        resolve();
      });
    });
  });
  var ThirdpartyScriptsRun = new Promise((resolve) => {
    void GameScriptsRun.then(() => {
      $(() => {
        resolve();
      });
    });
  });
  function afterJQueryLoaded() {
    return JQueryLoaded;
  }
  function afterDomContentLoaded() {
    return DomContentLoaded;
  }
  function afterGameScriptsRun() {
    return GameScriptsRun;
  }
  function afterThirdpartyScriptsRun() {
    return ThirdpartyScriptsRun;
  }
  function run(f4) {
    return new Promise((resolve) => {
      queueMicrotask(() => {
        void Promise.resolve(f4()).then(resolve);
      });
    });
  }
  async function importHHPlusPlusConfig() {
    if (window.hhPlusPlusConfig) return window.hhPlusPlusConfig;
    await afterDomContentLoaded();
    if (window.hhPlusPlusConfig) return window.hhPlusPlusConfig;
    await afterGameScriptsRun();
    if (window.hhPlusPlusConfig) return window.hhPlusPlusConfig;
    await afterThirdpartyScriptsRun();
    return window.hhPlusPlusConfig;
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
    return window.location.pathname.startsWith(searchString);
  }

  // src/utils/style.ts
  var style_exports = {};
  __export(style_exports, {
    injectToHead: () => injectToHead
  });
  function injectToHead(css) {
    return $("<style />").addClass("pdsim-style").html(css).appendTo(document.head);
  }

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
    default: true,
    async run() {
      if (!page_exports.startsWith("/penta-drill-pre-battle")) return;
      style_exports.injectToHead(style_default);
      await async_exports.afterDomContentLoaded();
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
  var style_default2 = "body.page-penta-drill-battle .popup_wrapper #rewards_popup .flex-container .rewards .container .scrolling_area,\nbody.page-penta-drill-battle .popup_wrapper #rewards_popup .flex-container .rewards .container .rewards_scrollable,\nbody.page-penta-drill-battle .popup_wrapper #rewards_popup .flex-container .rewards .rewards_background {\n  max-height: unset;\n}\nbody.page-penta-drill-battle #rewards_big_header:not(.losing) {\n  zoom: 0.4;\n}\nbody.page-penta-drill-battle .popup_wrapper #rewards_popup .flex-container .rewards .container .rewards_scrollable {\n  zoom: 0.65;\n}\n";

  // src/modules/compact-rewards/index.ts
  var CompactRewardsModule = {
    key: "CompactRewardsModule",
    label: "Compact battle rewards",
    default: true,
    run() {
      if (!page_exports.startsWith("/penta-drill-battle.html")) return;
      style_exports.injectToHead(style_default2);
    }
  };

  // src/modules/faster-skip-button/clickable-skip-buttons.css
  var clickable_skip_buttons_default = "#named-attack-background,\n#named-attack-container,\n.pvp-girls {\n  pointer-events: none;\n}\n";

  // src/modules/faster-skip-button/index.ts
  var FasterSkipButtonModule = {
    key: "FasterSkipButtonModule",
    label: "Make the skip button appear faster",
    default: true,
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
      await async_exports.afterDomContentLoaded();
      $(document).ajaxComplete((_event, _jqXHR, ajaxOptions) => {
        const { url, data } = ajaxOptions;
        if (!url?.startsWith("/ajax.php")) return;
        if (typeof data === "string" && data.includes("action=do_battles_penta_drill")) {
          $(".skip-buttons-container").attr("style", "");
        }
      });
    }
  };

  // src/modules/team-editing-tweaks/compact-grid.css
  var compact_grid_default = "body.page-edit-penta-drill-team .harem-panel .harem-panel-girls {\n  padding: 0;\n  grid-row-gap: 0;\n  grid-template-columns: repeat(5, 58px);\n}\nbody.page-edit-penta-drill-team .harem-panel-girls .harem-girl-container {\n  width: 58px;\n  height: 80px;\n}\n";

  // src/modules/team-editing-tweaks/tooltip-on-locked-girl.css
  var tooltip_on_locked_girl_default = "body.page-edit-penta-drill-team #edit-team-page.penta-drill .harem-panel .panel-body .harem-panel-girls .harem-girl-container:not(.selected)[team_slot] .grey-overlay {\n  pointer-events: none;\n}\n";

  // src/modules/team-editing-tweaks/shortcut-bar.css
  var shortcut_bar_default = "#shortcut-bar-box {\n  position: absolute;\n  right: 408px;\n  width: fit-content;\n  display: flex;\n  flex-direction: row;\n  gap: 0.35rem;\n  padding: 0.7rem 1px 0.7rem 0.7rem;\n  border-radius: 0.7rem 0 0 0.7rem;\n  background-color: #4f222e;\n  z-index: 1;\n}\n#shortcut-bar-box .shortcut-bar {\n  display: flex;\n  flex-direction: column;\n}\n#shortcut-bar-box .shortcut-bar .check-btn.element-state {\n  width: 38px;\n  height: 38px;\n  padding: 0;\n}\n#shortcut-bar-box .shortcut-bar .check-btn.element-state .role-icn {\n  width: 36px;\n  height: 36px;\n  background-size: 27px;\n}\n@media (min-width: 1026px) {\n  #shortcut-bar-box {\n    top: 113px;\n  }\n}\n@media (max-width: 1025px) {\n  #shortcut-bar-box {\n    top: 134px;\n  }\n}\n";

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
        key: "shortcutBar",
        default: true,
        label: "Add shortcut bar"
      }
    ],
    async run(settings) {
      if (!page_exports.startsWith("/edit-penta-drill-team") && !page_exports.startsWith("/edit-labyrinth-team.html"))
        return;
      if (settings.compactGrid) {
        style_exports.injectToHead(compact_grid_default);
      }
      if (settings.tooltipOnLocked) {
        style_exports.injectToHead(tooltip_on_locked_girl_default);
      }
      if (settings.shortcutBar) {
        style_exports.injectToHead(shortcut_bar_default);
      }
      await async_exports.afterDomContentLoaded();
      if (settings.shortcutBar) {
        const girlMap = {};
        const availableGirls = window.availableGirls;
        availableGirls.forEach((e2) => {
          girlMap[e2.id_girl] = e2;
        });
        const html = V2(
          /* @__PURE__ */ u3("div", { id: "shortcut-bar-box", className: "checkbox-group", children: [
            /* @__PURE__ */ u3("div", { className: "shortcut-bar skill", children: [
              /* @__PURE__ */ u3(
                "button",
                {
                  className: "check-btn element-state",
                  value: "all",
                  ...{ tooltip: "All" }
                }
              ),
              Elements.map((e2, i3) => {
                const skillType = SkillTypeFromElement[e2];
                const skillName = SkillNameFromSkillType[skillType];
                return /* @__PURE__ */ u3(
                  "button",
                  {
                    className: "check-btn element-state",
                    value: e2,
                    ...{ tooltip: skillName },
                    children: /* @__PURE__ */ u3("span", { className: `role-icn ${skillType}_icn` })
                  },
                  i3
                );
              })
            ] }),
            /* @__PURE__ */ u3("div", { className: "shortcut-bar role", children: [
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
        const panel = $(html);
        panel.insertAfter(".change-team-panel.harem-panel");
        panel.find(".role button.check-btn").each((_3, _e) => {
          const e2 = _e;
          const value = e2.value;
          $(e2).on("click", () => {
            let $roleFilter = $("select#filter_role");
            if ($roleFilter.length === 0) $roleFilter = $('select[name="role"]');
            $roleFilter.prop("value", value).selectric("refresh").change();
          });
        });
        panel.find(".skill button.check-btn").each((_3, _e) => {
          const e2 = _e;
          const value = e2.value;
          $(e2).on("click", () => {
            let $elementFilter = $("select#filter_element");
            if ($elementFilter.length === 0)
              $elementFilter = $('select[name="element"]');
            $elementFilter.prop("value", value).selectric("refresh").change();
            const $skillTierFilter = $("select#filter_skill_tier");
            if (value === "all") {
              $skillTierFilter.prop("value", "all").selectric("refresh").change();
            } else {
              $skillTierFilter.prop("value", 5).selectric("refresh").change();
            }
          });
        });
      }
    }
  };

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
      id_girl: girl.id_girl,
      is_hero_fighter: girl.is_hero_fighter,
      damage: girl.damage,
      defense: girl.defense,
      chance: girl.chance,
      speed: girl.speed,
      id_role: girl.girl.girl.id_role,
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
      id_girl: girl.id_girl,
      is_hero_fighter: isHero,
      damage: caracs.damage,
      defense: caracs.defense,
      chance: caracs.chance,
      speed: caracs.speed,
      id_role: girl.girl.id_role,
      trigger_skill: getSkill(girl),
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
  function getSkill(girl) {
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
  }

  // src/simulator/common.ts
  function attack(defender, damage) {
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
      attack(attacker, burn.damage);
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
    const ret = [];
    Array(maxCount).keys().forEach(() => {
      const i3 = Math.floor(Math.random() * targets.length);
      ret.push(targets[i3]);
      targets[i3] = targets[targets.length - 1];
      targets.length--;
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
  function simulate12({ attacker, defenderTeam }) {
    const percentage = attacker.trigger_skill.percentage_value / 100;
    const targets = defenderTeam.list.filter((e2) => !e2.is_defeated);
    const defender = selectTargetFrom(targets);
    let damage = Math.ceil(attacker.damage * percentage) - defender.defense;
    damage = Math.max(0, damage);
    attack(defender, damage);
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
      const result = simulateMatch(heroTeam, opponentTeam, currentRounds);
      points += result.points;
      sumRounds += result.rounds - currentRounds;
      currentRounds = result.rounds;
      if (result.points === 1) currentRounds = 0;
    }
    return { points, rounds: sumRounds };
  }
  function simulateMatch(heroTeam, opponentTeam, startRounds) {
    const order = [
      ...opponentTeam.list.map((girl) => ({
        attacker: girl,
        attackerTeam: opponentTeam,
        defenderTeam: heroTeam,
        heroTeam,
        opponentTeam
      })),
      ...heroTeam.list.map((girl) => ({
        attacker: girl,
        attackerTeam: heroTeam,
        defenderTeam: opponentTeam,
        heroTeam,
        opponentTeam
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
    attack(defender, damage);
  }

  // src/modules/penta-drill-sim/style.css
  var style_default3 = ".pdsim-result-box {\n  position: relative;\n  width: 100%;\n  height: 0;\n}\n.pdsim-result-box .pdsim-result {\n  position: absolute;\n  width: max-content;\n  height: 0;\n  line-height: 1.25rem;\n  text-align: center;\n  text-shadow:\n    -1px -1px 0 #000,\n    -1px 1px 0 #000,\n    1px -1px 0 #000,\n    1px 1px 0 #000;\n  z-index: 1;\n}\n.pdsim-result-box .pdsim-result .pdsim-label {\n  font-size: 0.75rem;\n}\n.pdsim-result-box .pdsim-result.pdsim-pending {\n  color: #999;\n}\n.penta-drill-battle .pdsim-result-box .pdsim-result {\n  bottom: 3rem;\n}\n.penta-drill-battle .pdsim-result-box .pdsim-result.pdsim-right {\n  right: 0;\n}\n.penta-drill-battle .pdsim-result-box .pdsim-result.pdsim-left {\n  left: 0;\n}\n.opponent-info-container .pdsim-result-box .pdsim-result {\n  bottom: 3.5rem;\n}\n.opponent-info-container .pdsim-result-box .pdsim-result.pdsim-right {\n  right: 10%;\n}\n.opponent-info-container .pdsim-result-box .pdsim-result.pdsim-left {\n  left: 10%;\n}\n";

  // src/modules/penta-drill-sim/index.tsx
  var PentaDrillSimModule = {
    key: "PentaDrillSimModule",
    label: "Penta Drill Sim",
    default: true,
    settings: [
      { key: "arena", default: true, label: "Run on table page" },
      { key: "preBattle", default: true, label: "Run on pre-battle page" },
      { key: "heavy", default: false, label: "Heavy simulation (slow)" },
      { key: "developer", default: true, label: "Developer mode" }
    ],
    async run(settings) {
      if (settings.arena && page_exports.startsWith("/penta-drill-arena.html")) {
        style_exports.injectToHead(style_default3);
        await async_exports.afterDomContentLoaded();
        const { player_datas, opponents_list } = window;
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
              $box.find(".pdsim-right").css("right", 0);
              $box.find(".pdsim-left").css("left", 0);
            }
          });
        });
      }
      if (page_exports.startsWith("/penta-drill-pre-battle")) {
        await async_exports.afterDomContentLoaded();
        style_exports.injectToHead(style_default3);
        if (settings.preBattle) {
          const { hero_fighter, opponent_fighter } = window;
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
    await async_exports.afterJQueryLoaded();
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
      const { hhPlusPlusConfig } = window;
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
