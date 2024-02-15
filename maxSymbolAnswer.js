let maxSymbolAnswer = 15;

function maxCountSymbolAnswer() {
  const message = document.querySelector('.message-answer');
  const button = document.querySelector('.button-answer');
  const symbolInactive = document.querySelector('.symbol-inactiveAnswer');
  const symbolActive = document.querySelector('.symbol-activeAnswer');
  const symbolActiveNumber = document.querySelector('.symbol-active-numberAnswer');
  const symbolErr = document.querySelector('.symbol-errorAnswer');

    if (message) {
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
     
     else if (message.innerHTML.length >= 1 && message.innerHTML.length <= maxSymbolAnswer) {
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

     } else if (message.innerHTML.length > maxSymbolAnswer) {
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
         symbolErr.style.marginRight = '-242px'
         symbolActive.style.marginRight = '-345px'
 
         button.style.background = '#A1A1A1'
         button.style.color = '#000'
         button.style.opacity = '0.4'
      }  
    }
}

export {maxSymbolAnswer, maxCountSymbolAnswer}