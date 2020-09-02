import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";
import {Person} from '../classes/Person';
import {Occupation} from '../classes/Occupation';
import {Address} from '../classes/Address';
import {HttpClient} from '@angular/common/http'
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  personId: any;
  person$: Person;
  address$: any;
  occupation$: any;
  
  constructor(private route: ActivatedRoute, private data: DataService, private httpService: HttpClient) { 
     this.route.params.subscribe( params => this.personId = params.id );
  }

  async ngOnInit() {
    let personCall = this.httpService.get("http://10.0.0.191:8080/AddressBookREST/person/"+this.personId);
    //let addressCall = this.httpService.get("http://10.0.0.191:8080/AddressBookREST/address/"+this.personId);
    //let occupationCall = this.httpService.get("http://10.0.0.191:8080/AddressBookREST/occupation/"+this.personId);

    const arr = [personCall];

    let multiCall = forkJoin(arr);

    multiCall.subscribe(
      data => {
        this.person$ = JSON.parse(JSON.stringify(data[0]));
        this.httpService.get("http://10.0.0.191:8080/AddressBookREST/address/"+this.person$.addressId).subscribe(
          data => {
            this.address$ = data
          })
          this.httpService.get("http://10.0.0.191:8080/AddressBookREST/occupation/"+this.person$.occupationId).subscribe(
            data => {
              this.occupation$ = data
            })
      }
     
    )
  }

}