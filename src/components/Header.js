import React from 'react';
import { MdAccountCircle } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import '../config/style.css';

export default function Header({ searchTerm, setSearchTerm }) {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="header">
        <div>
        
        </div>
        <div className="search-container">
            <input
            type="text"
            placeholder="Search tasks, members, projects"
            value={searchTerm}
            onChange={handleSearch}
            />
            <Button className="btn-search">Search</Button>
        </div>
        <div className='left'> 
            <MdAccountCircle size={40} />
        </div>
    </div>
  );
};
