import { Worker, WorkerProps } from '.'

export default class WorkerModel {
    private name: string

    constructor(props: WorkerProps) {
        this.name = props.name
    }

    public get getWorker(): Worker {
        return {
            name: this.name,
        }
    }
}
