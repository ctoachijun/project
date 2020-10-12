// 전역 변수
var errmsg = "";
var errfld = null;
var oc = 0;
function ck_count(className){
  var count =  $('.'+className).length;
  if(5 < count){
    alert("정보는 최대5개까지만 등록가능합니다");
    return false;
  }else{
    return true;
  }
}

function remove_car(mc_idx){
  $("#car_box"+mc_idx).remove();
  var data_list = {"work_mode":"remove_car","mc_idx":mc_idx};
  $.ajax({
    url: "/theme/cookie/mobile/app/proc.php",
    type: "post",
    async: false,
    data: data_list
  })
}

function remove_address(add_id){
  $("#add_box"+add_id).remove();
  var data_list = {"work_mode":"remove_address","add_id":add_id};
  $.ajax({
    url: "/theme/cookie/mobile/app/proc.php",
    type: "post",
    async: false,
    data: data_list
  })

}



function update_pre(my,table,mb_id){
  var idx = my.value;
  var data_list = {"work_mode":"update_pre","idx":idx,"table":table,"mb_id":mb_id};
  $.ajax({
    url: "/theme/cookie/mobile/app/proc.php",
    type: "post",
    async: false,
    data: data_list
  }).done(function(data){

  })
}

function car_cancels(mb_id,wa_idx){
  var data_list = {"work_mode":"car_cancels","mb_id":mb_id,"wa_idx":wa_idx};
  $.ajax({
    url: "/theme/cookie/mobile/app/proc.php",
    type: "post",
    async: false,
    data: data_list
  })
  location.href='/';
  alert("취소하였습니다");
}
function click_star(my) {
  $(my).parent().children('span').removeClass('on');
  $(my).addClass('on').prevAll('span').addClass('on');
  $("#mb_star").val($(my).addClass('on').prevAll('span').length+1);

  return false;
}
function section1_con(val){
  $(".act").removeClass("act");
  $("#content_box"+val).addClass("act");
  for (var i = 1; i < 5; i++) {
    $("#s1img"+i).attr("src","/img/section1_"+i+".png");
  }

  $("#s1img_box").attr("src","/img/s1_"+val+".png");
  $("#s1img"+val).attr("src","/img/section1_"+val+"_1.png");
}
function check_time(){
  var wa_sel_time1 = $("#wa_sel_time1").val();
  var wa_sel_time2 = $("#wa_sel_time2").val();

  var today = new Date();
  today.setHours(today.getHours() + 6);
  var todayTime = today.getTime();
  var temp_time = String(wa_sel_time1+"T"+wa_sel_time2+":"+today.getMinutes());
  var wa_today = new Date(temp_time);
  console.log(wa_today);
  wa_today.setMinutes(wa_today.getMinutes() + 1);
  var wa_todayTime = wa_today.getTime();
  var year = today.getFullYear(); // 년도
  var month = today.getMonth() + 1;  // 월
  var date = today.getDate();   // 날짜
  var hours = today.getHours();  // 시간
  var returnArr = [];
  returnArr['day'] = year+"-"+pad(month,2)+"-"+date;
  returnArr['time'] = pad(hours,2);
  console.log(todayTime);
  console.log(wa_todayTime);


  if(wa_todayTime >= todayTime){
    returnArr['check'] = true;
  }else{
    returnArr['check'] = false;
    $("#wa_sel_time1").val(returnArr['day']);
    $("#wa_sel_time2").val(returnArr['time']);
  }

  return returnArr;
}
// 출차시간의 유효성의 결과값으로 체크여부를 판
function change_time(){
  var arr = check_time();
  if(!arr['check']){
    alert("출차시간은 5시간 이후에만 신청가능합니다");
  }
}

function change_rc_start(rc_idx){
  let rc_start1 = $("#rc_start1"+rc_idx).val();
  let rc_start2 = $("#rc_start2"+rc_idx).val();
  let rc_start = rc_start1+" "+rc_start2;
  let data_list = {"work_mode":"change_rc_start","rc_idx":rc_idx,"rc_start":rc_start};
  console.log(data_list);
  $.ajax({
    url: "/theme/cookie/mobile/app/proc.php",
    type: "post",
    async: false,
    data: data_list
  })
}



function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
///업로드한 이미지를 업로드하고 중앙에 아이콘을 띄움니다.
function readURL(input){

  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {

        var img_box = $('#img_box');
        img_box.css({"background":"url("+e.target.result+")",
                     'background-repeat' : 'no-repeat',
                     'background-position':'center center',
                     'background-size': '100% 100%'});
      }
      $("#camera_label").hide();
      reader.readAsDataURL(input.files[0]);
  }
}

