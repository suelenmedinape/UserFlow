import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user-service';
import { UsersModel } from '../models/users-model';
import { PhoneType } from '../enum/phone-type';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: UsersModel[] = [
    { id: 1, name: 'Alice', email: 'alice@test.com', cpf: '123', phone: '123', phoneType: PhoneType.CELULAR },
    { id: 2, name: 'Bob', email: 'bob@test.com', cpf: '456', phone: '456', phoneType: PhoneType.FIXO }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devre ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar todos os usuários quando não houver filtro', () => {
    service.listUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('deve filtrar usuários pelo nome', () => {
    service.listUsers('Alice').subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].name).toBe('Alice');
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    req.flush(mockUsers);
  });

  it('deve criar um novo usuário via POST', () => {
    const newUser = { name: 'Charlie', email: 'charlie@test.com', cpf: '789', phone: '789', phoneType: PhoneType.CELULAR };
    
    service.createUser(newUser).subscribe(user => {
      expect(user.name).toBe('Charlie');
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush({ ...newUser, id: 3 });
  });

  it('deve atualizar um usuário via PUT', () => {
    const updateData = { name: 'Alice Updated' };
    
    service.updateUser('1', updateData).subscribe(user => {
      expect(user.name).toBe('Alice Updated');
    });

    const req = httpMock.expectOne('http://localhost:3000/users/1');
    expect(req.request.method).toBe('PUT');
    req.flush({ ...mockUsers[0], ...updateData });
  });
});
