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
  private tasksUrl = "api/tasks"
  public tasks: Task[] = []

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }

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

  removeTask(task: Task | number): Observable<Task> {
    const id = typeof task === "number" ? task : task.id
    const url = `${this.tasksUrl}/${id}`

    return this.http.delete<Task>(url, this.httpOptions).pipe()
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions)
  }
}
