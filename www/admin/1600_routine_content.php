<?php
$sub_menu = "001600";
include_once('./_common.php');
$g5['title'] = '월세차 개별수정';
include_once('./admin.head.php');

$sub_name = "(SELECT mb_name FROM g5_member AS mm WHERE mm.mb_id = r.mb_id ) AS mb_name";
$sql = "  SELECT *,{$sub_name} FROM routine AS r
					LEFT JOIN mem_car AS m
					ON r.mc_idx = m.mc_idx
          LEFT JOIN address AS a
					ON r.add_id = a.add_id
          LEFT JOIN routine_content AS c
					ON r.ro_idx = c.ro_idx
					WHERE c.rc_idx = '{$rc_idx}' ";

$rs = sql_fetch($sql);
$mb_id = $rs['mb_id'];

// 회원정보
$sql_mem = "SELECT * FROM g5_member WHERE mb_id = '{$mb_id}'";
$rs_mem = sql_fetch($sql_mem);
//차량정보
$sql_car = "SELECT * FROM mem_car WHERE mc_idx = '{$rs['mc_idx']}'";
$rs_car = sql_fetch($sql_car);
//주소정보
$sql_a = "SELECT * FROM address WHERE mb_id = '{$mb_id}'";
$rs_a = sql_query($sql_a);
//옵션정보
$sql_o = "SELECT * FROM cc_option WHERE (1)";
$rs_o = sql_query($sql_o);
//내부옵션정보
$sql_in = "SELECT * FROM cate_model_option WHERE mo_idx = '{$rs_car['mo_idx']}'";
$rs_in = sql_query($sql_in);
$rc_start = explode(" ",$rs['rc_start']);

$rc_start[1] = (int) substr($rc_start[1],0,2);
?>

<div class="tbl_frm01 tbl_wrap">
  <form action="./proc.php" method="post" accept-charset="utf-8" enctype="multipart/form-data">
    <input type="hidden" name="work_mode" value="update_routine_content">
		<input type="hidden" name="rc_idx" value="<?=$rc_idx?>">
		<input type="hidden" name="ro_idx" value="<?=$rs['ro_idx']?>">
		<table id="user_table">
			<tr>
				<th scope="row">회원아이디</th>
				<td colspan=1 class="td_id">
				   <?=$rs['mb_id']?>
				</td>
        <th scope="row">출차시간</th>
				<td colspan=5 class="wa_start">
          날짜
					<input type="text" name="rc_start[0]"  value="<?=$rc_start[0]?>" class=" frm_input" id="datepicker">
          시간
          <input type="number" name="rc_start[1]" max="24" min="0" value="<?=$rc_start[1]?>"  class=" frm_input" placeholder="출차시간" required>
          시
				</td>
			</tr>
      <tr>
        <th scope="row">차량</th>
        <td colspan=1 class="td_id">
          <?=$rs_car['mc_model']?>
        </td>
        <th scope="row">주소</th>
        <td colspan=5 class="wa_start">
          <select name="add_id">
            <?while ($row = sql_fetch_array($rs_a)){?>
              <option value="<?=$row['add_id']?>" <?if($row['add_id'] == $rs['add_id'])echo "selected";?>>
								<?=$row['add_addr1']?>
							</option>
            <?}?>
          </select>
        </td>
      </tr>
      <tr>
        <th scope="row">옵션</th>
        <td colspan=1 class="td_id">
        <?
					while ($row = sql_fetch_array($rs_o)){
						if($row['opt_id']==89 || $row['opt_id']==90 || $row['opt_id']==91){

						}else{
				?>
            <label>
              <input type="checkbox" class="" value="<?=$row['opt_id']?>" name="rc_option[]" class="frm_input" <?if(strpos($rs['rc_option'],$row['opt_id']) !== false){echo "checked";}?>>
              <?=$row['opt_name']?> 국:<?=$row['opt_price_1']?> 외:<?=$row['opt_price_2']?>원
            </label>
            <br>
        <?
						}
					}
				?>

        </td>
        <th scope="row">내부옵션</th>
        <td colspan=1 class="td_id">
          <?while ($row = sql_fetch_array($rs_in)){?>
            <label>
              <input type="checkbox" value="<?=$row['mp_idx']?>" name="rc_option_in[]" class="frm_input" <?if(strpos($rs['rc_option_in'],$row['mp_idx']) !== false){echo "checked";}?>>
              <?=$row['mp_name']?> <?=$row['mp_price']?> <?=$row['pkg_price_2']?>원
            </label>
            <br>
          <?}?>
        </td>
      <tr>
			<tr>
				<th scope="row">기타메모</th>
				<td colspan=3 class="td_id">
					<textarea name="rc_memo"><?=$rs['rc_memo']?></textarea>
				</td>
			</tr>
      <tr>
				<th scope="row">수정</th>
        <td class="td_id">
					<select name="rc_con">
						<option value="001" <?if($rs['rc_con'] == "001")echo "selected";?>>대기</option>
						<option value="002" <?if($rs['rc_con'] == "002")echo "selected";?>>완료</option>
						<option value="003" <?if($rs['rc_con'] == "003")echo "selected";?>>취소</option>
					</select>
				</td>
        <th scope="row">매니저아이디</th>
        <td class="td_id">
          <input type="text" name="mb_id_man" placeholder="회원아이디" class="frm_input" value="<?=$rs['mb_id_man']?>">
					<input type="submit" class="btn_submit" value="수정완료">
				</td>
      </tr>
    </form>
	</table>
</div>
