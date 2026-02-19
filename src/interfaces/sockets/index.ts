import { IMessage } from "../message";
import { IDeleteMessage } from "./delete-message";
import { ISendMessageData } from "./send-message";
import { ISentMessageData } from "./sent-message";

// Events the SERVER emits to CLIENT
export interface ServerToClientEvents {
  sentMessage: (data: ISentMessageData) => void;
  messageDeleted: (data: IMessage) => void;
  messageEdited: (data: IMessage) => void;
  randomConnected: () => void;
}

// Events the CLIENT emits to SERVER
export interface ClientToServerEvents {
  sendMessage: (data: ISendMessageData) => void;
  deleteMessage: (data: IDeleteMessage) => void;
  editMessage: (data: IMessage) => void;
  messageRead: (data: { _friend: string }) => void;
  randomConnect: () => void;
  cancelRandomConnect: () => void;
}