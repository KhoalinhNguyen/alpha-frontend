import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "./user.model";
import { AuthenticationRequest } from "./authentication.request";
import { RegisterRequest } from "./register.request";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    
    
    private apiUrl = 'http://localhost:8082/alpha/auth'

    private user : User[] | undefined

    constructor(private http: HttpClient) {}

    //get the token from the local storage 
    //TODO not yet functioning
    getAuthToken(): string | null {
        return window.localStorage.getItem("auth_token");
    }

    //set the token 
    //TODO not yet functining
    setAuthToken(token: string | null): void {
        if(token !== null) {
            window.localStorage.setItem("auth_token", token);
        } else {
            window.localStorage.removeItem("auth_token");
        }
    }

    authenticateUser(authenticationRequest: AuthenticationRequest){
        console.log(authenticationRequest);
        
        return this.http.post<any>(`${this.apiUrl}/authenticate`, authenticationRequest).subscribe();
    }

    registerUser(registerRequest: RegisterRequest) {
        console.log(registerRequest);
        //Don't know why it only works when .subscribe() is called
        return this.http.post<RegisterRequest>(`${this.apiUrl}/register`, registerRequest).subscribe();
      }
}