// Create a new View class and extended it from the MAF.system.SidebarView
var MyDetailView = new MAF.Class( {
	ClassName: 'MyDetailView',

	Extends: MAF.system.SidebarView,

	// Create your view template
	createView: function() {
		// Reference to the current view
		var view = this;

		// make a back button
		var backButton = new MAF.control.BackButton().appendTo(view);


		// information box
		// -----------------------------------------------------------------------
		// title
		view.elements.title = new MAF.element.Text({
			visibleLines: 2,
			styles: {
				fontSize: 40,
				hOffset: 10,
				wrap: true,
				truncation: 'end',
				vOffset: backButton.outerHeight
			}
		}).appendTo(view);

		// pubDate
		view.elements.pubDate = new MAF.element.Text({
			styles: {
				fontSize: 20,
				width: view.width - 20,
				hOffset: 10,
				vOffset: view.elements.title.outerHeight + 5
			}
		}).appendTo(view);

		// description
		view.elements.desc = new MAF.element.Text({
			visibleLines: 5,
			styles:{
				fontSize: 25,
				width: view.width - 20,
				hOffset: 10,
				vOffset: view.elements.pubDate.outerHeight + 10,
				wrap: true,
				truncation: 'end'
			}
		}).appendTo(view);
		// -----------------------------------------------------------------------

		// image
		view.elements.newsImage = new MAF.element.Image({
			aspect: 'auto',
			styles: {
				width: view.width - 20,
				hOffset: 10,
				vOffset: view.elements.desc.outerHeight
			}
		}).appendTo(view);

	},

	// After create view and when returning to the view the update view is called
	updateView: function() {
    	var view = this;
    	log("other side");
    	log(view.persist);

    	view.elements.title.setText(view.persist.title);
    	view.elements.pubDate.setText(view.persist.pubDate);
    	view.elements.desc.setText(view.persist.description);

		if(view.persist.hasOwnProperty('media:thumbnail')) {
			var media = view.persist['media:thumbnail'];
			view.elements.newsImage.setSource(media[media.length - 1].url);
		}
  	}
} );
