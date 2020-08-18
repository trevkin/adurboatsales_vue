import axios from 'axios'

export default {
    methods: {
        getImageUrl: function (boatId, imageSuffix) {
           return process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/boats/' + boatId + imageSuffix + '.jpg'
        },
        imageExists: function (boatId, imageSuffix) {
            return axios.head(this.getImageUrl(boatId, imageSuffix), {method: 'HEAD'})
        }
    }
};