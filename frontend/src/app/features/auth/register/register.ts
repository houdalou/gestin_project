import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/register-request';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {


  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);



  message = '';

  error = '';



  registerForm = this.fb.group({

    firstName: [
      '',
      Validators.required
    ],


    lastName: [
      '',
      Validators.required
    ],


    cin: [
      '',
      Validators.required
    ],


    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],


    phone: [
      ''
    ],


    address: [
      ''
    ],


    city: [
      ''
    ],


    username: [
      '',
      Validators.required
    ],


    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ],


    confirmPassword: [
      '',
      Validators.required
    ]

  },
  {
    validators: this.passwordMatchValidator
  });



  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {


    const password = control.get('password')?.value;

    const confirmPassword = control.get('confirmPassword')?.value;


    if(password !== confirmPassword){

      return {
        passwordMismatch:true
      };

    }


    return null;

  }




  register(){


    if(this.registerForm.invalid){

      this.registerForm.markAllAsTouched();

      return;

    }



    const request = this.registerForm.value as RegisterRequest;



    this.authService.register(request)
    .subscribe({


      next:(response)=>{


        this.message = response;

        this.error = '';

        this.registerForm.reset();



        setTimeout(()=>{

          this.router.navigate(['/login']);

        },1500);



      },


      error:(err)=>{


        this.message='';

        this.error = err.error;


      }


    });


  }



  get password(){

    return this.registerForm.get('password');

  }



  get confirmPassword(){

    return this.registerForm.get('confirmPassword');

  }



}