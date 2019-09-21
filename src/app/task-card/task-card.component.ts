import { TasksService, Task } from "./../../shared/tasks.service"
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core"

@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task
  @Output() taskId: EventEmitter<string> = new EventEmitter()

  removeTask(task: Task): void {
    this.tasksService.removeTask(task).subscribe()
    this.taskId.emit(task.id)
    console.log(task.id)
  }

  constructor(private tasksService: TasksService) {}

  ngOnInit() {}
}
