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
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/radio.css'>");

}





jarvis.PageMenuOption=function(){
   
   this.cssKey="page-menu";
   
   this.title="메뉴";
   this.reciveKey="PageMenu";   
   this.apiPath="./datas/pagemenulist.js";
   this.scrollID="jarvisPageMenuList";
   this.scrollID= jarvis.lib.getTimeCode(this.scrollID);

   this.colorA=new Array();
   this.colorA[0]="#ffffff";
   this.colorA[1]="#b2cef4";
   this.colorA[2]="bg-black30";
   this.colorA[3]=false;

  
}


jarvis.PageMenu= function(pageID,option) 
{
	
	
	this.body;
	if(pageID===undefined){
		this.body=document.body;
	}else{
		if(typeof pageID=="String" || typeof pageID=="string"){
			this.body=document.getElementById(pageID);
		}else{
			this.body=pageID;
		}
	   
	}	
    this.option=option;
	if(this.option===undefined){
	   this.option=new jarvis.PageMenuOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey+" uicomponent");

	this.dataA=null; 
    
	this.reciveKey=this.option.reciveKey;
	this.info=jarvis.jarvisInfo;
	jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=this;

	this.lineHeight=30;
	this.pageNum=-1;
    this.totalPage=-1;
    this.currentPage=-1;
    this.bgClass="";
	this.txtColor="";
    this.listA=new Array();

	this.title = document.createElement('h2');
	jarvis.lib.addAttribute(this.title,'radio-title font-big');
	this.title.innerHTML=this.option.title;
	this.body.appendChild(this.title);
	
	
	this.grid= document.createElement('div');
	jarvis.lib.addAttribute(this.grid,'grid');
	this.body.appendChild(this.grid);
	
    this.listBox=document.createElement("div");
    jarvis.lib.addAttribute(this.listBox,"list-box");
	this.listBox.id=this.option.scrollID;
	this.grid.appendChild(this.listBox);
    
    this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
    this.grid.appendChild(this.loadingBar);

    this.listScroll=null;
	this.changeColor(this.option.colorA);
    	
}

jarvis.PageMenu.prototype = 
{
    
	init : function()
	{
		this.loading(false);
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
		this.loadData();
		
    },
	remove : function()
	{
	},
    reset : function(option)
	{
        jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=null;
		
		this.option=option;
		this.reciveKey=this.option.reciveKey;
		jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=this;
		this.title.innerHTML=this.option.title;
	    
		this.loadData()
	},
	
    loadData:function()
	{
        this.listScroll.reset();
		this.loading(true);
		this.dataA=new Array();
		this.info.loadIronMans(this.option.apiPath,"jarvis."+this.reciveKey+jarvis.config.RECIVE_KEY+".dataComplete",this.reciveKey);
		
	},
	dataComplete :function(yn)
	{
	   
		this.loading(false);
		var datas=this.info.getIronMans(this.reciveKey,false);
		
		var that=this;
		var data;
		var cell;
		var img;
		var txt;
		var group="";
		var tA=["월","화","수","목","금","토","일"];
		for(var i=0;i<datas.length;++i){
			data=datas[i];
			cell=document.createElement("button");
			cell.style.color=this.txtColor;
			jarvis.lib.addAttribute(cell,"cell btn font-small");
			if(data.group=="0"){
			   if((i%2)==0){
			       jarvis.lib.addAttribute(cell,"a");
			   }else{
			       jarvis.lib.addAttribute(cell,"b");
			   }
			}
			if(group!=data.group){
			   group=data.group;
			   jarvis.lib.addAttribute(cell,"new-group");
			}
            
			img=document.createElement("div");
            jarvis.lib.addAttribute(img,"img align-left");
			if(data.imgPath!=""){
			   
			   if(tA.indexOf(data.imgPath)!=-1){
			      img.style.background="url('./style/trensparent30.png') repeat";
				  img.innerHTML="<b>"+data.imgPath+"</b>";
			   }else{
				  img.img=document.createElement("img");
			      img.img.src=data.imgPath;
				  img.appendChild(img.img);
				  
			   }
			   
			   //img.img.width=100%;
			   //img.img.height=100%;
			   
			}
            txt=document.createElement("div");
			jarvis.lib.addAttribute(txt,"txt align-left");
			txt.innerHTML=data.title;

			cell.appendChild(img);
            cell.appendChild(txt);
			cell.info=data;
			this.listA.push(cell);
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
		
        if(data==null){
			tg=tg.parentNode;
			data=tg.info;
		}

		if(data!=null){
			if(data.target=="_app"){
				if(jarvis.uiSet!=null && jarvis.uiSet!=undefined){
				    jarvis.uiSet.changePage(data.link);
				}

			}else if(data.target=="_self"){
				top.location.href=data.link;
			}else{
				window.open(data.link);
			}
		}


	},

	changeColor :function(colorA)
	{
	  
	   this.title.style.color=colorA[0];
	   this.txtColor=colorA[1];
	   
	   jarvis.lib.removeAttribute(this.grid,this.bgClass);	
	   this.bgClass=colorA[2];
       

	   jarvis.lib.addAttribute(this.grid,this.bgClass);	
       for(var i=0;this.listA.length;++i){
	       this.listA[i].style.color=this.txtColor;
	   }

	},
	loading:function(ac)
	{
       if(ac==true){
		   jarvis.lib.addAttribute( this.loadingBar,"data-loading")
	   }else{
		   jarvis.lib.removeAttribute( this.loadingBar,"data-loading");
	   }
	},
    orientationChange : function(){

		this.resize();
	},

	resize : function(browserHeight)
	{
	   	if(browserHeight!==undefined){
		   this.body.style.height=browserHeight+"px";
		}
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
	    if(bounce.width>=10000){
		    return;
		}
        
		var bounceG=jarvis.lib.getAbsoluteBounce(this.grid);
		
		var gridHei=bounce.height-(bounceG.y-bounce.y);
        this.grid.style.height=gridHei+"px";
        this.listBox.style.height=gridHei+"px";

		if(this.listScroll!=null){
			this.listScroll.resize();
		}
	
	}
}



