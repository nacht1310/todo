import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { catchError, Subject, takeUntil, tap } from 'rxjs';
import { CreateTodoItemDTO, TodoItem } from './todo-list.types';
import { TodoListService } from './todo-list.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';

@Component({
  selector: 'app-todo-list',
  imports: [NzIconModule, NzButtonModule, NzCardModule, NzModalModule],
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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
        tap((value) => {
          console.log(value);
          this._messageService.success('Task added successfully');
        })
      )
      .subscribe();
  }
}