function submit_routine() {
  var mo_idx = $("#mo_idx_val").val();
  var mc_idx = $("#mc_idx"+mo_idx).val();
  $("#mc_idx").val(mc_idx);
}
function submit_wash() {
  var mo_idx = $("#mo_idx_val").val();
  var mc_idx = $("#mc_idx"+mo_idx).val();
  $("#mc_idx").val(mc_idx);
  $('#dialog').dialog({
    modal: true,
    title: "현재 차량의 위치를 알려주세요"
  });
  return false;
}
function dialog_option() {
  $('#dialog_option').dialog({
    modal: true,
    title: "세차옵션이란?"
  });
  return false;
}


function wa_form_submit() {
  var wa_memo2 = $("#wa_memo2").val();
  $("#wa_memo2_val").val(wa_memo2);
  $("#dialog").html("<div class='loader'></div><h2 class='loader_msg'>잠시만 기다려주세요</h2>");
  wa_form.submit();
}
function copy_to_clipboard() {
  var copyText = document.getElementById("copys");

  copyText.select();
  document.execCommand("Copy");
  alert("복사하였습니다");
}


function append_input(){
  var wa_card2 = $("#wa_card2").attr("checked");
  if(wa_card2){
    $("#wa_memo1").show();
  }else {
    $("#wa_memo1").hide();
  }
  console.log(wa_card2);
}
function togle_view(val){
  if(val){
    $("#wa_in_option_sel").show();
    var info = $("#in_ck").val();
    info = info.split("#");
    var html_p = "<div class='item_list wa_in_option_c' id='wa_in_option_c'>";
    html_p +="<input class='prices' type='hidden' value='"+info[1]+"'>";
    html_p +="<input name='wa_in_option[]' type='hidden' value='"+info[0]+"'>";
    html_p +="<span class='l_item'>내부세차</span>";
    html_p +="<span class='r_item'>+"+info[1]+"원</span>";
    html_p +="</div>";
    $("#item_box").append(html_p);
    oc++;
  }else {
    $("#wa_in_option_sel").hide();
    $(".wa_in_option_c").each(function(index, item){
      $("#"+item.id).remove();
    });
  }
  cal_price();
}

function get_car_option(mode){
   if(!mode){
     mode = "";
   }
   var add_addr1 = $("#add_id option:selected").text();
   var mo_idx = $("#mo_idx").val();
   var mo_info = $("#mo_idx option:selected").text();
   var data_list = {"method":"proc_get_car_option"+mode,"mo_idx":mo_idx,"add_addr1":add_addr1};
   $("#mo_idx_val").val(mo_idx);
   console.log(data_list);
   $.ajax({
     url: "/json/proc_json.php",
     type: "post",
     async: false,
     data: data_list
   }).done(function(data){
     var json = JSON.parse(data);
     var html_i = "<option>내부 세차옵션을 선택해 주세요</option>";
     if(json.in_list.length > 0){
       for (var i = 0; i < json.in_list.length; i++){
         if(json.in_list[i].mp_name == "내부기본"){
           $("#in_ck").val(json.in_list[i].mp_idx+"#"+json.in_list[i].mp_price);
           $("#inner_text").html("내부세차"+" #"+json.in_list[i].mp_price+"원");
         }else {
           html_i += "<option value='"+json.in_list[i].mp_idx+"'>";
           html_i += json.in_list[i].mp_name+" #";
           html_i += json.in_list[i].mp_price+"원";
           html_i += "</option>";
         }
       }
     }
     var html_qna = "";
     var html_o = "<option>외부옵션을 선택해 주세요</option>";
     if(json.in_list.length > 0){
         for (var i = 0; i < json.op_list.length; i++){
           html_o += "<option value='"+json.op_list[i].opt_id+"'>";
           html_o += json.op_list[i].opt_name+" #";
           html_o += json.op_list[i].opt_price_1+"원";
           html_o += "</option>";
           html_qna += "<div class='qna_box'>";
           html_qna += "<p class='qlist'>Q."+json.op_list[i].opt_name+"</p>";
           html_qna += "<p class='alist'>A. "+json.op_list[i].opt_content+"</p>";
           html_qna += "</div>";
        }

     }
     $("#wa_option_sel").html(html_o);
     $("#dialog_option").html(html_qna);
     $("#wa_in_option_sel").html(html_i);
     mo_info = mo_info.split("#");
     var mo_price = mo_info[1].replace("원","");
     var html_p = "<div class='item_list'>";
     html_p +="<input class='prices' type='hidden' value='"+mo_price+"'>";
     html_p +="<span class='car_item'>"+mo_info[0]+"</span>";
     html_p +="<span class='r_car_item'>"+mo_info[1]+"</span>";
     html_p +="</div>";
     $("#item_box").html(html_p);
   });
   togle_view(false);
   $("#in_ck").attr("checked", false);
   cal_price();
}


