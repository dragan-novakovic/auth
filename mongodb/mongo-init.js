db = db.getSiblingDB("CHAT-SERVICE");

db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [
    {
      role: "readWrite",
      db: "CHAT-SERVICE",
    },
  ],
});

db.messages.insert({
  username: "admin",
  roomId: "xxx",
  message: "First Message",
});

db.messages.insert({
  username: "admin2",
  roomId: "xxx",
  message: "Second Message",
});
