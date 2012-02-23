window.onload = function(){
	document.forms[0].onsubmit = function(){updateTwitter(); return false;}
	}


widget_no = 10; //global variable count of widget number to create unique id


function updateTwitter(){
	var searches = document.getElementsByTagName('input'),
		searchHeaders = [];
		
		if (!document.getElementsByClassName){
			searchHeaders = getElementsByClass('panelHeader');
		}else{
			searchHeaders = document.getElementsByClassName('panelHeader');
		}
		
	for (var i = 0; i < searches.length; i++){
		if (searches[i].value.length !== 0){
			TWTR_widgets[i].destroy();						//stop update on current search term
		//	TWTR_options[i].search = searches[i].value;  //assign new search term
			TWTR_widgets[i].search = searches[i].value;
			TWTR_widgets[i].render().start();
			searchHeaders[i].innerHTML = searches[i].value; 
		/*	var panel = document.getElementById('panel_'+ (i+1)),
			panel_children = panel.getElementsByTagName('*');
			for (var j=0; j < panel_children.length; j++){				// remove current nodes from display panel	
				panel.removeChild(panel.firstChild);
			}	
		    var twtrMarkup = document.createElement('div');
		    widget_no += 1;
		    twtrMarkup.id = 'twtr-widget' + widget_no;
		    panel.appendChild(twtrMarkup);
			TWTR_options[i].id = twtrMarkup.id;				// VERY important to set "id", otherwise widget fails-see notes below
			TWTR_widgets[i] = new TWTR.Widget(options[i]).render().start(); */
		}
	}
	document.forms[0].search_1.value = '';
	document.forms[0].search_2.value = '';	
}


function insertTWT(panel) {
    var twtrMarkup = document.createElement('div');
    widget_no += 1;
    twtrMarkup.id = 'twtr-widget' + widget_no;
    panel.appendChild(twtrMarkup);
	options_1.id = twtrMarkup.id;
	widget_01.stop();
	widget_01 = new TWTR.Widget(options_1).render().start();
}

function getElementsByClass(theClass){
	var allElements = [], returnElements = [];
	
	allElements = (document.all) ? document.all : document.getElementsByTagName("*");
	for (var i = 0; i< allElements.length; i++){
		if (allElements[i].className === theClass){
			returnElements.push(allElements[i]);
		}
	}
	return returnElements;
}




/*  
UPDATE from below:
didn't need to add/remove the DOM elements, or mess with the OPTIONS object.  ONLY need to 
set the "search" propery on the WIDGET itself to the new search term, NOT the "search" property on 
the OPTIONS object (which is passed as a parameter into the Widget when it gets instantiated & therefore,
used in the initial call)

----------------------------------------------------------------------------------------

global variables defined in the HTML code:
widget_01 ==> an instance of the TWTR.Widget object (within panel_1)
widget_02 ==> instance of the TWTR.Widget object (within panel_2)

looking inside the TWTR.Widget object (DOM inspector in firebug), the object has _proto_ methods:

stop()
clear()
destroy()

etc...therefore...

to stop the current search ==> widget_01.stop();
to instantiate a new search term/widget, 
create a new DOM element, and give it and ID, 
set the "search" propery to the new search term, set the "id" property to the new ID in the options object,
then ==> widget_01 = new TWTR.Widget(options_1).render.start();


** NEEDED the "ID" set to make this all work!! as found in the following post:

http://www.webdeveloper.com/forum/showthread.php?s=99f6b7be01f16cb69731b1189fd70511&t=240946&page=2

otherwise the error "TWTR is undefined" + other messages..can't remember (tried adding in a <script> node, but didn't work)

*/