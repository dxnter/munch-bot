import NodeCache from 'node-cache';

class Cache {
  cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });
  }

  get(key: string): any {
    const value = this.cache.get(key);
    return value;
  }

  set(key: string, data: any): any {
    this.cache.set(key, data);
  }
}

export default new Cache();
