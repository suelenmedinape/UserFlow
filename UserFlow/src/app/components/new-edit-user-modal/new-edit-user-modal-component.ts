import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { take } from 'rxjs/operators';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersModel } from '../../models/users-model';
import { PhoneType } from '../../enum/phone-type';
import { InputComponent } from "../ui/input-component/input-component";
import { UserService } from '../../services/user-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-edit-user-modal-component',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    InputComponent
  ],
  templateUrl: './new-edit-user-modal-component.html',
  styleUrl: './new-edit-user-modal-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEditUserModalComponent implements OnInit { 
  private readonly userService = inject(UserService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialogRef = inject(MatDialogRef<NewEditUserModalComponent>);
  public readonly data = inject<{ user?: UsersModel }>(MAT_DIALOG_DATA, { optional: true });

  protected isLoading = signal<boolean>(false);
  protected isEdit = signal<boolean>(false);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^(?:\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)]),
    phoneType: new FormControl(PhoneType.CELULAR, [Validators.required]),
  });

  ngOnInit() {
    if (this.data?.user) {
      this.isEdit.set(true);
      this.form.patchValue({
        email: this.data.user.email,
        name: this.data.user.name,
        cpf: this.data.user.cpf,
        phone: this.data.user.phone,
        phoneType: this.data.user.phoneType,
      });
    }
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) return 'Campo obrigatório';
    if (control?.hasError('email')) return 'E-mail inválido';
    if (control?.hasError('minlength')) return 'Mínimo de 3 caracteres';
    if (control?.hasError('pattern')) return 'Formato inválido';
    return '';
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.isLoading.set(true);
    const formData = this.form.value as any;

    const request$ = this.isEdit() && this.data?.user?.id
      ? this.userService.updateUser(String(this.data.user.id), formData)
      : this.userService.createUser(formData);

    request$.pipe(take(1)).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.snackBar.open(this.isEdit() ? 'Usuário atualizado com sucesso' : 'Usuário criado com sucesso', 'Fechar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.error?.message || 'Erro ao salvar', 'Fechar', { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }
}
