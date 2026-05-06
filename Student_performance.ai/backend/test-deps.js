try {
    require('openai');
    console.log('openai found');
} catch (e) {
    console.log('openai NOT found');
}

try {
    require('@google/generative-ai');
    console.log('@google/generative-ai found');
} catch (e) {
    console.log('@google/generative-ai NOT found');
}

try {
    require('dotenv');
    console.log('dotenv found');
} catch (e) {
    console.log('dotenv NOT found');
}
