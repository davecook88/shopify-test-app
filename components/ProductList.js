import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {
  Card,
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import store from "store-js";

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

function ProductList() {
  const ids = store.get("ids");
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: { ids: ids },
  });
  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>Products:</h1>
      <Card>
            <ResourceList
              showHeader
              resourceName={{ singular : 'Product', plural: 'Products'}}
              items={data.nodes}
              renderItem={item => {
                const media = (
                  <Thumbnail
                    source={item.images.edges[0] ? item.images.edges[0].node.originalSrc : ''}
                    alt={item.images.edges[0] ? item.images.edges[0].node.altText : '' }
                    />
                )
                const price = item.variants.edges[0].node.price;
                return (
                  <ResourceList.Item
                    id={item.id}
                    media={media}
                    accessibilityLabel={`View details for ${item.title}`}
                  >
                  <Stack>
                    <Stack.Item fill>
                      <h3>
                        <TextStyle variation='strong'>
                          {item.title}
                        </TextStyle>
                      </h3>
                    </Stack.Item>
                    <Stack.Item fill>
                      <p>
                        {`$${price}`}
                      </p>
                    </Stack.Item>
                  </Stack>
                  </ResourceList.Item>
                )
              }}
              />
          </Card>

    </div>
  );
}

export default ProductList;
