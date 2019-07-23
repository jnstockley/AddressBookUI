import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';
import { Observable } from 'rxjs';
import {Person} from './classes/Person';
import {Occupation} from './classes/Occupation';
import {Address} from './classes/Address';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  url = 'http://jackstockley.ddns.net:8080/AddressBookREST/';

  getUsers() {
    return this.http.get(this.url+'person/')
  }

  getUser(userId): Observable<any>{
    return this.http.get(this.url+'person/'+userId)
  }

  getOccupation(occupationId): Observable<any>{
    return this.http.get(this.url + 'occupation/' + occupationId)
  }

  getAddress(addressId): Observable<any>{
    return this.http.get(this.url + 'address/' + addressId)
  }

  deleteUser(id: number): Observable<{}>{
    return this.http.delete(this.url + 'person/' + id, { headers: {'Access-Control-Allow-Origin': '*'}})
  }

  addOccupation(occupation: Occupation): Observable<any>{
    return this.http.put<{Response, Occupation}>(this.url + 'occupation/', occupation, { headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',}})
  }

  addAddress(address: Address): Observable<any>{
    return this.http.put<{Response, Address}>(this.url + 'address/', address, { headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',}})
  }

  addPerson(person: Person): Observable<any>{
    return this.http.put<{Response, Person}>(this.url + 'person/', person, { headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',}})
  }

  updateOccupation(occupation: Occupation): Observable<any>{
    return this.http.post<{Response, Occupation}>(this.url + "occupation/" + occupation.id, occupation, { headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',}});
  }

  updateAddress(address: Address): Observable<any>{
    return this.http.post<{Response, Address}>(this.url + 'address/' + address.id, address, { headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',}})
  }

  updatePerson(person: Person): Observable<any>{
    return this.http.post<{Response, Person}>(this.url+'person/'+person.id, person, { headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',}})
  }
}