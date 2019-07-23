import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Person } from '../classes/Person';
import { Occupation } from '../classes/Occupation';
import { Address } from '../classes/Address';
import { DataService } from '../data.service';


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

  constructor(private formBuilder: FormBuilder, private data: DataService) { 
    this.addUser = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleInitial: ['', Validators.required],
      lastName: ['', Validators.required],
      number: ['', Validators.required],
      name: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      occupation: ['', Validators.required],
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
      person.middleInitial = this.addUser.value.middleInitial
      person.lastName = this.addUser.value.lastName
      address.number = this.addUser.value.number
      address.name = this.addUser.value.name
      address.city = this.addUser.value.city
      address.state = this.addUser.value.state
      address.zip = this.addUser.value.zip
      occupation.occupation = this.addUser.value.occupation
      this.data.addOccupation(occupation)
      .subscribe
      (
        data =>
        {
            person.occupationId = data.id;
            this.data.addAddress(address)
            .subscribe
            (
              data =>
              {
                  person.addressId = data.id
                  this.data.addPerson(person)
                  .subscribe
                  (
                    resp =>
                    { 
                      if(resp.id!=null){
                        this.added = true;
                      }else{
                        this.added = false;
                      }              
                    },
                    data => 
                    {
                      this.objPerson = data
                      
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
