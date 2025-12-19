export interface IMessage {
  _id: string;
  chatId: string;
  _sender: string;
  _receiver: string;
  content: string;
  createdAt: Date | string;
}