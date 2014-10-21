var perceptron = new Perceptron();
var running = false;

function init() {
	data = generateData(line, 1000);
	addNoise(data[0], 0.2);
	xs = data[0];
	ys = data[1];

	error_data = [];
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
	var positiveFillStyle = "rgba(0, 0, 200, 0.4)";
	var negativeFillStyle = "rgba(200, 0, 0, 0.4)";
	var predictionFillStyle = "rgba(0, 0, 0, 0.5)";
	var normalFillStyle = "rgb(255, 255, 255)";

	ctx.clearRect (0, 0, w, h);

	errors = 0;

	for (var i=0; i<xs.length; i++) {
		var xcoord = (1 + xs[i][0]) * w/2;
		var ycoord = (1 + xs[i][1]) * w/2;
		ctx.beginPath();
		if (ys[i]) {
			ctx.fillStyle = positiveFillStyle;
		} else {
			ctx.fillStyle = negativeFillStyle;
		}
		ctx.arc(xcoord, ycoord, 5, 0, 2 * Math.PI, false);
		ctx.fill();

		var prediction = perceptron.classify(xs[i]);
		ctx.beginPath();
		if (prediction) {
			ctx.fillStyle = predictionFillStyle;
			ctx.arc(xcoord, ycoord, 5, 0, 2 * Math.PI, false);
		} else {
			ctx.fillStyle = normalFillStyle;
		}
		ctx.fill();

		if (prediction != ys[i]) {
			errors += 1;
		}
	}

	error_data.push({ 
		"Iteration": error_data.length,
		"Error": errors / xs.length
	});
	chart.draw();
}
