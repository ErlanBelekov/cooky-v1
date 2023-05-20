export enum Routes {
  Explore = "/app/explore",
  Diets = "/app/diets",
  Settings = "/app/settings",
  Login = "/auth/login",
  RecipeById = "/app/recipe/",
}

export class DynamicRoutes {
  static shared = new DynamicRoutes();

  public recipeById(recipeId: string): string {
    return `/app/recipe/${recipeId}`;
  }
}
