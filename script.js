const calculator = document.querySelector('.calculator'),
      keys = calculator.querySelector('.calculator_keys'),
      display = calculator.querySelector('.calculator_display');

const calculate = (n1, operator, n2) => {
  let result = ''
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } 
  // (operator === 'divide') --- condition
  else {
    result = parseFloat(n1) / parseFloat(n2)
  }

  return result
}

// setting the default display value on the screen 
display.textContent = 0

// coding every event of a button click
keys.addEventListener("click", e=>{
    if (e.target.matches('button')){
        const key = e.target,
              action = key.dataset.action,
              keyContent = key.textContent,
              displayedNum = display.textContent,
              previousKeyType = calculator.dataset.previousKeyType;
        
        Array.from(key.parentNode.children).forEach(i => {
            i.classList.remove('is-depressed')
        })
        // console.log(action)

        // operator key
        if (action === 'add' || action === 'subtract' || 
        action === 'multiply' || action === 'divide'){
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = (display.textContent);
            calculator.dataset.operator = action;
        }

        // number keys
        else if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator'){
                display.textContent = keyContent;
            }
            else{
                display.textContent = displayedNum + keyContent
                console.log(display.textContent)
            }
        }

        // decimal key
        else if(action === 'decimal'){
            display.textContent = displayedNum + '.'
        }

        // clear key
        else if(action === 'clear'){
            console.log('clear key')
        }

        // equal-to key (action === 'calculate') -- condition
        else{
            const firstValue = calculator.dataset.firstValue,
                  operator = calculator.dataset.operator,
                  secondNumber = displayedNum;

            display.textContent = calculate (firstValue, operator, secondNumber);
        }
    }
})
// The issue of 'is-depressed' 

// .remove('is-depressed) does not work;
// Every other click after that is still detected as the previous operator key

// The issue of firstValue
// The calculator does not treat the second digit when computing a calculation
// i.e 17 + 1 = 11

// The calculator does not allow for double digits for secondNumber
