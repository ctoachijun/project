<?
define('_GNUBOARD_', true);
define('_INDEX_', true);

include_once('../../../../common.php');
  switch ($work_mode) {
    case 'wa_add':
      $wa_con = "000";
      $wa_inout = "inout";
      $wa_option = implode("|",$wa_option);
      $wa_in_option = implode("|",$wa_in_option);
      $wa_start = "{$wa_start[0]} {$wa_start[1]}:00:00";
      $wa_memo = "{$wa_memo1} </br> {$wa_memo2}";
      $in_arr = ['mb_id','wa_price','add_id','mc_idx','wa_con','wa_inout','wa_pkg','wa_option','wa_start','wa_memo','wa_in_option','wa_card'];
      $sql_m ="INSERT INTO car_wash SET ";

      for ($i=0; $i <count($in_arr); $i++) {
      	$sql_m .="{$in_arr[$i]} = '{$$in_arr[$i]}',";
      }

      $date = date("Ymdhms");
      $uploaddir = '../../../../data/img_com/';
      $a_count = count($_FILES['wa_img']['name']);
      for ($i=0; $i < $a_count; $i++){
        $type =substr($_FILES['wa_img']['name'][$i],-4);
        $_FILES['wa_img']['name'][$i]	= $mb_id.$mc_idx.$date.$i.$type;
        $uploadfile = $uploaddir.basename($_FILES['wa_img']['name'][$i]);
        if (move_uploaded_file($_FILES['wa_img']['tmp_name'][$i], $uploadfile)){
          $wa_img .= $_FILES['wa_img']['name'][$i].',';
        } else {

        }
      }
      $wa_date = date("Y-m-d H:i:s");
      $sql_m .="wa_date = '{$wa_date}',";
      $sql_m .="wa_img = '{$wa_img}'";
      sql_query($sql_m);
      $wa_idx = sql_insert_id();
      // 무통장일때 바로
      if($wa_card == "mu"){
          alert("세차신청이 완료되었습니다","/");
      }

    	$sql_a = "SELECT * FROM address WHERE add_id='{$add_id}' ";
    	$as = sql_fetch($sql_a);
    	$x = $as['add_lng'];
    	$y = $as['add_lat'];

    	$res = kakao_location_sido($x,$y);
    	$sido = $res['documents'][0]['region_1depth_name'];
    	$sql_pu = "SELECT mb_token FROM g5_member WHERE mb_10 LIKE '%{$sido}%'";

    	$prs = sql_query($sql_pu);
    	while ($rows = sql_fetch_array($prs)){
    		$keys[] = $rows['mb_token'];
    	}
    	send_push($keys,"새로운 세차요청이 있습니다","{$sido}에 세차요청이 있습니다 확인해주세요",2);

    break;
    case 'wc_update':
      // var_dump($mb_id_man);
      $sqlm = "SELECT mb_token FROM g5_member WHERE mb_id = '{$mb_id_man}'";
      $rsm = sql_fetch($sqlm);
      $keys[] = $rsm['mb_token'];
      $rs = send_push($keys,"별점 {$mb_star}점 후기입니다!",$wc_memo,2);

      $sql = "UPDATE car_wash_com SET
              mb_star = '{$mb_star}',
              wc_memo = '{$wc_memo}'
              WHERE wc_idx = '{$wc_idx}'";
      sql_query($sql);

      alert("후기를 작성하셨습니다.","/");
    break;
    case 'car_cancels':
    $sql = "UPDATE car_wash SET
            wa_con = '006'
            WHERE (wa_idx = '{$wa_idx}') AND (mb_id = '{$mb_id}') ";
    sql_query($sql);
    break;
    case 'update_pre':
      $pre['mem_car'] = "mc_pre";
      $pre['address'] = "add_pre";
      $idxs['mem_car'] = "mc_idx";
      $idxs['address'] = "add_id";

      $sql = "UPDATE {$table} SET
              {$pre[$table]} = 0
              WHERE mb_id = '{$mb_id}' ";
      sql_query($sql);

      $sql = "UPDATE $table SET
              {$pre[$table]} = 1
              WHERE {$idxs[$table]} = '{$idx}' ";
      sql_query($sql);

    break;

    case 'remove_address':
      if($add_id != ""){
        $sql = "UPDATE address SET add_con = 'none' WHERE add_id = '{$add_id}'";
        sql_query($sql);
      }
    break;
    case 'remove_car':
      if($mc_idx != ""){
        $sql = "UPDATE mem_car SET mc_con = 'none' WHERE mc_idx = '{$mc_idx}'";
        sql_query($sql);
      }
    break;

    case 'update_add':
      for ($i=0; $i <count($add_addr1) ; $i++) {
        $add_pre = 0;
        $sql_a = "insert into address set ";
        $sql_a .= "add_addr1 = '{$add_addr1[$i]}',";
        $sql_a .= "add_addr2 = '{$add_addr2[$i]}',";
        $sql_a .= "add_zip = '{$add_zip[$i]}',";
        $sql_a .= "add_lat = '{$add_lat[$i]}',";
        $sql_a .= "add_lng = '{$add_lng[$i]}',";
        $sql_a .= "add_con = 'view',";
        $sql_a .= "add_pre = '{$add_pre}',";
        $sql_a .= "mb_id = '{$member['mb_id']}'";
        sql_query($sql_a);
      }
      alert("수정되었습니다","/");
    break;

    case 'update_car':
      for ($i=0; $i <count($mc_area) ; $i++) {
        $mc_pre = 0;
        $sql_c = "insert into mem_car set ";
        $sql_c .= "mc_area = '{$mc_area[$i]}',";
        $sql_c .= "mc_make = '{$mc_make[$i]}',";
        $sql_c .= "mc_model = '{$mc_model[$i]}',";
        $sql_c .= "mo_idx = '{$mo_idx[$i]}',";
        $sql_c .= "mc_no = '{$mc_no[$i]}',";
        $sql_c .= "mc_color = '{$mc_color[$i]}',";
        $sql_c .= "mc_price = '{$mc_price[$i]}',";
        $sql_c .= "mc_pre = '{$mc_pre}',";
        $sql_c .= "mc_con = 'view',";
        $sql_c .= "mb_id = '{$member['mb_id']}'";
        sql_query($sql_c);
      }
        alert("수정되었습니다","/");
    break;
    case 'update_token':
        if($mb_id){
            $sql = "UPDATE g5_member SET
                    mb_token = '{$mb_token}'
                    WHERE mb_id = '{$mb_id}'";
            sql_query($sql);
        }
    break;
    case 'change_rc_start':
        if($rc_idx){
            $sql = "UPDATE routine_content SET
                    rc_start = '{$rc_start}'
                    WHERE rc_idx = '{$rc_idx}'";
            sql_query($sql);
        }
    break;
    case 'add_routine':
      $days = date("d");
      $ro_option = implode("|",$wa_option);
      $ro_in_option = implode("|",$wa_in_option);
      $ro_day = implode("|",$ro_day);
      $ro_day_count = count($_POST['ro_day']);
      $ro_price_new = $ro_price;
      $in_arr = ['mb_id','ro_price','add_id','mc_idx','ro_option','ro_start','ro_in_option','ro_day_count','ro_price_new'];
      $sql ="INSERT INTO routine SET ";
      for ($i=0; $i <count($in_arr); $i++) {
        $sql .="{$in_arr[$i]} = '{$$in_arr[$i]}',";
      }
      $sql .="ro_days = '{$days}',";
      $sql .="ro_day = '{$ro_day}'";
      sql_query($sql);
      $ro_idx = sql_insert_id();

      $ro_num = $ro_idx."_".mt_rand(1000,9999);
      $sql_u = "UPDATE routine
                SET ro_num = '{$ro_num}'
                WHERE ro_idx = '{$ro_idx}'";
      sql_query($sql_u);

    break;
    case 'update_routine_option':
      $rc_option = implode("|",$opt_id);

      // 기존의 업데이트 쿼리문이 삭제되고 다른걸로 바뀌어있음.
      // 선택한 옵션 안보이도록 처리
      // 결제가 성공하면 업데이트 하는걸로..
      // $sql = "UPDATE routine_content
      //         SET rc_option = '{$rc_option}'
      //         WHERE rc_idx = '{$rc_idx}'";
      // sql_query($sql);


      // 이미 선택되어 화면에 표시되지 않은 옵션이 인식되지않도록 처리.
      for ($i=0; $i <count($opt_id); $i++){
        $opt_id_text[] = "(opt_id = '{$opt_id[$i]}')";
      }
      $where = implode("OR ",$opt_id_text);
      $sqls = "SELECT SUM(opt_price_2) AS sums FROM cc_option
               WHERE {$where}";
      $sums = sql_fetch($sqls);
      $rc_price = $sums['sums'];
      $sql = "INSERT INTO option_temp SET
              rc_option = '{$rc_option}',
              rc_idx = '{$rc_idx}',
              rc_price = '{$rc_price}'";
      sql_query($sql);
      $op_idx = sql_insert_id();

      // echo $sqls;
      //alert("완료 후 화면으로 넘어갑니다.","https://dmonster926.cafe24.com/theme/cookie/mobile/app/routine_detail.php?ro_idx={$ro_idx}");


    break;
    case 'update_rc_memo':

      $sql = "UPDATE routine_content
              SET rc_memo = '{$rc_memo}'
              WHERE rc_idx = '{$rc_idx}'";
       // echo "sql : ".$sql;
      // echo "<br>";
      sql_query($sql);
      alert("등록되었습니다.","https://dmonster926.cafe24.com/theme/cookie/mobile/app/routine_detail.php?ro_idx={$ro_idx}");


    break;

  }
