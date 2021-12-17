import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponentCatalog } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryComponentCatalog;
  let fixture: ComponentFixture<CategoryComponentCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryComponentCatalog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponentCatalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
