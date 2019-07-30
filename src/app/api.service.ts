import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private PHP_API_SERVER : string 

  constructor(private httpClient : HttpClient) {
    this.PHP_API_SERVER ='http://127.0.0.1:8080';
   }
  

  readTasks(): Observable<Task[]>{
    return this.httpClient.get<Task[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  createTask(task : Task) : Observable<Task>{
    return this.httpClient.post<Task>(`${this.PHP_API_SERVER}/api/create.php`, task);
  }

  updateTask(task:Task){
    return this.httpClient.put<Task>(`${this.PHP_API_SERVER}/api/update.php`,task)
  }

  deleteTask(task:Task){
    return this.httpClient.delete<Task>(`${this.PHP_API_SERVER}/api/delete.php/?id=${task.id}`)
  }
}
