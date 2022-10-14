export const updateFontSize = (fontSize, incrementor) => {
  let newFontSize = fontSize + incrementor;
  if (newFontSize > 80) {
    newFontSize = 80;
  } else if (newFontSize < 12) {
    newFontSize = 12;
  }

  return `${newFontSize}px`;
};

export const updateFont = (font, newFont) => {
  if (newFont != null) {
    return newFont;
  }
  return font;
};

export const updateBackgroundColor = (color, newColor) => {
  if (newColor != null) {
    return newColor;
  }
  return color;
};

export const setUnderline = (defaultValue, underline) => {
  if (underline) {
    return 'underline';
  }
  return defaultValue;
};

export const setHighlight = (defaultValue, highlight) => {
  if (highlight) {
    return 'rgb(255,255,0)';
  }
  return defaultValue;
};

export const updateAnimations = (defaultValue, removeAnimations) => {
  if (removeAnimations) {
    return 'none';
  }
  return defaultValue;
};

export const setLightsOff = (defaultValue, lighsOffMode) => {
  if (lighsOffMode) {
    return 'block';
  }
  return defaultValue;
};
