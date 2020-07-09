class PasswordModel {
  constructor(
    public hashedPassword: string,
    public leadId: string,
    public id?: string | undefined,
  ) {
    this.id = id;
    this.leadId = leadId;
    this.hashedPassword = hashedPassword;
  }
}

export default PasswordModel;
