import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CreatetourComponent } from './Components/createtour/createtour.component';
import { LoginComponent } from './login/login.component';
import { AddmembersComponent } from './Components/addmembers/addmembers.component';

const routes: Routes = [

  {path:"home", component:HomeComponent,data: { state: 'home' }},
  {path:"",redirectTo:"/home",pathMatch:'full'},
  {path:"login",component:LoginComponent},
  {path:"createanewtour",component:CreatetourComponent,},
  {path:"addtourmembers",component:AddmembersComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
