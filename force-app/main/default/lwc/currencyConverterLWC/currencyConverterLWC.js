import { api, LightningElement } from 'lwc';

export default class CurrencyConverterLWC extends LightningElement {
    firstAmount;
    secondAmount;
    selectedCurrency2;
    selectedCurrency1;
    rates;
    @api currencies = [{id:"abc1", name:"usd1"}];
    convert(event) { }
    connectedCallback() {
        const api = "https://api.exchangerate-api.com/v4/latest/USD";
        console.log(this.currencies[0].id,this.currencies[0].name);
        /*fetch(api).then(response => response.json())
            .then(data => {
                this.currencies = Object.keys(data.rates);
                this.rates = data.rates;
                console.log(this.rates);
            });*/
    }
    //TODO:
    //does pre-populated list work?
    //try wiring: https://www.sfdcpoint.com/salesforce/foreach-template-directives-in-lwc/
    /*get currencyNames() {
        const api = "https://api.exchangerate-api.com/v4/latest/USD";
        fetch(api).then(response => response.json())
            .then(data => {
                this.currencies = Object.keys(data.rates);
                this.rates = data.rates;
                console.log(this.rates);

                let result = [];
                for (let i = 0; i < this.currencies.length; i++) {
                    result.push({ name: this.currencies[i] });
                }
                console.log(result);
                return result;
            });
    }*/
}