import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillHelpDialogComponent } from './quill-help.component';
import { PipesModule } from '@shared/pipes/pipes.module';

describe('QuillHelpDialogComponent', () => {
  let component: QuillHelpDialogComponent;
  let fixture: ComponentFixture<QuillHelpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuillHelpDialogComponent ],
      imports: [
        PipesModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should show a list of icons and text', () => {
    const element: HTMLElement = fixture.nativeElement;
    const div = element.querySelectorAll(".item"); 
    const total = component.actionItems.length + component.toolbarItems.length;
    expect(div.length).toBe(total);
  });

});
