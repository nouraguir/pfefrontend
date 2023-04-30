import React, { useState } from "react";

const ThemeContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
});

export const ThemeProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme: isDarkTheme,
        toggleTheme: toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
