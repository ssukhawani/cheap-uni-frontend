module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'green-tag': '#49FF00',
        'red-tag':"#FF0000",
        'yellow-tag': '#FFED00'
      }  
    },
    maxHeight: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      '0': '0',        
    },
    minHeight: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      '0': '0',        
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
