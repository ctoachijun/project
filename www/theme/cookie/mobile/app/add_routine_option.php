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
    <input type="hidden" name="chk_value[]">
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
