import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css'
})
export class RecipeForm implements OnInit {
  recipeForm: FormGroup;
  isEditMode = false;
  currentRecipeId: number | null = null;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  constructor() {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      imageUrl: ['', [Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i)]],
      summary: ['', Validators.maxLength(500)],
      category: ['', Validators.required],
      cuisine: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required]
    });
  }

  // Getter for easy access to form controls in the template
  get f() {
    return this.recipeForm.controls;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.currentRecipeId = Number(id);
        this.recipeService.getRecipe(this.currentRecipeId).subscribe(response => {
          const recipe = response.recipe;
          if (recipe) {
            this.recipeForm.patchValue({
              title: recipe.title,
              imageUrl: recipe.imageUrl,
              summary: recipe.summary,
              category: recipe.category,
              cuisine: recipe.cuisine,
              ingredients: recipe.ingredients.join(', '),
              instructions: recipe.instructions
            });
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      // Mark all fields as touched to display validation errors
      this.recipeForm.markAllAsTouched();
      return;
    }

    const formValue = this.recipeForm.value;
    const recipeData = {
      ...formValue,
      ingredients: formValue.ingredients.split(',').map((item: string) => item.trim())
    };

    if (this.isEditMode && this.currentRecipeId) {
      this.recipeService.updateRecipe(this.currentRecipeId, recipeData)
        .subscribe(() => this.router.navigate(['/recipes', this.currentRecipeId]));
    } else {
      this.recipeService.createRecipe(recipeData)
        .subscribe((newRecipe: Recipe) => this.router.navigate(['/recipes', newRecipe.id]));
    }
  }
}