import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RecipeService } from '../services/recipe';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe | undefined> {
  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe | undefined> {
    const id = Number(route.paramMap.get('id'));
    if (isNaN(id)) {
      return of(undefined);
    }
    return this.recipeService.getRecipe(id).pipe(
      map(response => {
        if (response && response.recipe) {
          return response.recipe;
        }
        return undefined;
      }),
      catchError(() => of(undefined))
    );
  }
}
