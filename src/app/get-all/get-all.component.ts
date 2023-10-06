import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.css']
})
export class GetAllComponent implements OnInit{

  customers: Customer[];

  constructor(private crudapi: ApiService){};

  ngOnInit() {
    this.loadall();
  }

  loadall(){
    this.crudapi
    .getRecords()
    .subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }

  delete(cusnum){
    if(confirm("Are you sure you want to delete this customer?"))
    this.crudapi.delete(cusnum).subscribe(res => {
      this.ngOnInit();
    });
    
  }
}
