/******************************************************************************\
|                                                                              |
|                                application.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the top level application.                               |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2023, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Router from './router.js';
import MainView from './views/layout/main-view.js';
import PageView from './views/layout/page-view.js';
import DialogView from './views/dialogs/dialog-view.js';
import Alertable from './views/dialogs/behaviors/alertable.js';
import Browser from './utilities/web/browser.js';
import Audio from './utilities/multimedia/audio.js';
import Sound from './utilities/multimedia/sound.js';

export default Marionette.Application.extend(_.extend({}, Alertable, {

	//
	// attributes
	//

	region: {
		el: 'body',
		replaceElement: false
	},

	//
	// constructor
	//

	initialize: function() {

		// add helpful class for mobile OS'es
		//
		$('body').attr('device', Browser.device);
		if (Browser.device == 'phone' || Browser.device == 'tablet') {
			$('body').addClass('mobile');
		}

		// store handle to application
		//
		window.application = this;

		// disable pinch zoom on touch devices
		//
		if (Browser.is_touch_enabled) {
			document.addEventListener('touchmove', (event) => {
				if (event.scale !== 1) {
					event.preventDefault();
				}
			}, false);
		}

		// create routers
		//
		this.router = new Router();
	},

	//
	// sound playing methods
	//

	play: function(name) {

		// create new audio context
		//
		if (!this.audio) {
			this.audio = new Audio();
		}

		let sound = new Sound({
			url: 'sounds/' + name
		});

		// start audio
		//
		sound.setVolume(0.1);
		sound.play(this.audio);
	},

	//
	// methods
	//

	start: function() {

		// call superclass method
		//
		Marionette.Application.prototype.start.call(this);

		// call initializer
		//
		this.initialize();

		// check to see if user is logged in
		//
		Backbone.history.start();
	},

	navigate: function(url, options) {
		this.router.navigate(url, options);
	},

	//
	// rendering methods
	//

	show: function(view, options) {
		if (view instanceof DialogView) {

			// show modal dialog
			//
			this.showDialog(view, options);
		} else if (!options || !options.full_screen) {

			// show page view
			//
			this.showView(new PageView({
				contentView: view,
				nav: options? options.nav : undefined,
				full_width: options? options.full_width: undefined
			}));
		} else {

			// show main view
			//
			this.showView(new MainView({
				contentView: view,
				nav: options? options.nav : undefined
			}));
		}
	}
}));