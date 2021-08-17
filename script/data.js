
const tijdMaken = async ()=>
{
	 setTimeout( async function(){
		const timestamp= await fetch(`https://api.coinbase.com/v2/time`)
		.then((r) => r.json())
		.catch((err) => console.error('an error'));
		//console.log(timestamp);
		var datumconv=new Date(0);
		datumconv.setUTCSeconds(timestamp.data.epoch);
		let time = datumconv.getDate() +"/"+ (datumconv.getMonth()+1)+"/"+ datumconv.getFullYear() +" "+ datumconv.getHours() + ":" + minutes(datumconv.getMinutes()) + ":" + minutes(datumconv.getSeconds());
		//console.log(time);
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
		let time = datumconv.getDate() +"/"+  (datumconv.getMonth()+1) +"/"+ datumconv.getFullYear() +" "+ datumconv.getHours() + ":" + minutes(datumconv.getMinutes()) + ":" + minutes(datumconv.getSeconds());
		document.querySelector(".js-Date-static").innerHTML= time;
}

const minutes = function(n) {
    return n < 10 ? '0' + n : n;
}
const ChangeName = async (currency) =>{
if(currency == 'BTC-EUR')
{
	document.querySelector(".js-cryptoname").innerHTML= "Bitcoin";
	document.querySelector(".c-data__header").classList.add("c-data__header--bitcoin")
	document.querySelector(".c-data__header").classList.remove("c-data__header--ethereum")
	document.querySelector(".c-data__header").classList.remove("c-data__header--litecoin")
}
else if(currency == 'ETH-EUR')
{
	document.querySelector(".js-cryptoname").innerHTML= "Ethereum";
	document.querySelector(".c-data__header").classList.add("c-data__header--ethereum")
	document.querySelector(".c-data__header").classList.remove("c-data__header--bitcoin")
	document.querySelector(".c-data__header").classList.remove("c-data__header--litecoin")
}
else 
{
	document.querySelector(".js-cryptoname").innerHTML= "Litecoin";
	document.querySelector(".c-data__header").classList.add("c-data__header--litecoin")
	document.querySelector(".c-data__header").classList.remove("c-data__header--bitcoin")
	document.querySelector(".c-data__header").classList.remove("c-data__header--ethereum")
}
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
function _parseMillisecondsIntoReadableTime(timestamp) {
	//Get hours from milliseconds
	const date = new Date(timestamp * 1000);
	// Hours part from the timestamp
	const hours = '0' + date.getHours();
	// Minutes part from the timestamp
	const minutes = '0' + date.getMinutes();
	// Will display time in 10:30(:23) format
	return hours.substr(-2) + ':' + minutes.substr(-2);
}
const candles = async (currency,i) =>{
	document.getElementById( 'chart').remove();    
	let canvas = document.createElement('canvas');     
	canvas.setAttribute('id','chart');     
	canvas.setAttribute('width','200');     
	canvas.setAttribute('height','140');     
	document.querySelector('#chartcontent').appendChild(canvas);
	colors=['rgba(255, 145, 76, 1)','rgba(79, 149, 255, 1)','rgba(96, 98, 116, 1)'];
	let prices=[];
	let dates=[];
	var d = new Date();
 	d.setDate(d.getDate()-3);
	const data = await fetch(`https://api.pro.coinbase.com/products/${currency}/candles?start=${d}&end=${Date()}&granularity=21600`)
	.then((r) => r.json())
	.catch((err) => console.error('an error'));
	console.log(data);
	for (let item of data){
		dates.push(_parseMillisecondsIntoReadableTime(item[i]));
		prices.push(item[i])
	}
	var ctx=document.getElementById('chart').getContext('2d');
	let newdates=dates.reverse()
	console.log(dates);
	let newprices=prices.reverse()
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: newdates,
			datasets: [{
				label: 'price in €',
				data: data,	
				backgroundColor: colors[i],
				borderColor: colors[i],
				borderWidth: 1
			}]
		},
		options:{
			responsive: true
		}
	});
}
const getApi=async (currency,i) =>
{
	await Percentage(currency);
	await ChangeName(currency);
	await candles(currency,i);
	await statischtijd();
	await tijdMaken();
}
document.addEventListener('DOMContentLoaded', function() {
	getApi("BTC-EUR", 0);
});