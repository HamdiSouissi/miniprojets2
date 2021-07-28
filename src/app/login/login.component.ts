import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any;
  loading = false;
  submitted = false;
  user:User= new User();
  constructor( private formBuilder: FormBuilder, private accountService: AccountService,private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({

        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
}
get f() { return this.form.controls; }

onSubmit() {
  console.log("test",this.f.email.value)
  this.accountService.login(this.f.email.value,this.f.password.value).subscribe(res=>{
    if(res)
    {
      this.router.navigate(['/Live-stat'])
    }
  },
  err =>{
    this.router.navigate(['/registration'])
  })
}

}
