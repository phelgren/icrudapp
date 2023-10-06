import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  uri = 'http://10.0.10.141:4088/';

  constructor(private http:HttpClient) { }

  getRecords(){

    const headers = new HttpHeaders({'Cache-Control':'no-cache'});
    return  this.http.get(this.uri+'DB_select_all.php?'); 
  }

  getCustomer(id){
    const headers = new HttpHeaders({'Cache-Control':'no-cache'});
    return  this.http.get(this.uri+'DB_select.php?cusnum='+id); 
  }

  upsertRecords(cusnum,lastname,initials,street,city,state,zipcode,creditlimit,chargecode,balancedue,creditdue){
    const headers = new HttpHeaders({'Cache-Control':'no-cache',"Content-Type": "application/json"});
    // Pass the json in the body

    const custobj = {cusnum,lastname,initials,street,city,state,zipcode,creditlimit,chargecode,balancedue,creditdue};

    let bodyData = JSON.stringify(custobj);

    console.log(bodyData);

    return  this.http.post(this.uri+'DB_merge.php?',custobj,{'headers':headers})
              .subscribe((res) => {
                console.log("posted");
              }); 

  }
  
  delete(cusnum){
    const headers = new HttpHeaders({'Cache-Control':'no-cache'});
    return  this.http.get(this.uri+'DB_delete.php?cusnum='+cusnum);
  }

}
