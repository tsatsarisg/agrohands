import { Franchise, FranchiseCategory, FranchiseProps } from '.'

export default class FranchiseModel {
    private name: string
    private category: FranchiseCategory
    private franchiseCategories = ['Carwash', 'Bakery']

    constructor(props: FranchiseProps) {
        this.name = props.name
        this.category = this.validateCategory(props.category)
    }

    public get getFranchise(): Franchise {
        return {
            name: this.name,
            category: this.category,
        }
    }

    private validateCategory = (category: FranchiseCategory) => {
        if (!this.franchiseCategories.includes(category))
            throw new Error(`Given category isn't supported yet.`)

        return category
    }
}
