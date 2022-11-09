import axios from "axios";

const API_URL = "http://localhost:8080";

async function addNewOrder(phone, address) {
    // console.log("this is cart", localStorage.getItem('cart_items'));
    try {
        const response = await axios({
            method: 'post',
            url: API_URL + "/order",
            data: {
                "timestamp": (Date.now()).toString(),
                "phone": phone,
                "address": address,
                "customerId": localStorage.getItem('user_id'),
                "orderDetail": JSON.parse(localStorage.getItem('cart_items'))
                // "orderDetail": localStorage.getItem('cart_items')
            }
        });
        
        console.log(response);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}


const OrderService = {
    addNewOrder
};

export default OrderService;