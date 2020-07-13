const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.ENV,
});

pool.on("connect", () => {
  console.log("database is connected");
});

const getUser = (req: any, res : any) => {
  pool.query("SELECT personal_detials.uuid, fname FROM personal_details INNER JOIN email ON email.uuid = personal_details.uuid INNER JOIN  phone ON  phone.uuid",
    (error: any, result: { row: any; }) => {
      if (error) throw error;
      else {
        res.status(200).json(result.row);
      }
    });
};
module.exports = getUser;
