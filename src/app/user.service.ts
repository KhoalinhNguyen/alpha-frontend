import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8082/alpha'

    private user : User[] | undefined

    constructor(private http: HttpClient) {}

    getUser(userId: number) : Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/user/${userId}`);
    }

    getAllUser(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/all`);
    }
}
