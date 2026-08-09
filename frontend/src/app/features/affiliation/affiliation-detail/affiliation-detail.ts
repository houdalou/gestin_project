import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Affiliation } from '../models/affiliation.model';
import { AffiliationService } from '../services/affiliation.service';
import { AffiliationFormComponent } from '../components/affiliation-form/affiliation-form';

@Component({
  selector: 'app-affiliation-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AffiliationFormComponent
  ],
  templateUrl: './affiliation-detail.html',
  styleUrl: './affiliation-detail.css'
})
export class AffiliationDetail implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private affiliationService = inject(AffiliationService);

  affiliation: Affiliation | null = null;

  loading = true;
  readonly = false;

  affiliationForm = this.fb.group({

    // Identification
    nom: [''],
    prenom: [''],
    cnie: [''],
    matriculeTgr: [''],
    dateNaissance: [''],
    lieuNaissance: [''],
    sexe: [''],
    numeroSomCntDdp: [''],
    situationFamiliale: [''],
    nationalite: [''],

    // Situation professionnelle
    dateRecrutement: [''],
    dateDebut: [''],
    matriculeSalarie: [''],
    regime: [''],

    // Adresse
    adresse: [''],
    quartier: [''],
    codePostal: [''],
    region: [''],
    province: [''],
    ville: [''],
    pays: [''],

    // Contact
    telephoneDomicile: [''],
    telephoneBureau: [''],
    telephoneGsm: [''],
    email: ['']
  });

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');
    const mode = this.route.snapshot.queryParamMap.get('mode');

    if (!idParam) {
      this.router.navigate(['/dashboard/suivi']);
      return;
    }

    // mode=view => readonly
    // mode=edit => editable
    this.readonly = mode === 'view';

    const id = Number(idParam);

    if (isNaN(id)) {
      this.router.navigate(['/dashboard/suivi']);
      return;
    }

    this.chargerAffiliation(id);
  }

  private chargerAffiliation(id: number): void {

    this.loading = true;

    this.affiliationService.getAffiliationById(id).subscribe({

      next: (affiliation: Affiliation) => {

        console.log('Affiliation chargée :', affiliation);

        this.affiliation = affiliation;

        this.affiliationForm.patchValue({

          // Identification
          nom: affiliation.nom,
          prenom: affiliation.prenom,
          cnie: affiliation.cnie,
          matriculeTgr: affiliation.matriculeTgr,
          dateNaissance: affiliation.dateNaissance,
          lieuNaissance: affiliation.lieuNaissance,
          sexe: affiliation.sexe,
          numeroSomCntDdp: affiliation.numeroSomCntDdp,
          situationFamiliale: affiliation.situationFamiliale,
          nationalite: affiliation.nationalite,

          // Situation professionnelle
          dateRecrutement: affiliation.dateRecrutement,
          dateDebut: affiliation.dateDebut,
          matriculeSalarie: affiliation.matriculeSalarie,
          regime: affiliation.regime,

          // Adresse
          adresse: affiliation.adresse,
          quartier: affiliation.quartier,
          codePostal: affiliation.codePostal,
          region: affiliation.region,
          province: affiliation.province,
          ville: affiliation.ville,
          pays: affiliation.pays,

          // Contact
          telephoneDomicile: affiliation.telephoneDomicile,
          telephoneBureau: affiliation.telephoneBureau,
          telephoneGsm: affiliation.telephoneGsm,
          email: affiliation.email
        });

        this.loading = false;

      },

      error: (err) => {

        console.error(
          'Erreur lors du chargement de l’affiliation :',
          err
        );

        this.affiliation = null;
        this.loading = false;

      }

    });
  }

  onFormSubmit(): void {

    if (!this.affiliation?.id) {
      return;
    }

    const payload: Affiliation = {
      ...this.affiliation,
      ...(this.affiliationForm.getRawValue() as Partial<Affiliation>)
    };

    this.affiliationService
      .updateAffiliation(this.affiliation.id, payload)
      .subscribe({

        next: () => {

          alert('Affiliation modifiée avec succès.');

          this.router.navigate(['/dashboard/suivi']);

        },

        error: (err) => {

          console.error(
            'Erreur lors de la modification :',
            err
          );

          alert('Erreur lors de la modification.');

        }

      });
  }

  onFormCancel(): void {

    this.router.navigate(['/dashboard/suivi']);

  }

}