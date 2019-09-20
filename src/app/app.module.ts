import { MaterialModule } from "./material/material.module"
import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { CardComponent } from "./card/card.component"
import { TasksListComponent } from "./tasks-list/tasks-list.component"

@NgModule({
  declarations: [AppComponent, CardComponent, TasksListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
