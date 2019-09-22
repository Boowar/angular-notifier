import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { TasksService, Task } from "./../../shared/tasks.service"

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.scss"],
})
export class NewTaskComponent implements OnInit {
  @Output() outputEvent = new EventEmitter()

  form: FormGroup
  create = false

  createTask() {
    this.create = !this.create
  }

  submitTask() {
    const { title, date } = this.form.value
    const task: Task = {
      note: title,
      date: date,
    }

    this.tasksService.createTask(task).subscribe(
      task => {
        this.outputEvent.emit(task)
        this.form.reset()
      },
      err => console.error(task, err)
    )
  }

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
    })
  }
}
