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





jarvis.TopOption=function(){
   
   this.cssKey="top";
   this.marginX=50;
   
}



jarvis.Top= function(pageID,option,delegate) 
{
	this.OPEN_LIST="OPEN_LIST";
	
	this.body;
	if(pageID===undefined){
		this.body=document.body;
	}else{
		if(typeof pageID=="string" || typeof pageID=="String"){
			this.body=document.getElementById(pageID);
	    }else{
			this.body=pageID;
		} 
	}
	this.info=jarvis.miniInfo;
	this.info.init();
	this.delegate=delegate;
    this.option=option;
	if(this.option===undefined){
	   this.option=new jarvis.TopOption();
	}
    this.isMinMode=false;
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
    
    this.navi=document.createElement("div");
    jarvis.lib.addAttribute(this.navi,"navi body-size");
	this.body.appendChild(this.navi);

	this.listBtn=document.createElement("button");
	this.loginBtn=document.createElement("button");
    this.homeBtn=document.createElement("a");
	
	
	if(jarvis.lib.mobile==true){
	    this.homeBtn.href="http://m.imbc.com/"; 
	}else{
	    this.homeBtn.href="http://www.imbc.com/";
	}
	
	this.homeBtn.target="_blank";
    //this.twBtn=document.createElement("button");
	//this.fbBtn=document.createElement("button");
	
    jarvis.lib.addAttribute(this.listBtn,"btn align-left btn-image btn-list");
    jarvis.lib.addAttribute(this.loginBtn,"btn align-left btn-text");
	
	jarvis.lib.addAttribute(this.homeBtn,"btn-home");

	//jarvis.lib.addAttribute(this.twBtn,"btn align-right btn-image btn-tw");
	//jarvis.lib.addAttribute(this.fbBtn,"btn align-right btn-image btn-fb");
	
    
	this.navi.appendChild(this.listBtn);
	this.navi.appendChild(this.loginBtn);
	
	this.fbLikeBox=document.createElement("iframe");
	jarvis.lib.addAttribute(this.fbLikeBox,"align-right fb-like-box");
	this.fbLikeBox.frameBorder="no"; 
	this.fbLikeBox.scrolling="no";
	this.fbLikeBox.allowTransparency="true";
	this.navi.appendChild(this.fbLikeBox);
	
	
	this.fbLikeBox.src=
		
		"http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fmini.imbc.com%2F&layout=button_count&action=like&show_faces=false&share=false&height=21";
	
	//this.fbLikeBox.style.border="none";
	

	
    //this.navi.appendChild(this.fbBtn);
	//this.navi.appendChild(this.twBtn);
	this.navi.appendChild(this.homeBtn);
	
}

jarvis.Top.prototype = 
{
    
	init : function()
	{
		var that=this;
		//jarvis.lib.addEventListener(this.homeBtn,"click",function (e){ that.goHome(e);});
	    jarvis.lib.addEventListener(this.listBtn,"click",function (e){ jarvis.lib.excuteDelegate(that.delegate,"listBtnClick");});
        jarvis.lib.addEventListener(this.loginBtn,"click",function (e){ that.login();});
	   // jarvis.lib.addEventListener(this.fbBtn,"click",function(e) { that.shareSns("f");});
		//jarvis.lib.addEventListener(this.twBtn,"click",function(e) { that.shareSns("t");});

		if(this.info.loginCheck()==true){
			this.loginBtn.innerHTML='로그아웃';
		}else{
		    this.loginBtn.innerHTML='로그인';
		}
    },
	goHome: function(e) 
	{
		if(jarvis.uiSet!=null && jarvis.uiSet!=undefined){
			jarvis.uiSet.changeHome();
		 }

	},
	login: function(type) 
	{
		
		if(this.info.loginCheck()==true){
			this.loginBtn.innerHTML='로그인';
			this.info.logout();
		}else{
		    this.info.login();
		}
		
		

	},
	
	shareSns: function(type) 
	{
        var sns;
		if(type=="f"){
			sns=new FaceBook();
		}else{
		    sns=new Twitter();
		}
		var address=window.location.href;
		var msg="MBC mini 언제 어디서든 MBC 라디오를 들으세요.";
        if(type=="f"){
		   sns.share(msg,address,550,330);
		}else{
           sns.share(msg,address);
		}
		
        
	},	
    orientationChange : function(){
	},

	resize : function(browserHeight)
	{
	    var bounceP=jarvis.lib.getAbsoluteBounce(this.body);
		this.navi.style.width=Math.floor(bounceP.width-(this.option.marginX*2))+"px";
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.navi);
		//jarvis.debuger.log("top : "+bounce.width);
		if(bounce.width<410 &&  this.isMinMode==false){
			this.isMinMode=true;
			//this.twBtn.style.display='none';
			//this.fbBtn.style.display='none';
		    
		}else if(bounce.width>410 && this.isMinMode==true){
			this.isMinMode=false;
		   // this.twBtn.style.display='block';
			//this.fbBtn.style.display='block';
		}
		jarvis.lib.setCenterPosition(this.homeBtn,bounce);
		

	}
}



