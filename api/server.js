const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require(`${__dirname}/app`);
const mongoose = require("mongoose");

const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch(() => {
    console.log("");
  });

app.listen(5000, () => {
  console.log("server is running");
});

