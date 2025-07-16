import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = '/api/recipes';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<{ recipes: Recipe[] }> {
    return this.http.get<{ recipes: any[] }>(this.apiUrl).pipe(
      map(response => ({
        recipes: response.recipes.map(r => ({
          ...r,
          ingredients: r.ingredients ? r.ingredients.split(',').map((i: string) => i.trim()) : []
        }))
      }))
    );
  }

  getRecipe(id: number): Observable<{ recipe: Recipe }> {
    return this.http.get<{ recipe: any }>(`${this.apiUrl}/${id}`).pipe(
      map(response => ({
        recipe: {
          ...response.recipe,
          // Corrected ingredients parsing from space-separated to comma-separated
          ingredients: response.recipe.ingredients ? response.recipe.ingredients.split(',').map((i: string) => i.trim()) : []
        }
      }))
    );
  }

  createRecipe(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  updateRecipe(id: number, recipe: Partial<Recipe>): Observable<{ updated: number }> {
    return this.http.put<{ updated: number }>(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipe(id: number): Observable<{ deleted: number }> {
    return this.http.delete<{ deleted: number }>(`${this.apiUrl}/${id}`);
  }
}