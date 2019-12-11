import Api from "../../public/api.js";
import uniLoadMore from "@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue";
export default {
	name: "child_video",
	components: {
		uniLoadMore
	},
	data() {
		return {
			audit: false,
			list: {
				status: "more",
				count: 0,
				page: 0,
				pagesize: 12,
				data: []
			}
		};
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getList();
		this.audit = getApp().globalData.audit
	},
	//分享
	onShareAppMessage(res) {
		let random = Math.floor(Math.random() * 4),
			title = "我在跟熊猫老师学写字，来给我加油吧";
		return {
			title: title,
			path: "/pages/share/share?pages=child_videolist&share=1",
			success: function(res) {
				console.log("转发回调");
			},
			fail: function(res) {
				// 转发失败
				console.log("失败");
			}
		};
	},
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {
		this.list.data = [];
		this.list.page = 0;
		this.getList().then(() => uni.stopPullDownRefresh());
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {
		if (this.list.status == "more") {
			this.getList();
		}
	},
	methods: {
		getList() {
			let _this = this,
				page = ++this.list.page;
			this.list.status = "loading";
			return Api.studentShow({
				page: page
			}).then(res => {
				if (res.data.errorCode === 0) {
					let count = res.data.result.count,
						pagesize = _this.list.pagesize,
						page = _this.list.page,
						more = page * pagesize < count,
						list = _this.list.data.concat(res.data.result.list);
					uni.hideLoading();
					_this.list.status = more ? "more" : "noMore";
					_this.list.count = count;
					_this.list.data = list;
					_this.list.page = more ? page : page - 1;
				}
			});
		}
	}
};
