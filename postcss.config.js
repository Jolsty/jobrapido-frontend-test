module.exports = {
  plugins: {
    'postcss-import': {}, // Process @import statements in advance, instead of in the browser.
    'tailwindcss/nesting': {}, // Sass-like nesting
    tailwindcss: {},
    autoprefixer: {} // For automatically managing vendor prefixes
  }
}
