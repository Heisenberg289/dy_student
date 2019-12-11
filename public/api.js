//import parameter from "appinfo.js"
var util = {
	//封装网络请求
	request(url, data = {}, method = 'GET') {
		const parameter = getApp().globalData.appinfo;
		data.versions = parameter.versions;
		return new Promise((resolev, reject) => {
			uni.request({
				url: `${parameter.siteroot}${url}`,
				data: data,
				method: method,
				header: {
					'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				success: res => {
					if (res.data.errorCode != 0) {
						uni.showToast({
							title: JSON.stringify(res.data),
							icon: 'none'
						});
					}
					resolev(res)
				},
				fail: res => {
					uni.showToast({
						title: '异常' + JSON.stringify(res),
						icon: 'none'
					});
					reject(res)
				}
			});
		})
	},
};
var api = {
	/* --------------用户相关------------- */
	// uni登录
	login() {
		return new Promise((resolev, reject) => {
			uni.login({
				success: (res) => {
					if (res.code) {
						resolev(res)
					}
				},
				fail: reject
			})
		})
	},
	// 更新当前用户信息
	updateInfo() {
		var user_id = uni.getStorageSync('user_id');
		return new Promise((resolev, reject) => {
			this.login().then(res => {
				let parameter = user_id ? {
					code: res.code,
					user_id: user_id
				} : {
						code: res.code
					};
				return this.userStatus(parameter);
			}).then(res => {
				if (res.data.errorCode === 0) {
					
					let data = {
						userinfo: {},
						usertype: {}
					};
					data.userinfo = res.data.result;
					data.userinfo.openid = data.userinfo.origin_openid || data.userinfo.openid;
					getApp().globalData.userinfo = data.userinfo;
					if (data.userinfo.status === 0) {
						//老用户
						this.usertypenew({
							user_id: data.userinfo.user_id
						}).then(res => {
							data.usertype = res.data;
							getApp().globalData.usertype = res.data;
							resolev(data)
						})
					} else if (data.userinfo.status === 1) {
						resolev(data)
					}
					console.log(data)
				}
			})
		})
	},
	/* userLogin(data) {
		return util.request('account/wx/login/', data, 'POST')
	}, */
	userLogin(data) {
		data.is_type = 0;
		return util.request('gate/user/login/mobilephone/', data, 'POST')
	},
	phonelogin(data) {
		return util.request('account/user/login/phone/', data, 'POST')
	},
	//获取用户状态
	userStatus(data) {
		data.is_type = 0;
		return util.request('account/wx/user_status/', data, 'POST')
	},
	//修改进班用户信息
	stuEdit(data) {
		return util.request('account/user/edit/', data, 'POST')
	},
	//修改用户个人信息
	studentEdit(data) {
		return util.request('web/role/student/edit/', data, 'POST')
	},
	//返回状态
	status(data) {
		return util.request('account/flag/divide_class/', data, 'POST')
	},
	getuserinfo(data) {
		return util.request('account/user/query/', data, 'POST')
	},
	//获取用户推广二维码
	userqrcode(data) {
		return util.request('account/user/qrcode/', data, 'POST')
	},
	//首页练字小知识列表
	knowledge(data) {
		return util.request('class/knowledge/query/', {})
	},
	//根据手机号获取用户openid
	getopenid(data) {

		return util.request('account/user/open_id/query/', data, 'POST')
	},
	//获取用户会员类型
	usertypenew(data) {
		return util.request('account/user/pay_status/query/', data, 'POST')
	},
	//获取随机用户数据
	personinfo() {
		return util.request('account/usermock/query/', {})
	},
	//获取引导页次数
	userguide(data) {
		return util.request('account/user/guide_num/edit/', data, 'POST')
	},
	//扣减引导页次数
	guidetimes(data) {
		return util.request('account/user/guide_num/query/', data, 'POST')
	},
	//获取课程列表
	getCourses(data) {
		return util.request('course/courses/query/', data, 'POST')
	},
	inviterecords(data) {
		return util.request('account/user/invitevip/records/', data, 'POST')
	},
	//获取用户手机号
	getTel(data) {
		return util.request('account/wx/phone/', data, 'POST')
	},
	//获取用户验证码
	verifycode(data) {
		return util.request('account/user/login/verifycode/', data, 'POST')
	},
	//绑定手机号
	bindPhoneNolid(data) {
		return util.request('account/user/bind_phone/', data, 'POST')
	},
	//领取vip
	usesevenvip(data) {
		return util.request('account/user/7vip/', data, 'POST')
	},
	//获取年级信息
	gradeList(data) {
		return util.request('class/gradelist/query/', data, 'POST')
	},
	//获取作业
	myjob(data) {
		return util.request('account/user/query/info/', data, 'GET')
	},
	//记录上次学到课程
	listLesson(data) {
		return util.request('course/progress/edit/', data, 'POST')
	},
	//获取作业详情
	jobDetail(data) {
		return util.request('job/job/query/detail/', data)
	},
	//学生提交作业
	commitJob(data) {
		return util.request('job/job/commit/', data, "POST")
	},
	//获取视频
	getVideos(data) {
		return util.request('course/videos/query/', data, 'POST')
	},
	//获取用户查看视频的状态
	getUserStatus(data) {
		return util.request('account/user/video_status/query/', data, 'POST')
	},
	queryletter(data) {
		return util.request('course/letter/query/', data, 'POST')
	},
	/* -------------首页-------------- */
	// 查询字的信息
	indexcourselist(data) {
		return util.request('course/indexcourselist/', data)
	},
	//邀请vip
	invitevip(data) {
		return util.request('account/user/invitevip/', data, 'POST')
	},
	//获取宝贝视频秀
	studentShow(data) {
		return util.request('class/babyshow/query/', data)
	},
	todayTable(data) {
		return util.request('job/classtable/query/today/', data, 'POST')
	},
	//查看作业广场
	square(data) {
		return util.request('job/square/query/', data)
	},
	/* ---------排行榜-------- */
	Leaderboard(data) {
		return util.request('job/leaderboard/query/', data, 'POST')
	},
	/* -----------统计---------- */
	//统计分享次数
	sharetimes(data) {
		return util.request('account/user/invitevip/click/', data, 'POST')
	},
	//统计formid
	saveuserformid(data) {
		return util.request('account/user/formid/create/', data, 'POST')
	},
	//统计拒绝次数
	/* 	clicktimes(data) {
			return util.request('account/clicktimes/', data, 'POST')
		}, */
	referralrecord(data) {
		return util.request('account/user/introduce/records/', data, 'POST')
	},
	//分班链接
	techClass(data) {
		return util.request('class/class/query/', data);
	},
	//体验课作业
	jobquery(data) {
		return util.request('job/job/query/', data);
	},
	//已上课程
	tablehistory(data) {
		return util.request('job/classtable/query/history/', data);
	},
	//获取课表详情
	coursetablevideos(data) {
		return util.request('course/videos/query/timetable/', data, 'POST');
	},
	//根据课表打卡的状态
	usercommitstatus(data) {
		return util.request('job/status/is_commit/', data);
	},
}
export default api
