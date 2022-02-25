document.getElementById('button__feild').addEventListener('click', () => {
  const input = document.getElementById('button__feild').value;
  document.getElementById('button__feild').value = '';
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(info.meals);
      for (const info of data.meals) {
        const col = document.createElement('col');
        console.log(info);
        col.innerHTML = `
        <div class="card h-100">
          <img src="${info.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h4 class="card-title">Food title: ${info.strMeal}</h4>
            <p class="card-text">${info.strInstructions.slice(0, 150)}...</p>
            <button class="btn btn-outline-success shadow-none col-12" type="button" id="button__feild__two">Know More</button>
          </div>
          <div class="card-footer bg-white d-flex justify-content-between">
            <small class="text-muted">Origin: ${info.strArea}</small>
            <small class="text-muted">Catagory: ${info.strCategory}</small>
          </div>
        </div>
        `;
        document.getElementById('card__show').appendChild(col);
      }
    });
});
