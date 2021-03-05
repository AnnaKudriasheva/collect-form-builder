module.exports = {
  pathPrefix: "/collect-form-builder",
  siteMetadata: {
    title: "form-builder",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
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
