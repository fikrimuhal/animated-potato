import randomColor from "randomcolor";
export const log2 = (prefix, salt) => (...messages) => {
      prefix = prefix || "PREFIX";
          const _prefix = `[${prefix}]`;
          const prefixStyle = generatePrefixStyle(prefix + salt + globalSalt);
          console.log("%c" + _prefix + "%c ", prefixStyle, restStyle, ...messages)
        };
const generatePrefixStyle = (seed) => {
    const foreground = randomColor({luminosity: 'dark', seed});
    const background = randomColor({luminosity: 'light', seed});
    return `background: ${background}; color: ${foreground}`
  };
  const restStyle = "";
  const globalSalt = "dasd";
  export default log2
