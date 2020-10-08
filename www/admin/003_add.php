<?
$sub_menu = "000300";
include_once('./_common.php');

auth_check($auth[$sub_menu], 'r');

$g5['title'] = '매칭신청';
include_once('./admin.head.php');
$sql_o = " select * from cc_option where 1";
$sql_p = " select * from cc_package where 1";
$rs_o = sql_query($sql_o);
$rs_p = sql_query($sql_p);


?>
<p>* 반드시 입력전에 회원아이디를 검색하고 차량과 주소를 선택한 후 입력완료를 눌러주세요</p><br>
<div class="tbl_frm01 tbl_wrap">
  <form action="./proc.php" method="post" accept-charset="utf-8" enctype="multipart/form-data">
    <input type="hidden" name="work_mode" value="add_car_wash">
		<table id="user_table">
			<tr>
					<th scope="row">회원아이디</th>
					<td colspan=1 class="td_id">
						<input type="text" id="mb_id" name="mb_id" placeholder="아이디" class="required frm_input">
            <input type="button" onclick="search_member()" class="btn_submit" value="검색">
					</td>
          <th scope="row">출차시간</th>
					<td colspan=5 class="wa_start">
						<input type="text" name="wa_start" placeholder="ex)2019년10월30일 12시" class="required frm_input">
					</td>
			</tr>
      <tr>
					<th scope="row">남기실 말씀</th>
					<td colspan=1 class="td_id">
						<input type="text" name="wa_memo" placeholder="남기실 말씀" class="frm_input">
					</td>
          <th scope="row">차량 위치 지도</th>
					<td colspan=5 class="wa_start">
						<input type="file" name="wa_img[]" >
					</td>
			</tr>
      <tr>
        <th scope="row">차량</th>
        <td colspan=1 class="td_id">
          <div id="car_box">원하시는 차량목록이 없습니다.</div>
        </td>
        <th scope="row">주소</th>
        <td colspan=5 class="wa_start">
          <div id="add_box">원하시는 주소목록이 없습니다.</div>
        </td>
      </tr>
      <tr>
        <th scope="row">외부옵션</th>
        <td colspan=1 class="td_id">
          <?while ($row = sql_fetch_array($rs_o)){?>
            <label>
              <input type="checkbox" class="" value="<?=$row['opt_id']?>" name="wa_option[]" class="frm_input">
              <?=$row['opt_name']?> 국:<?=$row['opt_price_1']?> 외:<?=$row['opt_price_2']?>원
            </label>
            <br>
          <?}?>
        </td>
        <th scope="row">패키지</th>
        <td colspan=1 class="td_id">
          <?while ($row = sql_fetch_array($rs_p)){?>
            <label>
              <input type="checkbox" value="<?=$row['pkg_id']?>" name="	wa_pkg[]" class="frm_input">
              <?=$row['pkg_name']?> 국:<?=$row['pkg_price_1']?> 외:<?=$row['pkg_price_2']?>원
            </label>
            <br>
          <?}?>
        </td>
      <tr>
      <tr>
        <th scope="row">결제종류</th>
        <td colspan=1 class="td_id">
          <label>
            <input type="radio" value="card" name="wa_card" checked>카드
          </label>
          <label>
            <input type="radio" value="mu" name="wa_card" >무통장
          </label>
        </td>
        <th scope="row">실제결제가격</th>
        <td colspan=1 class="td_id">
          <input type="number" name="wa_price" placeholder="결제가격" class="frm_input">
          <input type="submit" class="btn_submit" value="매칭신청 입력완료">
        </td>

      </tr>
    </form>
	</table>
</div>
<p>* 관리자로 등록할경우 새차상태는 매니저배정중이 됩니다</p><br>
