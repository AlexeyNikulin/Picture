import {postData} from '../server/server';

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefault, false);
        });
    });

    function preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = 'none';
        item.closest('.file_upload').style.backgroundColor = '';
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            const formData = new FormData();
            for (let key in input.files) {
                formData.append(key, input.files[key]);
            }
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
            let dots,
                a = input.files[0].name.split('.');
            a[0].length > 5 ? dots = '...' : dots = '.';
            const name = a[0].substring(0, 5) + dots + a[1];
            input.previousElementSibling.textContent = name;
        });
    });
};

export default drop;