import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/components/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  type: string= "password";
  isText: boolean=false;
  eyeIcon: string="bx-hide";
  signUpForm!: FormGroup;



constructor(private fb: FormBuilder, private auth:AuthService, private router: Router){

}
ngOnInit(): void{
  this.signUpForm=this.fb.group({
  
    userName:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required]
  })
}
hideShowPass(){
this.isText=!this.isText;
this.isText ? this.eyeIcon="bx-hide" : this.eyeIcon="bx-hide";
this.isText ? this.type="text" : this.type="password";
}
onSignUp(){
  if(this.signUpForm.valid){
    //logika za signup
    this.auth.signUp(this.signUpForm.value)
    .subscribe({
      next:(res=>{
        alert(res.message);
        this.signUpForm.reset();
        this.router.navigate(['login']);
      })
      ,error:(err=>{
        alert(err.error.message)
      })
    })
   
    
  }else{
    //error
    ValidateForm.validateAllFormFields(this.signUpForm)
    console.log("nije dobro")
  }
}

}
