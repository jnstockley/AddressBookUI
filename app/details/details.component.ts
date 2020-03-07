import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";
import {Person} from '../classes/Person';
import {Occupation} from '../classes/Occupation';
import {Address} from '../classes/Address';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  person$: Person;
  address$: Address;
  occupation$: Occupation;
  
  constructor(private route: ActivatedRoute, private data: DataService) { 
     this.route.params.subscribe( params => this.person$ = params.id );
  }

  ngOnInit() {
    this.data.getUser(this.person$).subscribe(
      data => this.person$ = data
    );
  }

}