const sqlEscape = (str) => {
    if (typeof str !== 'string') {
      return str;
    }
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case "\0":
          return "\\0";
        case "\x08":
          return "\\b";
        case "\x09":
          return "\\t";
        case "\x1a":
          return "\\z";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "\"":
        case "'":
          return char; 
        case "\\":
        case "%":
          return "\\" + char;
        default:
          return char;
      }
    });
  };
  
  module.exports = sqlEscape;
  