import WorkerModel, { WorkerModelProps } from '../worker.model'

describe('WorkerModel', () => {
    let workerProps: WorkerModelProps

    beforeEach(() => {
        workerProps = {
            id: '1',
            title: 'Farmer',
            firstName: 'John',
            lastName: 'Doe',
            location: 'Athens, Greece',
            skills: ['lugging'],
        }
    })

    it('should create a WorkerModel instance with valid properties', () => {
        const worker = new WorkerModel(workerProps)
        expect(worker).toBeInstanceOf(WorkerModel)
        expect(worker.getWorker).toEqual(workerProps)
    })

    it('should validate firstName property', () => {
        workerProps.firstName = ''
        expect(() => new WorkerModel(workerProps)).toThrowError(
            'Invalid firstName'
        )
    })

    it('should validate lastName property', () => {
        workerProps.lastName = ''
        expect(() => new WorkerModel(workerProps)).toThrowError(
            'Invalid lastName'
        )
    })

    it('should validate location property', () => {
        workerProps.location = ''
        expect(() => new WorkerModel(workerProps)).toThrowError(
            'Invalid location'
        )
    })

    it('should return the correct worker object from getWorker method', () => {
        const worker = new WorkerModel(workerProps)
        expect(worker.getWorker).toEqual(workerProps)
    })
})
