import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesPedidasPage } from './unidades-pedidas.page';

describe('UnidadesPedidasPage', () => {
  let component: UnidadesPedidasPage;
  let fixture: ComponentFixture<UnidadesPedidasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesPedidasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesPedidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
