<?php
/**
 * Custom Campaigns Class file
 *
 * @package 	CustomCampaign
 * @author 		Adam Onishi	<aonishi@wearearchitect.com>
 * @license 	GPL2
 * @copyright 	2014 Adam Onishi
 */

class WaaChristmasTouchpoints
{
	protected static $version = '0.0.1';

	protected static $plugin_slug = 'christmas-tree-touchpoints';

	protected static $instance = null;

	private function __construct()
	{
		// Setup post type
		add_action( 'init', array( $this, 'setupPostType') );

		// Include Stylesheet/scripts
		// add_action( 'wp_enqueue_scripts', array( $this, 'frontendScriptsStyles' ), 12 );
		// add_action( 'admin_enqueue_scripts', array( $this, 'adminScriptsStyles') );

		// Setup custom fields
		// add_action ('add_meta_boxes', array( $this, 'setupCustomField' ) );
		// add_action ('save_post', array( $this, 'saveCustomField' ) );

		// Ajax callback to restore CSS revisions
		// add_action('wp_ajax_restore_campaign_css', array( $this, 'restoreCampaignCss' ) );

		// add_action( 'wp_head', array($this, 'insertCustomStyles'), 50 );

	}

	public static function get_instance()
	{
		if( null === self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	public static function __callStatic($method, $args)
	{
		return call_user_func_array(array( static::get_instance(), $method ), $args);
	}

	/**
	 * Copy template into current theme
	 * @author Adam Onishi (aonishi@wearearchitect.com)
	 */
	public function copyTemplate()
	{
		// $template = plugin_dir_path( __FILE__ ) . '/templates/campaign.php';
		// $dest = get_stylesheet_directory() . '/templates/campaign.php';

		// if( ! file_exists( $dest ) ) {
		// 	copy( $template, $dest );
		// }
	}

	/**
	 * Remove template from current theme
	 * @author Adam Onishi (aonishi@wearearchitect.com)
	 */
	public function removeTemplate()
	{
		// $dest = get_stylesheet_directory() . '/templates/campaign.php';
		// $template_dir = get_stylesheet_directory() . '/templates';

		// if( file_exists( $dest ) ) {
		// 	unlink( $dest );
		// }

		// if ( $files = @scandir($template_dir) && (count($files) > 2) ) {
		// 	rmdir($template_dir);
		// }
	}

	/**
	 * Find or test the current template
	 * @author Adam Onishi (aonishi@wearearchitect.com)
	 * @param  string $name 	[template name to test against or false to return the name]
	 * @return boolean/string 	[true/false if is or not the template being used, or the name of the template if no name passed]
	 */
	private function isTemplate( $name = false )
	{
		global $post;

		$template_file = get_post_meta($post->ID,'_wp_page_template',TRUE);

		// check for a template type
		if( ! $name ) {
			return $template_file;
		}

		if ( $template_file === $name ) {
			return true;
		}

		return false;
	}

	/**
	 * Enqueue scripts and styles for the front end campaign page
	 * @author Adam Onishi (aonishi@wearearchitect.com)
	 */
	public function frontendScriptsStyles()
	{
		// CSS for the front end
		// if( !is_admin() && $this->isTemplate('templates/campaign.php') ) {

		// }
	}

	public function setupPostType()
	{
		// Help kids learn post type
		$labels = array(
			'name'               => __('Day', 'dirtisgood'),
			'singular_name'      => __('Days', 'dirtisgood'),
			'add_new'            => __('Add New', 'dirtisgood'),
			'add_new_item'       => __('Add New Day', 'dirtisgood'),
			'edit_item'          => __('Edit Day', 'dirtisgood'),
			'new_item'           => __('New Day', 'dirtisgood'),
			'all_items'          => __('All Days', 'dirtisgood'),
			'view_item'          => __('View Days', 'dirtisgood'),
			'search_items'       => __('Search Days', 'dirtisgood'),
			'not_found'          => __('No days found', 'dirtisgood'),
			'not_found_in_trash' => __('No days found in Trash', 'dirtisgood'),
			'parent_item_colon'  => '',
			'menu_name'          => __('Christmas Touchpoints', 'dirtisgood'),
		);

		$args = array(
			'labels'             => $labels,
			'public'             => true,
			'rewrite'            => array( 'slug' => 'every-little-helpers' ),
			'capability_type'    => 'post',
			'has_archive'        => false,
			'hierarchical'       => false,
			'menu_position'      => 5,
			'supports'           => array( 'title', 'editor', 'author', 'revisions', 'page-attributes' ),
		);

		register_post_type( 'waa_xmas_touchpoints', $args );
	}
}
