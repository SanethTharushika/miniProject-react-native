import "dotenv/config";

import app from "./src/app.js";
import { startSafetyService } from "./src/services/safetyService.js";

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Smart Home Backend running on port ${PORT}`
  );

  startSafetyService();
});