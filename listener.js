import axios from 'axios';
import parser from "xml2json";

export const listener = async (req, res, next) => {
    if(!req.query.url) {
        console.log('Source url not given');
        return res.json({message: 'Provide some url to xml'});
    }
    try {
        const request = await axios({
            method: 'GET',
            validateStatus: (_status) => true,
            url: req.query.url
        });
        if(request.status > 304 || request.status < 200 || request.status === 204) {
            res.status(request.status);
            return res.json({message: 'Invalid url'});
        }
        const obj = parser.toJson(request.data, { object: true });
        return res.json({ ...obj });
    } catch (err) {
        console.log('Error caught: ', {err});
        return res.json({message: `Unexpected error: ${err.message}`})
    }
}