const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/./gi, function(a) {
                return /[а-яё 0-9]/.test(a) ? a : '';
            });
        });
    });
};

export default checkTextInputs;