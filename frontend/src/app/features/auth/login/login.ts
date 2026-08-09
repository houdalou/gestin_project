import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {


  loginForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {


    this.loginForm = this.fb.group({

      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],


      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });


  }



  login(): void {


    if (this.loginForm.invalid) {


      this.loginForm.markAllAsTouched();

      return;

    }



    this.auth.login(
      this.loginForm.value
    )
    .subscribe({


      next: (user) => {


        localStorage.setItem(
          'user',
          JSON.stringify(user)
        );


        this.router.navigate(['/dashboard']);


      },


      error: (err) => {


        console.log(err);


        alert(
          "Nom d'utilisateur ou mot de passe incorrect."
        );


      }


    });


  }




  get username() {

    return this.loginForm.get('username');

  }




  get password() {

    return this.loginForm.get('password');

  }



}