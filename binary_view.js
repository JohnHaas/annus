var perceptron = new Perceptron();
var running = false;

function init() {
    data = generateBinaryData(pattern2, 100);

    counts = []
    for (var j=0; j<20; j++) {
	counts[j] = 0
	for (var i=0; i<data.length/2; i++) {
	    counts[j] += data[i][j]
	}
    }

    data2 = generateBinaryData(randomBinaryNumber, 50);
    for (var i=0; i<50; i++) {
	data[i] = data2[i]
    }
    

    error_data = []
    var svg = dimple.newSvg("#graph", 500, 450);
    chart = new dimple.chart(svg, error_data);
    xaxis = chart.addCategoryAxis("x", "Iteration");
    chart.addMeasureAxis("y", "Error");
    chart.addSeries(null, dimple.plot.line);
    xaxis.hidden = true;

    redraw();
}

function hello() {
    if (running)
	return;

    running = true;
    iterCount = 0;
    runInterval = setInterval(tick, 100);
}

function tick() {
    iterCount += 1;
    if (iterCount > 100) {
	clearInterval(runInterval);
	running = false;
	return;
    }

    perceptron.iteration(xs, ys);
    redraw();
}

function redraw() {
    var canvas = document.getElementById('viewer');
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;

    ctx.clearRect (0, 0, w, h);

    error = 0

    for (var j=0; j<20; j++) {
	console.log(counts[j])
    }

    maxp = 0
    probs = []
    for (var i=0; i<data.length; i++) {
	prob = 1
	for (var j=0; j<data[i].length; j++) {
	    if (data[i][j]) {
		prob *= (counts[j] / data.length * 2) 
	    } else {
		prob *= (1 - counts[j] / data.length * 2)
	    }
	}
	prob = Math.log(prob)
	if (prob > maxp) {
	    maxp = prob
	}
	probs[i] = prob
    }

    uniforms = 0
    for (var i=0; i<50; i++) {
	uniforms += probs[i]
    }
    uniforms /= 50

    for (var i=0; i<data.length; i++) {
	y = 4*i;
	for (var j=0; j<data[i].length; j++) {
	    x = 20*j;
	    ctx.beginPath();
	    ctx.rect(x, y, 20, 4);
	    ctx.fillStyle = data[i][j] 
		? "rgba(0,0,0,0.5)" 
		: "rgba(255,255,255,0.5)";
	    ctx.fill();
	}

	prob = probs[i] / maxp;

	ctx.rect(0, y, w, 4);
	ctx.fillStyle = "rgba(0,"+Math.floor(prob*255)+",0,0.5)"
	ctx.fill();
    }

    error_data.push({ 
	"Iteration": error_data.length,
	"Error": error / data.length
    });
    chart.draw();
}
