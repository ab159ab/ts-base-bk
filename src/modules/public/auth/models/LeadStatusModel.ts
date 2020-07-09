type LEAD_STATUS_TYPE = "active" | "pending" | "blocked";

class LeadStatusModel {
  constructor(
    public leadId: string,
    public status: LEAD_STATUS_TYPE,
    public id?: string | undefined,
  ) {
    this.id = id;
    this.leadId = leadId;
    this.status = status;
  }
}

export default LeadStatusModel;
