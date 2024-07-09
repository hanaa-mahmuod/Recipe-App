const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeDetails=document.querySelector('.recipe-details');
const recipeContainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');

//function to get recipes
const fetchRecipes =async (query) =>{
    try{
        recipeContainer.innerHTML='<h2>featching Recipes...</h2>';
        const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        
        const response= await data.json();
        recipeContainer.innerHTML='';
        response.meals.forEach(meal=>{
          const recipeDiv=document.createElement('div');
          recipeDiv.classList.add('recipe');
          recipeDiv.innerHTML=`
          <img src=${meal.strMealThumb}>
          <h3>${meal.strMeal}</h3>
          
          <p><span>${meal.strArea}</span> Dish</p>
          <p>Belongs to <span>${meal.strCategory}</span> Category</p>
          
          `
        const button=document.createElement('button');
        button.textContent='View Recipe';
        recipeDiv.appendChild(button);
        button.addEventListener('click',function(){
        openRecipePopup(meal);
        });
           recipeContainer.appendChild(recipeDiv);
        });
        
    }
    catch(error)
    {
recipeContainer.innerHTML='<h2> Error in fetching Recipes...</h2>';
    }
 

}
 //function to fetch ingredents
const fetchIngredents=(meal)=>{
    let ingredentList="";
for(let i=1;i<=20;i++)
{
    const ingredent=meal[`strIngredient${i}`];
    if(ingredent)
    {
        const measure=meal[`strMeasure${i}`];
        ingredentList +=`<li>${measure} ${ingredent}</li>`
    }
    else
    {
        break;
    }
    
}
return ingredentList;
}



const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class='recipeName'>${meal.strMeal}</h2>
     <h3>Ingredents:</h3>
     <ul class='ingredentList'>${fetchIngredents(meal)}</ul>
<div>
<h3>Instructions:</h3>
<p class='recipeIntructions'>${meal.strInstructions}</p>
<div/>
    `
    recipeDetailsContent.parentElement.style.display='block';
}
recipeCloseBtn.addEventListener('click',function(){
    recipeDetailsContent.parentElement.style.display='none';
})
searchBtn.addEventListener('click',function(e){
e.preventDefault();
const searchInput=searchBox.value.trim();
if(!searchInput)
{
    recipeContainer.innerHTML=`<h2>Type the meal in the search box</h2>`
   return; 
}
fetchRecipes(searchInput);



});