?>

<?if($work_mode == "update_routine_option"){?>
  <?$dates = date("YmdHis");?>
  <form name="wa_form" action="https://webapi.jadong2che.com/v1/nif/payment/ksnet/gate" method="post">
    <input type="hidden" name="companyCode" value="C2020060900031"/>
    <input type="hidden" name="returnUrl" value="https://dmonster926.cafe24.com/theme/cookie/mobile/app/add_routine_option.php?&op_idx=<?=$op_idx?>"/>
    <input type="hidden" name="userName" value="<?=$member['mb_id']?>"/>
    <input type="hidden" name="registNumber" value="<?=$op_idx?>"/>
    <input type="hidden" name="goodsName" value="<?=$rc_idx?>_옵션추가_<?=$dates?>"/>
    <input type="hidden" name="cost" value="<?=$rc_price?>"/>
  </form>
  <script>
    wa_form.submit();
  </script>
<?}?>


<?if($wa_card == "card" && $work_mode == "wa_add"){?>
  <form name="wa_form" action="/mobile/shop/kcp/order_car.php" method="post">
    <input type="hidden" name="good_mny" value="<?=$wa_price?>"/>
    <input type="hidden" name="good_name" value="세차주문_<?=$wa_idx?>"/>
    <input type="hidden" name="buyr_name" value="<?=$wa_idx?>"/>
  </form>
  <script>
    wa_form.submit();
  </script>
<?}?>


<?if($work_mode == "add_routine"){?>

  <form name="wa_form" action="https://webapi.jadong2che.com/v1/nif/request/gate" method="post">
    <input type="hidden" name="companyCode" value="C2020060900031"/>
    <input type="hidden" name="returnUrl" value="https://dmonster926.cafe24.com/theme/cookie/mobile/app/routine_com.php?ro_num=<?=$ro_num?>"/>
    <input type="hidden" name="userNumber" value="<?=$member['mb_id']?>"/>
    <input type="hidden" name="registNumber" value="<?=$ro_num?>"/>
    <input type="hidden" name="goodsName" value="<?=$ro_idx?>_세차인월세차"/>
    <input type="hidden" name="cost" value="<?=$ro_price_new?>"/>
    <input type="hidden" name="issueDate" value="<?=$days?>"/>
    <input type="hidden" name="paymentDatetime" value="<?=$days?>"/>
    <input type="hidden" name="deliveryDatetime" value="<?=$days?>"/>
  </form>
  <script>
    wa_form.submit();
  </script>
<?}?>
