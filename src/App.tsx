import { useState, useEffect } from "react";
import { HomePage } from "./components/HomePage";
import { SandboxPage } from "./components/SandboxPage";
import { SavedProjectsPage } from "./components/SavedProjectsPage";
import { Toaster } from "./components/ui/sonner";

// Extended mock data for different ideas with more templates
const ideaTemplates: Record<
  string,
  { title: string; htmlCode: string; cssCode: string; jsCode: string }
> = {
  "1": {
    title: "Centrar un Div - La Guía Definitiva",
    htmlCode: `<div class="container">
  <div class="box">
    <h2>¡Perfectamente Centrado!</h2>
    <p>Este div está centrado usando Flexbox</p>
  </div>
</div>`,
    cssCode: `body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #1A1B26 0%, #24283B 100%);
}

/* Método 1: Flexbox */
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.box {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(122, 162, 247, 0.3);
  text-align: center;
  max-width: 500px;
}

h2 {
  color: #7AA2F7;
  margin: 0 0 12px 0;
  font-size: 28px;
}

p {
  color: #666;
  margin: 0;
  font-size: 16px;
}`,
    jsCode: `console.log('Centrado con Flexbox');
console.log('display: flex + align-items: center + justify-content: center');

// Alternativamente, puedes centrar con Grid:
// display: grid;
// place-items: center;`,
  },
  "2": {
    title: "Animación de Botón con Hover Effect",
    htmlCode: `<div class="container">
  <button class="animated-btn">
    <span>Hover Me!</span>
  </button>
  <button class="glow-btn">
    <span>Glow Effect</span>
  </button>
</div>`,
    cssCode: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1A1B26;
  font-family: 'Inter', sans-serif;
}

.container {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.animated-btn {
  position: relative;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #7AA2F7, #BB9AF7);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(122, 162, 247, 0.4);
}

.animated-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.animated-btn:hover::before {
  width: 300px;
  height: 300px;
}

.animated-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(122, 162, 247, 0.6);
}

.animated-btn:active {
  transform: translateY(-2px);
}

.animated-btn span {
  position: relative;
  z-index: 1;
}

.glow-btn {
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: #F7768E;
  border: 2px solid #F7768E;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px #F7768E,
                0 0 20px #F7768E,
                0 0 30px #F7768E;
  }
  to {
    box-shadow: 0 0 20px #F7768E,
                0 0 30px #F7768E,
                0 0 40px #F7768E,
                0 0 50px #F7768E;
  }
}

.glow-btn:hover {
  background: transparent;
  color: #F7768E;
}`,
    jsCode: `const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('¡Botón clickeado con estilo!');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 100);
  });
});

console.log('Efectos de hover con CSS animations cargados');`,
  },
  "3": {
    title: "Fetch API con Async/Await",
    htmlCode: `<div class="container">
  <h1>Random User Generator</h1>
  <div id="user-card" class="user-card">
    <div class="loading">Cargando...</div>
  </div>
  <button id="fetch-btn">Obtener Usuario Random</button>
</div>`,
    cssCode: `body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  background: #1A1B26;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: #24283B;
  padding: 40px;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

h1 {
  color: #C0CAF5;
  margin: 0 0 24px 0;
}

.user-card {
  background: #1F2335;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  color: #7AA2F7;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.user-info {
  color: #C0CAF5;
}

.user-info img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 16px;
  border: 3px solid #7AA2F7;
}

.user-info h2 {
  margin: 0 0 8px 0;
  color: #7AA2F7;
}

.user-info p {
  margin: 4px 0;
  color: #A9B1D6;
}

#fetch-btn {
  background: #7AA2F7;
  color: #1A1B26;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

#fetch-btn:hover {
  background: #89B4FA;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(122, 162, 247, 0.4);
}`,
    jsCode: `const fetchBtn = document.getElementById('fetch-btn');
const userCard = document.getElementById('user-card');

