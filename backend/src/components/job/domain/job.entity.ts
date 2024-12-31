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

export class Job {
    private readonly id: string
    private readonly title: string
    private readonly description: string
    private readonly company: string
    private readonly location: string
    private readonly datePosted: Date
    private readonly createdBy: string
    private readonly salary?: number

    constructor(props: JobProps) {
        this.id = props.id || 'new'
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
}
