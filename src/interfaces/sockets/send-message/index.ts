export interface ISendMessageData {
  chatId: string,
  _receiver: string,
  content: string,
  _replyMessage?: string;
}