import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  deleteUser: FormGroup; 
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private data: DataService) { 
    this.deleteUser = this.formBuilder.group({
      userId: ['',Validators.required],
    })
  }

  onSubmit(){
    this.submitted = true;

    if(this.deleteUser.invalid){
      return;
    }

    this.success=true;
    if(this.success){
      this.data.deleteUser(this.deleteUser.value.userId).subscribe(
        () => console.log(`User with Id = ${this.deleteUser.value.userId} deleted`),
        (err) => console.log(err)
      );
    }
  }
  ngOnInit() {
  }

}
