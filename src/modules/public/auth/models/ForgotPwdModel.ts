class ForgotPwdModel {
  constructor(
    public leadId: string,
    public tokenExpiryDate: string,
    public isExpired?: boolean | undefined,
    public id?: string | undefined,
  ) {
  }
}

export default ForgotPwdModel;
