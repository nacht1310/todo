import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../../common/constant/constant';
import { TodoItem } from './todo-list.types';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private _httpClient = inject(HttpClient);

  /** Get all tasks */
  getAllTasks() {
    return this._httpClient.get<TodoItem[]>(API.TODO_LIST.LIST);
  }

  /**
   * Get task detail
   * @param id - Id of the task you want to get detail
   * @returns - Task detail
   */
  getTaskDetail(id: string) {
    return this._httpClient.get<TodoItem>(API.TODO_LIST.DETAIL(id));
  }

  /**
   * Create a new task
   * @param data - Task data
   * @returns - Added Task
   */
  createTask(data: TodoItem) {
    return this._httpClient.post<TodoItem>(API.TODO_LIST.CREATE, data);
  }

  /**
   * Edit a task
   * @param id - Id of the task you want to edit
   * @param data - The new data of the task
   * @returns - Updated Task
   */
  editTask(id: string, data: Partial<TodoItem>) {
    return this._httpClient.put<TodoItem>(API.TODO_LIST.EDIT(id), data);
  }

  /**
   * Delete a task
   * @param id - Id of the task you want to delete
   * @returns - Deleted Task
   */
  deleteTask(id: string) {
    return this._httpClient.delete<TodoItem>(API.TODO_LIST.DELETE(id));
  }
}