async function fetchRandomUser() {
  try {
    userCard.innerHTML = '<div class="loading">Cargando...</div>';
    
    const response = await fetch('https://randomuser.me/api/');
    
    if (!response.ok) {
      throw new Error('Error en la petición');
    }
    
    const data = await response.json();
    const user = data.results[0];
    
    console.log('Usuario obtenido:', user);
    
    userCard.innerHTML = \`
      <div class="user-info">
        <img src="\${user.picture.large}" alt="Avatar">
        <h2>\${user.name.first} \${user.name.last}</h2>
        <p>\${user.email}</p>
        <p>\${user.location.city}, \${user.location.country}</p>
      </div>
    \`;
    
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    userCard.innerHTML = '<div class="loading">Error al cargar datos</div>';
  }
}

fetchBtn.addEventListener('click', fetchRandomUser);

// Cargar un usuario al iniciar
fetchRandomUser();`,
  },
  "4": {
    title: "Modal / Popup Interactivo",
    htmlCode: `<div class="container">
  <h1>Modal Demo</h1>
  <button id="openModal" class="btn-primary">Abrir Modal</button>
</div>

<div id="modal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>¡Hola desde el Modal!</h2>
    <p>Este es un ejemplo de modal interactivo creado con JavaScript vanilla.</p>
    <button id="closeBtn" class="btn-secondary">Cerrar</button>
  </div>
</div>`,
    cssCode: `body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  background: #1A1B26;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
}

h1 {
  color: #C0CAF5;
  margin-bottom: 24px;
}

.btn-primary {
  background: #7AA2F7;
  color: #1A1B26;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #89B4FA;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(122, 162, 247, 0.4);
}

.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;
}

.modal.show {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: #24283B;
  padding: 32px;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  position: relative;
  animation: slideIn 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close {
  position: absolute;
  right: 20px;
  top: 20px;
  color: #A9B1D6;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close:hover {
  color: #F7768E;
}

.modal-content h2 {
  color: #7AA2F7;
  margin: 0 0 16px 0;
}

.modal-content p {
  color: #A9B1D6;
  margin: 0 0 24px 0;
}

.btn-secondary {
  background: transparent;
  color: #7AA2F7;
  border: 2px solid #7AA2F7;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #7AA2F7;
  color: #1A1B26;
}`,
    jsCode: `const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeBtn');
const closeX = document.querySelector('.close');

function openModal() {
  modal.classList.add('show');
  console.log('Modal abierto');
}

function closeModal() {
  modal.classList.remove('show');
  console.log('Modal cerrado');
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
closeX.addEventListener('click', closeModal);

// Cerrar modal al hacer clic fuera del contenido
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});

console.log('Modal interactivo cargado');`,
  },
  "8": {
    title: "Loading Spinner Animado",
    htmlCode: `<div class="container">
  <h1>Loading Spinners</h1>
  
  <div class="spinner-grid">
    <div class="spinner-box">
      <div class="spinner spinner-1"></div>
      <p>Classic</p>
    </div>
    
    <div class="spinner-box">
      <div class="spinner spinner-2"></div>
      <p>Dots</p>
    </div>
    
    <div class="spinner-box">
      <div class="spinner spinner-3"></div>
      <p>Pulse</p>
    </div>
    
    <div class="spinner-box">
      <div class="spinner spinner-4"></div>
      <p>Bars</p>
    </div>
  </div>
</div>`,
    cssCode: `body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  background: #1A1B26;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
  width: 100%;
  max-width: 800px;
}

h1 {
  color: #C0CAF5;
  margin-bottom: 48px;
}

.spinner-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 32px;
}

.spinner-box {
  background: #24283B;
  padding: 32px;
  border-radius: 12px;
}

.spinner-box p {
  color: #A9B1D6;
  margin-top: 16px;
}

.spinner {
  margin: 0 auto;
}

/* Spinner 1 - Classic */
.spinner-1 {
  width: 50px;
  height: 50px;
  border: 4px solid #292E42;
  border-top-color: #7AA2F7;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Spinner 2 - Dots */
.spinner-2 {
  width: 50px;
  height: 50px;
  position: relative;
}

.spinner-2::before,
.spinner-2::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background: #BB9AF7;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.spinner-2::before {
  left: 0;
  animation-delay: -0.32s;
}

.spinner-2::after {
  right: 0;
}

/* Spinner 3 - Pulse */
.spinner-3 {
  width: 50px;
  height: 50px;
  background: #9ECE6A;
  border-radius: 50%;
  animation: pulse 1.2s ease-in-out infinite;
}

/* Spinner 4 - Bars */
.spinner-4 {
  width: 60px;
  height: 50px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.spinner-4::before,
.spinner-4::after {
  content: '';
  width: 12px;
  height: 100%;
  background: #F7768E;
  animation: bars 1s ease-in-out infinite;
}

.spinner-4::before {
  animation-delay: -0.4s;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

@keyframes bars {
  0%, 100% {
    height: 100%;
  }
  50% {
    height: 30%;
  }
}`,
    jsCode: `console.log('Loading spinners animados con CSS');

// Simular carga
const spinners = document.querySelectorAll('.spinner');
let loadingCount = 0;

setInterval(() => {
  loadingCount++;
  console.log(\`Loading... \${loadingCount}\`);
}, 2000);`,
  },
  "6": {
    title: "Formulario con Validación",
    htmlCode: `<div class="container">
  <form id="contactForm" class="form">
    <h2>Formulario de Contacto</h2>
    
    <div class="form-group">
      <label for="name">Nombre</label>
      <input type="text" id="name" name="name" required>
      <span class="error" id="nameError"></span>
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
      <span class="error" id="emailError"></span>
    </div>
    
    <div class="form-group">
      <label for="message">Mensaje</label>
      <textarea id="message" name="message" rows="4" required></textarea>
      <span class="error" id="messageError"></span>
    </div>
    
    <button type="submit">Enviar</button>
  </form>
  
  <div id="successMessage" class="success-message">
    ¡Formulario enviado con éxito!
  </div>
</div>`,
    cssCode: `body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  background: #1A1B26;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 500px;
}

.form {
  background: #24283B;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

h2 {
  color: #C0CAF5;
  margin: 0 0 24px 0;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  color: #A9B1D6;
  margin-bottom: 8px;
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  background: #1F2335;
  border: 2px solid #292E42;
  border-radius: 8px;
  color: #C0CAF5;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #7AA2F7;
}

input.invalid,
textarea.invalid {
  border-color: #F7768E;
}

.error {
  display: block;
  color: #F7768E;
  font-size: 12px;
  margin-top: 4px;
  min-height: 18px;
}

button {
  width: 100%;
  padding: 14px;
  background: #7AA2F7;
  color: #1A1B26;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #89B4FA;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(122, 162, 247, 0.4);
}

.success-message {
  display: none;
  margin-top: 20px;
  padding: 16px;
  background: #9ECE6A;
  color: #1A1B26;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  animation: slideIn 0.3s ease;
}

.success-message.show {
  display: block;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
    jsCode: `const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Clear previous errors
  clearErrors();
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  let isValid = true;
  
  // Validate name
  if (name.length < 2) {
    showError('name', 'El nombre debe tener al menos 2 caracteres');
    isValid = false;
  }
  
  // Validate email
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('email', 'Por favor ingresa un email válido');
    isValid = false;
  }
  
  // Validate message
  if (message.length < 10) {
    showError('message', 'El mensaje debe tener al menos 10 caracteres');
    isValid = false;
  }
  
  if (isValid) {
    console.log('Formulario válido:', { name, email, message });
    successMessage.classList.add('show');
    form.reset();
    
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 3000);
  }
});

