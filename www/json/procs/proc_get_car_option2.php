<?php
include_once("./common.php");

if(!$is_parent){
	header('Content-type: text/html; charset=utf-8');
	echo "정상적인 접근이 아닙니다.";
	exit();
}
$sql_o = "SELECT de_out_otp,de_in_otp,de_app_con_msg,de_app_con FROM g5_shop_default WHERE(1)";
$rs_o = sql_fetch($sql_o);
//옵션 항목 존재여부
$lo = load_latlng($add_addr1);
$mb_si = $lo['documents'][0]['address']['region_1depth_name'];

$sql = "select * from cc_option
				where	(opt_si = 'admin' or opt_si ='{$mb_si}')
				and (opt_name not like '%휠&' and opt_name not like '%타이어%' and opt_name not like '%타르%' and opt_name not like '패키지')
				order by opt_id asc
				";

$result = sql_query($sql);
$rows_num = sql_num_rows($result);
if($rows_num == 0){
	$result_json[JSON_RESULT_NAME] = jsonResultError($method, "옵션 항목이 없습니다.");
	toJson($result_json);
	exit();
}
$sql_in = "select * from cate_model_option where mo_idx = '{$mo_idx}'";
$rs_in = sql_query($sql_in);

$sql_m = "select ar_idx from cate_model where mo_idx = '{$mo_idx}'";
$rs_m = sql_fetch($sql_m);

$op_list = array();
$in_list = array();

while($row = sql_fetch_array($result)){
	$op_list[] = $row;
}

while($row_in = sql_fetch_array($rs_in)){
	$in_list[] = $row_in;
}

$result_json['de_out_otp'] = $rs_o['de_out_otp'];
$result_json['de_in_otp'] = $de_in_otp;
$result_json['de_app_con_msg'] = $rs_o['de_app_con_msg'];
$result_json['de_app_con'] = $rs_o['de_app_con'];

$result_json['in_list'] = $in_list;
$result_json['op_list'] = $op_list;
$result_json[JSON_RESULT_NAME] = jsonResultSuccess($method, "옵션 항목을 가져왔습니다.");

toJson($result_json);
?>
