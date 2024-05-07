import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-createtour',
  templateUrl: './createtour.component.html',
  styleUrls: ['./createtour.component.css']
})
export class CreatetourComponent {

  copyform:any
  createform = false
  user:any
  loggedIn:any

  constructor(private authService: SocialAuthService) { }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

  signOut(): void {
    
    this.authService.signOut();
    this.createform = true
  }

ngOnInit()
{
  this.createform = true

  this.authService.authState.subscribe((user) => {
    this.user = user;
    this.loggedIn = (user != null);
    if(this.loggedIn)
      {
        this.createform=false
      }
    console.log( this.loggedIn)
    console.log(this.user)
  });
}
  newTourForm = new FormGroup({
    Name: new FormControl(''),
    Not: new FormControl(''),
    Nom: new FormControl(''),
    Contact: new FormControl(''),
  });

  create()
  {
    this.copyform= this.newTourForm.value
    console.log(this.copyform)
  }

}
