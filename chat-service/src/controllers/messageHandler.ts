import { WebSocketEvent } from "https://deno.land/std/ws/mod.ts";
import { MongoClient, ObjectId } from "https://deno.land/x/mongo@v0.9.1/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

type UserSchema = Room & { _id: { $oid: string } };

type Room = {
  [key: string]: {
    username: string;
    messages: {
      id: string;
      message: string;
      timestamp: string;
    }[];
  };
};

// const DB_NAME = "CHAT_SERVICE"
const db = client.database("AUTH-SERVICE");
const messages = db.collection<UserSchema>("messages");

interface TestUserPayload {
  id: string;
  username: string;
  roomId: string;
  message: string;
}

const handleMessageWS = async (wsEvent: string) => {
  // const { id, username, roomId, message }: TestUserPayload = JSON.parse(
  //   wsEvent
  // );
};

export { handleMessageWS };
