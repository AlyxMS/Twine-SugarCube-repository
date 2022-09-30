setup.weightedRandom = function weightedRandom(weightedArray) {
    let randomNumber = weightedArray.reduce((a, b) => [null, a[1] + b[1]])[1] * Math.random();
    for (let element of weightedArray) { if ((randomNumber -= element[1]) < 0) return element[0]; }
}
