import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any;
  loading = false;
  submitted = false;
  user:User= new User();
  constructor( private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        role: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
}


    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
      console.log(this.f.firstName.value)
      this.user.firstName=this.f.firstName.value;
      this.user.lastName=this.f.lastName.value;
      this.user.email=this.f.email.value;
      this.user.password=this.f.password.value;
      this.user.role=this.f.role.value;
      this.accountService.register(this.user).subscribe(res=>{
        console.log("res",res)
      })


    }

}
