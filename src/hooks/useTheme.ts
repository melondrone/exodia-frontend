import { useEffect, useState } from "react";

const useTheme = (): [string, (theme: string) => void, boolean] => {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  const toggleTheme = (theme: string) => {
    window.localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  useEffect(() => {
    let localTheme = window.localStorage.getItem("theme");
    if (localTheme === "dark") {
      setTheme("darkGreen");
      window.localStorage.setItem("theme", "darkGreen");
    } else {
      setTheme(localTheme || "darkGreen");
    }
    setMounted(true);
  }, []);

  return [theme, toggleTheme, mounted];
};

export default useTheme;
