<template>
	<view class="content"><video id="myVideo" :src="video_src" :autoplay="true" :direction="90" @fullscreenchange="tofullscreen" style="width: 100%;height: 100%;"></video></view>
</template>

<script>
export default {
	data() {
		return {
			video_src: 'https://cdn.xiongmaolaoshi.com/panda/static/strify/strify.mp4'
		};
	},
	onLoad(options) {
		if (options.src) {
			this.video_src = options.src;
		}
	},
	onShareAppMessage(res) {
		let _this = this,
			random = Math.floor(Math.random() * 4),
			title = '我在跟熊猫老师学写字，来给我加油吧';
		return {
			title: title,
			path: `/pages/share/share?share=1&pages=strify&src=${_this.video_src}`,
			success: function(res) {
				console.log('转发回调');
				console.log(res);
				// 转发成功
				// 如果这里有 shareTickets，则说明是分享到群的
				console.log(res.shareTickets);
			},
			fail: function(res) {
				// 转发失败
				console.log('失败');
			}
		};
	},
	methods: {
		tofullscreen(e) {
			const _this = this;
			console.log('全屏事件', e);
			// var videocontxt = wx.createVideoContext("myVideo", this)
			if (e.detail.direction == 'horizontal') {
				console.log('进入全屏');
			} else {
				console.log('退出全屏');
			}
			// videocontxt.pause();
			// videocontxt.play();
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}

.content {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}
</style>
