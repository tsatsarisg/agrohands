import { Worker, WorkerProps } from '.'

export default class WorkerModel {
    private id: string
    private title: string
    private firstName: string
    private lastName: string
    private location: string
    private skills: string[]

    constructor(props: WorkerProps) {
        this.id = props.id
        this.title = props.title
        this.firstName = props.firstName
        this.lastName = props.lastName
        this.location = props.location
        this.skills = props.skills
    }

    public get getWorker(): Worker {
        return {
            id: this.id,
            title: this.title,
            firstName: this.firstName,
            lastName: this.lastName,
            location: this.location,
            skills: this.skills,
        }
    }
}

// db.getCollection("workers").insertOne({
//     title: "Farmer",
//     firstName: "John",
//     lastName: 'Doe',
//     location: "Athens, Greece",
//     skills: ['lugging']
//   })
