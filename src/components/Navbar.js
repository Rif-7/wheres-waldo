import React from "react";

function Navbar() {
  return (
    <nav>
      <div className="nav-header">Where's Waldo</div>

      <div className="images">
        <div className="nav-img-container">
          <img alt="" className="nav-img" src="./imgs/wenda.png"></img>
          <div>Wenda</div>
        </div>
        <div className="nav-img-container">
          <img alt="" className="nav-img" src="./imgs/odlaw.jpg"></img>
          <div>Odlaw</div>
        </div>
        <div className="nav-img-container">
          <img alt="" className="nav-img" src="./imgs/waldo.jpg"></img>
          <div>Waldo</div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
