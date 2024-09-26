"use scrict"

const recipeInfoSection = recipeSection

const baseUrl = "https://www.themealdb.com/api/json/v1/1"

const numRecipesToShow = 10
const maxIngredients = 20

const handleRecipe = function(data){
    
    const recipe = data.meals[0];

    console.log(recipe)

    const recipeLink = document.createElement("a");
    recipeLink.innerText = recipe.strMeal;
    recipeLink.setAttribute("href", "#");

        recipeLink.addEventListener("click", function(){
            recipeInfoSection.innerHTML = ""
            let recipeInfo = `
                <header>
                    <h2>
                        <h2>${recipe.strMeal}</h2>
                    </h2>
                </header>
                <img src=${recipe.strMealThumb}>
                <p>${recipe.strInstructions}</p>
                <ul>
            `;

            for(let i = 0; i < maxIngredients; i++){
                const ingredient = recipe[`strIngredient${i + 1}`]
                if(ingredient !== "" && ingredient !== null){
                    // const measure = recipe[`strMeasure${index +1}`]
                    recipeInfo += `<li>${ingredient}</li>`
                }
            }

            recipeInfo += `</ul>`

            let youtubeID = recipe.strYoutube;
            youtubeID = youtubeID.substring(youtubeID.length - 11)

            recipeInfo += `
            <iframe src="https://www.youtube.com/embed/${youtubeID}?si=qKpBGS6DBOi9xsph"
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>`
            recipeInfoSection.innerHTML = recipeInfo;

            
        })
    const recipeListItem = document.createElement("li");
    recipeListItem.append(recipeLink);
    document.querySelector("ul").append(recipeListItem);
    
  

}

for (let i = 0; i < numRecipesToShow; i++){
  fetch(baseUrl + "/random.php")
  .then(response => response.json())
  .then(handleRecipe)
  .catch((error) =>{
    console.error(error)
  })

}



