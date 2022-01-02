import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCarsComponent } from './catalog-cars.component';

describe('CatalogCarsComponent', () => {
  let component: CatalogCarsComponent;
  let fixture: ComponentFixture<CatalogCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
