import { DenonConfig } from "https://deno.land/x/denon/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "./src/ws-server.ts",
      desc: "Run my webserver",
      allow: ["env", "write", "read", "net", "plugin"],
      unstable: true,
    },
  },
};

export default config;