function remove_item_list_box(oc){
  $("#item_list_box"+oc).remove();
  cal_price();
}
function sel_option(my,className){
  let idx = $("#"+my.id).val();
  let info = $("#"+my.id+" option:selected").text();
  info = info.split("#");
  if(info.length > 1){
    let price = info[1].replace("원","");
    let ck = true;
    let html_p = "<div class='item_list "+className+"_c' id='item_list_box"+oc+"'>";
    $("."+className).each(function(index, item){
      if(item.value == idx){
        alert("선택하신 "+info[0]+" 옵션이 존재합니다.");
        ck = false;
      }
    });
    if(ck){
      html_p +="<input class='prices' type='hidden' value='"+price+"'>";
      html_p +="<input name='"+className+"[]' class='"+className+"' type='hidden' value='"+idx+"'>";
      html_p +="<span class='l_item'>"+info[0]+"</span>";
      html_p +="<span class='can_item' onclick='remove_item_list_box("+oc+")'>x</span>";
      html_p +="<span class='r_item'>+"+info[1]+"</span>";

      html_p +="</div>";
      $("#item_box").append(html_p);
      oc++;
      cal_price();
      $('html, body').scrollTop( $(document).height());
    }
    $("#"+my.id).val("");
  }
}
function cal_price() {
  var all_price = 0;
  $(".prices").each(function(index, item){
    all_price += parseInt(item.value);
  });
  let ro_day_count = 0;
  for (let i = 1; i < 6; i++){
    if($("#ro_day"+i).is(":checked")){
      ro_day_count++;
    };
  }
  if(ro_day_count === 0){
      ro_day_count = 1;
  }
  all_price = all_price*ro_day_count;
  $("#wa_price").val(all_price);
  $("#all_price").html(all_price+"원");
}

function get_make(){
   var mc_area = $("#mc_area").val();
   var data_list = {"method":"proc_get_make","ar_idx":mc_area};
   $.ajax({
     url: "/json/proc_json.php",
     type: "post",
     async: false,
     data: data_list
   }).done(function(data){

     var json = JSON.parse(data);
     console.log(json);
     var html = make_option(json.arrItems);
    $("#mc_make").html(html);
    init_select("mc_model_sel");
   });
}


function get_model(){
   var mc_make = $("#mc_make").val();
   var data_list = {"method":"proc_get_model","ma_idx":mc_make};
   $.ajax({
     url: "/json/proc_json.php",
     type: "post",
     async: false,
     data: data_list
   }).done(function(data){
     var json = JSON.parse(data);
     console.log(json);
     var html = make_option(json.arrItems);
     $("#mc_model_sel").html(html);
   });
}

function get_model_info(){
    var mc_model = $("#mc_model_sel").val();
    var arr = mc_model.split("@");
    $("#mo_idx").val(arr[0]);
    $("#mc_model").val(arr[1]);
    $("#mc_price").val(arr[2]);

    var text = $("#mc_model").text();
    console.log(text);
}
var cidx = 0;
function add_mem_car(){
    var html = "<div class='car_box' id='car_box"+cidx+"'>";

    var mc_area = $("#mc_area option:selected").text();
    var mc_make = $("#mc_make option:selected").text();
    var mc_model = $("#mc_model").val();
    var mc_color = $("#mc_color").val();
    var mc_no = $("#mc_no").val();

    if(mc_area == "선택해주세요" || mc_make == "선택해주세요"){
      alert("차량분류와 제조사를 확인해주세요");
      return false;
    }
    html += "	<input type='hidden' name='mc_area[]' value='"+mc_area+"'>";
    html += "	<input type='hidden' name='mc_make[]' value='"+mc_make+"'>";

    var vArr = ["차종","차량인덱스","차량가격","차량색상","차량번호"];
    var kArr = ["mc_model","mo_idx","mc_price","mc_color","mc_no"];
    for (var i = 0; i < vArr.length; i++){
      var vals = $("#"+kArr[i]).val();
      if(vals == ""){
        alert(vArr[i]+"을 입력해주세요");
        return false;
      }else {
        html += "<input type='hidden' name='"+kArr[i]+"[]' value='"+vals+"'>";
      }
    }
    html += "<label>"+mc_area+" "+mc_make+" "+mc_model+"<br>"+mc_no+" "+mc_color+"</label>";
    html += "<span class='remove_icon' onclick='remove_box(&quot;car_box&quot;,"+cidx+")'>X</span>";
    html += "<input type='hidden' name='"+kArr[i]+"[]' value='"+vals+"'>";
    html +="</div>";
    $('#fix_layout').hide();
    $("#car_list").append(html);

    //  박스 초기화
    $('#mc_area').val("");
    $('#mc_color').val("");
    $('#mc_no').val("");
    init_select("mc_make");
    init_select("mc_model_sel");
    cidx++;
}



