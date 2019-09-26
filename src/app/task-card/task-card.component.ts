import { TasksService } from "./../../shared/tasks.service"
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { Task } from "../../shared/task.model"
import { PushNotificationsService } from "./../../shared/push-notifications.service"
import { MatSnackBar } from "@angular/material/snack-bar"

@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task
  @Output() outputEvent: EventEmitter<Task> = new EventEmitter()
  form: FormGroup
  changeForm = false
  made = false

  done() {
    this.made = !this.made
    if (this.changeForm) {
      this.changeForm = !this.changeForm
    }
  }

  openUpdateTaskForm(changeForm: boolean): void {
    this.changeForm = !changeForm
  }

  removeTask(task: Task): void {
    this.tasksService.removeTask(task).subscribe(() => {
      this.outputEvent.emit(task)
      this.openSnackBar("Данные успешно удалены")
    })
  }

  updateTask(task: Task): void {
    const { title, date } = this.form.value
    const updateTask: Task = {
      note: title,
      date: date,
      id: task.id,
    }

    this.tasksService.updateTask(updateTask).subscribe(() => {
      this.outputEvent.emit(updateTask)
      this.openSnackBar("Данные успешно обновлены")
    })
  }

  makePushNotification(pushNotifications, task) {
    const eta_ms = new Date(task.date).getTime() - Date.now()
    if (eta_ms > 0) {
      const timeout = setTimeout(function() {
        pushNotifications.create("Test", { body: task.note }).subscribe(
          res => {
            console.log(res), this.done()
          },
          err => console.log(err)
        )
      }, eta_ms)
      timeout
    } else {
      this.done()
      console.log(`The task ${task.note} is completed`)
    }
  }

  openSnackBar(message: string, action: string = "Ok") {
    this._snackBar.open(message, action, {
      duration: 2000,
    })
  }

  constructor(
    private tasksService: TasksService,
    private pushNotifications: PushNotificationsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.makePushNotification(this.pushNotifications, this.task)

    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
    })
  }
}
