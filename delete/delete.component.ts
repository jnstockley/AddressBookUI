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

    if(this.submitted){
      this.data.deleteUser(this.deleteUser.value.userId).subscribe(
      data =>{
        if(data == true){
          this.success = true;
        }else{
          this.success = false;
        }
      }
        )
  }
}
  ngOnInit() {
  }

}