export const globalMixin = {
  namespaced: true,
  methods: {
    getUniqId: function () {
      return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    getRandomString: function (length) {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
      }
      return result;
    },
    getTimestampFromDate: function (strDate) {
      return ((Date.parse(strDate)) / 1000);
    },
    getDateFromTimestamp: function (timestamp) {
      //TODO LKI :: RETURN TIMESTAMP IN DATE WITH FORMAT format
      return timestamp;
    }
  }
};