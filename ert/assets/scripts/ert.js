document.addEventListener('DOMContentLoaded', () => {
  const inputComplexity = document.getElementById('input-complexity');
  const inputTeamSize = document.getElementById('input-team-size');
  const inputRisk = document.getElementById('input-risk');
  const btnCalculate = document.getElementById('btn-calculate');
  const btnClear = document.getElementById('btn-clear');
  const currentCalculation = document.getElementById('current-calculation');
  const currentResult = document.getElementById('current-result');

  btnCalculate.addEventListener('click', () => {
    const complexity = parseFloat(inputComplexity.value) || 0;
    const teamSize = parseFloat(inputTeamSize.value) || 1;
    const risk = parseFloat(inputRisk.value) || 0;

    // ERT = (complexity * 8) / (teamSize * (1 - risk))
    const denominator = teamSize * (1 - risk);
    const ert = denominator > 0 ? (complexity * 8) / denominator : 0;

    currentCalculation.textContent = `ERT = (${complexity} * 8) / (${teamSize} * (1 - ${risk}))`;
    currentResult.textContent = ert.toFixed(2);
  });

  btnClear.addEventListener('click', () => {
    inputComplexity.value = '';
    inputTeamSize.value = '';
    inputRisk.value = '';
    currentCalculation.textContent = '0';
    currentResult.textContent = '0';
  });
});
