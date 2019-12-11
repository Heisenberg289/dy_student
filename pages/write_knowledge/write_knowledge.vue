<template>
	<view class="content">
		<view class="item_list" @tap="toDetail(item.link_url)" v-for="(item, index) in info_list" :key="index">
			<view class="title">{{ item.name }}</view>
			<image class="item_list_img" :src="item.img_url" />
		</view>
	</view>
</template>
<script>
import Api from '../../public/api.js';
export default {
	data() {
		return {
			info_list: []
		};
	},
	onShareAppMessage(res) {
		let that = this,
			random = Math.floor(Math.random() * 4),
			title = '据说这是90%的人都不知道的练字方法';
		return {
			title: title,
			path: `/pages/share/share?pages=write_knowledge&share=1`,
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
	onShow() {
		this.getListData();
	},
	methods: {
		getListData() {
			Api.knowledge().then(res => {
				if (res.data.errorCode === 0) {
					this.info_list = res.data.result.list;
				}
			});
		},
		toDetail(url) {
			let audit = getApp().globalData.audit;
			if (audit) return;
			let src = encodeURIComponent(url);
			uni.showToast({
				title:'敬请期待',
				icon:'none'
			})
	/* 		uni.navigateTo({
				url: `/pages/knowledge_detail/knowledge_detail?src=${src}`
			}); */
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
	background-color: #f6f7f9;
	padding-top: 28rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.item_list {
	width: 694rpx;
	height: 232rpx;
	margin-bottom: 28rpx;
	background: #fff;
	display: flex;
	height: 232rpx;
	box-shadow: 0px 0px 6px 0px rgba(238, 238, 238, 1);
	border-radius: 8rpx;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 28rpx;
}

.item_list .title {
	flex: 1;
	font-size: 32rpx;
	font-family: SourceHanSansCN;
	font-weight: bolder;
	color: rgba(21, 21, 21, 1);
	max-width: 422rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 4;
	overflow: hidden;
}

.item_list_img {
	width: 176rpx;
	height: 176rpx;
	border-radius: 4rpx;
}
</style>
