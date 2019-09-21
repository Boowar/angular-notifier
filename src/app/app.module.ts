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
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api"
import { InMemoryDataService } from "../shared/in-memory-data.service";
import { TaskCardComponent } from './task-card/task-card.component'

@NgModule({
  declarations: [AppComponent, CardComponent, TasksListComponent, TaskCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
