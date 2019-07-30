import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import { Task } from '../task';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task = {id: null, title:null, taskState:null}
  selectedTask.title = new FormControl('');

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.readTasks().subscribe((tasks:Task[])=>{
      this.tasks = tasks;
      console.log(this.tasks)
    })
  }

  createOrUpdatetask(form){
    if(this.selectedTask && this.selectedTask.id){
      form.value.id = this.selectedTask.id;
      this.apiService.updateTask(form.value).subscribe((task : Task)=> {
        console.log(" Task updated , ", task);
      });
    }else if(this.selectedTask.title){
      form.value.title = this.selectedTask.title;
      form.value.taskState = this.selectedTask.taskState;
      this.apiService.createTask(form.value).subscribe((task:Task)=>{
        console.log("Task Created , ", task);
      })
    } else{
      console.log("Agregar pop-up de alerta ");
    }
  }
  
  selectTask(task:Task){
    this.selectedTask = task;
  }

  deleteTask(task:Task){
    this.apiService.deleteTask(task).subscribe((task:Task)=>{
      console.log("Task deleted , ", task);
    })
  }

}


