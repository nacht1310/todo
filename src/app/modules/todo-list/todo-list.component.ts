import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Subject } from 'rxjs';
import { TodoItem } from './todo-list.types';

@Component({
  selector: 'app-todo-list',
  imports: [NzIconModule, NzButtonModule, NzCardModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.scss',
})
export class TodoList implements OnInit, OnDestroy {
  todoList = signal<TodoItem[]>([]);

  private _unsubscribeAll = new Subject<void>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
