import { Component, Input } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { usermodel } from 'src/app/models/usermodel';

@Component({
  selector: 'app-addmembers',
  templateUrl: './addmembers.component.html',
  styleUrls: ['./addmembers.component.css']
})
export class AddmembersComponent {
  constructor(private router:Router) {
  }
   emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   wrongemail=false
   wrongname=false
currentmember=1
created=false
showfinal=false
@Input() formtochild:usermodel = {
  username: "",
  useremail:"",
  tripcodes: "",
  tripname:"",
  members:0,
  days:0
}

 fb = new FormBuilder()

  newMemberForm = new FormGroup ({
    uname: new FormControl('',{nonNullable: true}),
    uemail: new FormControl('',{nonNullable: true}),
  });

  create()
  {
    if(this.emailPattern.test(this.newMemberForm.controls['uemail'].value) && this.newMemberForm.controls['uname'].value=="" ) {

      this.wrongemail=false
      this.wrongname=false
    if(this.currentmember <= this.formtochild.members)
      {
      this.formtochild.useremail = this.newMemberForm.controls['uemail'].value
      this.formtochild.username = this.newMemberForm.controls['uname'].value
      alert("Member Added Succesfully")
       console.log(this.formtochild)
       this.newMemberForm.reset()
       if(this.currentmember+1>this.formtochild.members)
        {
            this.created=true
            this.showfinal=true
        }
        else{
       this.currentmember=this.currentmember+1
        }
      }
    }
    else{
      if(!this.emailPattern.test(this.newMemberForm.controls['uemail'].value) )
        {
      this.wrongemail = true
      this.newMemberForm.reset()
        }
       
      }
    
  }

  final()
  {
      this.router.navigate(['/home'])
  }
}
