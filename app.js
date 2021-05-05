require("dotenv").config();
const x= require("./helpers/initMongodb");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const fileupload = require('express-fileupload');
const authRouter = require("./routes/authRoutes");
const ticketRouter = require("./routes/ticketRoutes");
const membSocieteRouter = require("./routes/membSocieteRoutes");
const clientRouter = require("./routes/clientRoutes");
const mailingRouter = require("./routes/mailingRoutes");
const contratRouter = require("./routes/contratRoutes");
const rapportInterRouter = require("./routes/rapportInterRoutes");
const affecterRouter = require("./routes/affecterRoutes");
// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`uploads`));
app.use(fileupload())
app.use(cors());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/ticket",ticketRouter);
app.use("/api/v1/membSociete",membSocieteRouter);
app.use("/api/v1/client",clientRouter);
app.use("/api/v1/mailing",mailingRouter);
app.use("/api/v1/contrat",contratRouter);
app.use("/api/v1/rapportInter",rapportInterRouter);
app.use("/api/v1/affectation",affecterRouter);

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
