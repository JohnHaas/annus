/**
 * This file describes the logic behind the weight label view.  Weight labels
 * can be interactively changed by dragging the values up and down.
 */

// Hold state for weight label UI.
var weightUI = {
	/**
	 * Whether the user is dragging a flex value.
	 * @type {Boolean}
	 */
	dragging: false,

	/**
	 * The value of the weight component before being dragged.
	 * @type {Number}
	 */
	initialWeightValue: null,

	/**
	 * The mouse's Y position before dragging.
	 * @type {Number}
	 */
	initialMouseY: null,

	/**
	 * The HTML element currently being dragged.
	 * @type {Element}
	 */
	selectedValueEl: null,

	/**
	 * The degree of sensitivity when dragging.
	 * @type {Number}
	 */
	dragSensitivity: 1024
}

// Handle dragging events over each flex-value weight component.  Dragging an
// element should result in adjusting the displayed value and update the weights
// of the perceptron.
 
weightLabel.onmousedown = function (e) {
	if (!running && e.toElement &&
			e.toElement.classList.contains('flex-value')){
		weightUI.dragging = true;
		weightUI.selectedValueEl = e.toElement;
		weightUI.initialWeightValue = parseFloat(e.toElement.innerText);
		weightUI.initialMouseY = e.screenY;
	}
};

document.onmousemove = function (e) {
	if (weightUI.dragging){
		var newValue = weightUI.initialWeightValue +
				(weightUI.initialMouseY - e.screenY) / weightUI.dragSensitivity;
		weightUI.selectedValueEl.innerText = Math.floor(newValue*1000)/1000;
		updatePerceptronWeights();
	}
};

document.onmouseup = function (e) {
	weightUI.dragging = false;
};

/**
 * Update the perceptron's internal state and redraw the viewer.
 */
function updatePerceptronWeights (){
	var flexWeights = document.getElementsByClassName('flex-value');
	for (var i=0, len=flexWeights.length; i<len; i++) {
		perceptron.w[i] = parseFloat(flexWeights[i].innerText);
	}
	redrawDebounced();
}
