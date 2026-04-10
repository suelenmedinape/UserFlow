import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed, Input, DestroyRef } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../services/user-service';
import { UsersModel } from '../../models/users-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NewEditUserModalComponent } from '../new-edit-user-modal/new-edit-user-modal-component';
import { FormControl } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-component',
  imports: [MatIcon, MatButtonModule, MatProgressSpinnerModule, MatPaginatorModule],
  templateUrl: './users-component.html',
  styleUrl: './users-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  users = signal<UsersModel[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  pageIndex = signal(0);
  pageSize = signal(5);

  paginatedUsers = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.users().slice(start, end);
  });

  @Input({ required: true }) searchControl!: FormControl;

  ngOnInit(): void {
    if (this.searchControl) {
      this.searchControl.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          this.isLoading.set(true);
          this.error.set(null);
          this.pageIndex.set(0);
          return this.userService.listUsers(value || '').pipe(
            catchError(() => {
              this.error.set('Erro ao carregar os usuários. Tente novamente.');
              this.isLoading.set(false);
              this.snackBar.open('Erro ao buscar usuários', 'Fechar', { duration: 3000 });
              return of(null);
            })
          );
        })
      ).subscribe((response) => {
        if (response !== null) {
          this.users.set(response);
          this.isLoading.set(false);
        }
      });
    }
  
    this.fetchUsers(this.searchControl?.value || '');
  }

  fetchUsers(searchTerm?: string) {
    this.isLoading.set(true);
    this.error.set(null);
    this.userService.listUsers(searchTerm).subscribe({
      next: (response) => {
        this.users.set(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar usuários.');
        this.isLoading.set(false);
        this.snackBar.open('Erro ao buscar usuários', 'Fechar', { duration: 3000 });
      }
    });
  }

  openEditUserModal(user: UsersModel) {
    const dialogRef = this.dialog.open(NewEditUserModalComponent, {
      width: '900px',
      maxWidth: '100vw',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchUsers(this.searchControl?.value || '');
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
