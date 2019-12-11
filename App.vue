<script>
const versions = '1.0.0';
export default {
	//全局变量
	globalData: {
		userinfo: {}, //用户信息
		usertype: {}, //vip信息
		audit: false,
		systeminfo: uni.getSystemInfoSync(), //系统设备信息
		/* 		appinfo: {
			siteroot: 'https://pandatest.junxing-tech.com/', //测试
			http_img: 'https://cdn.xiongmaolaoshi.com/', //测试库图片地址
			http_upload: 'https://xiongmao-cloud.oss-cn-beijing.aliyuncs.com/', //测试库上传地址
			http_job: 'panda_test/', //测试库作业地址
			versions: versions
		} */
		appinfo: {
			siteroot: 'https://online.xiongmaolaoshi.com/', //正式
			http_img: 'https://cdn.xiongmaolaoshi.com/', //正式库图片地址
			http_upload: 'https://xiongmao-cloud.oss-cn-beijing.aliyuncs.com/', //正式库上传地址
			http_job: 'panda/', //正式库作业地址
			versions: versions
		}
	},
	onLaunch: function() {
		console.log('App Launch');
		uni.setStorageSync('user_id', '13425');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
/*每个页面公共css */
button {
	border: none;
	border-radius: 0;
	margin: 0;
	padding: 0;
}

button::after {
	display: none;
}

button::before {
	display: none;
}
</style>
