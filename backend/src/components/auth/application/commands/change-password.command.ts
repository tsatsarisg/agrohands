export class changePasswordCommand {
    constructor(
        public userID: string,
        public oldPassword: string,
        public newPassword: string,
        public confirmNewPassword: string
    ) {}
}
