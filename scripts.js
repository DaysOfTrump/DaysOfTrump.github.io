console.log('%cDay\'s %cof %cTrump', 'line-height: 30px; font-size: 22px; text-shadow: 4px 4px 11px #BABABA;', 'line-height: 30px; font-size: 22px; text-shadow: 4px 4px 11px #BABABA;', 'line-height: 30px; font-size: 22px; text-shadow: 4px 4px 11px #BABABA;');

function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - (new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}
var clock = document.getElementById('trumpdown');
function updateClock() {
	var t = getTimeRemaining('Wed Jan 20 2021 17:00:00 GMT+0000 (GMT Standard Time)');
	//var t = getTimeRemaining('Sun Feb 19 2017 14:58:00 GMT+0000 (GMT Standard Time)');
	var str = '';
		str += t.days + ' Days ';
		str += (('0' + t.hours).slice(-2)) + ' Hours ';
		str += (('0' + t.minutes).slice(-2)) + ' Minutes ';
		str += (('0' + t.seconds).slice(-2)) + ' Seconds ';
	updateCircle('#secs', (100/60) * t.seconds);
	updateCircle('#mins', (100/60) * t.minutes);
	updateCircle('#hours', (100/24) * t.hours);
	updateCircle('#day', (100/1461) * t.days);
	if (t.total <= 0) {
		clearInterval(timeinterval);
	}
	clock.innerHTML = str;
}
updateClock();
var timeinterval = setInterval(updateClock, 1000);

function updateCircle(selector, value) {
	var val = parseInt(value);
	var circles = document.querySelectorAll(selector + ' circle');
	for (var i = 0; i < circles.length; i++) {
		circles[i].setAttribute('stroke-dasharray', circles[i].getTotalLength());
	}
	var circle = document.querySelector(selector + ' .bar');
	if (isNaN(val)) {
		val = 100; 
	} else{
		var r = circle.getAttribute('r');
		var c = Math.PI*(r*2);
		if (val < 0) { val = 0;}
		if (val > 100) { val = 100;}
		var pct = ((100-val)/100)*c;
		circle.style.strokeDashoffset = pct;
	}
}
