import axios from "axios";

const API_URL = "http://localhost:8080";

async function getAllCustomersAdmin(page, size) {
    try {
        const response = await axios({
            method: 'get',
            url: API_URL + "/customer/admin?page=" + page + "&size=" + size,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function getTotalNumber() {
    try {
        const response = await axios({
            method: 'get',
            url: API_URL + "/customer/totalnumber",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function deleteCustomer(customerId) {
    try {
        const response = await axios({
            method: 'delete',
            url: API_URL + "/customer/admin/" + customerId,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}


const CustomersService = {
    getAllCustomersAdmin,
    getTotalNumber,
    deleteCustomer
};

export default CustomersService;