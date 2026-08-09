import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AffiliationService } from '../services/affiliation.service';
import { AffiliationFormComponent } from '../components/affiliation-form/affiliation-form';

@Component({
  selector: 'app-new-affiliation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AffiliationFormComponent
  ],
  templateUrl: './new-affiliation.html',
  styleUrl: './new-affiliation.css'
})
export class NewAffiliation {

  private fb = inject(FormBuilder);
  private affiliationService = inject(AffiliationService);

  private datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  private phonePattern = /^0[5-7][0-9]{8}$/;
  private cniePattern = /^[A-Za-z]{1,2}[0-9]{5,7}$/;
  private postalCodePattern = /^[0-9]{5}$/;

  affiliationForm = this.fb.group({

    // Identification
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    cnie: ['', [Validators.required, Validators.pattern(this.cniePattern)]],
    matriculeTgr: [''],
    dateNaissance: ['', [Validators.required, Validators.pattern(this.datePattern)]],
    lieuNaissance: [''],
    sexe: [''],
    numeroSomCntDdp: [''],
    situationFamiliale: [''],
    nationalite: [''],

    // Situation professionnelle
    dateRecrutement: ['', Validators.pattern(this.datePattern)],
    dateDebut: ['', [Validators.required, Validators.pattern(this.datePattern)]],
    matriculeSalarie: [''],
    regime: [''],

    // Adresse
    adresse: [''],
    quartier: [''],
    codePostal: ['', Validators.pattern(this.postalCodePattern)],
    region: ['', Validators.required],
    province: ['', Validators.required],
    ville: ['', Validators.required],
    pays: ['Maroc'],

    // Téléphones
    telephoneDomicile: ['', Validators.pattern(this.phonePattern)],
    telephoneBureau: ['', Validators.pattern(this.phonePattern)],
    telephoneGsm: ['', [Validators.required, Validators.pattern(this.phonePattern)]],

    // Email
    email: ['', Validators.email]

  });

  private toIsoDate(value: string): string {

    if (!value) return '';

    const [day, month, year] = value.split('/');

    return `${year}-${month}-${day}`;
  }

  resetForm(): void {

    this.affiliationForm.reset({
      pays: 'Maroc'
    });

  }

  save(): void {

    if (this.affiliationForm.invalid) {
      this.affiliationForm.markAllAsTouched();
      return;
    }

    const formValue = this.affiliationForm.getRawValue();

    const affiliationPayload = {

      nom: formValue.nom ?? '',
      prenom: formValue.prenom ?? '',
      cnie: formValue.cnie ?? '',
      matriculeTgr: formValue.matriculeTgr ?? '',

      dateNaissance: this.toIsoDate(formValue.dateNaissance ?? ''),
      lieuNaissance: formValue.lieuNaissance ?? '',
      sexe: formValue.sexe ?? '',

      numeroSomCntDdp: formValue.numeroSomCntDdp ?? '',
      situationFamiliale: formValue.situationFamiliale ?? '',
      nationalite: formValue.nationalite ?? '',

      dateRecrutement: this.toIsoDate(formValue.dateRecrutement ?? ''),
      dateDebut: this.toIsoDate(formValue.dateDebut ?? ''),

      matriculeSalarie: formValue.matriculeSalarie ?? '',
      regime: formValue.regime ?? '',

      adresse: formValue.adresse ?? '',
      quartier: formValue.quartier ?? '',
      codePostal: formValue.codePostal ?? '',
      ville: formValue.ville ?? '',
      pays: formValue.pays ?? '',
      province: formValue.province ?? '',
      region: formValue.region ?? '',

      telephoneDomicile: formValue.telephoneDomicile ?? '',
      telephoneBureau: formValue.telephoneBureau ?? '',
      telephoneGsm: formValue.telephoneGsm ?? '',

      email: formValue.email ?? ''

    };

    this.affiliationService.createAffiliation(affiliationPayload).subscribe({

      next: () => {

        alert('Affiliation enregistrée avec succès');

        this.resetForm();

      },

      error: (err) => {

        console.error(err);

        alert("Erreur lors de l'enregistrement.");

      }

    });

  }

}