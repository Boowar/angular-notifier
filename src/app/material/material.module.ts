import { NgModule } from "@angular/core"

import { MatButtonModule, MatProgressSpinnerModule } from "@angular/material"
import { MatListModule } from "@angular/material/list"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatSnackBarModule } from "@angular/material/snack-bar"

const MaterialComponents = [
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
