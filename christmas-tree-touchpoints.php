<?php
/**
 * Plugin Name: Christmass Tree Touchpoints
 * Description: Adds custom post type and templates to work with a desktop and mobile promotion for good customer service across social media
 * Version: 0.0.1
 * Author: Architect
 * Author URI: http://wearearchitect.com
 * Licence:  GPLv2 or later
 * Text Domain: arcxmas
 */
/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

// If file is called directly, abort
if( ! defined( 'WPINC' ) ) {
	die;
}

// Load the plugin class file
require_once( plugin_dir_path( __FILE__ ) . 'class.christmas-tree-touchpoints.php' );

// Activation/deactivation hooks
register_activation_hook( __FILE__, array( 'WaaChristmasTouchpoints', 'copyTemplate') );
register_deactivation_hook( __FILE__, array( 'WaaChristmasTouchpoints', 'removeTemplate') );

// Load the plugin (not sure if this is really needed unless we're running the functionality)
add_action( 'plugins_loaded', array( 'WaaChristmasTouchpoints', 'get_instance' ) );


/**
 * TEMPLATE TAGS
 * - wrappers for class functions
 */

function waa_toggle_switch($option) {
	WaaChristmasTouchpoints::toggleSwitch($option);
}

function waa_touchpoints_pagination($query) {
	WaaChristmasTouchpoints::pagination($query);
}
