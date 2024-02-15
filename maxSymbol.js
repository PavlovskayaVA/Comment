let maxSymbol = 15;

function maxCountSymbol() {
  const message = document.querySelector('.message');
  const button = document.querySelector('button');
  const symbolInactive = document.querySelector('.symbol-inactive');
  const symbolActive = document.querySelector('.symbol-active');
  const symbolActiveNumber = document.querySelector('.symbol-active-number');
  const symbolErr = document.querySelector('.symbol-error');

    if (message.innerHTML.length < 1) {
       symbolInactive.style.display = 'flex';
       symbolActive.style.display = 'none';
       symbolErr.style.display = 'none';
       button.disabled = true;
       button.style.cursor = 'default';

       button.style.background = '#A1A1A1';
       button.style.color = '#000';
       button.style.opacity = '0.4';
    } 
    
    else if (message.innerHTML.length >= 1 && message.innerHTML.length <= maxSymbol) {
        symbolActiveNumber.innerHTML = message.innerHTML.length
        symbolInactive.style.display = 'none'
        symbolActive.style.display = 'flex'
        symbolErr.style.display = 'none'
        button.disabled = false;
        button.style.cursor = 'pointer'

        symbolActive.style.color = '#000'
        symbolActive.style.opacity = '0.4'
        symbolActive.style.marginRight = '0'

        button.style.background = '#66c96e'
        button.style.color = '#ffffff'
        button.style.opacity = '1'
        
    } else if (message.innerHTML.length > maxSymbol) {
        symbolActiveNumber.innerHTML = message.innerHTML.length
        symbolInactive.style.display = 'none'
        symbolActive.style.display = 'flex'
        symbolErr.style.display = 'flex'
        button.disabled = true;
        button.style.cursor = 'default'

        symbolErr.style.color = 'red'
        symbolActive.style.color = 'red'
        symbolActive.style.opacity = '1'
        symbolErr.style.marginLeft = '30px'
        symbolErr.style.marginRight = '-245px'
        symbolActive.style.marginRight = '-435px'

        button.style.background = '#A1A1A1'
        button.style.color = '#000'
        button.style.opacity = '0.4'

      
    }  
}

export {maxSymbol, maxCountSymbol}