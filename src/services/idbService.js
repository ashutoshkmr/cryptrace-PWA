import { openDB } from "idb";

class IndexDbService {
  dbName = "CrypTrace";
  storeName = "coinList";
  constructor() {
    // @ts-ignore
    if (!IndexDbService.instance) {
      this.db = openDB(this.dbName, 1, {
        upgrade: (db) => {
          db.createObjectStore(this.storeName);
        },
      });
      // @ts-ignore
      IndexDbService.instance = this;
    }
    // @ts-ignore
    return IndexDbService.instance;
  }

  async get(key) {
    return (await this.db).get(this.storeName, key);
  }

  async set(key, val) {
    return (await this.db).put(this.storeName, val, key);
  }
  async delete(key) {
    return (await this.db).delete(this.storeName, key);
  }
  async clear() {
    return (await this.db).clear(this.storeName);
  }
  async keys() {
    return (await this.db).getAllKeys(this.storeName);
  }
}

const idbService = new IndexDbService();
Object.freeze(idbService);

export default idbService;
