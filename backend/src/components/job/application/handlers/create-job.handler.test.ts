import { JobRepository } from '../../domain/job.repository'
import { CreateJobHandler } from './create-job.handler'

describe('CreateJobHandler', () => {
    let createJobHandler: CreateJobHandler
    let jobRepository: JobRepository

    beforeEach(() => {
        jobRepository = {
            countAll: jest.fn(),
            findPaginated: jest.fn(),
            save: jest.fn().mockResolvedValue('id'),
        }
        createJobHandler = new CreateJobHandler(jobRepository)
    })

    it('should be defined', () => {
        expect(createJobHandler).toBeDefined()
    })

    it('should create a job', async () => {
        const job = await createJobHandler.execute({
            title: 'title',
            description: 'description',
            company: 'company',
            location: 'location',
            createdBy: 'createdBy',
        })

        if (typeof job === 'string') {
            expect(job).toBe('Field cannot be empty.')
            return
        }

        const jobData = job.getJob

        expect(job).toBeDefined()
        expect(jobData.id).toBe('id')
        expect(jobData.title).toBe('title')
        expect(jobData.description).toBe('description')
        expect(jobData.company).toBe('company')
        expect(jobData.location).toBe('location')
        expect(jobData.createdBy).toBe('createdBy')
    })

    it('should return an error if title is empty', async () => {
        const job = await createJobHandler.execute({
            title: '',
            description: 'description',
            company: 'company',
            location: 'location',
            createdBy: 'createdBy',
        })

        expect(job).toBe('Title cannot be empty.')
    })
})
