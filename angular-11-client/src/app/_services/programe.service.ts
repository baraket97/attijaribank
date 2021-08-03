import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Programe } from '../models/Programe.model';

const baseUrl = 'http://localhost:8080/api/programes';

@Injectable({
  providedIn: 'root',
})
export class ProgrameService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Programe[]> {
    return this.http.get<Programe[]>(baseUrl);
  }

  get(id: any): Observable<Programe> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByOwner(owner: any): Observable<Programe[]> {
    return this.http.get<Programe[]>(`${baseUrl}?owner=${owner}`);
  }
}
