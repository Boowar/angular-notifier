import { TasksService, Task } from "./../../shared/tasks.service"
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"

@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task
  @Output() taskId: EventEmitter<string> = new EventEmitter()
  form: FormGroup
  change = false

  removeTask(task: Task): void {
    this.tasksService.removeTask(task).subscribe()
    this.taskId.emit(task.id)
    console.log(task.id)
  }

  changeTask(change: boolean): void {
    this.change = !change
  }

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
    })
  }
}
