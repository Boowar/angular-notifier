import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { AuthService } from "./../auth.service"
import { environment } from "./../../environments/environment"
import { Task } from "./task.model"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class TasksService {
  /* public userId: string */ /* `A7tboRIFoMhJnwUfgwMd` */
  /* public tasksUrl: string */

  constructor(private http: HttpClient, private auth: AuthService) {}

  /**
   * getTasks
   *
   * Получаем все задачи.
   */
  getTasks(): Observable<Task[]> {
    const tasksUrl = `${environment.mainUrl}/api/reminders?userId=${this.auth.userId}`
    console.log(tasksUrl)
    return this.http.get<Task[]>(tasksUrl).pipe(
      map(tasks => {
        console.log(tasks)
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
    const taskUrl: string = `${environment.mainUrl}/api/reminders/${task.id}?userId=${this.auth.userId}`
    return this.http.delete<Task>(taskUrl)
  }

  /**
   * createTask
   *
   * Создаем задачу.
   */
  createTask(task: Task): Observable<Task> {
    const taskUrl = `${environment.mainUrl}/api/reminders?userId=${this.auth.userId}`
    return this.http.post<Task>(taskUrl, task)
  }

  /**
   * updateTask
   *
   * Изменяем задачу.
   */
  updateTask(task: Task): Observable<Task> {
    const taskUrl: string = `${environment.mainUrl}/api/reminders/${task.id}?userId=${this.auth.userId}`
    return this.http.put<Task>(taskUrl, task)
  }
}
