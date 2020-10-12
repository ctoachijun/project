<?php
  define('_GNUBOARD_', true);
  define('_INDEX_', true);

  include_once('../../../../common.php');
  $title = "월세차옵션추가";
  include_once('../head.php');

  if($member['mb_id'] == ""){
    alert("로그인을 해주세요","/bbs/login.php");
  }
  // 옵션가격 외제차 수입차 다르게
  $sql_o = "SELECT * FROM cc_option WHERE (1)";
  $rso = sql_query($sql_o);
  $sql = "SELECT * FROM routine_content WHERE rc_idx = '{$rc_idx}'";
  $rs = sql_fetch($sql);
  $chk_count = 0;

  // 결제 후 값을받아서 정상적인 가격에 결제가 되었는지 체크
  //echo "op_idx : ".$op_idx."<br>";
  if($op_idx){
    $sql_oc = "SELECT * FROM option_temp WHERE op_idx = {$op_idx}";
    $rs_oc = sql_fetch($sql_oc);
    $c_price = $rs_oc['rc_price'];
    $opt_val = $rs_oc['rc_option'];
    // echo "결제 된 옵션은 : ".$opt_val."<br>";
    // echo "결제할 가격은 : ".$c_price."<br>";

    if($c_price == 5500){
      // 결제성공
      $sql = "UPDATE routine_content
              SET rc_option = '{$opt_val}'
              WHERE rc_idx = '{$rc_idx}'";
      // sql_query($sql);
      // echo $sql;
      //alert("결제에 성공했습니다.");

    }else{
      // 결제실패
      //alert("결제에 실패했습니다.");
    }

    // echo "<br>";
    // var_dump($_POST);
  }
  ?>

<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
<script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<!-- <script type="text/javascript" src="https://dmonster926.cafe24.com/js/common.js"></script> -->
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<!-- <link rel="stylesheet" href="//resources/demos/style.css"> -->
<link rel="stylesheet" href="./style.css">
<div class="rc_option_box">
  <form action="./proc.php" method="post" id="opt_form" accept-charset="utf-8" enctype="multipart/form-data">
  <!-- <form action="./add_routine_option.php" method="post" accept-charset="utf-8" enctype="multipart/form-data"> -->
    <input type="hidden" name="work_mode" value="update_routine_option">
    <input type="hidden" name="rc_idx" value="<?=$rc_idx?>">
    <input type="hidden" name="ro_idx" value="<?=$ro_idx?>">
    <?while($row =sql_fetch_array($rso)){

        //  if(!strpos($rs['rc_option'],$row['opt_id'])){
        //  strpos값이 0일때 1로 바꿈
        // 월세차에 포함되어있는 옵션 표시안함
        $jud = strpos($rs['rc_option'],$row['opt_id']);
        if($row['opt_id']==89 || $row['opt_id']==90 || $row['opt_id']==91){
          $jud=0;
        }
        if($jud==0){
          $jud++;
        }
        if(!$jud){
          $chk_count++;
        ?>
          <p class="options">
            <label>
              <input type="checkbox" value="<?=$row['opt_id']?>" name="opt_id[]">
              <?=$row['opt_name']?>
              <?=number_format($row['opt_price_1'])?>원
            </label>
          </p>

          <!-- 월세차에 포함된 옵션 미표시 -->
      <?}else if($row['opt_id']!=89 && $row['opt_id']!=90 && $row['opt_id']!=91){?>
          <input type="hidden" name="opt_id[]" value="<?=$row['opt_id']?>">
      <?}?>
    <?}?>
    <!-- <button type="submit" onclick="okimp()" class="wa_bnt">추가옵션결제</button> -->
    <button type="button" onclick="okimp(<?=$chk_count?>)" class="wa_bnt">추가옵션결제</button>
</div>
<script>

</script>
