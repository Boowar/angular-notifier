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
  @Output() outputEvent1: EventEmitter<Task> = new EventEmitter()
  form: FormGroup
  change = false
  made = false

  strike() {
    this.made = !this.made
  }

  removeTask(task: Task): void {
    this.tasksService.removeTask(task).subscribe()
    this.outputEvent1.emit(task)
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
