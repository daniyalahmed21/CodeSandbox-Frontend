export const getLanguageFromExtension = (extension) => {
    switch (extension) {
      case "js":
      case "jsx":
        return "javascript";
      case "ts":
      case "tsx":
        return "typescript";
      case "py":
        return "python";
      case "html":
        return "html";
      case "css":
        return "css";
      case "json":
        return "json";
      case "java":
        return "java";
      case "c":
        return "c";
      case "cpp":
      case "cc":
        return "cpp";
      case "cs":
        return "csharp";
      case "php":
        return "php";
      case "md":
        return "markdown";
      default:
        return "plaintext";
    }
  };
  