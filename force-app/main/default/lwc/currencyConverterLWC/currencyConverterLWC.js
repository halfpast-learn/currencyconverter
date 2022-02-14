import { api, LightningElement } from 'lwc';

export default class CurrencyConverterLWC extends LightningElement {
    firstAmount;
    secondAmount;
    selectedCurrency2;
    selectedCurrency1;
    rates;
    currencies;
    convert(event) { }
    connectedCallback() {
        const api = "https://api.exchangerate-api.com/v4/latest/USD";
        fetch(api).then(response => response.json())
            .then(data => {
                this.currencies = Object.keys(data.rates);
                this.rates = data.rates;
                console.log(this.rates);
            });
    }
    @api
    get currencyNames() {
        let result = [];
        for (let i = 0; i < this.currencies.length; i++) {
            result.push({ name: currencies[i] });
        }
        return result;
    }
}