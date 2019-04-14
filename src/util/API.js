/**
 * Created by mumarm45 on 20/12/2018.
 */

import axios from "axios";
const host = 'http://marketing.novus.technology';

export function accessToken(user) {
    return axios({
        method: 'post',
        url: `${host}/oauth/token?grant_type=password&username=${user.username}&password=${user.password}`,
        auth: {
            username: 'client', password: 'secret'
        }
    }).then((response) => {
            return response.data
        }
    );
}
export function getAllToken(token) {
    const headers = {
        "authorization": `Bearer ${token}`,
        "Accept": "*/*",
        "Content-Type": "*/*",
    };
    return axios({method: 'get', url: `${host}/web/users`, headers}).then((response) => {
            const data = response.data;
            data.content = data.content.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
            return data;
        }
    );
}
