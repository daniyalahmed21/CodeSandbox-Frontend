import React from "react";

export const FileIcon = ({ name }) => {
  const n = name.toLowerCase();

  const icons = {
    ".js": { label: "JS", color: "text-yellow-500" },
    ".jsx": { label: "JSX", color: "text-yellow-600" },
    ".ts": { label: "TS", color: "text-blue-600" },
    ".tsx": { label: "TSX", color: "text-blue-700" },
    ".html": { label: "</>", color: "text-orange-600" },
    ".css": { label: "CSS", color: "text-blue-500" },
    ".scss": { label: "SCSS", color: "text-pink-600" },
    "package.json": { label: "npm", color: "text-red-600" },
    ".json": { label: "{}", color: "text-gray-500" },
    ".md": { label: "MD", color: "text-indigo-400" },
    ".gitignore": { label: "git", color: "text-orange-700" },
    ".env": { label: "env", color: "text-gray-600" },
    ".svg": { label: "SVG", color: "text-purple-500" },
    ".py": { label: "PY", color: "text-green-500" },
    ".java": { label: "JAVA", color: "text-red-700" },
    ".png": { label: "IMG", color: "text-teal-500" },
    ".jpg": { label: "IMG", color: "text-teal-500" },
    ".pdf": { label: "PDF", color: "text-red-500" },
  };

  let label = "📁";
  let colorClass = "text-gray-400";

  for (const key in icons) {
    if (n.endsWith(key) || n === key) {
      label = icons[key].label;
      colorClass = icons[key].color;
      break;
    }
  }

  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded ${colorClass}`}
    >
      {label}
    </span>
  );
};

export default FileIcon;
