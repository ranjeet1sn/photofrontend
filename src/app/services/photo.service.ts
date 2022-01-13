import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  addPhoto(data) {
    return this.http.post<any>(`${environment.apiUrl}photo/add`, data);
  }

  viewPhoto() {
    return this.http.get<any>(`${environment.apiUrl}photo/list`);
  }
  singlePhoto(id) {
    return this.http.get<any>(`${environment.apiUrl}photo/list/${id}`);
  }

  updatePhoto(id, data) {
    return this.http.put<any>(`${environment.apiUrl}photo/update/${id}`, data);
  }
}
