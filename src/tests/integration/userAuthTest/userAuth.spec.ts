import "regenerator-runtime/runtime";
import "core-js/stable";
import httpStatusCodes, { OK } from "http-status-codes";
import DBTBL from "../../../modules/shared/DBTBL/TBL";
import { getRequest, postRequest } from "../../utils/testUtils";
import { otherConfigs } from "../../../../configs/config";
import knex from "../../../base/database/knex/knex";
import LoginModel from "./models/LoginModel";
import RegisterModel from "./models/RegisterModel";

const { UNPROCESSABLE_ENTITY, OK: STATUS_OK } = httpStatusCodes;

// jest config
jest.setTimeout(otherConfigs.jest.timeoutInMs());

const {
  testFirstName, testLastName, testEmail, testPassword,
} = otherConfigs.jest.test.auth;

const testFailedLogin = async (done: jest.DoneCallback) => {
  const loginResponse = await postRequest<LoginModel>("/login", new LoginModel(testEmail(), testPassword()));
  expect(loginResponse.status).toBe(UNPROCESSABLE_ENTITY);
  console.log(await loginResponse.json());
  done();
};

const testLogin = async (done: jest.DoneCallback) => {
  const loginResponse = await postRequest<LoginModel>("/login", new LoginModel(testEmail(), testPassword()));
  expect(loginResponse.status).toBe(OK);
  console.log(await loginResponse.json());
  done();
};

const testRegister = async (done: jest.DoneCallback) => {
  const registerResponse = await postRequest<RegisterModel>("/register",
    new RegisterModel(testFirstName(), testLastName(), testEmail(), testPassword()));
  console.log(await registerResponse.json());
  expect(registerResponse.status).toBe(STATUS_OK);
  done();
};

const testVerifyAccount = async (done: jest.DoneCallback) => {
  // get lead id for currently registered user
  const lead = await knex(DBTBL.EMAIL.TABLE).where(DBTBL.EMAIL.COLS.EMAIL, testEmail()).first();
  expect(lead).not.toBeNull();
  const verifyAccountResponse = await getRequest(`/verify-account/${lead[DBTBL.FOREIGN_KEYS.LEAD_ID]}`);
  console.log(await verifyAccountResponse.json());
  expect(verifyAccountResponse.status).toBe(STATUS_OK);
  // verify lead status in db
  const leadStatus = await knex(DBTBL.LEAD_STATUS.TABLE)
    .where(DBTBL.LEAD_STATUS.COLS.STATUS, DBTBL.LEAD_STATUS.ENUM.STATUS.ACTIVE).first();
  expect(leadStatus).not.toBeNull();
  done();
};

// failed login test
test("it should hit login route and gets failed", testFailedLogin);

describe("it should test entire flow of register", () => {
  // success register
  test("it should hit register route and be successfully", testRegister);
  // success verify account
  test("it should hit verify account route and be successfully", testVerifyAccount);
});

test("it should hit login route and gets succeed", testLogin);
