export function mergeObject(target, source){
  let targetKeys = Object.keys(target);

  targetKeys.forEach( key => {
    if(typeof source[key] !== 'undefined'){
      target[key] = source[key]
    }
    else {
      target[key] = null
    }
  })
}

export function isType(target, type){
  return Object.prototype.toString.call(target).toLowerCase() === `[object ${type}]`;
}

export function isFunction(target){
  return isType(target,'function');
}

export function isString(target) {
  return isType(target,'string');
}

export function isObject(target) {
  return isType(target,'object');
}

export function isArray(target) {
  return isType(target,'array');
}

export function isPromise(v) {
  return v && typeof v.then === 'function';
}

export function deepExtend (out) {
  out = out || {};

  for (let i = 1, len = arguments.length; i < len; ++i) {
    let obj = arguments[i];

    if (!obj) {
      continue;
    }

    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      if (isObject(obj[key])) {
        out[key] = deepExtend(out[key], obj[key]);
        continue;
      }

      out[key] = obj[key];
    }
  }

  return out;
}

export function deepExtendArrayType (out, arr) {
  out = out || {};

  for (let i = 0, len = arr.length; i < len; i++) {
    let obj = arr[i];

    if (!obj) {
      continue;
    }

    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      if (isObject(obj[key])) {
        out[key] = deepExtend(out[key], obj[key]);
        continue;
      }

      out[key] = obj[key];
    }
  }

  return out;
}

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
export function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}
