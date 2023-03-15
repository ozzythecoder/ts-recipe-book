

export const getRecipes = async () => {
  const dataRes = await fetch(`http://localhost:3000/api/recipe`, { method: 'GET' })
  const data = await dataRes.json()
  return data;
}

export const getRecipesById = async (searchIdIn: string) => {
  const dataRes = await fetch(`http://localhost:3000/api/recipe/${searchIdIn}`, { method: "GET" })
  const data = await dataRes.json()
  return data;
}
