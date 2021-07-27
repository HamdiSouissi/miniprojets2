import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStatComponent } from './live-stat.component';

describe('LiveStatComponent', () => {
  let component: LiveStatComponent;
  let fixture: ComponentFixture<LiveStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
