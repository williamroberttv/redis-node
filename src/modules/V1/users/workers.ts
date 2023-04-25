import { consume } from "../../../database/rabbitmq/config";

export const userMessageQueueConsume = () =>
  consume("user_message", (message) => {
    console.log(message.content);
    console.log("processing " + message.content.toString());
  });
