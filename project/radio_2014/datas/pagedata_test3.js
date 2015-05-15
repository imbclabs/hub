

/*
jarvis.IronMan= function() 
{
    this.seq="";
	this.group="";
    this.title="title";
    this.text="text";
	this.date="date";
    this.imgPath="imgPath";
	this.subImgPath="subImgPath";
    this.vodPath="vodPath";

	this.link="link";
    this.target="_top";
    this.iFramePath="";

}
*/

jarvis.uiSet.jarvisPageDataLoadComplete
(
	  {
		  
		  bgSetA : ["#836f5c",
			        "./style/uiset/bg_white.png"],

		  colorSetA : ["#ffffff","#dddbd7","bg-black30",false],
		  colorSetB : ["#636363","#636363","bg-white-border",true],
	      colorSetC : ["#636363","#636363","bg-white-border",true],
		  
		  datas:
		  [  
		 	 {
			  className:"PageTop",
			  dynamicSize:"full",
			  backGround:"#b2957b",
			  hasShadow:false,
			  wid:320,
			  hei:484,
			  option:{
						infoTime:"방송 : FM4U 밤 12시",
						infoText:"연출: 김철영, 작가: 박찬은, 김가영",
						title:"정준영의<em>심심타파</em>",
                        isFullMode:true,
						boxPosX:0,
						boxPosY:325,
						bgA:["radio-head.jpg","radio-head1.jpg"],
						bgHeight:484,
                        cssTitleColor:"#ffffff",
                        cssTxtColor:"#ffffff"
					 }
			 },
			 
			 {
			  className:"PageNavi",
			  dynamicSize:"full",
			  backGround:"#402d1c",
			  hasShadow:false,
			  wid:320,
			  hei:45,
			  option:{
						title:"정준영의 심심타파",
						cssTitleColor:"#ffffff",
					    apiPath:"./datas/pagenavilist.js",
					    reciveKey:"PageNavi"
                     }
			 },
		     
			 {
			  className:"List",
			  dynamicSize:"full",
			  hasShadow:false,
		   
		      backGround:"./style/uiset/bg_brown.png",
			  hei:300,
			  option:{
				       apiPath:"http://mini.imbc.com/v2/js/jarvis.IronMan.boralist.js",
					   title:"목록",
					   type:"VOD",
					   margin:10,
                       wid:120,
					   hei:80,
					   isFullMode:true,
					   marginFull:30,
					   colorA : ["#ffffff","#dddbd7","bg-black30",false],
					   reciveKey:"BoraList"
					   
				     }
			 },
			 {
			  className:"Mini",
			  dynamicSize:true,
			  fixSize:true,
              hei:360,
			  hasShadow:null,
			  option:{
				        cssBgColor:"#836f5c"
			         }
			 },
			 {
			  className:"FrameViewer",
			  dynamicSize:null,
			  hasShadow:null,
              fixSize:true,
			  hei:360,
			  option:{
				       title:"@radiombc",
					   iframePath:"twitter.html"
				     }
			 }
			 
			 
		  ]

	  }
  
)
