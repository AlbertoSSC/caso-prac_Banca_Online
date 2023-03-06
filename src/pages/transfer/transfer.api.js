import Axios from "axios";

const url = `${process.env.BASE_API_URL}/transfer`;

//get
//post
//put
//delete

// export const isValidTransfer = transfer => Axios.post(url, transfer).
//     then(response => {
//         return response.data;
//     });

export const insertTransfer = transfer =>
    Axios.post(url, transfer).then(response => {
        return response.data;
    });
