import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core"
import { ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { MatSnackBar } from "@angular/material/snack-bar"

import { TasksService } from "../shared/tasks.service"
import { Task } from "../shared/task.model"
import { PushNotificationsService } from "../shared/push-notifications.service"
import { MyValidators } from "../shared/my.validator"

@Component({
  selector: "app-task-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task
  @Output() outputEvent: EventEmitter<Task> = new EventEmitter()
  private form: FormGroup
  private changeForm = false
  private made = false

  constructor(
    private tasksService: TasksService,
    private pushNotifications: PushNotificationsService,
    private snackBar: MatSnackBar,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.makePushNotification(this.task)

    this.form = new FormGroup({
      title: new FormControl(""),
      dateGroup: new FormGroup(
        {
          date: new FormControl("", Validators.required),
          time: new FormControl("", Validators.required),
        },
        MyValidators.rightDate
      ),
    })
  }

  /**
   * isDone
   *
   * Выполняет визуальное изменение компонента при выполнении задачи.
   */
  isDone(): void {
    this.made = !this.made
    if (this.changeForm) {
      this.openUpdateTaskForm(this.changeForm)
    }
  }

  /**
   * openUpdateTaskFrom
   *
   * Открывает форму изменения задачи.
   */
  openUpdateTaskForm(changeForm: boolean): void {
    this.changeForm = !changeForm
  }

  /**
   * removeTask
   *
   * Удаляет задачу.
   */
  removeTask(task: Task): void {
    this.tasksService.removeTask(task).subscribe(() => {
      this.outputEvent.emit(task)
      this.openSnackBar("Данные успешно удалены")
    })
  }

  /**
   * updateTask
   *
   * Изменяет задачу.
   */
  updateTask(task: Task): void {
    const {
      title,
      dateGroup: { date, time },
    } = this.form.value
    const updateTask: Task = {
      note: title,
      date: new Date(date + " " + time),
      id: task.id,
    }

    this.tasksService.updateTask(updateTask).subscribe(() => {
      this.outputEvent.emit(updateTask)
      this.openSnackBar("Данные успешно обновлены")
    })
  }

  /**
   * makePushNotification
   *
   * Создает push уведомление при выполнении задачи.
   */
  makePushNotification(
    task: Task,
    pushNotifications: PushNotificationsService = this.pushNotifications
  ): void {
    const eta_ms = new Date(task.date).getTime() - Date.now()
    if (eta_ms > 0) {
      const timeout = setTimeout(() => {
        pushNotifications
          .create("Задача выполнена", { body: task.note })
          .subscribe(
            () => {
              this.isDone()
              this.ref.detectChanges()
            },
            err => console.log(err)
          )
      }, eta_ms)

      timeout
    } else {
      this.isDone()
      console.log(`The task ${task.note} is completed`)
    }
  }

  /**
   * openSnackBar
   *
   * Создает уведомление.
   */
  openSnackBar(message: string, action: string = "Ok"): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
