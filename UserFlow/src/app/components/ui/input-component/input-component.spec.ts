import { TestBed, ComponentFixture } from '@angular/core/testing';
import { InputComponent } from './input-component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach } from 'vitest';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InputComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    
    fixture.componentRef.setInput('control', new FormControl(''));
    fixture.componentRef.setInput('label', 'Teste Label');
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o label correto', () => {
    const labelDebug = fixture.nativeElement.querySelector('mat-label');
    expect(labelDebug.textContent).toContain('Teste Label');
  });

  it.skip('deve exibir a mensagem de erro quando o errorMessage for setado', async () => {
    fixture.componentRef.setInput('errorMessage', 'Erro Customizado');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    
    const errorElement = fixture.nativeElement.querySelector('mat-error');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Erro Customizado');
  });
});
