import { Job, JobProps, JobUpdateProps } from './job.entity'

describe('Job', () => {
    const validJobProps: JobProps = {
        title: 'Software Engineer',
        description: 'Develop and maintain software solutions.',
        company: 'TechCorp',
        location: 'San Francisco',
        salary: 120000,
        createdBy: 'user123',
    }

    describe('create', () => {
        it('should create a Job instance with valid props', () => {
            const result = Job.create(validJobProps)
            expect(result.isOk()).toBe(true)

            const job = result._unsafeUnwrap() // Safe since we're testing a success case
            expect(job.getJob.title).toBe(validJobProps.title)
            expect(job.getJob.description).toBe(validJobProps.description)
            expect(job.getJob.salary).toBe(validJobProps.salary)
        })

        it('should fail to create a Job if title is empty', () => {
            const result = Job.create({ ...validJobProps, title: '' })
            expect(result.isErr()).toBe(true)
            expect(result._unsafeUnwrapErr()).toBe('Title cannot be empty.')
        })

        it('should fail to create a Job if description exceeds max length', () => {
            const longDescription = 'a'.repeat(1001)
            const result = Job.create({
                ...validJobProps,
                description: longDescription,
            })
            expect(result.isErr()).toBe(true)
            expect(result._unsafeUnwrapErr()).toBe(
                'Job description cannot exceed 1000 characters.'
            )
        })

        it('should fail to create a Job if salary is negative', () => {
            const result = Job.create({ ...validJobProps, salary: -1000 })
            expect(result.isErr()).toBe(true)
            expect(result._unsafeUnwrapErr()).toBe('Salary cannot be negative.')
        })
    })

    describe('updateJob', () => {
        it('should update the Job with valid fields', () => {
            const result = Job.create(validJobProps)
            expect(result.isOk()).toBe(true)

            const job = result._unsafeUnwrap()
            const updateProps: JobUpdateProps = {
                title: 'Senior Software Engineer',
                salary: 140000,
            }
            const updateResult = job.updateJob(updateProps)
            expect(updateResult.isOk()).toBe(true)

            const updatedJob = job.getJob
            expect(updatedJob.title).toBe(updateProps.title)
            expect(updatedJob.salary).toBe(updateProps.salary)
        })

        it('should fail to update the Job if a field is invalid', () => {
            const result = Job.create(validJobProps)
            expect(result.isOk()).toBe(true)

            const job = result._unsafeUnwrap()
            const updateProps: JobUpdateProps = { title: '' }
            const updateResult = job.updateJob(updateProps)
            expect(updateResult.isErr()).toBe(true)
            expect(updateResult._unsafeUnwrapErr()).toBe(
                'Title cannot be empty.'
            )
        })

        it('should partially update fields without affecting others', () => {
            const result = Job.create(validJobProps)
            expect(result.isOk()).toBe(true)

            const job = result._unsafeUnwrap()
            const updateProps: JobUpdateProps = { location: 'New York' }
            const updateResult = job.updateJob(updateProps)
            expect(updateResult.isOk()).toBe(true)

            const updatedJob = job.getJob
            expect(updatedJob.location).toBe(updateProps.location)
            expect(updatedJob.title).toBe(validJobProps.title) // Unchanged
        })
    })

    describe('setID', () => {
        it('should set the ID if it is new', () => {
            const result = Job.create(validJobProps)

            const job = result._unsafeUnwrap()
            job.setID = 'job-123'

            expect(job.getJob.id).toBe('job-123')
        })
    })
})
