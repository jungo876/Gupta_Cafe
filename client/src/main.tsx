import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Google Fonts for typography
const fontLinks = document.createElement("link");
fontLinks.rel = "stylesheet";
fontLinks.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Pacifico&family=Playfair+Display:wght@400;500;600;700&display=swap";
document.head.appendChild(fontLinks);

// Add Font Awesome for icons
const fontAwesome = document.createElement("link");
fontAwesome.rel = "stylesheet";
fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
document.head.appendChild(fontAwesome);

// Add meta title
const metaTitle = document.createElement("title");
metaTitle.textContent = "Brew Haven - A Cozy Café Experience";
document.head.appendChild(metaTitle);

createRoot(document.getElementById("root")!).render(<App />);
