import axios from 'api/config';

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data.data);

export default fetcher;
