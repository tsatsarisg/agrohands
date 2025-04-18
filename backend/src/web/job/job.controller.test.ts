import { CreateJobHandler } from '../../components/job/application/handlers/create-job.handler'
import { ListJobsHandler } from '../../components/job/application/handlers/list-jobs.handler'
import {
    JobReadRepository,
    JobWriteRepository,
} from '../../components/job/domain/job.repository'
import { JobController } from './job.controller'
import { Request, Response } from 'express'

describe('JobController', () => {
    let jobController: JobController
    let createJobHandler: CreateJobHandler
    let listJobsHandler: ListJobsHandler
    let jobRepository: JobReadRepository
    let jobWriteRepository: JobWriteRepository

    beforeEach(() => {
        jobRepository = {
            countAll: jest.fn(),
            findPaginated: jest.fn(),
        } as unknown as JobReadRepository
        jobWriteRepository = {
            save: jest.fn(),
        }
        createJobHandler = new CreateJobHandler(jobWriteRepository)
        listJobsHandler = new ListJobsHandler(jobRepository)
        jobController = new JobController(createJobHandler, listJobsHandler)
    })

    it('should be defined', () => {
        expect(jobController).toBeDefined()
    })

    it('should create a job', async () => {
        const req = {
            body: {
                title: 'title',
                description: 'description',
                company: 'company',
                location: 'location',
            },
            userID: 'createdBy',
        } as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await jobController.createJob(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalled()
    })

    it('should return 400 if title is empty', async () => {
        const req = {
            body: {
                title: '',
                description: 'description',
                company: 'company',
                location: 'location',
            },
            userID: 'createdBy',
        } as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await jobController.createJob(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error: 'Title cannot be empty.',
        })
    })

    it('should return 400 if description is empty', async () => {
        const req = {
            body: {
                title: 'title',
                description: '',
                company: 'company',
                location: 'location',
            },
            userID: 'createdBy',
        } as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await jobController.createJob(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error: 'Job description cannot be empty.',
        })
    })
})
