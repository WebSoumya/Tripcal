import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JsonserviceService } from '../sharedservice/jsonservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {


  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  wrongemail=false
  otpsent=false
  generatedotp=0
  invalid=false
  LoginForm = new FormGroup({
    Email: new FormControl('',{nonNullable: true}),
    OTP: new FormControl(0,{nonNullable: true}),
  });
  constructor(private service:JsonserviceService,private router:Router) {

  }

  ngOnInit()
  {

    //document.cookie="tripcal=cookietest"
    if(document.cookie.split("Tripcalsessionid")[1]){
    this.router.navigate(["/home"])
    }

  }


  sendotp()
  {

    if(!this.emailPattern.test(this.LoginForm.controls['Email'].value) )
      {
    this.wrongemail = true
   // this.LoginForm.reset()
      }

      else{
    
console.log(this.LoginForm.value)
this.service.authentication(this.LoginForm.controls['Email'].value).subscribe(res=>{
  console.log(res)
  this.generatedotp=res
})
this.otpsent=true
this.wrongemail = false
      }
  }
  
  checkotp()
  {
if(this.generatedotp===this.LoginForm.controls['OTP'].value)
  {
    const cookie = this.generatecookie()
    const date = this.getexpiry()
    document.cookie=`Tripcalsessionid=${cookie} ; ${date}`
    document.cookie=`useremail=${this.LoginForm.controls['Email'].value} ; ${date}`
   //document.cookie = "tripcal= cookieworks! ; expires=Sun, 11 May 2024 21:20:00 UTC"
     this.router.navigate(["/home"])
  }
  else
  {
    this.invalid=true
  }
  }
  editemail()
  {
    this.otpsent=false
  }
  generatecookie()
  {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 20; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  getexpiry()
  {
    var now = new Date();
    var time = now.getTime();
    now.setTime(time)
     var expireTime = time + 2000*360000;
     now.setTime(expireTime);
    let expiry = 'expires='+now;
    return expiry
    //console.log(cookie);  // 'Wed, 31 Oct 2012 08:50:17 UTC'
  }
}
