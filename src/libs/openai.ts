import axios from 'axios';

const OPENAI_API_KEY = window.localStorage.getItem('apiKey');
const ORGANIZATION_ID = 'org-u5wdMv1QbV0Xc1qIJk9l7djp';

const headers = {
    Authorization: `Bearer ${ OPENAI_API_KEY }`,
    'OpenAI-Organization': ORGANIZATION_ID,
};

const url = 'https://api.openai.com/v1/models';

export async function fetchModels() {
    return await axios({
        url,
        method: 'GET',
        headers,
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    });
}
