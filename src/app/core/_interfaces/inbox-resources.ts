export interface IInbox {
  type: string;
  equipmentIdentifier: string;
  equipmentDetails: string;
  receivedOn: number;
  dueDate: number;
  priority: boolean;
  action: string;
  id: number;
}
