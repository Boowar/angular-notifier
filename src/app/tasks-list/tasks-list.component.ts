import { Component, OnInit, OnDestroy } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar"

import { AuthService } from "./../auth.service"
import { Task } from "../shared/task.model"
import { TasksService } from "../shared/tasks.service"
import { Subscription } from "rxjs"

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
})
export class TasksListComponent implements OnInit, OnDestroy {
  private loading: boolean = true
  private tasks: Task[][]

  cSub: Subscription
  aSub: Subscription
  tSub: Subscription
  uSub: Subscription

  constructor(
    private tasksService: TasksService,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

  ngOnInit() {
    /* this.auth.controlUser() */
    this.cSub = this.auth.controlUser().subscribe()
    console.log("It's done 1")
    setTimeout(() => {
      console.log("It's done 2")
      this.getAllTasks()
      console.log("It's done 3")
    }, 1000)

    /* this.tasksService.controlUser()
    setTimeout(() => this.getAllTasks(), 1000) */
  }

  ngOnDestroy() {
    if (this.cSub) {
      this.cSub.unsubscribe()
    }
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
    if (this.tSub) {
      this.tSub.unsubscribe()
    }
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  /**
   * getAllTasks
   *
   * Получает все задачи.
   */
  getAllTasks(): void {
    this.loading = true
    this.aSub = this.tasksService.getTasks().subscribe(receivedTasks => {
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
    this.tSub = this.tasksService.getTasks().subscribe(receivedTasks => {
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
    this.uSub = this.tasksService.getTasks().subscribe(receivedTasks => {
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
     * Возвращает объект с текущим годом, месяцем, днем и завтрашним днем.
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
