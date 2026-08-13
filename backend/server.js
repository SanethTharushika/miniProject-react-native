import "dotenv/config";

import app from "./src/app.js";

import {
  startSafetyService,
} from "./src/services/safetyService.js";

import {
  startScheduleService,
} from "./src/services/scheduleService.js";

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Smart Home Backend running on port ${PORT}`
  );

  startSafetyService();

  startScheduleService();
});