function make_option(list){
  var html = "<option value=''>선택해주세요</option>";
  if(list != undefined){
    for (var i = 0; i < list.length; i++) {
      html += "<option value='"+list[i].idx+"'>"+list[i].name+"</option>";
    }
  }
  return html;
}

function init_select(id){
  $("#"+id).html('<option value="">선택해주세요</option>');
}

function send_sms(){
  var mb_hp = $("#reg_mb_hp").val();
  var data_list = {"method":"proc_send_sms","mb_hp":mb_hp};
  $.ajax({
    url: "/json/proc_json.php",
    type: "post",
    async: false,
    data: data_list
  }).done(function(data){
    var json = JSON.parse(data);
    alert(json.resultItem.message);
  });
}

function check_sms(){
  var mb_hp = $("#reg_mb_hp").val();
  var code = $("#code").val();
  var ck = false;
  var data_list = {"method":"proc_check_sms","mb_hp":mb_hp,"code":code};
  $.ajax({
    url: "/json/proc_json.php",
    type: "post",
    async: false,
    data: data_list
  }).done(function(data){
    var json = JSON.parse(data);
    if(json.resultItem.result == "N"){
        alert(json.resultItem.message);
    }else {
      ck = true;
    }
  });
  return ck;
}


// 필드 검사
function check_field(fld, msg)
{
    if ((fld.value = trim(fld.value)) == "")
        error_field(fld, msg);
    else
        clear_field(fld);
    return;
}

// 필드 오류 표시
function error_field(fld, msg)
{
    if (msg != "")
        errmsg += msg + "\n";
    if (!errfld) errfld = fld;
    fld.style.background = "#BDDEF7";
}

// 필드를 깨끗하게
function clear_field(fld)
{
    fld.style.background = "#FFFFFF";
}

function trim(s)
{
    var t = "";
    var from_pos = to_pos = 0;

    for (i=0; i<s.length; i++)
    {
        if (s.charAt(i) == ' ')
            continue;
        else
        {
            from_pos = i;
            break;
        }
    }

    for (i=s.length; i>=0; i--)
    {
        if (s.charAt(i-1) == ' ')
            continue;
        else
        {
            to_pos = i;
            break;
        }
    }

    t = s.substring(from_pos, to_pos);
    //				alert(from_pos + ',' + to_pos + ',' + t+'.');
    return t;
}

// 자바스크립트로 PHP의 number_format 흉내를 냄
// 숫자에 , 를 출력
function number_format(data)
{

    var tmp = '';
    var number = '';
    var cutlen = 3;
    var comma = ',';
    var i;

    data = data + '';

    var sign = data.match(/^[\+\-]/);
    if(sign) {
        data = data.replace(/^[\+\-]/, "");
    }

    len = data.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i=0; i<data.length; i++)
    {
        number = number + data.charAt(i);

        if (i < data.length - 1)
        {
            k++;
            if ((k % cutlen) == 0)
            {
                number = number + comma;
                k = 0;
            }
        }
    }

    if(sign != null)
        number = sign+number;

    return number;
}

// 새 창
function popup_window(url, winname, opt)
{
    window.open(url, winname, opt);
}


// 폼메일 창
function popup_formmail(url)
{
    opt = 'scrollbars=yes,width=417,height=385,top=10,left=20';
    popup_window(url, "wformmail", opt);
}

// , 를 없앤다.
function no_comma(data)
{
    var tmp = '';
    var comma = ',';
    var i;

    for (i=0; i<data.length; i++)
    {
        if (data.charAt(i) != comma)
            tmp += data.charAt(i);
    }
    return tmp;
}

// 삭제 검사 확인
function del(href)
{
    if(confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
        var iev = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                iev = parseFloat(RegExp.$1);
        }

        // IE6 이하에서 한글깨짐 방지
        if (iev != -1 && iev < 7) {
            document.location.href = encodeURI(href);
        } else {
            document.location.href = href;
        }
    }
}

// 쿠키 입력
function set_cookie(name, value, expirehours, domain)
{
    var today = new Date();
    today.setTime(today.getTime() + (60*60*1000*expirehours));
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
    if (domain) {
        document.cookie += "domain=" + domain + ";";
    }
}

// 쿠키 얻음
function get_cookie(name)
{
    var find_sw = false;
    var start, end;
    var i = 0;

    for (i=0; i<= document.cookie.length; i++)
    {
        start = i;
        end = start + name.length;

        if(document.cookie.substring(start, end) == name)
        {
            find_sw = true
            break
        }
    }

    if (find_sw == true)
    {
        start = end + 1;
        end = document.cookie.indexOf(";", start);

        if(end < start)
            end = document.cookie.length;

        return unescape(document.cookie.substring(start, end));
    }
    return "";
}

