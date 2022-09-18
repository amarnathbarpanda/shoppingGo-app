

const url = "https://my-json-server.typicode.com/amarnathbarpanda/ShoppingGo/products";

export const getProducts = async () =>{
   
    try {
        const response = await fetch(url);
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export const addProduct = async (product) =>{
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    }

    try {
        const response = await fetch(url, config);
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

