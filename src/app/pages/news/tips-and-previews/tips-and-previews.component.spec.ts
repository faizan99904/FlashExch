import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsAndPreviewsComponent } from './tips-and-previews.component';

describe('TipsAndPreviewsComponent', () => {
  let component: TipsAndPreviewsComponent;
  let fixture: ComponentFixture<TipsAndPreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TipsAndPreviewsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(TipsAndPreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
