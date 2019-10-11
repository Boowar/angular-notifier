import { FormGroup } from "@angular/forms"

export class MyValidators {
  static rightDate({ value }: FormGroup): { [key: string]: boolean } {
    const [first, second] = [value.date, value.time]
    const nowDate = new Date(first + " " + second).getTime() - Date.now()
    return nowDate > 0 ? null : { wrongDate: true }
  }
}
