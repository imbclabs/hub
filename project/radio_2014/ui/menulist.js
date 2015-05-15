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





jarvis.MenuListOption=function(){
   
   this.cssKey="menu-list";
   this.reciveKey="MenuList";   
   this.title="라디오홈";
   this.scrollID="jarvisMenuList";
   this.etcA=new Array();
   this.etcA[0]={title:"전국 주파수 안내",link:"#",target:"_blank"};
   this.etcA[1]={title:"당첨 상품 검색",link:"#",target:"_blank"};
   
}



jarvis.MenuList= function(pageID,option,delegate) 
{
	this.NONE_TYPE="NONE_TYPE";
	this.MAIN_TYPE="MAIN_TYPE";
	this.SUB_TYPE="SUB_TYPE";
	
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
	this.delegate=delegate;
    this.option=option;
	if(this.option===undefined || this.option==null){
	   this.option=new jarvis.MenuListOption();
	}
    this.reciveKey=this.option.reciveKey;
    jarvis[this.reciveKey]=this;
    jarvis.lib.addAttribute(this.body,this.option.cssKey+" uicomponent");
    this.info=jarvis.jarvisInfo;
	this.minfo=jarvis.miniInfo;
    this.type=this.NONE_TYPE;
    this.menuA=null;
	this.dataA=null; 
    this.listA=null;
    this.etcInit=false;
    this.currentPage=-1;
    
	this.menuBody=document.createElement("div");
    jarvis.lib.addAttribute(this.menuBody,"menu-body");
	this.body.appendChild(this.menuBody);

    this.closeBtn=document.createElement("button");
	jarvis.lib.addAttribute(this.closeBtn,"btn-close");
    this.menu=document.createElement("div");
    jarvis.lib.addAttribute(this.menu,"menu font-big");


	this.menuHomeBtn=document.createElement("button");
	jarvis.lib.addAttribute(this.menuHomeBtn,"font-big btn btn-menu-home");
	this.menuHomeBtn.innerHTML=this.option.title;
   
    this.menuBody.appendChild(this.menuHomeBtn);
	this.menuBody.appendChild(this.closeBtn);
	this.menuBody.appendChild(this.menu);
    

	this.listBox=document.createElement("div");
    jarvis.lib.addAttribute(this.listBox,"list-box");
	this.listBox.id=this.option.scrollID;
	
	this.menuBody.appendChild(this.listBox);
	
	this.etcBox=document.createElement("ul");
	jarvis.lib.addAttribute(this.etcBox,"etc-box");
	this.menuBody.appendChild(this.etcBox);
	
	
    
	this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
    if( this.info.isPhone==true){
	   this.loadingBar.style.top="200px";  
	}
	this.body.appendChild(this.loadingBar);
    
    this.listScroll=null;
	
}

