import { Worker } from '.'

export type WorkerModelProps = {
    id: string
    userID: string
    description: string
    title: string
    firstName: string
    lastName: string
    location: string
    skills: string[]
}

export default class WorkerModel {
    private readonly SKILLS_TYPES = ['lugging', 'harvesting', 'equipment']
    private id: string
    private title: string
    private firstName: string
    private lastName: string
    private location: string
    private skills: string[]
    private description: string
    private userID: string

    constructor(props: WorkerModelProps) {
        this.id = props.id
        this.title = props.title
        this.firstName = props.firstName
        this.lastName = props.lastName
        this.location = props.location
        this.description = props.description
        this.skills = this.validateSkills(props.skills)
        this.userID = props.userID
    }

    public get getWorker(): Worker {
        return {
            id: this.id,
            title: this.title,
            firstName: this.firstName,
            lastName: this.lastName,
            location: this.location,
            skills: this.skills,
            description: this.description,
            userID: this.userID,
        }
    }

    private validateSkills(skills: string[]) {
        const isValid = skills.every((skill) =>
            this.SKILLS_TYPES.includes(skill)
        )
        if (!isValid) {
            throw new Error('Invalid skills')
        }

        return skills
    }
}
