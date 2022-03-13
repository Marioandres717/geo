module.exports = {
  siteMetadata: {
    title: `Alternate Numbers`,
    description: `Alternate Numbers Generator for Munisoft`,
    author: `@marioandres717`,
    siteUrl: `https://geo-muni.netlify.app/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-csv`,
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCss: true,
        isUsingColorMode: false,
      },
    },
  ],
}
