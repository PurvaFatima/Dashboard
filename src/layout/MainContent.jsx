import React from 'react';
import PropTypes from 'prop-types';

const MainContent = ({ children, className = '', ...props }) => {
  return (
    <main 
      className={`flex-1 bg-gray-50 p-4 sm:p-6 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </main>
  );
};

MainContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default MainContent;