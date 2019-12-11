<template>
	<view><web-view :src="src"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			src: ''
		};
	},
	onReady(){
		uni.setNavigationBarTitle({
			title:"练字小知识"
		})
	},
	onShareAppMessage(res) {
		let that = this,
			random = Math.floor(Math.random() * 4),
			title = '据说这是90%的人都不知道的练字方法',
			src = encodeURIComponent(res.webViewUrl);
		return {
			title: title,
			path: `/pages/share/share?share=1&src=${src}&pages=knowledge_detail`,
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
	onLoad(options) {
		this.src = decodeURIComponent(options.src);
	}
};
</script>