function showError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorSpan = document.getElementById(fieldName + 'Error');
  
  field.classList.add('invalid');
  errorSpan.textContent = message;
  
  console.error(\`Validation error: \${fieldName} - \${message}\`);
}

function clearErrors() {
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.classList.remove('invalid');
  });
  
  const errors = form.querySelectorAll('.error');
  errors.forEach(error => {
    error.textContent = '';
  });
}

console.log('Formulario con validación inicializado');`,
  },
};

interface SavedProject {
  id: string;
  title: string;
  description: string;
  tags: Array<"html" | "css" | "javascript" | "react" | "vue" | "typescript">;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  thumbnail?: string;
  lastModified: number;
}

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "sandbox" | "saved">("home");
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<SavedProject | null>(null);

  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleTrySandbox = (ideaId: string) => {
    setSelectedIdea(ideaId);
    setCurrentProject(null);
    setCurrentView("sandbox");
  };

  const handleOpenProject = (project: SavedProject) => {
    setCurrentProject(project);
    setSelectedIdea(null);
    setCurrentView("sandbox");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedIdea(null);
    setCurrentProject(null);
  };

  const handleNavigate = (view: "home" | "saved" | "profile") => {
    if (view === "saved") {
      setCurrentView("saved");
    } else if (view === "home") {
      setCurrentView("home");
    }
    setSelectedIdea(null);
    setCurrentProject(null);
  };

  return (
    <>
      {currentView === "home" && (
        <HomePage onTrySandbox={handleTrySandbox} onNavigate={handleNavigate} />
      )}
      
      {currentView === "saved" && (
        <SavedProjectsPage onOpenProject={handleOpenProject} onNavigate={handleNavigate} />
      )}
      
      {currentView === "sandbox" && (
        <SandboxPage
          onBack={handleBackToHome}
          initialIdea={
            currentProject
              ? {
                  id: currentProject.id,
                  title: currentProject.title,
                  htmlCode: currentProject.htmlCode,
                  cssCode: currentProject.cssCode,
                  jsCode: currentProject.jsCode,
                }
              : selectedIdea
              ? { id: selectedIdea, ...ideaTemplates[selectedIdea] }
              : undefined
          }
        />
      )}
      
      <Toaster 
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: 'var(--background-elevated)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
          },
        }}
      />
    </>
  );
}
