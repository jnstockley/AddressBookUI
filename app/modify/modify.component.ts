import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../classes/Person';
import { Address } from '../classes/Address';
import { Occupation } from '../classes/Occupation';
import { DataService } from '../data.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  modifyUser: FormGroup;
  submitted = false;
  success = false;
  updated = false;

  constructor(private formBuilder: FormBuilder, private data: DataService) {
    this.modifyUser = this.formBuilder.group({
      userId: ['', Validators.required],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      homePhone: [''],
      mobilePhone: [''],
      workPhone: [''],
      homeEmail: [''],
      workEmail: [''],
      height: [''],
      weight: [''],
      gender: [''],
      race: [''],
      number: [''],
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
      companyName: [''],
      jobTitle: [''],
      employmentType: [''],
      monthlySalary: [''],
      industry: [''],
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.modifyUser.invalid) {
      return;
    }

    this.success = true;
    if (this.success) {
      var person = new Person()
      var address = new Address()
      var occupation = new Occupation()
      person.id = this.modifyUser.value.userId
      person.firstName = this.modifyUser.value.firstName
      person.middleName = this.modifyUser.value.middleName
      person.lastName = this.modifyUser.value.lastName
      person.homePhone = this.modifyUser.value.homePhone
      person.mobilePhone = this.modifyUser.value.mobilePhone
      person.workPhone = this.modifyUser.value.workPhone
      person.homeEmail = this.modifyUser.value.homeEmail
      person.workEmail = this.modifyUser.value.workEmail
      person.height = this.modifyUser.value.height
      person.weight = this.modifyUser.value.weight
      person.gender = this.modifyUser.value.gender
      person.race = this.modifyUser.value.race
      address.number = this.modifyUser.value.number
      address.street = this.modifyUser.value.street
      address.city = this.modifyUser.value.city
      address.state = this.modifyUser.value.state
      address.zip = this.modifyUser.value.zip
      occupation.companyName = this.modifyUser.value.companyName
      occupation.jobTitle = this.modifyUser.value.jobTitle
      occupation.employmentType = this.modifyUser.value.employmentType
      occupation.monthlySalary = this.modifyUser.value.monthlySalary
      occupation.industry = this.modifyUser.value.industry

      
      this.data.getUser(person.id).pipe(
        switchMap(person => {
          occupation.id = person.occupationId;
          address.id = person.addressId;
          return this.data.updateOccupation(occupation, occupation.id);
        }),
          switchMap(occupation =>{
          return this.data.updateAddress(address, address.id);
        }),
        switchMap(address => {
          return this.data.updatePerson(person, person.id)
        })
      ).subscribe(
        resp =>{
          if(resp.id == person.id){
            this.updated = true;
          }else{
            this.updated = false;
          }
        }
      )
    }
  }
ngOnInit() {
}

}