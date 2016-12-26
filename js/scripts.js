window.onload = function() {

	waterfall('main', 'box');

	var dataInt = {
		'data': [{
			'src': '111.jpg'
		}, {
			'src': '222.jpg'
		}, {
			'src': '333.jpg'
		}, {
			'src': '37.jpg'
		}, {
			'src': '38.jpg'
		}, {
			'src': '39.jpg'
		}, {
			'src': '40.jpg'
		}, {
			'src': '41.jpg'
		}, {
			'src': '42.jpg'
		}, {
			'src': '43.jpg'
		}, {
			'src': '44.jpg'
		}]
	};

	window.onscroll = function() {
		if(checkscrollside()) {
			var oParent = document.getElementById('main'); // 父级对象
			for(var i = 0; i < dataInt.data.length; i++) {
				var oBox = document.createElement('div'); //添加 元素节点
				oBox.className = 'box'; //添加 类名 name属性
				oParent.appendChild(oBox); //添加 子节点
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = './images/' + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main', 'box');
		};
	}
}

/*
    parend 父级id
    box 元素类
*/
function waterfall(parent, box) {
	var oParent = document.getElementById(parent); // 父级对象
	var aBox = getClassObj(oParent, box); // 获取存储块框box的数组aBox
	var iBoxW = aBox[0].offsetWidth; // 一个块框Box的宽
	var num = Math.floor(document.documentElement.clientWidth / iBoxW); //每行中能容纳的box个数【窗口宽度除以一个块框宽度】
	oParent.style.cssText = 'width:' + iBoxW * num + 'px;margin:0 auto;'; //设置父级居中样式：定宽+自动水平外边距

	var boxHArr = []; //用于存储 每列中的所有块框相加的高度。
	for(var i = 0; i < aBox.length; i++) { //遍历数组aBox的每个块框元素
		var BoxH = aBox[i].offsetHeight;
		if(i < num) {
			boxHArr[i] = BoxH; //第一行中的num个块框box 先添加进数组boxHArr
		} else {
			var minH = Math.min.apply(null, boxHArr); //数组BoxHArr中的最小值minH
			var minHIndex = getminHIndex(boxHArr, minH);
			aBox[i].style.position = 'absolute'; //设置绝对位移
			aBox[i].style.top = minH + 'px';
			aBox[i].style.left = aBox[minHIndex].offsetLeft + 'px';
			//数组 最小高元素的高 + 添加上的aBox[i]块框高
			boxHArr[minHIndex] += aBox[i].offsetHeight; //更新添加了块框后的列高
		}
	}
}

/****
 *通过父级和子元素的class类 获取该同类子元素的数组
 */
function getClassObj(parent, className) {
	var obj = parent.getElementsByTagName('*'); //获取 父级的所有子集
	var BoxS = []; //创建一个数组 用于收集子元素
	for(var i = 0; i < obj.length; i++) { //遍历子元素、判断类别、压入数组
		if(obj[i].className == className) {
			BoxS.push(obj[i]);
		}
	};
	return BoxS;
}
/****
 *获取 Box高度 最小值的索引index
 */
function getminHIndex(arr, minH) {
	for(var i in arr) {
		if(arr[i] == minH) {
			return i;
		}
	}
}

function checkscrollside() {
	var oParent = document.getElementById('main');
	var aBox = getClassObj(oParent, 'box');
	var lastBoxH = aBox[aBox.length - 1].offsetTop + Math.floor(aBox[aBox.length - 1].offsetHeight / 2); //创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //注意解决兼容性
	var documentH = document.documentElement.clientHeight; //页面高度
	return(lastBoxH < scrollTop + documentH) ? true : false; //到达指定高度后 返回true，触发waterfall()函数
}