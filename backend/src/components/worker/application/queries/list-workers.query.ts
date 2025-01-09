export class ListWorkersQuery {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly searchTerm?: string
    ) {}
}
