import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { usermodel } from 'src/app/models/usermodel';
import { tripmodel } from 'src/app/models/tripmodel';
import { JsonserviceService } from 'src/app/sharedservice/jsonservice.service';

@Component({
  selector: 'app-addmembers',
  templateUrl: './addmembers.component.html',
  styleUrls: ['./addmembers.component.css']
})
export class AddmembersComponent implements OnInit {
  constructor(private router: Router, private service: JsonserviceService) {

  }

  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  wrongemail = false
  memberadded = false
  wrongname = false
  otpsent = false
  invalid = false
  generatedotp = 0
  currentmember = 1
  otpcorrect = false
  created = false
  showfinal = false
  @Input() formtochild: usermodel = {
    username: "",
    useremail: "",
    tripcode: "",
    tripname: "",
    members: 0,
    days: 0
  }

  tripdetails: tripmodel = {
    tripcode: "",
    tripname: "",
    useremail: "",
    memberlist: [],
    membercal: [],
    membername: []
  }


  fb = new FormBuilder()

  newMemberForm = new FormGroup({
    uname: new FormControl('', { nonNullable: true }),
    uemail: new FormControl('', { nonNullable: true }),
    OTP: new FormControl(0, { nonNullable: true })
  });

  ngOnInit() {
    this.tripdetails.tripcode = this.formtochild.tripcode
    this.tripdetails.tripname = this.formtochild.tripname
  }

  create() {
    // console.log(this.newMemberForm.controls['uname'].value)
    // console.log(this.newMemberForm.controls['uemail'].value)
    // console.log(this.emailPattern.test(this.newMemberForm.controls['uemail'].value))

    if (this.emailPattern.test(this.newMemberForm.controls['uemail'].value) && this.newMemberForm.controls['uname'].value != "") {

      this.wrongemail = false
      this.wrongname = false
      // console.log("right")
      if (this.currentmember <= this.formtochild.members) {
        // this.formtochild.useremail = this.newMemberForm.controls['uemail'].value
        // this.formtochild.username = this.newMemberForm.controls['uname'].value
        this.wrongemail = false
        this.wrongname = false
        this.otpsent = false
        this.invalid = false
        this.otpcorrect = false
        this.created = false

        //Pushing value to respective arrays
        this.tripdetails.memberlist.push(this.newMemberForm.controls['uemail'].value)
        this.tripdetails.membercal.push(0)
        this.tripdetails.membername.push(this.newMemberForm.controls['uname'].value)

        alert("Member Added Succesfully")
        //console.log(this.formtochild)
        this.newMemberForm.reset()
        if (this.currentmember + 1 > this.formtochild.members) {
          this.created = true
          this.showfinal = true
        }
        else {
          this.currentmember = this.currentmember + 1
        }

      }
    }
    else {
      if (!this.emailPattern.test(this.newMemberForm.controls['uemail'].value)) {
        this.wrongemail = true
        this.newMemberForm.reset()
        console.log(this.newMemberForm.controls['uname'].value)
      }

    }

  }
  sendotp() {
    for (let i = 0; i < this.tripdetails.memberlist.length; i++) {
      if (this.newMemberForm.controls['uemail'].value == this.tripdetails.memberlist[i]) {

        this.memberadded = true
        break;
      }
    }
    if (!this.memberadded) {
      if (!this.emailPattern.test(this.newMemberForm.controls['uemail'].value)) {
        this.wrongemail = true
        // this.newMemberForm.reset()
      }

      else {

        console.log(this.newMemberForm.value)
        this.service.authentication(this.newMemberForm.controls['uemail'].value).subscribe(res => {
          console.log(res)
          this.generatedotp = res
        })
        this.otpsent = true
        this.wrongemail = false
      }
    }
    else {
      alert("Member Already Added")
      this.newMemberForm.reset()
    }
  }
  checkotp() {
    if (this.generatedotp === this.newMemberForm.controls['OTP'].value) {
      this.otpcorrect = true;
      this.created == true
      this.otpsent = false
      this.invalid = false
    }
    else {
      this.invalid = true
    }
  }
  final() {

    for (let i = 0; i < this.formtochild.members; i++) {

      this.formtochild.useremail = this.tripdetails.memberlist[i]
      this.formtochild.username = this.tripdetails.membername[i]
      this.tripdetails.useremail = this.tripdetails.memberlist[i]
    
      //console.log("user table")
      //console.log(this.formtochild)
      this.service.adduser(this.formtochild).subscribe(res=>
        {
          console.log(res)
        }
      )
      //console.log("trip table")
      //console.log(this.tripdetails)
      this.service.addusertrip(this.tripdetails).subscribe(res=>
        {
          console.log(res)
        }
      )
    }
   //  this.router.navigate(['/home'])
  }

}
