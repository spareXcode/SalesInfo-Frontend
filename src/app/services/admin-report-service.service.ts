import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminReportServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://103.30.72.109:8087/'
  // private apiUrl = 'http://192.168.1.22:8093/'


  
  getBrandData(): Observable<any>{
   return this.http.get(`${this.apiUrl}brands`)
  }

  getDealerData(data:any): Observable<any>{
    return this.http.post(`${this.apiUrl}dealer`,data)
  }
  getLocaitonData(data:any): Observable<any>{
    return this.http.post(`${this.apiUrl}location`,data)
  }

  getPartDescription(data:any): Observable<any>{
    return this.http.post( `${this.apiUrl}partDetails`,data)

  }
  getSalesInfo(data:any): Observable<any>{
    return this.http.post(`${this.apiUrl}getLedger`,data)
  }
}
