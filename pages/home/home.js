import Api from "../../public/api.js";
import Tool from "../../public/tool.js";
var App = getApp().globalData;

export default {
	data() {
		return {
			imgsrc: App.appinfo.http_img + "panda/static/home/",
			navigationBar_height: parseInt(App.systeminfo.statusBarHeight),
			navigationBar_fiexd: false,
			page_show: false,
			userinfo: {},
			usertype: {},
			lesson_type: 1, //课表类型
			tableinfo: {}, //课表信息
			current: 0, //作业广场轮播默认显示index
			joblist: {
				count: 0,
				list: [],
				more: true,
				more_text: "正在加载中~",
				page: 0,
				size: 20
			},
			guide_add: false, //引导页
			guide_add2: false,
			options: {
				//好友助力弹框
				invitationVip: false,
				head_img: "", //头像
				name: "", //名称
				openid: ""
			}
		};
	},
	onLoad(options) {
		var userinfo = getApp().globalData.userinfo;
		//判断是否助力
		let openid = userinfo.openid ? userinfo.openid : '';
		if (options.invitationVip && options.openid != openid) {
			this.invitationVip(options);
		}
		//助力用户登录返回
		if (options.options) {
			var help = JSON.parse(options.options);
			if (help.invitationVip) {
				var data = help.user_id ? {
					toopen_id: userinfo.openid,
					open_id: help.openid,
					user_id: help.user_id,
					touser_id: userinfo.user_id
				} : {
					toopen_id: userinfo.openid,
					open_id: help.openid
				};
				Api.invitevip(data).then(res => {
					if (res.data.errorCode === 0) {
						uni.showToast({
							title: '助力成功!',
							mask: true,
						});
					}
				})
			}
		}
		setTimeout(() => {
			this.getJobList();
		}, 500);
		console.log(options, openid);
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		let _this = this;
		Api.updateInfo().then(res => {
			if (res.userinfo.status != 1) {
				if (res.userinfo.phonenum.length < 10) {
					uni.reLaunch({
						url: '/pages/phone_login/phone_login'
					})
				} else {
					_this.getTimetable(res.userinfo.user_id);
					_this.guide(res.userinfo.user_id);
				}
			}
			_this.userinfo = res.userinfo;
			_this.usertype = res.usertype;
			_this.page_show = true;
		});
	},
	/**
	 * 用户点击右上角分享
	 */
	//转发
	onShareAppMessage(res) {
		let that = this,
			random = Math.floor(Math.random() * 4),
			title = "";
		switch (random) {
			case 0:
				title = "跟熊猫学写字，孩子作业写得快又好！现在免费看>>";
				break;
			case 1:
				title = "每天学习5分钟，作业天天得A+，孩子开心我舒心！>>";
				break;
			case 2:
				title = "孩子写字丑，作业反复擦，别怕，熊猫老师来拯救！>>";
				break;
			case 3:
				title = "专业名师免费教，写字明显更漂亮，现在免费看>>";
				break;
		}
		return {
			title: title,
			path: "/pages/home/home?share=1",
			imageUrl: `https://cdn.xiongmaolaoshi.com/1.7/${random}.png`,
			success(res) {
				console.log("转发回调");
				console.log(res);
				// 转发成功
				// 如果这里有 shareTickets，则说明是分享到群的
				console.log(res.shareTickets);
			},
			fail: function(res) {
				// 转发失败
				console.log("失败");
			}
		};
	},
	//监听页面滚动
	onPageScroll(e) {
		if (e.scrollTop > parseInt(this.navigationBar_height)) {
			this.navigationBar_fiexd = true;
		} else {
			this.navigationBar_fiexd = false;
		}
	},
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {
		this.joblist.list = [];
		this.joblist.page = 0;
		this.joblist.more = true;
		this.getJobList().then(() => uni.stopPullDownRefresh());
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {
		this.getJobList();
	},
	methods: {
		//助力用户判断
		invitationVip(options) {
			let _this = this;
			let data = options.user_id ? {
				open_id: options.openid,
				user_id: options.user_id
			} : {
				open_id: options.openid
			};
			//助力进入
			Api.getuserinfo(data).then(res => {
				if (res.data.errorCode === 0) {
					let help = {
						invitationVip: true,
						head_img: res.data.result.avatar_url,
						name: res.data.result.nickname,
						openid: options.openid,
						user_id: options.user_id,
						page: 'home'
					};
					_this.options = help;
				}
			});
		},
		//获取今日课表
		getTimetable(user_id) {
			let _this = this;
			Api.todayTable({
				user_id
			}).then(res => {
				console.log("今日课表", res);
				if (res.data.errorCode === 0) {
					if (res.data.result.status == 0) {
						res.data.result.newdate = Tool.get_week(
							res.data.result.date || Tool.getNowFormatDate()
						);
					}
					_this.tableinfo = res.data.result;
					_this.lesson_type = parseInt(res.data.result.status);
				}
			});
		},
		// 作业广场获取更多数据
		getJobList() {
			if (!this.joblist.more) return;
			let _this = this,
				page = ++_this.joblist.page;
			_this.current = 0;
			return Api.square({
				page: page
			}).then(res => {
				console.log("作业广场", res);
				if (res.data.errorCode === 0) {
					let pageNum = _this.joblist.page,
						size = _this.joblist.size,
						count = res.data.result.total_count,
						more = res.data.result.jobs.length > 0 ? true : false,
						more_text = more ? "正在加载中~" : "已经到底啦~",
						job_list = _this.joblist.list.concat(res.data.result.jobs);
					var random_array = [
						"孩子跟着熊猫老师学写字,作业写得又快又好",
						"第X天练习写字,希望我的字能像熊猫老师一样漂亮",
						"坚持练字第X天,感觉自己萌萌哒",
						"打卡第X天,每天必做事就是跟着熊猫老师学写字",
						"第X天练习写字,一天比一天有进步",
						"坚持就是胜利,我已打卡X天",
						"第X天打卡,原来写字可以这么有趣",
						"第X天练习写字,我要成为榜上有名的写字小明星",
						"听说写字写得好,会上排行榜，我要加油",
						"打卡第X天,每天进步一点点"
					];

					for (var i = 0; i < job_list.length; i++) {
						var random = Math.floor(Math.random() * 10);
						if (job_list[i].name.length > 3) {
							job_list[i].show_name = job_list[i].name.slice(0, 3) + "...";
						} else {
							job_list[i].show_name = job_list[i].name;
						}
						if (random == 0 || random == 8) {
							job_list[i].txt = random_array[random];
						} else {
							switch (random) {
								case 1:
									job_list[i].txt =
										"第" +
										job_list[i].days +
										"天练习写字，希望我的字能像熊猫老师一样漂亮";
									break;
								case 2:
									job_list[i].txt =
										"坚持练字第" + job_list[i].days + "天，感觉自己萌萌哒";
									break;
								case 3:
									job_list[i].txt =
										"打卡第" +
										job_list[i].days +
										"天，每天必做事就是跟着熊猫老师学写字";
									break;
								case 4:
									job_list[i].txt =
										"第" + job_list[i].days + "天练习写字，一天比一天有进步";
									break;
								case 5:
									job_list[i].txt =
										"坚持就是胜利，我已打卡" + job_list[i].days + "天";
									break;
								case 6:
									job_list[i].txt =
										"第" + job_list[i].days + "天打卡, 原来写字可以这么有趣";
									break;
								case 7:
									job_list[i].txt =
										"第" +
										job_list[i].days +
										"天练习写字，我要成为榜上有名的写字小明星";
									break;
								case 9:
									job_list[i].txt =
										"打卡第" + job_list[i].days + "天，每天进步一点点";
									break;
								default:
									job_list[i].txt = "听说写字写得好，会上排行榜，我要加油";
									break;
							}
						}
					}
					_this.joblist.count = count;
					_this.joblist.list = job_list;
					_this.joblist.more = more;
					_this.joblist.more_text = more_text;
					_this.joblist.page = page;
				}
			});
		},
		//引导页
		guide(user_id) {
			let _this = this;
			Api.guidetimes({
				user_id
			}).then(res => {
				console.log(res, "引导剩余次数");
				//引导剩余次数
				if (res.data.status == 1) {
					if (res.data.msg > 0 && _this.usertype.status != 5) {
						//显示引导页
						_this.guide_add = true;
					}
				} else {
					//引导剩余次数报错
					console.log(res.data.msg);
				}
			});
		},
		//关闭引导页
		guideClose(time) {
			Api.userguide({
				user_id: this.userinfo.user_id,
				times: time
			}).then(res => {
				console.log(res, "引导剩余次数");
				this.guide_add = false;
				this.guide_add2 = false;
			});
		},
		//添加小程序引导下一步操作
		guideAddNext() {
			this.guide_add = false;
			this.guide_add2 = true;
		},
		//领取助力
		getHelp: Tool.throttle(function(e) {
			let _this = this;
			// 判断是否授权  true 替换微信用户头像
			if (e.detail.userInfo != undefined) {
				uni.showLoading({
					title: "请求发送中~",
					mask: true
				});
				Api.login().then(res => {
					return Api.userLogin({
						code: res.code,
						user_info: e.detail.rawData
					});
				}).then(res => {
					if (res.data.errprCode === 0) {
						return Api.updateInfo();
					}
				}).then(res => {
					_this.userinfo = res.userinfo;
					_this.usertype = res.usertype;
					var data = _this.help.user_id ? {
						toopen_id: res.userinfo.openid,
						open_id: _this.help.openid,
						user_id: _this.help.user_id,
						touser_id: res.userinfo.user_id
					} : {
						toopen_id: res.userinfo.openid,
						open_id: _this.help.openid
					};
					return Api.invitevip(data);
				}).then(res => {
					if (res.data.errorCode === 0) {
						uni.hideLoading();
						_this.help.show = false;
					}
				})
			} else {
				uni.showModal({
					title: '提示',
					content: '请同意授权哦~',
					showCancel: false
				})
			}
		}, 1500),
		//关闭好友助力
		helpClose() {
			this.help.show = false;
		}, //禁止轮播滑动
		catchTouchMove() {
			return false;
		},
		toLesson() {
			uni.switchTab({
				url: "/pages/lesson/lesson"
			});
		},
		toRankList() {
			uni.navigateTo({
				url: "/pages/ranklist_all/ranklist_all?share=1"
			});
		},
		toChildVideo() {
			uni.navigateTo({
				url: "/pages/child_videolist/child_videolist"
			});
		},
		toStrify() {
			let audit = getApp().globalData.audit;
			if (audit) return;
			uni.navigateTo({
				url: "/pages/strify/strify"
			});
		},
		toWrite() {
			uni.navigateTo({
				url: "/pages/write_knowledge/write_knowledge"
			});
		},
		upFormId(e) {
			console.log("触发formid", e);
			let _this = this;
			Api.saveuserformid({
				formid: e.detail.formId,
				openid: _this.userinfo.openid
			});
		},
		moveHandle() {
			return false
		}
	}
};
