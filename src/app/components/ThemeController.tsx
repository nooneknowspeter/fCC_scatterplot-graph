import React, { useEffect, useState } from "react";

const ThemeController = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;
    setCurrentTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "black";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const themes = [
    { name: "Dark", value: "black" },
    { name: "Retro", value: "retro" },
    { name: "Cyberpunk", value: "cyberpunk" },
    { name: "Winter", value: "winter" },
    { name: "Luxury", value: "luxury" },
    { name: "Halloween", value: "halloween" },
    { name: "Autumn", value: "autumn" },
    { name: "Wireframe", value: "wireframe" },
    { name: "Forest", value: "forest" },
    { name: "Synthwave", value: "synthwave" },
  ];

  return (
    <>
      <div
        id="theme-controller"
        className="absolute right-0 top-0 m-2 w-40 transition-all"
      >
        {themes.map((theme) => (
          <div key={theme.value} className="form-control">
            <label className="label cursor-pointer gap-4">
              <span className="label-text">{theme.name}</span>
              <input
                type="radio"
                name="theme-radios"
                className="radio theme-controller"
                value={theme.value}
                checked={currentTheme === theme.value}
                onChange={handleThemeChange}
              />
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default ThemeController;