// 쿠키 지움
function delete_cookie(name)
{
    var today = new Date();

    today.setTime(today.getTime() - 1);
    var value = get_cookie(name);
    if(value != "")
        document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
}

var last_id = null;
function menu(id)
{
    if (id != last_id)
    {
        if (last_id != null)
            document.getElementById(last_id).style.display = "none";
        document.getElementById(id).style.display = "block";
        last_id = id;
    }
    else
    {
        document.getElementById(id).style.display = "none";
        last_id = null;
    }
}

function textarea_decrease(id, row)
{
    if (document.getElementById(id).rows - row > 0)
        document.getElementById(id).rows -= row;
}

function textarea_original(id, row)
{
    document.getElementById(id).rows = row;
}

function textarea_increase(id, row)
{
    document.getElementById(id).rows += row;
}

// 글숫자 검사
function check_byte(content, target)
{
    var i = 0;
    var cnt = 0;
    var ch = '';
    var cont = document.getElementById(content).value;

    for (i=0; i<cont.length; i++) {
        ch = cont.charAt(i);
        if (escape(ch).length > 4) {
            cnt += 2;
        } else {
            cnt += 1;
        }
    }
    // 숫자를 출력
    document.getElementById(target).innerHTML = cnt;

    return cnt;
}

// 브라우저에서 오브젝트의 왼쪽 좌표
function get_left_pos(obj)
{
    var parentObj = null;
    var clientObj = obj;
    //var left = obj.offsetLeft + document.body.clientLeft;
    var left = obj.offsetLeft;

    while((parentObj=clientObj.offsetParent) != null)
    {
        left = left + parentObj.offsetLeft;
        clientObj = parentObj;
    }

    return left;
}

// 브라우저에서 오브젝트의 상단 좌표
function get_top_pos(obj)
{
    var parentObj = null;
    var clientObj = obj;
    //var top = obj.offsetTop + document.body.clientTop;
    var top = obj.offsetTop;

    while((parentObj=clientObj.offsetParent) != null)
    {
        top = top + parentObj.offsetTop;
        clientObj = parentObj;
    }

    return top;
}

function flash_movie(src, ids, width, height, wmode)
{
    var wh = "";
    if (parseInt(width) && parseInt(height))
        wh = " width='"+width+"' height='"+height+"' ";
    return "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' "+wh+" id="+ids+"><param name=wmode value="+wmode+"><param name=movie value="+src+"><param name=quality value=high><embed src="+src+" quality=high wmode="+wmode+" type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash' "+wh+"></embed></object>";
}

function obj_movie(src, ids, width, height, autostart)
{
    var wh = "";
    if (parseInt(width) && parseInt(height))
        wh = " width='"+width+"' height='"+height+"' ";
    if (!autostart) autostart = false;
    return "<embed src='"+src+"' "+wh+" autostart='"+autostart+"'></embed>";
}

function doc_write(cont)
{
    document.write(cont);
}

var win_password_lost = function(href) {
    window.open(href, "win_password_lost", "left=50, top=50, width=617, height=330, scrollbars=1");
}

$(document).ready(function(){
    $("#login_password_lost, #ol_password_lost").click(function(){
        win_password_lost(this.href);
        return false;
    });
});

/**
 * 포인트 창
 **/
var win_point = function(href) {
    var new_win = window.open(href, 'win_point', 'left=100,top=100,width=600, height=600, scrollbars=1');
    new_win.focus();
}

/**
 * 쪽지 창
 **/
var win_memo = function(href) {
    var new_win = window.open(href, 'win_memo', 'left=100,top=100,width=620,height=500,scrollbars=1');
    new_win.focus();
}

/**
 * 쪽지 창
 **/
var check_goto_new = function(href, event) {
    if( !(typeof g5_is_mobile != "undefined" && g5_is_mobile) ){
        if (window.opener && window.opener.document && window.opener.document.getElementById) {
            event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            window.open(href);
            //window.opener.document.location.href = href;
        }
    }
}

/**
 * 메일 창
 **/
var win_email = function(href) {
    var new_win = window.open(href, 'win_email', 'left=100,top=100,width=600,height=580,scrollbars=1');
    new_win.focus();
}

/**
 * 자기소개 창
 **/
var win_profile = function(href) {
    var new_win = window.open(href, 'win_profile', 'left=100,top=100,width=620,height=510,scrollbars=1');
    new_win.focus();
}

/**
 * 스크랩 창
 **/
var win_scrap = function(href) {
    var new_win = window.open(href, 'win_scrap', 'left=100,top=100,width=600,height=600,scrollbars=1');
    new_win.focus();
}

