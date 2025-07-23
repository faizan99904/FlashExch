import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigamesComponent } from './minigames.component';

describe('MinigamesComponent', () => {
  let component: MinigamesComponent;
  let fixture: ComponentFixture<MinigamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinigamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
