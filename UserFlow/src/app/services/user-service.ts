import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateUserDTO, UsersModel } from '../models/users-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly BASE_URL = 'http://localhost:3000';
  private readonly http: HttpClient = inject(HttpClient);

  listUsers(nameFilter?: string): Observable<UsersModel[]> {
    const url = `${this.BASE_URL}/users`;
    return this.http.get<UsersModel[]>(url).pipe(
      map(users => {
        if (!nameFilter) return users;
        const lowerFilter = nameFilter.toLowerCase();
        return users.filter(u => u.name.toLowerCase().includes(lowerFilter));
      })
    );
  }

  createUser(user: CreateUserDTO): Observable<UsersModel> {
    return this.http.post<UsersModel>(`${this.BASE_URL}/users`, user);
  }

  updateUser(id: string, user: Partial<CreateUserDTO>): Observable<UsersModel> {
    return this.http.put<UsersModel>(`${this.BASE_URL}/users/${id}`, user);
  }
}