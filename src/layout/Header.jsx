import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, subtitle, actions = [] }) => {
  return (
    <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-blue-300">{title}</h1>
        {subtitle && <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                action.variant === 'primary'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : action.variant === 'secondary'
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-gray-800 text-white hover:bg-gray-900'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      variant: PropTypes.oneOf(['primary', 'secondary', 'default']),
    })
  ),
};

export default Header;