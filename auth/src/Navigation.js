import React from "react";
import "./Navigation.styles.scss";

const Navigation = () => {
  return (
    <div className="navigation">
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
      />
      <label className="navigation__button" htmlFor="navi-toggle">
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__background">&nbsp;</div>
      <div className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <a href="#nowhere" className="navigation__link">
              <span>01</span> About Us
            </a>
          </li>
          <li className="navigation__item">
            <a href="#nowhere" className="navigation__link">
              <span>02</span> Courses
            </a>
          </li>
          <li className="navigation__item">
            <a href="#nowhere" className="navigation__link">
              <span>03</span> Stories
            </a>
          </li>
          <li className="navigation__item">
            <a href="#nowhere" className="navigation__link">
              <span>04</span> Donate
            </a>
          </li>
          <li className="navigation__item">
            <a href="#nowhere" className="navigation__link">
              <span>05</span> Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
