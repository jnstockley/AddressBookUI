import { Component } from '@angular/core';
import { Person } from './classes/Person';
import { Occupation } from './classes/Occupation';
import { Address } from './classes/Address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng6-proj';
}

var person = new Person();
person.id = 0;
person.firstName = 'first name';
person.middleInitial = 'middle initial';
person.lastName = 'laste name';
person.addressId = 0;
person.occupationId = 0;

var address = new Address();
address.id = 0;
address.number = "0";
address.name = "fake street";
address.city = "some city";
address. state = "some state";
address.zip = "0";

var occupation = new Occupation();
occupation.id = 0;
occupation.occupation = "Some occupation";

