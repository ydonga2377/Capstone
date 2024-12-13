const translations = {
  en: { "Hello, welcome to our app!": "Hello, welcome to our app!" },
  es: { "Hello, welcome to our app!": "¡Hola, bienvenido a nuestra aplicación!" },
  fr: { "Hello, welcome to our app!": "Bonjour, bienvenue dans notre application!"},
};

// Translate text based on the selected language
export const translateText = async (text, lang) => {
  return translations[lang][text] || text; // Return translated text or the original if not found
};
