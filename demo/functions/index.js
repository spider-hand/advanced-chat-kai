const { setGlobalOptions } = require("firebase-functions");
const { onSchedule } = require("firebase-functions/scheduler");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
admin.initializeApp();

setGlobalOptions({ maxInstances: 10 });

// Delete all nodes every day
exports.scheduledCleanUp = onSchedule("every day 00:00", async (event) => {
  const database = admin.database();

  await database.ref("/").remove();

  logger.log("Scheduled cleanup completed successfully.");
});
