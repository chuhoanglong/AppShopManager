import React from 'react';
import { UsersToolbar, UsersTable } from './components';


class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: this.props.customers
    }
  }
  componentWillMount() {
    this.props.showCustomerTask();
  }
  render() {
    const { customers } = this.props.customers;
    return (
      <div style={styles.root}>
        <UsersToolbar />
        <div style={styles.content}>
          <UsersTable users={customers || this.state.customers} />
        </div>
      </div>
    )
  }
}

const styles = {
  root: {
    paading: 13,

  },
  content: {
    marginTop: 20
  }
}

export default UserList;
