import gender from '../constants/gender.js';

export default value =>
    (
        Object.keys(gender)
            .map(key => gender[key])
            .find(item => item.value === value) || {}
    ).label;
