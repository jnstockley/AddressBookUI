import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Person } from '../classes/Person';
import { Occupation } from '../classes/Occupation';
import { Address } from '../classes/Address';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators'; 


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],

  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class NewComponent implements OnInit {

  addUser: FormGroup; 
  submitted = false;
  success = false;
  added = false;
  objOccupation: Occupation;
  objAddress: Address;
  objPerson: Person;

  constructor(private formBuilder: FormBuilder, private data: DataService, private http:HttpClient) { 
  this.addUser = this.formBuilder.group({
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    homePhone: ['', Validators.required],
    mobilePhone: ['', Validators.required],
    workPhone: ['', Validators.required],
    homeEmail: ['', Validators.required],
    workEmail: ['', Validators.required],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    gender: ['', Validators.required],
    race: ['', Validators.required],
    number: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    companyName: ['', Validators.required],
    jobTitle: ['', Validators.required],
    employmentType: ['', Validators.required],
    monthlySalary: ['', Validators.required],
    industry: ['', Validators.required],
  })
}

onSubmit(){
  this.submitted = true;

  if(this.addUser.invalid){
    return;
  }

  this.success=true;
  if(this.success){
    var person = new Person()
    var address = new Address()
    var occupation = new Occupation()
    person.firstName = this.addUser.value.firstName
    person.middleName = this.addUser.value.middleName
    person.lastName = this.addUser.value.lastName
    person.homePhone = this.addUser.value.homePhone
    person.mobilePhone = this.addUser.value.mobilePhone
    person.workPhone = this.addUser.value.workPhone
    person.homeEmail = this.addUser.value.homeEmail
    person.workEmail = this.addUser.value.workEmail
    person.height = this.addUser.value.height
    person.weight = this.addUser.value.weight
    person.gender = this.addUser.value.gender
    person.race = this.addUser.value.race
    address.number = this.addUser.value.number
    address.street = this.addUser.value.street
    address.city = this.addUser.value.city
    address.state = this.addUser.value.state
    address.zip = this.addUser.value.zip
    occupation.companyName = this.addUser.value.companyName
    occupation.jobTitle = this.addUser.value.jobTitle
    occupation.employmentType = this.addUser.value.employmentType
    occupation.monthlySalary = this.addUser.value.monthlySalary
    occupation.industry = this.addUser.value.industry
    
    this.data.addOccupation(occupation).pipe(
      switchMap(occupation => {
        person.occupationId = occupation.id;
        return this.data.addAddress(address);
      }),
      switchMap(address =>{
        person.addressId = address.id;
        return this.data.addPerson(person)
      })
    ).subscribe(
      resp => {
        if(resp.id != null){
          this.added = true;
        }else{
          this.added = false;
        }
      }
    )
  }
}

  ngOnInit() {
  }

}