class PersonModel {
  constructor(
    public leadId: string,
    public firstName: string,
    public lastName: string,
    public id?: string | undefined,
    public summary?: string | undefined,
  ) {
  }
}

export default PersonModel;
