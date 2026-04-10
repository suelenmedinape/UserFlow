import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UsersComponent } from './users-component';
import { UserService } from '../../services/user-service';
import { of, throwError } from 'rxjs';
import { PhoneType } from '../../enum/phone-type';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  
  const mockUsers = [
    { id: 1, name: 'Alice', email: 'alice@test.com', cpf: '123', phone: '123', phoneType: PhoneType.CELULAR },
  ];

  const mockUserService = {
    listUsers: vi.fn(() => of(mockUsers))
  };

  const mockDialog = {
    open: vi.fn(() => ({
      afterClosed: () => of(true)
    }))
  };

  const mockSnackBar = {
    open: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsersComponent,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('searchControl', new FormControl(''));
    fixture.detectChanges();
  });

  it('deve carregar a lista ao iniciar', () => {
    expect(mockUserService.listUsers).toHaveBeenCalled();
    expect(component.users().length).toBe(1);
    expect(component.users()[0].name).toBe('Alice');
  });

  it('deve setar erro quando a API falhar', () => {
    mockUserService.listUsers.mockReturnValueOnce(throwError(() => new Error('API Error')));
    component.ngOnInit(); // Trigger reload
    fixture.detectChanges();
    expect(component.error()).toBeTruthy();
  });

  it('deve abrir modal de edição ao chamar openEditUserModal', () => {
    component.openEditUserModal(mockUsers[0]);
    expect(mockDialog.open).toHaveBeenCalled();
  });
});
