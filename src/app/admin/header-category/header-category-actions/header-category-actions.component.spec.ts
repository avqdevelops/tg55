import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCategoryActionsComponent } from './header-category-actions.component';

describe('HeaderCategoryActionsComponent', () => {
  let component: HeaderCategoryActionsComponent;
  let fixture: ComponentFixture<HeaderCategoryActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCategoryActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCategoryActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
