class PersonModel {
  constructor(
    public leadId: string,
    public firstName: string,
    public lastName: string,
    public id?: string | undefined,
    public summary?: string | undefined,
  ) {
    this.id = id;
    this.leadId = leadId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.summary = summary;
  }
}

export default PersonModel;
