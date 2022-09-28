setup.numberSpread = function (input, spread, round = 0) {
    return (input + spread * (2 * Math.random() - 1)).toFixed(round);
}