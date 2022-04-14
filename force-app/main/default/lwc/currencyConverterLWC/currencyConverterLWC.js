import { LightningElement } from "lwc";

export default class CurrencyConverterLWC extends LightningElement {
  firstAmount;
  secondAmount;
  firstSelectedCurrency;
  secondSelectedCurrency;
  rates;
  currencies = [];

  connectedCallback() {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        this.currencies = Object.keys(data.rates).map((rate) => ({
          label: rate,
          value: rate
        }));
        this.rates = data.rates;
        if (this.currencies.length > 1) {
          this.firstSelectedCurrency = this.currencies[0];
          this.secondSelectedCurrency = this.currencies[1];
        }
      });
  }

  calculateConversion(amount, primaryRate, secondaryRate) {
    var rateCoeff = parseFloat(secondaryRate) / parseFloat(primaryRate);
    var result = parseFloat(amount) * parseFloat(rateCoeff);
    return result;
  }

  convert({ name }) {
    const isSecondAmount =
      name === "secondAmount" || (!this.firstAmount && this.secondAmount);
    const amount = isSecondAmount ? this.secondAmount : this.firstAmount;
    const rates = [
      this.rates[this.firstSelectedCurrency],
      this.rates[this.secondSelectedCurrency]
    ];
    const result = this.calculateConversion(
      amount,
      ...(isSecondAmount ? rates.reverse() : rates)
    );
    if (isNaN(result)) return;
    this[isSecondAmount ? "firstAmount" : "secondAmount"] = result.toFixed(2);
  }

  handleChange({ target }) {
    this[target.name] = target.value;
    if (
      (this.firstAmount || this.secondAmount) &&
      this.firstSelectedCurrency &&
      this.secondSelectedCurrency
    ) {
      this.convert(target);
    }
  }
}
