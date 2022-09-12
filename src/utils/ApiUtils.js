

const url = "https://my-json-server.typicode.com/amarnathbarpanda/ShoppingGo/products";

export const getProducts = async () =>{
   
    try {
        const response = await fetch(url);
        return response.json();
    } catch (err) {
        console.log(err);
    }
}