import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  showModalWindow: () => void;
}

export default function Navigation({ showModalWindow }: Props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
        <div className="container">
          <button
            type="button"
            className="navbar-brandorder-1 btn btn-success"
            onClick={() => showModalWindow()}
          >
            Sign in
          </button>
          <div className="navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-item nav-link" to="/promos">
                Promotions
              </NavLink>
              <NavLink className="nav-item nav-link" to="/about">
                About
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
