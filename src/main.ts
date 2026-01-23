import '../style.css';
import { renderApp } from './components/App';
import storage from './app.storage';

document.addEventListener('DOMContentLoaded',():void=>{
    console.log('App starting...');
    storage.loadState();
    renderApp();
    console.log('App ready');
});
