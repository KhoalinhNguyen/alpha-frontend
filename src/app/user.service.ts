import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "./user.model";
import { AuthenticationRequest } from "./authentication.request";
import { AxiosService } from "./axios.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    private apiUrl = 'http://localhost:8082/alpha'

    httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

    constructor(
      private axiosService: AxiosService
      ) {}

    getUser(userId: number) {
        return this.axiosService.createAxiosClient().get(`${this.apiUrl}/user/${userId}`);
    }

    setIsAdmin(user: User) {
        if(user.role == "ADMIN") {
        window.sessionStorage.setItem("isAdmin", "true");
        }
        else{
        window.sessionStorage.setItem("isAdmin", "false");
        }
    }

    getIsAdmin(): string | null {
        return window.sessionStorage.getItem("isAdmin");
    }

    deleteIsAdmin() {
        window.sessionStorage.removeItem("isAdmin");
    }

    getAllUser(): Promise<any> {
        return this.axiosService.request("GET", "/alpha/all", null);
    }

    addNewUser(user: User) {
        return this.axiosService.createAxiosClient().post(`${this.apiUrl}/newUser`, user);
    }

    deleteUser(id: number) {
        return this.axiosService.createAxiosClient().delete(`${this.apiUrl}/user/${id}`);
      }

    editUser(user: User) {
        console.log(user);
        
        return this.axiosService.createAxiosClient().put(`${this.apiUrl}/user/${user.id}`, user);
        //.put<User>(c);
    }


}
