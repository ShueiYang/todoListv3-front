import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";


const ThemeButton = () => {

    // theme by default will be light
    const [theme,  setTheme] = useState("light");
    
    useEffect(()=> {
        const root = document.documentElement
        if(theme === "light") {
            root.classList.remove("dark")
        } else {
            root.classList.add("dark")
        }
    }, [theme]);
    // theme in dependency will trigger useEffect each time the theme changed!

    // function to toggle light / dark theme
    function toggleTheme () {
        const themeColor = theme === "light" ? "dark" : "light"
        localStorage.setItem("theme", themeColor)
        setTheme(themeColor)
    }
    
  return (
    <label className="toggle-switch bg-slate-200 w-12 h-6 md:w-14 md:h-7 flex items-center rounded-2xl cursor-pointer">
        <input 
            type="checkbox" 
            onChange={toggleTheme}
            checked={theme}
        />
        <span className={`${ theme === "dark"? "translate-x-[90%] bg-sky-600": "-translate-x-1 bg-yellow-500"} 
                switch flex justify-center w-7 h-7 md:w-8 md:h-8 rounded-full 
                p-1 text-white transition duration-300`}>
            {
              theme === "light" ? 
                <FaSun className="iconFa w-[85%] h-auto"/>
              : <FaMoon className="iconFa w-[85%] h-auto"/>
            }
        </span>     
    </label>
  )
}

export default ThemeButton;