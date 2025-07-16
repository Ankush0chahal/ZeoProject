import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.css']
})
export class RecipeList implements OnInit {
  searchTerm: string = '';
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  // Injected RecipeService and Router
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  ngOnInit() {
    // Load recipes from the service on initialization
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe(response => {
      this.recipes = response.recipes;
      this.filteredRecipes = this.recipes;
    });
  }

  onSearchTermChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term)
    );
  }

  editRecipe(id: number) {
    // Corrected navigation to match the route definition 'recipes/:id/edit'
    this.router.navigate(['/recipes', id, 'edit']);
  }

  deleteRecipe(id: number) {
    // Implemented the delete functionality
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id).subscribe(() => {
        // On successful deletion, filter out the deleted recipe from the local array
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        this.onSearchTermChange(); // Re-apply search filter
      });
    }
  }

  viewRecipe(id: number) {
    this.router.navigate(['/recipes', id]);
  }
}