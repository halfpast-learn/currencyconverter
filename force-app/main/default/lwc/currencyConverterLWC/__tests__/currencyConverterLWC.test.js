import { createElement } from "lwc";
import CurrencyConverterLWC from "c/currencyConverterLWC";

describe("c-currency-converter-l-w-c", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ rates: { USD: 1.0, CAD: 1.42 } })
    })
  );

  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    fetch.mockClear();
  });
  const flushPromises = () => new Promise(setImmediate);

  it("creates element", async () => {
    const element = createElement("c-currency-converter-l-w-c", {
      is: CurrencyConverterLWC
    });
    document.body.appendChild(element);
    await flushPromises();
    let firstCurrencySelector = element.shadowRoot.querySelector(
      ".firstSelectedCurrency"
    );
    expect(firstCurrencySelector.value.label).toBe("USD");
    let secondSelectedCurrency = element.shadowRoot.querySelector(
      ".secondSelectedCurrency"
    );
    expect(secondSelectedCurrency.value.label).toBe("CAD");
  });
});
