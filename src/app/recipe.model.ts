export interface Recipe {
  id: number;
  title: string;
  imageUrl?: string;
  summary?: string;
  category?: string;
  cuisine?: string;
  ingredients: string[];
  instructions: string;
}