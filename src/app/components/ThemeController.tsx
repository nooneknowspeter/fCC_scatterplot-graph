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
        {/* default */}
        <div className="form-control">
          <label className="label cursor-pointer gap-4">
            <span className="label-text">Dark</span>
            <input
              type="radio"
              name="theme-radios"
              className="radio theme-controller"
              value="black"
            />
          </label>
        </div>
        {/* theme 1 */}
        <div className="form-control">
          <label className="label cursor-pointer gap-4">
            <span className="label-text">Retro</span>
            <input
              type="radio"
              name="theme-radios"
              className="radio theme-controller"
              value="retro"
            />
          </label>
        </div>
        {/* theme 2 */}
        <div className="form-control">
          <label className="label cursor-pointer gap-4">
            <span className="label-text">Cyberpunk</span>
            <input
              type="radio"
              name="theme-radios"
              className="radio theme-controller"
              value="cyberpunk"
            />
          </label>
        </div>
        {/* theme 3 */}
        <div className="form-control">
          <label className="label cursor-pointer gap-4">
            <span className="label-text">Winter</span>
            <input
              type="radio"
              name="theme-radios"
              className="radio theme-controller"
              value="winter"
            />
          </label>
        </div>
        {/* theme 4 */}
        <div className="form-control">
          <label className="label cursor-pointer gap-4">
            <span className="label-text">Luxury</span>
            <input
              type="radio"
              name="theme-radios"
              className="radio theme-controller"
              value="luxury"
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default ThemeController;
