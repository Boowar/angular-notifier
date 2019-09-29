import { Component, OnInit } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar"

import { Task } from "../shared/task.model"
import { TasksService } from "../shared/tasks.service"

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
})
export class TasksListComponent implements OnInit {
  private loading: boolean = true
  private tasks: Task[][]

  constructor(
    private tasksService: TasksService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.tasksService.controlUser()
    setTimeout(() => this.getAllTasks(), 1000)
  }

  /**
   * getAllTasks
   *
   * Получает все задачи.
   */
  getAllTasks(): void {
    this.loading = true
    this.tasksService.getTasks().subscribe(receivedTasks => {
      this.tasks = this.sortedTasks(receivedTasks)
      this.loading = false
      this.openSnackBar("Данные успешно загружены")
    })
  }

  /**
   * getCompletedTasks
   *
   * Получает все выполненные задачи.
   */
  getCompletedTasks(): void {
    this.loading = true
    let completedTasks: Task[][] = []
    this.tasksService.getTasks().subscribe(receivedTasks => {
      const arrayTasks = this.sortedTasks(receivedTasks)
      for (let tasks of arrayTasks) {
        completedTasks.push(
          tasks.filter(task => new Date(task.date).getTime() - Date.now() <= 0)
        )
      }
      this.tasks = completedTasks
      this.loading = false
      this.openSnackBar("Данные успешно загружены")
    })
  }

  /**
   * getCompletedTasks
   *
   * Получает все невыполненные задачи.
   */
  getUncompletedTasks() {
    this.loading = true
    let completedTasks: Task[][] = []
    this.tasksService.getTasks().subscribe(receivedTasks => {
      const arrayTasks = this.sortedTasks(receivedTasks)
      for (let tasks of arrayTasks) {
        completedTasks.push(
          tasks.filter(task => new Date(task.date).getTime() - Date.now() > 0)
        )
      }
      this.tasks = completedTasks
      this.loading = false
      this.openSnackBar("Данные успешно загружены")
    })
  }

  /**
   * sortedTasks
   *
   * Сортирует задачи на сегодняшние, завтрашнии и остальные.
   */
  sortedTasks(tasks: Task[]): Array<Array<Task>> {
    let myTasks: Task[][] = []
    let todayTasks: Task[] = []
    let tommorowTasks: Task[] = []
    let otherTasks: Task[] = []

    const today = new Date(Date())

    /**
     * currentDate
     *
     * Возвращает объект с текущим годом, месяце, днем и завтрашним днем.
     *
     */
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

    myTasks.push(todayTasks, tommorowTasks, otherTasks)

    return myTasks
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
