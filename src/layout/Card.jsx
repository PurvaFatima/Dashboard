import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  title, 
  children, 
  footer, 
  className = '',
  onClick,
  ...props 
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 ${
        onClick ? 'cursor-pointer hover:border-blue-200' : ''
      } ${className}`}
      onClick={handleClick}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;