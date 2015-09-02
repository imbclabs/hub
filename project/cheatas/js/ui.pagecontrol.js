if(cheatas == null)
{
	var cheatas = new Object();
}

cheatas.UIPageControlOption = function()
{
	this.pageLength = 0;
	this.pageGroupSize = cheatas.config.SPEC_PAGE_SIZE_GROUP;
}

cheatas.UIPageControl = function(delegate, option)
{
	var parent = null;

	if(delegate == null)
	{
		delegate = null;
	}

	if(option == null)
	{
		option = new cheatas.UIPageControlOption();
	}

	this.delegate = delegate;
	this.option = option;
	this.cells = null;
	this.pageSeq = 0;
	this.pageLength = this.option.pageLength;
	this.pageGroupSeq = 0;
	this.pageGroupSize = this.option.pageGroupSize;
	this.pageGroupLength = Math.ceil(this.pageLength / this.pageGroupSize);

	this.nodes = new Object();
	this.nodes.body = cheatas.lib.createElement("div", "", "");
	this.nodes.loading = cheatas.lib.createElement("div", "", "animated loading");
	this.nodes.view = null;
	this.nodes.prevScrBtn = null;
	this.nodes.nextScrBtn = null;
	this.nodes.selectedCell = null;
	this.nodes.prevBtn = null;
	this.nodes.nextBtn = null;
}

