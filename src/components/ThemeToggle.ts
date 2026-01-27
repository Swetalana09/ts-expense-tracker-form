import { element } from "../utils/dom";

class ThemeToggle{
    private container:HTMLDivElement;
    private button:HTMLButtonElement;
    private sunIcon:HTMLSpanElement;
    private moonIcon:HTMLSpanElement;

    constructor(){
        this.container=element('div') as HTMLDivElement;
        this.button=element('button') as HTMLButtonElement;
        this.sunIcon=element('span') as HTMLSpanElement;
        this.moonIcon=element('span') as HTMLSpanElement;

        this.initialize();
        this.loadSavedTheme();
        this.attachEventListeners();
    }

    private initialize():void{
        this.container.className='theme-toggle-btn';
        this.button.className='theme-toggle-btn';

        this.sunIcon.className='sun-icon';
        this.sunIcon.textContent='☀️';

        this.moonIcon.className='moon-icon';
        this.moonIcon.textContent='🌙';

        this.button.appendChild(this.sunIcon);
        this.button.appendChild(this.moonIcon);
        this.container.appendChild(this.button);
    }

    private loadSavedTheme():void{
        const savedTheme=localStorage.getItem('theme');
        if(savedTheme==='dark'){
            document.documentElement.setAttribute('data-theme','dark');
            this.button.classList.add('dark-mode');
        }else{
            document.documentElement.setAttribute('data-theme','light');
        }
    }

    private attachEventListeners():void{
        this.button.onclick=()=>this.toggleTheme();
    }

    private toggleTheme():void{
        const currentTheme=document.documentElement.getAttribute('data-theme');

        if(currentTheme==='light'){
            document.documentElement.setAttribute('data-theme','dark');
            localStorage.setItem('theme','dark');
            this.button.classList.add('dark-mode');
        }else{
            document.documentElement.setAttribute('data-theme','light');
            localStorage.setItem('theme','light');
            this.button.classList.remove('dark-mode');
        }
    }

    public render():HTMLDivElement{
        return this.container;
    }
}

export default ThemeToggle;
