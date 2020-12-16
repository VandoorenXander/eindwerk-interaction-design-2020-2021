
const tijdMaken = async ()=>
{
	 setTimeout( async function(){
		const timestamp= await fetch(`https://api.coinbase.com/v2/time`)
		.then((r) => r.json())
		.catch((err) => console.error('an error'));
		var datumconv=new Date(0);
		datumconv.setUTCSeconds(timestamp.data.epoch);
		let time = datumconv.getDate() +"/"+  datumconv.getMonth() +"/"+ datumconv.getFullYear() +" "+ datumconv.getHours() + ":" + doMinutesThingy(datumconv.getMinutes()) + ":" + doMinutesThingy(datumconv.getSeconds());
		console.log(time);
		document.querySelector(".js-Date").innerHTML= time;
		await tijdMaken();
	 }, 1000);
	//console.log(datumconv);
}
const statischtijd = async()=>
{

	const timestamp= await fetch(`https://api.coinbase.com/v2/time`)
		.then((r) => r.json())
		.catch((err) => console.error('an error'));
		var datumconv=new Date(0);
		datumconv.setUTCSeconds(timestamp.data.epoch);
		let time = datumconv.getDate() +"/"+  datumconv.getMonth() +"/"+ datumconv.getFullYear() +" "+ datumconv.getHours() + ":" + doMinutesThingy(datumconv.getMinutes()) + ":" + doMinutesThingy(datumconv.getSeconds());
		document.querySelector(".js-Date-static").innerHTML= time;
}

const doMinutesThingy = function(n) {
    return n < 10 ? '0' + n : n;
}

const Buyprice=async (currency) =>
{
	const data= await fetch(`https://api.coinbase.com/v2/prices/${currency}/buy`)
	.then((r) => r.json())
	.catch((err) => console.error('an error'));
	console.log(data);
	document.querySelector(".js-buyprice").innerHTML= "€" + " "  + data.data.amount;
}

const Sellprice=async (currency) =>
{
	const data= await fetch(`https://api.coinbase.com/v2/prices/${currency}/sell`)
	.then((r) => r.json())
	.catch((err) => console.error('an error'));
	console.log(data);
	document.querySelector(".js-sellprice").innerHTML= "€" +  " "  + data.data.amount;
	

}

const Spotprice= async (currency) => {
	const data= await fetch(`https://api.coinbase.com/v2/prices/${currency}/spot`)
	.then((r) => r.json())
	.catch((err) => console.error('an error'));
	console.log(data);
	document.querySelector(".js-spotprice").innerHTML= "€" +  " "  +data.data.amount;
}
const Percentage=async (currency)=>
{
	const data= await fetch(`https://api.pro.coinbase.com/products/${currency}/stats`)
	.then((r) => r.json())
	.catch((err) => console.error('an error'));
	var perc=(Math.round(((parseFloat(data.last) -parseFloat(data.open) ) / parseFloat(data.open)) * 100 * 100) / 100)+"%";
	console.log((Math.round(((parseFloat(data.last) -parseFloat(data.open) ) / parseFloat(data.open)) * 100 * 100) / 100)+"%");
	document.querySelector(".js-percentage").innerHTML= perc;
}
const getApi=async (currency) =>
{
	await Spotprice(currency);
	await Sellprice(currency);
	await Buyprice(currency);
	await Percentage(currency);
	await statischtijd();
	await tijdMaken();
}
document.addEventListener('DOMContentLoaded', function() {
	getApi("BTC-EUR");
});