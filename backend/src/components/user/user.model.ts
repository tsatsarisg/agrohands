export type UserProps = {
    id: string
    email: string
    password: string
}

export default class User {
    private id: string
    private email: string
    private password: string

    constructor(props: UserProps) {
        this.id = props.id
        this.email = props.email
        this.password = props.password
    }
}
