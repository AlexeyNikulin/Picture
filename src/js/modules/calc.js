const calc = (size, material, options, promocode, result, state) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0;

    function bindActionToElems(sum) {
        state[size.substring(1)] = sizeBlock.value;
        state[material.substring(1)] = materialBlock.value;
        state[promocode.substring(1)] = promocodeBlock.value;
        state[options.substring(1)] = optionsBlock.value;
        state['sum'] = sum;
    }

    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value === '' || materialBlock.value === '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            bindActionToElems(Math.round(sum * 0.7));
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            bindActionToElems(sum);
            resultBlock.textContent = sum;
        }
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;