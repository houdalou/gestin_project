import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-affiliation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './affiliation-form.html',
  styleUrl: './affiliation-form.css'
})
export class AffiliationFormComponent implements OnInit, OnChanges {

  @Input({ required: true })
  form!: FormGroup;

  @Input()
  readonly = false;

  @Output()
  formSubmit = new EventEmitter<void>();

  @Output()
  formCancel = new EventEmitter<void>();

  // =====================================================
  // LISTES
  // =====================================================

  regimes: string[] = [
    'RCAR',
    'CNSS',
    'CIMR',
    'Régime des Pensions Civiles',
    'Régime Général'
  ];

  paysList: string[] = [
    'Maroc'
  ];

  regions: string[] = [
    'Tanger-Tétouan-Al Hoceïma',
    'Oriental',
    'Fès-Meknès',
    'Rabat-Salé-Kénitra',
    'Béni Mellal-Khénifra',
    'Casablanca-Settat',
    'Marrakech-Safi',
    'Drâa-Tafilalet',
    'Souss-Massa',
    'Guelmim-Oued Noun',
    'Laâyoune-Sakia El Hamra',
    'Dakhla-Oued Ed-Dahab'
  ];

  provincesByRegion: { [key: string]: string[] } = {
    'Tanger-Tétouan-Al Hoceïma': [
      'Tanger-Assilah',
      'Tétouan',
      'Al Hoceïma',
      'Chefchaouen',
      'Larache',
      'Fahs-Anjra',
      "M'Diq-Fnideq",
      'Ouezzane'
    ],
    'Oriental': [
      'Oujda-Angad',
      'Nador',
      'Berkane',
      'Taourirt',
      'Jerada',
      'Guercif',
      'Figuig',
      'Driouch'
    ],
    'Fès-Meknès': [
      'Fès',
      'Meknès',
      'Taza',
      'Ifrane',
      'El Hajeb',
      'Sefrou',
      'Boulemane',
      'Moulay Yacoub',
      'Taounate'
    ],
    'Rabat-Salé-Kénitra': [
      'Rabat',
      'Salé',
      'Kénitra',
      'Skhirate-Témara',
      'Khémisset',
      'Sidi Kacem',
      'Sidi Slimane'
    ],
    'Béni Mellal-Khénifra': [
      'Béni Mellal',
      'Khénifra',
      'Khouribga',
      'Azilal',
      'Fquih Ben Salah'
    ],
    'Casablanca-Settat': [
      'Casablanca',
      'Mohammédia',
      'Settat',
      'El Jadida',
      'Nouaceur',
      'Benslimane',
      'Berrechid',
      'Sidi Bennour'
    ],
    'Marrakech-Safi': [
      'Marrakech',
      'Safi',
      'Essaouira',
      'El Kelâa des Sraghna',
      'Chichaoua',
      'Al Haouz',
      'Rehamna',
      'Youssoufia'
    ],
    'Drâa-Tafilalet': [
      'Errachidia',
      'Ouarzazate',
      'Zagora',
      'Midelt',
      'Tinghir'
    ],
    'Souss-Massa': [
      'Agadir Ida-Outanane',
      'Inezgane-Aït Melloul',
      'Taroudant',
      'Tiznit',
      'Chtouka-Aït Baha'
    ],
    'Guelmim-Oued Noun': [
      'Guelmim',
      'Tan-Tan',
      'Sidi Ifni',
      'Assa-Zag'
    ],
    'Laâyoune-Sakia El Hamra': [
      'Laâyoune',
      'Boujdour',
      'Tarfaya',
      'Es-Semara'
    ],
    'Dakhla-Oued Ed-Dahab': [
      'Dakhla',
      'Aousserd'
    ]
  };

  citiesByProvince: { [key: string]: string[] } = {
    'Rabat': ['Rabat'],
    'Salé': ['Salé', 'Tabriquet', 'Hssaine'],
    'Kénitra': ['Kénitra', 'Mehdia'],
    'Casablanca': ['Casablanca', 'Aïn Sebaâ', 'Sidi Bernoussi', 'Hay Hassani'],
    'Mohammédia': ['Mohammédia'],
    'Marrakech': ['Marrakech'],
    'Fès': ['Fès'],
    'Meknès': ['Meknès'],
    'Tanger-Assilah': ['Tanger', 'Assilah'],
    'Tétouan': ['Tétouan'],
    'Agadir Ida-Outanane': ['Agadir'],
    'Oujda-Angad': ['Oujda']
  };

  availableProvinces: string[] = [];
  availableCities: string[] = [];

  // =====================================================
  // LIFECYCLE
  // =====================================================

  ngOnInit(): void {

    this.updateFormState();
    this.syncCascadingLists();

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['readonly']) {
      this.updateFormState();
    }

    if (changes['form']) {
      this.syncCascadingLists();
    }

  }

  // =====================================================
  // ENABLE / DISABLE
  // =====================================================

  private updateFormState(): void {

    if (!this.form) {
      return;
    }

    if (this.readonly) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
    }

  }

  // =====================================================
  // CASCADE LISTS
  // =====================================================

  private syncCascadingLists(): void {

    if (!this.form) {
      return;
    }

    const region = this.form.get('region')?.value ?? '';
    const province = this.form.get('province')?.value ?? '';

    this.availableProvinces =
      this.provincesByRegion[region] ?? [];

    this.availableCities =
      this.citiesByProvince[province] ?? [];

  }

  // =====================================================
  // REGION
  // =====================================================

  onRegionChange(): void {

    if (this.readonly) {
      return;
    }

    const region = this.form.get('region')?.value ?? '';

    this.availableProvinces =
      this.provincesByRegion[region] ?? [];

    this.availableCities = [];

    this.form.patchValue({
      province: '',
      ville: ''
    });

  }

  // =====================================================
  // PROVINCE
  // =====================================================

  onProvinceChange(): void {

    if (this.readonly) {
      return;
    }

    const province =
      this.form.get('province')?.value ?? '';

    this.availableCities =
      this.citiesByProvince[province] ?? [];

    this.form.patchValue({
      ville: ''
    });

  }

  // =====================================================
  // BUTTONS
  // =====================================================

  onSubmit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.formSubmit.emit();

  }

  onCancel(): void {

    this.formCancel.emit();

  }

}