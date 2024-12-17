import plainToClass from '../../src/utils/plainToClass'
import WorkerModel from '../../src/components/worker/worker.model'
describe('plainToClass [utils]', () => {
    it('should return a typed array', () => {
        const sampleJSONArray = [
            { _id: 'id', name: 'test', category: 'Bakery' },
        ]
        const typedArray = plainToClass(sampleJSONArray, WorkerModel)

        expect(typedArray).toHaveLength(1)
        expect(typedArray[0]?.getWorker).toEqual({
            name: 'test',
            category: 'Bakery',
        })
    })
})
