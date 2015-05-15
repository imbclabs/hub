/**
 * miniInfo v1.0: AudioPlayer 
 * by aeddang
 */
/*
interfaces

*/

if(typeof jarvis == "undefined") var jarvis = new Object();

jarvis.MiniPopupListOption=function(){
	this.cssKey="popup-list";
	this.reciveKey="miniPopupList";
}


jarvis.MiniPopupList= function(body,player,option) 
{
	
	
	this.body=body;
	
	if(player=== undefined){
		player=jarvis.mini.audioPlayer;
	}

	if(option===undefined){
		option=new jarvis.MiniPopupListOption();
	}

	this.player=player;
	this.reciveKey=option.reciveKey;
	this.aniID=this.reciveKey+"ANI";
	this.scrollID=this.reciveKey+"jarvisPopupList";
	
	jarvis.lib.addAttribute(this.body,option.cssKey+" uicomponent animated-none");
	jarvis[this.reciveKey]=this;
	
	this.info=jarvis.miniInfo;
	this.program=null
	this.prevSelect=null;
	this.currentPage=0;
	this.isActive=false;
	this.isInit=true;

	var that=this;
    
	
	//make top
    
	this.infoBox=document.createElement("div");
	jarvis.lib.addAttribute(this.infoBox,"info-box font-small");
    this.infoBox.innerHTML="음악 저작권 문제로 인해 방송 중에 나온 음악들은 제공되지 않는 점 양해 바랍니다.";
    this.body.appendChild(this.infoBox);

	this.listBox=document.createElement("div");
	jarvis.lib.addAttribute(this.listBox,"list-box border-side");
	this.body.appendChild(this.listBox);
	this.listBox.id=this.scrollID;
    
	this.bottom=document.createElement("div");
	this.pageNavi=document.createElement("div");
	jarvis.lib.addAttribute(this.pageNavi,"pagecontrol");
	jarvis.lib.addAttribute(this.bottom,"bottom border");
    
	this.body.appendChild(this.bottom);
	this.bottom.appendChild(this.pageNavi);

	this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
	this.body.appendChild(this.loadingBar);

	this.listScroll=null;
	this.pageControl=null;
}

