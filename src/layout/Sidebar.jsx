import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ navigationItems = [] }) => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed top-0 left-0">
      <div className="p-4 text-xl font-bold border-b border-gray-700">My Dashboard</div>
      <nav className="flex-1 p-2 overflow-y-auto">
        {navigationItems.map((item, index) => (
          <a
            key={index}
            href={item.href || '#'}
            className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 mb-1"
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        © 2025 My Dashboard
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.node,
    })
  ),
};

export default Sidebar;