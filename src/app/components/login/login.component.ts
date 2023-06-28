import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/components/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string= "password";
  isText: boolean=false;
  eyeIcon: string="bx-hide";
  loginForm!: FormGroup;


constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){

}
ngOnInit(): void{
    this.loginForm=this.fb.group({
     email:['',Validators.required],
      password:['',Validators.required]
    })

}
hideShowPass(){
this.isText=!this.isText;
this.isText ? this.eyeIcon="bx-hide" : this.eyeIcon="bx-hide";
this.isText ? this.type="text" : this.type="password";
}
onLogin(){
  if(this.loginForm.valid){
    //posalji obj u bazu
console.log(this.loginForm.value);
this.auth.login(this.loginForm.value).subscribe({
next:(res)=>{
  alert(res.message);
  this.loginForm.reset();
  this.router.navigate(['dashboard']);

},
error:(err)=>{
  alert(err?.error.message)
}
})

  }else{
    //baci error

    console.log('ne valja');
    ValidateForm.validateAllFormFields(this.loginForm);
    
  }
}



}
