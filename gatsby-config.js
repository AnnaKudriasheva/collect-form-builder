module.exports = {
  pathPrefix: "/collect-form-builder",
  siteMetadata: {
    title: "Collect.js Form Builder",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-json",
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true
      }
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#145FF5',
          },
          javascriptEnabled: true,
        },
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/
        }
      }
    }
  ]
};
