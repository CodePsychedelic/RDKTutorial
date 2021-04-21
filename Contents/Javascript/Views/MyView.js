// Create a new View class and extended it from the MAF.system.SidebarView
var MyView = new MAF.Class( {
	ClassName: 'MyView',

	Extends: MAF.system.SidebarView,

	// Create your view template
	createView: function() {
    // Reference to the current view
    var view = this;

	// add a textview -- helloWorld Label
	// ----------------------------------
	var hwLabel = new MAF.element.Text({
		label: "Hello World",
		styles: {
			fontSize: 30,
			width: view.width,
			anchorStyle: 'center',
			hOffset: 10,
			vOffset: 10
		}
	}).appendTo(view);
	// ----------------------------------

	// dataGrid
	// ----------------------------------
	view.elements.dataGrid = new MAF.element.Grid({
		rows: 5,
		columns: 1,
		styles: {
			width: view.width,
			height: view.height - hwLabel.outerHeight,
			vOffset: hwLabel.outerHeight
		},
		cellCreator: function(){

			// create cell
			// ---------------------------------------------
			var cell = new MAF.control.GridCell({
				styles: this.getCellDimensions(),
				events: {
					onSelect: function (event){
						log(event.payload.dataItem);

						// load a new view, with selected item payload
						MAF.application.loadView('MyDetailView', event.payload.dataItem);
					}
				}
			});
			// ---------------------------------------------

			// title style
			// ---------------------------------------------
			cell.title = new MAF.element.Text({
				visibleLines: 2,

				// new object for styles
				styles:{
					width: cell.width - 20,
					fontSize: 30,
					hOffset: 10,
					vOffset: 10,
					wrap: true
				}
			}).appendTo(cell);
			// ---------------------------------------------

			// description style
			// ---------------------------------------------
			cell.desc = new MAF.element.Text({
				visibleLines: 2,
				styles: {
					fontSize: 24,
					width: cell.width - 20,
					hOffset: 10,
					vOffset: cell.title.outerHeight,
					wrap: true,
					truncation: 'end'	// if len(desc) > 2 lines then truncate with ".."
				}
			}).appendTo(cell);
			// ---------------------------------------------

			return cell;
		},

		cellUpdater: function (cell, data){
			cell.title.setText(data.title); // set the title of rss feed to show
			cell.desc.setText(data.description);
		}
	}).appendTo(view);
	// ----------------------------------

	},

	// After create view and when returning to the view the update view is called
	updateView: function() {
    	var view = this;
    	new Request({
			url: "http://feeds.bbci.co.uk/news/world/europe/rss.xml",	// feed
			proxy: {
				json: true												// convert xml to json
			},
			onSuccess: function (json){
				log(json);

				// update the dataset through live feed
				view.elements.dataGrid.changeDataset(json.rss.channel.item);
			}
		}).send();
  	}
} );
