import React,{useEffect, useState}from 'react';
import './App.css';
import Recipe from './Recipe'

const App = () => {


const APP_ID="9256ed6d";
const APP_KEY="cd1065bbf7041519ec5bd8399dcee27c";

const[recipes, setRecipes] = useState([]);
const[search , setSearch]= useState("");
const[query,setQuery]=useState('chicken'); 

useEffect(() =>{
  getRecipes();
}, [query] );

 const getRecipes = async () => {
   const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
   const data = await response.json();


   setRecipes(data.hits);
  console.log(data.hits);


 }


const updateSearch = e => {
  setSearch(e.target.value);
  console.log(search)

}


const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch(''); 
}


  return(
    <div className="App">
      <form  onSubmit={getSearch}  className="search-form" >
       <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button " type="submit">search</button>
      </form>


      <div className="recipes">
    {recipes.map( recipe=>(

      <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              ingredients={recipe.recipe.ingredients }
              image={recipe.recipe.image}/>
      
    ))}
    </div>

    </div>
  )
}

export default App;
