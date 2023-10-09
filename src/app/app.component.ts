import { Component, OnInit } from '@angular/core';
import {ApiService} from './services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'icrudapp';
  
  ngOnInit(){
    this.onGetRecords();
  };
  
constructor(private http: HttpClient,private apiService:ApiService,private router : Router){

  this.router.events.subscribe((event: Event) => {

    this.navigationInterceptor(event);
  });
}
private navigationInterceptor(event: Event): void {

  if (event instanceof NavigationStart) {
    //this.loadingBar.start();
  }
  if (event instanceof NavigationEnd) {
    //this.loadingBar.complete();
  }
  if (event instanceof NavigationCancel) {
    //this.loadingBar.stop();
  }
  if (event instanceof NavigationError) {
    //this.loadingBar.stop();
  }
}

onGetRecords(){
  this.apiService.getRecords();
}

}

