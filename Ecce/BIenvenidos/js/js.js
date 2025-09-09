function isMobile() {
    if (sessionStorage.desktop)
        return false;
    else if (localStorage.mobile)
        return true;
    var mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
    for (var i in mobile)
        if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;
    return false;
}

const formulario = document.querySelector('#formulario');
const buttonSubmit = document.querySelector('#submit');
const urlDesktop = 'https://wa.me/';
const urlMobile = 'whatsapp://';
const final = '3157591204';

formulario.addEventListener('submit', (event) => {
    event.preventDefault()
    buttonSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'
    buttonSubmit.disabled = true
    setTimeout(() => {
        let nombre = document.querySelector('#nombre').value
        let apellidos = document.querySelector('#apellidos').value
        let telefono = document.querySelector('#telefono').value
        let email = document.querySelector('#email').value
        let mensaje = 'send?phone=' + final + '&text=Nombre:%20' + nombre + '%0AApellido:%20' + apellidos +'%0ATelefono:%20'+ telefono + '%0ACorreo Electrónico:%20' + email + ''
        if(isMobile()) {
            window.open(urlMobile + mensaje, '_blank')
        }else{
            window.open(urlDesktop + mensaje, '_blank')
        }
        buttonSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar'
        buttonSubmit.disabled = false
    }, 2000);
});