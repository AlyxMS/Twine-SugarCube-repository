setup.weightedRandom = function weightedRandom(weightedArray) {
    let randomNumber = weightedArray.reduce((a, b) => a + b[1], 0) * Math.random();
    for (let element of weightedArray) { if ((randomNumber -= element[1]) < 0) return element[0]; }
}
