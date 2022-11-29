setup.numSpread = function numSpread(input, spread, round = 0) {
    return parseFloat((input + spread * (2 * Math.random() - 1)).toFixed(round));
}
