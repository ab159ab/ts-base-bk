class PasswordModel {
  constructor(
    public hashedPassword: string,
    public leadId: string,
    public id?: string | undefined,
  ) {
  }
}

export default PasswordModel;
