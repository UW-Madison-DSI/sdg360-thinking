/******************************************************************************\
|                                                                              |
|                                 header-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the application header and associated content.           |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2023, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseView from '../../views/base-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	className: 'navbar navbar-default navbar-fixed-top navbar-inverse',

	template: _.template(`
		<a id="brand" href="#" id="brand" class="active navbar-brand">
			<img class="icon" src="<%= defaults.navbar.icon %>" />
			<div class="title hidden-xs"><%= defaults.navbar.title %></div>
		</a>

		<% if (defaults.navbar.navs) { %>
		<ul class="nav navbar-nav hidden-xs">
			<% let keys = Object.keys(defaults.navbar.navs); %>
			<% for (let i = 0; i < keys.length; i++) { %>
			<% let key = keys[i]; %>
			<% let item = defaults.navbar.navs[key]; %>
			<li<% if (nav == key) {%> class="active" <% } %>>
				<a href="#<%= key %>">
					<i class="<%= item.icon %>"></i>
					<span class="hidden-xs"><%= item.text %></span>
				</a>
			</li>
			<% } %>
		</ul>
		<% } %>

		<ul class="nav navbar-nav navbar-right">
			<button id="sign-in" class="btn">
				<i class="fa fa-sign-in-alt"></i>
				<span class="hidden-xs">Sign In</span>
			</button>
			<button id="sign-up" class="btn">
				<i class="fa fa-user-plus"></i>
				<span class="hidden-xs">Sign Up</span>
			</button>
		</ul>
	`),

	events: {
		'click #brand': 'onClickBrand'
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			nav: this.options.nav,
			user: application.session? application.session.user : undefined
		};
	},

	//
	// event handling methods
	//

	onClickBrand: function() {

		// go to welcome view
		//
		Backbone.history.navigate('#', {
			trigger: true
		});
	}
});
