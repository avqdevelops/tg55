import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryComponentHeader } from './sub-category.component';

describe('SubCategoryComponent', () => {
  let component: SubCategoryComponentHeader;
  let fixture: ComponentFixture<SubCategoryComponentHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryComponentHeader ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryComponentHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