/**
 * 홈페이지 창
 **/
var win_homepage = function(href) {
    var new_win = window.open(href, 'win_homepage', '');
    new_win.focus();
}

/**
 * 우편번호 창
 **/

function remove_box(id,idx){

  $("#"+id+idx).remove();
}




var aidx = 0;

function add_zip(){
  var complete_fn = function(data){
      var geocoder = new daum.maps.services.Geocoder();
      var fullAddr = ''; // 최종 주소 변수
      var extraAddr = ''; // 조합형 주소 변수
      // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
          fullAddr = data.roadAddress;
      } else { // 사용자가 지번 주소를 선택했을 경우(J)
          fullAddr = data.jibunAddress;
      }
      // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
      if(data.userSelectedType === 'R'){
          //법정동명이 있을 경우 추가한다.
          if(data.bname !== ''){
              extraAddr += data.bname;
          }
          // 건물명이 있을 경우 추가한다.
          if(data.buildingName !== ''){
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
          extraAddr = (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
      }
      geocoder.addressSearch(data.address, function(results, status) {
        var html = "";
        var id = 'add_box';
        var id2 = '"add_box"';
        html += "<div class='add_box' id='add_box"+aidx+"'>";
        html += "<span class='remove_icon' onclick='remove_box("+id2+","+aidx+")'>X</span>";
        html += "<label>"+data.zonecode+"<br>"+fullAddr+"</label>";
        html += "<input type='text' id='input_"+id+aidx+"' name='add_addr2[]' class='frm_input full_input' placeholder='상세주소' required/>";
        html += "<input type='hidden' value='"+fullAddr+"' name='add_addr1[]'/>";
        html += "<input type='hidden' value='view' name='add_con[]'/>";
        html += "<input type='hidden' value='"+results[0].x+"' name='add_lng[]'/>";
        html += "<input type='hidden' value='"+results[0].y+"' name='add_lat[]'/>";
        html += "<input type='hidden' value='"+data.zonecode+"' name='add_zip[]'/>";
        html += "</div>";
        $("#address_list").append(html);
        aidx++;
        setTimeout(function(){
            $("#input_"+id+(aidx-1)).focus();
        } , 100);

      });
      // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
      // var of = document[frm_name];
      // of[frm_zip].value = data.zonecode;
      // of[frm_addr1].value = fullAddr;
      // of[frm_addr3].value = extraAddr;
      //
      // <label for="reg_mb_zip">우편번호<?php echo $config['cf_req_addr']?'<strong class="sound_only"> 필수</strong>':''; ?></label>
      // <input type="text" name="add_addr2[]" class="frm_input full_input" placeholder="상세주소">


      // if(of[frm_jibeon] !== undefined){
      //     of[frm_jibeon].value = data.userSelectedType;
      // }


  };


  var rayer_id = 'daum_juso_rayer'+"mb_zip",
      element_layer = document.getElementById(rayer_id);
  if (element_layer == null) {
      element_layer = document.createElement("div");
      element_layer.setAttribute("id", rayer_id);
      element_layer.style.cssText = 'display:none;border:1px solid #eee;position:fixed;top:0;width:100%;height:100%;overflow:hidden;-webkit-overflow-scrolling:touch;z-index:10000';
      element_layer.innerHTML = '<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:0;top:0;z-index:1" class="close_daum_juso" alt="닫기 버튼">';
      document.body.appendChild(element_layer);
      jQuery("#"+rayer_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
          e.preventDefault();
          jQuery(this).parent().hide();
      });
  }
  new daum.Postcode({
      oncomplete: function(data) {
          complete_fn(data);
          // iframe을 넣은 element를 안보이게 한다.
          element_layer.style.display = 'none';
      },
      maxSuggestItems : g5_is_mobile ? 6 : 10,
      width : '100%',
      height : '100%'
  }).embed(element_layer);
  // iframe을 넣은 element를 보이게 한다.
  element_layer.style.display = 'block';
}
var win_zip = function(frm_name, frm_zip, frm_addr1, frm_addr2, frm_addr3, frm_jibeon){
    if(typeof daum === 'undefined'){
        alert("다음 우편번호 postcode.v2.js 파일이 로드되지 않았습니다.");
        return false;
    }

    var zip_case = 0;   //0이면 레이어, 1이면 페이지에 끼워 넣기, 2이면 새창

    var complete_fn = function(data){
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullAddr = ''; // 최종 주소 변수
        var extraAddr = ''; // 조합형 주소 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            fullAddr = data.roadAddress;

        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
        if(data.userSelectedType === 'R'){
            //법정동명이 있을 경우 추가한다.
            if(data.bname !== ''){
                extraAddr += data.bname;
            }
            // 건물명이 있을 경우 추가한다.
            if(data.buildingName !== ''){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
            extraAddr = (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
        }

        // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
        var of = document[frm_name];

        of[frm_zip].value = data.zonecode;

        of[frm_addr1].value = fullAddr;
        of[frm_addr3].value = extraAddr;

        if(of[frm_jibeon] !== undefined){
            of[frm_jibeon].value = data.userSelectedType;
        }

        setTimeout(function(){
            of[frm_addr2].focus();
        } , 100);
    };

    switch(zip_case) {
        case 1 :    //iframe을 이용하여 페이지에 끼워 넣기
            var daum_pape_id = 'daum_juso_page'+frm_zip,
                element_wrap = document.getElementById(daum_pape_id),
                currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            if (element_wrap == null) {
                element_wrap = document.createElement("div");
                element_wrap.setAttribute("id", daum_pape_id);
                element_wrap.style.cssText = 'display:none;border:1px solid;left:0;width:100%;height:300px;margin:5px 0;position:relative;-webkit-overflow-scrolling:touch;';
                element_wrap.innerHTML = '<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-21px;z-index:1" class="close_daum_juso" alt="접기 버튼">';
                jQuery('form[name="'+frm_name+'"]').find('input[name="'+frm_addr1+'"]').before(element_wrap);
                jQuery("#"+daum_pape_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_wrap.style.display = 'none';
                    // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                    document.body.scrollTop = currentScroll;
                },
                // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분.
                // iframe을 넣은 element의 높이값을 조정한다.
                onresize : function(size) {
                    element_wrap.style.height = size.height + "px";
                },
                maxSuggestItems : g5_is_mobile ? 6 : 10,
                width : '100%',
                height : '100%'
            }).embed(element_wrap);

            // iframe을 넣은 element를 보이게 한다.
            element_wrap.style.display = 'block';
            break;
        case 2 :    //새창으로 띄우기
            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                }
            }).open();
            break;
        default :   //iframe을 이용하여 레이어 띄우기
            var rayer_id = 'daum_juso_rayer'+frm_zip,
                element_layer = document.getElementById(rayer_id);
            if (element_layer == null) {
                element_layer = document.createElement("div");
                element_layer.setAttribute("id", rayer_id);
                element_layer.style.cssText = 'display:none;border:5px solid;position:fixed;width:300px;height:460px;left:50%;margin-left:-155px;top:50%;margin-top:-235px;overflow:hidden;-webkit-overflow-scrolling:touch;z-index:10000';
                element_layer.innerHTML = '<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" class="close_daum_juso" alt="닫기 버튼">';
                document.body.appendChild(element_layer);
                jQuery("#"+rayer_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_layer.style.display = 'none';
                },
                maxSuggestItems : g5_is_mobile ? 6 : 10,
                width : '100%',
                height : '100%'
            }).embed(element_layer);

            // iframe을 넣은 element를 보이게 한다.
            element_layer.style.display = 'block';
    }
}

