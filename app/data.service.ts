import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Person} from './classes/Person';
import {Occupation} from './classes/Occupation';
import {Address} from './classes/Address';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  url = 'https://jackstockleyiowa.ddns.net:8443/AddressBookREST/';
  //url = 'http://localhost:8080/addressbookrest/';
  
  getUsers() {
    return this.http.get(this.url+'person');
  }

  getUser(userId): Observable<any>{
    return this.http.get(this.url+'person/'+userId)
  }

  getOccupation(occupationId): Observable<any>{
    return this.http.get(this.url + 'occupation/' + occupationId)
  }

  getAddress(addressId): Observable<any>{
    return this.http.get(this.url+'address/' + addressId);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(this.url + 'person/remove/id/' + id);
  }

  addOccupation(occupation: Occupation): Observable<any>{
    return this.http.put<{Response, Occupation}>(this.url + 'occupation/insert', occupation, { headers: { 'Content-Type': 'application/json'}})
  }

  addAddress(address: Address): Observable<any>{
    return this.http.put<{Response, Address}>(this.url + 'address/insert/', address, { headers: { 'Content-Type': 'application/json'}})
  }

  addPerson(person: Person): Observable<any>{
    return this.http.put<{Response, Person}>(this.url + 'person/insert/', person, { headers: {'Content-Type': 'application/json',}})
  }

  updateOccupation(occupation: Occupation, id: number): Observable<any>{
    return this.http.post<{Response, Occupation}>(this.url + "occupation/update/" + id, occupation, { headers: {'Content-Type': 'application/json',}})
  }

  updateAddress(address: Address, id: number): Observable<any>{
    return this.http.post<{Response, Address}>(this.url + 'address/update/' + id, address, { headers: {'Content-Type': 'application/json',}})
  }

  updatePerson(person: Person, id: number): Observable<any>{
    return this.http.post<{Response, Person}>(this.url+'person/update/'+id, person, { headers: {'Content-Type': 'application/json',}})
  }
}
