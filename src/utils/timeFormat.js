// 日期对象格式化转换

function timeFormat() {
    const timeAgo = (valueTime) => {
        let result = ''
        // 显示几天前
        if (valueTime) {
            let nowData = Date.parse(new Date());
            let diffTime = Math.abs(nowData - new Date(valueTime));
            if (diffTime > 365 * 24 * 3600 * 1000) {
                let date = new Date(valueTime);
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                let second = date.getSeconds();
                minute = minute < 10 ? ('1' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                result = m + '-' + d + ' ' + h + ':' + minute;
            } else if (diffTime < 365 * 24 * 3600 * 1000 && diffTime > 30 * 24 * 3600 * 1000) {
                // ("一年之内");

                // let time = nowData - diffTime;
                let weekNum = Math.floor(diffTime / (29 * 24 * 60 * 60 * 1000));
                result = weekNum + "个月前";
            } else if (diffTime < 30 * 24 * 3600 * 1000 && diffTime > 7 * 24 * 3600 * 1000) {
                // ("一月之内");

                // let time = nowData - diffTime;
                let weekNum = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
                result = weekNum + "周前";

            } else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
                // ("一周之内");

                // let time = nowData - diffTime;
                let dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
                result = dayNum + "天前";

            } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
                // ("一天之内");
                // let time = nowData - diffTime;
                let dayNum = Math.floor(diffTime / (60 * 60 * 1000));
                result = dayNum + "小时前";

            } else if (diffTime < 3600 * 1000 && diffTime > 0) {
                // ("一小时之内");
                // let time = nowData - diffTime;
                let dayNum = Math.floor(diffTime / (60 * 1000));
                if (dayNum === 0) {
                    result = "刚刚";
                } else {
                    result = dayNum + "分钟前";
                }
            } else {
                result = 'valueTime';
            }

        }
        return result
    }
    // 只显示日期
    const timeDate = (valueTime) => {
        if (valueTime) {
            const valueDate = new Date(valueTime)
            const year = valueDate.getFullYear()
            const month = valueDate.getMonth() + 1
            const date = valueDate.getDate()
            return (year + "-" + month + "-" + date);
        }
    }
    // 显示全部时间
    const timeFull = (valueTime) => {
        if (valueTime) {
            const valueDate = new Date(valueTime)
            const year = valueDate.getFullYear()
            const month = valueDate.getMonth() + 1
            const date = valueDate.getDate()
            const hour = valueDate.getHours()
            const minute = valueDate.getMinutes()
            const seconds = valueDate.getSeconds()
            return (year + "-" + month + "-" + date + ' ' + hour + ':' + minute + ':' + seconds);
        }
    }
    // 时间_用于文件名
    const timeFile = (valueTime) => {
        if (valueTime) {
            const valueDate = new Date(valueTime)
            const year = valueDate.getFullYear()
            const month = valueDate.getMonth() + 1
            const date = valueDate.getDate()
            const hour = valueDate.getHours()
            const minute = valueDate.getMinutes()
            const seconds = valueDate.getSeconds()
            return (year + "_" + month + "_" + date + '_' + hour + '_' + minute + '_' + seconds);
        }
    }
    const timeNowDate = () => {
        // let nowDataObj = Date.parse(new Date());
        let nowDate = new Date(1980, 0, 1)
        return {
            nowDate
        }
    }
    return {
        timeAgo,
        timeDate,
        timeNowDate,
        timeFull,
        timeFile
    }
}

export default timeFormat
