import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CreatetourComponent } from './Components/createtour/createtour.component';

const routes: Routes = [

  {path:"home", component:HomeComponent},
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"createanewtour",component:CreatetourComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
