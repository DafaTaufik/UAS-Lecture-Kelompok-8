module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'poppins': ['Poppins'],
      },
      colors: {
        "dark-purple": "#011329",
        "light-white": "rgba(255,255,255,0.17)",
        "keren": "#E6F4F1",
      },
      width: {
        "4/6": "95%",
      },
      right: {
        "2/7": "75%",
      },
      zIndex: {
        '1': '1',
        '2': '2',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};
