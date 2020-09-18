import type { DenonConfig } from "https://deno.land/x/denon@2.4.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "./src/ws-server.ts",
      desc: "WS server",
      allow: ["env", "write", "read", "net", "plugin"],
      unstable: true,
    },
  },
};

export default config;
