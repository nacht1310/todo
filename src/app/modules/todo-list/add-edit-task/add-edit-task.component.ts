import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TASK_STATUS } from '../../../common/constant/constant';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { TodoListService } from '../todo-list.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-add-edit-task',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss',
})
export class AddEditTaskComponent implements OnInit, OnDestroy {
  modalData: { id: string } = inject(NZ_MODAL_DATA);
  modalRef = inject(NzModalRef);

  form!: UntypedFormGroup;
  taskStatusOptions = Object.values(TASK_STATUS);
  private _unsubscribeAll = new Subject<void>();

  constructor(private _formBuilder: UntypedFormBuilder, private _todoService: TodoListService) {
    this._initializeForm();
  }

  // Lifecycle hooks
  ngOnInit(): void {
    if (this.modalData?.id) {
      this._todoService
        .getTaskDetail(this.modalData.id)
        .pipe(
          takeUntil(this._unsubscribeAll),
          tap((task) => {
            this.form.patchValue({
              name: task.name,
              description: task.description,
              status: task.status,
            });
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // Modal actions
  handleCancel(): void {
    this.modalRef.triggerCancel();
  }

  handleSubmit(): void {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity();
    });

    if (this.form.invalid) {
      return;
    }

    this.modalRef.close(this.form.value);
  }

  private _initializeForm(): void {
    this.form = this._formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      status: [TASK_STATUS.TODO],
    });
  }
}
