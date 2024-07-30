document.addEventListener('DOMContentLoaded', () => {
    const contactBox = document.getElementById('contact-box');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    contactBox.onmousedown = (event) => {
        let shiftX = event.clientX - contactBox.getBoundingClientRect().left;
        let shiftY = event.clientY - contactBox.getBoundingClientRect().top;

        contactBox.style.position = 'absolute';
        contactBox.style.zIndex = 1000;
        document.body.append(contactBox);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            contactBox.style.left = pageX - shiftX + 'px';
            contactBox.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        contactBox.onmouseup = () => {
            document.removeEventListener('mousemove', onMouseMove);
            contactBox.onmouseup = null;
        };
    };

    contactBox.ondragstart = () => false;

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});

