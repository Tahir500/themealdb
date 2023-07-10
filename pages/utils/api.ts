export const API = "https://www.themealdb.com";

export const fetchList = () =>
  fetch(`${API}/api/json/v1/1/list.php?i=list`).then(res => res.json());

export const fetchIngredient = (id: string) =>
  fetch(`${API}/api/json/v1/1/filter.php?i=${id}`).then(res => res.json());

export const fetchMeal = (id: string) =>
  fetch(`${API}/api/json/v1/1/lookup.php?i=${id}`).then(res => res.json());
