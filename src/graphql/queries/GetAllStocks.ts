import gql from 'graphql-tag';

const GET_ALL_STOCKS = gql`
  query GetAllStocks {
    posts {
      nodes {
        id
        title
        date
        stock {
          stock_promotitle
          stock_promodesc
          stock_period
          stockImage {
            node {
              link
            }
          }
          stock_link {
            url
          }
          stock_settime
          stock_endtime
        }
      }
    }
  }
`;

export default GET_ALL_STOCKS;
