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
	
    
}

document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"css/global.css'>");
document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"css/base.css'>");
document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"css/ui.css'>");
document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/radio.css'>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"info/config.js'></script>");
	
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"lib/model/calendarinfo.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"lib/uicomponent/uislidebox.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"lib/uicomponent/uiscrollview.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"lib/uicomponent/uipagecontrol.js'></script>");

document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/menulist.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/viewer/viewer.js'></script>");


document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/mini/mini.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.featured.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.aodapps.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.appsinfo.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.board.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.list.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.schedule.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.frameviewer.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.pagemenu.js'></script>");

document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.pagetopnavi.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.pagetop.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.pagenavi.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.pagefooter.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.selectsong.js'></script>");

document.write("<script type='text/javascript' src='https://developers.kakao.com/sdk/js/kakao.min.js'></script>");

jarvis.UiSetOption=function(){
   
   this.marginX=50;
   this.marginY=260;
   this.marginShadow=2;

   this.align='LEFT';
   
   this.bgImgA=new Array();
   this.bgImgA[0]=jarvis.dirPath+"style/uiset/bg_blue.png";
   this.bgImgA[1]=jarvis.dirPath+"style/uiset/bg_white.png";

   this.cssKey="uiset";
}

jarvis.UiObject=function(name,w,h){
   
   
   if(name===undefined){
	   name="";
   }
   if(w===undefined){
	   w=300;
   }
   if(h===undefined){
	   h=530;
   }
   
   this.name=name;
   this.id="";
   this.option=undefined;
   
   this.orgWidth=w;
   this.orgHeight=h;
   
   this.initWidth=w;
   this.initHeight=h;

   this.width=w;
   this.height=h;
   
   this.backGround=null;
   this.dynamicSize=true;
   this.marginFull=0;
   this.fixSize=false;
  
   this.isInit=false;
   this.x=0;
   this.y=0;
   this.lineIndex=0;
   this.currentLineIndex=-1;
   this.hasShadow=true;

   
   
}

jarvis.UiSet= function(pageID,datas,option) 
{

	this.body;
	
	this.browserHeight=0;
    if(datas===undefined){
		datas=null;
	}

	if(pageID===undefined){
	   this.body=document.body;
	}else{
	   this.body=document.getElementById(pageID);
	}
	
    this.option=option;
	if(this.option===undefined){
	   this.option=new jarvis.UiSetOption();
	}
    
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
    
	jarvis.uiSet=this;
	this.onAirPlayer=null;
	this.playerAutoPlay=null;
	this.menuAPI=jarvis.config.API_RADIO_MENU;
    this.info=jarvis.jarvisInfo;
	this.info.init();
    this.apiPath;
	this.isPageChanging=false;
    this.initParam=null;
	this.openPopupSeq="";
	this.minfo=jarvis.miniInfo;
	this.minfo.init();
    if(jarvis.lib.mobile==true){
		Kakao.init('33823c9e3d9293990352da3f4ba1aa97');
	}
	this.uiStartPosX=0;
	this.isPhone=jarvis.lib.isPhone();
	this.isOpenList=false;
    
	this.aniID=this.option.cssKey+"ANIID";
	this.slideSpd=0.4;
	this.bgA=new Array();
    this.changeBg(this.option.bgImgA);
    this.eventBox=null;
	this.uiBox=document.createElement("div");
    jarvis.lib.addAttribute(this.uiBox,"ui-box body-size");
    this.body.appendChild(this.uiBox);
    this.dimed=document.createElement("div");
    jarvis.lib.addAttribute(this.dimed,"dimed" );
    this.body.appendChild(this.dimed);
    
    this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading loading-bar");
    this.body.appendChild(this.loadingBar);		

    var menuBox=document.createElement("div");
    this.body.appendChild(menuBox);
   
	var that=this;
	var delegate=function(){}; 
			delegate.prototype = {
		                      closeMenu : function()
                              {
								  
								  that.closeList();
							  },
							  goHome: function()
                              {
								  
								  that.changeHome();
							  },
							  listClick : function(code)
                              {
								  that.changePage(code);
								
							  }
						 }

	
    this.menuList=new jarvis.MenuList(menuBox,null,new delegate());		
    
	
	this.uiSetA=new Array();
	this.uiNameA=new Array();
	this.uiClassA=new Array();
	this.shadowA=new Array();
    this.colorSetBlue=new Array()
    this.colorSetIvory=new Array();
	this.colorSetWhite=new Array();

	
	//title
    this.colorSetBlue[0]="#ffffff";
    this.colorSetIvory[0]="#636363";
	this.colorSetWhite[0]="#636363";
    //text
    this.colorSetBlue[1]="#b2cef4";
    this.colorSetIvory[1]="#636363";
	this.colorSetWhite[1]="#636363";
    //bg
	this.colorSetBlue[2]="bg-black30";
    this.colorSetIvory[2]="bg-white-border";
	this.colorSetWhite[2]="bg-white-border";

	//pagecontrol(pagecontrol-gray true false)
	this.colorSetBlue[3]=false;
    this.colorSetIvory[3]=true;
	this.colorSetWhite[3]=true;

	this.colorSetA=new Array();
	this.colorSetA[0]=this.colorSetBlue;
	this.colorSetA[1]=this.colorSetIvory;
	this.colorSetA[2]=this.colorSetWhite;
    
    
	this.pages=null;
    if(datas!=null){
		this.setPage(datas);
	}
	this.viewer=null;
    this.isHome=false;
    this.HOME_URL=jarvis.config.API_PAGE_DATA+"home.js";
    
}



