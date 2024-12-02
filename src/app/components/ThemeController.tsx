import React from "react";

const ThemeController = () => {
  const themes = [
    { name: "Dark", value: "black" },
    { name: "Retro", value: "retro" },
    { name: "Cyberpunk", value: "cyberpunk" },
    { name: "Winter", value: "winter" },
    { name: "Luxury", value: "luxury" },
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
              />
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default ThemeController;
