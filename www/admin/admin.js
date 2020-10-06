
//무통장 결제에 페이지를 갱신

//var con_count = $('.tr_box').length;

var max_idx = $('#max_wa_idx').val();
var ck_box_count = $('#ck_box_count').val();
function search_member(){
  var mb_id = $("#mb_id").val();
  var data_list = {"work_mode":"search_member","mb_id":mb_id};
  var add_box = "";
  var car_box = "";
  $.ajax({
          url: "proc_ajax.php",
          type: "post",
          async: false,
          data: data_list
  }).done(function(data){
    var json = JSON.parse(data);
    if(json.state == "Y"){
      console.log(json);
      for (var i = 0; i < json.j_add.length; i++) {
        add_box += '<label>';
        add_box += '<input type="radio" name="add_id" value="'+json.j_add[i].add_id+'">';
        add_box += json.j_add[i].add_addr1;
        add_box += '</label><br>';
      }
      for (var i = 0; i < json.j_car.length; i++) {
        car_box += '<label>';
        car_box += '<input type="radio" name="mc_idx" value="'+json.j_car[i].mc_idx+'">';
        car_box += json.j_car[i].mc_make+" ";
        car_box += json.j_car[i].mc_model+" ";
        car_box += json.j_car[i].mc_color+" ";
        car_box += json.j_car[i].mo_price+"원";
        car_box += '</label><br>';
      }
    }else {
      alert("입력하신 아이디에 정보를 찾을 수 없습니다");
      add_box = "원하시는 주소목록이 없습니다.";
      car_box = "원하시는 차량목록이 없습니다.";
    }
    $('#add_box').html(add_box);
    $("#car_box").html(car_box);
    //console.log(data);
    //con_count
  });

}
// 매니저를 채크합니다
function man_ck(){
   let mb_id = $("#mb_id_man").val();
   let data_list = {work_mode:"man_ck",mb_id:mb_id}
   $.ajax({
     url: "proc_ajax.php",
     type: "post",
     async: false,
     data: data_list
   }).done(function(data){
     console.log(data)
     if(data == "ok"){
       if(confirm("아직 배정되어있지 않은 일세차에 관해서도 매니저가 배정됩니다. 동의 하십니까?")){
         update_routine_content_man();

       }
     }else {
       alert("유효한 매니저 아이디를 입력하세요");
     }
   });
}
// 비어있는 매니저 상태값을 업데이트 하고 상세정보값을 업데이트 합니다
function update_routine_content_man(){
  let ro_idx = $("#ro_idx").val();
  let mb_id_man = $("#mb_id_man").val();
  let data_list = {work_mode:"update_routine_content_man",
                   ro_idx:ro_idx,
                   mb_id_man:mb_id_man}
  $.ajax({
    url: "proc_ajax.php",
    type: "post",
    async: false,
    data: data_list
  }).done(function(data){
    console.log(data);
    location.reload();
  });
}

function send_push(){
  var chk_count = 0;
  var chk_arr = new Array();
  for (var i = 0; i < 50; i++) {
      if($("#chk_"+i).is(":checked")){
        chk_arr[chk_count] = $("#chk_"+i).val();
        chk_count++;
      }
  }
  console.log(chk_arr);
  if(chk_count == 0){alert("체크박스를 체크해 주세요"); return false;}
}


function car_wash_update_system(wa_con){
  var html_data = "";
  var data_list = {"work_mode":"car_wash_update_system",
                   "wa_con":wa_con,
                   "max_idx":max_idx};

   $.ajax({
           url: "proc_ajax.php",
           type: "post",
           async: false,
           data: data_list
   }).done(function(data){

     var wa = JSON.parse(data);

     if(wa.rst == "OK"){

       max_idx = wa.wa_info.wa_idx;
       var wa_idx =  wa.wa_info.wa_idx;

       html_data += '<tr id="tr_'+wa_idx+'>" class="tr_box tr_box_laod">';
       html_data += '<td class="td_chk">';
       html_data += '<label>';
       html_data += '<input type="checkbox" id="chk_'+ck_box_count+'" value="'+wa_idx+'">';
       html_data +=  wa_idx;
       html_data += '</label>';
       html_data += '</td>';
       html_data += '<td>'+wa.wa_info.mb_id+'</td>';
       html_data += '<td>'+wa.wa_info.mb_id_man+'</td>';
       html_data += '<td>'+wa.wa_info.mb_name+'</td>';
       html_data += '<td>'+wa.wa_info.mc_model+'</td>';
       html_data += '<td>'+wa.wa_info.mc_no+'</td>';
       html_data += '<td>'+sw_wa_con(wa.wa_info.wa_con)+'</td>';
       html_data += '<td>'+number_format(wa.wa_info.wa_price)+'</td>';
       html_data += '<td>'+wa.wa_info.add_addr1+'</td>';
       html_data += '<td>'+wa.wa_info.wa_date+'</td>';
       html_data += '<td></td>';
       html_data += '<td></td>';
       html_data += '</tr>';

       $('#ck_box_count').val(ck_box_count+1);
       $("#tbody_data").prepend(html_data);
       	alertSound.play();
     }

     //console.log(data);
     //con_count
   });

}


