import knex from "../knex/knex";

const queries = {
getAll() {
    return knex.select("fname", "email", "phone")
      .from("person_details")
      .innerJoin("users", "users.uuid", "person_details.userId")
      .innerJoin("users", "user.uuid", "email.userId")
      .innerJoin("users", "users.uuid", "phone.userId");
  },
};

export default queries;