jarvis.UiSet.prototype = 
{
     
	
	
	init : function()
	{
		
		var that=this;
	    this.menuList.init();
		this.menuList.setMenuPosition(this.getListGep());
       
		var gestureDelegate=function(){}; 
				gestureDelegate.prototype = {
		                      gestureComplete: function(e){
								if(e==jarvis.GestureElement.PAN_LEFT){
								     that.closeList();
								}
							  }
							  
				}
		var gestureElement=new  jarvis.GestureElement( this.dimed,new gestureDelegate(),false,true);
        jarvis.lib.addEventListener(this.dimed,"click",function (e){ that.closeList();});
        jarvis.lib.addEventListener(window,"scroll",function (e){ that.scrolling(e); });    
        jarvis.lib.addEventListener(window,"hashchange",function (e){ that.hashChange(e); });    
        

    },
	sendKakaoLink : function (msg) {
      
		Kakao.Link.sendTalkLink(
			{
				label: msg
			}
		);
    },

	changeBg : function(bgImgA)
	{
		var bgLen=bgImgA.length;
		var len=this.bgA.length;
		var bg;
        if(len>bgLen){
		   for(var i=bgLen;i<len;++i){
		       bg=this.bgA[i];
		       this.body.removeChild(bg);
		   }
		
		}
        var bgA=new Array();
		for(var i=0;i<bgLen;++i){
			if(i<len){
			   bg=this.bgA[i];
			}else{
			   bg=document.createElement("div");
			   this.body.appendChild(bg);
			}

            if(bgImgA[i].indexOf("#")!=-1){
			    if(bg.img!=null){
				    bg.removeChild(bg.img);
					bg.img=null;
				}else{
				
				}
				bg.style.background=bgImgA[i];
			}else{
			    if(bg.img!=null){
				    
				}else{
				    bg.img=document.createElement("img");
					jarvis.lib.addAttribute(bg,"bg");
					bg.appendChild(bg.img);
				} 
				bg.style.background="";
				   
			}


			bgA.push(bg);
			if(bg.img!=null){
				if(bg.img.src!=bgImgA[i]){
					bg.img.src=bgImgA[i];
				}
			}
		}

        

        this.bgA=bgA;
        
        if(this.isHome==true){
			this.openEvent();
		}else{
			this.closeEvent();
		}

	},
	changeHome : function(param)
	{
        if(jarvis.mini!=null){
		   jarvis.mini.closeAod();
		}
		this.changePage(this.HOME_URL,param);

	},

	openEvent : function()
	{
        
		//this.eventBox=document.createElement("div");
		//jarvis.lib.addAttribute(this.eventBox,"event-box");
		//this.body.appendChild(this.eventBox);
        


	},
	closeEvent : function()
	{
        if(this.eventBox!=null){
			
			this.body.removeChild(this.eventBox);
			this.eventBox=null;
			
		}
	},
	hashChange : function(e)
	{
     
		
		var apiPath=location.hash.replace("#","");
		//alert(apiPath);
		if(apiPath=="" ){
		   return;
		}
		if(apiPath.indexOf(".js")==-1 ){
		   return;
		}
		apiPath= decodeURIComponent(apiPath)
		this.changePageStart(apiPath);
	},
	initSetting : function(param)
	{
		this.initParam=param;
	},
	changePage : function(apiPath,param)
	{
        if(this.HOME_URL==apiPath){
			this.isHome=true;
		}else{
			this.isHome=false;
		}
		
		apiPath= decodeURIComponent(apiPath)
		this.initSetting(param);
		
        if(jarvis.jarvisInfo.ieVS<=7 && jarvis.jarvisInfo.ieVS!=-1){
		    this.changePageStart(apiPath,param);
		    return;
		}

		if(apiPath==""){
		    return;
		}
		
		if(this.isPageChanging==true){
		    return;
		}

        if(apiPath==this.apiPath){
		    this.changePageStart(apiPath);
		}else{
		    top.location.href="#"+apiPath;
		}
        



	},
	changePageStart : function(apiPath,param)
	{
        if(apiPath==""){
		    return;
		}

		if(this.HOME_URL==apiPath){
			this.isHome=true;
		}else{
			this.isHome=false;
		}
		if(this.info.isMobile==true){
			addBanner();
		}
        addBanner();
        if(param!=undefined && param!=null){
		   this.initParam=param;
	    }
        

		if(this.isPageChanging==true){
		    return;
		}
		this.loading(true);
		
		window.onmousewheel = document.onmousewheel = null;
		this.isPageChanging=true;
		this.menuList.loading(true);
        
       // alert("loadstart");
        this.apiPath=apiPath;
        var ajax=new jarvis.Ajax();
        ajax.request(apiPath,null,"jarvis.uiSet.jarvisPageDataLoadComplete","POST","jsonp");

	},

	getCardOrgPositionInfo : function()
	{
        var orgInfo=new Object();
        var isMoblile=this.info.isMobile;
		var isPhone=this.info.isPhone;

		
		var dynamicSize;
		var hasShadow;
		var orgW=300;
		var orgH=450;
		var orgH_S=250;
		var w;
		var h;
		
		if(isMoblile==true){
			if(isPhone==true){
				
				dynamicSize=true;
				hasShadow=false;
				w=jarvis.lib.getAbsoluteBounce(document.body).width-(this.option.marginX*2)
				h=Math.floor(w*orgH/orgW);
			}else{
				
				dynamicSize=false;
				hasShadow=true;
				w=orgW;
				h=orgH;
			}
			
		}else{
	
			dynamicSize=false;
			hasShadow=true;
			w=orgW;
			h=orgH;
		}
		orgInfo.mgX=this.option.marginX;
		orgInfo.mgY=this.option.marginY;
		orgInfo.dynamicSize=dynamicSize;
		orgInfo.hasShadow=hasShadow;
		orgInfo.orgW=orgW;
		orgInfo.orgH=orgH;
		orgInfo.orgH_S=orgH_S;
		orgInfo.w=w;
		orgInfo.h=h;
		return orgInfo;

	},
	jarvisPageDataLoadComplete :function(json){
		
		//alert("jarvisPageDataLoadComplete");
		window.scrollTo(0,0);
		//jarvis.lib.setCookie(jarvis.config.PAGE_API_KEY,this.apiPath);
		if(json.bgSetA!=null){
			
			
			if(this.info.isPhone==true && json.bgSetMA!=null){
			    this.changeBg(json.bgSetMA);
			}else{
			    this.changeBg(json.bgSetA);
			}
			
		}

        var backGround;
		
        if(this.info.isPhone==true){
			if(json.backGroundM!=null)
			{
			   backGround=json.backGroundM;
			}else{
			    if(json.backGround!=null)
			    {
					backGround=json.backGround;
				}else{
				    backGround="#fff";
				}
			
			}
		}else{
			if(backGround==null)
			{
			   backGround="#fff";
			}else{
			   backGround=json.backGround;
			}
		}
		
		document.body.style.background= backGround;
		
		this.colorSetA=new Array();
        
		/*
		if(json.programGroupID!=null){
			
			if(jarvis.mini!=null){
				if(json.programGroupID==""){
				    
				}else{
				    jarvis.mini.openAod(json.programGroupID);//
				}
				
			}

		}*/
		if(this.info.isPhone==true && json.colorSetMA!=null){
			this.colorSetA[0]=json.colorSetMA;
		}else{
			this.colorSetA[0]=json.colorSetA;
		}
		if(this.info.isPhone==true && json.colorSetMB!=null){
			this.colorSetA[1]=json.colorSetMB;
		}else{
			this.colorSetA[1]=json.colorSetB;
		}
		if(this.info.isPhone==true && json.colorSetMC!=null){
			this.colorSetA[2]=json.colorSetMC;
		}else{
			this.colorSetA[2]=json.colorSetC;
		}
		

	    

		this.loading(false);
		this.isPageChanging=false;
		this.menuList.loading(false);
	    
		var isMoblile=jarvis.lib.isMobile();
		var isPhone=jarvis.lib.isPhone();
        var orgInfo=this.getCardOrgPositionInfo();
		var mgX=orgInfo.mgX;
		var mgY=orgInfo.mgY;
		var dynamicSize=orgInfo.dynamicSize;
		var hasShadow=orgInfo.hasShadow;
		var orgW=orgInfo.orgW;
		var orgH=orgInfo.orgH;
		var orgH_S=orgInfo.orgH_S;
		var w=orgInfo.w;
		var h=orgInfo.h;
		
		


	   var pages=json.datas;
	   var datas=new Array();
	   var data=null;
	   var page=null;
	   var wid;
	   var hei;
	   for(var i=0;i<pages.length;++i){
	        page=pages[i];
			
			if(isPhone==true){
				if(page.widM!=null)
				{
					wid=page.widM;
				}else if(page.wid!=null)
				{
					wid=page.wid;
				}else
				{
					wid=w;
				}
				
				if(page.heiM!=null)
				{
					hei=page.heiM;
				}else if(page.hei!=null)
				{
					hei=page.hei;
				}else
				{
					hei=h;
				}

			
			
			}else{
				if(page.wid!=null){
					wid=page.wid;
				}else{
					wid=w;
				}
				
				if(page.hei!=null){
					hei=page.hei;
				}else{
					hei=h;
				}
			
			
			}
			data=new jarvis.UiObject(page.className,wid,hei);
			
			if(page.marginFull!=null){
				data.marginFull=page.marginFull;
			}else{
			    
			}
			if(page.fixSize!=null){
				data.fixSize=page.fixSize;
			}else{
			   
			}
			if(page.dynamicSize!=null){
				data.dynamicSize=page.dynamicSize;
			}else{
			    data.dynamicSize=dynamicSize;
			}
		    if(page.hasShadow!=null){
				data.hasShadow=page.hasShadow;
			}else{
			    data.hasShadow=hasShadow;
			}
			if(page.backGround!=null){
				data.backGround=page.backGround;
			}else{
			    data.backGround=null;
			}
			data.option=new jarvis[page.className+"Option"]();
            jarvis.lib.overrideObject(data.option,page.option);
			datas.push(data);
	       
	   }

       this.setPage(datas);
	   this.resize(undefined,true);
	   this.closeList();	

       //top.location.href="#";
	
	},
    setPage : function(datas)
	{
        
		var channel="";
		var service="";
		var program="";
        
		this.uiDataA=datas;
		var ui;
		var uiClass;
		var data;
		var classStr;
		var idx;
        
		var ucA=new Array();
        var usA=new Array();
		var unA=new Array();
        var shadow;
        for(var i=0;i<this.shadowA.length;++i){
		    shadow=this.shadowA[i];
			if(shadow!=null){
				this.uiBox.removeChild(shadow);
			}
		}
        this.shadowA=new Array();
        var listWid;

		if( this.isOpenList==true){
			 listWid=this.getListWidth();
			 
		}else{
		     listWid=0;
			 
		}
		var vs=jarvis.lib.getIEVersion();
		for(var i=0;i<datas.length;++i){
			data=datas[i];
			if(data.name!=""){
				idx=this.uiNameA.indexOf(data.name);
                if(data.name=="FrameViewer"){
				    idx=-1;
				}

				if(idx!=-1){
					ui=this.uiSetA[idx];
					delete this.uiNameA[idx];
				}else{
					ui=document.createElement("div");
					this.uiBox.appendChild(ui);
				}
				
                if(data.backGround==null){
				    ui.style.background="";
					if(vs<9 && vs!=-1){
					    ui.style.filter="";
					}
				}else{
					ui.style.background=data.backGround;
                    
				}

				unA.push(data.name)
				usA.push(ui)
				jarvis.lib.addAttribute( ui,"ui");
				ui.style.zIndex=1000+(i*100);
				
				if(idx!=-1){
				   uiClass = this.uiClassA[idx];
				   if(uiClass.reset){
						uiClass.reset(data.option);
				   }
			    }else{
			        
				   uiClass = new jarvis[data.name](ui,data.option);
				   if(uiClass.moveUI){
						uiClass.moveUI(listWid,false);
				   }
				   if(uiClass.initSetting){
				       uiClass.addParam(this.initParam);
				   }else{
				      uiClass.init();
				   }
				   
			    }
			    ucA.push(uiClass);
				   
				
				if(data.hasShadow==true){
				   this.shadowA[i]=document.createElement("div");
				   
				   jarvis.lib.addAttribute(this.shadowA[i],"ui-shadow");
				   this.uiBox.appendChild(this.shadowA[i]);
				}else{
				   this.shadowA[i]=null;
				}
			}
		}
        
	    for(var i=0;i<this.uiClassA.length;++i){
            idx=ucA.indexOf(this.uiClassA[i]);
			if(idx==-1){
			   this.uiClassA[i].remove();
               this.uiBox.removeChild(this.uiSetA[i]);
			}
		}
		this.uiNameA=unA;
		this.uiClassA=ucA;
        this.uiSetA=usA;

	},
	getListGep: function()
	{
		if(jarvis.lib.mobile==true){
			 return this.option.marginX;
		}else{
			 return 10;
		}
	},

	getListWidth: function()
	{
		var bounce=jarvis.lib.getAbsoluteBounce(this.uiBox);
	    var tw=Math.floor(bounce.width*0.9);
        if(tw>320){
		   tw=320;
	    }
		return tw;
	},
	getViewerSize: function(isVod)
	{
		
		if(isVod===undefined){
		    isVod=false;
		}
		
		
		var pos=new Rectangle();
	
		var scrBounce= jarvis.lib.getDocumentScrollBounce();
	    var bounce=jarvis.lib.getAbsoluteBounce(this.body);
	    
		var w=scrBounce.width;
		var h;
		var gep=150;
		if(isVod==false){
		   h=scrBounce.height;
		}else{
		   h=Math.floor(w*jarvis.config.IMAGE_SCALE_HD)+gep;
		}

		if(jarvis.lib.mobile==false){
			var maxW=720;
	        var maxH=1200;
			if(w>=maxW){
				w=maxW;
				if(isVod==true){
					h=Math.floor(w*jarvis.config.IMAGE_SCALE_HD)+gep;
				}
			}
			if(h>=maxH){
				h=maxH;
				if(isVod==true){
                   w=(( h-gep)/jarvis.config.IMAGE_SCALE_HD);
				}
			}
		}
	    var ty=Math.floor(scrBounce.y-bounce.y)+Math.floor(((scrBounce.height)-h)/2);
		if(ty<0){
		    h=h+ty;
			ty=0;
		}
		var btg=(ty+h)-(bounce.height);
		
		if(btg>0){
		   h=h-btg;
		}
		pos.x=Math.floor((scrBounce.width-w)/2);
		pos.y=ty;
		pos.width=Math.floor(w);
		pos.height=Math.floor(h);
		return pos;

	},
	checkOpenViewer: function(datas,isVod)
	{
        //alert("this.openPopupSeq : "+this.openPopupSeq);
		if(this.openPopupSeq==""){
		   return;
		}
		var data;
		for(var i=0;i<datas.length;++i){
		   data=datas[i];
		   if(data.seq==this.openPopupSeq){
		       this.openPopupSeq="";
               
			   this.openViewer(datas,i,new jarvis.Rectangle(100,100,150,150),isVod,false);
		       return;
		   }
		
		}

	},
	openViewer: function(datas,pageIdx,rect,isVod,isAni)
	{
		if(this.isPageChanging==true){
		    return;
		}
		
		if(isVod===undefined){
		    isVod=false;
		}
		if(this.viewer!=null){
		    return;
		}
		
        if(isVod==true){
			
		   if(this.onAirPlayer!=null && this.onAirPlayer.stopVod){
		       this.playerAutoPlay=this.onAirPlayer.isPlay;
			   this.onAirPlayer.stopVod();
		   }
		}

		var that=this;
		var delegate=function(){}
		delegate.prototype = 
		{
			closeViewer : function(){
			    that.closeViewer();
			},   
			changeViewer : function(idx){
			}   
	
		}
		if(isAni==undefined){
		   if(jarvis.lib.isIE()==false && jarvis.lib.mobile==false){
				isAni=true;
		   }else{
		        isAni=false;
		   }
		}
		

		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		
		
		var div=document.createElement("div");
		var pos=this.getViewerSize(isVod);
		if(isAni==true){
			div.style.left=rect.x+"px";
			div.style.top=rect.y+"px";
			div.style.width=rect.width+"px";
			div.style.height=rect.height+"px";
		}else{
		    div.style.left=pos.x+"px";
		    div.style.top=pos.y+"px";
		    div.style.width=pos.width+"px";
		    div.style.height=pos.height+"px";
		}
	    this.body.appendChild(div);
		
		this.setDimed(true);
        this.viewer=new jarvis.Viewer(div,null,new delegate(),isVod);
        
        

        if(isAni==true){
            
             
            if(rect===undefined){
				var scrBounce= jarvis.lib.getDocumentScrollBounce();
				rect=new jarvis.Rectangle((bounce.width/2)-50,(scrBounce.height/2)-50+scrBounce.y,100,100);
			}else{
			    var bounce=jarvis.lib.getAbsoluteBounce(this.body);
			    rect.x=rect.x-bounce.x;
				rect.y=rect.y-bounce.y;
				
			}
			
            this.viewer.returnRect=rect;
           
			jarvis.config.isAnimation=true;
			var aniDelegate=function(){};
			aniDelegate.prototype = {
				 complete : function(e)
				 {
					
					jarvis.config.isAnimation=false;
					that.viewer.init()
					that.viewer.openViewer(datas,pageIdx);
					
				 }
			}
			var easev="ease-out";
			jarvis.animation.startAnimation(this.viewer.body.style, { 
			                                                       listener: this.viewer.body, 
			                                                       duration:this.slideSpd, 
								
																   top:pos.y, left:pos.x,
																   width:pos.width,height:pos.height, 
																   ease:easev ,isPx:true},new aniDelegate());
	   }else{
	       this.viewer.returnRect=rect;
           this.viewer.init()
		   this.viewer.openViewer(datas,pageIdx);
		   
	   }
	
	},

	closeViewer: function()
	{
		if(this.isPageChanging==true){
		    return;
		}
		
		this.viewer.viewBox.removeChild(this.viewer.contentBox);
		var pos=this.viewer.returnRect;
		var that=this;
		this.setDimed(false);
		
        if(this.onAirPlayer!=null && this.onAirPlayer.playVod && this.playerAutoPlay==true){
		       this.playerAutoPlay=false;
			   this.onAirPlayer.playVod();
		}

		if(jarvis.lib.isIE()==false && jarvis.lib.mobile==false){
			jarvis.config.isAnimation=true;
			var aniDelegate=function(){};
			aniDelegate.prototype = {
				 complete : function(e)
				 {
					jarvis.config.isAnimation=false;
					that.viewer.removeViewer()
					that.viewer=null;
					
					
				 }
			}
			var easev="ease-in";
			jarvis.animation.startAnimation(this.viewer.body.style, { 
			                                                       listener:this.viewer.body, 
			                                                       duration:this.slideSpd, 
																   top:pos.y, left:pos.x, 
																  
																   width:pos.width,height:pos.height,  
																   ease:easev ,isPx:true},new aniDelegate());
		}else{
		    that.viewer.removeViewer()
			that.viewer=null;
		
		
		}




	},
	setViewerPosition : function()
	{
		    
		if(this.viewer!=null){
		    var pos=this.getViewerSize(this.viewer.isVod);
			this.viewer.body.style.left=pos.x+"px";
			this.viewer.body.style.top=pos.y+"px";
			this.viewer.body.style.width=pos.width+"px";
			this.viewer.body.style.height=pos.height+"px";
			this.viewer.resize();
		}	
		
	},
	openList: function(datas,title)
	{
	    var type;
		
		if(datas===undefined){
		   type=this.menuList.MAIN_TYPE
		}else{
		   type=this.menuList.SUB_TYPE  
		}
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		var w=this.getListWidth();
        var tw=w+this.getListGep();

		if(this.isOpenList==true){
			if(type==this.menuList.type){
			    this.closeList();
			}else{
				this.menuList.body.style.display="block";
				this.menuList.resize(Math.floor(bounce.height),tw,w);
			    if(type==this.menuList.MAIN_TYPE){
				    this.menuList.loadData(this.menuAPI);
				}else{
				    this.menuList.setData(datas,title);
				}
			    window.scrollTo(0,0);
			}
			
			
		}else{
			if(type!=this.menuList.type){
				this.menuList.reset();
			}
	        
			this.isOpenList=true;
		    var that=this;
            
         
			this.menuList.body.style.display="block";
			this.menuList.resize(Math.floor(bounce.height),0,w);
			jarvis.animation.stopAnimation(this.aniID);
			jarvis.config.isAnimation=true;
			this.setDimed(true);
            
			var easev="ease out";
            jarvis.animation.animationCSS.setAnimationProperty(this.menuList.body.style,"property","width");
		    jarvis.animation.animationCSS.setAnimationProperty(this.menuList.body.style,"fill-mode","both");
		    jarvis.animation.animationCSS.setAnimationProperty(this.menuList.body.style,"duration",this.slideSpd+"s");
		    jarvis.animation.animationCSS.setAnimationProperty(this.menuList.body,"timing-function",easev);


			var aniDelegate=function(){};
		    aniDelegate.prototype = {
				 complete : function(e)
				 {
					jarvis.config.isAnimation=false;
					if(type==that.menuList.MAIN_TYPE){
						that.menuList.loadData(that.menuAPI);
					}else{
						that.menuList.setData(datas,title);
					}
					 window.scrollTo(0,0);
				 }
		     }
			 
			 
			 jarvis.animation.startAnimation(this.menuList.body.style, {id:that.aniID,staticProp:true, listener:that.menuList.body, duration:that.slideSpd, width:tw, ease:easev ,isPx:true},new aniDelegate());
			 this.moveUI();
		}
    },
	closeList: function()
	{
		if(this.viewer!=null) {  
           this.closeViewer();
		}


		if(this.isOpenList==true) {  
			 var that=this;
			 this.isOpenList=false;
		     jarvis.animation.stopAnimation(this.aniID);
		     jarvis.config.isAnimation=true;
			 
			 var bounce=jarvis.lib.getAbsoluteBounce(this.menuList.body);
			 
			 var aniDelegate=function(){};
			 aniDelegate.prototype = {
				 complete : function(e)
				 {
					that.menuList.body.style.display="none";
					that.setDimed(false);
					jarvis.config.isAnimation=false;
					
					
				 }
		     }
			 var easev="ease in";
			 jarvis.animation.startAnimation(this.menuList.body.style, {id:this.aniID,staticProp:true, listener:that.menuList.body, duration:that.slideSpd, width:0, ease:easev ,isPx:true},new aniDelegate());
			 this.moveUI();
		}

    },
	getUIPosition: function(tx,cx,idx,dynamicSize)
	{ 
		if(dynamicSize=="full"){
		   return tx;
		}
		
		if(cx==0){
		    return tx;
		}
		var gep=this.option.marginX*(idx+1)/2;
		var pos= Math.floor(tx+cx+gep);///(1+idx)
		return pos;

	},
	moveUI : function(){
	    var ui;
		var shadow;
		var uidata;
		var tx;
		var listWid;
		var idx=0;
		var lineIndex=0;
		var easev;
		if( this.isOpenList==true){
			 listWid=this.getListWidth();
			 easev="ease in";
		}else{
		     listWid=0;
			 easev="ease in";
		}
        var aniID;
		var staticProp;
	    
		staticProp=false; 
		var num=this.uiDataA.length;
		if(this.isPhone==true){
		    num=0;
		}else{
		    num=this.uiDataA.length;
		}
		var spd;
		for(var i=0;i<this.uiDataA.length;++i){
			ui=this.uiSetA[i];
			uidata=this.uiDataA[i];
            if(uidata.dynamicSize=="full"){
			    if(this.uiClassA[i].moveUI){
					this.uiClassA[i].moveUI(listWid,true);
				}
			}else{
				shadow=this.shadowA[i];
				if(lineIndex!=uidata.currentLineIndex){
					idx=0;
					lineIndex=uidata.currentLineIndex;
				}
				aniID=this.aniID+i;
				tx=this.getUIPosition(uidata.x,listWid,idx,uidata.dynamicSize);
				spd= this.slideSpd+(idx/10);
				idx++;
				jarvis.animation.stopAnimation(aniID);
				
				if(i<num){
					if(ui!=null){
						jarvis.animation.startAnimation(ui.style, {id:aniID, listener:ui, duration:spd, left:tx, ease:easev ,isPx:true, staticProp:staticProp});
					}
					if(shadow!=null){
						jarvis.animation.startAnimation(shadow.style, {id:aniID, listener:ui, duration:spd, left:tx, ease:easev ,isPx:true, staticProp:staticProp});
					}
				}else{
					if(ui!=null){
						ui.style.left=tx+'px';
					}
					if(shadow!=null){
						shadow.style.left=tx+'px';
					}
				}
			
			}

		    
        }
	
	},
    orientationChange : function(){
		var uiClass;
		for(var i=0;i<this.uiClassA.length;++i){
			uiClass = this.uiClassA[i];
			uiClass.orientationChange();
		}
		if(this.isOpenList==true){
			this.menuList.orientationChange();
		}
		this.setViewerPosition();
	},
	
	scrolling : function(e)
	{
		
	},
    loading:function(ac)
	{
       if(ac==true){
		   this.setDimed(true);
		   jarvis.lib.addAttribute( this.loadingBar,"data-loading")
           
		   var scrBounce= jarvis.lib.getDocumentScrollBounce();
		   this.loadingBar.style.left=(scrBounce.width/2)+"px";
		   this.loadingBar.style.top=(scrBounce.y+(scrBounce.height/2))+"px";
		   
           

	   }else{
		   if(this.isOpenList!=true){
				this.setDimed(false);
		   }
		   jarvis.lib.removeAttribute( this.loadingBar,"data-loading");
           
			   
	   }
	},
	setDimed:function(ac)
	{
		
		if(jarvis.lib.isIE()==false){
			var that=this;
			var al;
			if(ac==true){
				al=1;
				this.dimed.style.display="block";
			}else{
				al=0;
			}
			

			var aniDelegate=function(){};
				aniDelegate.prototype = {
					 complete : function(e)
					 {
						if(ac==false){
						   that.dimed.style.display="none";
						}
					 }
				}
		
				jarvis.animation.startAnimation(this.dimed.style, { 
																	   listener: that.dimed, 
																	   duration:0.3, 
																	   opacity:al,
																	   staticProp:true,
																	   ease:"ease-in" ,isPx:false},new aniDelegate());
		}else{
		    if(ac==true){
				
				this.dimed.style.display="block";
			}else{
				this.dimed.style.display="none";
			}
		
		}
	},
	resize : function(browserHeight,isReset){
	  
		if(browserHeight!==undefined){
			this.browserHeight=browserHeight;
		}
		if(isReset!==undefined){
			isReset=false;
		}
        this.setViewerPosition();
		var that=this;

        
		var bounceP=jarvis.lib.getAbsoluteBounce(this.body);
		
		this.uiBox.style.width=Math.floor(bounceP.width-(this.option.marginX*2))+"px";
		var bounce=jarvis.lib.getAbsoluteBounce(this.uiBox);
        
        if(this.uiDataA==null){
		    return;
		}
        var mw=bounce.width;
		var mh=bounce.height;
        if(mw>=10000 || mw<=0){
		    return;
		}
		
		var bgNum=0;
		
        var posF=new Point();
        var dataA=new Array();
		var classA=new Array();
		var mx=this.option.marginX;
		var my=this.option.marginY;

		var gx=0;
		var tx=0;
	
		var firstTX=-1;
		var ty=Math.floor(my/2);
        var h=0;
        
		var uidata;
		var uiclass;
		var sc;
        var lineIndex=0;
        var orgInfo=null;
		for(var i=0;i<this.uiDataA.length;++i){
			uidata=this.uiDataA[i];
			uiclass=this.uiClassA[i];
			
			if(uidata.dynamicSize=="full")
			{
                 if(dataA.length>0){
				    h=changeSize(dataA,h,posF,classA)
					ty=ty+h+my;
				
				 }
				 var posX=Math.floor((bounceP.width-bounce.width)/2);
				 uidata.width=bounceP.width;
				 if(uidata.fixSize=="auto"){
				     if(this.uiClassA[i].getHeight){
						uidata.height=uiclass.getHeight(uidata.width);
					 }else{
					    uidata.height=uidata.orgHeight;
					 }
				     
				 }else{
				     uidata.height=uidata.orgHeight;
				 }
				 
				 ty=ty-Math.floor(my/2)+uidata.marginFull;
				 uidata.x=-posX;
				 uidata.y=ty;
				 uidata.lineIndex=-1;
				 ty=ty+uidata.height+Math.floor(my/2)+uidata.marginFull;	
				 h=0;
				 tx=0;

                 dataA=new Array();
                 classA=new Array();
				 posF.x=0;
				 posF.y=ty;
				 firstTX=-1;

			}else{
				if(uidata.initWidth>mw){
					sc=uidata.orgHeight/uidata.orgWidth;
					uidata.orgWidth=mw;
					if(uidata.fixSize==false){
						uidata.orgHeight=mw*sc;
					}
				}else{
				    uidata.orgWidth=uidata.initWidth;
					uidata.orgHeight=uidata.initHeight;
				}
				
                if(uidata.orgWidth==0){
				   tx=mw;
				}else{
				   tx=tx+uidata.orgWidth;
				}
				
				if(tx>mw){
				   if(posF.x>mw){
				      posF.x=mw;
				   } 
				   h=changeSize(dataA,h,posF,classA)
				   ty=ty+h+my;
				   h=uidata.orgHeight;
				   tx=uidata.orgWidth;
				   
				   posF.x=tx;
				   posF.y=ty;
					
				   dataA=new Array();
				   classA=new Array();
				  
				}else{
				   if(h==0){
					  h=uidata.orgHeight;
				   }else if(uidata.orgHeight>h){
					  h=uidata.orgHeight;
				   }
				   posF.x=tx;
				   posF.y=ty;
				  
				}
				dataA.push(uidata);
				classA.push(uiclass);
				tx=tx+mx;
			}
		}


		if(gx==0){
			gx=mx;
		}
		if(dataA==null || dataA.length<1){
		    h=0;
			if(uidata!=null && uidata.dynamicSize=="full"){
			    h=-Math.floor(this.option.marginY);
			}
		}else{
		    h=changeSize(dataA,h,posF);
		}
        
        

	    if(bgNum<this.bgA.length){
		    for(i=bgNum;i<this.bgA.length;++i){
				 var bg=this.bgA[i];
				 bg.style.top="0px";
				 bg.style.height="0px";
                 if(bg.img!=null){
					bg.img.width=0;
					bg.img.height=0;
				 }
			}
		}
        var ui;
		var shadow;
		var uiClass;

        var menuWid=this.getListWidth();
		var listWid;
		if( this.isOpenList==true){
			 listWid=menuWid;
		}else{
		     listWid=0;
		}
        var uipos;
		var lineCheck=0;
		var uiidx=0;
		
        for(i=0;i<this.uiDataA.length;++i){
	         uidata=this.uiDataA[i];
			 uiClass=this.uiClassA[i];
			 
			 shadow=this.shadowA[i]
			 ui=this.uiSetA[i];
		     ui.style.width=uidata.width+"px";
			 ui.style.height=uidata.height+"px";
			 if(lineCheck!=uidata.lineIndex || uidata.lineIndex==-1){
			    uiidx=0;
				lineCheck=uidata.lineIndex;
				
				
			 }
			 uipos=this.getUIPosition(uidata.x,listWid,uiidx,uidata.dynamicSize);
			 uiidx++;
		     ui.style.left=uipos+"px";
			 ui.style.top=uidata.y+"px";
			 if(shadow!=null){
			     shadow.style.width=uidata.width+"px";
				 shadow.style.left=uipos+"px";
				 shadow.style.top=(uidata.y+uidata.height+this.option.marginShadow)+"px";
				 
				 
			 }
           
			 
			 if(uiClass!=null){
			     uiClass.resize();
			 }
			 try{
				
                if(uidata.currentLineIndex!=uidata.lineIndex || isReset==true){
					
					uidata.currentLineIndex=uidata.lineIndex;
					switch(uidata.lineIndex){
						case -1:
							break;
						case 0:
							uiClass.changeColor(this.colorSetA[0]);
							break;
						case 1:
							uiClass.changeColor(this.colorSetA[1]);
							break;
						default:
							uiClass.changeColor(this.colorSetA[2]);
							break;
				
					}
					
				}
			 }catch(e){
			 
			 }
			 
		}
		ty=(ty+h+Math.floor(this.option.marginY/2));
		
        this.body.style.height=Math.floor(ty)+"px";

		var menuGep=this.getListGep();
		this.menuList.body.style.left=(bounce.x-menuGep)+"px";
		if(this.isOpenList==true){
			this.menuList.resize(Math.floor(ty),listWid+menuGep,menuWid);
		}
		
		function changeSize(arr,hei,pos,arrC){
			var sx=0;
			var sh=0;
			var num=arr.length;
			if(num<1){
			   return;
			}else if(num==1){
			    h=arr[0].orgHeight;
			}
			var dynimicNum=0;
			var amountW=0
			var uidata;
            for(var i=0;i<arr.length;++i){
                uidata=arr[i];
				if(uidata.dynamicSize==true){
				   dynimicNum++;
				}
				if(i==0){
				    amountW=uidata.orgWidth;
				}else{
				    amountW=amountW+uidata.orgWidth+mx;
				}
				if(uidata.hasShadow==true){
				    sh=20;
				}
				
			}
            
			
			if(dynimicNum==0){
			    
				if(that.option.align=="CENTER"){
					sx=Math.floor((mw-pos.x)/2);
					gx=mx;
				
				}else if(that.option.align=="LEFT"){
					if(firstTX==-1){
					   sx=Math.floor((mw-pos.x)/2);
					   firstTX=sx;
					   
					}else{
					   sx=firstTX;
					}
				
					gx=mx;
				}else{
					sx=0;
				    if(gx==0){
					   gx=mx+Math.floor((mw-amountW)/(arr.length-1))
					}
					  
				}
				amountW=0;
			}else{
				if(firstTX==-1){
					firstTX=0;
				}
			    gx=mx;
				amountW=Math.floor((mw-amountW)/dynimicNum);
			}	
			
			var uidata;
			var wid;
			var isResetHei=false;
			var resetHei=0;
			for(i=0;i<arr.length;++i){
				uidata=arr[i]
				uidata.lineIndex=lineIndex;
                if(i==0 && lineIndex==0){
					
				   that.uiStartPosX=sx;
				}
				uidata.x=sx;
				
				uidata.y=pos.y;
				if(uidata.dynamicSize==true){
				   wid=uidata.orgWidth+amountW;
				   if(arr.length==1 && uidata.fixSize==false){
				      hei=uidata.orgHeight*wid/uidata.orgWidth;
				   }
				}else{
				   wid=uidata.orgWidth;
				 
				}
				
				uidata.width=wid;
                if(uidata.fixSize=="auto"){
				    
					if(arrC[i].getHeight){
						resetHei=arrC[i].getHeight(uidata.width);
					}else{
					    resetHei=hei;
					}
					if(resetHei>hei){
						isResetHei=true;
						hei=resetHei;
					}
				}
				uidata.height=hei;
				sx=sx+uidata.width+gx;
			}
            if(isResetHei==true){
			    for(i=0;i<arr.length;++i){
					uidata=arr[i];
                    uidata.height=hei;
				}
			
			}


            if(bgNum<that.bgA.length){
			   
			   var bg=that.bgA[bgNum];
               bg.style.left="0px";
			   bg.style.top=(pos.y-Math.floor(that.option.marginY/2))+"px";
			   bg.style.height=(hei+that.option.marginY+sh)+"px";
               if(bg.img!=null){
					var bgBounce=jarvis.lib.getAbsoluteBounce(bg);
					bg.img.width=bgBounce.width;
					bg.img.height=bgBounce.height;
			   }
			   
			}
            bgNum++;
			lineIndex++;
			return hei+sh;
		}
	    
	  

	}
}



