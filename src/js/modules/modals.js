const modals = () => {
    let btnPressed = false; 

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelectorAll(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                if (destroy) {
                    item.remove();
                }

                btnPressed = true;

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;

                clearTimeout(showModalByTime);
            });
        });

        close.forEach(item => {
            item.addEventListener('click', (e) => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    const showModalByTime =  setTimeout(() => {
        document.querySelector('.popup-consultation').style.display = 'block'; 
        document.body.style.overflow = 'hidden';
        let scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
        clearTimeout(showModalByTime);
    }, 60000);

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight + 1 >=
                scrollHeight) {
                document.querySelector(selector).click();
            }
        });
    }

    openByScroll('.fixed-gift');

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
};

export default modals;