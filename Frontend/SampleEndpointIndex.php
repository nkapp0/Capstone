<?php

?><!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <title>Mizzou101 - Home</title>
  </head>
  <body>
    <h1>Mizzou101</h1>
<p>Team Azul</p>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	  <h1>Atlas Mongo Database Viewer</h1>
    <ul id="nameList"></ul>

    <script>
        // Fetch data from API endpoint
        fetch('https://nodejs.mizzou101.com/api/data/FoodDrink')
            .then(response => response.json())
            .then(data => {
                const nameList = document.getElementById('nameList');
                // Clear any existing items
                nameList.innerHTML = '';

                // Loop through the data and create list items
                data.forEach(item => {
                    // Assuming 'Name' is the field you want to display
                    const nameItem = document.createElement('li');
                    nameItem.textContent = item.Name;
                    nameList.appendChild(nameItem);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    </script>

  </body>
</html>

<?php wp_footer(); ?>
