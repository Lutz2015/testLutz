import axios from 'axios';
module.exports = {
    async submit(params) {
        let res = await axios.post('/website/appointment', params);

        return res;
    }
};
