import { Message } from "node-telegram-bot-api";

export interface IManualReportDTO {
  occurenceType: string
  username: string,
  message: Message,
}