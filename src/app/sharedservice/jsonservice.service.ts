import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { usermodel } from '../models/usermodel';
import { tripmodel } from '../models/tripmodel';

@Injectable({
  providedIn: 'root'
})
export class JsonserviceService {
  constructor(private http:HttpClient) { }

 authentication(email:String)
 {
  return this.http.get <number>(`http://localhost:8080/auth/getemailotp?email=${email}`)
 }

  getallusers()
  {
    return this.http.get <usermodel[]>("http://localhost:8080/users/allusers")
  }

  getuserbyemail(email:String)
  {
     return this.http.get <usermodel> (`http://localhost:8080/users/getuserbyemail/${email}`)

  }

  gettripbyemail(email:String)
  {
    return this.http.get<tripmodel> (`http://localhost:8080/users/gettripbyemail/${email}`)
  }

  gettripsbytripcode(tripcode:String)
  {
    return this.http.get<tripmodel[]> (`http://localhost:8080/users/gettripbytripcode/${tripcode}`)
  }

  ///testpurpose
  getalltrip()
  {
    return this.http.get <tripmodel[]> ("http://localhost:8080/users/alltrips")
  }


  //addmethods
  adduser(user:usermodel)
  {
    return this.http.post <usermodel>("http://localhost:8080/users/adduser",user)  }
  addusertrip(trip:tripmodel)
  {
    return this.http.post <usermodel>("http://localhost:8080/users/addtour",trip)
  }
}
