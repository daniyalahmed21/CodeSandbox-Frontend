// FileIcon.jsx
import { 
    FaCss3Alt, 
    FaHtml5, 
    FaJs, 
    FaPython, 
    FaJava,
    FaGitAlt,
    FaMarkdown
  } from "react-icons/fa";
  import { 
    SiTypescript, 
    SiJson, 
    SiSvelte,
    SiVuedotjs,
    SiSass,
  } from "react-icons/si";
  import { GrReactjs } from "react-icons/gr";
  import { VscFile, VscFolder, VscFolderOpened } from "react-icons/vsc";
  
  export const FileIcon = ({ extension, isFolder, isOpen }) => {
    // Folder icons
    if (isFolder) {
      return isOpen ? 
        <VscFolderOpened className="w-4 h-4 text-[#dcb67a]" /> : 
        <VscFolder className="w-4 h-4 text-[#dcb67a]" />;
    }
  
    // File extension to icon mapping
    const IconMapper = {
      // JavaScript/TypeScript
      js: <FaJs className="w-4 h-4 text-[#f1dd3f]" />,
      jsx: <GrReactjs className="w-4 h-4 text-[#61dafb]" />,
      ts: <SiTypescript className="w-4 h-4 text-[#3178c6]" />,
      tsx: <GrReactjs className="w-4 h-4 text-[#61dafb]" />,
      
      // Styling
      css: <FaCss3Alt className="w-4 h-4 text-[#1572b6]" />,
      scss: <SiSass className="w-4 h-4 text-[#cc6699]" />,
      sass: <SiSass className="w-4 h-4 text-[#cc6699]" />,
      
      // HTML
      html: <FaHtml5 className="w-4 h-4 text-[#e34c26]" />,
      htm: <FaHtml5 className="w-4 h-4 text-[#e34c26]" />,
      
      // Other languages
      py: <FaPython className="w-4 h-4 text-[#3776ab]" />,
      java: <FaJava className="w-4 h-4 text-[#ed8b00]" />,
      
      // Data/Config
      json: <SiJson className="w-4 h-4 text-[#f1dd3f]" />,
      xml: <VscFile className="w-4 h-4 text-[#ff8700]" />,
      
      // Frameworks
      vue: <SiVuedotjs className="w-4 h-4 text-[#4fc08d]" />,
      svelte: <SiSvelte className="w-4 h-4 text-[#ff3e00]" />,
      
      // Documentation
      md: <FaMarkdown className="w-4 h-4 text-[#083fa1]" />,
      txt: <VscFile className="w-4 h-4 text-[#cccccc]" />,
      
      // Git
      gitignore: <FaGitAlt className="w-4 h-4 text-[#f14e32]" />,
    };
  
    return IconMapper[extension?.toLowerCase()] || <VscFile className="w-4 h-4 text-[#cccccc]" />;
  };