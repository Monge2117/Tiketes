export interface TicketDto {
  id: string;          // Guid → string
  number: number;
  createdAt: string;   // DateTime → string (ISO 8601)
  assignedBox: string;
  status: string;
  nombre: string;
}
