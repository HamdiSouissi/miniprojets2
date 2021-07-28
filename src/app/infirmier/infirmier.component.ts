import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../services/users.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';



export interface UserData {

  firstName: string;
  lastName: string;
  email: string;
}








const firstName: string[] = [
];
const lastName: string[] = [
];
const email: string[] = [
];





@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css']
})
export class InfirmierComponent implements AfterViewInit {
  animal: string;
  name: string;
users=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'email','updateDelete'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService  :  UsersService,public dialog: MatDialog)
   {
    // Create 100 users


   this.getAllUsers();


    // Assign the data to the data source for the table to render
  }
getAllUsers(){
  this.userService.getUsersByRole("Infirmier").subscribe(res =>{
    this.users=res
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  )
}
  ngAfterViewInit() {



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {

      width: '350px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllUsers();

    });
  }

  delete(email){
    console.log("here",email)
    this.userService.delete(email).subscribe();
    this.getAllUsers();
  }



//udpate infimier

openDialogUpdate(email,firstName,lastName): void {
  const dialogRef = this.dialog.open(updateInfirmier, {

    width: '350px',
    data: {email:email,firstName:firstName,lastName:lastName}





  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.getAllUsers();

  });
}


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  form: any;
  loading = false;
  submitted = false;
  user:User= new User();

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


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
      this.user.role="Infirmier";
      this.accountService.register(this.user).subscribe(res=>{
        console.log("res",res)
      })
      this.dialogRef.close();


    }



}

 //update infimier component

@Component({
  selector: 'updateInfirmier',
  templateUrl: './update.infirmier.html',
})



export class updateInfirmier {

  form: any;
  loading = false;
  submitted = false;
  user:User= new User();

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<updateInfirmier>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        role: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]


    });
    console.log("hhhhhhh",this.data)
this.form.patchValue({
  firstName: this.data.firstName,
  lastName: this.data.lastName,
  email: this.data.email,

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
      this.user.role="Infirmier";
      this.accountService.update(this.data.email,this.user).subscribe(res=>{
        console.log("res",res)
      })
      this.dialogRef.close();


    }
  }
