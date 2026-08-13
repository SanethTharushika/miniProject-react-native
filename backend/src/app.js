import express from "express";
import cors from "cors";

import deviceRoutes from "./routes/deviceRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Smart Home Backend API is running",
  });
});

app.use(
  "/api/devices",
  deviceRoutes
);

export default app;