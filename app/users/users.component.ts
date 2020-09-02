import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

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
export class UsersComponent implements OnInit {

  person$: Object;
  
  constructor(private httpService: HttpClient) { }

  async ngOnInit() {
    let personData = this.httpService.get("http://10.0.0.191:8080/AddressBookREST/person/")
    await personData.subscribe(
      data => {
        this.person$ = JSON.parse(JSON.stringify(data));
      }
    )
  }
}