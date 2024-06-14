import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { data, error } from 'jquery';
import {usermodel} from 'src/app/models/usermodel';
import { JsonserviceService } from 'src/app/sharedservice/jsonservice.service';


@Component({
  selector: 'app-createtour',
  templateUrl: './createtour.component.html',
  styleUrls: ['./createtour.component.css']
})
export class CreatetourComponent {

  showchild=false
  copyform:any
  newtripcode:number = 1 
  createform = true
  nform:any
  user:any
  loggedIn:any
  lowmembercount=false
  userform:usermodel = {
    username: "",
    useremail:"",
    tripcode: "",
    tripname:"",
    members:0,
    days:0
  }
 

  constructor(private authService: SocialAuthService,private service:JsonserviceService,private router:Router) {

   }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  //   }

  // signOut(): void {
    
  //   this.authService.signOut();
  //   this.createform = true
  // }

ngOnInit()
{

  this.service.getallusers().subscribe(res=>{

    console.log(res)
  })

  this.createform = true

  // this.authService.authState.subscribe((user) => {
  //   this.user = user;
  //   this.loggedIn = (user != null);
  //   if(this.loggedIn)
  //     {
  //       this.createform=false
  //     }
  //   console.log( this.loggedIn)
  //   console.log(this.user)
  // });
}
  newTourForm = new FormGroup({
    Not: new FormControl('',{nonNullable: true}),
    Nom: new FormControl(0,{nonNullable: true}),
    Nod: new FormControl(0,{nonNullable: true}),
    
  });

  create()
  {

    if(this.newTourForm.controls['Nom'].value<2 || this.newTourForm.controls['Nod'].value<1 || this.newTourForm.controls['Not'].value=="" )
      {
        this.lowmembercount=true
      }
      else
      {

        // this.userform.useremail=this.user.email
// this.userform.username=this.user.name
this.userform.tripname = this.newTourForm.controls['Not'].value
this.userform.members =this.newTourForm.controls['Nom'].value
this.userform.tripcode = this.gettripcode(this.userform.tripname)
this.userform.days = this.newTourForm.controls['Nod'].value
// console.log(typeof(this.userform))
this.showchild=true


 console.log(this.userform)
 //document.cookie = "tripcal= cookieworks! ; expires=Sun, 11 May 2024 21:20:00 UTC";expires= Mon, 13 May 2024 23:14:04 GMT

      }



  }

  gettripcode(tripname:string)
  {
    var minm = 10000; 
    var maxm = 99999; 
   this.newtripcode = Math.floor(Math 
    .random() * (maxm - minm + 1)) + minm; 

    const tripcode2 = tripname.slice(0,3) + this.newtripcode

    return tripcode2
  }

}
