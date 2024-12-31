export class CreateJobCommand {
    constructor(
        public title: string,
        public description: string,
        public company: string,
        public location: string,
        public createdBy: string,
        public salary?: number
    ) {}
}
