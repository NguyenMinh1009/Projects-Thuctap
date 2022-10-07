// import dayjs from "./node_modules/dayjs/esm";
// import relativeTime from "/dayjs/plugin/relativeTime";

// const c = dayjs()
// console.log(c.format())
// console.log(c.month())
// console.log(c.date())
// console.log(c.hour(), c.minute())
// console.log(c.hour(), c.minute(), c.second(), c.date(), c.month())
// console.log(c.toArray())
// console.log(c.daysInMonth())

// const d = dayjs('2022-10-04');
// console.log(d.year())
// console.log(d.month())

const handleTimeToNow = (timePost) => {
  var diff = "";

  const timeNow = dayjs();
  const dTimePost = dayjs(timePost);
  var yearPost = dayjs(dTimePost.year());
  var monthPost = dayjs(dTimePost.month());
  var datePost = dayjs(dTimePost.date());
  var hourPost = dayjs(dTimePost.hour());
  var minutePost = dayjs(dTimePost.minute());
  var secondPost = dayjs(dTimePost.second());
  if (timeNow.year() == yearPost) {
    if (monthPost == timeNow.month()) {
      if (datePost == timeNow.date()) {
        if (hourPost == timeNow.hour()) {
          if (minutePost == timeNow.minute()) {
            if (secondPost == timeNow.second()) {
            } else {
              diff = "a few second ago";
            }
          } else {
            var diffMinute = timeNow.minute() - minutePost;
            diff = diffMinute + " minute ago";
          }
        } else {
          var diffHour = timeNow.hour() - hourPost;
          diff = diffHour + " hour ago";
        }
      } else {
        monthPost = monthPost+1
        diff = datePost + "-" + monthPost + "-" + yearPost;
      }
    } else {
        monthPost = monthPost+1

      diff = datePost + "-" + monthPost + "-" + yearPost;
    }
  } else {
    monthPost = monthPost+1

    diff = datePost + "-" + monthPost + "-" + yearPost;
  }

  return diff;
};
