import React from "react";
import CollectionPreview from "../../components/collection-preview/collection-preview.component.jsx";
import SHOP_DATA from "./shop.data.js";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    const { collections } = this.state;
   
    return (
      <div className="shop-page">
        {collections.map(({ id, ...otherCollections }) =>
         (
         <CollectionPreview key={id} {...otherCollections} />
         ))}
      </div>
    );
  }
}

export default ShopPage;
