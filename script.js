document.addEventListener('DOMContentLoaded', () => {
  // Navegación responsive
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  navToggle.addEventListener('click', () => {
      navList.classList.toggle('show');
  });

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
          navList.classList.remove('show');
      });
  });

  // Cambiar estilo del header al hacer scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // Animaciones al hacer scroll
  const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
          if (isElementInViewport(element)) {
              element.classList.add('animated');
          }
      });
  };

  // Función para verificar si un elemento está en el viewport
  const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  };

  // Ejecutar animaciones al hacer scroll
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Ejecutar una vez al cargar la página

  // Efecto parallax para la sección hero
  window.addEventListener('scroll', () => {
      const hero = document.querySelector('.hero');
      const scrollPosition = window.pageYOffset;
      hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  });

  // Animación del botón CTA
  const ctaButton = document.querySelector('.cta-button');
  ctaButton.addEventListener('mouseover', () => {
      ctaButton.style.animation = 'pulse 0.5s ease-in-out';
  });
  ctaButton.addEventListener('animationend', () => {
      ctaButton.style.animation = '';
  });

  // Funcionalidad del formulario de contacto
  const contactForm = document.getElementById('contactForm');
  const formFields = contactForm.querySelectorAll('input, select, textarea');
  const formSubmitButtons = contactForm.querySelectorAll('.submit-btn');

  // Función para validar el formulario
  const validateForm = () => {
      let isValid = true;
      formFields.forEach(field => {
          if (field.required && !field.value.trim()) {
              isValid = false;
              field.classList.add('error');
          } else {
              field.classList.remove('error');
          }
      });
      return isValid;
  };

  // Función para mostrar mensajes de error o éxito
  const showMessage = (message, type) => {
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      messageElement.className = `message ${type}`;
      contactForm.appendChild(messageElement);
      setTimeout(() => {
          messageElement.remove();
      }, 5000);
  };

  // Función para formatear el mensaje de WhatsApp
  const formatWhatsAppMessage = (formData, barbero) => {
      const nombre = formData.get('nombre');
      const servicio = formData.get('servicio');
      const horario = formData.get('horario');
      const mensaje = formData.get('mensaje');

      return encodeURIComponent(
          `Hola, quisiera agendar una cita ${barbero}.\n\n` +
          `Mi nombre es: ${nombre}\n` +
          `Servicio: ${servicio}\n` +
          `Horario: ${horario}\n` +
           'Si tienes disponibilidad, por favor házmelo saber. Gracias!'
      );
  };

 // Función para abrir el chat de WhatsApp
const openWhatsAppChat = (message, barbero) => {
  let whatsappNumber;
  
  // Define el número de WhatsApp según el barbero
  if (barbero === 'Alexis') {
      whatsappNumber = '524411000885'; // Reemplaza con el número de Alexis
  } else if (barbero === 'Ivan') {
      whatsappNumber = '524412822828'; // Reemplaza con el número de Iván
  }
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

// Manejar el envío del formulario
formSubmitButtons.forEach(button => {
  button.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (validateForm()) {
          const formData = new FormData(contactForm);
          const barbero = e.target.dataset.barbero;  // Obtiene el barbero según el botón presionado
          const whatsappMessage = formatWhatsAppMessage(formData, barbero);

          // Abrir chat de WhatsApp
          openWhatsAppChat(whatsappMessage, barbero);

          // Mostrar mensaje de éxito
          showMessage(`Tu solicitud de cita con ${barbero} ha sido enviada por WhatsApp. Por favor, revisa tu aplicación de WhatsApp para continuar la conversación.`, 'success');
          contactForm.reset();
      } else {
          showMessage('Por favor, completa todos los campos requeridos.', 'error');
      }
  });
});


  // Validación en tiempo real
  formFields.forEach(field => {
      field.addEventListener('blur', () => {
          if (field.required && !field.value.trim()) {
              field.classList.add('error');
          } else {
              field.classList.remove('error');
          }
      });
  });

  // Animación suave para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Lazy loading para imágenes
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyLoadImage = (image) => {
      image.setAttribute('src', image.getAttribute('data-src'));
      image.onload = () => {
          image.removeAttribute('data-src');
      };
  };

  if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  lazyLoadImage(entry.target);
                  observer.unobserve(entry.target);
              }
          });
      });

      lazyImages.forEach(image => imageObserver.observe(image));
  } else {
      lazyImages.forEach(image => lazyLoadImage(image));
  }

  // Animación para las tarjetas de servicios
  const servicios = document.querySelectorAll('.servicio-card');
  const observerOptions = {
      threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-fadeIn');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  servicios.forEach(servicio => {
      observer.observe(servicio);
  });

  // Animación para las imágenes de la galería
  const galeriaImages = document.querySelectorAll('.galeria-img');
  const galeriaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-zoomIn');
              galeriaObserver.unobserve(entry.target);
          }
      });
  }, observerOptions);

  galeriaImages.forEach(image => {
      galeriaObserver.observe(image);
  });

  // Animación para las tarjetas de miembros del equipo
  const miembros = document.querySelectorAll('.miembro-card');
  const miembrosObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-fadeIn');
              miembrosObserver.unobserve(entry.target);
          }
      });
  }, observerOptions);

  miembros.forEach(miembro => {
      miembrosObserver.observe(miembro);
  });

  // Mejora de la accesibilidad
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
  focusableElements.forEach(element => {
      element.addEventListener('focus', () => {
          element.style.outline = '2px solid var(--accent-color)';
      });
      element.addEventListener('blur', () => {
          element.style.outline = 'none';
      });
  });

  // Animación de carga inicial
  window.addEventListener('load', () => {
      document.body.classList.add('loaded');
  });

  // Inicialización del mapa de Google
  function initMap() {
      const location = { lat: 20.998803, lng: -99.721815 }; // Reemplaza con las coordenadas reales de la barbería
      const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: location
      });
      const marker = new google.maps.Marker({
          position: location,
          map: map
      });
  }

  // Asegúrate de que la función initMap esté disponible globalmente
  window.initMap = initMap;
});

