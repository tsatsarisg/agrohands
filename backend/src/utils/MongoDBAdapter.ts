import { MongoClient, Db } from 'mongodb'

export class MongoAdapter {
    private db!: Db
    private client!: MongoClient

    constructor(url: string) {
        this.client = new MongoClient(url)
    }

    async connect(): Promise<void> {
        await this.client.connect()
        this.db = this.client.db('franchises')
        console.log('Connected to MongoDB!')
    }

    async close(): Promise<void> {
        await this.client.close()
    }

    collection(name: string) {
        return this.db.collection(name)
    }
}
