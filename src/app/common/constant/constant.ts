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

export const TASK_STATUS_COLORS: Record<TASK_STATUS, string> = {
  [TASK_STATUS.TODO]: 'bg-[#A9A9A9] text-white',
  [TASK_STATUS.PENDING]: 'bg-[#FFC300] text-black',
  [TASK_STATUS.IN_PROGRESS]: 'bg-[#3498DB] text-white',
  [TASK_STATUS.COMPLETED]: 'bg-[#2ECC71] text-white',
};
