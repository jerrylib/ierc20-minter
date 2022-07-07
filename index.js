if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/ierc20-minter.min");
} else {
  module.exports = require("./dist/ierc20-minter");
}
