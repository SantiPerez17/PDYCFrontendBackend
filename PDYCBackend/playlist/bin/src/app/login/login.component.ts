import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    token= localStorage.getItem('apiKey')


  constructor( 
    private formBuilder: FormBuilder,
    private route : ActivatedRoute, 
    private router: Router,
    private authenticationService : AuthenticationService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required], 
      password: ['', Validators.required]

    });
    this.authenticationService.logout();
  }

  get f() { return this.loginForm.controls; }

  songs(){
    this.router.navigate(['songs']);

  }


  
  onSubmit() {
    this.submitted=true;
    if (this.loginForm.invalid){
      return;
    }
    this.loading=true;
    this.authenticationService.login(this.f.email.value,this.f.password.value)
    .pipe(first()).subscribe(
      data => {
        this.router.navigate(['playlists']);
      },
      
        error => {
          this.error='Usuario incorrecto ' + error.message +" " +  error.stack;
          this.loading=false;
        });
  }
}
