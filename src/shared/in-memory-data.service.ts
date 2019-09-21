import { InMemoryDbService } from "angular-in-memory-web-api"
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      {
        id: 1,
        note: "hello",
        date: "2019-01-01T10:15:00.000Z",
      },
      {
        id: 2,
        note: "hello",
        date: "2019-01-01T10:15:00.000Z",
      },
      {
        id: 3,
        note: "hello",
        date: "2019-01-01T10:15:00.000Z",
      },
      {
        id: 4,
        note: "hello",
        date: "2019-01-01T10:15:00.000Z",
      },
    ]
    return { tasks }
  }
  constructor() {}
}
