import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificioCardComponent } from './edificio-card.component';

describe('EdificioCardComponent', () => {
  let component: EdificioCardComponent;
  let fixture: ComponentFixture<EdificioCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdificioCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdificioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
