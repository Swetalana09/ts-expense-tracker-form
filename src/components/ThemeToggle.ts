import { element } from "../utils/dom";


function ThemeToggle(): HTMLDivElement{
    const container=element('div') as HTMLDivElement;
    container.className='theme-toggle-btn';

    const button=element('button') as HTMLButtonElement;
    button.className='theme-toggle-btn';

    const sunIcon=element('span');
    sunIcon.className='sun-icon';
    sunIcon.textContent='☀️';

    const moonIcon=element('span');
    moonIcon.className='moon-icon';
    moonIcon.textContent='🌙';

    button.appendChild(sunIcon);
    button.appendChild(moonIcon);

    const savedTheme=localStorage.getItem('theme');
    if(savedTheme==='dark'){
        document.documentElement.setAttribute('data-theme','dark');
        button.classList.add('dark-mode');
    }else{
        document.documentElement.setAttribute('data-theme','light');
    }

    button.onclick=()=>{
        const currentTheme=document.documentElement.getAttribute('data-theme');

        if(currentTheme==='light'){
            document.documentElement.setAttribute('data-theme','dark');
            localStorage.setItem('theme','dark');
            button.classList.add('dark-mode');
        }else{
            document.documentElement.setAttribute('data-theme','light');
            localStorage.setItem('theme','light');
            button.classList.remove('dark-mode');
        }
    };
    container.appendChild(button);
    return container;
}
export default ThemeToggle;