import React, { useState } from "react";
import { EmptyState, Layout, Page } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import ProductList from "../components/ProductList";
import store from "store-js";

function Index() {
  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get("ids");

  function handleSelection(resources) {
    const idsFromResourcePicker = resources.selection.map(
      (product) => product.id
    );
    setModal({ open: false });
    store.set("ids", idsFromResourcePicker);
  }

  return (
    <Page>
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onCancel={() => setModal({ open: false })}
        onSelection={(resources) => handleSelection(resources)}
      />

      {emptyState ? (
        <Layout>
          <EmptyState
            heading="Manage your inventory transfers"
            action={{
              content: "Select products",
              onAction: () => setModal({ open: true }),
            }}
            secondaryAction={{
              content: "Learn more",
              url: "https://help.shopify.com",
            }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
            <p>Select products</p>
          </EmptyState>
        </Layout>
      ) : (
        <ProductList></ProductList>
      )}
    </Page>
  );
}

export default Index;
