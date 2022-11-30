setup.numTransition = function numTransition(selector, targetNumber, time = 1000, steps = 20, curve = 0.3, decimal = 0) {
    let target = document.querySelector(selector);
    let originalNumber = parseFloat(target.textContent);
    for (let i = 0; i < steps; i++) {
        setTimeout(function () {
            target.textContent = rounder(
                originalNumber + (targetNumber - originalNumber) * Math.pow((i + 1) / steps, curve)
            )
        }, time / steps * i);
    }
    function rounder(inputNum) {
        if (decimal) return inputNum.toFixed(decimal);
        else return Math.round(inputNum).toString();
    }
}
