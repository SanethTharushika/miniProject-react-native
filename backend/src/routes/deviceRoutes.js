import express from "express";

import {
  changeDeviceStatus,
  getDevices,
} from "../controllers/deviceController.js";

const router = express.Router();

router.get("/", getDevices);

router.patch(
  "/:id/status",
  changeDeviceStatus
);

export default router;