export interface IChatMessage {
  case: number;
  id: number;
  chatType: "USER" | "AI" | "STT";
  createdDate: string;
  text: string;
}

export interface ISendMessage {
  text: string;
  chatType: "USER" | "AI" | "STT";
}
