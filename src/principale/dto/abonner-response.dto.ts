/* eslint-disable prettier/prettier */
export class AbonnerResponseDto {
  id: string;
  idBadge: string;
  nom: string;
  prenom: string;
  tel: string;
  adresse: string;
  solde: string;
  nip: string;
  type: string;
  statut: 0 | 1;
  iduhf: string;
  codeuhf: string;
  plaque: string;
  essieu: string;
  //created_at:created_at;
  //date in form d/m/y
  created_at: string;
  updated_at: string;
}
