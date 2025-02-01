import { JobReadRepository } from '../domain/job.repository'
import { MongoJobReadRepository } from './job.read.repository.impl'

describe('MongoJobReadRepository', () => {
    let mockCollection: any
    let jobRepository: JobReadRepository

    beforeEach(() => {
        mockCollection = {
            find: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            toArray: jest.fn(),
            countDocuments: jest.fn().mockResolvedValue(15),
        }

        jobRepository = new MongoJobReadRepository(mockCollection)
    })

    it('should return ok result with job entities', async () => {
        mockCollection.toArray.mockResolvedValue([createMockDoc()])
        const result = await jobRepository.findPaginated(1, 5)

        expect(mockCollection.find).toHaveBeenCalledWith()
        expect(mockCollection.sort).toHaveBeenCalledWith({ datePosted: -1 })
        expect(mockCollection.skip).toHaveBeenCalledWith(0)
        expect(mockCollection.limit).toHaveBeenCalledWith(5)
        expect(mockCollection.toArray).toHaveBeenCalled()

        expect(result.isOk()).toBe(true)
        const jobs = result._unsafeUnwrap()
        expect(jobs.length).toBe(1)
        expect(jobs[0]?.getJob).toEqual({
            id: 'mockId123',
            title: 'Mock Title',
            description: 'Mock Description',
            company: 'Mock Company',
            location: 'Mock Location',
            datePosted: '2024-01-01',
            createdBy: 'mockUser456',
            salary: 50000,
        })
    })

    it('should calculate the correct skip value', async () => {
        mockCollection.toArray.mockResolvedValue([createMockDoc()])

        const page = 3
        const limit = 4
        await jobRepository.findPaginated(page, limit)

        expect(mockCollection.skip).toHaveBeenCalledWith(8)
        expect(mockCollection.limit).toHaveBeenCalledWith(4)
    })

    it('should return error result with errors', async () => {
        mockCollection.toArray.mockResolvedValue([createMockDoc({ title: '' })])

        const result = await jobRepository.findPaginated(1, 5)

        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toEqual(
            'Failed to parse jobs: Title cannot be empty.'
        )
    })
})

function createMockDoc(overrides = {}) {
    return {
        _id: { toString: () => 'mockId123' },
        title: 'Mock Title',
        description: 'Mock Description',
        company: 'Mock Company',
        location: 'Mock Location',
        datePosted: '2024-01-01',
        userID: { toString: () => 'mockUser456' },
        salary: 50000,
        ...overrides,
    }
}
