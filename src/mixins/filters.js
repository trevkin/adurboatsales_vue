import numeral from "numeral";

export default {
    filters: {
        removePunctuation: function (value) {
            if (typeof value !== 'undefined' && typeof value !== '') {
                return value.replace(/,|\.|£/gi, function (x) {
                    return '';
                });
            }
        },
        addPunctuation: function (value) {
            if (typeof value !== 'undefined' && typeof value !== '') {
                let matches = value.match(/\D+|\d+/gi);
                if (matches && !isNaN(matches[0])) {
                    matches[0] = numeral(matches[0]).format('$0,0')
                }
                return matches?matches.join(""):""
            }
        }
    }
};