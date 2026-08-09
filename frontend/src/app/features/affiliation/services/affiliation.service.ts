import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Affiliation } from '../models/affiliation.model';
import { AffiliationSearchRequest } from '../models/affiliation-search-request';

@Injectable({
  providedIn: 'root'
})
export class AffiliationService {

  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/affiliations';

  // ==========================================
  // CREATE
  // ==========================================

  createAffiliation(affiliation: Affiliation): Observable<Affiliation> {

    return this.http.post<Affiliation>(
      this.apiUrl,
      affiliation
    );

  }

  // ==========================================
  // SEARCH
  // ==========================================

  search(
    criteria: AffiliationSearchRequest
  ): Observable<Affiliation[]> {

    return this.http.post<Affiliation[]>(
      `${this.apiUrl}/search`,
      criteria
    );

  }

  // ==========================================
  // GET BY ID
  // ==========================================

  getAffiliationById(id: number): Observable<Affiliation> {

    return this.http.get<Affiliation>(
      `${this.apiUrl}/${id}`
    );

  }

  // ==========================================
  // UPDATE
  // ==========================================

  updateAffiliation(
    id: number,
    affiliation: Affiliation
  ): Observable<Affiliation> {

    return this.http.put<Affiliation>(
      `${this.apiUrl}/${id}`,
      affiliation
    );

  }

}