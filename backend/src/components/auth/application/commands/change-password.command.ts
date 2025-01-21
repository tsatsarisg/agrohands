export class LoginUserCommand {
    constructor(
        public oldPassword: string,
        public newPassword: string,
        public confirmNewPassword: string
    ) {}
}
