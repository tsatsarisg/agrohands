import { Worker, WorkerProps } from '.'

export default class WorkerModel {
    private id: string
    private name: string

    constructor(props: WorkerProps) {
        this.id = props.id
        this.name = props.name
    }

    public get getWorker(): Worker {
        return {
            id: this.id,
            name: this.name,
        }
    }
}
