export interface IChatMessage {
  user: "user" | "AI";
  time: string;
  content: string;
}
