import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsAndPreviewsDetailsComponent } from './tips-and-previews-details.component';

describe('TipsAndPreviewsDetailsComponent', () => {
  let component: TipsAndPreviewsDetailsComponent;
  let fixture: ComponentFixture<TipsAndPreviewsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TipsAndPreviewsDetailsComponent]
    });
    fixture = TestBed.createComponent(TipsAndPreviewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
