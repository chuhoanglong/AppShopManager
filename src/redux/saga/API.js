// FETCH DATA To server for product
export const getDataProducts = async () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://dmkjo.sse.codesandbox.io/products"; // site that doesn’t send Access-Control-*
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
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://dmkjo.sse.codesandbox.io/users/customers"; // site that doesn’t send Access-Control-*
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