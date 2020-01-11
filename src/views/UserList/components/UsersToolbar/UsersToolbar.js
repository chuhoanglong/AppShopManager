import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import * as API from '../../../../redux/saga/API';
import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '92px',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    zIndex: 100,
    backgroundColor: '#FFF',
    width: '100%',
  },
  row: {
    height: '92px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1),
  }
}));

const UsersToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}
          onClick={() => {
            alert(props.idProduct.length <= 0 ? 'Vui lòng chọn đơn hàng cần xác nhận !' : 'Bạn có muốn xác nhận đơn hàng này không !');
            API.verifyProduct(props.idProduct).then(res => {
              if (res) {
                alert('Đã Xác Nhận Đơn Hàng !');
              }
            })
          }}
        >Xác Nhận</Button>
        <Button
          className={classes.exportButton}
          onClick={() => {
            alert(props.idProduct.length <= 0 ? 'Vui lòng chọn đơn hàng cần hủy !' : 'Bạn có muốn hủy đơn hàng này không !');
            API.cancelOrder(props.idProduct).then(res => {
              if (res) {
                alert(res.message || 'Đã Hủy Đơn Hàng !');
              }
            })
          }}
        >Hủy Đơn</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            alert(props.idProduct.length <= 0 ? 'Vui lòng chọn đơn hàng cần xóa !' : 'Bạn có muốn xóa đơn hàng này không !');
            API.deleteProduct(props.idProduct).then(res => {
              if (res) {
                alert('Đã Xóa Đơn Hàng !');
              }
            })
          }}
        >
          Xóa Đơn
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Tìm kiếm"
        />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
