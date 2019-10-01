import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEnTransitoPage } from './stock-en-transito.page';

describe('StockEnTransitoPage', () => {
  let component: StockEnTransitoPage;
  let fixture: ComponentFixture<StockEnTransitoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockEnTransitoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEnTransitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
