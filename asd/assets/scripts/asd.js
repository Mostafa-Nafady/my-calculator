// ASD Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
  const inputA = document.getElementById('input-a');
  const inputS = document.getElementById('input-s');
  const inputD = document.getElementById('input-d');
  const btnCalculate = document.getElementById('btn-calculate');
  const btnClear = document.getElementById('btn-clear');
  const currentCalculation = document.getElementById('current-calculation');
  const currentResult = document.getElementById('current-result');

  btnCalculate.addEventListener('click', () => {
    const a = parseFloat(inputA.value) || 0;
    const s = parseFloat(inputS.value) || 0;
    const d = parseFloat(inputD.value) || 0;
    
    const result = a + s - d;
    currentCalculation.textContent = `${a} + ${s} − ${d}`;
    currentResult.textContent = result;
  });

  btnClear.addEventListener('click', () => {
    inputA.value = '';
    inputS.value = '';
    inputD.value = '';
    currentCalculation.textContent = '0';
    currentResult.textContent = '0';
  });
});
