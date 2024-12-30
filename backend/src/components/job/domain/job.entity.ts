export class Job {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly company: string,
        public readonly createdBy: string
    ) {}

    static create(
        title: string,
        description: string,
        company: string,
        createdBy: string
    ): Job {
        const id = 'new'
        return new Job(id, title, description, company, createdBy)
    }
}
