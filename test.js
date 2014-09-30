function dot(a, b) {
    sum = 0
    for (var i=0; i<Math.min(a.length, b.length); i++) {
	sum += a[i] * b[i]
    }
    return sum
}

function Perceptron() {
    this.w = [0, 0, 0]
    this.a = 0.01;
    this.batch_size = 10;
}

Perceptron.prototype.score = function(x) {
    return dot(this.w, [1].concat(x));
}

Perceptron.prototype.classify = function(x) {
    return this.score(x) >= 0;
}

Perceptron.prototype.iteration = function(xs, ys) {
    for (var i=0; i<this.batch_size; i++) {
	var k = Math.floor(Math.random() * xs.length);
	if (this.classify(xs[k]) != ys[k]) {
	    y = ys[k] ? 1 : -1
	    var g = this.a * (this.score(xs[k]) - y);
	    this.w[0] -= g;
	    this.w[1] -= g * xs[k][0];
	    this.w[2] -= g * xs[k][1];
	}
    }
    console.log(this.w)
}

function generateData(f, n) {
    xs = []
    ys = []
    for (var i=0; i<n; i++) {
	xs[i] = [
	    (Math.random() * 2 - 1),
	    (Math.random() * 2 - 1)
	];
	ys[i] = f(xs[i][0], xs[i][1]);
    }
    return [xs, ys];
}

function addNoise(xs, a) {
    for (var i=0; i<xs.length; i++) {
	xs[i][0] += (Math.random() * 2 - 1) * a;
	xs[i][1] += (Math.random() * 2 - 1) * a;
    }
}

function wave(x, y) {
    return Math.cos(2 * Math.PI / 1.5 * (x*x + y*y)) > 0;
}

function line(x, y) {
    a = 1
    b = 2
    return a * x + b * y > 0
}
