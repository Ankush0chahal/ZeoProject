import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetail implements OnInit {
  protected recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  recipe: Recipe | undefined;
  instructionsSteps: string[] = [];

  private splitInstructions(instructions: string): string[] {
    if (!instructions) return [];
    const steps = instructions
      .split(/(?:\d+\.\s*|\n+|\. )+/)
      .map(step => step.trim())
      .filter(step => step.length > 0);
    return steps;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.recipeService.getRecipe(id).subscribe((data: any) => {
        this.recipe = data.recipe;
        if (this.recipe && this.recipe.instructions) {
          this.instructionsSteps = this.splitInstructions(this.recipe.instructions);
        }
      });
    });
  }

  deleteRecipe(): void {
    if (this.recipe && this.recipe.id) {
      if (confirm(`Are you sure you want to delete "${this.recipe.title}"?`)) {
        this.recipeService.deleteRecipe(this.recipe.id).subscribe(() => {
          this.router.navigate(['/recipes']); // Navigate to recipe list after delete
        });
      }
    }
  }
}