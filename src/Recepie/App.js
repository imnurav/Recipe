import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";
const App = () => {
  const App_id = "962a6fa1";
  const App_key = "6f8dc6271d6b5b1c9b9be66a7f800e16";
  const [recipes, setrecipe] = useState([]);
  const [search, setsearch] = useState("");
  const [query, setquery] = useState("potato");
  useEffect(() => {
    getRecipes();
  }, [query]);
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${App_id}&app_key=${App_key}&from=0&to=3&calories=591-722&health=alcohol-free`
    );
    const data = await response.json();
    setrecipe(data.hits);
    // console.log(data);
  };

  const UpdateSearch = (e) => {
    setsearch(e.target.value);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setquery(search);
    setsearch("");
  };
  return (
    <>
      <div className="App">
        <form className="search-form" onSubmit={getSearch}>
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={UpdateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="recipies">
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.calories}
              title={recipe.recipe.label}
              ingredients={recipe.recipe.ingredients}
              image={recipe.recipe.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default App;
