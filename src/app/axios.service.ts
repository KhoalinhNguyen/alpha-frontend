import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL="http://localhost:8082";
    axios.defaults.headers.post["Content-Type"] = "application/json";
   }

   //get the token from the local storage 
  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  //set the token
  setAuthToken(token: string | null): void {
    if(token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }

  //remove token
  removeToken() {
    window.localStorage.removeItem("auth_token");
  }

  createAxiosClient(): AxiosInstance {
    let headers = {};

    if(this.getAuthToken() !== null) {
      headers = {"Authorization": "Bearer "+ this.getAuthToken()};
      console.log(headers);
      
    }

    const client = axios.create({
      headers
    });
    
    return client;
  }

  request(method: string, url: string, data: any): Promise<any> {
    let headers = {};
    if(this.getAuthToken() !== null) {
      headers = {"Authorization": "Bearer "+ this.getAuthToken()};
      console.log(headers);
    }

    let client: any = axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });
    console.log(client);
    return client;
  }

}
