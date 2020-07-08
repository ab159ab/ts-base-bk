class EmailModel {
  constructor(
    public email: string,
    public leadId: string,
    public id?: string | undefined,
  ) {
    this.id = id;
    this.leadId = leadId;
    this.email = email;
  }
}

export default EmailModel;
