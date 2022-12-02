setup.numTransition = function numTransition2(target, targetNumber, duration = 1000, curve = 0.3, decimal = 0) {
    if (typeof target === "string") target = document.querySelector(target);
    let originalNumber = parseFloat(target.textContent);
    let startTime;
    function step(timeStamp) {
        startTime = startTime ?? timeStamp;
        let elapsed = Math.min(timeStamp - startTime, duration);
        target.textContent = (originalNumber + (targetNumber - originalNumber) * Math.pow(elapsed / duration, curve)).toFixed(decimal);
        if (elapsed < duration) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    return target;
}
