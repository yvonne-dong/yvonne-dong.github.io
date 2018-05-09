var req = new XMLHttpRequest();

req.onload = function(){
  console.log(JSON.parse(this.responseText));  
};
req.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');

function render(){
  req.send();
}