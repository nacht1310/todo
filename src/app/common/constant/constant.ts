export const ROUTE = {
  PROFILE: 'profile',
  TODO_LIST: 'todo-list',
};

export const API = {
  BASE_URL: 'http://localhost:3000',
  TODO_LIST: {
    LIST: '/tasks',
    DETAIL: (id: string) => `/tasks/${id}`,
    CREATE: '/tasks',
    EDIT: (id: string) => `/tasks/${id}`,
    DELETE: (id: string) => `/tasks/${id}`,
  },
};

export enum TASK_STATUS {
  TODO = 'To Do',
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}
