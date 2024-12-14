import plainToClass from '../../src/utils/plainToClass'
import FranchiseModel from '../../src/components/franchise/franchise.model'
describe('plainToClass [utils]', () => {
    it('should return a typed array', () => {
        const sampleJSONArray = [
            { _id: 'id', name: 'test', category: 'Bakery' },
        ]
        const typedArray = plainToClass(sampleJSONArray, FranchiseModel)

        expect(typedArray).toHaveLength(1)
        expect(typedArray[0]?.getFranchise).toEqual({
            name: 'test',
            category: 'Bakery',
        })
    })
})
