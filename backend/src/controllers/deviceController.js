import * as deviceService from "../services/deviceService.js";

export async function getDevices(req, res) {
  try {
    const devices =
      await deviceService.getAllDevices();

    res.status(200).json({
      success: true,
      data: devices,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to get devices",
    });
  }
}

export async function changeDeviceStatus(
  req,
  res
) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "ON",
      "OFF",
      "ERROR",
      "DISCONNECTED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid device status",
      });
    }

    const device =
      await deviceService.updateDeviceStatus(
        id,
        status
      );

    res.status(200).json({
      success: true,
      data: device,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to update device",
    });
  }
}