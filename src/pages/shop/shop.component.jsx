import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { createStructuredSelector } from "reselect";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selectors";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
          // render={(props) => (
          //   <CollectionsOverviewWithSpinner
          //     isLoading={isCollectionFetching}
          //     {...props}
          //   />
          // )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
          // render={(props) => (
          //   <CollectionPageWithSpinner
          //     isLoading={!isCollectionsLoaded}
          //     {...props}
          //   />
          // )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

const mapStateToProps = createStructuredSelector({
  // isCollectionFetching: selectIsCollectionFetching,
  // isCollectionsLoaded: selectIsCollectionsLoaded,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
