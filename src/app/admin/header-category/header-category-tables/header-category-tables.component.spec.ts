import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCategoryTablesComponent } from './header-category-tables.component';

describe('HeaderCategoryTablesComponent', () => {
  let component: HeaderCategoryTablesComponent;
  let fixture: ComponentFixture<HeaderCategoryTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCategoryTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCategoryTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
