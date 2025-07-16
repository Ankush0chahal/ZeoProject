import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecipeList } from './recipe-list';

describe('RecipeList', () => {
  let component: RecipeList;
  let fixture: ComponentFixture<RecipeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeList, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
