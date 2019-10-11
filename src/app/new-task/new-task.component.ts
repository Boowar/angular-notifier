import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { MatSnackBar } from "@angular/material/snack-bar"

import { TasksService } from "../shared/tasks.service"
import { Task } from "../shared/task.model"
import { MyValidators } from "../shared/my.validator"
import { Subscription } from "rxjs"

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.scss"],
})
export class NewTaskComponent implements OnInit, OnDestroy {
  @Output() outputEvent: EventEmitter<any> = new EventEmitter()

  form: FormGroup
  private create = false

  tSub: Subscription

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
        MyValidators.rightDate
      ),
    })
  }

  ngOnDestroy() {
    if (this.tSub) {
      this.tSub.unsubscribe()
    }
  }

  /**
   * createTask
   *
   * Открывает форму новой задачи.
   */
  createTask(): void {
    this.create = !this.create
  }

  /**
   * submitTask
   *
   * Отправляет новую задачу.
   */
  submitTask(): void {
    const {
      title,
      dateGroup: { date, time },
    } = this.form.value
    const task: Task = {
      note: title,
      date: new Date(date + " " + time),
    }

    this.tSub = this.tasksService.createTask(task).subscribe(
      () => {
        this.outputEvent.emit()
        this.form.reset()
        this.openSnackBar("Задание успешно создано")
      },
      err => console.error(task, err)
    )
    console.log("Form: ", this.form)
    console.log("Form get: ", this.form.get("time"))
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
