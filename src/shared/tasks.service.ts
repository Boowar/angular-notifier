import { Task } from "./task.model"
import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class TasksService {
  public tasks: Task[] = []

  private userId: string = `A7tboRIFoMhJnwUfgwMd`
  private mainUrl: string = `https://europe-west1-st-testcase.cloudfunctions.net`
  private tasksUrl: string = `${this.mainUrl}/api/reminders?userId=${this.userId}`

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      map(tasks => {
        if (!tasks) {
          return []
        }
        console.log(tasks, "||||", Object.keys(tasks))
        return Object.keys(tasks).map(key => ({ ...tasks[key] }))
      })
    )
  }

  removeTask(task: Task): Observable<Task> {
    const taskUrl: string = `${this.mainUrl}/api/reminders/${task.id}?userId=${this.userId}`
    return this.http.delete<Task>(taskUrl)
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task)
  }

  updateTask(task: Task): Observable<Task> {
    const taskUrl: string = `${this.mainUrl}/api/reminders/${task.id}?userId=${this.userId}`
    return this.http.put<Task>(taskUrl, task)
  }
}
