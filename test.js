function dot(a, b) {
    sum = 0
    for (var i=0; i<Math.min(a.length, b.length); i++) {
	sum += a[i] * b[i]
    }
    return sum
}

function Perceptron() {
    this.w = [0, 0, 0]
    this.a = 0.001;
    this.batch_size = 100;
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

function generateBinaryData(f, n) {
    xs = []
    for (var i=0; i<n; i++) {
	xs[i] = f()
    }
    return xs;
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

function pattern2() {
    bits = randomBinaryNumber()
    if (bits[0] && bits[4] && bits[9] && !bits[15]) {
	return bits
    }

    if (bits[2] && bits[19]) {
	return bits
    }

    return pattern2();
}

function pattern() {
    result = []
    result[0] = Math.floor(Math.random() * 2);
    result[1] = Math.floor(Math.random() * 2);
    result[2] = Math.floor(Math.random() *2);
    for (var i=3; i<20; i++) {
	result[i] = result[i-1] * 0.5;
	result[i] += result[i-2] * 0.5;
	result[i] += result[i-3] * 0.5;
	result[i] += Math.random();
	result[i] = Math.floor(result[i]) % 2;
    }
    return result
}

function randomBinaryNumber() {
    result = [];
    n = Math.random();
    if (n < 0.3)
	n *= 19;
    for (var i=0; i<20; i++) {
	result[i] = Math.floor(n) % 2;
	n *= 2;
    }
    return result;
}
