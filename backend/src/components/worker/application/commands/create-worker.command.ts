export class CreateWorkerCommand {
    constructor(
        public userID: string,
        public description: string,
        public title: string,
        public firstName: string,
        public lastName: string,
        public location: string,
        public skills: string[]
    ) {}
}
