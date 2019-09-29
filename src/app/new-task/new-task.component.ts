import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { MatSnackBar } from "@angular/material/snack-bar"

import { TasksService } from "../shared/tasks.service"
import { Task } from "../shared/task.model"

export function rightDate({ value }: FormGroup) {
  const [first, second] = [value.date, value.time]
  const nowDate = new Date(first + " " + second).getTime() - Date.now()
  return nowDate > 0 ? null : { wrongDate: true }
}

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.scss"],
})
export class NewTaskComponent implements OnInit {
  @Output() outputEvent: EventEmitter<any> = new EventEmitter()

  private form: FormGroup
  private create = false

  constructor(
    private tasksService: TasksService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
      dateGroup: new FormGroup(
        {
          date: new FormControl("", Validators.required),
          time: new FormControl("", Validators.required),
        },
        rightDate
      ),
    })
  }

  createTask(): void {
    this.create = !this.create
  }

  submitTask(): void {
    const { title, date, time } = this.form.value
    const task: Task = {
      note: title,
      date: new Date(date + " " + time),
    }

    this.tasksService.createTask(task).subscribe(
      () => {
        this.outputEvent.emit()
        this.form.reset()
        this.openSnackBar("Задание успешно создано")
      },
      err => console.error(task, err)
    )
  }

  openSnackBar(message: string, action: string = "Ok"): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
