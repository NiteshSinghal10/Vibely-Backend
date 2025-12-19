import { ISendMessageData } from "./send-message";
import { ISentMessageData } from "./sent-message";

// Events the SERVER emits to CLIENT
export interface ServerToClientEvents {
  sentMessage: (data: ISentMessageData) => void;
}

// Events the CLIENT emits to SERVER
export interface ClientToServerEvents {
  sendMessage: (data: ISendMessageData) => void;
}