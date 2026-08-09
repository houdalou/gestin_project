export interface Affiliation {

  // Informations système (returned by backend)
  id?: number;
  sequenceWeb?: string;
  etat?: string;
  motifRejet?: string;

  // Identification
  nom: string;
  prenom: string;
  cnie: string;
  matriculeTgr: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: string;
  numeroSomCntDdp: string;
  situationFamiliale: string;
  nationalite: string;

  // Situation professionnelle
  dateRecrutement: string;
  matriculeSalarie: string;
  regime: string;
  dateDebut: string;

  // Adresse
  adresse: string;
  quartier: string;
  codePostal: string;
  ville: string;
  pays: string;
  province: string;
  region: string;

  // Téléphones
  telephoneDomicile: string;
  telephoneBureau: string;
  telephoneGsm: string;

  // Email
  email: string;

  // Audit (returned by backend)
  createdAt?: string;
  updatedAt?: string;
}