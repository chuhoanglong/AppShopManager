import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,

} from '@material-ui/core';
import { connect } from 'react-redux';
import { SearchInput } from 'components';
import { postProductTask } from '../../../../redux/action/rootAction';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: 10,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));


const styles = {
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: 10
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: 10
  },
  exportButton: {
    marginRight: 10
  },
  searchInput: {
    marginRight: 10,
    width: 400
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 10,
    marginRight: 10,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  }
};

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
  {
    value: 'VN',
    label: 'VND',
  },
];

const category = [
  {
    value: 'adidas',
    label: 'adidas',
  },
  {
    value: 'NIKE',
    label: 'NIKE',
  },
  {
    value: 'BAD HABIST',
    label: 'BAD HABIST',
  },
  {
    value: 'PUMA',
    label: 'PUMA',
  },
  {
    value: 'UNIQL',
    label: 'UNIQL',
  },
  {
    value: 'CONVERT',
    label: 'CONVERT',
  },
];

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};
// ______MAIN______
class ProductsToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSnackbars: false,
      values: {
        name: '',
        price: 0,
        color: '',
        currency: 'USD',
        URL: '',
        category: 'adidas'
      },

    }
  }


  handleChange = name => event => {
    this.setState({ values: { ...this.state.values, [name]: event.target.value } });
  };

  // a = function a(name) {
  //   return function e(event) {
  //     this.setState({ values: { ...this.state.values, [name]: event.target.value } });
  //   }.bind(this)
  // }

  // of form Dialog
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // of Snackbars
  handleClickSnackbars = () => {
    this.setState({ openSnackbars: true });
  };

  handleCloseSnackbars = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnackbars: false });
  };

  render() {

    return (
      <div style={styles.root}>
        <div style={styles.row}>
          <span style={styles.spacer} />
          <Button
            style={styles.exportButton}
            onClick={() => {
              console.log('xoasanpham');
            }}
          >Xóa Sản Phẩm</Button>
          <Button
            color="primary"
            variant="contained"
            onClick={
              () => {
                console.log('Them san pham');
                this.handleClickOpen();
              }
            }
          >
            Thêm sản phẩm
          </Button>
        </div>
        <div >
          <SearchInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
          />
        </div>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">THÊM SẢN PHẨM</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn hãy nhập đầy đủ các thông tin sau để thêm sản phẩm mới vào hệ thống.
            </DialogContentText>
            <form noValidate autoComplete="off">
              <TextField
                id="name"
                label="Tên Sản Phẩm"
                style={styles.textField}
                placeholder="Yeezy350Sesame"
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <TextField
                id="color"
                label="Màu"
                placeholder="Tripple_White"
                onChange={this.handleChange('color')}
                style={styles.textField}
                margin="normal"
              />
              <TextField
                required
                id="URL"
                label="Ảnh Sản Phẩm"
                placeholder="https://www.youbetterfly.com/Adidas.jpg"
                onChange={this.handleChange('URL')}
                style={styles.textField}
                margin="normal"
              />
              <TextField
                id="price"
                label="Giá Sản Phẩm"
                value={this.state.values.price}
                onChange={this.handleChange('price')}
                type="number"
                style={styles.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <TextField
                id="standard-select-currency"
                select
                placeholder="Đơn Vị"
                style={styles.textField}
                value={this.state.values.currency}
                onChange={this.handleChange('currency')}
                SelectProps={{
                  MenuProps: {

                  },
                }}
                helperText="Hãy chọn Loại tiền sử dụng"
                margin="normal"
              >
                {currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="category"
                select
                placeholder="Loại Sản Phẩm"
                style={styles.textField}
                value={this.state.values.category}
                onChange={this.handleChange('category')}
                SelectProps={{
                  native: true,
                  MenuProps: {

                  },
                }}
                helperText="Hãy chọn Loại sản phẩm cho nó."
                margin="normal"
              >
                {category.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Thoát
            </Button>
            <Button onClick={
              () => {
                this.handleClose();
                this.props.postProduct(this.state.values);
                this.handleClickSnackbars();
              }
            } color="primary">
              Xác Nhận
            </Button>
          </DialogActions>
        </Dialog>

        {/* of  Snackbar*/}
        {this.props.response && <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackbars}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbars}
        >
          <MySnackbarContentWrapper
            onClose={this.handleCloseSnackbars}
            variant="success"
            message={this.props.response.message}
          />
        </Snackbar>}
      </div>
    );
  };
}



const mapStateToProps = (state) => {
  return {
    response: state.ProductReducer.response
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    postProduct: (product) => {
      dispatch(postProductTask(product));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsToolbar);
