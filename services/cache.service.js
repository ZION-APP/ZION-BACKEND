const NodeCache = require( "node-cache" );

class CacheService {

  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  set(_key,value,ttl){
    if(!_key){
      return null;
    }
    let key = String(_key);
    let success = this.cache.set( key, value, ttl );
    return success;
  }

  get(_key) {
    if(!_key){
      return null;
    }
    let key = String(_key);
    let index = this.cache.keys().indexOf(key);
    if(index != -1){
      const value = this.cache.get(key);
      return value;
    }else{
      return null;
    }
  }

  del(keys) {
    this.cache.del(keys);
  }

  delStartWith(startStr = '') {
    if (!startStr) {
      return;
    }

    const keys = this.cache.keys();
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    }
  }

  flush() {
    this.cache.flushAll();
  }
}

module.exports = CacheService;