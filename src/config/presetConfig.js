// src/config/presetConfig.js
import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Define a custom preset configuration
const MyPreset = definePreset(Aura, {
  semantic: {
    formField: {
      paddingX: ".8rem",
      paddingY: ".6rem",
      borderRadius: "8px",
    }
  }
});

export default MyPreset;
