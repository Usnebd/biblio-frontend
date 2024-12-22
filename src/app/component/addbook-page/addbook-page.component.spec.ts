import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbookPageComponent } from './addbook-page.component';

describe('AddbookPageComponent', () => {
  let component: AddbookPageComponent;
  let fixture: ComponentFixture<AddbookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddbookPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
