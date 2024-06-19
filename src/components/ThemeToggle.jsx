import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';

const ThemeToggle = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
  return (
//     <button onClick={toggleTheme} className="p-2 bg-slate-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">
//     {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
//   </button>

<button
onClick={toggleTheme}
className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
>
{theme === 'light' ? <FaMoon /> : <FaSun />}
</button>
  )
}

export default ThemeToggle