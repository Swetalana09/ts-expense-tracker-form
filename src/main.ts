import '../style.css';
import { renderApp } from './components/App';
import StorageService from './services/storage.service';

document.addEventListener('DOMContentLoaded',():void=>{
    console.log('App starting...');

    const storageService=StorageService.getInstance();
    storageService.loadState();
    
    renderApp();
    console.log('App ready');
});
