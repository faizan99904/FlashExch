import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffliateComponent } from './affliate.component';

describe('AffliateComponent', () => {
  let component: AffliateComponent;
  let fixture: ComponentFixture<AffliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffliateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
