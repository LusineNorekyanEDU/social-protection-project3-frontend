// src/app/features/dashboard/services/metrics-api.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApplicationFunnelDto,
  BeneficiariesByCityDto,
  DashboardFilter, FinancialLiabilityDto
} from '../models/metrics.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getApplicationFunnel(
    filter: DashboardFilter
  ): Observable<ApplicationFunnelDto> {
    const params = this.buildParams(filter);
    return this.http.get<ApplicationFunnelDto>(
      `${this.baseUrl}/metrics/application-funnel`,
      { params }
    );
  }

  getBeneficiariesByCity(
    filter: DashboardFilter
  ): Observable<BeneficiariesByCityDto> {
    const params = this.buildParams(filter);
    return this.http.get<BeneficiariesByCityDto>(
      `${this.baseUrl}/metrics/beneficiaries-by-city`,
      { params }
    );
  }

  getFinancialLiability(
    filter: DashboardFilter
  ): Observable<FinancialLiabilityDto> {
    const params = this.buildParams(filter);
    return this.http.get<FinancialLiabilityDto>(
      `${this.baseUrl}/metrics/financial-liability`,
      { params }
    );
  }

  private buildParams(filter: DashboardFilter): HttpParams {
    let params = new HttpParams();

    if (filter.from) {
      params = params.set('from', this.formatDate(filter.from));
    }
    if (filter.to) {
      params = params.set('to', this.formatDate(filter.to));
    }
    if (filter.programId != null) {
      // NOTE: currently not used in UI, but backend supports it.
      params = params.set('programId', String(filter.programId));
    }

    return params;
  }

  //formats date to yyyy-MM-dd format
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.pad2(date.getMonth() + 1);
    const day = this.pad2(date.getDate());
    return `${year}-${month}-${day}`;
  }

  private pad2(n: number): string {
    return n < 10 ? `0${n}` : String(n);
  }
}
