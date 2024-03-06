import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "./user.model";
import { AuthenticationRequest } from "./authentication.request";
import { RegisterRequest } from "./register.request";
import { AxiosService } from "./axios.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    
    
    private authUrl = '/auth'

    private user : User[] | undefined

    constructor(
      private http: HttpClient,
      private axiosService: AxiosService) {}

    async authenticateUser(authenticationRequest: AuthenticationRequest){
        console.log(authenticationRequest);
        
        return this.axiosService.createAxiosClient().post("auth/authenticate", authenticationRequest);
    }

    async registerUser(registerRequest: RegisterRequest) {

        return this.axiosService.request("POST", "auth/register", registerRequest);
      }
}