const transfromNum = (value) => {
  value = "" + value; // 转换成字符串
  var int = value.slice(0, value.indexOf(".")); // 拿到整数
  var ext = value.slice(value.indexOf(".")); // 获取到小数
  //每个三位价格逗号
  int = int.split("").reverse().join(""); // 翻转整数
  var temp = ""; // 临时变量
  for (var i = 0; i < int.length; i++) {
    temp += int[i];
    if ((i + 1) % 3 == 0 && i != int.length - 1) {
      temp += ","; // 每隔三个数字拼接一个逗号
    }
  }
  temp = temp.split("").reverse().join(""); // 加完逗号之后翻转
  temp = temp + ext; // 整数小数拼接
  return temp; // 返回
};

const capAmountToString = (values) => {
  if (values === null || values === "") return "";
  values = values.toString();
  values = values.replace(/,/, "");
  // 不足两位小数补零
  let capArr = values.split(".");
  if (capArr.length < 2) {
    capArr[1] = "00";
  } else if (capArr[1].length == 1) {
    capArr[1] = capArr[1][0] + "0";
  }

  let len = capArr[0].length; //整数长度
  let len2 = capArr[1].length; //小数长度
  let arr = [],
    arr2 = [];
  let chin_list = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; //所有的数值对应的汉字
  let chin_lisp = ["仟","佰","拾","兆","仟","佰","拾","亿","仟","佰","拾","万","仟","佰","拾",]; //进制
  let chin_lisp2 = ["角", "分"]; //进制
  // 数字转大写，添加进制
  for (let i = 0; i < len; i++) {
    arr.push(parseInt(capArr[0][i])); //输入的数据按下标存进去 存进去的只是数字
    arr[i] = chin_list[arr[i]]; //是根据我们输入的输入的数字，对应着我们的chin_list这个数组
  }
  for (let i = len - 1, j = 1; i > 0; i--) {
    //i =2 1 //倒序 为了添加进制，方便我们去观看
    arr.splice(i, 0, chin_lisp[chin_lisp.length - j++]); //j=2
  }

  for (let n = 0; n < len2; n++) {
    arr2.push(parseInt(capArr[1][n])); //输入的数据按下标存进去 存进去的只是数字
    arr2[n] = chin_list[arr2[n]]; //是根据我们输入的输入的数字，对应着我们的chin_list这个数组
  }
  for (let i = len2, j = 1; i > 0; i--) {
    //i =2 1 //倒序 为了添加进制，方便我们去观看
    arr2.splice(i, 0, chin_lisp2[chin_lisp2.length - j++]); //j=2
  }
  arr = arr.join("");
  // 整数位处理
  if (len >= 1) {
    arr += "元";
  } //1234510001=>壹拾贰亿叁仟肆佰伍拾壹万零壹元
  arr = arr.replace(/零[仟佰拾]/g, "零"); //100051231 =>壹亿零零零伍万壹仟贰佰叁拾壹
  arr = arr.replace(/零{2,}/g, "零"); //壹亿零零零伍万壹仟贰佰叁拾壹 =>壹亿零伍万壹仟贰佰叁拾壹
  arr = arr.replace(/零([兆|亿|万|元])/g, "$1"); //12300000壹仟贰佰叁拾零万零元 =>壹仟贰佰叁拾万元
  arr = arr.replace(/亿零{0,3}万/, "亿"); //10000000123 =>壹佰亿万零壹佰贰拾叁元
  arr = arr.replace(/兆零{0,3}亿/, "兆"); //10000000000123 壹拾零兆亿零壹佰贰拾叁元 =>
  arr = arr.replace(/^元/, "零元"); //0 ->零元
  // 小数位处理
  arr2 = arr2.join("");
  arr = arr + arr2;
  arr = arr.replace(/零角/, "零"); //11.01 壹拾壹元零角壹分 =>壹拾壹元零壹分
  arr = arr.replace(/零{1,2}分/, "整"); //
  return arr;
};

export default {
  transfromNum,
  capAmountToString,
};
