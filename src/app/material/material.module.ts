import { NgModule } from "@angular/core"

import { MatButtonModule } from "@angular/material"
import { MatListModule } from "@angular/material/list"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatToolbarModule } from "@angular/material/toolbar"

const MaterialComponents = [
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
