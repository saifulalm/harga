/*
 * A JavaScript implementation of the RSA Data Security, Inc. hash Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/hash for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_hash(s)    { return rstr2hex(rstr_hash(str2rstr_utf8(s))); }
function b64_hash(s)    { return rstr2b64(rstr_hash(str2rstr_utf8(s))); }
function any_hash(s, e) { return rstr2any(rstr_hash(str2rstr_utf8(s)), e); }
function hex_hmac_hash(k, d)
  { return rstr2hex(rstr_hmac_hash(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_hash(k, d)
  { return rstr2b64(rstr_hmac_hash(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_hash(k, d, e)
  { return rstr2any(rstr_hmac_hash(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Calculate the hash of a raw string
 */
function rstr_hash(s)
{
  return binl2rstr(binl_hash(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-hash, of a key and some data (raw strings)
 */
function rstr_hmac_hash(key, data)
{
  var bkey = rstr2binl(key);
  if(bkey.length > 16) bkey = binl_hash(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_hash(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_hash(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for(j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the hash of an array of little-endian words, and a bit length.
 */
function binl_hash(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = hash_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = hash_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = hash_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = hash_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = hash_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = hash_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = hash_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = hash_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = hash_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = hash_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = hash_ff(c, d, a, b, x[i+10], 17, -42063);
    b = hash_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = hash_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = hash_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = hash_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = hash_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = hash_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = hash_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = hash_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = hash_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = hash_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = hash_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = hash_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = hash_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = hash_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = hash_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = hash_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = hash_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = hash_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = hash_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = hash_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = hash_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = hash_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hash_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hash_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hash_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hash_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hash_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hash_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hash_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hash_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hash_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hash_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hash_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hash_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hash_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hash_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hash_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = hash_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = hash_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = hash_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = hash_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = hash_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = hash_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = hash_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = hash_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = hash_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = hash_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = hash_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = hash_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = hash_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = hash_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = hash_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = hash_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function hash_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function hash_ff(a, b, c, d, x, s, t)
{
  return hash_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function hash_gg(a, b, c, d, x, s, t)
{
  return hash_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hash_hh(a, b, c, d, x, s, t)
{
  return hash_cmn(b ^ c ^ d, a, b, x, s, t);
}
function hash_ii(a, b, c, d, x, s, t)
{
  return hash_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}
