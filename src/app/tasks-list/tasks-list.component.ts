import { TasksService } from "./../../shared/tasks.service"
import { Component, OnInit } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { Task } from "../../shared/task.model"

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
    this.getTasks()

    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
    })
  }

  getTasks(): void {
    this.tasksService.getTasks().subscribe(tasks => {
      console.log("getTasks", tasks)
      this.tasks = tasks
      this.loading = false
    })
  }
}
