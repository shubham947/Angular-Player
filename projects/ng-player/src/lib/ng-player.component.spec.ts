import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPlayerComponent } from './ng-player.component';

describe('NgPlayerComponent', () => {
  let component: NgPlayerComponent;
  let fixture: ComponentFixture<NgPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
