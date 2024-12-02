import React from "react";

const ThemeController = () => {
  return (
    <>
      <div id="theme-controller" className="absolute w-40">
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
            <span className="label-text">Corporate</span>
            <input
              type="radio"
              name="theme-radios"
              className="radio theme-controller"
              value="corporate"
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default ThemeController;