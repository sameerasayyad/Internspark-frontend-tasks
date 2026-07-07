const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const foodContainer = document.getElementById("foodContainer");

searchBtn.addEventListener("click",searchFood);

searchInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

searchFood();

}

});

function searchFood(){

const food=searchInput.value.trim();

if(food===""){

alert("Please Enter Food Name");

return;

}

foodContainer.innerHTML="<h3 class='loading'>Loading...</h3>";

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)

.then(res=>res.json())

.then(data=>{

foodContainer.innerHTML="";

if(data.meals==null){

foodContainer.innerHTML="<h2 class='text-center text-danger'>No Food Found</h2>";

return;

}

data.meals.forEach(meal=>{

foodContainer.innerHTML+=`

<div class="col-md-4">

<div class="card">

<img src="${meal.strMealThumb}" class="card-img-top">

<div class="card-body">

<h4 class="card-title">${meal.strMeal}</h4>

<p><b>Category:</b> ${meal.strCategory}</p>

<p><b>Area:</b> ${meal.strArea}</p>

<p>${meal.strInstructions.substring(0,120)}...</p>

<a href="${meal.strYoutube}" target="_blank" class="btn btn-success">

Watch Recipe

</a>

</div>

</div>

</div>

`;

});

})

.catch(()=>{

foodContainer.innerHTML="<h2 class='text-danger text-center'>Something Went Wrong</h2>";

});

}