<template>
	<view class="content">
		<block v-if="page_show">
			<view class="header">
				<view class="header-title">
					<text>今日课程</text>
					<block v-if="lesson_type != 1 && lesson_type != 4 && lesson_type != 2 && tableinfo.open_status != 1">
						<navigator :url="'/pages/lesson_history/lesson_history?type=' + tableinfo.member_type" class="header-title-to">已上课程</navigator>
					</block>
				</view>
				<!-- 当前用户未领取体验课 -->
				<navigator url="/pages/index/index" hover-class="none" class="three-day-vip">
					<text class="text">已有{{ userinfo.num_now }}人领取</text>
					<button class="three-day-vip-btn" type="button">免费领取</button>
				</navigator>
			</view>
			<!-- 首页nav -->
			<form>
				<view class="nav-box" hover-class="none" :hover-stop-propagation="false">
					<view class="item">
						<view class="top">
							<button @tap="toChildVideo" class="bbspx"></button>
							<button @tap="toWrite" class="lzxzs"></button>
							<button @tap="toStrify" class="xmjxz"></button>
						</view>
					</view>
				</view>
			</form>
			<!-- 作业广场 -->
			<view class="job-list-box">
				<view class="job-list-head">
					<text class="job-list-title">作业广场</text>
					<swiper class="job-head-right" autoplay :circular="true" :vertical="true" :skip-hidden-item-layout="true" disable-touch>
						<swiper-item class="job-list-swiper-item" v-for="(item, index) in joblist.list" :key="index" @touchmove.stop="moveHandle">
							<image class="job-list-swiper-img" :src="imgsrc + 'v2_0swiper-img.png'" />
							<text class="job-list-swiper-name">{{ item.show_name }}</text>
							<text class="job-list-swiper-text">已提交作业</text>
						</swiper-item>
					</swiper>
				</view>
				<view class="job-list">
					<navigator class="job-list-item" v-for="(item, index) in joblist.list" :key="index">
						<image class="job-item-img" :src="item.job_img" :lazy-load="true" />
						<text class="job-item-text">{{ item.txt }}</text>
						<view class="job-item-user">
							<image class="job-item-user-img" :src="item.user_head" :lazy-load="true" />
							<text class="job-item-user-name">{{ item.name }}</text>
						</view>
					</navigator>
				</view>
				<view v-if="joblist.more" class="job-list-tips">{{ joblist.more_text }}</view>
			</view>
		</block>
		<image v-else class="loading-bg" src="/static/loading-bg.gif" />
	</view>
</template>

<script src="./home.js"></script>

<style lang="scss" src="./home.scss"></style>
