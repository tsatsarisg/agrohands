export class ListJobsQuery {
    constructor(public readonly page: number, public readonly limit: number, public readonly userID?: string) {}
}
