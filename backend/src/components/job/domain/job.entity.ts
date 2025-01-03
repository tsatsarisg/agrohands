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
    private readonly FIELD_MAX_LENGTH = 200
    private readonly DESCRIPTION_MAX_LENGTH = 1000
    private id: string
    private title: string
    private description: string
    private company: string
    private location: string
    private readonly datePosted: Date
    private readonly createdBy: string
    private salary?: number

    constructor(props: JobProps) {
        this.id = props.id || 'new'
        this.validateFields(props.title, 'Title')
        this.validateDescription(props.description)
        this.validateFields(props.company, 'Company')
        this.validateFields(props.location, 'Location')
        this.validateSalary(props?.salary)
        this.title = props.title
        this.description = props.description
        this.company = props.company
        this.location = props.location
        this.datePosted = props.datePosted || new Date()
        this.createdBy = props.createdBy
        this.salary = props.salary
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
        if (this.id !== 'new') {
            throw new Error('ID already set.')
        }
        this.id = id
    }

    private validateDescription(description: string): void {
        if (!description || description.trim().length === 0) {
            throw new Error('Job description cannot be empty.')
        }
        if (description.length > this.DESCRIPTION_MAX_LENGTH) {
            throw new Error(
                `Job description cannot exceed ${this.DESCRIPTION_MAX_LENGTH} characters.`
            )
        }
    }

    private validateFields(field: string, name: string): void {
        if (!field || field.trim().length === 0) {
            throw new Error(`${name} cannot be empty.`)
        }
        if (field.length > this.FIELD_MAX_LENGTH) {
            throw new Error(
                `${name} cannot exceed ${this.FIELD_MAX_LENGTH} characters.`
            )
        }
    }

    private validateSalary(salary?: number): void {
        if (salary && salary < 0) {
            throw new Error('Salary cannot be negative.')
        }
    }

    public updateJob(job: JobUpdateProps): void {
        if (job.title) {
            this.validateFields(job.title, 'Title')
            this.title = job.title
        }
        if (job.description) {
            this.validateDescription(job.description)
            this.description = job.description
        }
        if (job.company) {
            this.validateFields(job.company, 'Company')
            this.company = job.company
        }
        if (job.location) {
            this.validateFields(job.location, 'Location')
            this.location = job.location
        }
        if (job.salary) {
            this.validateSalary(job.salary)
            this.salary = job.salary
        }
    }
}
