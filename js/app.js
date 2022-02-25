document.getElementById('spinner__div').style.display = 'none';
document.getElementById('button__feild').addEventListener('click', () => {
  document.getElementById('spinner__div').style.display = 'block';
  const input = document.getElementById('input__feild').value;
  document.getElementById('input__feild').value = '';
  document.getElementById('card__show').textContent = '';
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(info.meals);
      console.log(data);
      if (data.meals == null) {
        console.log('nonr');
        const col = document.createElement('div');
        col.classList.add('col-12');
        col.textContent = '';
        // console.log(info);
        col.innerHTML = `<h1 class="text-center">Data not found. The food is either finished or you entered wrong name.</h1>
        `;
        document.getElementById('card__show').appendChild(col);
        document.getElementById('spinner__div').style.display = 'none';
      } else {
        for (const info of data.meals) {
          const col = document.createElement('div');
          col.classList.add('col');
          col.textContent = '';
          console.log(info);
          col.innerHTML = `
        <div class="card h-100">
          <img src="${info.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h4 class="card-title">Food title: ${info.strMeal}</h4>
            <p class="card-text">${info.strInstructions.slice(0, 150)}...</p>
            <a href= "#card__details__img" class="btn btn-outline-success shadow-none col-12" type="button" onclick="foodDetails(${
              info.idMeal
            })">Know More</a>
          </div>
          <div class="card-footer bg-white d-flex justify-content-between">
            <small class="text-muted">Origin: ${info.strArea}</small>
            <small class="text-muted">Catagory: ${info.strCategory}</small>
          </div>
        </div>
        `;
          document.getElementById('card__show').appendChild(col);
          document.getElementById('spinner__div').style.display = 'none';
        }
      }
    });
});

const foodDetails = (info) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${info}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('card__details').textContent = '';
      for (const info of data.meals) {
        const col = document.createElement('div');
        col.classList.add('col');
        col.textContent = '';
        console.log(info.idMeal);
        col.innerHTML = `
        <div id="card__details__img" class="card h-100 my-4">
        <img style="height: 30rem; width: auto" src="${info.strMealThumb}">
        <div class="card-body">
          <h4 class="card-title">Food title: ${info.strMeal}</h4>
          <p class="card-text">${info.strInstructions}</p>
        </div>
        <a href="${info.strYoutube}" target="_blank" ><button class="btn btn-outline-success shadow-none col-12 my-2">See Video</button> </a>
        <div class="card-footer bg-white d-flex justify-content-between">
          <small class="text-muted">Origin: ${info.strArea}</small>
          <small class="text-muted">Catagory: ${info.strCategory}</small>
        </div>
      </div>
      `;
        document.getElementById('card__details').appendChild(col);
      }
    });
};
