const getTraits = () => {
    [
        'loving',
        'playful',
        'friendly',
        'protective',
        'calm',
        'intelligent',
        'herder',
        'anxious',
        'headstrong',
        'independent'
    ];
};

const getHealthIssues = () => {
    [
        'cardiovascular',
        'neurological',
        'digestive',
        'urinary',
        'mobility',
        'vision',
        'dental',
        'dermatological'
    ];
};

const getWeightRanges = () => {
    [
        '1 to 10 lbs', 
        '11 to 20 lbs', 
        '21 to 30 lbs', 
        '31 to 40 lbs', 
        '41 to 50 lbs',
        '51 to 60 lbs',
        '61 to 70 lbs',
        '71 to 80 lbs',
        '81 to 90 lbs',
        '91 to 100 lbs',
        '101 to 110 lbs',
        '111 to 120 lbs',
        '121 lbs +'
    ];
};

const getCoatTypes = () => {
    [
        'Smooth',
        'Double',
        'Silky',
        'Wool',
        'Wire',
        'Combination',
        'No hair'
    ];
};

const getStates = () => {
    ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
};

module.exports = {
    getHealthIssues,
    getTraits,
    getWeightRanges,
    getCoatTypes, 
    getStates
};


