import { Low, JSONFile, JSONFileSync } from "lowdb";
import path from 'path'
import fs from 'fs'
export class Cache {

  private cachePath = path.join(process.cwd(), 'cache.json')
  private adapter = new JSONFile(this.cachePath)
  private db = new Low(this.adapter)

  constructor(private cacheName: string) {
  }

  async prepare() {
    await this.db.read()
    this.db.data = this.db.data || {}
    await this.db.write()
  }

  async get(key: string) {
    await this.prepare()
    await this.db.read()
    if (!this.db.data[this.cacheName]) {
      return null
    }
    return this.db.data[this.cacheName][key];
  }

  async set(key: string, value: any) {
    await this.prepare()
    await this.db.read()
    if (!this.db.data[this.cacheName]) {
      this.db.data[this.cacheName] = {}
      await this.db.write()
      console.log('write')
    }
    await this.db.read()
    this.db.data[this.cacheName][key] = value
    await this.db.write()
  }
}