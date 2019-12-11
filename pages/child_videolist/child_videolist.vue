<template>
	<view class="content">
		<view class="video-list">
			<navigator class="video-item" v-for="(item, index) in list.data" :key="index" :url="audit == true ? '' : '/pages/strify/strify?src=' + item.video_src + '&type=1'">
				<image :src="item.video_cover" class="video-item-cover" :lazy-load="true" />
				<view class="video-text">
					<text class="video-text-name">{{ item.stu_name }}</text>
					<text class="video-text-grade">{{ item.grade }}</text>
				</view>
			</navigator>
		</view>
		<uni-load-more :status="list.status"></uni-load-more>
	</view>
</template>

<script src="./child_videolist.js"></script>
<style src="./child_videolist.css"></style>
