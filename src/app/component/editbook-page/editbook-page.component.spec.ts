import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbookPageComponent } from './editbook-page.component';

describe('EditbookPageComponent', () => {
  let component: EditbookPageComponent;
  let fixture: ComponentFixture<EditbookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditbookPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditbookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
