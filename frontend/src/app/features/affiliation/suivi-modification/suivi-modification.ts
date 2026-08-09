import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AffiliationSearchRequest } from '../models/affiliation-search-request';
import { Affiliation } from '../models/affiliation.model';
import { AffiliationService } from '../services/affiliation.service';
import { AffiliationTableComponent } from '../components/affiliation-table/affiliation-table';

@Component({
  selector: 'app-suivi-modification',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AffiliationTableComponent
  ],
  templateUrl: './suivi-modification.html',
  styleUrl: './suivi-modification.css'
})
export class SuiviModification {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private affiliationService = inject(AffiliationService);

  affiliations: Affiliation[] = [];
  hasSearched = false;

  searchForm = this.fb.group({
    sequenceWeb: [''],
    cnie: [''],
    matricule: [''],
    nom: [''],
    prenom: [''],
    matriculeTgr: [''],
    statut: [''],
    dateSaisieDebut: [''],
    dateSaisieFin: [''],
    dateStatutDebut: [''],
    dateStatutFin: [''],
    dateReceptionDebut: [''],
    dateReceptionFin: ['']
  });

  rechercher(): void {

    const request =
      this.searchForm.getRawValue() as AffiliationSearchRequest;

    this.affiliationService.search(request).subscribe({

      next: (response: Affiliation[]) => {
        this.affiliations = response;
        this.hasSearched = true;
      },

      error: (err: Error) => {
        console.error('Erreur recherche :', err);
        this.affiliations = [];
        this.hasSearched = true;
      }

    });
  }

  nouvelleAffiliation(): void {
    this.router.navigate(['/dashboard/nouvelle-affiliation']);
  }

  onEdit(id: number): void {

    this.router.navigate(
      ['/dashboard/affiliations', id],
      {
        queryParams: {
          mode: 'edit'
        }
      }
    );

  }

  onView(id: number): void {

    this.router.navigate(
      ['/dashboard/affiliations', id],
      {
        queryParams: {
          mode: 'view'
        }
      }
    );

  }

}