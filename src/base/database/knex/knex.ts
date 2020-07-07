import knex from "knex";
import knexFile from "../../../../knexfile";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const knexConfig = knexFile[process.env.ENV.trim()];

export default knex(knexConfig);
