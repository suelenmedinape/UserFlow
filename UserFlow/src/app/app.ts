import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersComponent } from "./components/users/users-component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewEditUserModalComponent } from './components/new-edit-user-modal/new-edit-user-modal-component';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, UsersComponent, ReactiveFormsModule, MatDialogModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('UserFlow');
  searchControl = new FormControl('');
  
  constructor(private dialog: MatDialog) {}

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(NewEditUserModalComponent, {
      width: '900px',
      maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const currentSearch = this.searchControl.value;
        this.searchControl.setValue(currentSearch, { emitEvent: true });
      }
    });
  }
}
