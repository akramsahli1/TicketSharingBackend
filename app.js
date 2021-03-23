require("dotenv").config();
const x= require("./helpers/initMongodb");
const express = require("express");
const app = express();
const morgan = require("morgan");
const ticketRouter = require("./routes/ticketRoutes");
const cors = require('cors')
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cors());

app.use("/api/v1/ticket",ticketRouter);

app.use("/", (req, res, next) => {
  console.log("Introuvable !");
  res.status(404).json({
    status: 404,
    message: "Page not found!",
  });
});

// Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
