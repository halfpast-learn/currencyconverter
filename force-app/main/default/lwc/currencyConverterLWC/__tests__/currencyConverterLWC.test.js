import { createElement } from "lwc";
import CurrencyConverterLWC from "c/currencyConverterLWC";

describe("c-currency-converter-l-w-c", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } })
    })
  );

  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("creates element", () => {
    const element = createElement("c-currency-converter-l-w-c", {
      is: CurrencyConverterLWC
    });
    document.body.appendChild(element);
  });
});
