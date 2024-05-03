export interface IChatMessage {
  case: number;
  id: number;
  chatType: "USER" | "AI";
  createdDate: string;
  text: string;
}

export interface ISendMessage {
  text: string;
  chatType: "USER" | "AI";
}
