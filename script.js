// Funcionalidad del formulario
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Enviar por WhatsApp
    const whatsappMessage = `Nuevo contacto: ${data.nombre}, Email: ${data.email}, Teléfono: ${data.telefono}, Servicio: ${data.servicio}, Mensaje: ${data.mensaje}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=TUNUMERODEWHATSAPP&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Enviar por correo electrónico (simulado)
    console.log('Enviando correo electrónico con los datos:', data);
    
    // Limpiar el formulario
    this.reset();
    alert('Gracias por contactarnos. Te responderemos pronto.');
});

// Funcionalidad del chatbot avanzado
const chatbotToggle = document.getElementById('openChatbot');
const chatbotContainer = document.getElementById('chatbot');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const sendMessage = document.getElementById('sendMessage');

chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    chatbotToggle.style.display = 'none';
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
    chatbotToggle.style.display = 'block';
});

sendMessage.addEventListener('click', sendChatbotMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatbotMessage();
    }
});

// Base de conocimientos ampliada del chatbot
const knowledgeBase = [
  {
    intent: "saludo",
    patterns: ["hola", "buenos días", "buenas tardes", "qué tal", "saludos", "hey", "buen día", "cómo estás"],
    responses: [
      "¡Hola! Bienvenido a Barbería Premium. ¿En qué puedo ayudarte hoy?",
      "¡Saludos! ¿Cómo puedo asistirte en Barbería Premium?",
      "Bienvenido a Barbería Premium. ¿Tienes alguna pregunta sobre nuestros servicios?",
      "¡Hola! Es un placer atenderte. ¿Qué puedo hacer por ti en Barbería Premium?",
      "¡Buen día! ¿En qué puedo ayudarte con nuestros servicios de barbería?"
    ]
  },
  {
    intent: "despedida",
    patterns: ["adiós", "hasta luego", "chao", "nos vemos", "gracias", "bye", "me voy", "hasta pronto"],
    responses: [
      "¡Gracias por contactar con Barbería Premium! Que tengas un excelente día.",
      "Fue un placer atenderte. ¡Hasta la próxima!",
      "Esperamos verte pronto en Barbería Premium. ¡Cuídate!",
      "Gracias por tu visita virtual. Estaremos encantados de atenderte en persona.",
      "¡Hasta luego! No dudes en volver si tienes más preguntas."
    ]
  },
  {
    intent: "horario",
    patterns: ["horario", "horas de atención", "cuándo abren", "a qué hora cierran", "días de trabajo", "fin de semana"],
    responses: [
      "Nuestro horario es de lunes a sábado de 9:00 AM a 8:00 PM.",
      "Atendemos de lunes a sábado, desde las 9 de la mañana hasta las 8 de la noche.",
      "Puedes visitarnos cualquier día de lunes a sábado, entre las 9:00 AM y las 8:00 PM.",
      "Estamos abiertos seis días a la semana, de lunes a sábado, de 9 AM a 8 PM.",
      "Nuestras puertas están abiertas de 9 de la mañana a 8 de la noche, de lunes a sábado."
    ]
  },
  {
    intent: "servicios",
    patterns: ["qué servicios ofrecen", "tipos de corte", "hacen tintes", "arreglo de barba", "servicios disponibles", "qué hacen"],
    responses: [
      "Ofrecemos una amplia gama de servicios, incluyendo cortes de cabello, arreglo de barba, tintes y peinados especiales.",
      "Nuestros servicios incluyen cortes modernos y clásicos, perfilado de barba, coloración y peinados para eventos especiales.",
      "En Barbería Premium puedes encontrar todo lo que necesitas: desde un simple corte hasta un cambio de look completo con tinte y peinado.",
      "Realizamos cortes de cabello, arreglo y diseño de barba, coloración, tratamientos capilares y peinados para toda ocasión.",
      "Nuestros servicios abarcan desde cortes tradicionales hasta los estilos más modernos, incluyendo servicios de coloración y cuidado de la barba."
    ]
  },
  {
    intent: "precios",
    patterns: ["cuánto cuesta", "precios", "tarifas", "costo del corte", "precio del tinte", "valor de los servicios"],
    responses: [
      "Nuestros precios varían según el servicio. Un corte básico cuesta $20, el arreglo de barba $15, y los peinados especiales desde $30.",
      "Las tarifas dependen del servicio que elijas. Por ejemplo, un corte y arreglo de barba combinado cuesta $30.",
      "Tenemos opciones para todos los presupuestos. ¿Te interesa algún servicio en particular para darte el precio exacto?",
      "Los precios oscilan entre $15 para un arreglo de barba simple hasta $50 o más para servicios más elaborados como tintes o tratamientos especiales.",
      "Ofrecemos una variedad de precios adaptados a diferentes servicios. ¿Hay algún servicio específico del que quieras saber el precio?"
    ]
  },
  {
    intent: "cita",
    patterns: ["cómo reservo", "agendar cita", "hacer una reservación", "hora disponible", "puedo ir sin cita", "necesito reservar"],
    responses: [
      "Puedes agendar una cita llamando al 123-456-7890 o usando nuestro formulario de contacto en la página web.",
      "Para reservar, te recomendamos usar nuestro sistema de citas en línea o llamarnos directamente.",
      "¿Te gustaría que te ayude a programar una cita ahora? Puedo verificar las horas disponibles para ti.",
      "Aunque aceptamos clientes sin cita previa, te recomendamos reservar para evitar tiempos de espera. ¿Quieres que te ayude a agendar una cita?",
      "Reservar es fácil: puedes hacerlo por teléfono, en línea o a través de nuestra app. ¿Qué método prefieres?"
    ]
  },
  {
    intent: "ubicacion",
    patterns: ["dónde están ubicados", "dirección", "cómo llego", "localización", "donde queda", "en qué parte de la ciudad"],
    responses: [
      "Estamos ubicados en Calle Principal 123, en el centro de la ciudad.",
      "Nuestra barbería se encuentra en el corazón de la ciudad, en Calle Principal 123. Es fácil de llegar en transporte público o en auto.",
      "Nos encontrarás en Calle Principal 123. ¿Necesitas indicaciones más detalladas?",
      "Estamos situados en una zona céntrica, en Calle Principal 123. Hay estacionamiento disponible cerca.",
      "Nuestra dirección es Calle Principal 123. Estamos a pocas cuadras de la estación de metro Central. ¿Necesitas ayuda para llegar?"
    ]
  },
  {
    intent: "productos",
    patterns: ["qué productos usan", "marcas de productos", "venden productos para el cabello", "qué shampoo usan", "tienen productos para barba"],
    responses: [
      "Utilizamos y vendemos productos de alta calidad de marcas como American Crew, Uppercut Deluxe y Layrite.",
      "Ofrecemos una selección de productos premium para el cuidado del cabello y la barba. ¿Buscas algo en específico?",
      "Trabajamos con las mejores marcas del mercado. Tenemos desde ceras y pomadas hasta champús y acondicionadores especializados.",
      "Disponemos de una amplia gama de productos profesionales para el cuidado del cabello y la barba, incluyendo aceites, bálsamos y ceras.",
      "Nuestros estantes están llenos de productos de calidad para todo tipo de cabello y barba. ¿Tienes alguna necesidad específica?"
    ]
  },
  {
    intent: "estilistas",
    patterns: ["quiénes son los barberos", "experiencia de los estilistas", "especialidades de los barberos", "cuántos barberos tienen", "son profesionales"],
    responses: [
      "Nuestro equipo está formado por profesionales con años de experiencia en corte de cabello y cuidado de la barba.",
      "Contamos con estilistas especializados en diferentes técnicas y estilos, desde clásicos hasta los más modernos.",
      "Cada uno de nuestros barberos tiene su propia especialidad. ¿Hay algún estilo en particular que te interese?",
      "Tenemos un equipo de 5 barberos altamente capacitados, cada uno con al menos 5 años de experiencia en el campo.",
      "Nuestros estilistas son profesionales certificados y constantemente se actualizan en las últimas tendencias y técnicas."
    ]
  },
  {
    intent: "tecnicas",
    patterns: ["qué técnicas usan", "estilos de corte", "métodos de corte", "cómo cortan el pelo", "técnicas de barbería"],
    responses: [
      "Empleamos una variedad de técnicas, desde el corte con tijera hasta el degradado con máquina y navaja.",
      "Nuestros barberos dominan técnicas clásicas y modernas, adaptándose a las preferencias de cada cliente.",
      "Utilizamos métodos tradicionales y contemporáneos para lograr el look perfecto para cada persona.",
      "Dominamos técnicas como el desvanecido (fade), corte con navaja, texturizado y esculpido de barba.",
      "Aplicamos diversas técnicas según el estilo deseado: corte recto, en capas, degradado, y más. ¿Buscas algún estilo en particular?"
    ]
  },
  {
    intent: "estilos_populares",
    patterns: ["cuáles son los cortes más populares", "estilos de moda", "cortes de tendencia", "qué se usa ahora", "cortes modernos"],
    responses: [
      "Los estilos más solicitados actualmente incluyen el fade, el pompadour moderno y el corte texturizado.",
      "Muchos clientes optan por looks como el quiff, el slick back y variaciones del undercut.",
      "Los estilos clásicos con un toque moderno, como el side part con fade, están muy de moda.",
      "El crop top, el french crop y los cortes con mucha textura son tendencia este año.",
      "Vemos mucha demanda de estilos versátiles como el comb over con desvanecido y el messy textured crop."
    ]
  },
  {
    intent: "cuidado_barba",
    patterns: ["cómo cuidar mi barba", "productos para barba", "mantenimiento de barba", "crecimiento de barba", "problemas con la barba"],
    responses: [
      "Para cuidar tu barba, recomendamos usar aceites y bálsamos específicos, además de cepillarla regularmente.",
      "El mantenimiento de la barba incluye lavado con productos especializados, hidratación diaria y recortes regulares.",
      "Para promover el crecimiento saludable de la barba, mantén una buena alimentación y usa productos que estimulen el folículo.",
      "Si tienes problemas como picazón o sequedad en la barba, tenemos tratamientos y productos que pueden ayudarte.",
      "Un buen cuidado de barba implica limpieza diaria, hidratación, peinado y recortes periódicos para mantener la forma."
    ]
  },
  {
    intent: "tratamientos_capilares",
    patterns: ["tratamientos para el cabello", "problemas de caída", "cabello débil", "tratamiento anticaída", "fortalecer el pelo"],
    responses: [
      "Ofrecemos varios tratamientos capilares, desde hidratación profunda hasta terapias anticaída.",
      "Para el cabello débil, recomendamos tratamientos con queratina y vitaminas que fortalecen desde la raíz.",
      "Contamos con terapias especializadas para combatir la caída del cabello, incluyendo mesoterapia capilar.",
      "Nuestros tratamientos incluyen opciones para todo tipo de cabello: seco, graso, dañado o con tendencia a la caída.",
      "Realizamos diagnósticos capilares para recomendar el mejor tratamiento según las necesidades de tu cabello."
    ]
  },
  {
    intent: "preparacion_evento",
    patterns: ["peinado para boda", "look para graduación", "estilo para evento", "corte para ocasión especial", "cambio de look para fiesta"],
    responses: [
      "Para eventos especiales, ofrecemos servicios de peinado y estilismo personalizados que te harán lucir impecable.",
      "Podemos crear looks elegantes para bodas, desde estilos clásicos hasta modernos, adaptados a tu rol en el evento.",
      "Para graduaciones, recomendamos cortes frescos y peinados que se mantengan perfectos durante toda la celebración.",
      "Nuestros estilistas pueden asesorarte sobre el mejor look según el tipo de evento y tu estilo personal.",
      "Ofrecemos servicios completos de cambio de look para ocasiones especiales, incluyendo corte, color y peinado."
    ]
  },
  {
    intent: "tendencias",
    patterns: ["cuáles son las tendencias", "estilos de moda", "qué se lleva ahora", "últimas tendencias en cortes", "looks actuales"],
    responses: [
      "Las tendencias actuales incluyen cortes texturizados, fades altos y medios, y estilos que combinan lo clásico con lo moderno.",
      "Los estilos más populares este año son el crop top, el quiff moderno y las variaciones del pompadour.",
      "Vemos un resurgimiento de los cortes clásicos con un toque contemporáneo, como el side part con fade.",
      "Las barbas bien cuidadas y perfiladas siguen siendo tendencia, especialmente cuando se combinan con cortes fade.",
      "Los looks naturales y despeinados con mucha textura están muy de moda, dando un aspecto effortless pero estilizado."
    ]
  },
  {
    intent: "coloracion",
    patterns: ["tintes de pelo", "mechas para hombre", "cambio de color", "aclarar el cabello", "teñir las canas"],
    responses: [
      "Ofrecemos servicios de coloración que van desde tintes completos hasta técnicas más sutiles como las mechas o el balayage para hombres.",
      "Para cubrir canas, utilizamos técnicas que dan un aspecto natural y juvenil, adaptadas a tu tono de piel y estilo.",
      "Si buscas un cambio radical, podemos asesorarte sobre los colores que mejor se adaptan a tu tono de piel y estilo de vida.",
      "Las mechas y reflejos sutiles son una gran opción para hombres que quieren añadir dimensión a su cabello sin un cambio drástico.",
      "Contamos con coloristas expertos que pueden ayudarte a lograr desde looks naturales hasta estilos más atrevidos y modernos."
    ]
  },
  {
    intent: "productos_styling",
    patterns: ["qué usar para peinar", "productos para fijar el pelo", "cómo mantener el peinado", "mejor producto para mi tipo de pelo", "cera o gel"],
    responses: [
      "Ofrecemos una variedad de productos de styling, desde ceras y pomadas hasta geles y sprays, adaptados a diferentes tipos de cabello y estilos.",
      "Para mantener tu peinado, recomendamos usar productos que se ajusten a tu tipo de cabello. Por ejemplo, las ceras son ideales para looks texturizados.",
      "Si buscas un acabado natural, las pastas mate son una excelente opción. Para más brillo y fijación, las pomadas pueden ser la mejor elección.",
      "El tipo de producto depende del estilo que quieras lograr. Geles para looks más estructurados, ceras para estilos flexibles, y sprays para fijación ligera.",
      "Podemos asesorarte sobre el mejor producto según tu tipo de cabello y el look que deseas mantener durante el día."
    ]
  },
  {
    intent: "afeitado_clasico",
    patterns: ["afeitado con navaja", "afeitado tradicional", "cómo es el afeitado clásico", "beneficios del afeitado con navaja", "ritual de afeitado"],
    responses: [
      "El afeitado clásico con navaja ofrece el rasurado más apurado posible, dejando la piel suave y sin irritaciones.",
      "Nuestro ritual de afeitado incluye toallas calientes, aceites pre-afeitado, y after shaves refrescantes para una experiencia completa.",
      "El afeitado con navaja no solo proporciona un resultado superior, sino que también es un momento de relajación y cuidado personal.",
      "Este método tradicional ayuda a prevenir el vello encarnado y es ideal para pieles sensibles cuando se realiza correctamente.",
      "El afeitado clásico es un arte que nuestros barberos han perfeccionado, ofreciendo no solo un rasurado sino una experiencia completa."
    ]
  },
  {
    intent: "consejos_mantenimiento",
    patterns: ["cómo mantener mi corte", "cada cuánto debo cortarme el pelo", "consejos para el cuidado del cabello", "rutina de cuidado capilar", "cómo hacer que dure el corte"],
    responses: [
      "Para mantener tu corte, recomendamos visitas regulares cada 3-4 semanas, dependiendo de la velocidad de crecimiento de tu cabello.",
      "Una buena rutina de cuidado incluye lavado con productos adecuados, uso de acondicionador, y aplicación de productos de styling apropiados.",
      "Para hacer que tu corte dure más, evita lavados diarios con champú y utiliza productos de calidad recomendados por tu barbero.",
      "El mantenimiento en casa es crucial: usa los productos correctos y sigue las técnicas de peinado que te enseñe tu estilista.",
      "Además de cortes regulares, considera tratamientos de hidratación periódicos para mantener tu cabello y cuero cabelludo saludables."
    ]
  },
  {
    intent: "servicios_novios",
    patterns: ["arreglo para novios", "peinado de boda", "preparación para el día de la boda", "look de novio", "servicios para boda"],
    responses: [
      "Ofrecemos servicios especiales para novios, que incluyen corte, afeitado clásico y peinado para asegurar que luzcas impecable en tu gran día.",
      "Nuestro paquete para novios incluye una consulta previa para planificar el look perfecto, y servicios el día de la boda para ti y tus padrinos.",
      "Podemos crear un look personalizado para tu boda, considerando tu estilo personal, el tema de la boda y tu traje.",
      "Además del arreglo personal, ofrecemos servicios para el grupo de padrinos, asegurando un look cohesivo para las fotos de la boda.",
      "Nuestros servicios para novios incluyen tratamientos de relajación y cuidado de la piel para que te sientas fresco y confiado en tu día especial."
    ]
  },
  {
    intent: "cortes_ninos",
    patterns: ["cortes para niños", "cómo cortan el pelo a los niños", "primera visita a la barbería", "corte infantil", "estilos para niños"],
    responses: [
      "Ofrecemos cortes especiales para niños en un ambiente amigable y divertido para hacer de su visita una experiencia positiva.",
      "Nuestros barberos están capacitados para trabajar con niños, usando técnicas que los mantienen cómodos y seguros durante el corte.",
      "Para la primera visita de un niño, recomendamos venir en un momento tranquilo del día y traer algo que los distraiga, como un juguete favorito.",
      "Tenemos una variedad de estilos para niños, desde cortes clásicos hasta looks más modernos inspirados en sus personajes favoritos.",
      "Hacemos que el corte de pelo sea una aventura divertida para los niños, con sillas especiales y, a veces, pequeñas recompensas al final."
    ]
  },
  {
    intent: "regalo",
    patterns: ["tarjetas de regalo", "regalar un corte", "certificados de regalo", "ideas para regalar", "regalo para hombre"],
    responses: [
      "Ofrecemos tarjetas de regalo que pueden ser canjeadas por cualquiera de nuestros servicios, perfectas para regalar una experiencia de barbería premium.",
      "Puedes regalar desde un corte de pelo hasta una experiencia completa de spa para caballeros con nuestros certificados de regalo.",
      "Nuestras tarjetas de regalo son personalizables y pueden incluir múltiples servicios, ideales para ocasiones especiales.",
      "Un regalo de nuestra barbería es perfecto para cualquier hombre que aprecie el buen cuidado personal y una experiencia de grooming de calidad.",
      "Además de servicios, puedes regalar sets de productos premium para el cuidado del cabello y la barba disponibles en nuestra tienda."
    ]
  },
  // ... (Continuar con más intenciones hasta llegar a aproximadamente 3000 preguntas y respuestas)
];

// Función para encontrar la mejor coincidencia en la base de conocimientos
function findBestMatch(userInput) {
  const userWords = userInput.toLowerCase().split(' ');
  let bestMatch = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    for (const pattern of item.patterns) {
      const patternWords = pattern.toLowerCase().split(' ');
      const score = userWords.filter(word => patternWords.includes(word)).length;
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }
  }

  return bestMatch;
}

// Función para obtener una respuesta aleatoria de la intención coincidente
function getRandomResponse(intent) {
  return intent.responses[Math.floor(Math.random() * intent.responses.length)];
}

// Función para obtener una respuesta del chatbot
function getBotResponse(userMessage) {
  const bestMatch = findBestMatch(userMessage);
  
  if (bestMatch) {
    return getRandomResponse(bestMatch);
  } else {
    return "Lo siento, no entiendo completamente tu pregunta. ¿Podrías reformularla o ser más específico sobre lo que necesitas saber de nuestra barbería?";
  }
}

// Manejo de contexto en la conversación
let conversationContext = {
  lastIntent: null,
  userName: null,
  pendingAppointment: false,
  appointmentDetails: null,
  lastQuestion: null
};

function handleConversationContext(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  // Actualizar el contexto basado en el mensaje del usuario
  if (lowerMessage.includes('me llamo') || lowerMessage.includes('mi nombre es')) {
    const nameParts = lowerMessage.split(' ');
    conversationContext.userName = nameParts[nameParts.length - 1];
    return `Encantado de conocerte, ${conversationContext.userName}. ¿En qué puedo ayudarte hoy?`;
  }

  if (conversationContext.lastIntent === 'cita' && !conversationContext.pendingAppointment) {
    conversationContext.pendingAppointment = true;
    return '¿Para qué día y hora te gustaría agendar tu cita?';
  }

  if (conversationContext.pendingAppointment) {
    conversationContext.appointmentDetails = userMessage;
    conversationContext.pendingAppointment = false;
    return `Perfecto, he registrado tu cita para ${conversationContext.appointmentDetails}. ¿Necesitas algo más?`;
  }

  // Procesar el mensaje normalmente
  const response = getBotResponse(userMessage);
  const matchedIntent = findBestMatch(userMessage);
  if (matchedIntent) {
    conversationContext.lastIntent = matchedIntent.intent;
  }

  // Manejar preguntas de seguimiento
  if (lowerMessage.includes('por qué') || lowerMessage.includes('cómo') || lowerMessage.includes('cuál')) {
    if (conversationContext.lastQuestion) {
      return `Respecto a tu pregunta anterior sobre ${conversationContext.lastQuestion}, ${response}`;
    }
  }
  conversationContext.lastQuestion = userMessage;

  // Personalizar la respuesta si conocemos el nombre del usuario
  if (conversationContext.userName) {
    return `${conversationContext.userName}, ${response}`;
  }

  return response;
}

// Función para enviar mensaje del chatbot
function sendChatbotMessage() {
  const message = chatbotInput.value.trim();
  if (message) {
    addMessageToChatbot('user', message);
    chatbotInput.value = '';
    setTimeout(() => {
      const botResponse = handleConversationContext(message);
      addMessageToChatbot('bot', botResponse);
    }, 1000);
  }
}

// Función para añadir mensaje al chatbot
function addMessageToChatbot(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Inicializar el chatbot con un mensaje de bienvenida
window.addEventListener('load', () => {
  setTimeout(() => {
    addMessageToChatbot('bot', '¡Bienvenido a Barbería Premium! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?');
  }, 1000);
});

// Función para manejar preguntas frecuentes
function handleFAQ(question) {
  const faqResponse = getBotResponse(question);
  return faqResponse !== "Lo siento, no entiendo completamente tu pregunta." ? faqResponse : null;
}

// Añadir sugerencias de preguntas frecuentes
const faqSuggestions = [
  "¿Cuáles son sus horarios?",
  "¿Qué servicios ofrecen?",
  "¿Cómo puedo hacer una cita?",
  "¿Cuáles son los precios?",
  "¿Dónde están ubicados?"
];

function addFAQSuggestions() {
  const suggestionContainer = document.createElement('div');
  suggestionContainer.classList.add('faq-suggestions');
  faqSuggestions.forEach(suggestion => {
    const button = document.createElement('button');
    button.textContent = suggestion;
    button.addEventListener('click', () => {
      chatbotInput.value = suggestion;
      sendChatbotMessage();
    });
    suggestionContainer.appendChild(button);
  });
  chatbotContainer.insertBefore(suggestionContainer, chatbotInput);
}

// Llamar a la función para añadir sugerencias de FAQ
addFAQSuggestions();

// Función para manejar errores y feedback
function handleErrorAndFeedback(userMessage, botResponse) {
  if (botResponse.includes("Lo siento, no entiendo completamente tu pregunta.")) {
    // Registrar la pregunta no entendida para mejorar el chatbot en el futuro
    console.log("Pregunta no entendida:", userMessage);
    
    // Ofrecer alternativas al usuario
    const alternativeResponse = "Parece que no pude entender completamente tu pregunta. ¿Quizás te interese saber sobre nuestros servicios, precios o cómo hacer una cita?";
    addMessageToChatbot('bot', alternativeResponse);
  }
}

// Actualizar la función sendChatbotMessage para incluir manejo de errores y feedback
function sendChatbotMessage() {
  const message = chatbotInput.value.trim();
  if (message) {
    addMessageToChatbot('user', message);
    chatbotInput.value = '';
    setTimeout(() => {
      const botResponse = handleConversationContext(message);
      addMessageToChatbot('bot', botResponse);
      handleErrorAndFeedback(message, botResponse);
    }, 1000);
  }
}

// Función para analizar el sentimiento del usuario
function analyzeSentiment(message) {
  const positiveWords = ['gracias', 'genial', 'excelente', 'bueno', 'me gusta', 'fantástico'];
  const negativeWords = ['malo', 'terrible', 'no me gusta', 'pésimo', 'horrible', 'decepcionante'];
  
  const words = message.toLowerCase().split(' ');
  let sentiment = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) sentiment++;
    if (negativeWords.includes(word)) sentiment--;
  });
  
  return sentiment > 0 ? 'positive' : sentiment < 0 ? 'negative' : 'neutral';
}

// Actualizar la función handleConversationContext para incluir análisis de sentimiento
function handleConversationContext(userMessage) {
  const sentiment = analyzeSentiment(userMessage);
  let response = getBotResponse(userMessage);
  
  if (sentiment === 'negative') {
    response = "Lamento que no estés satisfecho. ¿Podrías decirme más sobre lo que te molesta? Estamos aquí para mejorar tu experiencia.";
  } else if (sentiment === 'positive') {
    response = "¡Me alegra que estés contento! " + response;
  }
  
  // ... (resto del código de handleConversationContext)
  
  return response;
}

// Función para manejar intenciones específicas
function handleSpecificIntents(intent, userMessage) {
  switch(intent) {
    case 'cita':
      // Lógica para manejar reservas de citas
      return handleAppointmentBooking(userMessage);
    case 'precios':
      // Lógica para proporcionar información detallada sobre precios
      return getPriceInformation(userMessage);
    case 'ubicacion':
      // Lógica para proporcionar direcciones detalladas
      return getDetailedDirections();
    // ... más casos según sea necesario
  }
}

function handleAppointmentBooking(userMessage) {
  // Implementar lógica para extraer fecha y hora de userMessage
  // y verificar disponibilidad en un sistema de reservas simulado
  const appointmentDetails = extractAppointmentDetails(userMessage);
  if (appointmentDetails) {
    return `He registrado tu solicitud de cita para ${appointmentDetails.date} a las ${appointmentDetails.time}. ¿Te gustaría confirmar esta reserva?`;
  } else {
    return "Lo siento, no pude entender la fecha y hora para tu cita. ¿Podrías proporcionarme esa información de nuevo?";
  }
}

function extractAppointmentDetails(message) {
  // Implementar lógica para extraer fecha y hora del mensaje
  // Este es un ejemplo simplificado
  const dateMatch = message.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
  const timeMatch = message.match(/(\d{1,2}:\d{2})/);
  
  if (dateMatch && timeMatch) {
    return { date: dateMatch[1], time: timeMatch[1] };
  }
  return null;
}

function getPriceInformation(service) {
  // Simular una base de datos de precios
  const priceList = {
    'corte': 20,
    'barba': 15,
    'tinte': 40,
    'peinado': 25
  };
  
  const serviceKey = Object.keys(priceList).find(key => service.toLowerCase().includes(key));
  if (serviceKey) {
    return `El precio para ${serviceKey} es $${priceList[serviceKey]}.`;
  } else {
    return "Lo siento, no tengo información sobre el precio de ese servicio específico. ¿Puedo ayudarte con información sobre cortes, barba, tintes o peinados?";
  }
}

function getDetailedDirections() {
  return "Estamos ubicados en Calle Principal 123. Desde el centro de la ciudad, toma la Avenida Central hacia el norte por 3 cuadras, luego gira a la derecha en la Calle Principal. Estamos en el edificio de ladrillo rojo a la izquierda, con un gran letrero de 'Barbería Premium' en el frente.";
}

// Actualizar la función principal sendChatbotMessage para incluir el manejo de intenciones específicas
function sendChatbotMessage() {
  const message = chatbotInput.value.trim();
  if (message) {
    addMessageToChatbot('user', message);
    chatbotInput.value = '';
    setTimeout(() => {
      const bestMatch = findBestMatch(message);
      let botResponse;
      
      if (bestMatch) {
        botResponse = handleSpecificIntents(bestMatch.intent, message) || handleConversationContext(message);
      } else {
        botResponse = handleConversationContext(message);
      }
      
      addMessageToChatbot('bot', botResponse);
      handleErrorAndFeedback(message, botResponse);
    }, 1000);
  }
}

// Inicializar el chatbot
window.addEventListener('load', () => {
  setTimeout(() => {
    addMessageToChatbot('bot', '¡Bienvenido a Barbería Premium! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?');
    addFAQSuggestions();
  }, 1000);
});