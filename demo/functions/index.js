const { setGlobalOptions } = require("firebase-functions");
const { onSchedule } = require("firebase-functions/scheduler");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
admin.initializeApp();

setGlobalOptions({ maxInstances: 10 });

const SEED_ROOMS = {
  "general": {
    id: "general",
    latestMessage: "Hey everyone! Welcome to the chat. 👋",
  },
  "random": {
    id: "random",
    latestMessage: "This is the random channel.",
  },
};

const SEED_MESSAGES = {
  "general": {
    "msg-1": {
      id: "msg-1",
      type: "message",
      roomId: "general",
      senderId: "user1",
      senderName: "Alice Johnson",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      content: "Hey everyone! Welcome to the chat. 👋",
      timestamp: new Date().toISOString(),
      reactions: { "🎉": ["user2"], "❤️": ["user2"] },
      attachments: [],
      isDeleted: false,
      isSelected: false,
      replyTo: null,
    },
  },
  "random": {
    "msg-1": {
      id: "msg-1",
      type: "message",
      roomId: "random",
      senderId: "user2",
      senderName: "Bob Smith",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      content: "This is the random channel.",
      timestamp: new Date().toISOString(),
      reactions: {},
      attachments: [],
      isDeleted: false,
      isSelected: false,
      replyTo: null,
    },
  },
};

exports.scheduledCleanUp = onSchedule("every day 00:00", async (event) => {
  const database = admin.database();

  await database.ref("/").remove();
  logger.log("Cleanup completed.");

  await database.ref("/rooms").set(SEED_ROOMS);
  await database.ref("/messages").set(SEED_MESSAGES);
  logger.log("Seed data created successfully.");
});