jarvis.MiniPopupList.prototype = 
{
    
	init : function()
	{
		var that=this;
			
		var scrollDelegate=function(){}; 
		scrollDelegate.prototype = {
		                    
			stateChange : function(e)
			{
				switch(e){
					case jarvis.UIScrollView.SCROLL_BOTTOM:
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
		scrollOption.noDataView="<p class='info-text'>등록되어 있는 데이터가 없습니다.</p>" ;
		
		this.listScroll=new jarvis.UIScrollView(this.scrollID,scrollOption,new scrollDelegate());
        
		var controlDelegate=function(){}; 
		controlDelegate.prototype = {
		                    
			pageChange : function(idx)
			{
				that.loadPodList(idx);
			}
		}

		var controlOption=new jarvis.UIPageControlOption();

		if(this.info.isPhone==true){
			controlOption.pageSize=5;
		}else{
			controlOption.pageSize=10;
		}

		controlOption.cssKey="pagecontrol-number";
		this.pageControl=new jarvis.UIPageControl(this.pageNavi,new controlDelegate(),controlOption);

	},

	openPopup : function(program,isAni,pos){
		
		if(isAni===undefined){
			isAni=false;
		}

		this.isInit=true;
		this.isActive=true;
		this.program=program;
	    
		this.body.style.display="block";

		if(isAni==true){
			this.startAni(pos);
		}else{
			this.body.style.top=pos+"px";
			this.loadPodList(0);
		}

		this.prevSelect=null;
	},

	startAni : function(pos)
	{
		 
		var that=this;

		jarvis.animation.stopAnimation(this.aniID);
		jarvis.config.isAnimation=true;

		var aniDelegate=function(){};

		aniDelegate.prototype = {
			complete : function(e)
			{
				jarvis.config.isAnimation=false;
				that.loadPodList(0);
			}
		}
		var easev="ease in";
		jarvis.animation.startAnimation(this.body.style, {id:this.aniID, duration:0.3, top:pos, ease:easev ,isPx:true},new aniDelegate());
	},
	
	closePopup : function(){
        
		if(this.isActive==false){
			return;
		}

		this.isActive=false;
		jarvis.lib.excuteDelegate(this.delegate,"closePopup",[this.type]);
		var that=this;
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		var ty=bounce.y+bounce.height;
		jarvis.animation.stopAnimation(this.aniID);
		jarvis.config.isAnimation=true;
		var aniDelegate=function(){};

		aniDelegate.prototype = {
			complete : function(e)
			{
				that.body.style.display="none";
				jarvis.config.isAnimation=false;
			}
		}
		var easev="ease in";
		jarvis.animation.startAnimation(this.body.style, {id:this.aniID, duration:0.3, top:ty, ease:easev ,isPx:true},new aniDelegate());
	},

	orientationChange : function(){
		this.listScroll.reset();
		this.loadPodList(this.currentPage);
	   
	},

	resize : function(h)
	{
		if(h!==undefined){
			this.body.style.height=h+"px";
		}
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);

		if(bounce.width>=10000 || bounce.width<=0){
			return;
		}

		jarvis.lib.setCenterPosition(this.pageNavi,bounce);
		var bwid=(bounce.width-2)+"px";
		
		this.listBox.style.width=bwid;
		this.bottom.style.width=bwid;

		var bounceB=jarvis.lib.getAbsoluteBounce(this.bottom);
		var bounceL=jarvis.lib.getRelativeBounce(this.listBox);
		var bh=bounce.height-bounceB.height-bounceL.y;
		
		this.listBox.style.height=Math.floor(bh)+"px";

		if(this.listScroll!=null){
			this.listScroll.resize();
		}
	},
		
	loadPodList : function (page)
	{
		if(this.program==null){
			return;
		}
		
		this.currentPage=page;
		this.loading(this.info.loadPodItemPage("jarvis."+this.reciveKey+".loadPodListComplete",this.program.broadCastID,this.program.groupID,page));
	},

	loadPodListComplete:function(yn,bID,gID,p)
	{
		var cpage=Number(p);	
		var poditemInfo=this.info.getPodItemPageInfo(bID,gID);
		var poditems=poditemInfo.getDatas(cpage);

		if(this.isInit==true){
			this.isInit=false;
			this.pageControl.reset(poditemInfo.totalPage);
		}else{
		
		}
		
		this.pageControl.setPageIdx(cpage);
		this.addCell(poditems);

		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		jarvis.lib.setCenterPosition(this.pageNavi,bounce);
	},

	addCell : function(pods)
	{
		this.listScroll.reset();
		
		var that=this;
		this.loading(false);
		
		var data=null;
		var cell=null;
		var html="";
		var cell=null; 
		
		var btn=null; 
		var select=null;
		var cell0=null; 
        
		var content=null; 
		var title=null; 
		var subTitle=null; 

		for(var i=0;i<pods.length;++i){
			data=pods[i];
			cell=document.createElement("button");
			jarvis.lib.addAttribute(cell,"btn cell");
			content=document.createElement("div");
			title=document.createElement("div");
			subTitle=document.createElement("div");

			jarvis.lib.addAttribute(content,"content");
			jarvis.lib.addAttribute(title,"title text-auto-resize font-middle");
			jarvis.lib.addAttribute(subTitle,"sub-title text-auto-resize font-small");
               
			title.innerHTML="<b>"+data.contentTitle+"</b>";
			subTitle.innerHTML=data.broadDate;
			content.appendChild(title);
			content.appendChild(subTitle);
			cell.appendChild(content);
			   
			cell.info=data;

			if(i==0){
				cell0=cell;
				select=cell;
			}

			this.listScroll.addCell(cell);
			jarvis.lib.addEventListener(cell,"click",function (e){ that.listClick(e);});
		}

		this.listScroll.addComplete();
	},

	listClick : function(e)
	{
		var tg=jarvis.lib.getEventTarget(e);
		var i=tg.info;

		if(i==null){
			tg=tg.parentNode;
			i=tg.info;
		}
		
		if(this.prevSelect!=null){
			jarvis.lib.removeAttribute(this.prevSelect.parentNode,"on");
		}

		this.prevSelect=tg;
		jarvis.lib.addAttribute(tg.parentNode,"on");
		
		this.playVod(i);
	},

	playVod : function(data,isPlay)
	{
		if(isPlay=== undefined) {
			isPlay=true;
		}
		
        var imgPath=this.info.getProgramImg(this.program.broadCastID);
		if(imgPath==""){
		   imgPath=this.program.itunesImageURL;
		}
		this.player.changeInfo(data.contentTitle,data.broadDate,imgPath);
		this.player.changeVod(data.encloserURL,false,isPlay,false);
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