jarvis.MenuList.prototype = 
{
    
	init : function()
	{
		this.loading(false);
		var that=this;
        jarvis.lib.addEventListener(this.closeBtn,"click",function (e){ jarvis.lib.excuteDelegate(that.delegate,"closeMenu");});
        jarvis.lib.addEventListener(this.menuHomeBtn,"click",function (e){ jarvis.lib.excuteDelegate(that.delegate,"goHome");});
		var scrollDelegate=function(){}; 
			scrollDelegate.prototype = {
		                    
							  stateChange : function(e)
                              {
								 
								 switch(e){
									case jarvis.UIScrollView.SCROLL_START:
										jarvis.config.isAnimation=true;
										break;
									case jarvis.UIScrollView.SCROLL_STOP:
										jarvis.config.isAnimation=false;
										break;
								    case jarvis.UIScrollView.SCROLL_BOTTOM:
										jarvis.config.isAnimation=false;
									    break;
									case jarvis.UIScrollView.SCROLL_TOP:
									    break;
									default:
									    break;
								 
								 }
							  },
							 
							  addCell : function(cellIdx,cell){},
							  rmoveCell : function(cellIdx,cell){}
							  
			}
        var scrollOption=new jarvis.UIScrollViewOption();
        scrollOption.cssKey="uiscrollview";
	    this.listScroll=new jarvis.UIScrollView(this.option.scrollID,scrollOption,new scrollDelegate());
        

		var gestureDelegate=function(){}; 
		gestureDelegate.prototype = {
										gestureComplete: function(e){
										if(e==jarvis.GestureElement.PAN_LEFT){
											jarvis.lib.excuteDelegate(that.delegate,"closeMenu");
										}
									}
							  
		}
		var gestureElement=new  jarvis.GestureElement( this.body,new gestureDelegate(),false,true);
	    this.setEtc();	
    },
    reset:function(){
	   this.menuA=null;
       this.menu.innerHTML="";
	   this.listScroll.reset();
	   this.dataA=null;
	},
	loadData:function(api)
	{
        this.type=this.MAIN_TYPE;
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.menuBody);
        var bounceT=jarvis.lib.getAbsoluteBounce(this.menu);
		
		this.closeBtn.style.top=(bounceT.y-bounce.y)+"px";
		
		//this.menu.style.display="block";
		if(this.dataA==null){
			
			this.loading(true);
			this.dataA=new Array();
			this.info.loadIronMans(api,"jarvis."+this.reciveKey+".dataComplete",this.reciveKey);
		}
	},
	setData:function(datas,title)
	{
		var bounce=jarvis.lib.getAbsoluteBounce(this.menuBody);
        var bounceT=jarvis.lib.getAbsoluteBounce(this.menuHomeBtn);
		
		
		this.closeBtn.style.top=(bounceT.y-bounce.y)+"px";
		this.type=this.SUB_TYPE;
		this.menu.innerHTML=title;
        this.setList(datas);

	},
	dataComplete :function(yn)
	{
	   	var datas=this.info.getIronMans(this.reciveKey,false);
		this.loading(false);
		this.minfo.CHANNEL_TYPE_READ
		for(var i=0;i<this.minfo.CHANNEL_TYPE_READ.length;++i){
		    this.dataA[i]={title:this.minfo.CHANNEL_TYPE_VIEW[i],listA:new Array()};
	    }
		var data;
		var idx;
		for(var i=0;i<datas.length;++i){
		   data=datas[i];
		   
		   idx=this.minfo.CHANNEL_TYPE_READ.indexOf(data.group);
		   if(idx!=-1){
		        this.dataA[idx].listA.push(data);
		   }
	    }
		
		this.setMenu();
		

	},	
    setEtc :function()
	{
		if(this.etcInit==true){
		   return;
		}
		this.etcInit=true;
		var li=null;
		var etc=null;
		for(var i=0;i<this.option.etcA.length;++i){
			etc=this.option.etcA[i];
			li=document.createElement("li");
			jarvis.lib.addAttribute(li,"font-middle");
			li.innerHTML="<a href='"+etc.link+"' target'"+etc.target+"'>"+etc.title+"</a>";
			this.etcBox.appendChild(li);
		}
	},
	setMenu :function()
	{
		this.menuA=new Array();
		this.menu.innerHTML="";
		var btn=null;
		var data=null;
		var num=this.dataA.length;
		var pct=Math.floor(100/num)-1;
		var that=this;
		
		for(var i=0;i<num;++i)
		{
			data=this.dataA[i];
			btn=document.createElement("button");
			jarvis.lib.addAttribute(btn,"btn font-middle");
			btn.innerHTML=data.title;
			btn.style.width=pct+"%";
			this.menu.appendChild(btn);
			this.menuA.push(btn);
			jarvis.lib.addEventListener(btn,"click",function (e){menuClick(e);});
		}

		function menuClick(e){
		    var tg=jarvis.lib.getEventTarget(e);
            var idx=that.menuA.indexOf(tg);
			if(idx!=-1){
			   that.setPage(idx);
			}
		
		}
		if(this.currentPage==-1){
		    this.setPage(0);
		}else{
		    this.setPage(this.currentPage);
		}
		
		
	},
    setPage :function(idx)
	{
		if( this.currentPage!=-1){
			jarvis.lib.removeAttribute(this.menuA[this.currentPage],"on");
		   
		}
        this.currentPage=idx;
		jarvis.lib.addAttribute(this.menuA[this.currentPage],"on");
		this.setList(this.dataA[this.currentPage].listA);

	},

	setList :function(datas)
	{
		
		
		this.listScroll.reset();

		var that=this;
		var cell=null;
		var data=null;
		var group="";
		for(var i=0;i<datas.length;++i){
			data=datas[i];
			cell=document.createElement("button");
			jarvis.lib.addAttribute(cell,"cell btn font-middle");
			if(group!=data.group){
				group=data.group;
				jarvis.lib.addAttribute(cell,"first");
			  
			}
			cell.innerHTML=data.title;
			cell.info=data;
			this.listScroll.addCell(cell);
			jarvis.lib.addEventListener(cell,"click",function (e){that.listClick(e);});
               
		}
        this.listScroll.addComplete();
		this.resize();
		
	},
	listClick:function(e)
	{
		var tg=jarvis.lib.getEventTarget(e);
	    var data=tg.info;
		if(data!=null){
			if( data.target=="_app"){
				jarvis.lib.excuteDelegate(this.delegate,"listClick",[data.link]);
				
			}else if(data.target=="_self"){
				top.location.href=data.link;
			}else{
				window.open(data.link);
			}
		}


	},
    orientationChange : function(){
		
		this.setPage(this.currentPage);
	},
    setMenuPosition : function(tx)
	{
		if(tx<0){
		   return;
		}
		this.menuBody.style.left=Math.floor(tx)+"px"
	},
	resize : function(h,w,mw)
	{
	    
		
		if(h!==undefined){
		    this.body.style.height=h+"px";
			this.menuBody.style.height=h+"px";
		}
		if(w!==undefined){
		    this.body.style.width=w+"px";
		}
		
		if(mw!==undefined){
			if(w!==undefined && w>0){
				this.setMenuPosition(w-mw);
			}
		    this.menuBody.style.width=mw+"px";
		}
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		if(bounce.width>=10000 || bounce.width<0){
		    return;
		}
	    var tx=jarvis.lib.getAbsoluteBounce(this.menuHomeBtn).x
		
		var bounceL=jarvis.lib.getAbsoluteBounce(this.menuBody);
		/*
		if(this.menuA!=null){
		    tx=jarvis.lib.getAbsoluteBounce(this.menuA[0]).x;
			
		}else{
		    tx=bounceL.x+20;
		}
		*/
		var bounceB=jarvis.lib.getAbsoluteBounce(this.etcBox);
		
        var bounceS=jarvis.lib.getAbsoluteBounce(this.listBox);
		
		var ww=Math.floor(bounceL.width-(tx-bounceL.x));
	
		this.listBox.style.left=Math.floor(tx-bounceL.x)+"px";
		this.listBox.style.width=ww+"px";
		this.listBox.style.height=Math.floor(bounceL.height-bounceB.height-(bounceS.y-bounceL.y)-20)+"px";
		if(this.listScroll!=null){
			this.listScroll.resize();
		}

	},

	loading:function(ac)
	{
       if(ac==true){
		   jarvis.lib.addAttribute( this.loadingBar,"data-loading")
	   }else{
		   jarvis.lib.removeAttribute( this.loadingBar,"data-loading");
	   }
	}
}



