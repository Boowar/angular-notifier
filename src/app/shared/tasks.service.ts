import { Task } from "./task.model"
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class TasksService {
  public tasks: Task[] = []

  private userId: string /* `A7tboRIFoMhJnwUfgwMd` */
  private mainUrl: string = `https://europe-west1-st-testcase.cloudfunctions.net`
  private tasksUrl: string

  constructor(private http: HttpClient) {}

  /**
   * controlUser
   *
   * Проверяем существует ли id пользователся в localstorage, если нет, то создаем.
   */
  controlUser() {
    if (
      !localStorage.getItem("userAngularNotifierId") ||
      localStorage.getItem("userAngularNotifierId") === "null"
    ) {
      this.getNewUser().subscribe(() => {
        this.userId = localStorage.getItem("userAngularNotifierId")
        this.tasksUrl = `${this.mainUrl}/api/reminders?userId=${this.userId}`
      })
    } else {
      this.userId = `${localStorage.getItem("userAngularNotifierId")}`
      this.tasksUrl = `${this.mainUrl}/api/reminders?userId=${this.userId}`
    }
  }

  /**
   * getNewUser
   *
   * Получаем нового пользователя.
   */
  getNewUser(): Observable<any> {
    const userUrl = `${this.mainUrl}/api/auth`
    return this.http.post<any>(userUrl, {}).pipe(
      map(userId => {
        localStorage.setItem("userAngularNotifierId", userId.id)
      })
    )
  }

  /**
   * getTasks
   *
   * Получаем все задачи.
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      map(tasks => {
        if (!tasks) {
          return []
        }
        return Object.keys(tasks).map(key => ({ ...tasks[key] }))
      })
    )
  }

  /**
   * removeTask
   *
   * Удаляем задачу.
   */
  removeTask(task: Task): Observable<Task> {
    const taskUrl: string = `${this.mainUrl}/api/reminders/${task.id}?userId=${this.userId}`
    return this.http.delete<Task>(taskUrl)
  }

  /**
   * createTask
   *
   * Создаем задачу.
   */
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task)
  }

  /**
   * updateTask
   *
   * Изменяем задачу.
   */
  updateTask(task: Task): Observable<Task> {
    const taskUrl: string = `${this.mainUrl}/api/reminders/${task.id}?userId=${this.userId}`
    return this.http.put<Task>(taskUrl, task)
  }
}
