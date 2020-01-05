import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewPhotoDetailsComponent} from './view-photo-details.component';

describe('ViewPhotoDetailsComponent', () => {
  let component: ViewPhotoDetailsComponent;
  let fixture: ComponentFixture<ViewPhotoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPhotoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPhotoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
