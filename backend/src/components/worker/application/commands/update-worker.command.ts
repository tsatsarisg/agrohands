export class UpdateWorkerCommand {
    constructor(
        public userID: string,
        public description: string,
        public id: string,
        public title: string,
        public firstName: string,
        public lastName: string,
        public location: string,
        public skills: string[]
    ) {}
}
