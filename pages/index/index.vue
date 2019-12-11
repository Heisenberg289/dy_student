<template>
	<view class="content">
		<image src="/static/index/header.png" style="width: 750rpx;height:620rpx;"></image>
		<view class="form-phone">
			<input type="text" class="phone" :value="name" @input="inputName" maxlength="10" placeholder="宝贝姓名" placeholder-style="color: rgba(131, 147, 181, 1)" />
			<input type="number" class="phone" :value="phonenum" @input="inputPhone" maxlength="11" placeholder="家长手机号" placeholder-style="color: rgba(131, 147, 181, 1)" />
			<button class="get-btn" @tap="postForm">免费领取</button>
			<button
					open-type="getPhoneNumber"
					bindgetphonenumber="getPhoneNumberHandler"
			>
				<view class="get-btn">免费领取</view>
			</button>
			<text class="text">领取后会有专属写字课程顾问联系您</text>
		</view>
		<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1000" :vertical="true" :circular="true">
			<block v-for="(item, index) in roll" :key="index">
				<swiper-item @touchmove.stop="() => false">
					<view class="swiper-item">
						<image class="img" src="/static/index/roll.png"></image>
						<view class="text">{{ item.name }}</view>
						<view class="text">{{ item.phonenum }}</view>
						<view class="text">{{ item.time }}</view>
					</view>
				</swiper-item>
			</block>
		</swiper>
		<image src="/static/index/01.png" style="width: 750rpx;height: 1378rpx;"></image>
		<image src="/static/index/02.png" style="width: 750rpx;height: 744rpx;"></image>
		<image src="/static/index/03.png" style="width: 750rpx;height: 1008rpx;"></image>
		<image src="/static/index/04.png" style="width: 750rpx;height: 1074rpx;"></image>
		<image src="/static/index/05.png" style="width: 750rpx;height: 700rpx;"></image>
		<view class="form-phone">
			<input type="text" class="phone" :value="name" @input="inputName" maxlength="10" placeholder="宝贝姓名" placeholder-style="color: rgba(131, 147, 181, 1)" />
			<input type="number" class="phone" :value="phonenum" @input="inputPhone" maxlength="11" placeholder="家长手机号" placeholder-style="color: rgba(131, 147, 181, 1)" />
			<button class="get-btn" @tap="postForm">免费领取</button>
			<text class="text">领取后会有专属写字课程顾问联系您</text>
		</view>
		<button v-show="btnShow" class="get-btn02" @tap="pageScroll">免费领取</button>


		<!-- 弹出框 -->
		<view v-if="popShow" class="pop-box" @touchmove.stop.prevent="() => false"><image src="/static/index/pop.png" class="pop-img" @tap="popShow = false"></image></view>
	</view>
</template>

