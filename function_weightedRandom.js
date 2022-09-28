setup.weightedRandom = function weightedRandom(weightedArray) {
    let randomNumber = weightedArray.reduce((a, b) => [null, a[1] + b[1]])[1] * Math.random();
    weightedArray.forEach(element => {
        if (randomNumber <= element[1]) return element[0];
        randomNumber -= element[1];
    });
}