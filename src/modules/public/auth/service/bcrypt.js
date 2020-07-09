import bcrypt from "bcryptjs";

const SALT = 12;

export const bcryptHash = (value) => bcrypt.hash(value, SALT);

export const bcryptCompare = (value1, value2) => bcrypt.compare(value1, value2);
