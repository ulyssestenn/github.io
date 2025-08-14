module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({"*.png": "."});
  eleventyConfig.addPassthroughCopy({"*.mp4": "."});
  eleventyConfig.addPassthroughCopy({"*.gif": "."});
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
