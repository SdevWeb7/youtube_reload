"use client"

import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

export function useTheme () {

   const [isClient, setIsClient] = useState(false)
   const [theme, setTheme] = useLocalStorage('theme', isClient ? window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light' : 'light')

   useEffect(() => {
      setIsClient(true)
      document.body.setAttribute('data-theme', theme)
   }, [theme])


   return { theme, setTheme }

}