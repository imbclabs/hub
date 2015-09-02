/**
 * lib v1.0: Animation
 * by aeddang
 */
/*
interfaces


*/

if(typeof cheatas == "undefined") var cheatas = new Object();


cheatas.AnimationJS= function() 
{
	this.fps=30;
	this.mdp=0.86;
	this.loofTimer=null;
	this.elementA=new Array();
	this.animationA=new Array();
	cheatas.animationJS=this;
}

cheatas.AnimationJS.prototype =
{
	startAnimation: function(element,aniObj) 
	{
		if(element==undefined)
		{
			return;
		}
	  
		aniObj.duration=Math.ceil(aniObj.duration*this.fps);
		aniObj.delay=Math.ceil(aniObj.delay*this.fps);
	   
		var idx=this.elementA.indexOf(element);

		if(idx!=-1)
		{
			this.elementA[idx]=element;
			this.animationA[idx]=aniObj;
		}
		else
		{
			this.elementA.push(element);
			this.animationA.push(aniObj);
		}

		if( this.loofTimer==null)
		{
			this.addLoofTimer();
		}
	},

	stopAllAnimation: function() 
	{
		this.animationA=new Array();
		this.elementA=new Array();
		this.removeLoofTimer();
	},

	stopAnimation: function(id) 
	{
		var idx=-1;

		for(var i=0;i<this.animationA.length;++i)
		{
			if(this.animationA[i]!=null)
			{
				if(id==this.animationA[i].id)
				{
					idx=i;
					break;
				}
			}
		}
	   
		if(idx!=-1)
		{
			delete this.elementA[idx]; 
			delete this.animationA[idx];
		}
	},

    loof: function() 
	{
		var remainA=new Array();
		var remainEA=new Array();
		// cheatas.debuger.trace("ani"+Math.random());
		var aniObj;
		var element;

		for(var i=0;i<this.animationA.length;++i)
		{
			aniObj=this.animationA[i];
			element=this.elementA[i];

			if(aniObj!=null)
			{
				aniObj.delay--;
			    
				if(aniObj.delay<=0)
				{
					var r=0;
					var ev=0;

					aniObj.t++;
						
					if(aniObj.t<=aniObj.duration)
					{	
						for (var key in aniObj.prop)
						{					        
							if(element[key]!=undefined && key!="id")
							{
								var cpk=aniObj.copyProp[key];
									
								if(cpk===undefined)
								{
									aniObj.copyProp[key]=new Object(); 
									cpk=aniObj.copyProp[key];
									ev=cheatas.lib.getNumber(element[key],aniObj.unit,key);
									cpk.diff=(ev-aniObj.prop[key]);
								}

								var d;
								var tg=cheatas.lib.getNumber(element[key],aniObj.unit,key);
								var lg=cheatas.lib.getNumber(aniObj.prop[key],aniObj.unit,key);
									
								switch(aniObj.ease)
								{
									case "linear": 
										d=(cpk.diff/aniObj.duration);
										break;
									case "ease-out": 
									case "ease out": 
										d= (cpk.diff/(aniObj.duration)*2)*Math.sin(aniObj.t/aniObj.duration*Math.PI/2)*this.mdp;
										break;
									case "ease in": 
									case "ease-in": 
										d= (cpk.diff/(aniObj.duration)*2)*Math.cos(aniObj.t/aniObj.duration*Math.PI/2)*this.mdp;
										break;
									case "ease in out": 
									case "ease-in-out": 
										d= (cpk.diff/(aniObj.duration)*2)*Math.sin(aniObj.t/aniObj.duration*Math.PI)*this.mdp;
										break;
								}
									
								tg-=d;

								if(tg>lg && d<0)
								{
									tg=lg;
								}
								else if(tg<lg && d>0)
								{
									tg=lg;
								}

								if(aniObj.t>=aniObj.duration)
								{
									if(aniObj.unit=="auto")
									{
										try
										{
											element[key]=cheatas.lib.getAutoUnitValue(aniObj.prop[key],key);
										}
										catch(e)
										{
											//	
										}
									}
									else
									{
										try
										{
											element[key]=aniObj.prop[key]+aniObj.unit;
										}
										catch(e)
										{
											//
										}
									}
										
									delete aniObj.prop[key];
									 
								}
								else
								{
									if(aniObj.unit=="auto")
									{
										try
										{
											element[key]=cheatas.lib.getAutoUnitValue(tg,key);
										}
										catch(e)
										{
											//
										}
									}
									else
									{
										try
										{
											element[key]=tg+aniObj.unit;
										}
										catch(e)
										{
											//
										}
												
									}

									r++;
								}
							}
							else
							{
								delete aniObj.prop[key];  
							}
						}
					}
					  
					if(r>0)
					{
						cheatas.lib.excuteDelegate(aniObj.delegate,"update",[aniObj.id]);
						remainA.push(aniObj);
						remainEA.push(element)
					}
					else
					{
						cheatas.lib.excuteDelegate(aniObj.delegate,"complete",[aniObj.id]);
					}
				}
				else
				{
					remainA.push(aniObj);
					remainEA.push(element)
				}  
			}	
		}
			
		if(remainA.length>0)
		{
			this.animationA=remainA;
			this.elementA=remainEA;
			this.addLoofTimer();
		}
		else
		{//remove all
			this.stopAllAnimation();
		}
	},

	addLoofTimer: function() 
	{
		this.removeLoofTimer();

		var t=1000/this.fps;
        
		//cheatas.debuger.log("addLoof "+t+" : "+Math.random()); 
		this.loofTimer=setTimeout("cheatas.animationJS.loof()",t);
	},

	removeLoofTimer: function() 
	{
		if(this.loofTimer!=null)
		{
			clearTimeout(this.loofTimer);
			this.loofTimer=null;
		}
	}
}