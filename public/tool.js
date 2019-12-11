import api from "./api.js"

export default {
	//app跳转回到首页
	toHomePage() {
		uni.showModal({
			title: '提示',
			content: '账号信息不一致!',
			showCancel: false,
			confirmText: '确定',
			success: res => {
				if (res.confirm) {
					console.log('用户点击确定');
					uni.switchTab({
						url: '/pages/home/home'
					})
				}
			}
		});
	},
	// rpx to px
	rpx2px(rpx) {
		return rpx / 750 * uni.getSystemInfoSync().windowWidth;
	},
	// px to rpx
	px2rpx(px) {
		return px / uni.getSystemInfoSync().windowWidth * 750;
	},
	/*公共工具函数 */
	//获取页面参数
	//秒转 00:00
	setTimes(value) {
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
		};
		var theTime_y = parseInt(theTime);
		if (theTime_y < 10) {
			theTime_y = '0' + theTime_y
		}
		var results = "" + theTime_y;
		if (theTime1 > 0 || theTime1 == 0) {
			var theTime1_y = parseInt(theTime1);
			if (theTime1_y < 10) {
				theTime1_y = '0' + theTime1_y;
			}
			results = "" + theTime1_y + ":" + results;
		}
		if (theTime2 > 0 || theTime2 == 0) {
			var theTime2_y = parseInt(theTime2);
			if (theTime2_y < 10) {
				theTime2_y = '0' + theTime2_y;
			}
			//results = "" + theTime1_y + ":" + results;
		}
		return results;
	},
	//验证手机号
	checkPhoneNum(phoneNumber) {
		let str = /^1[0-9]{10}$/
		if (str.test(phoneNumber)) {
			return true
		} else {
			return false
		}
	},
	//剩余vip时间计算
	vipTime(time) {
		let flag;
		if (parseFloat(time) > 7) {
			flag = parseInt(time);
		} else if (parseFloat(time) > 0 && parseFloat(time) <= 7) {
			if (parseFloat(time) < 1) {
				flag = 1;
			} else {
				flag = parseInt(time);
			}
		}
		return flag;
	},
	//小于10的补零操作
	add0(m) {
		return m < 10 ? '0' + m : m
	},
	getLocalTime(ns) {
		//needTime是整数，否则要parseInt转换  
		var time = new Date(parseInt(ns) * 1000); //根据情况*1000
		var y = time.getFullYear();
		var m = time.getMonth() + 1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		var s = time.getSeconds();
		return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
	},
	getChaYMD(ns) {
		const that = this;
		var allStr = that.getLocalTime(ns);
		var year = allStr.substr(0, 4);
		var month = allStr.substr(5, 2);
		var day = allStr.substr(8, 2);
		return year + '年' + month + '月' + day + '日';
	},
	getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	},
	formatNumber(n) {
		n = n.toString();
		return n[1] ? n : '0' + n;
	},
	formatTimeTwo(number, format) {
		var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
		var returnArr = [];

		var date = new Date(number * 1000);
		returnArr.push(date.getFullYear());
		returnArr.push(this.formatNumber(date.getMonth() + 1));
		returnArr.push(this.formatNumber(date.getDate()));

		returnArr.push(this.formatNumber(date.getHours()));
		returnArr.push(this.formatNumber(date.getMinutes()));
		returnArr.push(this.formatNumber(date.getSeconds()));

		for (var i in returnArr) {
			format = format.replace(formateArr[i], returnArr[i]);
		}
		return format;
	},
	getscale(scale, scale1) {
		var getscale = {};
		uni.getSystemInfo({
			success: function(res) {
				getscale.width = res.windowWidth,
					getscale.height = res.windowHeight,
					getscale.scale_width = res.windowWidth * scale,
					getscale.scale_height = res.windowWidth * scale / scale1
			}
		})
		return getscale;
	},
	get_week(date) {
		var info = {};
		var now_date = date.replace("-/g", "/");
		var week = new Date(now_date).getDay();
		switch (week) {
			case 0:
				info.week = '周日';
				break;
			case 1:
				info.week = '周一';
				break;
			case 2:
				info.week = '周二';
				break;
			case 3:
				info.week = '周三';
				break;
			case 4:
				info.week = '周四';
				break;
			case 5:
				info.week = '周五';
				break;
			case 6:
				info.week = '周六';
				break;
		}
		now_date = now_date.substr(5, 5);
		info.date = now_date.replace('-', '月') + '日';
		return info;
	},
	//函数节流
	throttle(fn, gapTime) {
		if (gapTime == null || gapTime == undefined) {
			gapTime = 1500
		}

		let lastTime = null

		// 返回新的函数
		return function() {
			let nowTime = +new Date()
			if (nowTime - lastTime > gapTime || !lastTime) {
				fn.apply(this, arguments) //将this和参数传给原函数
				lastTime = nowTime
			}
		}
	},
	jobTime() {
		var now = new Date();
		var year = String(now.getFullYear()); //年
		var month = String(now.getMonth() + 1); //月
		var day = String(now.getDate()); //日
		var hh = String(now.getHours()); //时
		var mm = String(now.getMinutes()); //分
		var ss = String(now.getSeconds()); //秒
		var clock = year;
		if (parseInt(month) < 10) {
			clock += "0";
		}
		clock += month;
		if (parseInt(day) < 10) {
			clock += "0";
		}
		clock += day;
		if (parseInt(hh) < 10) {
			clock += "0";
		}
		clock += hh;
		if (parseInt(mm) < 10) {
			clock += '0'
		};
		clock += mm;

		if (parseInt(ss) < 10) {
			clock += '0'
		};
		clock += ss;
		return clock;

	}
}
