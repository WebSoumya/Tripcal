import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { usermodel } from '../models/usermodel';

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
}
