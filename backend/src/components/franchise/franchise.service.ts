import FranchiseRepository from './franchise.repository'
import FranchiseModel from './franchise.model'
import { FranchiseProps, IFranchisesComponent } from '.'

export default class FranchiseService implements IFranchisesComponent {
    private repository: FranchiseRepository

    constructor(franchiseRepository: FranchiseRepository) {
        this.repository = franchiseRepository
    }

    async getFranchise(id: string) {
        return (await this.repository.getFranchise(id)).getFranchise
    }

    async getFranchises() {
        const franchises = await this.repository.getFranchises()

        return franchises.map((franchise) => franchise.getFranchise)
    }

    async createFranchise(props: FranchiseProps) {
        const franchise = new FranchiseModel({ ...props })
        await this.repository.createFranchise(props)
        return franchise.getFranchise
    }

    async deleteFranchise(id: string) {
        await this.repository.deleteFranchise(id)
    }
}
