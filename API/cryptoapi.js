// var urlSearch = 'https://www.worldcoinindex.com/apiservice/';
// var query = 'json?';
// var apiKey = 'key=d7vGJQ7ho5Xl790ZPBpegjWfBGPntU';
// var text; 
// https://www.worldcoinindex.com/apiservice/json?key=d7vGJQ7ho5Xl790ZPBpegjWfBGPntU

//https://api.giphy.com/v1/gifs/search?q=doge&api_key=W6EoCb8070RoeMOEg3CTCdAPcugZv2Rc&limit=5

//fetch('https://www.worldcoinindex.com/apiservice/ticker?key=d7vGJQ7ho5Xl790ZPBpegjWfBGPntU&label=ethbtc-ltcbtc&fiat=btc')
fetch('https://www.worldcoinindex.com/apiservice/ticker?key=d7vGJQ7ho5Xl790ZPBpegjWfBGPntU&label=ethbtc-ltcbtc&fiat=btc')
	.then(function(response){
		return response.json();
	})
	.then(function(data){
		render(data);
	});

var labelSpan = document.querySelector('#label');
// var nameSpan = document.querySelector('#name');
// var priceSpan = document.querySelector('#price');
// var volumeSpan = document.querySelector('#volume');


function render(data){
	console.log(data);
	// console.log(data.data[1].images.original.url);
	// for (var i = 0; i < data.data.length; i++){
		// labelSpan.innerText = data.data[1].images.original.url;
	//}

	// nameSpan.innerText = data.Markets[0].Name;
	// priceSpan.innerText = data.Markets[0].Price_usd;
	// volumeSpan.innerText = data.Markets[0].Volume_24h;
}


