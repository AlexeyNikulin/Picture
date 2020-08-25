import {postData} from '../server/server';
const forms = (state) => {

    const form = document.querySelectorAll('form'),
          upload = document.querySelectorAll('[name="upload"]');

    const mesage = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    },
    path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots,
                a = item.files[0].name.split('.');
            a[0].length > 5 ? dots = '...' : dots = '.';
            const name = a[0].substring(0, 5) + dots + a[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            if (item.lastElementChild.classList.contains('status')) {
                item.lastElementChild.remove();
            }

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = mesage.loading;
            item.parentNode.append(statusMessage);

            const formData = new FormData(item);
            if (item.classList.contains('calc_form')) {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = mesage.success;
                })
                .catch((error) => {
                    statusMessage.textContent = mesage.failure;
                })
                .finally(() => {
                    item.reset();
                    upload.forEach(elem => {
                        elem.previousElementSibling.textContent = 'Файл не выбран';
                    });
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                });
        });
    });
};

export default forms;