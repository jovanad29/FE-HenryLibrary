import React,{useState} from 'react'
import { BsFillSunFill } from 'react-icons/bs';
import { MdDarkMode } from "react-icons/md";

//CSS
import styles from "./Theme.module.css"



export default function Theme() {
    let themeSaved = window.localStorage.getItem("theme");

    const [theme, setTheme] = useState(themeSaved || "light");
  
    const handleToggleTheme = () => {
      window.localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
      setTheme(theme === "dark" ? "light" : "dark");
      document.body.classList.toggle("dark");
    };
  
    if (theme === "dark") document.body.classList.add("dark");
  return (
    
    <button onClick={handleToggleTheme} className={styles.btnLightDark}>
    {
        theme === "light"
        ? <BsFillSunFill size="1.5rem" color="#01A86C"/>
        : <MdDarkMode size="1.5rem" color="#01A86C"/>
        
    }
    </button>
  )
}
