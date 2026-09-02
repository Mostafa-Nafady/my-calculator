// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'ASX Stock Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }

  // ASX Stock Calculator logic
  const calculateBtn = document.getElementById('asx-calculate');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      const purchasePriceInput = document.getElementById('asx-purchase-price');
      const salePriceInput = document.getElementById('asx-sale-price');
      const quantityInput = document.getElementById('asx-quantity');
      const dividendInput = document.getElementById('asx-dividend');
      const resultDiv = document.getElementById('asx-result');

      if (!purchasePriceInput || !salePriceInput || !quantityInput || !dividendInput || !resultDiv) {
        return;
      }

      const purchasePrice = parseFloat(purchasePriceInput.value);
      const salePrice = parseFloat(salePriceInput.value);
      const quantity = parseFloat(quantityInput.value);
      const dividend = parseFloat(dividendInput.value);

      const safePurchasePrice = isNaN(purchasePrice) ? 0 : purchasePrice;
      const safeSalePrice = isNaN(salePrice) ? 0 : salePrice;
      const safeQuantity = isNaN(quantity) ? 0 : quantity;
      const safeDividend = isNaN(dividend) ? 0 : dividend;

      const totalCost = safePurchasePrice * safeQuantity;
      const totalSale = safeSalePrice * safeQuantity;
      const totalDividend = safeDividend * safeQuantity;
      const capitalGain = totalSale - totalCost;
      const totalReturn = capitalGain + totalDividend;
      const returnPercentage = totalCost !== 0 ? (totalReturn / totalCost) * 100 : 0;

      resultDiv.innerHTML =
        `Capital Gain/Loss: AUD ${capitalGain.toFixed(2)}<br>` +
        `Dividend Income: AUD ${totalDividend.toFixed(2)}<br>` +
        `Total Return: AUD ${totalReturn.toFixed(2)}<br>` +
        `Return Percentage: ${returnPercentage.toFixed(2)}%`;
    });
  }
});

