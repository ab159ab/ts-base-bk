class EmailModel {
  constructor(
    public email: string,
    public leadId: string,
    public id?: string | undefined,
  ) {}
}

export default EmailModel;