/**
 * 새로운 비밀번호 분실 창 : 101123
 **/
win_password_lost = function(href)
{
    var new_win = window.open(href, 'win_password_lost', 'width=617, height=330, scrollbars=1');
    new_win.focus();
}

/**
 * 설문조사 결과
 **/
var win_poll = function(href) {
    var new_win = window.open(href, 'win_poll', 'width=616, height=500, scrollbars=1');
    new_win.focus();
}

/**
 * 스크린리더 미사용자를 위한 스크립트 - 지운아빠 2013-04-22
 * alt 값만 갖는 그래픽 링크에 마우스오버 시 title 값 부여, 마우스아웃 시 title 값 제거
 **/
$(function() {
    $('a img').mouseover(function() {
        $a_img_title = $(this).attr('alt');
        $(this).attr('title', $a_img_title);
    }).mouseout(function() {
        $(this).attr('title', '');
    });
});

/**
 * 텍스트 리사이즈
**/
function font_resize(id, rmv_class, add_class, othis)
{
    var $el = $("#"+id);

    $el.removeClass(rmv_class).addClass(add_class);

    set_cookie("ck_font_resize_rmv_class", rmv_class, 1, g5_cookie_domain);
    set_cookie("ck_font_resize_add_class", add_class, 1, g5_cookie_domain);

    if(typeof othis !== "undefined"){
        $(othis).addClass('select').siblings().removeClass('select');
    }
}

/**
 * 댓글 수정 토큰
**/
function set_comment_token(f)
{
    if(typeof f.token === "undefined")
        $(f).prepend('<input type="hidden" name="token" value="">');

    $.ajax({
        url: g5_bbs_url+"/ajax.comment_token.php",
        type: "GET",
        dataType: "json",
        async: false,
        cache: false,
        success: function(data, textStatus) {
            f.token.value = data.token;
        }
    });
}

