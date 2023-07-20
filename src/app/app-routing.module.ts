import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';

const routes: Routes = [
  {
    path:"" , component:EmployeedashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
