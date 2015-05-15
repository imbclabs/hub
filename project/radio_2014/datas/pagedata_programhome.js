

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
			 
			  backGround:"#b2957b",
			  bgSetA : ["./style/uiset/bg_brown.png",
						"./style/uiset/bg_white.png"],

			  colorSetA : ["#ffffff","#dddbd7","bg-black30",false],
			  colorSetB : ["#636363","#636363","bg-white-border",true],
			  colorSetC : ["#636363","#636363","bg-white-border",true],
			  
			  datas:
			  [  
				 
			     {
				  className:"Mini",
				  dynamicSize:null,
				  hasShadow:null,
				  wid:640,
				  hei:480,
				  fixSize:true,
				  option:{
							cssBgColor:"#836f5c",
							service:"onair",
							//channel:2,
							programCode:""
						    
						 }
				 },
			     {
				  className:"PageTopNavi",
				  dynamicSize:null,
				  hasShadow:null,
				  backGround:"#402d1c",
				  wid:640,
				  hei:480,
				  option:{
							naviHei:45,
						   
							pageTopOption:{
											infoTime:"방송: MBC RADIO 밤 12시",
											infoText:"연출: 송명석, 구성: 양혜원, 김은선, 박나라",
											title:"정준영의 <em>심심타파</em>",
											isFullMode:false,
											boxPosX:0,
											boxPosY:125,
											bgA:["http://img.imbc.com/broad/radio/fm/enjoy/v2/setting/homepage/__icsFiles/afieldfile/2014/07/07/artimgpreview.jpg",
												 "http://img.imbc.com/broad/radio/fm/enjoy/v2/setting/homepage/__icsFiles/afieldfile/2014/07/07/artimgpreview_1.jpg",
												 "http://img.imbc.com/broad/radio/fm/enjoy/v2/setting/homepage/__icsFiles/afieldfile/2014/07/03/02.jpg"
                                                ],
											
											cssTitleColor:"#ffffff",
											cssTxtColor:"#ffffff"
										},
						    pageNaviOption:{
									title:"정준영의 심심타파",
									cssTitleColor:"#ffffff",
									apiPath:"http://www.imbc.com/broad/radio/fm/enjoy/v2/js/jarvis.IronMan.pagenavi.js",
									reciveKey:"PageNavi_1000664100000100000",
									isFullMode:false
								  }
							
						 }
				 },
				 {
				  className:"PageTopNavi",
				  dynamicSize:null,
				  hasShadow:null,
				  backGround:"#851e22",
				  wid:640,
				  hei:480,
				  option:{
							naviHei:45,
						   
							pageTopOption:{
											infoTime:"방송: MBC RADIO (토) 아침 6시15분",
											infoText:"연출: 용승우, 작가: 여종은",
											title:"라디오 매거진 <em>톡</em> 강다솜입니다",
											isFullMode:false,
											boxPosX:0,
											boxPosY:125,
											bgA:["http://img.imbc.com/broad/radio/fm/magazine/v2/setting/homepage/__icsFiles/afieldfile/2014/07/11/top.jpg"],
											
											cssTitleColor:"#ffffff",
											cssTxtColor:"#ffffff"
										},
						    pageNaviOption:{
									title:"라디오 매거진 톡 강다솜입니다",
									cssTitleColor:"#ffffff",
									apiPath:"http://www.imbc.com/broad/radio/fm/magazine/v2/js/jarvis.IronMan.pagenavi.js",
									reciveKey:"PageNavi_1002891100000100000",
									isFullMode:false
								  }
							
						 }
				 }
				 
				
				 
			  ]

		  }
	  
	)

