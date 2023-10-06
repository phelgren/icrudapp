import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit{

  angForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private apis: ApiService, private fb: FormBuilder) {
    this.createForm();
  }

  customer: any = {};
  customers: Customer[];

  createForm() {
    this.angForm = this.fb.group({
      CustomerNumber: ['', Validators.required],
      CustomerName: ['', Validators.required],
      CustomerInitials: ['', Validators.required],
      CustomerStreet: ['', Validators.required],
      CustomerCity: ['', Validators.required],
      CustomerState: ['', Validators.required],
      CustomerZip: ['', Validators.required],
      CustomerChargeCode: ['', Validators.required],
      CustomerCredit: ['', Validators.required],
      CustomerBalance: ['', Validators.required],
      CustomerCreditDue: ['', Validators.required]
    });
  }

  updateCustomer(cusnum,cusnam,init,street,city,state,zipcod,chgcod,cdtlmt,baldue,cdtdue){
    console.log("Calling upsert");
    this.route.params.subscribe(params =>{
      this.apis.upsertRecords(cusnum,cusnam,init,street,city,state,zipcod,chgcod,cdtlmt,baldue,cdtdue);
      this.loadall();

    })

  }

  loadall(){
    this.apis
    .getRecords()
    .subscribe((data: Customer[]) => {
      this.customers = data;
      this.router.navigate(['getall']);
    });
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.apis.getCustomer(params['cusnum'])
      .subscribe((data: Customer) => {
        this.customer = data;
      });
    });
  }
}
