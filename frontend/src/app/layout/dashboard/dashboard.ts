import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from '../navbar/navbar';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    Navbar,
    MenuComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {}