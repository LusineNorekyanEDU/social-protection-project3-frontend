import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {ProgramDto} from '../models/metrics.model';




@Injectable({
  providedIn: 'root'
})
export class ProgramsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getPrograms(
    onlyActive = true
  ): Observable<ProgramDto[]> {
    const params = this.buildParams(onlyActive);

    return this.http.get<ProgramDto[]>(
      `${this.baseUrl}/metrics/programs`,
      { params }
    );
  }

  private buildParams(onlyActive: boolean): HttpParams {
    let params = new HttpParams();
    params = params.set('onlyActive', String(onlyActive));
    return params;
  }
}
