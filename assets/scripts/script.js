$(function () {
	//This is our API Key
	var APIKey = "a195f2b0d154e3f67cf10cc5aa7ae73a";

	$("#search").on("click", function (event) {
		event.preventDefault();

		const searchTerm = $("#search-term").val();

		// get list of search terms from local storage
		// convert string to object - JSON.parse()
		// unshift search term to put it at the front of the array
		// use JSON.stringify to term the array back into a string
		// update localstorage

		getWeather(searchTerm);
	});

	function getWeather(searchTerm) {
		// Here we are building the URL we need to query the database
		// We then created an AJAX call
		$.ajax({
			url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + APIKey + "&units=imperial",
			method: "GET",
		}).then(function (response) {
			// Log the queryURL

			// Transfer content to HTML
			$(".city").html("<h1>" + response.name + " Weather Details</h1>");
			$(".temp").text("Temperature(F) " + response.main.temp);
			$(".wind").text("Wind Speed: " + response.wind.speed);
			$(".humidity").text("Humidity: " + response.main.humidity);
			//need to find correct key value

			getForecast(searchTerm);
			getUVIndex(response.coord.lat, response.coord.lon);
		});
	}

	function getForecast(searchTerm) {
		$.ajax({
			url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=" + APIKey + "&units=imperial",
			method: "GET",
		}).then(function (response) {
			console.log(response);

			//get element by id 5-day-forecast
			// create 5 cards - 1 for each day
			// append each card to that element

			/*			
	<div class="card" style="width: 18rem">
		<div class="card-body">
			<h5 class="card-title">Card title</h5>
			<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
			<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			<a href="#" class="card-link">
				Card link
			</a>
			<a href="#" class="card-link">
				Another link
			</a>
		</div>
	</div>;*/
		});
	}

	function getUVIndex(lat, long) {
		console.log(lat, long);

		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + long,
			method: "GET",
		}).then(function (response) {
			console.log(response);

			$(".uvIndex").text("UV Index: " + response.value);
		});
	}

	// read the search list from localstorage
	// if it doesn't exist create an empty array and
	//     - use JSON.stringify to convert to a string
	//     - put that in local storage
	// if it does exist use JSON.parse to convert to an array
	//     - use the array to build out the left nav - on each item add a data attribute of which its value will be the searTerm - aka the city.
	//     - add a click event handler.  when clicking on any item, call getWeather and pass the appropriate searchTerm
});
