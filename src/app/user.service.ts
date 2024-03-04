import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "./user.model";
import { AuthenticationRequest } from "./authentication.request";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    private apiUrl = 'http://localhost:8082/alpha'

    private user : User[] | undefined

    httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

    constructor(private http: HttpClient) {}

    getUser(userId: number) : Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/user/${userId}`);
    }

    getAllUser(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/all`);
    }

    addNewUser(user: User) {
        return this.http.post<User>(`${this.apiUrl}/newUser`, user);
    }

    deleteUser(id: number) {
        return this.http.delete(`${this.apiUrl}/user/${id}`);
      }

    editUser(user: User) {
        console.log(user);
        
        return this.http.put<User>(`${this.apiUrl}/user/${user.id}`, user);
    }

}
