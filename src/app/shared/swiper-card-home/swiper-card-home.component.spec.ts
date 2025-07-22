import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperCardHomeComponent } from './swiper-card-home.component';

describe('SwiperCardHomeComponent', () => {
  let component: SwiperCardHomeComponent;
  let fixture: ComponentFixture<SwiperCardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperCardHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperCardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
