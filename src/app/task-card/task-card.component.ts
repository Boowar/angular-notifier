import { TasksService } from "./../../shared/tasks.service"
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { Task } from "../../shared/task.model"
import { PushNotificationsService } from "./../../shared/push-notifications.service"

@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task
  @Output() outputEvent1: EventEmitter<Task> = new EventEmitter()
  form: FormGroup
  change = false
  made = false

  strike() {
    this.made = !this.made
    if (this.change) {
      this.change = !this.change
    }
  }

  openUpdateTaskForm(change: boolean): void {
    this.change = !change
  }

  removeTask(task: Task): void {
    this.tasksService.removeTask(task).subscribe(() => {
      this.outputEvent1.emit(task)
    })
  }

  updateTask(task: Task): void {
    const { title, date } = this.form.value
    const updateTask: Task = {
      note: title,
      date: date,
      id: task.id,
    }

    console.log("task-card__update1", task, updateTask)
    this.tasksService.updateTask(updateTask).subscribe(() => {
      console.log("task-card__update2", task, updateTask)
      this.outputEvent1.emit(updateTask)
    })
  }

  makePushNotification(pushNotifications, task) {
    const eta_ms = new Date(task.date).getTime() - Date.now()
    if (eta_ms > 0) {
      const timeout = setTimeout(function() {
        pushNotifications
          .create("Test", { body: "something" })
          .subscribe(res => console.log(res), err => console.log(err))
      }, eta_ms)
      timeout
    } else {
      console.log(`The task ${task.note} is completed`)
    }
  }
  constructor(
    private tasksService: TasksService,
    private pushNotifications: PushNotificationsService
  ) {}

  ngOnInit() {
    this.makePushNotification(this.pushNotifications, this.task)

    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
    })
  }
}
