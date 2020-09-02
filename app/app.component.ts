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
  title = 'AddressBookUI';
}

var person = new Person();
person.id = 0;
person.firstName = 'first name';
person.middleName = 'middle name';
person.lastName = 'last name';
person.homePhone = "000-000-0000";
person.mobilePhone = "000-000-0000";
person.workPhone = "000-000-0000";
person.homeEmail = "someemail@provider.com";
person.workEmail = "someemail@work.com";
person.height = 0.0;
person.weight = 0.0;
person.race = "race";
person.gender = "gender";
person.addressId = 0;
person.occupationId = 0;
person.date = "2020-01-01";
person.time = "00:00:00";

var address = new Address();
address.id = 0;
address.number = 0;
address.street = "fake street";
address.city = "some city";
address. state = "some state";
address.zip = "0";
address.date = "2020-01-01";
address.time = "00:00:00";

var occupation = new Occupation();
occupation.id = 0;
occupation.companyName = "some company";
occupation.jobTitle = "some job title";
occupation.monthlySalary = "42000";
occupation.industry = "some industry";
occupation.date = "2020-01-01";
occupation.time = "00:00:00";
