document.addEventListener('DOMContentLoaded', (event) => {
    const contactBox = document.getElementById('contact-box');

    contactBox.onmousedown = function(event) {
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

        contactBox.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            contactBox.onmouseup = null;
        };
    };

    contactBox.ondragstart = function() {
        return false;
    };
});
