import { api, LightningElement } from 'lwc';

export default class CurrencyConverterLWC extends LightningElement {
    @api firstAmount;
    @api secondAmount;
    @api firstSelectedCurrency;
    @api secondSelectedCurrency;
    rates;
    @api currencies = [];

    connectedCallback() {
        const api = "https://api.exchangerate-api.com/v4/latest/USD";
        fetch(api)
            .then(response => response.json())
            .then(data => {
                this.currencies = Object.keys(data.rates).map(rate => ({ label: rate, value: rate }));
                this.rates = data.rates;
            });
    }

    calculateConversion(from, rateFirst, rateSecond) {
        var valueInUSD = parseFloat(from) / parseFloat(rateFirst);
        var result = valueInUSD * parseFloat(rateSecond);
        return result;
    }

    convert(event) {
        var result = 0;
        if (event.target.name == "secondAmount") {
            result = this.calculateConversion(this.secondAmount, this.rates[this.secondSelectedCurrency], this.rates[this.firstSelectedCurrency]);
            if (!isNaN(result))
                this.firstAmount = result.toFixed(2);
        }
        else {
            result = this.calculateConversion(this.firstAmount, this.rates[this.firstSelectedCurrency], this.rates[this.secondSelectedCurrency]);
            if (!isNaN(result))
                this.secondAmount = result.toFixed(2);
        }
    }

    checkIfShouldConvert() {
        if (isNaN(this.rates[this.firstSelectedCurrency])
            || isNaN(this.rates[this.secondSelectedCurrency])) {
            return false;
        }
        else if (isNaN(this.firstAmount) && isNaN(this.secondAmount)) {
            return false;
        }
        else {
            return true;
        }
    }

    handleChange(event) {
        var caller = event.target.name;
        var val = event.target.value;

        if (caller == 'firstAmount')
            this.firstAmount = val;
        else if (caller == 'secondAmount')
            this.secondAmount = val;
        else if (caller == 'firstSelectedCurrency')
            this.firstSelectedCurrency = val;
        else if (caller == 'secondSelectedCurrency')
            this.secondSelectedCurrency = val;

        if (this.checkIfShouldConvert()) {
            this.convert(event);
        }
    }



}