import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponentHeader } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryComponentHeader;
  let fixture: ComponentFixture<CategoryComponentHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryComponentHeader ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponentHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
