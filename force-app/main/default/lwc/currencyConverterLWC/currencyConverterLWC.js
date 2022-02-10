import { LightningElement } from 'lwc';

export default class CurrencyConverterLWC extends LightningElement {
    firstAmount;
    secondAmount;
    selectedCurrency2;
    selectedCurrency1
    convert(event) { console.log("convert worked, event:\n" + event); }
}