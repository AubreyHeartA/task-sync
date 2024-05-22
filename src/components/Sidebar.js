import React from 'react';

import '../config/style.css'; // Import CSS file for styling

class Sidebar extends React.Component {
  render() {
    const { items, onItemClick, selectedItem } = this.props;

    return (
        <div className="sidebar">
            <ul>
            {items.map((item, index) => (
                <li
                key={index}
                className={selectedItem === item.label ? 'active' : ''}
                onClick={() => onItemClick(item.label)}
                >
                {item.icon && <span className="icon">{item.icon}</span>}
                {item.label}
                </li>
            ))}
            </ul>
        </div>
    );
  }
}

export default Sidebar;
