import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Affiliation } from '../../models/affiliation.model';

@Component({
  selector: 'app-affiliation-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './affiliation-table.html',
  styleUrl: './affiliation-table.css'
})
export class AffiliationTableComponent {

  @Input()
  affiliations: Affiliation[] = [];

  @Output()
  edit = new EventEmitter<number>();

  @Output()
  view = new EventEmitter<number>();

  onAction(affiliation: Affiliation): void {

    if (affiliation.etat === 'EN_COURS') {
      this.edit.emit(affiliation.id!);
    } else {
      this.view.emit(affiliation.id!);
    }

  }

}