cheatas.UIPageControl.prototype = 
{
	init: function()
	{
		cheatas.debugger.log("Function", "cheatas.UIPageControl.init()");

		this.create();
	},

	create: function()
	{
		cheatas.debugger.log("Function", "cheatas.UIPageControl.create()");

		var that = this;
		var gestureDelegate = null;
		var gestureElement = null;

		this.nodes.view = cheatas.lib.createElement("div", this.nodes.body.id + "-view", "view");
		this.nodes.body.appendChild(this.nodes.view);

		this.nodes.prevScrBtn = cheatas.lib.createElement("button", this.nodes.view.id + "-btn-scr-prev", "btn btn-scr-prev");
		this.nodes.prevScrBtn.innerHTML = "이전";
		this.nodes.nextScrBtn = cheatas.lib.createElement("button", this.nodes.view.id + "-btn-scr-next", "btn btn-scr-next");
		this.nodes.nextScrBtn.innerHTML = "다음";

		// addEventListener
		cheatas.lib.addEventListener(this.nodes.prevScrBtn, "click", function(e) {that.movePage(-1);});
		cheatas.lib.addEventListener(this.nodes.nextScrBtn, "click", function(e) {that.movePage(1);});

		this.nodes.prevBtn = cheatas.lib.createElement("button", this.nodes.view.id + "-btn-prev", "btn btn-prev");
		this.nodes.prevBtn.innerHTML = "이전";
		this.nodes.nextBtn = cheatas.lib.createElement("button", this.nodes.view.id + "-btn-next", "btn btn-next");
		this.nodes.nextBtn.innerHTML = "다음";

		// addEventListener
		cheatas.lib.addEventListener(this.nodes.prevBtn, "click", function(e) {that.movePage(-1);});
		cheatas.lib.addEventListener(this.nodes.nextBtn, "click", function(e) {that.movePage(1);});

		gestureDelegate = function() {};

		gestureDelegate.prototype =
		{
			gestureComplete: function(e)
			{	
				cheatas.debugger.log("Function",
					[
						"cheatas.UIPageControl.init.gestureComplete(e)",
						"e = " + e
					]
				);

				if(e == cheatas.GestureElement.PAN_LEFT)
				{
					that.movePage(-1);		    
				}
				else if(e==cheatas.GestureElement.PAN_RIGHT)
				{
					that.movePage(1);
				}
			}
		}

		gestureElement = new cheatas.GestureElement(this.nodes.view, new gestureDelegate());
	},

	update: function() 
	{
		cheatas.debugger.log("Function", "cheatas.UIPageControl.update()");

		this.setPageControlButton();
		this.setPageControlCell();
	},

	reset: function() 
	{
		cheatas.debugger.log("Function", "cheatas.UIPageControl.reset()");

		this.cells = null;
		this.pageSeq = 0;
		this.pageLength = this.option.pageLength;
		this.pageGroupSeq = 0;
		this.pageGroupSize = this.option.pageGroupSize;
		this.pageGroupLength = Math.ceil(this.pageLength / this.pageGroupSize);

		this.create();
	},

	remove: function() 
	{
		//
	},

	setPageIndex: function(seq) 
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.UIPageControl.setPageIndex(seq)",
				"seq = " + seq
			]
		);

		this.pageSeq = seq;

		var startSeq = this.pageGroupSeq*this.pageGroupSize;
		var endSeq = startSeq + this.pageGroupSize - 1;

		if (endSeq > this.pageLength - 1)
		{
			endSeq = this.pageLength - 1;
		}

		if (this.pageSeq < startSeq)
		{
			this.pageGroupSeq--;
		}

		if (this.pageSeq > endSeq)
		{
			this.pageGroupSeq++;
		}

		this.update();
	},

	setPageControlButton: function() 
	{
		cheatas.debugger.log("Function", "cheatas.UIPageControl.setPageControlButton()");

		if (cheatas.lib.isMobile == true)
		{
			this.nodes.prevScrBtn.style.display = "none";
			this.nodes.nextScrBtn.style.display = "none";

			if (this.pageLength > this.pageGroupSize)
			{
				switch (this.pageSeq)
				{
					case 0:
					{
						this.nodes.prevBtn.style.visibility = "hidden";
						this.nodes.nextBtn.style.visibility = "visible";
						break;
					}
					case this.pageLength - 1:
					{
						this.nodes.prevBtn.style.visibility = "visible";
						this.nodes.nextBtn.style.visibility = "hidden";
						break;
					}
					default:
					{
						this.nodes.prevBtn.style.visibility = "visible";
						this.nodes.nextBtn.style.visibility = "visible";
						break;
					}
				}
			}
			else
			{
				this.nodes.prevBtn.style.visibility = "hidden";
				this.nodes.nextBtn.style.visibility = "hidden";
			}
		}
		else
		{
			if (this.pageLength > this.pageGroupSize)
			{
				switch (this.pageSeq)
				{
					case 0:
					{
						this.nodes.prevScrBtn.style.visibility = "hidden";
						this.nodes.nextScrBtn.style.visibility = "visible";
						this.nodes.prevBtn.style.visibility = "hidden";
						this.nodes.nextBtn.style.visibility = "visible";
						break;
					}
					case this.pageLength - 1:
					{
						this.nodes.nextScrBtn.style.visibility = "hidden";
						this.nodes.prevScrBtn.style.visibility = "visible";
						this.nodes.prevBtn.style.visibility = "visible";
						this.nodes.nextBtn.style.visibility = "hidden";
						break;
					}
					default:
					{
						this.nodes.prevScrBtn.style.visibility = "visible";
						this.nodes.nextScrBtn.style.visibility = "visible";
						this.nodes.prevBtn.style.visibility = "visible";
						this.nodes.nextBtn.style.visibility = "visible";
						break;
					}
				}
			}
			else
			{
				this.nodes.prevBtn.style.display = "none";
				this.nodes.nextBtn.style.display = "none";

				switch (this.pageSeq)
				{
					case 0:
					{
						this.nodes.prevScrBtn.style.visibility = "hidden";
						this.nodes.nextScrBtn.style.visibility = "visible";
						break;
					}
					case this.pageLength - 1:
					{
						this.nodes.nextScrBtn.style.visibility = "hidden";
						this.nodes.prevScrBtn.style.visibility = "visible";
						break;
					}
					default:
					{
						this.nodes.prevScrBtn.style.visibility = "visible";
						this.nodes.nextScrBtn.style.visibility = "visible";
						break;
					}
				}
			}
		}
	},

	setPageControlCell: function() 
	{
		cheatas.debugger.log("Function", "cheatas.UIPageControl.setPageControlCell()");

		var that = this;
		var cell = null;
		var startSeq = this.pageGroupSeq*this.pageGroupSize;
		var endSeq = startSeq + this.pageGroupSize - 1;

		if (endSeq > this.pageLength - 1)
		{
			endSeq = this.pageLength - 1;
		}

		cheatas.lib.removeChild(this.nodes.prevScrBtn);
		cheatas.lib.removeChild(this.nodes.nextScrBtn);
		cheatas.lib.removeChild(this.nodes.prevBtn);
		cheatas.lib.removeChild(this.nodes.nextBtn);

		this.cells = new Array();
		this.nodes.selectedCell = null;
		this.nodes.view.innerHTML = "";
		this.nodes.view.appendChild(this.nodes.prevScrBtn);
		this.nodes.view.appendChild(this.nodes.prevBtn);

		for(var i = startSeq; i < endSeq + 1; ++i)
		{
			cell = cheatas.lib.createElement("button", "", "default");
			cell.seq = i;
			cell.value = cell.seq;

			this.nodes.view.appendChild(cell);
			this.cells.push(cell);

			// addEventListener
			cheatas.lib.addEventListener(cell, "click", function(e) {that.startAction(e);});
		}

		this.nodes.selectedCell = this.cells[this.pageSeq%this.pageGroupSize];
		this.nodes.selectedCell.setAttribute("class", this.nodes.selectedCell.className + " on");

		this.nodes.view.appendChild(this.nodes.nextScrBtn);
		this.nodes.view.appendChild(this.nodes.nextBtn);
	},

	movePage: function(dr) 
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.UIPageControl.movePage(dr)",
				"dr = " + dr
			]
		);

		var seq = this.pageSeq + dr;

		if(seq < 0)
		{
			return false;
		}

	    if(seq >= this.pageLength)
		{
			return false;
		}

		this.changePage(seq);

		return true;
	},

	changePage: function(seq) 
	{
		cheatas.lib.excuteDelegate(this.delegate, "changePage", [seq]);
	},

	startAction: function(e)
	{
		cheatas.debugger.log("Event",
			[
				"cheatas.UIPageControl.startAction(e)",
				"e = " + e
			]
		);

		var tg = cheatas.lib.getEventTarget(e);

        cheatas.lib.excuteDelegate(this.delegate, "changePage", [tg.seq]);
	}
}