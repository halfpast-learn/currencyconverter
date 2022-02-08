({
    doInit: function (component, event, helper) {
        const api = "https://api.exchangerate-api.com/v4/latest/USD";
        fetch(api).then(response => response.json())
            .then(data => {
                component.set("v.currencyList", Object.keys(data.rates));
                component.set("v.rates", data.rates);
            });
    },
    convert: function (component, event, helper) {
        var firstCurrency = component.get("v.selectedCurrency1");
        var secondCurrency = component.get("v.selectedCurrency2");

        var rates = component.get("v.rates");
        var result = 0;
        if (event.getSource().get("v.name") == "secondValue") {
            var secondAmount = component.get("v.secondAmount");
            result = helper.calculateConversion(secondAmount, rates[secondCurrency], rates[firstCurrency]);
            if (!isNaN(result))
                component.set("v.firstAmount", result.toFixed(2));
        }
        else {
            var firstAmount = component.get("v.firstAmount");
            result = helper.calculateConversion(firstAmount, rates[firstCurrency], rates[secondCurrency]);
            if (!isNaN(result))
                component.set("v.secondAmount", result.toFixed(2));
        }
    }
})