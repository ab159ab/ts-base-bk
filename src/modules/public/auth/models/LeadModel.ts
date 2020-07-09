type PERSON_TYPE = "business" | "person" | "candidate" | "admin" | "delegate";

class LeadModel {
  constructor(public type: PERSON_TYPE, public id?: string) {
    this.id = id;
    this.type = type;
  }
}

export default LeadModel;
