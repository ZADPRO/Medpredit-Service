require("dotenv").config();

const express = require("express");
import AssistantRoutes from "./Routes/Assistant/AssistantRoutes";
import AuthenticationRoutes from "./Routes/Authentication/AuthenticationRoutes";
import CommercialRoutes from "./Routes/Commercial/CommercialRoutes";
import DoctorRoutes from "./Routes/Doctor/DoctorRoutes";
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", AuthenticationRoutes);
app.use("/api/v1", AssistantRoutes);
app.use("/api/v1", DoctorRoutes);
app.use("/api/commercial", CommercialRoutes);

app.listen(process.env.PORT);
