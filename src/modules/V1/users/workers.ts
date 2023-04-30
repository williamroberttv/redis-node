import { MessageDto } from "./message.dto";
import { UserService } from "./users.service";

const service = new UserService();

export function consumeUserMessages(payload: MessageDto): void {
  service.createUserMessage(payload);
}
