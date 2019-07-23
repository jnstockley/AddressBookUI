import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Person } from '../classes/Person';
import { Address } from '../classes/Address';
import { Occupation } from '../classes/Occupation';
import { DataService } from '../data.service';


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

  constructor(private formBuilder: FormBuilder, private data:DataService) { 
    this.modifyUser = this.formBuilder.group({
      userId: ['',Validators.required],
      firstName: [''],
      middleInitial: [''],
      lastName: [''],
      number: [''],
      name: [''],
      city: [''],
      state: [''],
      zip: [''],
      occupation: [''],
    })
  }

  onSubmit(){
    this.submitted = true;

    if(this.modifyUser.invalid){
      return;
    }

    this.success=true;
    if(this.success){
      var person = new Person()
      var address = new Address()
      var occupation = new Occupation()
      person.id = this.modifyUser.value.userId
      person.firstName = this.modifyUser.value.firstName
      person.middleInitial = this.modifyUser.value.middleInitial
      person.lastName = this.modifyUser.value.lastName
      address.number = this.modifyUser.value.number
      address.name = this.modifyUser.value.name
      address.city = this.modifyUser.value.city
      address.state = this.modifyUser.value.state
      address.zip = this.modifyUser.value.zip
      occupation.occupation = this.modifyUser.value.occupation
      
      this.data.getUser(person.id).subscribe(
        data => {
          person.addressId=data.addressId
          address.id=data.addressId
          person.occupationId=data.occupationId
          occupation.id=data.occupationId
          if(person.firstName==""){
            person.firstName=data.firstName
          }
          if(person.middleInitial==""){
            person.middleInitial=data.middleInitial
          }
          if(person.lastName==""){
            person.lastName=data.lastName
          }
          this.data.getAddress(person.addressId).subscribe(
            data =>{
              if(address.number==""){
                address.number=data.number
              }
              if(address.name==""){
                address.name=data.name
              }
              if(address.city==""){
                address.city=data.city
              }
              if(address.state==""){
                address.state=data.state
              }
              if(address.zip==""){
                address.zip=data.zip
              }
              this.data.getOccupation(person.occupationId).subscribe(
                data=>{
                  if(occupation.occupation==""){
                    occupation.occupation=data.occupation
                  }
                  this.data.updateAddress(address).subscribe(
                    data=>{
                      this.data.updateOccupation(occupation).subscribe(
                        data=>{
                          this.data.updatePerson(person).subscribe(
                            resp => {
                              if(resp.id!=null){
                                this.updated = true;
                              }else{
                                this.updated = false;
                              }
                            }
                          )
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  }

  ngOnInit() {
  }

}
