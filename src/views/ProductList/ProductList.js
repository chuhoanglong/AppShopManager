import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { ProductsToolbar, ProductCard } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: this.props.products,
      isCheckSelect:false,
      selectDelete:[]
    }
  }
  componentWillMount() {
    this.props.showProductTask();
  }
  render() {
    return (
      <div style={styles.root}>
        <ProductsToolbar />
        <div style={styles.content}>
          <Grid
            container
            spacing={3}
          >
            {this.props.products.map(product => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={product}/>
              </Grid>
            ))}
          </Grid>
        </div>
        <div style={styles.pagination}>
          <Typography variant="caption">1-6 of 20</Typography>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    );
  };
}

const styles = {
  root: {
    padding: 13
  },
  content: {
    marginTop: 20
  },
  pagination: {
    marginTop: 13,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}

export default ProductList;
