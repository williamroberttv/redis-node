import { createClient } from "redis";

export const client = createClient();
client.on("connect", function () {
  console.log("Connected to redis server!");
});
