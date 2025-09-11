export const EditorButton = ({ isActive }) => {
  function handleClick() {
    // TODO: Implement click handler
  }

  const activeClasses = "text-white bg-[#303242] border-t-2 border-[#f7b9dd]";
  const inactiveClasses = "text-[#959eba] bg-[#4a4859] border-t-0";

  return (
    <button
      className={`
          px-4 py-2 text-sm font-medium
          transition-colors duration-150 ease-in-out
          ${isActive ? activeClasses : inactiveClasses}
        `}
      onClick={handleClick}
    >
      file.js
    </button>
  );
};
