import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MediaQueryStatusComponent } from './media-query-status.component';

describe('MediaQueryStatusComponent', () => {
  let component: MediaQueryStatusComponent;
  let fixture: ComponentFixture<MediaQueryStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [MediaQueryStatusComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaQueryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
