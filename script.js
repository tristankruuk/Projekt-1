// API url (andmebaas)
const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// Fetch data from the server
async function fetchData() {
    for (let j = 0; j < 30; j++) {
        const response = await fetch(url);
        const data = await response.json();

        // Create container for each cocktail
        const cocktailContainer = document.createElement('div');
        cocktailContainer.classList.add('Cocktail');

        // Upper section
        const Upper = document.createElement('div');
        Upper.classList.add('Upper');

        // Image Element
        const ImageElement = document.createElement('div');
        const strDrinkThumb = data.drinks[0].strDrinkThumb;
        ImageElement.innerHTML = `<img src="${strDrinkThumb}" style="height: 200px;">`;
        Upper.appendChild(ImageElement); // Add image to Upper

        // Header section (title and alcoholic status)
        const Header = document.createElement('div');
        Header.classList.add('Header');

        // Title and Drink Name
        const Title = document.createElement('div');
        const strDrink = data.drinks[0].strDrink;
        Title.classList.add('Title');
        Title.innerHTML = `<h1 class="DrinkName">${strDrink}</h1>`;
        Header.appendChild(Title);

        // Status (alcoholic or non-alcoholic)
        const StatusElement = document.createElement('div');
        const strAlcoholic = data.drinks[0].strAlcoholic;
        StatusElement.classList.add('Status');
        StatusElement.innerHTML = `<p>${strAlcoholic} Drink</p>`;
        Header.appendChild(StatusElement);

        // Append Header to Upper
        Upper.appendChild(Header);
        cocktailContainer.appendChild(Upper); // Add Upper to cocktailContainer

        // Lower section (Instructions, Ingredients, and Measurements)
        const lower = document.createElement('div');
        lower.classList.add('Lower');

        // Instructions Box
        const InstructionsBox = document.createElement('div');
        InstructionsBox.classList.add('InstructionsBox');
        const strInstructions = data.drinks[0].strInstructions;
        InstructionsBox.innerHTML = `<h2 class="Instructions">Instructions:</h2><p>${strInstructions}</p>`;
        lower.appendChild(InstructionsBox);

        // Ingredients Box (separate div for ingredients)
        const IngredientsBox = document.createElement('div');
        IngredientsBox.classList.add('IngredientsBox');
        IngredientsBox.innerHTML = '<h2 class="Ingredients">Ingredients:</h2>';

        // Measurements Box (separate div for measurements)
        const MeasurementsBox = document.createElement('div');
        MeasurementsBox.classList.add('MeasurementsBox');

        // Measurements
        const Measurements = document.createElement('div');
        Measurements.classList.add('Measurements');

        MeasurementsBox.appendChild(Measurements);

        // Loop through ingredients and measurements
        for (let i = 1; i <= 15; i++) {
            const ingredient = data.drinks[0][`strIngredient${i}`];
            const measurement = data.drinks[0][`strMeasure${i}`];
            
            // Add ingredient to IngredientsBox
            if (ingredient) {
                IngredientsBox.innerHTML += `<p>${ingredient}</p>`;
            }
            
            // Add measurement to MeasurementsBox
            if (measurement) {
                Measurements.innerHTML += `<p>${measurement}</p>`;
            }
        }

        // Append both IngredientsBox and MeasurementsBox to the lower section
        lower.appendChild(IngredientsBox);
        lower.appendChild(MeasurementsBox);

        // Append the lower section to the cocktail container
        cocktailContainer.appendChild(lower);

        // Finally, append the cocktail container to the body or a specific element
        document.body.appendChild(cocktailContainer);
    }
}

// Call the function to fetch data
fetchData();