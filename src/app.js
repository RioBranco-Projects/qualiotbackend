require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;
const database = require("./config/database");
const router = require("./routes/router");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("../swagger.json");

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/", router);

app.listen(PORT, async () => {
  try {
    await database();
    // console.log("database conenctado");
  } catch (error) {
    console.error(error);
  }
  console.log("--------------------------------------------------");
  console.log("servidor rodando, porta: ", PORT);
  console.log("--------------------------------------------------");
});
