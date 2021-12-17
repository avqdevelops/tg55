import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryComponentCatalog } from './sub-category.component';

describe('SubCategoryComponent', () => {
  let component: SubCategoryComponentCatalog;
  let fixture: ComponentFixture<SubCategoryComponentCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryComponentCatalog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryComponentCatalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
