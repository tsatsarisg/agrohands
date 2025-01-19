import { Result, ok, err } from 'neverthrow'

export type WorkerProps = {
    id: string
    userID: string
    title: string
    firstName: string
    lastName: string
    location: string
    skills: string[]
    description: string
}

export const WorkerErrors = {
    INVALID_SKILLS:
        'Skills format is invalid. Allowed skills are: lugging, harvesting, equipment.',
}

class Worker {
    private static readonly SKILLS_TYPES = [
        'lugging',
        'harvesting',
        'equipment',
    ]

    private constructor(
        private readonly id: string,
        private readonly userID: string,
        private readonly title: string,
        private readonly firstName: string,
        private readonly lastName: string,
        private readonly location: string,
        private readonly skills: string[],
        private readonly description: string
    ) {}

    public static create(props: WorkerProps): Result<Worker, string> {
        const skillsValidation = Worker.validateSkills(props.skills)

        if (skillsValidation.isErr()) {
            return err(skillsValidation.error)
        }

        return ok(
            new Worker(
                props.id,
                props.userID,
                props.title,
                props.firstName,
                props.lastName,
                props.location,
                props.skills,
                props.description
            )
        )
    }

    private static validateSkills(skills: string[]): Result<void, string> {
        const isValid = skills.every((skill) =>
            Worker.SKILLS_TYPES.includes(skill)
        )
        if (!isValid) {
            return err(WorkerErrors.INVALID_SKILLS)
        }
        return ok(undefined)
    }

    get getDetails() {
        return {
            id: this.id,
            userID: this.userID,
            title: this.title,
            firstName: this.firstName,
            lastName: this.lastName,
            location: this.location,
            skills: this.skills,
            description: this.description,
        }
    }
}

export default Worker
