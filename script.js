const calculate = (n1, operator, n2) => {
  let result = ''
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }

  return result
}

const calculator = document.querySelector('.calculator'),
      keys = calculator.querySelector('.calculator_keys'),
      display = calculator.querySelector('.calculator_display');

// setting the default display value on the screen 
display.textContent = 0

// coding every event of a button click
keys.addEventListener('click', e=>{
    if (e.target.matches('button')){
        const key = e.target,
              action = key.dataset.action,
              keyContent = key.textContent,
              displayedNum = display.textContent,
              previousKeyType = calculator.dataset.previousKeyType;
        
        // Array.from(key.parentNode.children).forEach(i => {
        //     i.classList.remove('is-depressed')
        // })
        // console.log(key)

        // number keys
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator'){
                display.textContent = keyContent;
            }
            else{
                display.textContent = displayedNum + keyContent
            }
        }
        // decimal key
        if(action === 'decimal'){
            display.textContent = displayedNum + '.'
        }
        // operator key
        if (action === 'add' || action === 'subtract' || 
        action === 'multiply' || action === 'divide'){
            // key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = display.textContent;
            calculator.dataset.operator = action;

        }
        // clear key
        if(action === 'clear'){
            console.log('clear key')
        }
        // equal-to key
        if(action === 'calculate'){
            const firstValue = calculator.dataset.firstValue,
                  operator = calculator.dataset.operator,
                  secondNumber = displayedNum;

            display.textContent = calculate (firstValue, operator, secondNumber);
        }
    }
})