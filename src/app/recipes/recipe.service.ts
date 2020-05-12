import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "Pasta",
      "Making your own pasta sauce is so easy. Once you try it, you’ll wonder why you felt so dependent on jarred pasta sauces.",
      "./../../../assets/pasta.jpg",
      [
        new Ingredient("tablespoons olive oil", 3),
        new Ingredient("large onion (finely chopped, about 1 cup)", 1),
        new Ingredient("teaspoon garlic (finely minced)", 1),
        new Ingredient("(28-ounce) cans tomatoes (crushed, in purée)", 2),
        new Ingredient("tablespoons tomato paste", 3)
      ]
    ),
    new Recipe(
      "Chicken Marsala",
      "Chicken Marsala is an Italian-American dish of golden pan-fried chicken cutlets and mushrooms.",
      "./../../../assets/chicken-marsala.jpg",
      [
        new Ingredient(
          "pounds boneless skinless chicken breasts, pounded ¼-inch thick ",
          1 / 2
        ),
        new Ingredient("tablespoons all-purpose flour", 3),
        new Ingredient("tablespoon olive oil", 1),
        new Ingredient("Freshly ground black pepper", 1)
      ]
    )
  ];
  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
    console.log(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
