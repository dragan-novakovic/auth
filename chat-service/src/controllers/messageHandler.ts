import { MongoClient, ObjectId } from "https://deno.land/x/mongo@v0.9.1/mod.ts";
import { WebSocket } from "https://deno.land/std/ws/mod.ts";

const client = new MongoClient();

client.connectWithOptions({
  username: "admin",
  password: "admin",
  hosts: ["localhost:27017"],
  directConnection: true,
});

type MessageSchema = Message & { _id: ObjectId };

type Message = {
  roomId: string;
  message: string;
  username: string;
};

// const DB_NAME = "CHAT_SERVICE"
const db = client.database("AUTH-SERVICE");
const messages = db.collection<MessageSchema>("messages");

interface TestUserPayload {
  id: string;
  username: string;
  roomId: string;
  message: string;
}

const handleMessageWS = async (
  wsEvent: string,
  users: Map<string, WebSocket>
) => {
  const { username, roomId, message }: TestUserPayload = JSON.parse(wsEvent);

  const insertId = await messages.insertOne({
    username,
    roomId,
    message,
  });

  if (insertId) {
    users.forEach((sock) => {
      sock.send(`${username}: ${message}`);
    });
  }
};

export { handleMessageWS };
