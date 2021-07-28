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
  etat:string;
}








const firstName: string[] = [
];
const lastName: string[] = [
];
const email: string[] = [
];





@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements AfterViewInit {
  animal: string;
  name: string;
users=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'etat', 'updateDelete'];
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
  this.userService.getUsersByRole("Patient").subscribe(res =>{
    this.users=res
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  )
}
  ngAfterViewInit() {
this.getAllUsers()


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(PatientDialog, {

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



//udpate patient

openDialogUpdate(email,firstName,lastName,etat): void {
  const dialogRef = this.dialog.open(updatePatient, {

    width: '350px',
    data: {email:email,firstName:firstName,lastName:lastName,etat:etat}





  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.getAllUsers();

  });
}


}

@Component({
  selector: 'patient-dialog',
  templateUrl: './patient-dialog.html',
})
export class PatientDialog {

  form: any;
  loading = false;
  submitted = false;
  user:User= new User();

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<PatientDialog>,
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
        etat:[''],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
}


    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
      this.user.firstName=this.f.firstName.value;
      this.user.lastName=this.f.lastName.value;
      this.user.email=this.f.email.value;
      this.user.password=this.f.password.value;
     this.user.etat=this.f.etat.value;
      this.user.role="Patient";
      this.accountService.register(this.user).subscribe(res=>{
        console.log("res",res)
      })
      this.dialogRef.close();


    }



}

 //update patient component

@Component({
  selector: 'updatePatient',
  templateUrl: './update-patient.html',
})



export class updatePatient {

  form: any;
  loading = false;
  submitted = false;
  user:User= new User();

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<updatePatient>,
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
        etat:[''],
        password: ['', [Validators.required, Validators.minLength(6)]]


    });
    console.log("hhhhhhh",this.data)
this.form.patchValue({
  firstName: this.data.firstName,
  lastName: this.data.lastName,
  etat:this.data.etat,
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
      this.user.etat=this.f.etat.value;
      this.user.role="Patient";
      this.accountService.update(this.data.email,this.user).subscribe(res=>{
        console.log("res",res)
      })
      this.dialogRef.close();


    }
  }
