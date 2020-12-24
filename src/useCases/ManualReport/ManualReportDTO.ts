import { Message } from "node-telegram-bot-api";

export interface IManualReportDTO {
  occurenceType: string
  message: Message,
  reply: Message
}