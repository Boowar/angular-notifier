import { TasksService, Task } from "./../../shared/tasks.service"
import { Component, OnInit } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
})
export class TasksListComponent implements OnInit {
  private loading: boolean = true
  form: FormGroup
  tasks: Task[]

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks
        this.loading = false
      },
      err => console.error(err)
    )

    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
    })
  }

  removeTask(task: Task) {
    this.tasksService.removeTask(task).subscribe(
      () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id)
      },
      err => console.error(err)
    )
  }

  submitTask() {
    const { title, date } = this.form.value
    console.log("form.value", this.form.value)
    const task: Task = {
      note: title,
      date: date,
    }

    this.tasksService.createTask(task).subscribe(
      task => {
        console.log(task)
        this.tasks.push(task)
        this.form.reset()
      },
      err => console.error(task, err)
    )
  }
}