// 3초마다 car_wash_update_system 를 반복시킴

function car_wash_update_start(wa_con){

  setInterval(function(){

    car_wash_update_system(wa_con)

  },3000);

}

/// 넘버 포맷 !!!

function number_format( number ){

  number=number.replace(/\,/g,"");

  nArr = String(number).split('').join(',').split('');

  for( var i=nArr.length-1, j=1; i>=0; i--, j++)  if( j%6 != 0 && j%2 == 0) nArr[i] = '';

  return nArr.join('');

 }


// 결제 상태 바꾸기!!
function sw_wa_con(wa_con){
  var rs ="";
  switch (wa_con) {
    case '000':
      rs = "결제대기";
    break;
    case '001':
      rs = "매니저배정중";
    break;
    case '002':
      rs = "배정완료";
    break;
    case '003':
      rs = "새차중";
    break;
    case '004':
      rs = "새차완료";
    break;
    case '005':
      rs = "취소대기";
    break;
    case '006':
      rs = "취소완료";
    break;
  }
  return rs;
}


//매칭 상태 바꾸기
function update_wa_con(wa_con){

  //체크박스 데이터 받는 부분
  var chk_arr = new Array();
  var chk_count = 0;

  var ck_box_count = $("#ck_box_count").val();
  if(ck_box_count == ""){
      ck_box_count = 15;
  }

  for (var i = 0; i < ck_box_count; i++) {
      if($("#chk_"+i).is(":checked")){
        chk_arr[chk_count] = $("#chk_"+i).val();
        chk_count++;
      }
  }
  if(chk_count == 0){alert("체크박스를 체크해 주세요"); return false;}
  var data_list = {"work_mode":"update_wa_con",
                   "wa_con":wa_con,
                   "wa_idx[]":chk_arr};


   $.ajax({
           url: "proc_ajax.php",
           type: "post",
           data: data_list
   }).done(function(data){
     alert(data);
     location.reload();
   });

}

function update_cate_model_option(mp_idx){

  var mp_name = $("#mp_name_"+mp_idx).val();
  var mp_price = $("#mp_price_"+mp_idx).val();
  var mp_content = $("#mp_content"+mp_idx).val();

  var data_list = {"work_mode":"update_cate_model_option",
                   "mp_price":mp_price,
                   "mp_name":mp_name,
                   "mp_content":mp_content,
                   "mp_idx":mp_idx};
  $.ajax({
          url: "proc_ajax.php",
          type: "post",
          data: data_list
  }).done(function(data){
    console.log(data);
    alert("수정되었습니다");
  });


}



function form_ck(sel_id1,sel_id2){
  var sel_id1 = $("#"+sel_id1).val();
  var sel_id2 = $("#"+sel_id2).val();
  console.log(sel_id2);
  if(sel_id2 == "" || sel_id1 == ""){
    alert("텍스트박스를 확인 해 주세요");
    return false;
  }
  //return false;
}

function load_make(){

  var ar_idx = $("#ar_idx").val();
	var data_list = {"ar_idx":ar_idx,"work_mode":"load_make"};
	var url = "/admin/proc_ajax.php";
  var h_data = "";

	$.ajax({
			url: url,
			type: "post",
			async: false,
			data: data_list,
	})
	.done(function(data){
      m_list = JSON.parse(data);
      console.log(m_list[0]);
      $("#ma_idx").html("<option value>제조사</option>");
      for (var i = 0; i < m_list.length; i++){
        h_data = "<option value='"+m_list[i].ma_idx+"'>"+m_list[i].ma_name+"</option>"
        $("#ma_idx").append(h_data);
      }
  });

}



function remove_make(ma_idx){
  if(confirm("정말삭제 합니까?")==false){return false;}
	var data_list = {"ma_idx":ma_idx,"work_mode":"remove_make"};
	var url = "/admin/proc_ajax.php";

	$.ajax({
			url: url,
			type: "post",
			async: false,
			data: data_list,
	})
	.done(function(data){
		alert('제조사가 삭제 되었습니다');
  });
}


function remove_model(mo_idx){
  if(confirm("정말삭제 합니까?")==false){return false;}

	var data_list = {"mo_idx":mo_idx,"work_mode":"remove_model"};
	var url = "/admin/proc_ajax.php";

	$.ajax({
			url: url,
			type: "post",
			async: false,
			data: data_list,
	})
	.done(function(data){
		alert('차량이 삭제 되었습니다');
  });
}


