import 'antd/dist/reset.css'; // Import Ant Design styles

import React from 'react';
import { Select, Space } from 'antd';

const { Option } = Select;

const themeOptions = [
  { value: 'dracula', label: 'Dracula' },
  { value: 'github-dark', label: 'GitHub Dark' },
  { value: 'github-light', label: 'GitHub Light' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'solarized-dark', label: 'Solarized Dark' },
  { value: 'solarized-light', label: 'Solarized Light' },
  { value: 'vs-dark', label: 'Visual Studio Dark' }, // Built-in Monaco theme
  { value: 'vs', label: 'Visual Studio Light' },    // Built-in Monaco theme
];

const ThemeSelector = ({ onThemeChange, currentTheme }) => {
  return (
    <Space 
      className="theme-selector-container" 
      style={{ padding: '10px 16px', borderBottom: '1px solid #333' }}
    >
      <span style={{ color: '#fff' }}>Select Theme:</span>
      <Select
        value={currentTheme}
        onChange={onThemeChange}
        style={{ width: 200 }}
      >
        {themeOptions.map((theme) => (
          <Option key={theme.value} value={theme.value}>
            {theme.label}
          </Option>
        ))}
      </Select>
    </Space>
  );
};

export default ThemeSelector;