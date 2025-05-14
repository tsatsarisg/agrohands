export class ListPersonalJobsQuery {
    constructor(public readonly page: number, public readonly limit: number, public readonly userID: string) {}
}
