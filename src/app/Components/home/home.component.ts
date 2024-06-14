import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import { usermodel } from 'src/app/models/usermodel';
import { JsonserviceService } from 'src/app/sharedservice/jsonservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  uemail:any
  uname=""
  Notrip:any
  constructor(private router:Router,private service:JsonserviceService)
  {

  }

  ngOnInit()
  {

    //document.cookie="tripcal=cookietest"
    if(!document.cookie.split("Tripcalsessionid")[1]){
    this.router.navigate(["/login"])
    }

    else{

      this.uemail = this.getCookie("useremail")
          console.log(this.uemail)
          this.service.getuserbyemail(this.uemail).subscribe(res=>{
            //console.log(res);
            if(res!=null)
              {
                this.Notrip=true;
                this.uname = res.username
                console.log(res.username);
              }
              else{
                console.log(res);
              }
          })
    }

  }

  create()
  {
    this.router.navigate(['/createanewtour'])
  }

  list()
  {
    this.router.navigate(['home/yourtourbox'])
  }

 getCookie(cname:string) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  test()
  {
    this.service.getalltrip().subscribe(res=>{
      if(res!=null)
        {
          console.log(res.at(0)?.memberlist);
        }
    })
  }

}
