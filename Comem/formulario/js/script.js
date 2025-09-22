// Validación y manejo del formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.getElementById('btnLoader');
    const successMessage = document.getElementById('successMessage');
    
    // Elementos del formulario
    const nombreCompleto = document.getElementById('nombreCompleto');
    const numero = document.getElementById('numero');
    const empresa = document.getElementById('empresa');
    const correo = document.getElementById('correo');
    const descripcion = document.getElementById('descripcion');
    
    // Elementos de error
    const nombreError = document.getElementById('nombreError');
    const numeroError = document.getElementById('numeroError');
    const empresaError = document.getElementById('empresaError');
    const correoError = document.getElementById('correoError');
    const descripcionError = document.getElementById('descripcionError');
    
    // Funciones de validación
    function validateName(name) {
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }
    
    function validateColombianPhone(phone) {
        if (phone == null) return null;
        // Aceptar números y strings
        let s = String(phone).trim();

        // Guardar si el usuario puso un '+'
        const hadPlus = s.startsWith('+');

        // Eliminar todo lo que no sea dígito
        let digits = s.replace(/\D/g, '');

        // Si comienzan con '00' (prefijo IDD), quitarlo
        if (digits.startsWith('00')) {
            digits = digits.replace(/^00/, '');
        }

        // Si ahora comienza por '57' (código país), quitarlo para obtener el NSN
        if (digits.startsWith('57')) {
            digits = digits.slice(2);
        }

        // Ahora digits debe ser el NSN. Validar longitud y prefijo
        // NSN en Colombia = 10 dígitos. Móviles empiezan por 3, fijos actuales por 6.
        if (!/^[36]\d{9}$/.test(digits)) return null;

        // Normalizar a E.164
        return '+57' + digits;
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }
    
    function validateCompany(company) {
        return company.trim().length >= 2 && company.trim().length <= 100;
    }
    
    function validateDescription(desc) {
        return desc.trim().length >= 10 && desc.trim().length <= 1000;
    }
    
    // Función para mostrar errores
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    // Función para limpiar errores
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    // Validación en tiempo real
    nombreCompleto.addEventListener('blur', function() {
        if (!validateName(this.value)) {
            showError(this, nombreError, 'Por favor ingrese un nombre válido (2-50 caracteres, solo letras)');
        } else {
            clearError(this, nombreError);
        }
    });
    
    numero.addEventListener('blur', function() {
        if (!validatePhone(this.value)) {
            showError(this, numeroError, 'Por favor ingrese un número de teléfono válido');
        } else {
            clearError(this, numeroError);
        }
    });
    
    empresa.addEventListener('blur', function() {
        if (!validateCompany(this.value)) {
            showError(this, empresaError, 'Por favor ingrese un nombre de empresa válido (2-100 caracteres)');
        } else {
            clearError(this, empresaError);
        }
    });
    
    correo.addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
            showError(this, correoError, 'Por favor ingrese un correo electrónico válido');
        } else {
            clearError(this, correoError);
        }
    });
    
    descripcion.addEventListener('blur', function() {
        if (!validateDescription(this.value)) {
            showError(this, descripcionError, 'Por favor ingrese una descripción válida (10-1000 caracteres)');
        } else {
            clearError(this, descripcionError);
        }
    });
    
    // Formateo automático del teléfono

    
    // Contador de caracteres para descripción
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.style.cssText = 'font-size: 0.75rem; color: var(--gray-500); text-align: right; margin-top: 0.25rem;';
    descripcion.parentNode.appendChild(charCounter);
    
    descripcion.addEventListener('input', function() {
        const remaining = 1000 - this.value.length;
        charCounter.textContent = `${this.value.length}/1000 caracteres`;
        charCounter.style.color = remaining < 100 ? 'var(--warning-color)' : 'var(--gray-500)';
    });
    
    // Manejo del envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpiar errores previos
        clearError(nombreCompleto, nombreError);
        clearError(numero, numeroError);
        clearError(empresa, empresaError);
        clearError(correo, correoError);
        clearError(descripcion, descripcionError);
        
        let isValid = true;
        
        // Validar todos los campos
        if (!validateName(nombreCompleto.value)) {
            showError(nombreCompleto, nombreError, 'Por favor ingrese un nombre válido');
            isValid = false;
        }
        
        if (!validatePhone(numero.value)) {
            showError(numero, numeroError, 'Por favor ingrese un número de teléfono válido');
            isValid = false;
        }
        
        if (!validateCompany(empresa.value)) {
            showError(empresa, empresaError, 'Por favor ingrese un nombre de empresa válido');
            isValid = false;
        }
        
        if (!validateEmail(correo.value)) {
            showError(correo, correoError, 'Por favor ingrese un correo electrónico válido');
            isValid = false;
        }
        
        if (!validateDescription(descripcion.value)) {
            showError(descripcion, descripcionError, 'Por favor ingrese una descripción válida (10-1000 caracteres)');
            isValid = false;
        }
        
        if (isValid) {
            // Mostrar estado de carga
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.classList.add('show');
            
            // Simular envío del formulario
            setTimeout(() => {
                // Ocultar formulario y mostrar mensaje de éxito
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                // Opcional: Enviar datos a un servidor
                console.log('Datos del formulario:', {
                    nombreCompleto: nombreCompleto.value,
                    numero: numero.value,
                    empresa: empresa.value,
                    correo: correo.value,
                    descripcion: descripcion.value,
                    timestamp: new Date().toISOString()
                });
                
                // Resetear el formulario después de 5 segundos
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'flex';
                    successMessage.classList.remove('show');
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnLoader.classList.remove('show');
                    charCounter.textContent = '0/1000 caracteres';
                }, 5000);
                
            }, 2000);
        } else {
            // Hacer scroll al primer error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de parallax sutil en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
    
    // Animaciones de entrada para las tarjetas de servicios
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animaciones a las tarjetas de servicios
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});