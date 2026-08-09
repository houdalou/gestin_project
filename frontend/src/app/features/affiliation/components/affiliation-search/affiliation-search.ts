import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-affiliation-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './affiliation-search.html',
  styleUrl: './affiliation-search.css'
})
export class AffiliationSearch {

  type = 'sequenceWeb';
  value = '';

  @Output()
  search = new EventEmitter<{
    type: string;
    value: string;
  }>();

  onSearch(): void {

    if (!this.value.trim()) {
      alert('Veuillez saisir une valeur.');
      return;
    }

    this.search.emit({
      type: this.type,
      value: this.value.trim()
    });

  }

}