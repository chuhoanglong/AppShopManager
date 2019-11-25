import uuid from 'uuid/v1';
const fetchAPI = async () => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://dmkjo.sse.codesandbox.io/products"; // site that doesn’t send Access-Control-*
  try {
    let response = await fetch(
      proxyurl + url,
    );
    let responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error(error);
  }



  // fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
  //   .then(response => response.json())
  //   .then(contents => {
  //     return contents;
  //   })
  //   .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

}
fetchAPI();
export default 




  [
    {
      id: uuid(),
      name: 'Yeezy350Sesame',
      url: 'https://www.youbetterfly.com/image/cache/catalog/November%20sneakers/Adidas%20Yeezy%20Boost%20350%20Sesame-500x500.jpg',
      price: '594',
      createdAt: '27/03/2019',
      category: 'adidas',
      color: 'Tripple_White'
    },
    {
      id: uuid(),
      name: 'Yeezy350Sesame',
      url: 'https://cdn.shopify.com/s/files/1/1117/1018/products/v2stat_800x.png?v=1557231982',
      price: '625',
      createdAt: '31/03/2019',
      category: 'adidas',
      color: 'Tripple_White'
    },
    {
      id: uuid(),
      name: 'Yeezy350Sesame',
      url: 'https://ns.imgix.net/product/1563205886114_adidasYeezyBoost350V2Clay0.png',
      price: '857',
      createdAt: '03/04/2019',
      category: 'adidas',
      color: 'Tripple_White'
    },

  ];