$(function(){
    $(".win_point").click(function() {
        win_point(this.href);
        return false;
    });

    $(".win_memo").click(function() {
        win_memo(this.href);
        return false;
    });

    $(".win_email").click(function() {
        win_email(this.href);
        return false;
    });

    $(".win_scrap").click(function() {
        win_scrap(this.href);
        return false;
    });

    $(".win_profile").click(function() {
        win_profile(this.href);
        return false;
    });

    $(".win_homepage").click(function() {
        win_homepage(this.href);
        return false;
    });

    $(".win_password_lost").click(function() {
        win_password_lost(this.href);
        return false;
    });

    /*
    $(".win_poll").click(function() {
        win_poll(this.href);
        return false;
    });
    */

    // 사이드뷰
    var sv_hide = false;
    $(".sv_member, .sv_guest").click(function() {
        $(".sv").removeClass("sv_on");
        $(this).closest(".sv_wrap").find(".sv").addClass("sv_on");
    });

    $(".sv, .sv_wrap").hover(
        function() {
            sv_hide = false;
        },
        function() {
            sv_hide = true;
        }
    );

    $(".sv_member, .sv_guest").focusin(function() {
        sv_hide = false;
        $(".sv").removeClass("sv_on");
        $(this).closest(".sv_wrap").find(".sv").addClass("sv_on");
    });

    $(".sv a").focusin(function() {
        sv_hide = false;
    });

    $(".sv a").focusout(function() {
        sv_hide = true;
    });

    // 셀렉트 ul
    var sel_hide = false;
    $('.sel_btn').click(function() {
        $('.sel_ul').removeClass('sel_on');
        $(this).siblings('.sel_ul').addClass('sel_on');
    });

    $(".sel_wrap").hover(
        function() {
            sel_hide = false;
        },
        function() {
            sel_hide = true;
        }
    );

    $('.sel_a').focusin(function() {
        sel_hide = false;
    });

    $('.sel_a').focusout(function() {
        sel_hide = true;
    });

    $(document).click(function() {
        if(sv_hide) { // 사이드뷰 해제
            $(".sv").removeClass("sv_on");
        }
        if (sel_hide) { // 셀렉트 ul 해제
            $('.sel_ul').removeClass('sel_on');
        }
    });

    $(document).focusin(function() {
        if(sv_hide) { // 사이드뷰 해제
            $(".sv").removeClass("sv_on");
        }
        if (sel_hide) { // 셀렉트 ul 해제
            $('.sel_ul').removeClass('sel_on');
        }
    });

    $(document).on( "keyup change", "textarea#wr_content[maxlength]", function(){
        var str = $(this).val();
        var mx = parseInt($(this).attr("maxlength"));
        if (str.length > mx) {
            $(this).val(str.substr(0, mx));
            return false;
        }
    });
});

function get_write_token(bo_table)
{
    var token = "";

    $.ajax({
        type: "POST",
        url: g5_bbs_url+"/write_token.php",
        data: { bo_table: bo_table },
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
function okimp(count){
  var s = 0;
  if(count!=0){
    var box = $("input[name='opt_id[]']").length;
    var box2 = $("input[name='opt_id[]']");
    var nopt_id = new Array();
    // var acount = 0;
    for(var i=0; i<box; i++){
      if(box2[i].checked){
        nopt_id[s] = box2[i].value;
        s++;
        // acount++;
      }
    }

    // console.log(nopt_id);
    // 체크 된 opt_id 만 넘김. hidden 값은 제외.
    $("input[name='opt_id[]']").val(nopt_id);

    if(s==0){
      alert("옵션을 선택 해 주세요.");
    }else{
      $('#opt_form').submit();
    }
  }else{
    alert("선택할 옵션이 없습니다");
  }
}

function update_rc(classname,rc_idx){

  var form = $("#insert_memo");
  var memo = $("#rc_memo"+rc_idx);

  $("#rc_idx").val(rc_idx);
  $("#rc_memo").val(memo.val());

  // console.log($("#rc_idx").val());
  // console.log($("#rc_memo").val());
  // console.log($("input[name=ro_idx]").val());

  if(!memo.val()){
    alert("남기는말을 입력 해 주세요.");
  }else{
    // console.log("전송");
    form.submit();
  }

}

$(function() {
    $(document).on("click", "form[name=fwrite] input:submit, form[name=fwrite] button:submit, form[name=fwrite] input:image", function() {
        var f = this.form;

        if (typeof(f.bo_table) == "undefined") {
            return;
        }

        var bo_table = f.bo_table.value;
        var token = get_write_token(bo_table);

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
