import {useState,useEffect} from "react";

function ThemeToggle() {
    const [isDark,setIsDark]=useState(()=>{
        const saved=localStorage.getItem('theme');
        return saved==='dark';
    });

    useEffect(()=>{
        const theme=isDark?'dark':'light';
        document.documentElement.setAttribute('data-theme',theme);
        localStorage.setItem('theme',theme);
    },[isDark]);

    return (
        <div className="app-header">
            <button
            className={`theme-toggle-btn ${isDark ? 'dark-mode':''}`}
            onClick={()=>setIsDark(!isDark)}>
                <span className="sun-icon">☀️</span>
                <span className="moon-icon">🌙</span>
            </button>
        </div>
    );
};
export default ThemeToggle;
