package com.example.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {


    @NotBlank(message = "First name is required")
    private String firstName;


    @NotBlank(message = "Last name is required")
    private String lastName;


    @NotBlank(message = "CIN is required")
    private String cin;


    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;



    // Optional fields
    private String phone;

    private String address;

    private String city;



    @NotBlank(message = "Username is required")
    private String username;



    @NotBlank(message = "Password is required")
    @Size(
            min = 8,
            message = "Password must contain at least 8 characters"
    )
    private String password;



    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;

}