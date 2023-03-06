//handle the submit button
const form = document.querySelector("#search-stock");	
form.addEventListener("submit", handleSubmit);

function handleSubmit() {
	event.preventDefault();
	let symbol = event.target.symbol.value;
	API.get(`${BASE_URL}${symbol}`);
}
//URL WITH MY API KEY
const BASE_URL = "https://www.alphavantage.co/query?apikey=L1INW68U5A22VNP2&function=TIME_SERIES_MONTHLY_ADJUSTED&datatype=json&symbol=";

API = { get };
//GET FUNCTION
function get(url) {
	return fetch(url)
	.then(response => response.json())
	.then(data => formatData(data))
	.then(result => {
		chart.innerText = "";
		new ApexCharts(document.querySelector("#chart"), options).render();
	});
}
//FORMAT DATA FUNCTION
function formatData(stockData) {
	options.title.text = stockData["Meta Data"]["2. Symbol"];
	let solution = [];
	Object.entries(stockData["Monthly Adjusted Time Series"]).forEach(
		([month, monthlyPrices]) => {
			let obj = {};
			obj.x = new Date(month);
			let prices = [];
			prices.push(monthlyPrices["1. open"]);
			prices.push(monthlyPrices["2. high"]);
			prices.push(monthlyPrices["3. low"]);
			prices.push(monthlyPrices["4. close"]);
			obj.y = prices;
			solution.push(obj);
		},
		);
	options.series[0].data = solution.sort((a, b) => a.x - b.x);
}

const chart = document.querySelector("#chart");

let options = {
chart: { type: "candlestick",},
series: [
	{ 
		data: [],
	},],
title: {
	text: "",
	align: "center",
},
xaxis: {
	type: "datetime",
},
yaxis: {
	tooltip: {
		enabled: true,
	},
},
};

const storageInput = document.querySelector('.storage');
const text = document.querySelector('.text');
const button = document.querySelector('.addStock');
const storedInput = localStorage.getItem('slot1');

//////////////////////////////////////////////////////////
//Search Function

document.getElementById("search-stock").addEventListener("submit", function(event) {
	event.preventDefault();
	const symbol = document.getElementById("search-bar").value;
	fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=3C7FVRDGXUUJAQIO`)
	  .then(response => response.json())
	  .then(data => {
		if (data.bestMatches.length > 0) {
		  alert(`${symbol} is a valid stock symbol!`);
		} else {
		  alert(`${symbol} is not a valid stock symbol.`);
		}
	  });
  });


//////////////////////////////////////////////////////////

if (storageInput)
{
	text.textcontent = storedInput; 
}


storageInput.addEventListener('addStock', letter => 
{
	text.textContent = letter.target.value; 

})

const saveToLocalStorage = () => 
{
	localStorage.setItem('slot1', text.textContent); 
}

button.addEventListener('addStock', saveToLocalStorage);