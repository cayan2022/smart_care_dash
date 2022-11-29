module.exports = {
  mode: "jit",
  
  theme: {
    extend: {
      colors: {
        primary: `#61C5CB`,
        secondary: `#212D54`,
        gray: `#959595`,
        semiLight: `#F9F9F9`,
        offLight: `#F5F5F5`,
        semiWhite: `#eee`,
        light: `#fff`,
        dark: `#000`,
      },
    },

    fontFamily: {
      display: ["Montserrat", "sans-serif"],
      body: ["Montserrat", "sans-serif"],
    },

    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1170px",
    },

    container: {
      center: true,
      padding: "15px",
    },
  },

  variants: {},

  plugins: [
    // require('tailwindcss-logical'),
    // require('tailwindcss-dark-mode')()
  ],

  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
};
