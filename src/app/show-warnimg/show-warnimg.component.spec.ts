import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWarnimgComponent } from './show-warnimg.component';

describe('ShowWarnimgComponent', () => {
  let component: ShowWarnimgComponent;
  let fixture: ComponentFixture<ShowWarnimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWarnimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWarnimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
