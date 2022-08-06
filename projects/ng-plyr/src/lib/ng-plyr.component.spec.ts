import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPlyrComponent } from './ng-plyr.component';

describe('NgPlyrComponent', () => {
  let component: NgPlyrComponent;
  let fixture: ComponentFixture<NgPlyrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgPlyrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPlyrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
