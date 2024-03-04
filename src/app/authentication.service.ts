import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "./user.model";
import { AuthenticationRequest } from "./authentication.request";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    
    private apiUrl = 'http://localhost:8082/alpha/auth'

    private user : User[] | undefined

    constructor(private http: HttpClient) {}

    authenticateUser(authenticationRequest: AuthenticationRequest) {
        console.log(authenticationRequest);
        
        return this.http.post<AuthenticationRequest>(`${this.apiUrl}/authenticate`, authenticationRequest).subscribe(res => {console.log(res);
        });
    }
}