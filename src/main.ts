import '../style.css';
import { renderApp } from './components/App';
import storage from './app.storage';
document.addEventListener('DOMContentLoaded',():void=>{
    storage.loadState();
    renderApp();
});

