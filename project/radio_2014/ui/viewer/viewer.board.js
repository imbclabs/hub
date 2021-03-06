/**
 * miniInfo v1.0: AudioPlayer 
 * by aeddang
 */
/*
/*
jarvis.delegate=function(){}
jarvis.delegate.prototype = 
{
	closeViewer : function(){},   
	changeViewer : function(idx){},	
}
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

document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/viewer.css'>");











jarvis.ViewerBoardOption=function(){

	this.cssKey="viewer-board";
	this.scrollID="jarvisViewerBoard";
}



jarvis.ViewerBoard = function(pageID,option) 
{
	this.NONE=0;
	this.VOD=1;
	this.IMG=2;
	this.IFRAME=3;
	this.info=jarvis.jarvisInfo;
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

	this.option=option;

	if(this.option===undefined || this.option==null){
		this.option=new jarvis.ViewerBoardOption();
	}
    
	jarvis.lib.addAttribute(this.body,this.option.cssKey+" uicomponent");
    
    //콘텐츠 제목 영역 생성
	



	this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
	this.body.appendChild(this.loadingBar);		
    


    this.isVod=false;
	this.type=this.NONE
	this.data=null;
    
	this.pagePath="";
	this.title=null;
	this.date=null;
	this.content=null;
	this.comment=null;
	this.banner=null;
	this.commentMinH=0;
}

jarvis.ViewerBoard.prototype = 
{
	init : function(data,isVod)
	{
		var that=this;
		this.data=data;
        this.isVod=isVod;
        this.pagePath="http://mini.imbc.com/v2/index.html?page="+jarvis.uiSet.apiPath+"&seq="+this.data.seq;
        
		 
        this.title=document.createElement("h2");
		jarvis.lib.addAttribute(this.title,"font-big title text-auto-resize");
		
		this.date=document.createElement("div");
		jarvis.lib.addAttribute(this.date,"date font-middle");
        
		
        
		this.shareBox=document.createElement("div");
        jarvis.lib.addAttribute(this.shareBox,"share-box");
		this.body.appendChild(this.shareBox);
        if(this.info.isMobile==true){
			this.addKakaoBtn();
		}
		this.fbBtn=document.createElement("button");
		jarvis.lib.addAttribute(this.fbBtn,"btn btn-image align-left btn-share btn-fb");
		this.shareBox.appendChild(this.fbBtn);

		this.twBtn=document.createElement("button");
		jarvis.lib.addAttribute(this.twBtn,"btn btn-image align-left btn-share btn-tw");
		this.shareBox.appendChild(this.twBtn);

        this.body.appendChild(this.title);
		this.body.appendChild(this.date);

     
		jarvis.lib.addEventListener(this.fbBtn,"click",function(e) { that.shareSns("f");});
		jarvis.lib.addEventListener(this.twBtn,"click",function(e) { that.shareSns("t");});

		

        if(this.data.imgPath!="")
		{
			this.type=this.IMG;
			this.content=document.createElement("div");
			jarvis.lib.addAttribute(this.content,"content");
			this.content.style.position="absolute";
			this.body.appendChild(this.content);

			if(this.data.imgCash==null){
				this.image=new Image();
				jarvis.lib.addEventListener(this.image,"load",function (e){that.imgLoadComplete();})
			}else{
				this.image=this.data.imgCash;
				this.content.appendChild(this.image);
				this.setImgSize();
			}
			
		}
		else if(this.data.vodPath!="")
		{  
			
			
			this.type=this.VOD;
			this.content=document.createElement("div");
			jarvis.lib.addAttribute(this.content,"content");
			this.body.appendChild(this.content);
            

		}
		else if(this.data.iFramePath!="")
		{
			
			
			this.type=this.IFRAME;

			
			this.content=document.createElement("div");
			this.content.style.overflowX="hidden";
			if(this.info.isIos==true){
				this.content.style.overflowY="auto";
				
			}else{
				this.content.style.overflowY="hidden";
			}
			
			this.content.style["-webkit-overflow-scrolling"]="touch";
			this.iframe=document.createElement("iframe");
			
			this.content.appendChild(this.iframe);
			
            jarvis.lib.addAttribute(this.content,"content");
			jarvis.lib.addEventListener(this.iframe,"load",function (e){that.iframeLoadComplete();})

			this.iframe.frameBorder = "no"; 
			this.iframe.style.width="100%";
			this.iframe.style.height="100%";

			this.body.appendChild(this.content);

		}
	    this.title.innerHTML=this.data.title;
		this.date.innerHTML=this.data.date;
        
        //this.addComment();
		this.addBanner();
		
		this.resize();
	    
	},
	shareSns: function(type) 
	{
        var sns;
		if(type=="f"){
			sns=new FaceBook();
		}else{
		    sns=new Twitter();
		}
		if(type=="f"){
		   sns.share(this.data.title,this.pagePath,550,330);
		}else{
               
		   sns.share(this.data.title,this.pagePath);
		}
	},
	addKakaoBtn : function() 
	{
		var kakaoID=jarvis.lib.getTimeCode("viewerBoardKaKao");

		this.btnKakao=document.createElement("a");
		this.btnKakao.href="javascript:;";
	
		jarvis.lib.addAttribute(this.btnKakao,"btn-share btn-kakao align-left");
		this.shareBox.appendChild(this.btnKakao);	
		this.btnKakao.id=kakaoID;
		
        var that=this;
       
		Kakao.Link.createTalkLinkButton(
			{
				container: '#'+kakaoID,
				label: that.data.title,
				image: {
					src: that.data.subImgPath,
					width: '320',
					height: '180'
				},
				webButton: {
					text: '구경가기',
					url: that.pagePath 
				}
			}
		);
	},

	addBanner : function() 
	{
        this.banner=document.createElement("div");
		jarvis.lib.addAttribute(this.banner,"banner");
		this.body.appendChild(this.banner);
        

        var content;	   
		var iframe;
		var jsReciver;
		
		content=document.createElement("div");
		content.style.overflowX="hidden";
		content.style.overflowY="auto";
		content.style["-webkit-overflow-scrolling"]="touch";
		iframe=document.createElement("iframe");
		content.appendChild(iframe);
		
		jsReciver=document.createElement("div");
        iframe.appendChild(jsReciver); 
		iframe.frameBorder = "no"; 
		iframe.style.width="100%";
		this.banner.appendChild(content);
        
		iframe.src="adam.html";
       
        
	},
    addComment : function() 
	{
		
		this.comment=document.createElement("div");
		jarvis.lib.addAttribute(this.comment,"comment");
		this.body.appendChild(this.comment);

		var content;	   
		var iframe;
		if(this.info.isIos==true){
			content=document.createElement("div");
			content.style.overflowX="hidden";
			content.style.overflowY="auto";
			content.style["-webkit-overflow-scrolling"]="touch";
			iframe=document.createElement("iframe");
			
			content.appendChild(iframe);
		}else{
			content=document.createElement("iframe");
			iframe=content;
		}
        jarvis.lib.addAttribute(content,"frame");

		iframe.frameBorder = "no"; 
		iframe.style.width="100%";
		//iframe.style.height="100%";
        this.comment.iframe=iframe;
		this.comment.appendChild(content);
	},
	active :function()
	{
		switch(this.type){
			case this.IMG:
				if(this.data.imgCash==null){
					this.loading(true);
					this.image.src=this.data.imgPath;
				}
                
				break;
			case this.VOD:
				this.addPlayer();
				
				break;

			case this.IFRAME:
				this.loading(true);
				var path;
                if(this.data.isNCast==true){
                      var that=this;
					  var loadDelegate=function(){};
					  loadDelegate.prototype = {
                              loadComplete : function(path)
                              {
								  that.iframe.src=path;
							  },
							  loadError: function()
                              {
								  alert("재생할수 없는 영상 입니다.");
							  }

					  }
				     jarvis.jarvisInfo.loadVideoInfoFromNCast(this.data.seq,new loadDelegate());
				}else{
					if(this.data.iFramePath.indexOf("imbc.com/player/player2014/popupplayer.html?")!=-1){
						path=this.data.iFramePath+"&initImage="+this.data.subImgPath;
					}else{
						path=this.data.iFramePath
					}

					this.iframe.src=path;
				
				}
				
				
                break;

			default:
				break;
		}

        
        
		//this.comment.iframe.src="fbboard.html?page="+jarvis.uiSet.apiPath+"&seq="+this.data.seq;
           

	},
    
	
    
	remove : function()
	{
		if(this.player!=null){
			this.player.stopVod();
			this.player=null;
		}
	},

	imgLoadComplete:function(e)
	{
		this.loading(false);
		this.setImgSize();
	},

	iframeLoadComplete:function(e)
	{
		this.loading(false);
	},

	setImgSize:function()
	{
		var bounce=this.getContentBounce();
       
		if(this.data.imgCash==null){
			this.data.imgCash=this.image;
			this.content.appendChild(this.image);
		}
	   
		if( this.content.orgW === undefined){
	    
			if(this.image.width==0){
				this.content.orgW=640;
				this.content.orgH=360;
			}else{
				this.content.orgW=this.image.width;
				this.content.orgH=this.image.height;
			}
		}
	   

		var rect= jarvis.lib.getEqualRatioRect(this.content.orgW,this.content.orgH,bounce.width,bounce.height,true);
      
		this.content.style.width=rect.width+"px";
		this.content.style.height=rect.height+"px";
		this.content.style.left=rect.x+"px";
		this.content.style.top=rect.y+"px";
		this.image.width=rect.width;
		this.image.height=rect.height;
	},
	
	addPlayer:function()
	{
		var that=this;	
		var divID=jarvis.lib.getTimeCode("viewerBoard");
		this.content.id=divID; 
		var videoID= divID+"player";
	    
		this.player=new jarvis.AdaptPlayer(videoID);
		var playerDelegate=function(){};

		playerDelegate.prototype = {
			stateChange : function(e)
			{
				switch(e){
					case jarvis.AdaptPlayer.PLAY:
						break;
					case jarvis.AdaptPlayer.STOP:
						break;
					case jarvis.AdaptPlayer.COMPLETE:
						break;
					case jarvis.AdaptPlayer.INIT:
						that.changeVod();
						break;
				}
			}
		}

		var playerOption=new jarvis.AdaptPlayerOption();

		playerOption.uiView=true;  
		playerOption.isPopup=true;  
		playerOption.isUIHidden=true;  
		playerOption.reciveEvent=true;  
		playerOption.reciveTimeEvent=false; 
		playerOption.isVideo=true;
		playerOption.volume=0.5;

		if( jarvis.lib.mobile==true ){
			this.player.addHtmlPlayer(divID,"100%","100%",new playerDelegate(),playerOption);
		}else{
			var swfPath=jarvis.dirPath+"./lib/player/FlashPlayer.swf";
			this.player.addFlashPlayer(divID,swfPath,"100%","100%",new playerDelegate(),playerOption);
		}

		this.resize();
	},

	changeVod:function()
	{
		if(this.player==null){
			return;
		}
		
		var vodObject=new jarvis.AdaptPlayerObject();
		vodObject.vodUrl=this.data.vodPath;
		vodObject.autoPlay=false;
		this.player.changeVod(vodObject);
	},

	orientationChange : function(){
		this.resize();
	},

	loading:function(ac)
	{
		if(ac==true){
			jarvis.lib.addAttribute( this.loadingBar,"data-loading")
		}else{
			jarvis.lib.removeAttribute( this.loadingBar,"data-loading");
		}
	},
	setTextSize : function()
	{
		
		var bounceS=jarvis.lib.getAbsoluteBounce(this.shareBox);
		var bounceT=jarvis.lib.getAbsoluteBounce(this.title);
        var txtWidth=bounceS.x-bounceT.x-10;

		this.title.style.width=txtWidth+"px";
		this.date.style.width=txtWidth+"px";
         
		
	},
	getContentBounce : function()
	{
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		var bounceCT=jarvis.lib.getAbsoluteBounce(this.content);
        
        var ty=bounceCT.y-bounce.y;
		var tx=bounceCT.x-bounce.x;
			
		var w=bounce.width;
		var h=bounce.height-ty;
		
        if(this.comment!=null){
			var bounceC=jarvis.lib.getAbsoluteBounce(this.comment);
			if(this.commentMinH==0){
				this.commentMinH=bounceC.height;
			}
			
			var modifyGep=10;
			this.comment.style.height=this.commentMinH+"px";
			this.comment.iframe.style.height=(this.commentMinH-modifyGep)+"px";
			
		}
        if(this.banner!=null){
            var bounceB=jarvis.lib.getAbsoluteBounce(this.banner);

			//alert(bounceB.toString);
			h=h-bounceB.height;
		}

		return rb=new jarvis.Rectangle(tx,ty,w,h);
	},
	resize : function(h,w)
	{
		if(h!==undefined){
			this.body.style.height=h+"px";
		}
		if(w!==undefined){
			this.body.style.width=w+"px";
		}
		
		if(this.type==this.IMG && this.data.imgCash!=null){
			this.setImgSize();
		}else{
			if(this.content!=null){
				var bounce=this.getContentBounce();
				this.content.style.width=bounce.width+"px";
				this.content.style.height=bounce.height+"px";
			}
			
		}
        this.setTextSize();
        
		/*
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		var bounceB=jarvis.lib.getAbsoluteBounce(this.banner);
		var hei=(bounceB.y-bounce.y)+bounceB.height;
		var gep=hei-bounce.height;
		alert(bounceB.toString);
		if(gep>0){
		    this.content.style.height=(bounce.height-gep)+"px";
		}
        */        

	}
}