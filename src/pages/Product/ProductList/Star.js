import React from 'react';

const Star = ({ isStarred, onClick }) => {
  return (
    <div className="asterisk tb-asterisk" onClick={onClick}>
      <a href="#" className={isStarred ? 'active' : ''}>
        <em className="asterisk-off icon ni ni-star"></em>
        <em className="asterisk-on icon ni ni-star-fill"></em>
      </a>
    </div>
  );
};

export default Star;
