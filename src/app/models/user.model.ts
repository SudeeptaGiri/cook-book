export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  region: string;
  favorites: any[];
  recipes: any[];
  password?: string; 
}