import { TASK_STATUS } from '../../common/constant/constant';

export interface TodoItem {
  id: string;
  name: string;
  description?: string;
  status: TASK_STATUS;
  createdAt: number;
  updatedAt?: number;
}
export interface CreateTodoItemDTO {
  name: string;
  description?: string;
  status: TASK_STATUS;
}
