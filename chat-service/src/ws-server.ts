import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  WebSocket,
  acceptable,
} from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

import { handleMessageWS } from "./controllers/messageHandler.ts";
import requestParser from "./utils/requestParser.ts";

const currentUsers = new Map<string, WebSocket>();

async function handleWs(sock: WebSocket) {
  console.log("socket connected!");

  const uid = v4.generate();
  currentUsers.set(uid, sock);

  try {
    for await (const ev of sock) {
      if (typeof ev === "string") {
        handleMessageWS(ev as string, currentUsers);
      } else if (isWebSocketCloseEvent(ev)) {
        const { code, reason } = ev;
        console.info("ws:Close", code, reason);
        currentUsers.delete(uid);
      }
    }
  } catch (err) {
    console.error(`failed to receive frame: ${err}`);

    if (!sock.isClosed) {
      await sock.close(1000).catch(console.error);
    }
  }
}

if (import.meta.main) {
  const port = Deno.args[0] || "8080";
  console.info(`WS server is running on :${port}`);

  for await (const req of serve(`:${port}`)) {
    const { conn, r: bufReader, w: bufWriter, headers } = req;

    if (acceptable(req)) {
      acceptWebSocket({
        conn,
        bufReader,
        bufWriter,
        headers,
      })
        .then(handleWs)
        .catch(async (err) => {
          console.error(`failed to accept websocket: ${err}`);
          await req.respond({ status: 400 });
        });
    } else {
      // API server
      // scrape for diffrent service
      requestParser(req);
    }
  }
}
