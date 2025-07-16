import { Routes } from '@angular/router';
import { RecipeList } from './components/recipe-list/recipe-list';
import { RecipeDetail } from './components/recipe-detail/recipe-detail';
import { RecipeForm } from './components/recipe-form/recipe-form';

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeList },
  { path: 'recipes/new', component: RecipeForm },
  // Removed the resolver for simplification as the component handles its own data fetching
  { path: 'recipes/:id', component: RecipeDetail },
  { path: 'recipes/:id/edit', component: RecipeForm }
];