<?php
  define('_GNUBOARD_', true);
  define('_INDEX_', true);

  include_once('../../../../common.php');
  $title = "월세차옵션추가";
  if($op_idx){
    $sql_oc = "SELECT * FROM option_temp WHERE op_idx = {$op_idx}";
    $rs_oc = sql_fetch($sql_oc);
    $c_price = $rs_oc['rc_price'];
    $opt_val = $rs_oc['rc_option'];
    $rc_idx = $rs_oc['rc_idx'];
    $sql_rc = "SELECT * FROM routine_content WHERE rc_idx = {$rc_idx}";
    $rs_rc = sql_fetch($sql_rc);
    $ro_idx = $rs_rc['ro_idx'];


    $opt_box = explode("|",$rs_oc['rc_option']);
    for($i = 0; $i < count($opt_box); $i++){
      $o_sql = "SELECT opt_name FROM cc_option WHERE opt_id = ".$opt_box[$i];
      $o_box[$i] = sql_fetch($o_sql);
    }

    // echo "결제 된 옵션은 : ".$opt_val."<br>";
    // echo "결제할 가격은 : ".$c_price."<br>";

    if($_POST['status'] == "O"){
      // 결제성공
      $sql = "UPDATE routine_content
              SET rc_option = '{$opt_val}'
              WHERE rc_idx = '{$rc_idx}'";
      // sql_query($sql);
      $mb = get_member($rs_rc['mb_id']);
      set_session('ss_mb_id', $mb['mb_id']);
      set_session('ss_mb_key', md5($mb['mb_datetime'] . get_real_client_ip() . $_SERVER['HTTP_USER_AGENT']));
      set_cookie('ck_mb_id', $mb['mb_id'], 86400 * 31);
      set_cookie('ck_auto', $key, 86400 * 31);
      // var_dump($mb);
      // echo $sql;

      $p_success = "성공";
      // alert("결제에 성공했습니다.","https://dmonster926.cafe24.com/theme/cookie/mobile/app/routine_detail.php?ro_idx=".$rs_rc['ro_idx']);

    }else{
      // 결제실패
      $p_success = "실패";
      // alert("결제에 실패했습니다.","https://dmonster926.cafe24.com/theme/cookie/mobile/app/routine_detail.php?ro_idx=".$rs_rc['ro_idx']);
    }
  }

  ?>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="./style.css">
<!-- <h2>결제완료</h2> -->
<div id="p_box">
<h1 class="p_title">결제<font color="red"><?=$p_success?></font></h1>
<table id="p_result">
  <tr>
    <th>주문번호</th>
    <td><?=$_POST["registNumber"]?></td>
  </tr>
  <tr>
    <th>선택옵션</th>
    <td>
    <?for($i = 0; $i < count($o_box); $i++){
        if($i==count($o_box)-1){
          echo $o_box[$i]["opt_name"];
        }else{
          echo $o_box[$i]["opt_name"]." / ";
        }
    }?>
    </td>
  </tr>
  <tr>
    <th>결제가격</th>
    <td><?=$c_price?> 원</td>
  </tr>
  <tr>
    <th>거래일자</th>
    <td><?=$_POST["tradeDate"]?> <?=$_POST["tradeTime"]?></td>
  </tr>
</table>
<a id="p_urls" href="https://dmonster926.cafe24.com/theme/cookie/mobile/app/routine_detail.php?ro_idx=<?=$ro_idx?>">
  <input type="button" value="확인" class="wa_bnt"/>
</a>
</div>
