export const globalMixin = {
    namespaced: true,
    data: function () {
      return {
        monthNames: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ]
      };
    },
    methods: {
      deepCopy: function (obj) {
        try {
          return JSON.parse(JSON.stringify(obj));
        } catch (e) {
          return undefined;
        }
      },
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
      getFormattedDate: function (date, preFormattedDate = false, hideYear = false, includeTime = true) {
        const day = date.getDate();
        const month = this.monthNames[date.getMonth()].substring(0, 3);
        const year = date.getFullYear();
        const hours = date.getHours();
        let minutes = date.getMinutes();
        if (minutes < 10) {
          // Adding leading zero to minutes
          minutes = `0${ minutes }`;
        }
        if (preFormattedDate) {
          // Today at 10:20
          // Yesterday at 10:20
          return includeTime
            ? `${ preFormattedDate } at ${ hours }:${ minutes }`
            : preFormattedDate;
        }
        if (hideYear) {
          // 10. January at 10:20
          return includeTime
            ? `${ day } ${ month } at ${ hours }:${ minutes }`
            : `${ day } ${ month }`;
        }
        // 10. January 2017. at 10:20
        return includeTime
          ? `${ day } ${ month } ${ year } at ${ hours }:${ minutes }`
          : `${ day } ${ month } ${ year }`;
      },
      getDaysAgoFromTimestamp: function (dateParam, includeTime = true) {
        if (! dateParam) {
          return null;
        }
        dateParam *= 1000;
        const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
        const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
        const today = new Date();
        const yesterday = new Date(today - DAY_IN_MS);
        const seconds = Math.round((today - date) / 1000);
        const minutes = Math.round(seconds / 60);
        const isToday = today.toDateString() === date.toDateString();
        const isYesterday = yesterday.toDateString() === date.toDateString();
        const isThisYear = today.getFullYear() === date.getFullYear();
        if (seconds < 5) {
          return 'now';
        } else if (seconds < 60) {
          return `${ seconds } seconds ago`;
        } else if (seconds < 90) {
          return 'about a minute ago';
        } else if (minutes < 60) {
          return `${ minutes } minutes ago`;
        } else if (isToday) {
          return this.getFormattedDate(date, 'Today', includeTime); // Today at 10:20
        } else if (isYesterday) {
          return this.getFormattedDate(date, 'Yesterday', includeTime); // Yesterday at 10:20
        } else if (isThisYear) {
          return this.getFormattedDate(date, false, true, includeTime); // 10. January at 10:20
        }
        return this.getFormattedDate(date, false, false, includeTime); // 10. January 2017. at 10:20this.
      },
      getDateFromTimestamp: function (timestamp) {
        let date = new Date(timestamp * 1000);
        return this.monthNames[date.getMonth()] + ' ' + date.getDate() + ',' + date.getFullYear() + ' '
          + date.getHours() + ':' + date.getMinutes();
      },
      getRandomDate: function (start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      }
    }
  }
;