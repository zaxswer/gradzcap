(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/constants/Prefixes.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ARC0027_PREFIX = void 0;
exports.ARC0027_PREFIX = 'arc0027'; //# sourceMappingURL=Prefixes.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/constants/Suffixes.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CHANNEL_NAME_SUFFIX = void 0;
exports.CHANNEL_NAME_SUFFIX = 'channel'; //# sourceMappingURL=Suffixes.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/constants/Timeouts.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UPPER_REQUEST_TIMEOUT = exports.LOWER_REQUEST_TIMEOUT = exports.DEFAULT_REQUEST_TIMEOUT = void 0;
exports.DEFAULT_REQUEST_TIMEOUT = 180000; // 3 minutes in milliseconds
exports.LOWER_REQUEST_TIMEOUT = 750; // 0.75 seconds in milliseconds
exports.UPPER_REQUEST_TIMEOUT = 300000; // 5 minutes in milliseconds
 //# sourceMappingURL=Timeouts.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/constants/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/constants/Prefixes.js [app-client] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/constants/Suffixes.js [app-client] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/constants/Timeouts.js [app-client] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/rng.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
        if (!getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
    }
    return getRandomValues(rnds8);
}
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/regex.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/validate.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _regex = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/regex.js [app-client] (ecmascript)"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function validate(uuid) {
    return typeof uuid === 'string' && _regex.default.test(uuid);
}
var _default = validate;
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/stringify.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
exports.unsafeStringify = unsafeStringify;
var _validate = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/validate.js [app-client] (ecmascript)"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ const byteToHex = [];
for(let i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, _validate.default)(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
var _default = stringify;
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/v1.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _rng = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/rng.js [app-client] (ecmascript)"));
var _stringify = __turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/stringify.js [app-client] (ecmascript)");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;
let _clockseq; // Previous uuid creation time
let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
    let i = buf && offset || 0;
    const b = buf || new Array(16);
    options = options || {};
    let node = options.node || _nodeId;
    let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
    // specified.  We do this lazily to minimize issues related to insufficient
    // system entropy.  See #189
    if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
            // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
            node = _nodeId = [
                seedBytes[0] | 0x01,
                seedBytes[1],
                seedBytes[2],
                seedBytes[3],
                seedBytes[4],
                seedBytes[5]
            ];
        }
        if (clockseq == null) {
            // Per 4.2.2, randomize (14 bit) clockseq
            clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
        }
    } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)
    const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) {
        clockseq = clockseq + 1 & 0x3fff;
    } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
    } // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000; // `time_low`
    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff; // `time_mid`
    const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff; // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`
    b[i++] = clockseq & 0xff; // `node`
    for(let n = 0; n < 6; ++n){
        b[i + n] = node[n];
    }
    return buf || (0, _stringify.unsafeStringify)(b);
}
var _default = v1;
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/parse.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _validate = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/validate.js [app-client] (ecmascript)"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function parse(uuid) {
    if (!(0, _validate.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    let v;
    const arr = new Uint8Array(16); // Parse ########-....-....-....-............
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 0xff;
    arr[2] = v >>> 8 & 0xff;
    arr[3] = v & 0xff; // Parse ........-####-....-....-............
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 0xff; // Parse ........-....-####-....-............
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 0xff; // Parse ........-....-....-####-............
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 0xff; // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
    arr[11] = v / 0x100000000 & 0xff;
    arr[12] = v >>> 24 & 0xff;
    arr[13] = v >>> 16 & 0xff;
    arr[14] = v >>> 8 & 0xff;
    arr[15] = v & 0xff;
    return arr;
}
var _default = parse;
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/v35.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.URL = exports.DNS = void 0;
exports.default = v35;
var _stringify = __turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/stringify.js [app-client] (ecmascript)");
var _parse = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/parse.js [app-client] (ecmascript)"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str)); // UTF8 escape
    const bytes = [];
    for(let i = 0; i < str.length; ++i){
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
}
const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;
function v35(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
        var _namespace;
        if (typeof value === 'string') {
            value = stringToBytes(value);
        }
        if (typeof namespace === 'string') {
            namespace = (0, _parse.default)(namespace);
        }
        if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
            throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
        } // Compute hash of namespace and value, Per 4.3
        // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
        // hashfunc([...namespace, ... value])`
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 0x0f | version;
        bytes[8] = bytes[8] & 0x3f | 0x80;
        if (buf) {
            offset = offset || 0;
            for(let i = 0; i < 16; ++i){
                buf[offset + i] = bytes[i];
            }
            return buf;
        }
        return (0, _stringify.unsafeStringify)(bytes);
    } // Function#name is not settable on some platforms (#270)
    try {
        generateUUID.name = name; // eslint-disable-next-line no-empty
    } catch (err) {} // For CommonJS default export support
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
}
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/md5.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */ function md5(bytes) {
    if (typeof bytes === 'string') {
        const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = new Uint8Array(msg.length);
        for(let i = 0; i < msg.length; ++i){
            bytes[i] = msg.charCodeAt(i);
        }
    }
    return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */ function md5ToHexEncodedArray(input) {
    const output = [];
    const length32 = input.length * 32;
    const hexTab = '0123456789abcdef';
    for(let i = 0; i < length32; i += 8){
        const x = input[i >> 5] >>> i % 32 & 0xff;
        const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
        output.push(hex);
    }
    return output;
}
/**
 * Calculate output length with padding and bit length
 */ function getOutputLength(inputLength8) {
    return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */ function wordsToMd5(x, len) {
    /* append padding */ x[len >> 5] |= 0x80 << len % 32;
    x[getOutputLength(len) - 1] = len;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    for(let i = 0; i < x.length; i += 16){
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [
        a,
        b,
        c,
        d
    ];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */ function bytesToWords(input) {
    if (input.length === 0) {
        return [];
    }
    const length8 = input.length * 8;
    const output = new Uint32Array(getOutputLength(length8));
    for(let i = 0; i < length8; i += 8){
        output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
    }
    return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */ function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */ function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */ function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var _default = md5;
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/v3.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _v = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/v35.js [app-client] (ecmascript)"));
var _md = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/md5.js [app-client] (ecmascript)"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/native.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _default = {
    randomUUID
};
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/v4.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _native = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/native.js [app-client] (ecmascript)"));
var _rng = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/rng.js [app-client] (ecmascript)"));
var _stringify = __turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/stringify.js [app-client] (ecmascript)");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function v4(options, buf, offset) {
    if (_native.default.randomUUID && !buf && !options) {
        return _native.default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, _stringify.unsafeStringify)(rnds);
}
var _default = v4;
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/sha1.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
    switch(s){
        case 0:
            return x & y ^ ~x & z;
        case 1:
            return x ^ y ^ z;
        case 2:
            return x & y ^ x & z ^ y & z;
        case 3:
            return x ^ y ^ z;
    }
}
function ROTL(x, n) {
    return x << n | x >>> 32 - n;
}
function sha1(bytes) {
    const K = [
        0x5a827999,
        0x6ed9eba1,
        0x8f1bbcdc,
        0xca62c1d6
    ];
    const H = [
        0x67452301,
        0xefcdab89,
        0x98badcfe,
        0x10325476,
        0xc3d2e1f0
    ];
    if (typeof bytes === 'string') {
        const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = [];
        for(let i = 0; i < msg.length; ++i){
            bytes.push(msg.charCodeAt(i));
        }
    } else if (!Array.isArray(bytes)) {
        // Convert Array-like to Array
        bytes = Array.prototype.slice.call(bytes);
    }
    bytes.push(0x80);
    const l = bytes.length / 4 + 2;
    const N = Math.ceil(l / 16);
    const M = new Array(N);
    for(let i = 0; i < N; ++i){
        const arr = new Uint32Array(16);
        for(let j = 0; j < 16; ++j){
            arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
        }
        M[i] = arr;
    }
    M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
    for(let i = 0; i < N; ++i){
        const W = new Uint32Array(80);
        for(let t = 0; t < 16; ++t){
            W[t] = M[i][t];
        }
        for(let t = 16; t < 80; ++t){
            W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        }
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        let e = H[4];
        for(let t = 0; t < 80; ++t){
            const s = Math.floor(t / 20);
            const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
    }
    return [
        H[0] >> 24 & 0xff,
        H[0] >> 16 & 0xff,
        H[0] >> 8 & 0xff,
        H[0] & 0xff,
        H[1] >> 24 & 0xff,
        H[1] >> 16 & 0xff,
        H[1] >> 8 & 0xff,
        H[1] & 0xff,
        H[2] >> 24 & 0xff,
        H[2] >> 16 & 0xff,
        H[2] >> 8 & 0xff,
        H[2] & 0xff,
        H[3] >> 24 & 0xff,
        H[3] >> 16 & 0xff,
        H[3] >> 8 & 0xff,
        H[3] & 0xff,
        H[4] >> 24 & 0xff,
        H[4] >> 16 & 0xff,
        H[4] >> 8 & 0xff,
        H[4] & 0xff
    ];
}
var _default = sha1;
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/v5.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _v = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/v35.js [app-client] (ecmascript)"));
var _sha = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/sha1.js [app-client] (ecmascript)"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/nil.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/version.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _validate = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/validate.js [app-client] (ecmascript)"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function version(uuid) {
    if (!(0, _validate.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    return parseInt(uuid.slice(14, 15), 16);
}
var _default = version;
exports.default = _default;
}),
"[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NIL", {
    enumerable: true,
    get: function get() {
        return _nil.default;
    }
});
Object.defineProperty(exports, "parse", {
    enumerable: true,
    get: function get() {
        return _parse.default;
    }
});
Object.defineProperty(exports, "stringify", {
    enumerable: true,
    get: function get() {
        return _stringify.default;
    }
});
Object.defineProperty(exports, "v1", {
    enumerable: true,
    get: function get() {
        return _v.default;
    }
});
Object.defineProperty(exports, "v3", {
    enumerable: true,
    get: function get() {
        return _v2.default;
    }
});
Object.defineProperty(exports, "v4", {
    enumerable: true,
    get: function get() {
        return _v3.default;
    }
});
Object.defineProperty(exports, "v5", {
    enumerable: true,
    get: function get() {
        return _v4.default;
    }
});
Object.defineProperty(exports, "validate", {
    enumerable: true,
    get: function get() {
        return _validate.default;
    }
});
Object.defineProperty(exports, "version", {
    enumerable: true,
    get: function get() {
        return _version.default;
    }
});
var _v = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/v1.js [app-client] (ecmascript)"));
var _v2 = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/v3.js [app-client] (ecmascript)"));
var _v3 = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/v4.js [app-client] (ecmascript)"));
var _v4 = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/v5.js [app-client] (ecmascript)"));
var _nil = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/nil.js [app-client] (ecmascript)"));
var _version = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/version.js [app-client] (ecmascript)"));
var _validate = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/validate.js [app-client] (ecmascript)"));
var _stringify = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/stringify.js [app-client] (ecmascript)"));
var _parse = _interopRequireDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/parse.js [app-client] (ecmascript)"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/Logger.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ var __spreadArray = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
var Logger = function() {
    function Logger(level) {
        this._level = level;
    }
    /**
     * private methods
     */ Logger.prototype.canLog = function(allowedLevel) {
        switch(this._level){
            case 'error':
                return allowedLevel === 'error';
            case 'warn':
                return allowedLevel === 'error' || allowedLevel === 'warn';
            case 'info':
                return allowedLevel === 'error' || allowedLevel === 'warn' || allowedLevel === 'info';
            case 'debug':
                return true;
            default:
                return false;
        }
    };
    /**
     * public methods
     */ Logger.prototype.debug = function(message) {
        var optionalParams = [];
        for(var _i = 1; _i < arguments.length; _i++){
            optionalParams[_i - 1] = arguments[_i];
        }
        this.canLog('debug') && console.log.apply(console, __spreadArray([
            message
        ], optionalParams, false));
    };
    Logger.prototype.error = function(message) {
        var optionalParams = [];
        for(var _i = 1; _i < arguments.length; _i++){
            optionalParams[_i - 1] = arguments[_i];
        }
        this.canLog('error') && console.error.apply(console, __spreadArray([
            message
        ], optionalParams, false));
    };
    Logger.prototype.info = function(message) {
        var optionalParams = [];
        for(var _i = 1; _i < arguments.length; _i++){
            optionalParams[_i - 1] = arguments[_i];
        }
        this.canLog('info') && console.info.apply(console, __spreadArray([
            message
        ], optionalParams, false));
    };
    Logger.prototype.warn = function(message) {
        var optionalParams = [];
        for(var _i = 1; _i < arguments.length; _i++){
            optionalParams[_i - 1] = arguments[_i];
        }
        this.canLog('warn') && console.warn.apply(console, __spreadArray([
            message
        ], optionalParams, false));
    };
    return Logger;
}();
exports.default = Logger; //# sourceMappingURL=Logger.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/BaseController.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// controllers
var Logger_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/Logger.js [app-client] (ecmascript)"));
var BaseController = function() {
    function BaseController(config) {
        this._config = config;
        this._listeners = new Map();
        this._logger = new Logger_1.default(config.debug ? 'debug' : 'error');
    }
    /**
     * public methods
     */ /**
     * Gets the configuration.
     * @returns {Config} the current configuration.
     */ BaseController.prototype.getConfig = function() {
        return this._config;
    };
    /**
     * Removes all listeners.
     */ BaseController.prototype.removeAllListeners = function() {
        // remove all the listeners
        this._listeners.forEach(function(_a) {
            var listener = _a.listener, reference = _a.reference;
            return window.removeEventListener(reference, listener);
        });
        // clear the map
        this._listeners.clear();
    };
    /**
     * Removes the listener, by the ID.
     * @param {string} id - the listener ID to remove.
     */ BaseController.prototype.removeListener = function(id) {
        var item = this._listeners.get(id) || null;
        if (!item) {
            return;
        }
        // remove the listener from the dom and the map
        window.removeEventListener(item.reference, item.listener);
        this._listeners.delete(id);
    };
    return BaseController;
}();
exports.default = BaseController; //# sourceMappingURL=BaseController.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/ARC0027ErrorCodeEnum.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ARC0027ErrorCodeEnum;
(function(ARC0027ErrorCodeEnum) {
    ARC0027ErrorCodeEnum[ARC0027ErrorCodeEnum["UnknownError"] = 4000] = "UnknownError";
    ARC0027ErrorCodeEnum[ARC0027ErrorCodeEnum["MethodCanceledError"] = 4001] = "MethodCanceledError";
    ARC0027ErrorCodeEnum[ARC0027ErrorCodeEnum["MethodTimedOutError"] = 4002] = "MethodTimedOutError";
    ARC0027ErrorCodeEnum[ARC0027ErrorCodeEnum["MethodNotSupportedError"] = 4003] = "MethodNotSupportedError";
    ARC0027ErrorCodeEnum[ARC0027ErrorCodeEnum["NetworkNotSupportedError"] = 4004] = "NetworkNotSupportedError";
    ARC0027ErrorCodeEnum[ARC0027ErrorCodeEnum["UnauthorizedSignerError"] = 4100] = "UnauthorizedSignerError";
    ARC0027ErrorCodeEnum[ARC0027ErrorCodeEnum["InvalidInputError"] = 4200] = "InvalidInputError";
    ARC0027ErrorCodeEnum[ARC0027ErrorCodeEnum["InvalidGroupIdError"] = 4201] = "InvalidGroupIdError";
    ARC0027ErrorCodeEnum[ARC0027ErrorCodeEnum["FailedToPostSomeTransactionsError"] = 4300] = "FailedToPostSomeTransactionsError";
})(ARC0027ErrorCodeEnum || (ARC0027ErrorCodeEnum = {}));
exports.default = ARC0027ErrorCodeEnum; //# sourceMappingURL=ARC0027ErrorCodeEnum.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/ARC0027MessageTypeEnum.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ARC0027MessageTypeEnum;
(function(ARC0027MessageTypeEnum) {
    ARC0027MessageTypeEnum["Request"] = "request";
    ARC0027MessageTypeEnum["Response"] = "response";
})(ARC0027MessageTypeEnum || (ARC0027MessageTypeEnum = {}));
exports.default = ARC0027MessageTypeEnum; //# sourceMappingURL=ARC0027MessageTypeEnum.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/ARC0027MethodEnum.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ARC0027MethodEnum;
(function(ARC0027MethodEnum) {
    ARC0027MethodEnum["Disable"] = "disable";
    ARC0027MethodEnum["Discover"] = "discover";
    ARC0027MethodEnum["Enable"] = "enable";
    ARC0027MethodEnum["PostTransactions"] = "post_transactions";
    ARC0027MethodEnum["SignAndPostTransactions"] = "sign_and_post_transactions";
    ARC0027MethodEnum["SignMessage"] = "sign_message";
    ARC0027MethodEnum["SignTransactions"] = "sign_transactions";
})(ARC0027MethodEnum || (ARC0027MethodEnum = {}));
exports.default = ARC0027MethodEnum; //# sourceMappingURL=ARC0027MethodEnum.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ARC0027MethodEnum = exports.ARC0027MessageTypeEnum = exports.ARC0027ErrorCodeEnum = void 0;
var ARC0027ErrorCodeEnum_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/ARC0027ErrorCodeEnum.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027ErrorCodeEnum", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027ErrorCodeEnum_1).default;
    }
});
var ARC0027MessageTypeEnum_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/ARC0027MessageTypeEnum.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027MessageTypeEnum", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027MessageTypeEnum_1).default;
    }
});
var ARC0027MethodEnum_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/ARC0027MethodEnum.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027MethodEnum", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027MethodEnum_1).default;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/BaseARC0027Error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var BaseARC0027Error = function() {
    function BaseARC0027Error(_a) {
        var message = _a.message, providerId = _a.providerId;
        this.message = message.toLowerCase();
        this.providerId = providerId;
    }
    return BaseARC0027Error;
}();
exports.default = BaseARC0027Error; //# sourceMappingURL=BaseARC0027Error.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027FailedToPostSomeTransactionsError.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// enums
var enums_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)");
// errors
var BaseARC0027Error_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/BaseARC0027Error.js [app-client] (ecmascript)"));
var ARC0027FailedToPostSomeTransactionsError = function(_super) {
    __extends(ARC0027FailedToPostSomeTransactionsError, _super);
    function ARC0027FailedToPostSomeTransactionsError(_a) {
        var message = _a.message, providerId = _a.providerId, successTxnIDs = _a.successTxnIDs;
        var _this = _super.call(this, {
            message: message || "failed to post some transactions",
            providerId: providerId
        }) || this;
        _this.code = enums_1.ARC0027ErrorCodeEnum.FailedToPostSomeTransactionsError;
        _this.name = 'FailedToPostSomeTransactionsError';
        _this.data = {
            successTxnIDs: successTxnIDs
        };
        return _this;
    }
    return ARC0027FailedToPostSomeTransactionsError;
}(BaseARC0027Error_1.default);
exports.default = ARC0027FailedToPostSomeTransactionsError; //# sourceMappingURL=ARC0027FailedToPostSomeTransactionsError.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027InvalidGroupIdError.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// enums
var enums_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)");
// errors
var BaseARC0027Error_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/BaseARC0027Error.js [app-client] (ecmascript)"));
var ARC0027InvalidGroupIdError = function(_super) {
    __extends(ARC0027InvalidGroupIdError, _super);
    function ARC0027InvalidGroupIdError(_a) {
        var message = _a.message, providerId = _a.providerId;
        var _this = _super.call(this, {
            message: message || "computed group id does not match the assigned id of one or more transactions",
            providerId: providerId
        }) || this;
        _this.code = enums_1.ARC0027ErrorCodeEnum.InvalidGroupIdError;
        _this.name = 'InvalidGroupIdError';
        return _this;
    }
    return ARC0027InvalidGroupIdError;
}(BaseARC0027Error_1.default);
exports.default = ARC0027InvalidGroupIdError; //# sourceMappingURL=ARC0027InvalidGroupIdError.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027InvalidInputError.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// enums
var enums_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)");
// errors
var BaseARC0027Error_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/BaseARC0027Error.js [app-client] (ecmascript)"));
var ARC0027InvalidInputError = function(_super) {
    __extends(ARC0027InvalidInputError, _super);
    function ARC0027InvalidInputError(_a) {
        var message = _a.message, providerId = _a.providerId;
        var _this = _super.call(this, {
            message: message || "invalid input in transaction(s)",
            providerId: providerId
        }) || this;
        _this.code = enums_1.ARC0027ErrorCodeEnum.InvalidInputError;
        _this.name = 'InvalidInputError';
        return _this;
    }
    return ARC0027InvalidInputError;
}(BaseARC0027Error_1.default);
exports.default = ARC0027InvalidInputError; //# sourceMappingURL=ARC0027InvalidInputError.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027MethodCanceledError.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// enums
var enums_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)");
// errors
var BaseARC0027Error_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/BaseARC0027Error.js [app-client] (ecmascript)"));
var ARC0027MethodCanceledError = function(_super) {
    __extends(ARC0027MethodCanceledError, _super);
    function ARC0027MethodCanceledError(_a) {
        var message = _a.message, method = _a.method, providerId = _a.providerId;
        var _this = _super.call(this, {
            message: message || "method \"".concat(method, "\" canceled for provider \"").concat(providerId, "\""),
            providerId: providerId
        }) || this;
        _this.code = enums_1.ARC0027ErrorCodeEnum.MethodCanceledError;
        _this.name = 'MethodCanceledError';
        _this.data = {
            method: method
        };
        return _this;
    }
    return ARC0027MethodCanceledError;
}(BaseARC0027Error_1.default);
exports.default = ARC0027MethodCanceledError; //# sourceMappingURL=ARC0027MethodCanceledError.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027MethodNotSupportedError.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// enums
var enums_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)");
// errors
var BaseARC0027Error_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/BaseARC0027Error.js [app-client] (ecmascript)"));
var ARC0027MethodSupportedError = function(_super) {
    __extends(ARC0027MethodSupportedError, _super);
    function ARC0027MethodSupportedError(_a) {
        var message = _a.message, method = _a.method, providerId = _a.providerId;
        var _this = _super.call(this, {
            message: message || "method \"".concat(method, "\" not supported for provider \"").concat(providerId, "\""),
            providerId: providerId
        }) || this;
        _this.code = enums_1.ARC0027ErrorCodeEnum.MethodNotSupportedError;
        _this.name = 'MethodNotSupportedError';
        _this.data = {
            method: method
        };
        return _this;
    }
    return ARC0027MethodSupportedError;
}(BaseARC0027Error_1.default);
exports.default = ARC0027MethodSupportedError; //# sourceMappingURL=ARC0027MethodNotSupportedError.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027MethodTimedOutError.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// enums
var enums_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)");
// errors
var BaseARC0027Error_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/BaseARC0027Error.js [app-client] (ecmascript)"));
var ARC0027MethodTimedOutError = function(_super) {
    __extends(ARC0027MethodTimedOutError, _super);
    function ARC0027MethodTimedOutError(_a) {
        var message = _a.message, method = _a.method, providerId = _a.providerId;
        var _this = _super.call(this, {
            message: message || "method \"".concat(method, "\" timed out"),
            providerId: providerId
        }) || this;
        _this.code = enums_1.ARC0027ErrorCodeEnum.MethodTimedOutError;
        _this.name = 'MethodTimedOutError';
        _this.data = {
            method: method
        };
        return _this;
    }
    return ARC0027MethodTimedOutError;
}(BaseARC0027Error_1.default);
exports.default = ARC0027MethodTimedOutError; //# sourceMappingURL=ARC0027MethodTimedOutError.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027NetworkNotSupportedError.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// enums
var enums_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)");
// errors
var BaseARC0027Error_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/BaseARC0027Error.js [app-client] (ecmascript)"));
var ARC0027NetworkNotSupportedError = function(_super) {
    __extends(ARC0027NetworkNotSupportedError, _super);
    function ARC0027NetworkNotSupportedError(_a) {
        var genesisHashes = _a.genesisHashes, message = _a.message, providerId = _a.providerId;
        var _this = _super.call(this, {
            message: message || "provider does not support network with genesis hashes [".concat(genesisHashes.map(function(value) {
                return "\"".concat(value, "\"");
            }).join(','), "]"),
            providerId: providerId
        }) || this;
        _this.code = enums_1.ARC0027ErrorCodeEnum.NetworkNotSupportedError;
        _this.name = 'NetworkNotSupportedError';
        _this.data = {
            genesisHashes: genesisHashes
        };
        return _this;
    }
    return ARC0027NetworkNotSupportedError;
}(BaseARC0027Error_1.default);
exports.default = ARC0027NetworkNotSupportedError; //# sourceMappingURL=ARC0027NetworkNotSupportedError.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027UnauthorizedSignerError.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// enums
var enums_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)");
// errors
var BaseARC0027Error_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/BaseARC0027Error.js [app-client] (ecmascript)"));
var ARC0027UnauthorizedSignerError = function(_super) {
    __extends(ARC0027UnauthorizedSignerError, _super);
    function ARC0027UnauthorizedSignerError(_a) {
        var message = _a.message, providerId = _a.providerId, signer = _a.signer;
        var _this = _super.call(this, {
            message: message || "unauthorized signer".concat(signer ? " \"".concat(signer, "\"") : ''),
            providerId: providerId
        }) || this;
        _this.code = enums_1.ARC0027ErrorCodeEnum.UnauthorizedSignerError;
        _this.name = 'UnauthorizedSignerError';
        _this.data = {
            signer: signer
        };
        return _this;
    }
    return ARC0027UnauthorizedSignerError;
}(BaseARC0027Error_1.default);
exports.default = ARC0027UnauthorizedSignerError; //# sourceMappingURL=ARC0027UnauthorizedSignerError.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027UnknownError.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// enums
var enums_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)");
// errors
var BaseARC0027Error_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/BaseARC0027Error.js [app-client] (ecmascript)"));
var ARC0027UnknownError = function(_super) {
    __extends(ARC0027UnknownError, _super);
    function ARC0027UnknownError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = enums_1.ARC0027ErrorCodeEnum.UnknownError;
        _this.name = 'UnknownError';
        return _this;
    }
    return ARC0027UnknownError;
}(BaseARC0027Error_1.default);
exports.default = ARC0027UnknownError; //# sourceMappingURL=ARC0027UnknownError.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseARC0027Error = exports.ARC0027UnknownError = exports.ARC0027UnauthorizedSignerError = exports.ARC0027NetworkNotSupportedError = exports.ARC0027MethodTimedOutError = exports.ARC0027MethodNotSupportedError = exports.ARC0027MethodCanceledError = exports.ARC0027InvalidInputError = exports.ARC0027InvalidGroupIdError = exports.ARC0027FailedToPostSomeTransactionsError = void 0;
var ARC0027FailedToPostSomeTransactionsError_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027FailedToPostSomeTransactionsError.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027FailedToPostSomeTransactionsError", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027FailedToPostSomeTransactionsError_1).default;
    }
});
var ARC0027InvalidGroupIdError_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027InvalidGroupIdError.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027InvalidGroupIdError", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027InvalidGroupIdError_1).default;
    }
});
var ARC0027InvalidInputError_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027InvalidInputError.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027InvalidInputError", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027InvalidInputError_1).default;
    }
});
var ARC0027MethodCanceledError_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027MethodCanceledError.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027MethodCanceledError", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027MethodCanceledError_1).default;
    }
});
var ARC0027MethodNotSupportedError_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027MethodNotSupportedError.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027MethodNotSupportedError", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027MethodNotSupportedError_1).default;
    }
});
var ARC0027MethodTimedOutError_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027MethodTimedOutError.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027MethodTimedOutError", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027MethodTimedOutError_1).default;
    }
});
var ARC0027NetworkNotSupportedError_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027NetworkNotSupportedError.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027NetworkNotSupportedError", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027NetworkNotSupportedError_1).default;
    }
});
var ARC0027UnauthorizedSignerError_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027UnauthorizedSignerError.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027UnauthorizedSignerError", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027UnauthorizedSignerError_1).default;
    }
});
var ARC0027UnknownError_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/ARC0027UnknownError.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ARC0027UnknownError", {
    enumerable: true,
    get: function() {
        return __importDefault(ARC0027UnknownError_1).default;
    }
});
var BaseARC0027Error_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/BaseARC0027Error.js [app-client] (ecmascript)");
Object.defineProperty(exports, "BaseARC0027Error", {
    enumerable: true,
    get: function() {
        return __importDefault(BaseARC0027Error_1).default;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/BaseResponseMessage.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var BaseResponseMessage = function() {
    function BaseResponseMessage(_a) {
        var id = _a.id, reference = _a.reference, requestId = _a.requestId;
        this.id = id;
        this.reference = reference;
        this.requestId = requestId;
    }
    return BaseResponseMessage;
}();
exports.default = BaseResponseMessage; //# sourceMappingURL=BaseResponseMessage.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/RequestMessage.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var RequestMessage = function() {
    function RequestMessage(_a) {
        var id = _a.id, params = _a.params, reference = _a.reference;
        this.id = id;
        this.params = params;
        this.reference = reference;
    }
    return RequestMessage;
}();
exports.default = RequestMessage; //# sourceMappingURL=RequestMessage.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/ResponseMessageWithError.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// messages
var BaseResponseMessage_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/BaseResponseMessage.js [app-client] (ecmascript)"));
var ResponseMessageWithError = function(_super) {
    __extends(ResponseMessageWithError, _super);
    function ResponseMessageWithError(_a) {
        var error = _a.error, id = _a.id, reference = _a.reference, requestId = _a.requestId;
        var _this = _super.call(this, {
            id: id,
            reference: reference,
            requestId: requestId
        }) || this;
        _this.error = error;
        return _this;
    }
    return ResponseMessageWithError;
}(BaseResponseMessage_1.default);
exports.default = ResponseMessageWithError; //# sourceMappingURL=ResponseMessageWithError.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/ResponseMessageWithResult.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
// messages
var BaseResponseMessage_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/BaseResponseMessage.js [app-client] (ecmascript)"));
var ResponseMessageWithResult = function(_super) {
    __extends(ResponseMessageWithResult, _super);
    function ResponseMessageWithResult(_a) {
        var id = _a.id, reference = _a.reference, requestId = _a.requestId, result = _a.result;
        var _this = _super.call(this, {
            id: id,
            reference: reference,
            requestId: requestId
        }) || this;
        _this.result = result;
        return _this;
    }
    return ResponseMessageWithResult;
}(BaseResponseMessage_1.default);
exports.default = ResponseMessageWithResult; //# sourceMappingURL=ResponseMessageWithResult.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResponseMessageWithResult = exports.ResponseMessageWithError = exports.RequestMessage = exports.BaseResponseMessage = void 0;
var BaseResponseMessage_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/BaseResponseMessage.js [app-client] (ecmascript)");
Object.defineProperty(exports, "BaseResponseMessage", {
    enumerable: true,
    get: function() {
        return __importDefault(BaseResponseMessage_1).default;
    }
});
var RequestMessage_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/RequestMessage.js [app-client] (ecmascript)");
Object.defineProperty(exports, "RequestMessage", {
    enumerable: true,
    get: function() {
        return __importDefault(RequestMessage_1).default;
    }
});
var ResponseMessageWithError_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/ResponseMessageWithError.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ResponseMessageWithError", {
    enumerable: true,
    get: function() {
        return __importDefault(ResponseMessageWithError_1).default;
    }
});
var ResponseMessageWithResult_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/ResponseMessageWithResult.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ResponseMessageWithResult", {
    enumerable: true,
    get: function() {
        return __importDefault(ResponseMessageWithResult_1).default;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/utils/createMessageReference.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// constants
var constants_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/constants/index.js [app-client] (ecmascript)");
/**
 * Convenience function that constructs a message reference as outlined in
 * ARC-0027.
 * @param {ARC0027MethodEnum} method - the method of the message.
 * @param {ARC0027MessageTypeEnum} type - the type of message; `request` or
 * `response`.
 * @returns {string} the message reference as defined in the ARC-0027 spec.
 */ function createMessageReference(method, type) {
    return "".concat(constants_1.ARC0027_PREFIX, ":").concat(method, ":").concat(type);
}
exports.default = createMessageReference; //# sourceMappingURL=createMessageReference.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/utils/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMessageReference = void 0;
var createMessageReference_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/utils/createMessageReference.js [app-client] (ecmascript)");
Object.defineProperty(exports, "createMessageReference", {
    enumerable: true,
    get: function() {
        return __importDefault(createMessageReference_1).default;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/AVMWebClient.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__assign || function() {
    __assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
var uuid_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/index.js [app-client] (ecmascript)");
// constants
var constants_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/constants/index.js [app-client] (ecmascript)");
// controllers
var BaseController_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/BaseController.js [app-client] (ecmascript)"));
// enums
var enums_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)");
// errors
var errors_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/index.js [app-client] (ecmascript)");
// messages
var messages_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/index.js [app-client] (ecmascript)");
// utils
var utils_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/utils/index.js [app-client] (ecmascript)");
var AVMWebClient = function(_super) {
    __extends(AVMWebClient, _super);
    function AVMWebClient(config) {
        var _this = _super.call(this, config) || this;
        _this._requestIds = [];
        return _this;
    }
    /**
     * public static methods
     */ AVMWebClient.init = function(_a) {
        var _b = _a === void 0 ? {
            debug: false
        } : _a, debug = _b.debug;
        return new AVMWebClient({
            debug: debug || false
        });
    };
    /**
     * private methods
     */ AVMWebClient.prototype._addListener = function(method, callback) {
        var _this = this;
        var _functionName = '_addListener';
        var listener = function(event) {
            var detail;
            try {
                detail = JSON.parse(event.detail); // the event.detail should be a stringified object
            } catch (error) {
                _this._logger.error("".concat(AVMWebClient.name, "#").concat(_functionName, ":"), error);
                return;
            }
            // if the request event is not known, ignore
            if (!_this._requestIds.includes(detail.requestId)) {
                return;
            }
            _this._logger.debug("".concat(AVMWebClient.name, "#").concat(_functionName, ": received response event:"), detail);
            callback(__assign(__assign({}, detail), {
                error: detail.error || null,
                method: method,
                result: detail.result || null
            }));
        };
        var listenerID = (0, uuid_1.v4)();
        var reference = (0, utils_1.createMessageReference)(method, enums_1.ARC0027MessageTypeEnum.Response);
        // start listening to response events and add the listener to the map
        window.addEventListener(reference, listener);
        this._listeners.set(listenerID, {
            listener: listener,
            reference: reference
        });
        return listenerID;
    };
    AVMWebClient.prototype._sendRequestMessage = function(_a) {
        var _this = this;
        var method = _a.method, params = _a.params;
        var _functionName = '_sendRequestMessage';
        var id = (0, uuid_1.v4)();
        var reference = (0, utils_1.createMessageReference)(method, enums_1.ARC0027MessageTypeEnum.Request);
        try {
            // dispatch the request message
            window.dispatchEvent(new CustomEvent(reference, {
                detail: new messages_1.RequestMessage({
                    id: id,
                    params: params,
                    reference: reference
                })
            }));
            // add a timeout to remove the request id and stop handling response messages
            window.setTimeout(function() {
                _this._requestIds = _this._requestIds.filter(function(value) {
                    return value !== id;
                });
            }, constants_1.DEFAULT_REQUEST_TIMEOUT);
            this._logger.debug("".concat(AVMWebClient.name, "#").concat(_functionName, ": posted request message \"").concat(reference, "\" with id \"").concat(id, "\""));
            // add the id to the internal state
            this._requestIds.push(id);
            return id;
        } catch (error) {
            this._logger.error(error);
            throw new errors_1.ARC0027UnknownError(error.message);
        }
    };
    /**
     * public methods
     */ /**
     * Sends a request to remove the client from providers.
     * @param {IDisableParams} params - [optional] params that specify which provider, network and/or specific session IDs.
     * @returns {string} the ID of the request message.
     */ AVMWebClient.prototype.disable = function(params) {
        return this._sendRequestMessage({
            method: enums_1.ARC0027MethodEnum.Disable,
            params: params
        });
    };
    /**
     * Sends a request to get information relating to available providers. This should be called before interacting with
     * any providers to ensure networks and methods are supported.
     * @param {IDiscoverParams} params - [optional] params that specify which provider to target.
     * @returns {string} the ID of the request message.
     */ AVMWebClient.prototype.discover = function(params) {
        return this._sendRequestMessage({
            method: enums_1.ARC0027MethodEnum.Discover,
            params: params
        });
    };
    /**
     * Enables to a client with providers. If the ID of the provider and/or network is specified, that provider/network is
     * used, otherwise the all providers available providers are used.
     * @param {IEnableParams} params - [optional] params that specify the provider and/or the network.
     * @returns {string} the ID of the request message.
     */ AVMWebClient.prototype.enable = function(params) {
        return this._sendRequestMessage({
            method: enums_1.ARC0027MethodEnum.Enable,
            params: params
        });
    };
    /**
     * Listens to `disable` messages sent from providers.
     * @param {TAVMWebClientCallback<IDisableResult>} callback - callback that is called when a response message
     * is received.
     * @returns {string} the ID of the listener.
     */ AVMWebClient.prototype.onDisable = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.Disable, callback);
    };
    /**
     * Listens to `discover` messages sent from providers.
     * @param {TAVMWebClientCallback<IDiscoverResult>} callback - callback that is called when a response message
     * is received.
     * @returns {string} the ID of the listener.
     */ AVMWebClient.prototype.onDiscover = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.Discover, callback);
    };
    /**
     * Listens to `enable` messages sent from providers.
     * @param {TAVMWebClientCallback<IEnableResult>} callback - callback that is called when a response message
     * is received.
     * @returns {string} the ID of the listener.
     */ AVMWebClient.prototype.onEnable = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.Enable, callback);
    };
    /**
     * Listens to `post_transactions` messages sent from providers.
     * @param {TAVMWebClientCallback<IPostTransactionsResult>} callback - callback that is called when a response
     * message is received.
     * @returns {string} the ID of the listener.
     */ AVMWebClient.prototype.onPostTransactions = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.PostTransactions, callback);
    };
    /**
     * Listens to `sign_and_post_transactions` messages sent from providers.
     * @param {TAVMWebClientCallback<IPostTransactionsResult>} callback - callback that is called when a response
     * message is received.
     */ AVMWebClient.prototype.onSignAndPostTransactions = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.SignAndPostTransactions, callback);
    };
    /**
     * Listens to `sign_message` messages sent from providers.
     * @param {TAVMWebClientCallback<ISignTransactionsResult> | null} callback - callback that is called when a response
     * message is received.
     * @returns {string} the ID of the listener.
     */ AVMWebClient.prototype.onSignMessage = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.SignMessage, callback);
    };
    /**
     * Listens to `sign_transactions` messages sent from providers.
     * @param {TAVMWebClientCallback<ISignTransactionsResult> | null} callback - callback that is called when a response
     * message is received.
     * @returns {string} the ID of the listener.
     */ AVMWebClient.prototype.onSignTransactions = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.SignTransactions, callback);
    };
    /**
     * Request providers to post a list of signed transactions to the network.
     * @param {IPostTransactionsParams} params - params that specify the provider and the signed transactions.
     * @returns {string} the ID of the request message
     */ AVMWebClient.prototype.postTransactions = function(params) {
        return this._sendRequestMessage({
            method: enums_1.ARC0027MethodEnum.PostTransactions,
            params: params
        });
    };
    /**
     * Sends a list of unsigned transactions to be signed and posted to the network by the provider.
     * @param {ISignTransactionsParams} params - params that specify the unsigned transactions and the provider.
     * @returns {string} the ID of the request message
     */ AVMWebClient.prototype.signAndPostTransactions = function(params) {
        return this._sendRequestMessage({
            method: enums_1.ARC0027MethodEnum.SignAndPostTransactions,
            params: params
        });
    };
    /**
     * Sends a UTF-8 encoded message to be signed by the provider.
     * @param {ISignMessageParams} params - params that specify the message to sign, the signer and the provider.
     * @returns {string} the ID of the request message
     */ AVMWebClient.prototype.signMessage = function(params) {
        return this._sendRequestMessage({
            method: enums_1.ARC0027MethodEnum.SignMessage,
            params: params
        });
    };
    /**
     * Sends a list of unsigned transactions to be signed by the provider.
     * @param {ISignTransactionsParams} params - params that specify the unsigned transactions and the provider.
     * @returns {string} the ID of the request message
     */ AVMWebClient.prototype.signTransactions = function(params) {
        return this._sendRequestMessage({
            method: enums_1.ARC0027MethodEnum.SignTransactions,
            params: params
        });
    };
    return AVMWebClient;
}(BaseController_1.default);
exports.default = AVMWebClient; //# sourceMappingURL=AVMWebClient.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/AVMWebProvider.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
var uuid_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/uuid/dist/commonjs-browser/index.js [app-client] (ecmascript)");
// controllers
var BaseController_1 = __importDefault(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/BaseController.js [app-client] (ecmascript)"));
// enums
var enums_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)");
// errors
var errors_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/index.js [app-client] (ecmascript)");
// messages
var messages_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/index.js [app-client] (ecmascript)");
// utils
var utils_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/utils/index.js [app-client] (ecmascript)");
var AVMWebProvider = function(_super) {
    __extends(AVMWebProvider, _super);
    function AVMWebProvider(config) {
        return _super.call(this, config) || this;
    }
    /**
     * private methods
     */ AVMWebProvider.prototype._addListener = function(method, callback) {
        var _this = this;
        var _functionName = '_addListener';
        var listener = function(event) {
            _this._logger.debug("[".concat(_this._config.providerId, "]").concat(AVMWebProvider.name, "#").concat(_functionName, ": received request event:"), event.detail);
            return _this._sendResponseMessage({
                callback: callback,
                method: method,
                requestMessage: event.detail
            });
        };
        var listenerID = (0, uuid_1.v4)();
        var reference = (0, utils_1.createMessageReference)(method, enums_1.ARC0027MessageTypeEnum.Request);
        // start listening to request events and add the listener to the map
        window.addEventListener(reference, listener);
        this._listeners.set(listenerID, {
            listener: listener,
            reference: reference
        });
        return listenerID;
    };
    /**
     * Dispatches an event to the web page with the result/error from the `options.callback` function.
     * NOTE: the event uses the detail property of the `CustomEvent` but due to Firefox's limitation of only allowing
     * non-string properties, the response message MUST be a serializable object as it will be stringified to allow
     * transport.
     * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts}
     * @private
     */ AVMWebProvider.prototype._sendResponseMessage = function(_a) {
        var _b;
        var callback = _a.callback, method = _a.method, requestMessage = _a.requestMessage;
        return __awaiter(this, void 0, void 0, function() {
            var _functionName, id, reference, result, error_1;
            return __generator(this, function(_c) {
                switch(_c.label){
                    case 0:
                        _functionName = '_sendResponseMessage';
                        // if the provider id is supplied in the request, and it does not match the registered provider id, ignore
                        if (((_b = requestMessage.params) === null || _b === void 0 ? void 0 : _b.providerId) && requestMessage.params.providerId !== this._config.providerId) {
                            this._logger.debug("[".concat(this._config.providerId, "]").concat(AVMWebProvider.name, "#").concat(_functionName, ": message \"").concat(requestMessage.reference, "\" is for provider \"").concat(requestMessage.params.providerId, "\", skipping"));
                            return [
                                2 /*return*/ 
                            ];
                        }
                        id = (0, uuid_1.v4)();
                        reference = (0, utils_1.createMessageReference)(method, enums_1.ARC0027MessageTypeEnum.Response);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([
                            1,
                            3,
                            ,
                            4
                        ]);
                        return [
                            4 /*yield*/ ,
                            callback({
                                id: requestMessage.id,
                                method: method,
                                params: requestMessage.params
                            })
                        ];
                    case 2:
                        result = _c.sent();
                        // dispatch a response event with the result
                        window.dispatchEvent(new CustomEvent(reference, {
                            detail: JSON.stringify(new messages_1.ResponseMessageWithResult({
                                id: id,
                                reference: reference,
                                requestId: requestMessage.id,
                                result: result
                            }))
                        }));
                        this._logger.debug("[".concat(this._config.providerId, "]").concat(AVMWebProvider.name, "#").concat(_functionName, ": posted response message \"").concat(reference, "\" with id \"").concat(id, "\""));
                        return [
                            2 /*return*/ 
                        ];
                    case 3:
                        error_1 = _c.sent();
                        this._logger.error(error_1);
                        // if we have an arc-0027 error, send it in the response
                        if (error_1.code) {
                            window.dispatchEvent(new CustomEvent(reference, {
                                detail: JSON.stringify(new messages_1.ResponseMessageWithError({
                                    error: error_1,
                                    id: id,
                                    reference: reference,
                                    requestId: requestMessage.id
                                }))
                            }));
                            return [
                                2 /*return*/ 
                            ];
                        }
                        // otherwise, wrap the message in an unknown error
                        window.dispatchEvent(new CustomEvent(reference, {
                            detail: JSON.stringify(new messages_1.ResponseMessageWithError({
                                error: new errors_1.ARC0027UnknownError({
                                    message: error_1.message,
                                    providerId: this._config.providerId
                                }),
                                id: id,
                                reference: reference,
                                requestId: requestMessage.id
                            }))
                        }));
                        return [
                            2 /*return*/ 
                        ];
                    case 4:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /**
     * public static methods
     */ AVMWebProvider.init = function(providerId, _a) {
        var _b = _a === void 0 ? {
            debug: false
        } : _a, debug = _b.debug;
        return new AVMWebProvider({
            debug: debug || false,
            providerId: providerId
        });
    };
    /**
     * public methods
     */ /**
     * Listens to `disable` messages sent from clients.
     * @param {TAVMWebProviderCallback<IDisableParams, IDisableResult>} callback - the callback to handle requests from
     * the client.
     * @returns {string} the ID of the listener.
     */ AVMWebProvider.prototype.onDisable = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.Disable, callback);
    };
    /**
     * Listens to `discover` messages sent from clients.
     * @param {TAVMWebProviderCallback<IDiscoverParams, IDiscoverResult>} callback - the callback to handle requests from
     * the client.
     * @returns {string} the ID of the listener.
     */ AVMWebProvider.prototype.onDiscover = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.Discover, callback);
    };
    /**
     * Listens to `enable` messages sent from clients.
     * @param {TAVMWebProviderCallback<IEnableParams, IEnableResult>} callback - the callback to handle requests from
     * the client.
     * @returns {string} the ID of the listener.
     */ AVMWebProvider.prototype.onEnable = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.Enable, callback);
    };
    /**
     * Listens to `post_transactions` messages sent from clients.
     * @param {TAVMWebProviderCallback<IPostTransactionsParams, IPostTransactionsResult>} callback - the callback to handle requests from
     * the client.
     * @returns {string} the ID of the listener.
     */ AVMWebProvider.prototype.onPostTransactions = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.PostTransactions, callback);
    };
    /**
     * Listens to `sign_and_post_transactions` messages sent from clients.
     * @param {TAVMWebProviderCallback<ISignTransactionsParams, IPostTransactionsResult>} callback - the callback to handle requests from
     * the client.
     * @returns {string} the ID of the listener.
     */ AVMWebProvider.prototype.onSignAndPostTransactions = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.SignAndPostTransactions, callback);
    };
    /**
     * Listens to `sign_message` messages sent from clients.
     * @param {TAVMWebProviderCallback<ISignMessageParams, ISignMessageResult>} callback - the callback to handle requests from
     * the client.
     * @returns {string} the ID of the listener.
     */ AVMWebProvider.prototype.onSignMessage = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.SignMessage, callback);
    };
    /**
     * Listens to `sign_transactions` messages sent from clients.
     * @param {TAVMWebProviderCallback<ISignTransactionsParams, ISignTransactionsResult>} callback - the callback to handle requests from
     * the client.
     * @returns {string} the ID of the listener.
     */ AVMWebProvider.prototype.onSignTransactions = function(callback) {
        return this._addListener(enums_1.ARC0027MethodEnum.SignTransactions, callback);
    };
    return AVMWebProvider;
}(BaseController_1.default);
exports.default = AVMWebProvider; //# sourceMappingURL=AVMWebProvider.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Logger = exports.BaseController = exports.AVMWebProvider = exports.AVMWebClient = void 0;
var AVMWebClient_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/AVMWebClient.js [app-client] (ecmascript)");
Object.defineProperty(exports, "AVMWebClient", {
    enumerable: true,
    get: function() {
        return __importDefault(AVMWebClient_1).default;
    }
});
var AVMWebProvider_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/AVMWebProvider.js [app-client] (ecmascript)");
Object.defineProperty(exports, "AVMWebProvider", {
    enumerable: true,
    get: function() {
        return __importDefault(AVMWebProvider_1).default;
    }
});
var BaseController_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/BaseController.js [app-client] (ecmascript)");
Object.defineProperty(exports, "BaseController", {
    enumerable: true,
    get: function() {
        return __importDefault(BaseController_1).default;
    }
});
var Logger_1 = __turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/Logger.js [app-client] (ecmascript)");
Object.defineProperty(exports, "Logger", {
    enumerable: true,
    get: function() {
        return __importDefault(Logger_1).default;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/types/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
}); //# sourceMappingURL=index.js.map
}),
"[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/constants/index.js [app-client] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/controllers/index.js [app-client] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/enums/index.js [app-client] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/errors/index.js [app-client] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/messages/index.js [app-client] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/types/index.js [app-client] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/gradzcap/node_modules/@agoralabs-sh/avm-web-provider/dist/utils/index.js [app-client] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
]);

//# sourceMappingURL=81719_571a3b7b._.js.map