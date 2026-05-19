export interface Ticket2Dto {
  id: string;          // Guid en backend → string en TS
  number: number;
  createdAt: Date;
  assignedBox: string;
  status: string;
  nombre: string;
}
