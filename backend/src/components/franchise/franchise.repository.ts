import { Collection, ObjectId } from 'mongodb'
import FranchiseModel from './franchise.model'

import plainToClass from '../../utils/plainToClass'
import { FranchiseCategory, FranchiseProps } from '.'

export type FranchiseDocument = {
    _id?: ObjectId
    name: string
    category: string
}

export default class FranchiseRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async getFranchise(id: string) {
        const franchiseDocument = await this.collection.findOne({
            _id: new ObjectId(id),
        })

        if (!franchiseDocument) throw new Error('No matches found.')

        const franchise = new FranchiseModel({
            name: franchiseDocument.name,
            category: franchiseDocument.category as FranchiseCategory,
        })

        return franchise
    }

    async getFranchises() {
        const cursor = this.collection.find()
        const filteredDocs = await cursor.toArray()

        if (!filteredDocs) throw new Error('No matches found.')

        const typedFilteredDocs = plainToClass(filteredDocs, FranchiseModel)

        return typedFilteredDocs
    }

    async createFranchise(props: FranchiseProps) {
        const franchise = new FranchiseModel(props)

        const createdFranchise = await this.collection.insertOne(
            franchise.getFranchise
        )

        return createdFranchise
    }

    async deleteFranchise(id: string) {
        await this.collection.deleteOne({ _id: new ObjectId(id) })
    }
}
