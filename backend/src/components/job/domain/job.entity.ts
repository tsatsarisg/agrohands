import { err, ok, Result } from 'neverthrow'

export type JobProps = {
    id?: string
    title: string
    description: string
    company: string
    location: string
    salary?: number
    datePosted?: Date
    createdBy: string
}

export type JobUpdateProps = {
    title?: string
    description?: string
    company?: string
    location?: string
    salary?: number
}

export class Job {
    private static readonly FIELD_MAX_LENGTH = 200
    private static readonly DESCRIPTION_MAX_LENGTH = 1000

    private id: string
    private title: string
    private description: string
    private company: string
    private location: string
    private readonly datePosted: Date
    private readonly createdBy: string
    private salary?: number

    private constructor(props: JobProps) {
        this.id = props.id || 'new'
        this.title = props.title
        this.description = props.description
        this.company = props.company
        this.location = props.location
        this.datePosted = props.datePosted || new Date()
        this.createdBy = props.createdBy
        this.salary = props.salary
    }

    public static create(props: JobProps): Result<Job, string> {
        return this.validateProps(props).map(() => new Job(props))
    }

    public get getJob() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            company: this.company,
            location: this.location,
            datePosted: this.datePosted,
            createdBy: this.createdBy,
            salary: this.salary,
        }
    }

    public set setID(id: string) {
        this.id = id
    }

    public updateJob(job: JobUpdateProps): Result<void, string> {
        const updates: Partial<JobProps> = {
            ...this.getJob,
            ...job,
        }

        return Job.validateProps(updates).map(() => {
            if (job.title) this.title = job.title
            if (job.description) this.description = job.description
            if (job.company) this.company = job.company
            if (job.location) this.location = job.location
            if (job.salary != null) this.salary = job.salary
        })
    }

    private static validateProps(
        props: Partial<JobProps>
    ): Result<void, string> {
        const validations: Result<void, string>[] = [
            this.validateField(props.title, 'Title', this.FIELD_MAX_LENGTH),
            this.validateField(props.company, 'Company', this.FIELD_MAX_LENGTH),
            this.validateField(
                props.location,
                'Location',
                this.FIELD_MAX_LENGTH
            ),
            this.validateDescription(props.description),
            this.validateSalary(props.salary),
        ]

        for (const validation of validations) {
            if (validation.isErr()) return validation
        }

        return ok(undefined)
    }

    private static validateField(
        field: string | undefined,
        name: string,
        maxLength: number
    ): Result<void, string> {
        if (!field || field.trim().length === 0) {
            return err(`${name} cannot be empty.`)
        }
        if (field.length > maxLength) {
            return err(`${name} cannot exceed ${maxLength} characters.`)
        }
        return ok(undefined)
    }

    private static validateDescription(
        description: string | undefined
    ): Result<void, string> {
        if (!description || description.trim().length === 0) {
            return err('Job description cannot be empty.')
        }
        if (description.length > this.DESCRIPTION_MAX_LENGTH) {
            return err(
                `Job description cannot exceed ${this.DESCRIPTION_MAX_LENGTH} characters.`
            )
        }
        return ok(undefined)
    }

    private static validateSalary(salary?: number): Result<void, string> {
        if (salary != null && salary < 0) {
            return err('Salary cannot be negative.')
        }
        return ok(undefined)
    }
}
