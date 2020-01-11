import firebase from 'firebase';
// FETCH DATA To server for product
export const getDataProducts = async () => {
    const uid = localStorage.getItem('userId');
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://dmkjo.sse.codesandbox.io/products/" + uid; // site that doesn’t send Access-Control-*
    try {
        let response = await fetch(
            proxyurl + url,
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error('getDataProducts err', error);
        return [];
    }

};

export const postDataProduct = async (product) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://dmkjo.sse.codesandbox.io/products/addProducts"; // site that doesn’t send Access-Control-*
    const res = await fetch(proxyurl + url,
        {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: product.name,
                price: product.price,
                color: product.color,
                category: product.category,
                url: product.URL,
                currency: product.currency
            }),
        }
    );
    const response = await res.json();
    return response;
}

export const removeDataProduct = async (product) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://dmkjo.sse.codesandbox.io/products/removeProduct?id="; // site that doesn’t send Access-Control-*
    const res = await fetch(proxyurl + url + product.id,
        {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: product.id,
            }),
        }
    );
    const response = await res.json();
    return response;
}

// FETCH DATA To server for user.
export const getDataCustomers = async () => {
    const uid = localStorage.getItem('userId');
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://dmkjo.sse.codesandbox.io/customers/" + uid; // site that doesn’t send Access-Control-*
    try {
        let response = await fetch(
            proxyurl + url,
            {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};


// FETCH DATA To server for user.
export const getCustomers = async () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://dmkjo.sse.codesandbox.io/customers/uid"; // site that doesn’t send Access-Control-*
    try {
        let response = await fetch(
            proxyurl + url,
            {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};

export const deleteProduct = async (payload) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://dmkjo.sse.codesandbox.io/customers/delete"; // site that doesn’t send Access-Control-*
    try {
        let response = await fetch(
            proxyurl + url,
            {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};

export const verifyProduct = async (payload) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://dmkjo.sse.codesandbox.io/customers/verify"; // site that doesn’t send Access-Control-*
    try {
        let response = await fetch(
            proxyurl + url,
            {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};

export const cancelOrder = async (payload) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://dmkjo.sse.codesandbox.io/customers/cancelOrder"; // site that doesn’t send Access-Control-*
    try {
        let response = await fetch(
            proxyurl + url,
            {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};

export const loginWithFirebase = (payload) => {
    const { email, password } = payload;
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            return res.user;
        })
        .catch((error) => {
            // Handle Errors here.
            return error;
            // ...
        });
}

export const sigUpWithFirebase = (payload) => {
    const { email, password } = payload;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => res)
        .catch(function (error) {
            return error
        });
}

// FETCH DATA while user login
// const getUserLogin = async (name,pass) => {
//     // const res = await fetch(URL_USER,
//     //     {
//     //         method: 'POST',
//     //         headers: {
//     //             Accept: "application/json",
//     //             "Content-Type": "application/json"
//     //         },
//     //         body: JSON.stringify({
//     //             name,
//     //             pass,
//     //         }),
//     //     }
//     // );

//     // const response = await res.json();
//     // return response;
// }

// module.exports = {
//     getDataProducts,
//     getDataCustomers,
//     // getUserLogin
// }