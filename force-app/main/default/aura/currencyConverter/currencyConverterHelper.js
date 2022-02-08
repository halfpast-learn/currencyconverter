({
    calculateConversion: function (from, rateFirst, rateSecond) {
        var firstInUSD = parseFloat(from) / parseFloat(rateFirst);
        var result = firstInUSD * parseFloat(rateSecond);
        return result;
    }
})