/**
 * miniInfo v1.0: AudioPlayer 
 * by aeddang
 */
/*
interfaces

*/

if(typeof jarvis == "undefined") var jarvis = new Object();


if(jarvis.dirPath===undefined){
	jarvis.dirPath="./";
	if(window.location.href.indexOf("http")==-1 || window.location.href.indexOf("imbctc")!=-1){
		jarvis.dirPath="./";
	}else{
    }
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/global.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/base.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/ui.css'>");
    
}

//document.write("<script type='text/javascript' src='http://mini.imbc.com/common/js/analytics.js'></script>"); 



jarvis.BottomOption=function(){
   
   this.cssKey="bottom";
   this.marginX=50;
}



jarvis.Bottom= function(pageID,option) 
{
	
	
	this.body;
	if(pageID===undefined){
	   this.body=document.body;
	}else{
	   this.body=document.getElementById(pageID);
	}	

    this.option=option;
	if(this.option===undefined){
	   this.option=new jarvis.BottomOption();
	}
 
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
    
    var leftBtnTitleA=new Array();
	leftBtnTitleA[0]="© MBC & iMBC";
   // leftBtnTitleA[0]="이동 스튜디오 알라딘";
   // leftBtnTitleA[1]="전국 주파수 안내";
	//leftBtnTitleA[2]="당첨상품검색";
   var leftBtnLinkA=new Array();
   leftBtnLinkA[0]="";



	var rightBtnTitleA=new Array();
    rightBtnTitleA[0]="TOP";
    var rightBtnLinkA=new Array();
	rightBtnLinkA[0]="#";

	var bottomBtnTitleA=new Array();
   // bottomBtnTitleA[0]="© MBC & iMBC";
   // bottomBtnTitleA[1]="개인정보 처리방침";
	var bottomBtnLinkA=new Array();
    
    var topNavi=document.createElement("div");
	var bottomNavi=document.createElement("div");
    jarvis.lib.addAttribute(topNavi,"navi body-size");
	jarvis.lib.addAttribute(bottomNavi,"align-left bottom");
	
	this.body.appendChild(topNavi);
    this.topNavi=topNavi;


	this.btnA=new Array();
    var btn;
	var link;
	var bar;
	for(var i=0;i<leftBtnTitleA.length;++i){
		
		if(i!=0){
			bar=document.createElement("div");
			jarvis.lib.addAttribute(bar,"font-small bar align-left");
			bar.innerHTML="|";
			topNavi.appendChild(bar);
		}
		link=leftBtnLinkA[i];
		if(link==""){
		   btn=document.createElement("div");
		}else{
		   btn=document.createElement("a");
		   btn.href=link;
		}
		
		jarvis.lib.addAttribute(btn,"font-small btn align-left btn-text");
        btn.innerHTML=leftBtnTitleA[i];
		
		
		this.btnA.push(btn);
        topNavi.appendChild(btn);
		

	}

	for(var i=0;i<rightBtnTitleA.length;++i){
		
		if(i!=0){
			bar=document.createElement("div");
			jarvis.lib.addAttribute(bar,"font-small bar align-right");
			bar.innerHTML="|";
			topNavi.appendChild(bar);
		}
		link=rightBtnLinkA[i];
		if(link==""){
		   btn=document.createElement("div");
		}else{
		   btn=document.createElement("a");
		   btn.href=link;
		}
		jarvis.lib.addAttribute(btn,"font-small btn align-right btn-text");
        btn.innerHTML=rightBtnTitleA[i];
		this.btnA.push(btn);
        topNavi.appendChild(btn);
		
	}

	for(var i=0;i<bottomBtnTitleA.length;++i){
		if(i!=0){
			bar=document.createElement("div");
			jarvis.lib.addAttribute(bar,"font-small bar align-left");
			bar.innerHTML="|";
			bottomNavi.appendChild(bar);
		}
		link=bottomBtnLinkA[i];
		if(link==""){
		   btn=document.createElement("div");
		}else{
		   btn=document.createElement("a");
		   btn.href=link;
		}
		
		jarvis.lib.addAttribute(btn,"font-small btn align-left btn-text");
        btn.innerHTML=bottomBtnTitleA[i];
		this.btnA.push(btn);
        bottomNavi.appendChild(btn);
	}
    
	topNavi.appendChild(bottomNavi);
	
	
}

jarvis.Bottom.prototype = 
{
    
	init : function()
	{
		var that=this;
	 
    },
		
    orientationChange : function(){
	},

	resize : function(browserHeight){
	    var bounceP=jarvis.lib.getAbsoluteBounce(this.body);
		this.topNavi.style.width=Math.floor(bounceP.width-(this.option.marginX*2))+"px";
		
	  

	}
}



