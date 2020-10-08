<?
include_once('./_common.php');

switch ($work_mode) {
  case 'search_member':
    $c_price = "(select mo_price from cate_model as cm where cm.mo_idx = m.mo_idx) as mo_price";

    $sql_c = "SELECT *,{$c_price} FROM mem_car as m WHERE mb_id ='{$mb_id}' AND mc_con = 'view'";
    $rs_c = sql_query($sql_c);
    $sql_a = "SELECT * FROM address WHERE mb_id ='{$mb_id}' AND add_con = 'view'";
    $rs_a = sql_query($sql_a);

    while ($row = sql_fetch_array($rs_c)) {
      $j_car[] = $row;
    }
    while ($row = sql_fetch_array($rs_a)) {
      $j_add[] = $row;
    }
    //추가
    $sql_in = "SELECT * FROM cate_model_option WHERE mo_idx = ".$j_car[0]['mo_idx'];
    $rs_in = sql_query($sql_in);
    while ($row = sql_fetch_array($rs_in)) {
      $j_in[] = $row;
    }

    if(count($j_add) > 0 && count($j_car) > 0){
      $output['state'] = "Y";
      $output['j_add'] = $j_add;
      $output['j_car'] = $j_car;
      $output['j_in'] = $j_in;
      // $output['j_in'] = $j_in;
    }else {
      $output['state'] = "N";
    }
    echo json_encode($output,JSON_UNESCAPED_UNICODE);
    // echo json_encode("abc",JSON_UNESCAPED_UNICODE);

  break;
  case 'remove_make':
    $sql = "DELETE FROM cate_make WHERE  ma_idx = '{$ma_idx}'";
    sql_query($sql);
  break;

  case 'remove_model':
    $sql = "DELETE FROM cate_model WHERE  mo_idx = '{$mo_idx}'";
    sql_query($sql);
  break;

  case 'load_make':
    $sql = "SELECT ma_idx,ma_name FROM cate_make WHERE  ar_idx = '{$ar_idx}'";
    $rs = sql_query($sql);
    $i = 0;
    while ($row = sql_fetch_array($rs)) {
      $j_out[$i] = $row;
      $i++;
    }
    echo json_encode($j_out,JSON_UNESCAPED_UNICODE);
  break;

  case 'update_wa_con':
    for ($i=0; $i <count($wa_idx); $i++) {
      $sql = "UPDATE car_wash SET wa_con = '{$wa_con}' WHERE wa_idx = '{$wa_idx[$i]}'";
      sql_query($sql);
    }
    echo count($wa_idx)."건이 업데이트 되었습니다";
  break;
  //-----------------무통장 결제에 페이지를 갱신 -------------////////

  case 'car_wash_update_system':

    $sub_name = "(SELECT mb_name FROM g5_member AS mm WHERE mm.mb_id = w.mb_id ) AS mb_name";
    $sql = "  SELECT *,{$sub_name} FROM car_wash AS w
    					LEFT JOIN mem_car AS m
    					ON w.mc_idx = m.mc_idx
              LEFT JOIN address AS a
    					ON a.add_id = w.add_id
    					WHERE wa_con = '{$wa_con}'
    					ORDER BY wa_idx DESC LIMIT 1";
    $row = sql_fetch($sql);

    if($row['wa_idx'] != $max_idx){

      $rs['wa_info'] = $row;
      $rs['rst'] = "OK";
      echo json_encode($rs);

    }else {

      $rs['rst'] = "NO";
      echo json_encode($rs);
    }
  break;

  case 'update_cate_model_option':
    $sql ="UPDATE cate_model_option SET ";
    $sql .="mp_price = '{$mp_price}',";
    $sql .="mp_name = '{$mp_name}',";
    $sql .="mp_content = '{$mp_content}' ";
    $sql .="WHERE mp_idx = '{$mp_idx}'";
    sql_query($sql);
  break;

  case 'update_rp_idx':
    $sql ="UPDATE cate_model SET ";
    $sql .="rp_idx = '{$rp_idx}'";
    $sql .="WHERE mo_idx = '{$mo_idx}'";
    sql_query($sql);
  break;

  case 'update_routine_patch':
    if($ro_idx != ""){
      $sql ="UPDATE routine SET ";
      $sql .="{$colum} = '{$content}'";
      $sql .="WHERE ro_idx = '{$ro_idx}'";
      sql_query($sql);
    }
  break;
  // 매니저를 채크합니다
  case 'man_ck':
    $sql = "SELECT COUNT(*) AS cou
            FROM g5_member
            WHERE mb_id = '{$mb_id}'
            AND mb_level > 3 ";
    $rs = sql_fetch($sql);
    if($rs['cou'] == 1){
      echo "ok";
    }else {
      echo "no";
    }
  break;
  // 비어있는 매니저 상태값을 업데이트 합니다
  case 'update_routine_content_man':
    if($ro_idx != ""){
      // 매니저 컨텐츠 상태 업데이트
      $sql ="UPDATE routine_content SET
               mb_id_man = '{$mb_id_man}'
               WHERE ro_idx = '{$ro_idx}'
               AND  mb_id_man = '' ";
      sql_query($sql);
      // 매니저 업데이트
      $sql ="UPDATE routine SET
               mb_id_man = '{$mb_id_man}'
               WHERE ro_idx = '{$ro_idx}'";
      sql_query($sql);
    }
  break;

  case 'chk_in':
    $sql_in = "SELECT * FROM cate_model_option WHERE mo_idx = {$mo_idx}";
    $rs_in = sql_query($sql_in);
    while ($row = sql_fetch_array($rs_in)) {
      $chk_in[] = $row;
    }

    if(count($chk_in) > 0){
      $output['state'] = "Y";
      $output['chk_in'] = $chk_in;
    }else {
      $output['state'] = "N";
    }
    echo json_encode($output,JSON_UNESCAPED_UNICODE);

  break;
}

?>
