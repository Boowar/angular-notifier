import { Component, OnInit } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { Task } from "../shared/task.model"
import { TasksService } from "../shared/tasks.service"
import { MatSnackBar } from "@angular/material/snack-bar"

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
})
export class TasksListComponent implements OnInit {
  private loading: boolean = true
  private form: FormGroup
  private tasks: Task[]

  constructor(
    private tasksService: TasksService,
    private snackBar: MatSnackBar
  ) {}

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
      /* сортировка tasks[] в порядке убывания даты*/
      this.tasks = tasks.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      this.tasks = this.sortedTasks(this.tasks)
      this.loading = false
      this.openSnackBar("Данные успешно загружены")
    })
  }

  sortedTasks(tasks): any {
    let myTasks: Array<Task[]> = []
    let todayTasks: Task[] = []
    let tommorowTasks: Task[] = []
    let otherTasks: Task[] = []

    const today = new Date(Date())

    const currentDate = currentDate => {
      const tommorowDate = new Date(currentDate)
      const currentYear = currentDate.getFullYear()
      const currentMonth = currentDate.getMonth() + 1
      const currentDay = currentDate.getDate()
      const tommorowDay = new Date(
        tommorowDate.setDate(currentDay + 1)
      ).getDate()

      return {
        currentYear: currentYear,
        currentMonth: currentMonth + 1,
        currentDay: currentDay,
        tommorowDay: tommorowDay,
      }
    }

    for (let task of tasks) {
      let taskDate = new Date(task.date)
      if (
        currentDate(taskDate).currentYear == currentDate(today).currentYear &&
        currentDate(taskDate).currentMonth == currentDate(today).currentMonth
      ) {
        if (currentDate(taskDate).currentDay == currentDate(today).currentDay) {
          todayTasks.push(task)
        } else if (
          currentDate(taskDate).currentDay == currentDate(today).tommorowDay
        ) {
          tommorowTasks.push(task)
        } else {
          otherTasks.push(task)
        }
      } else {
        otherTasks.push(task)
      }
    }

    myTasks.push(todayTasks)
    myTasks.push(tommorowTasks)
    myTasks.push(otherTasks)
    return myTasks
  }

  openSnackBar(message: string, action: string = "Ok") {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
