import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { catchError, concatMap, Subject, takeUntil, tap } from 'rxjs';
import { CreateTodoItemDTO, TodoItem } from './todo-list.types';
import { TodoListService } from './todo-list.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { TASK_STATUS, TASK_STATUS_COLORS } from '../../common/constant/constant';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [NzIconModule, NzButtonModule, NzCardModule, NzModalModule, NgClass],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.scss',
})
export class TodoList implements OnInit, OnDestroy {
  todoList = signal<TodoItem[]>([]);

  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _todoService: TodoListService,
    private _messageService: NzMessageService,
    private _modalService: NzModalService
  ) {}

  // Lifecycle hooks
  ngOnInit(): void {
    this.handleGetAllTasks().subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // Data Fetching
  handleGetAllTasks() {
    return this._todoService.getAllTasks().pipe(
      takeUntil(this._unsubscribeAll),
      tap((tasks) => this.todoList.set(tasks))
    );
  }

  // Add a new task
  handleAddTask(): void {
    const modal = this._modalService.create({
      nzTitle: 'Add New Task',
      nzContent: AddEditTaskComponent,
      nzFooter: null,
    });

    modal.afterClose.subscribe((value) => {
      if (value) {
        this.addTask(value);
      }
    });
  }

  addTask(data: CreateTodoItemDTO): void {
    const newTask: TodoItem = {
      id: new Date().valueOf().toString(),
      name: data.name,
      description: data.description,
      status: data.status,
      createdAt: new Date().valueOf(),
    };

    this._todoService
      .createTask(newTask)
      .pipe(
        takeUntil(this._unsubscribeAll),
        tap(() => {
          this._messageService.success('Task added successfully');
        }),
        concatMap(() => this.handleGetAllTasks())
      )
      .subscribe();
  }

  // Edit task
  handleEditTask(id: string): void {
    const modal = this._modalService.create({
      nzTitle: 'Edit Task',
      nzContent: AddEditTaskComponent,
      nzFooter: null,
      nzData: { id },
    });

    modal.afterClose.subscribe((value) => {
      if (value) {
        this.editTask(id, value);
      }
    });
  }

  editTask(id: string, data: CreateTodoItemDTO): void {
    const updatedTask: Partial<TodoItem> = {
      name: data.name,
      description: data.description,
      status: data.status,
      updatedAt: new Date().valueOf(),
    };

    this._todoService
      .editTask(id, updatedTask)
      .pipe(
        takeUntil(this._unsubscribeAll),
        tap(() => {
          this._messageService.success('Task edited successfully');
        }),
        concatMap(() => this.handleGetAllTasks())
      )
      .subscribe();
  }

  // Handle delete task
  handleDeleteTask(id: string): void {
    this._modalService.warning({
      nzTitle: 'Are you sure you want to delete this task?',
      nzContent: 'This action cannot be undone.',
      nzOnOk: () => this.deleteTask(id),
    });
  }

  deleteTask(id: string): void {
    this._todoService
      .deleteTask(id)
      .pipe(
        takeUntil(this._unsubscribeAll),
        tap(() => {
          this._messageService.success('Task deleted successfully');
        }),
        concatMap(() => this.handleGetAllTasks())
      )
      .subscribe();
  }

  // Utility function
  statusColor(status: string): string {
    return TASK_STATUS_COLORS[status as TASK_STATUS] || 'bg-gray-500 text-white';
  }
}
