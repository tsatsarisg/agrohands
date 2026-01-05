export class UpdateEmailCommand {
  constructor(
    public readonly userId: string,
    public readonly newEmail: string,
  ) {}
}
