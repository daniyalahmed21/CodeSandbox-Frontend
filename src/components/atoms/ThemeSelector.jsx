import 'antd/dist/reset.css';

import React from 'react';
import { Select } from 'antd';

import { customThemes } from '../../../themes/index'; 
// Built-in Monaco themes
const builtInThemes = [
  { value: 'vs-dark', label: 'Visual Studio Dark' },
  { value: 'vs', label: 'Visual Studio Light' },
  { value: 'hc-black', label: 'High Contrast Black' },
];

// Generate options from customThemes keys
const customThemeOptions = Object.keys(customThemes).map((themeKey) => ({
  value: themeKey,
  label: themeKey
    .split('-')               
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '),               
}));

const themeOptions = [...builtInThemes, ...customThemeOptions];

const ThemeSelector = ({ onThemeChange, currentTheme }) => (
  <div
    style={{
      padding: '10px 16px',
      borderBottom: '1px solid #333',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    <span style={{ color: '#fff' }}>Select Theme:</span>
    <Select
      value={currentTheme}
      onChange={onThemeChange}
      options={themeOptions}
      style={{ width: 260 }}
      showSearch
      optionFilterProp="label" // enables searching by label
    />
  </div>
);

export default ThemeSelector;
