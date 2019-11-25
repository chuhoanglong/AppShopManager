import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const styles = {
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid white`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: '#333',
    marginRight: 10
  },
  Active: {
    backgroundColor: '#DDD',
    opacity: 0.5
  }
};

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product:{},
      isCheckSelect: false,
      selectDelete:[]
    }
  }
  componentWillMount() {
    this.setState({ product: this.props.product,});
  }

  render() {
    return (
      <Card 
      style={styles.root, this.state.isCheckSelect ? styles.Active : styles.root}
      onClick={() => {
        this.setState({ isCheckSelect: !this.state.isCheckSelect, });
        if (this.state.isCheckSelect) {
          let arrTempPush = [...this.state.selectDelete, this.props.product.id];
          this.setState({ selectDelete: [...arrTempPush] });
          console.log(this.state.selectDelete);
          
        } else {
          let arrTempPop = this.state.selectDelete.filter(id => id != this.state.product.id);
          this.setState({ selectDelete: [...arrTempPop] });
          console.log(this.state.selectDelete);

        }
      }}
      >
        <CardContent>
          <div style={styles.imageContainer}>
            <img
              alt="Product"
              style={styles.image}
              src={this.state.product.url}
            />
          </div>
          <Typography
            align="center"
            gutterBottom
            variant="h4"
          >
            {this.state.product.name}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid
            container
            justify="space-between"
          >
            <Grid
              style={styles.statsItem}
              item
            >
              <AccessTimeIcon style={styles.statsIcon} />
              <Typography
                display="inline"
                variant="body2"
              >
                Updated 2hr ago
            </Typography>
            </Grid>
            <Grid
              style={styles.statsItem}
              item
            >
              <Typography
                display="inline"
                variant="body2"
              >
                {this.state.product.price} $
            </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }
};

export default ProductCard;