<script>
var disbled = false;
export default {
	data() {
		return {
			roll: [],
			name: '',
			phonenum: '',
			btnShow: false,
			popShow: false
		};
	},
	onLoad() {
		this.rollData();
	},
	onPageScroll(e) {
		if (e.scrollTop > 550) {
			this.btnShow = true;
			return;
		}
		if (e.scrollTop < 550) {
			this.btnShow = false;
			return;
		}
	},
	methods: {
		getPhoneNumberHandler (e) {
			console.log(e.detail.errMsg);
			console.log(e.detail.iv);
			console.log(e.detail.encryptedData);
		},
		inputName(e) {
			console.log(e);
			this.name = e.detail.value;
		},
		inputPhone(e) {
			this.phonenum = e.detail.value;
		},
		postForm() {
			if (disbled) return;
			var phone = this.checkPhoneNum(this.phonenum);
			var name = this.name.trim();
			console.log(name);
			uni.pageScrollTo({
				scrollTop: 0
			});
			if (name == '') {
				uni.showModal({
					title: '提示',
					content: '请输入宝贝姓名',
					showCancel: false
				});
				return;
			}
			if (this.phonenum == '') {
				uni.showModal({
					title: '提示',
					content: '请输入手机号',
					showCancel: false
				});
				return;
			}
			console.log(phone);
			if (phone) {
				disbled = true;
				this.collectphonenumsApi().then(res => {
					if (res.data.errorCode == 0) {
						this.popShow = true;
						disbled = false;
					}
				});
			} else {
				uni.showModal({
					title: '提示',
					content: '手机号格式错误，请重新输入',
					showCancel: false
				});
			}
		},
		//验证手机号
		checkPhoneNum(phoneNumber) {
			let str = /^1[0-9]{10}$/;
			if (str.test(phoneNumber)) {
				return true;
			} else {
				return false;
			}
		},
		collectphonenumsApi() {
			return new Promise((resolev, reject) => {
				uni.request({
					url: 'https://online.xiongmaolaoshi.com/goods/collectphonenums',
					//url: 'https://pandatest.junxing-tech.com/goods/collectphonenums',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					data: {
						name: this.name,
						phonenum: this.phonenum,
						type: 'douyin_xcx'
					},
					success: resolev,
					fail: reject
				});
			});
		},
		pageScroll() {
			uni.pageScrollTo({
				scrollTop: 0
			});
		},
		//生成滚动数据
		rollData() {
			let _this = this;
			for (let index = 0; index < 20; index++) {
				_this.roll.push({
					name: _this.getName(),
					phonenum: _this.getMoble(),
					time: _this.getTime() + '分钟前'
				});
			}
		},
		//生成随机姓名
		getName() {
			var familyNames = new Array(
				'赵',
				'钱',
				'孙',
				'李',
				'周',
				'吴',
				'郑',
				'王',
				'冯',
				'陈',
				'褚',
				'卫',
				'蒋',
				'沈',
				'韩',
				'杨',
				'朱',
				'秦',
				'尤',
				'许',
				'何',
				'吕',
				'施',
				'张',
				'孔',
				'曹',
				'严',
				'华',
				'金',
				'魏',
				'陶',
				'姜',
				'戚',
				'谢',
				'邹',
				'喻',
				'柏',
				'水',
				'窦',
				'章',
				'云',
				'苏',
				'潘',
				'葛',
				'奚',
				'范',
				'彭',
				'郎',
				'鲁',
				'韦',
				'昌',
				'马',
				'苗',
				'凤',
				'花',
				'方',
				'俞',
				'任',
				'袁',
				'柳',
				'酆',
				'鲍',
				'史',
				'唐',
				'费',
				'廉',
				'岑',
				'薛',
				'雷',
				'贺',
				'倪',
				'汤',
				'滕',
				'殷',
				'罗',
				'毕',
				'郝',
				'邬',
				'安',
				'常',
				'乐',
				'于',
				'时',
				'傅',
				'皮',
				'卞',
				'齐',
				'康',
				'伍',
				'余',
				'元',
				'卜',
				'顾',
				'孟',
				'平',
				'黄',
				'和',
				'穆',
				'萧',
				'尹'
			);
			var givenNames = new Array(
				'子璇',
				'淼',
				'国栋',
				'夫子',
				'瑞堂',
				'甜',
				'敏',
				'尚',
				'国贤',
				'贺祥',
				'晨涛',
				'昊轩',
				'易轩',
				'益辰',
				'益帆',
				'益冉',
				'瑾春',
				'瑾昆',
				'春齐',
				'杨',
				'文昊',
				'东东',
				'雄霖',
				'浩晨',
				'熙涵',
				'溶溶',
				'冰枫',
				'欣欣',
				'宜豪',
				'欣慧',
				'建政',
				'美欣',
				'淑慧',
				'文轩',
				'文杰',
				'欣源',
				'忠林',
				'榕润',
				'欣汝',
				'慧嘉',
				'新建',
				'建林',
				'亦菲',
				'林',
				'冰洁',
				'佳欣',
				'涵涵',
				'禹辰',
				'淳美',
				'泽惠',
				'伟洋',
				'涵越',
				'润丽',
				'翔',
				'淑华',
				'晶莹',
				'凌晶',
				'苒溪',
				'雨涵',
				'嘉怡',
				'佳毅',
				'子辰',
				'佳琪',
				'紫轩',
				'瑞辰',
				'昕蕊',
				'萌',
				'明远',
				'欣宜',
				'泽远',
				'欣怡',
				'佳怡',
				'佳惠',
				'晨茜',
				'晨璐',
				'运昊',
				'汝鑫',
				'淑君',
				'晶滢',
				'润莎',
				'榕汕',
				'佳钰',
				'佳玉',
				'晓庆',
				'一鸣',
				'语晨',
				'添池',
				'添昊',
				'雨泽',
				'雅晗',
				'雅涵',
				'清妍',
				'诗悦',
				'嘉乐',
				'晨涵',
				'天赫',
				'玥傲',
				'佳昊',
				'天昊',
				'萌萌',
				'若萌'
			);
			var i = parseInt(10 * Math.random()) * +parseInt(10 * Math.random());
			var familyName = familyNames[i];
			var j = parseInt(10 * Math.random()) * +parseInt(10 * Math.random());
			var givenName = givenNames[i];
			var name = familyName + '**';
			return name;
		},
		//随机号码
		getMoble() {
			var prefixArray = new Array('130', '131', '132', '133', '135', '137', '138', '170', '187', '189');
			var i = parseInt(10 * Math.random());
			var prefix = prefixArray[i] + '****';
			for (var j = 0; j < 4; j++) {
				prefix = prefix + Math.floor(Math.random() * 10);
			}
			return prefix;
		},
		//随机时间
		getTime() {
			var num = Math.floor(Math.random() * 15);
			return num == 0 ? 1 : num;
		}
	}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 140rpx;
	background-color: #ffffff;
}
image {
	display: block;
}
button::after {
	display: none;
}

