import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStreemComponent } from './live-streem.component';

describe('LiveStreemComponent', () => {
  let component: LiveStreemComponent;
  let fixture: ComponentFixture<LiveStreemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveStreemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveStreemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
