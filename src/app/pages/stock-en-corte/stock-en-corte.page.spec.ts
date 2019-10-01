import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEnCortePage } from './stock-en-corte.page';

describe('StockEnCortePage', () => {
  let component: StockEnCortePage;
  let fixture: ComponentFixture<StockEnCortePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockEnCortePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEnCortePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
