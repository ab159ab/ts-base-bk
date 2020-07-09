class ForgotPwdModel {
  constructor(
    public leadId: string,
    public tokenExpiryDate: string,
    public isExpired?: boolean | undefined,
    public id?: string | undefined,
  ) {
    this.id = id;
    this.leadId = leadId;
    this.isExpired = isExpired;
    this.tokenExpiryDate = tokenExpiryDate;
  }
}

export default ForgotPwdModel;
