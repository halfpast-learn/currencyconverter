import { api, LightningElement } from 'lwc';

export default class CurrencyConverterLWC extends LightningElement {
    @api firstAmount;
    @api secondAmount;
    @api firstSelectedCurrency;
    @api secondSelectedCurrency;
    rates;
    @api currencies = [];

    connectedCallback() {
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
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

    convert({ name }) {
        const isSecondAmount = name === 'secondAmount' || !this.firstAmount && this.secondAmount;
        const amount = isSecondAmount ? this.secondAmount : this.firstAmount;
        const rates = [this.rates[this.firstSelectedCurrency], this.rates[this.secondSelectedCurrency]];
        const result = this.calculateConversion(amount, ...(isSecondAmount ? rates.reverse() : rates));
        if (isNaN(result)) return;
        this[isSecondAmount ? 'firstAmount' : 'secondAmount'] = result.toFixed(2);
    }

    handleChange({ target }) {

        this[target.name] = target.value;
        if ((this.firstAmount || this.secondAmount) && this.firstSelectedCurrency && this.secondSelectedCurrency) {
            this.convert(target);
        }
    }
}   