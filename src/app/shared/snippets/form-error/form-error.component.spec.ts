import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorComponent } from './form-error.component';
import { FormGroup } from '@angular/forms';
import { ValidatorEnum } from '@shared/types/types.enums';
import { CREATE_DRAFT_FORM } from '@shared/data/forms';
import { CreateDraftForm } from '@shared/types/interface.form';

describe('FormErrorComponent', () => {
  let component: FormErrorComponent;
  let fixture: ComponentFixture<FormErrorComponent>;
  let form: FormGroup<CreateDraftForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    form = CREATE_DRAFT_FORM();
    component.control = form.controls.title;
    component.validator = [ValidatorEnum.REQUIRED, ValidatorEnum.MIN_LENGTH];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if the form control have errors', () => {
    fixture.detectChanges();
    const error = component.swichError.REQUIRED();
    expect(error).toBeTrue();
  });

  it('should show error by type on the HTML', () => {
    component.control.patchValue("test");
    component.control.markAsDirty();
    fixture.detectChanges();
    const error = component.swichError.MIN_LENGTH();
    expect(error).toBeTrue();
    const element: HTMLElement = fixture.nativeElement;
    const errorElement = element.querySelector(".form-error");
    expect(errorElement.children[0].textContent).toBe("Tamaño mínimo: 10");
    expect(String(component.control.value).length).toBe(4);
  });
});
