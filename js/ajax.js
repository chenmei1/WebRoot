function login(){
	//var data = {loginName:1626636,passWord:188430};
	var submit=$("#submit");
	submit.click(function(){
		var url="/weixin/login";
		var name=$("#number").val();
		var psw=$("#psw").val();
		var data={loginName:name,passWord:psw};
		$.ajax({
			"url":url,
			"type":"post",
			"data":data,
			"success":function(result){
				if(result.indexOf(1)!=-1){
					window.location.href="/weixin/index.html";
				}else{
					function wrapper(){
						var w_h=$(window).height();
						console.log(w_h);
						var w_w=$(window).width();
						$("#wrapper").css({"display":"block","width":w_w,"height":w_h});
						$("#error").css({"marginTop":w_h/2-20+"px"});
					}
					wrapper();
					function close(){
						var again=$("#again");
						again.click(function(){
							$("#wrapper").css("display","none");
						})
					}
					close();
				}
			},
			"error":function(){
				alert("error");
			}
		})
		return false;
	})		
}
/*一卡通消费*/
var rechargeNum=0;
function recharge(id){
	var url="/weixin/service?type=spendRec&page="+id+"";
	$.ajax({
		"url":url,
		"type":"post",
		"data":"",
		"success":function(result){
			$("#loding").css("display","none");
			var length=result.info.length;
			var rechargeInfo=result.info;
			var rechargeList=[];
			for(var i=0;i<length;i++){
				var info=rechargeInfo[i];
				rechargeList.push({
					"time":info.sj,
					"address":info.sh,
					"money":info.je+"元"
				})
			}
			var myTemplate = Handlebars.compile($("#recharge-template").html());
			$('#recharge').append(myTemplate(rechargeList));
			$("table").find("tr:odd").addClass("gray");
		},
		"error":function(){
			$("#loding").css("display","none");
			$('#recharge').html('<p style="text-align:center;font-size:1.2em;color:#d14;margin-top:60px;">没有记录信息</p>');
		}
	})
}
function more(){
	$("#more").click(function(){
		rechargeNum++;
		recharge(rechargeNum);
	})
}
/*图书借阅查询*/
function record(){
	var url="/weixin/service?type=libraryRec";
	$.ajax({
		"url":url,
		"type":"post",
		"data":"",
		"success":function(result){
			$("#loding").css("display","none");
			var length=result.length;
			var recordList=[];
			for(var i=0;i<length;i++){
				var info=result[i];
				recordList.push({
					"time":info.jsrq,
					"name":info.tsmc,
					"end_time":info.yhrq
				})
			}
			var myTemplate = Handlebars.compile($("#record-template").html());
			$('#record').html(myTemplate(recordList));
			$("table").find("tr:odd").addClass("gray");
		},
		"error":function(){
			$("#loding").css("display","none");
			$('#record').html('<p style="text-align:center;font-size:1.2em;color:#d14;margin-top:60px;">没有记录信息</p>');
		}
	})
}
/*成绩查询*/
function grade(){
	var url="/weixin/service?type=score";
	$.ajax({
		"url":url,
		"type":"post",
		"data":"",
		"success":function(result){
			$("#loding").css("display","none");
			var length=result.length;
			var gradeList=[];
			for(var i=0;i<length;i++){
				var info=result[i];
				gradeList.push({
					"name":info.kcmc,
					"grade":info.cj
				})
			}
			var myTemplate = Handlebars.compile($("#grade-template").html());
			$('#grade').html(myTemplate(gradeList));
			$("table").find("tr:odd").addClass("gray");

		},
		"error":function(){
			$("#loding").css("display","none");
			$('#grade').html('<p style="text-align:center;font-size:1.2em;color:#d14;margin-top:60px;">没有记录信息</p>');
			//alert("没有记录信息");
			
		}
	})
}
/*课表*/
function course(){
	var url="/weixin/service?type=course";
	$.ajax({
		"url":url,
		"type":"post",
		"data":"",
		"success":function(result){
			var length=result.weekInfo.length;
			var course=[];
			var weekNo=result.weekNo;
			for(var i=0;i<length;i++){
				$("#loding").css("display","none");
				var timeTable=result.weekInfo[i];
				var week=timeTable.WeekTime.split(",");
				var time="";
				var weekLength=week.length;
				for(var j=0;j<weekLength;j++){
					if(week[j]==weekNo){
						//console.log(timeTable);
						switch(parseInt(timeTable.Day)){
							case 1:
								session(1);
								break;
							case 2:
								session(2);
								break;
							case 3:
								session(3);
								break;
							case 4:
								session(4);
								break;
							case 5:
								session(5);
								break;
							case 6:
								session(6);
								break;
							case 7:
								session(7);
								break;
						}
					}
				}
						
			}
				
			function session(num){
				var tbody=$("#tbody tr");
				//var text=timeTable.Kcmc+'<br/>'+timeTable.Classroom+'<br/>'+"周数"+"<br/>"+timeTable.time+"<br/>";
				var text=timeTable.Kcmc+'<br/>'+timeTable.Classroom;
				if(timeTable.StartTime==1){
					tbody.eq(0).find("td").eq(num).css("background","#8BD89D").append(text);
				}else if(timeTable.StartTime==3){
					tbody.eq(1).find("td").eq(num).css("background","#FF7B7B").append(text);
				}else if(timeTable.StartTime==5){
					tbody.eq(2).find("td").eq(num).css("background","#8BD89D").append(text);
				}else if(timeTable.StartTime==7){
					tbody.eq(3).find("td").eq(num).css("background","#EA68A2").append(text);
				}else if(timeTable.StartTime==9){
					tbody.eq(4).find("td").eq(num).css("background","#8BD89D").append(text);
				}else if(timeTable.StartTime==11){
					tbody.eq(5).find("td").eq(num).css("background","#FF7B7B").append(text);
				}
			}
		},
		"error":function(){
			$("#loding").css("display","none");
			$('#info').html('<p style="text-align:center;font-size:1.2em;color:#d14;margin-top:60px;">没有记录信息</p>');
			$("#class").css("display","none");
		}
	})
}
