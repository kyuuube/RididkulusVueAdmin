import status from '../constants/articleStatus';

export default value =>
    (
        Object.keys(status)
            .map(key => status[key])
            .find(item => item.value === value) || {}
    ).label;
