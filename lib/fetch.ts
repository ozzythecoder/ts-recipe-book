

export const getRecipes = async () => {
  try {
    const dataRes = await fetch(`http://localhost:3000/api/recipe`, { method: 'GET', cache: "no-store" })
    const data = await dataRes.json()
    return data;
  } catch (e) {
    console.log(e)
  }
}

export const getRecipesById = async (searchIdIn: string) => {
  const dataRes = await fetch(`http://localhost:3000/api/recipe/${searchIdIn}`, { method: "GET", cache: "no-store" })
  const data = await dataRes.json()
  return data;
}
