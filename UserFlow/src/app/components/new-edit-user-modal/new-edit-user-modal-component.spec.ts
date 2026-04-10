import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NewEditUserModalComponent } from './new-edit-user-modal-component';
import { UserService } from '../../services/user-service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PhoneType } from '../../enum/phone-type';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InputComponent } from '../ui/input-component/input-component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

describe('NewEditUserModalComponent', () => {
  let component: NewEditUserModalComponent;
  let fixture: ComponentFixture<NewEditUserModalComponent>;

  const mockUserService = {
    createUser: vi.fn(() => of({ id: 1 })),
    updateUser: vi.fn(() => of({ id: 1 }))
  };

  const mockDialogRef = {
    close: vi.fn()
  };

  const mockSnackBar = {
    open: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NewEditUserModalComponent,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        InputComponent
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewEditUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve iniciar com formulário inválido', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('deve habilitar envio quando formulário for preenchido corretamente', () => {
    component.form.patchValue({
      email: 'test@test.com',
      name: 'Teste User',
      cpf: '123.456.789-01',
      phone: '11999999999',
      phoneType: PhoneType.CELULAR
    });
    expect(component.form.valid).toBe(true);
  });

  it('deve chamar createUser ao salvar novo usuário', () => {
    component.form.patchValue({
      email: 'test@test.com',
      name: 'Teste User',
      cpf: '123.456.789-01',
      phone: '11999999999',
      phoneType: PhoneType.CELULAR
    });
    component.submitForm();
    expect(mockUserService.createUser).toHaveBeenCalled();
  });
});
