import { LightningElement } from 'lwc';

export default class CurrencyConverterLWC extends LightningElement {
    firstAmount;
    secondAmount;
    selectedCurrency2;
    selectedCurrency1;
    rates;
    currencies;
    convert(event) { }
    doInit(event) {
        const api = "https://api.exchangerate-api.com/v4/latest/USD";
        fetch(api).then(response => response.json())
            .then(data => {
                currencies=Object.keys(data.rates);
                rates=data.rates;
            });
    }
}