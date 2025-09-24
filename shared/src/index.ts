// shared DTOs/types between frontend & backend
export interface MessageDTO {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
}

export interface RoomDTO {
  id: number;
  name: string;
}
