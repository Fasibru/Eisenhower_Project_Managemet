import * as React from 'react';

import '../scss/MenuBar.scss';

const MenuBar: React.FC<{}> = () => (
  <div className="menu-bar__container">
    <div className="menu-bar__bar1" />
    <div className="menu-bar__bar2" />
    <div className="menu-bar__bar3" />
  </div>
);

export default MenuBar;
