import { Job } from './job.entity'

describe('JobEntity', () => {
    it('should be defined', () => {
        expect(
            new Job({
                title: 'title',
                description: 'description',
                company: 'company',
                location: 'location',
                createdBy: 'createdBy',
            })
        ).toBeDefined()
    })

    it('should throw an error if title is empty', () => {
        expect(() => {
            new Job({
                title: '',
                description: 'description',
                company: 'company',
                location: 'location',
                createdBy: 'createdBy',
            })
        }).toThrowError('Field cannot be empty.')
    })

    it('should throw an error if description is empty', () => {
        expect(() => {
            new Job({
                title: 'title',
                description: '',
                company: 'company',
                location: 'location',
                createdBy: 'createdBy',
            })
        }).toThrowError('Job description cannot be empty.')
    })

    it('should throw an error if company is empty', () => {
        expect(() => {
            new Job({
                title: 'title',
                description: 'description',
                company: '',
                location: 'location',
                createdBy: 'createdBy',
            })
        }).toThrowError('Field cannot be empty.')
    })

    it('should throw an error if location is empty', () => {
        expect(() => {
            new Job({
                title: 'title',
                description: 'description',
                company: 'company',
                location: '',
                createdBy: 'createdBy',
            })
        }).toThrowError('Field cannot be empty.')
    })

    it('should throw an error if salary is negative', () => {
        expect(() => {
            new Job({
                title: 'title',
                description: 'description',
                company: 'company',
                location: 'location',
                createdBy: 'createdBy',
                salary: -1,
            })
        }).toThrowError('Salary cannot be negative.')
    })

    it('should throw an error if title exceeds max length', () => {
        expect(() => {
            new Job({
                title: 'a'.repeat(201),
                description: 'description',
                company: 'company',
                location: 'location',
                createdBy: 'createdBy',
            })
        }).toThrowError('Field cannot exceed 200 characters.')
    })

    it('should throw an error if description exceeds max length', () => {
        expect(() => {
            new Job({
                title: 'title',
                description: 'a'.repeat(1001),
                company: 'company',
                location: 'location',
                createdBy: 'createdBy',
            })
        }).toThrowError('Job description cannot exceed 1000 characters.')
    })

    it('should throw an error if company exceeds max length', () => {
        expect(() => {
            new Job({
                title: 'title',
                description: 'description',
                company: 'a'.repeat(201),
                location: 'location',
                createdBy: 'createdBy',
            })
        }).toThrowError('Field cannot exceed 200 characters.')
    })

    it('should throw an error if location exceeds max length', () => {
        expect(() => {
            new Job({
                title: 'title',
                description: 'description',
                company: 'company',
                location: 'a'.repeat(201),
                createdBy: 'createdBy',
            })
        }).toThrowError('Field cannot exceed 200 characters.')
    })

    it('should update job', () => {
        const job = new Job({
            title: 'title',
            description: 'description',
            company: 'company',
            location: 'location',
            createdBy: 'createdBy',
        })

        job.updateJob({
            title: 'new title',
            description: 'new description',
            company: 'new company',
            location: 'new location',
            salary: 1000,
        })

        const jobData = job.getJob

        expect(jobData.title).toBe('new title')
        expect(jobData.description).toBe('new description')
        expect(jobData.company).toBe('new company')
        expect(jobData.location).toBe('new location')
        expect(jobData.salary).toBe(1000)
    })
})
