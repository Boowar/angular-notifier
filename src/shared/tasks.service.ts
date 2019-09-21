import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

export interface Task {
  id?: string
  note: string
  date: Date | string /* убрать string */
}

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private userId: string = `A7tboRIFoMhJnwUfgwMd`
  private myUrl: string = `https://europe-west1-st-testcase.cloudfunctions.net/api/reminders?userId=${this.userId}`
  private tasksUrl = "api/tasks"
  public tasks: Task[] = []

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

  removeTask(task: Task) {
    console.log(task.id)
    return this.http.delete<void>(
      `https://europe-west1-st-testcase.cloudfunctions.net/api/reminders/${task.id}?userId=A7tboRIFoMhJnwUfgwMd`
    )
  }

  createTask(task: Task): Observable<Task> {
    return this.http
      .post<any>(
        `https://europe-west1-st-testcase.cloudfunctions.net/api/reminders?userId=A7tboRIFoMhJnwUfgwMd`,
        task
      )
      .pipe(
        map(res => {
          return { ...task }
        })
      )
  }
}
