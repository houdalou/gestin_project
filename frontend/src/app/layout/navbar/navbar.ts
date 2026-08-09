import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  user: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {

    const data = localStorage.getItem('user');

    if (data) {
      this.user = JSON.parse(data);
    }

  }

  logout(): void {

    localStorage.removeItem('user');
    this.router.navigate(['/login']);

  }

}