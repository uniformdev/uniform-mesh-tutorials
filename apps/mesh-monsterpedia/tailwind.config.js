const { uniformMeshPlugin } = require("@uniformdev/mesh-sdk-react/tailwind");

module.exports = {
  content: ["./pages/**/*.jsx", "./components/**/*.jsx"],
  plugins: [require("@tailwindcss/forms"), uniformMeshPlugin],
};