button::before {
	display: none;
}
/* 免费领取 */
.form-phone {
	box-sizing: border-box;
	width: 750rpx;
	padding: 40rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.form-phone .phone {
	box-sizing: border-box;
	width: 670rpx;
	height: 120rpx;
	background: rgba(255, 255, 255, 1);
	border-radius: 20rpx;
	border: 2px solid rgba(185, 197, 223, 1);
	padding: 0 30rpx;
	margin-bottom: 20rpx;
	font-size: 32rpx;
	font-weight: 400;
	color: rgba(131, 147, 181, 1);
}

.form-phone .get-btn {
	border: none;
	width: 670rpx;
	height: 120rpx;
	font-size: 48rpx;
	font-weight: 600;
	color: #ffffff;
	background: linear-gradient(90deg, rgba(255, 111, 51, 1) 0%, rgba(255, 75, 0, 1) 100%);
	border-radius: 20rpx;
	margin: 0 auto 20rpx;
}

.form-phone .text {
	font-size: 30rpx;
	font-family: SourceHanSansCN-Normal;
	font-weight: 400;
	color: rgba(131, 147, 181, 1);
}
/* 滚动 */
.swiper {
	width: 750rpx;
	height: 100rpx;
	margin: 40rpx auto;
	background: linear-gradient(180deg, rgba(254, 245, 204, 1) 0%, rgba(254, 245, 204, 1) 100%);
}
.swiper-item {
	width: 750rpx;
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.swiper-item .img {
	width: 38rpx;
	height: 46rpx;
}

.swiper-item .text {
	display: block;
	line-height: 100rpx;
	font-size: 32rpx;
	font-weight: 400;
	color: rgba(48, 48, 48, 1);
	margin-left: 40rpx;
}
.get-btn02 {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 750rpx;
	height: 120rpx;
	line-height: 120rpx;
	color: #fff;
	text-align: center;
	font-weight: 600;
	font-size: 48rpx;
	background-color: #ff5108;
	z-index: 9;
	border-radius: 0;
}

.pop-box {
	position: fixed;
	width: 750rpx;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.7);
}
.pop-img {
	width: 670rpx;
	height: 780rpx;
	margin: 180rpx auto 0;
}
</style>