function check_all(f)
{
    var chk = document.getElementsByName("chk[]");

    for (i=0; i<chk.length; i++)
        chk[i].checked = f.chkall.checked;
}

function btn_check(f, act)
{
    if (act == "update") // 선택수정
    {
        f.action = list_update_php;
        str = "수정";
    }
    else if (act == "delete") // 선택삭제
    {
        f.action = list_delete_php;
        str = "삭제";
    }
    else
        return;

    var chk = document.getElementsByName("chk[]");
    var bchk = false;

    for (i=0; i<chk.length; i++)
    {
        if (chk[i].checked)
            bchk = true;
    }

    if (!bchk)
    {
        alert(str + "할 자료를 하나 이상 선택하세요.");
        return;
    }

    if (act == "delete")
    {
        if (!confirm("선택한 자료를 정말 삭제 하시겠습니까?"))
            return;
    }

    f.submit();
}

function is_checked(elements_name)
{
    var checked = false;
    var chk = document.getElementsByName(elements_name);
    for (var i=0; i<chk.length; i++) {
        if (chk[i].checked) {
            checked = true;
        }
    }
    return checked;
}

function delete_confirm(el)
{
    if(confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
        var token = get_ajax_token();
        var href = el.href.replace(/&token=.+$/g, "");
        if(!token) {
            alert("토큰 정보가 올바르지 않습니다.");
            return false;
        }
        el.href = href+"&token="+token;
        return true;
    } else {
        return false;
    }
}

function delete_confirm2(msg)
{
    if(confirm(msg))
        return true;
    else
        return false;
}

function get_ajax_token()
{
    var token = "";

    $.ajax({
        type: "POST",
        url: g5_url+"/admin/ajax.token.php",
        cache: false,
        async: false,
        dataType: "json",
        success: function(data) {
            if(data.error) {
                alert(data.error);
                if(data.url)
                    document.location.href = data.url;

                return false;
            }

            token = data.token;
        }
    });

    return token;
}
function update_routine_price(rp_idx){
  if(rp_idx){
    let rp_name = $("#rp_name"+rp_idx).val();
    let rp_price = $("#rp_price"+rp_idx).val();
    $("#rp_name").val(rp_name);
    $("#rp_price").val(rp_price);
    $("#rp_idx").val(rp_idx);
    routine_price_from.submit();
  }else {
    alert("잘못된 요청입니다");
  }
}

function update_rp_idx(mo_idx){
  let rp_idx = $("#rp_idx"+mo_idx).val();
  let data_list = {"mo_idx":mo_idx,
                   "rp_idx":rp_idx,
                   "work_mode":"update_rp_idx"};
  $.ajax({
    type: "POST",
    url:"/admin/proc_ajax.php",
    async: false,
    data: data_list,
    success: function(data){
      console.log(data);
    }
  });
}
//실시간으로 데이터를 반영함
function update_routine_patch(colum,idx){
  let content = $("#"+colum).val();
  let data_list = {"ro_idx":idx,
                   "content":content,
                   "colum":colum,
                   "work_mode":"update_routine_patch"};
  $.ajax({
    type: "POST",
    url:"/admin/proc_ajax.php",
    async: false,
    data: data_list,
    success: function(data){
      console.log(data);
    }
  });
}

$(function() {
    $(document).on("click", "form input:submit", function() {
        var f = this.form;
        var token = get_ajax_token();

        if(!token) {
            alert("토큰 정보가 올바르지 않습니다.");
            return false;
        }

        var $f = $(f);

        if(typeof f.token === "undefined")
            $f.prepend('<input type="hidden" name="token" value="">');

        $f.find("input[name=token]").val(token);

        return true;
    });
});



$("#check_all").click(function(){
  if($("#check_all").prop("checked")) {
    $(".container_wr input[type=checkbox]").prop("checked",true);
  } else {
    $(".container_wr input[type=checkbox]").prop("checked",false);
  }
});

$(function() {
    //input을 datepicker로 선언
    $("#datepicker").datepicker({
        dateFormat: 'yy-mm-dd' //Input Display Format 변경
        ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
        ,changeYear: true //콤보박스에서 년 선택 가능
        ,changeMonth: true //콤보박스에서 월 선택 가능
        ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
        ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
        ,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트
        ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
        ,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        ,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
    });

    //날짜값이 있을경우에 출차날짜로 기본값 설정
    var jud=$('#datepicker').val();
    var t=new Date(jud);
    if(jud){
      $('#datepicker').datepicker("setDate",t);
    }else{
      //초기값을 오늘 날짜로 설정
      $('#datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    }
});
