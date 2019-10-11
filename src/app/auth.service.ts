import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { environment } from "../environments/environment"
import { Observable, of } from "rxjs"
import { tap } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public userId: string

  constructor(private http: HttpClient) {}

  /**
   * controlUser
   *
   * Проверяем существует ли id пользователся в localstorage, если нет, то создаем.
   */
  controlUser() {
    if (!localStorage.getItem("userAngularNotifierId")) {
      return this.getNewUser().pipe(
        tap(() => {
          this.userId = localStorage.getItem("userAngularNotifierId")
        })
      )
    } else {
      this.userId = `${localStorage.getItem("userAngularNotifierId")}`
      return of(null)
    }
  }

  /**
   * getNewUser
   *
   * Получаем нового пользователя.
   */
  getNewUser(): Observable<any> {
    const userUrl = `${environment.mainUrl}/api/auth`
    return this.http.post<any>(userUrl, {}).pipe(
      tap(userId => {
        localStorage.setItem("userAngularNotifierId", userId.id)
      })
    )
  }
}
