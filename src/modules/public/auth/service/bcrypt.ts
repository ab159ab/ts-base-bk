import bcrypt from "bcryptjs";

const SALT = 12;

export const bcryptHash = (value: string): Promise<string> => bcrypt.hash(value, SALT);

export const bcryptCompare = (
  value1: string, value2: string,
): Promise<boolean> => bcrypt.compare(value1, value2);
