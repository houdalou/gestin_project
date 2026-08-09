import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Affiliation } from '../models/affiliation.model';
import { AffiliationService } from '../services/affiliation.service';
import { AffiliationFormComponent } from '../components/affiliation-form/affiliation-form';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AffiliationFormComponent
  ],
  templateUrl: './consultation.html',
  styleUrl: './consultation.css'
})
export class Consultation {

  private fb = inject(FormBuilder);
  private affiliationService = inject(AffiliationService);

  // =====================================================
  // SEARCH RESULTS
  // =====================================================

  affiliations: Affiliation[] = [];

  // Affiliation currently opened
  selectedAffiliation: Affiliation | null = null;

  // =====================================================
  // SEARCH FORM
  // =====================================================

  searchForm = this.fb.group({
    nom: [''],
    prenom: [''],
    cnie: ['']
  });

  // =====================================================
  // CONSULTATION FORM
  // Reuses your existing AffiliationFormComponent
  // =====================================================

  consultationForm = this.fb.group({

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
    matriculeSalarie: [''],
    regime: [''],
    dateDebut: [''],

    // Adresse
    adresse: [''],
    quartier: [''],
    codePostal: [''],
    ville: [''],
    pays: [''],
    province: [''],
    region: [''],

    // Téléphones
    telephoneDomicile: [''],
    telephoneBureau: [''],
    telephoneGsm: [''],

    // Email
    email: ['']
  });

  // =====================================================
  // RECHERCHER
  // =====================================================

  rechercher(): void {

    const values = this.searchForm.getRawValue();

    const nom = values.nom?.trim() || '';
    const prenom = values.prenom?.trim() || '';
    const cnie = values.cnie?.trim() || '';

    // Au moins un critère
    if (!nom && !prenom && !cnie) {
      alert('Veuillez saisir au moins un critère de recherche.');
      return;
    }

    this.affiliationService.search({
      nom: nom || undefined,
      prenom: prenom || undefined,
      cnie: cnie || undefined
    }).subscribe({

      next: (response: Affiliation[]) => {

        this.affiliations = response;

        // Fermer l'ancien formulaire si une nouvelle recherche est faite
        this.selectedAffiliation = null;

      },

      error: (err) => {

        console.error(
          'Erreur lors de la consultation :',
          err
        );

        this.affiliations = [];
        this.selectedAffiliation = null;

      }

    });
  }

  // =====================================================
  // INITIALISER
  // =====================================================

  initialiser(): void {

    this.searchForm.reset({
      nom: '',
      prenom: '',
      cnie: ''
    });

    this.affiliations = [];

    this.selectedAffiliation = null;

    this.consultationForm.reset();

  }

  // =====================================================
  // VOIR
  // Opens the existing affiliation form in READ ONLY
  // =====================================================

  voir(affiliation: Affiliation): void {

    this.selectedAffiliation = affiliation;

    this.consultationForm.patchValue({

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
      matriculeSalarie: affiliation.matriculeSalarie,
      regime: affiliation.regime,
      dateDebut: affiliation.dateDebut,

      // Adresse
      adresse: affiliation.adresse,
      quartier: affiliation.quartier,
      codePostal: affiliation.codePostal,
      ville: affiliation.ville,
      pays: affiliation.pays,
      province: affiliation.province,
      region: affiliation.region,

      // Téléphones
      telephoneDomicile: affiliation.telephoneDomicile,
      telephoneBureau: affiliation.telephoneBureau,
      telephoneGsm: affiliation.telephoneGsm,

      // Email
      email: affiliation.email

    });

    // Scroll to the form
    setTimeout(() => {
      document
        .getElementById('consultation-form')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    }, 50);
  }

  // =====================================================
  // FERMER
  // =====================================================

  fermerConsultation(): void {

    this.selectedAffiliation = null;

    this.consultationForm.reset();

  }

}