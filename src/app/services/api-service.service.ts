import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  constructor(private http: HttpClient) { }

  // Registering new users to the system
  register(user: any): Observable<any> {
    return this.http.post(environment.baseUrl + environment.signupUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  // validating user credentials
  login(user: any): Observable<any> {
    return this.http.post(environment.baseUrl + environment.loginUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }
}
