
// local url
// const url = "http://localhost:5000/products";

//deployed render url
const url = `${process.env.REACT_APP_BASE_URL}/products`;
console.log(process.env.REACT_APP_BASE_URL)
export const getProducts = async () => {

    try {
        const response = await fetch(url);
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export const getProductById = async (id) => {

    try {
        const response = await fetch(`${url}/${id}`);
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export const addProduct = async (product) => {
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

export const deleteProduct = async (id) => {

    const config = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await fetch(`${url}/${id}`, config);
        return response.json();
    } catch (err) {
        console.log(err);
    }
}
export const updateProduct = async (id, product) => {

    const config = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    }

    try {
        const response = await fetch(`${url}/${id}`, config);
        return response.json();
    } catch (err) {
        console.log(err);
    }
}