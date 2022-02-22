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

    calculateConversion(amount, primaryRate, secondaryRate) {
        var rateCoeff = parseFloat(secondaryRate) / parseFloat(primaryRate);
        var result = parseFloat(amount) * parseFloat(rateCoeff);
        return result;
    }

    convert(event) {
        const isFirstAmount = event.target.name === 'firstAmount';
        const amount = isFirstAmount ? this.firstAmount : this.secondAmount;
        const rates = [this.rates[this.firstSelectedCurrency], this.rates[this.secondSelectedCurrency]];
        const result = this.calculateConversion(amount, ...(isFirstAmount ? rates : rates.reverse()));
        if (isNaN(result)) return;
        this[isFirstAmount ? 'secondAmount' : 'firstAmount'] = result.toFixed(2);
    }

    canConvert() {
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

        if (caller === 'firstAmount')
            this.firstAmount = val;
        else if (caller === 'secondAmount')
            this.secondAmount = val;
        else if (caller === 'firstSelectedCurrency')
            this.firstSelectedCurrency = val;
        else if (caller === 'secondSelectedCurrency')
            this.secondSelectedCurrency = val;

        if (this.canConvert()) {
            this.convert(event);
        }
    }



}