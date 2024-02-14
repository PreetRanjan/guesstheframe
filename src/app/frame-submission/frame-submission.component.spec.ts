import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameSubmissionComponent } from './frame-submission.component';

describe('FrameSubmissionComponent', () => {
  let component: FrameSubmissionComponent;
  let fixture: ComponentFixture<FrameSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
