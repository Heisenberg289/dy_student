import Vue from "vue";
//时间戳转年月日
Vue.filter("ymd", value => {
	var date = new Date(value), //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		Y = date.getFullYear() + "年",
		M =
		(date.getMonth() + 1 < 10 ?
			"0" + (date.getMonth() + 1) :
			date.getMonth() + 1) + "月",
		D = date.getDate() + "日",
		h = date.getHours() + ":",
		m = date.getMinutes() + ":",
		s = date.getSeconds();
	return Y + M + D; //时分秒可以根据自己的需求加上
});

// 10位时间戳转"YYYY.MM.DD"
Vue.filter("YYYYMMDD", timestamp => {
	var date = new Date(timestamp * 1000);
	var YYYY = date.getFullYear();
	var MM =
		date.getMonth() + 1 < 10 ?
		"0" + (date.getMonth() + 1) :
		date.getMonth() + 1;
	var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	return YYYY + "." + MM + "." + DD;
});

// 10位时间戳转"M月D日 HH:mm"
Vue.filter("MDHHmm", timestamp => {
	var date = new Date(timestamp * 1000);
	var M = date.getMonth() + 1;
	var D = date.getDate();
	var HH = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	return M + "月" + D + "日" + " " + HH + ":" + mm;
});

// "YYYY-MM-DD"转"M月D号 周几"
Vue.filter("YYYYMMDD2MDday", date => {
	var dateSplitArray = date.split("-");
	var M = Number(dateSplitArray[1]);
	var D = Number(dateSplitArray[2]);
	var days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
	var day = days[new Date(date.replace("-/g", "/")).getDay()];
	return M + "月" + D + "号" + " " + day;
});

//秒转时分秒 00:00:00
Vue.filter("sshhmmss", function(value) {
	var theTime = parseInt(value); //秒
	var theTime1 = 0; //分
	var theTime2 = 0; //时
	if (theTime > 60) {
		theTime1 = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		if (theTime1 > 60) {
			theTime2 = parseInt(theTime1 / 60);
			theTime1 = parseInt(theTime1 % 60);
		}
	}
	var theTime_y = parseInt(theTime);
	if (theTime_y < 10) {
		theTime_y = "0" + theTime_y;
	}
	var results = "" + theTime_y;
	if (theTime1 > 0 || theTime1 == 0) {
		var theTime1_y = parseInt(theTime1);
		if (theTime1_y < 10) {
			theTime1_y = "0" + theTime1_y;
		}
		results = "" + theTime1_y + ":" + results;
	}
	if (theTime2 > 0 || theTime2 == 0) {
		var theTime2_y = parseInt(theTime2);
		if (theTime2_y < 10) {
			theTime2_y = "0" + theTime2_y;
		}
		results = theTime2_y + ":" + results;
	}
	return results;
});
