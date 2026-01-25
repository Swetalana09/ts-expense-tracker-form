import '../style.css';
import { renderApp } from './components/App';
import storage from './services/storage.service';

document.addEventListener('DOMContentLoaded',():void=>{
    console.log('App starting...');
    storage.loadState();
    renderApp();
    console.log('App ready');
});
