// 自定义图标
import {createFromIconfontCN} from "@ant-design/icons-vue";

function icon() {
	const MyIcon = createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2656299_zhjpnl470cg.js', // 在 iconfont.cn 上生成
	});
	return {
		MyIcon
	}
}

export default icon
