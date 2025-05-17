import { err, ok } from 'neverthrow'
import { Job } from '../../domain/job.entity'
import { JobWriteRepository } from '../../domain/job.repository'
import { CreateJobHandler } from './create-job.handler'

describe('CreateJobHandler', () => {
    let jobRepositoryMock: jest.Mocked<JobWriteRepository>
    let createJobHandler: CreateJobHandler

    beforeEach(() => {
        jobRepositoryMock = {
            save: jest.fn(),
            delete: jest.fn(),
        }

        createJobHandler = new CreateJobHandler(jobRepositoryMock)
    })

    const validJobProps = {
        title: 'Software Engineer',
        description: 'Develop and maintain software solutions.',
        company: 'TechCorp',
        location: 'San Francisco',
        salary: 120000,
        createdBy: 'user123',
    }

    it('should save a job if creation is successful', async () => {
        jest.spyOn(Job, 'create').mockReturnValueOnce(
            ok(Job.create(validJobProps)._unsafeUnwrap())
        )

        jobRepositoryMock.save.mockResolvedValueOnce(ok({ id: 'exampleID' }))

        const result = await createJobHandler.execute(validJobProps)

        expect(result.isOk()).toBe(true)
        expect(jobRepositoryMock.save).toHaveBeenCalledTimes(1)
        expect(jobRepositoryMock.save).toHaveBeenCalledWith(expect.any(Job))
    })

    it('should return an error if Job.create fails', async () => {
        jest.spyOn(Job, 'create').mockReturnValueOnce(err('Invalid job data'))

        const result = await createJobHandler.execute({
            ...validJobProps,
            title: '',
        })

        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toBe('Invalid job data')
        expect(jobRepositoryMock.save).not.toHaveBeenCalled()
    })

    it('should propagate an error if repository save fails', async () => {
        jest.spyOn(Job, 'create').mockReturnValueOnce(
            ok(Job.create(validJobProps)._unsafeUnwrap())
        )

        jobRepositoryMock.save.mockResolvedValueOnce(err('Database error'))

        const result = await createJobHandler.execute(validJobProps)

        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toBe('Database error')
        expect(jobRepositoryMock.save).toHaveBeenCalledTimes(1)
    })
})
