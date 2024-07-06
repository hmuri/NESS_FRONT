export interface IChatMessage {
  case: number;
  id: number;
  chatType: "USER" | "AI" | "STT";
  createdDate: string;
  text: string;
  metadata: string | null;
}

export interface ISendMessage {
  text: string;
  chatType: "USER" | "AI" | "STT";
}
