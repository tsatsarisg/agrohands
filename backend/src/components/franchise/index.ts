import { Collection } from 'mongodb'
import FranchiseRepository from './franchise.repository'
import FranchiseService from './franchise.service'

export type FranchiseProps = {
    name: string
    category: FranchiseCategory
}

export type FranchiseCategory = 'Carwash' | 'Bakery'

export interface Franchise {
    name: string
    category: FranchiseCategory
}

export interface IFranchisesComponent {
    getFranchise(id: string): Promise<Franchise>
    getFranchises(): Promise<Franchise[]>
    createFranchise(props: FranchiseProps): Promise<Franchise>
    deleteFranchise(id: string): Promise<void>
}

export interface FranchiseComponentDependencies {
    franchiseCollection: Collection
}

export const buildFranchisesComponent = ({
    franchiseCollection,
}: FranchiseComponentDependencies): IFranchisesComponent => {
    const franchiseRepository = new FranchiseRepository(franchiseCollection)
    return new FranchiseService(franchiseRepository)
}
