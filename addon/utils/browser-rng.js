/**
 * Based on code from node-uuid.
 */

let rng;

if (window.crypto && window.crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  let _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    window.crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  let  _rnds = new Array(16);
  rng = function() {
    for (let i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) {r = Math.random() * 0x100000000;}
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}


export default rng;
