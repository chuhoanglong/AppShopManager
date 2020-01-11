import React from 'react';
import { UsersToolbar, UsersTable } from './components';
import firebase from 'firebase';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      carts: [],
      isLoading: true,
    }
  }
  componentWillMount() {
    // const firebaseConfig = {
    //   apiKey: "AIzaSyC983802DATeK8IbXfHMxk_ihxlO5AbUOs",
    //   authDomain: "manager-appshop-c9fdb.firebaseapp.com",
    //   databaseURL: "https://manager-appshop-c9fdb.firebaseio.com",
    //   projectId: "manager-appshop-c9fdb",
    //   storageBucket: "manager-appshop-c9fdb.appspot.com",
    //   messagingSenderId: "71062288585",
    //   appId: "1:71062288585:web:f2a6c0594412a7de833518",
    //   measurementId: "G-QFP8J94GDV"
    // };
    // firebase.initializeApp(firebaseConfig);

    new Promise((resolve, reject) => {
      this.props.showCustomerTask({ resolve, reject });
    })
      .then(res => {
        if (res) {
          this.setState({ customers: this.props.customers, carts: res.carts, isLoading: false });
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    const { customers, carts } = this.state;
    return (
      <div style={styles.root}>
        <UsersTable users={customers || []} carts={carts || []} isLoading={this.state.isLoading} />
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
