import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getInitials } from 'helpers';
import UsersToolbar from '../UsersToolbar/UsersToolbar';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [carts, setCarts] = useState([]);
  const [note, setNote] = useState('');
  const [idProduct, setidProduct] = useState([]);


  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }
    setidProduct(newSelectedUsers);
    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const convertVerify = (isVerifying) => {
    switch (isVerifying) {
      case 0: return 'Chờ Xác Nhận';
      case 1: return 'Đã Thanh Toán';
      case 2: return 'Đã Xác Nhận';
      case 3: return 'Hủy Đơn';
      default: return '';
    }
  }

  const renderDetails = (carts, note) => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên Sản Phẩm</TableCell>
            <TableCell>Ghi chú</TableCell>
            <TableCell>Màu</TableCell>
            <TableCell>size</TableCell>
            <TableCell>Giá Sản Phẩm</TableCell>
            <TableCell>Ngày Đặt Hàng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carts.map(cart => (
            <TableRow
              className={classes.tableRow}
              hover
              key={cart.key}
            // selected={selectedUsers.indexOf(user.id) !== -1}
            // onClick={() => { alert('aaa') }}
            >
              <TableCell>
                <div className={classes.nameContainer}>
                  <Avatar
                    className={classes.avatar}
                    src={cart.url}
                  >
                    {getInitials(cart.name)}
                  </Avatar>
                  <Typography variant="body1">{cart.name}</Typography>
                </div>
              </TableCell>
              <TableCell>{note}</TableCell>
              <TableCell>{cart.color}</TableCell>
              <TableCell>
                {cart.size}
              </TableCell>
              <TableCell>{cart.price}$</TableCell>
              <TableCell>
                {moment(cart.key).format('DD/MM/YYYY')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div>
      <div style={{ height: 100 }}>
        <UsersToolbar idProduct={idProduct}></UsersToolbar>
      </div>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.length === users.length}
                        color="primary"
                        indeterminate={
                          selectedUsers.length > 0 &&
                          selectedUsers.length < users.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Họ Tên</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Địa chỉ</TableCell>
                    <TableCell>SDT</TableCell>
                    <TableCell>Ngày đặt hàng</TableCell>
                    <TableCell>Trạng Thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.slice(0, rowsPerPage).map(user => (
                    <TableRow
                      className={[classes.tableRow, { backgroundColor: '#666' }]}
                      hover
                      key={user.id}
                      selected={selectedUsers.indexOf(user.id) !== -1}
                      onClick={() => { setIsShow(true); setCarts(user.carts); setNote(user.note || ''); }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.indexOf(user.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, user.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          <Avatar
                            className={classes.avatar}
                            src={user.avatarUrl}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <Typography variant="body1">{user.name}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.address.city}, {user.address.state},{' '}
                        {user.address.country}
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        {moment(user.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {
                          convertVerify(user.isVerifying)
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {isShow && renderDetails(carts, note)}
            </div>
          </PerfectScrollbar>
        </CardContent>
        {props.isLoading && < CircularProgress style={{ marginLeft: '50%' }} />}
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={users.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
    </div>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
