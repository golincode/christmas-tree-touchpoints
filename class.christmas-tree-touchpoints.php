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
		// Setup post type & custom fields
		add_action( 'init', array( $this, 'setupPostType') );
		add_action( 'init', array( $this, 'setupCustomFields') );

		// Include Stylesheet/scripts
		add_action( 'wp_enqueue_scripts', array( $this, 'frontendScriptsStyles' ), 12 );

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
		$file = dirname(__FILE__) . '/christmas-tree-touchpoints.php';
		$plugin_url = plugin_dir_url($file);

		// CSS for the front end
		if( ! is_admin() && $this->isTemplate('templates/christmas-touchpoints.php') ) {
			wp_enqueue_style( 'waa-xmas', $plugin_url . 'css/xmas.css', false, $this->version, 'screen' );

			wp_enqueue_script( 'waa-tree-modernizr', $plugin_url . 'js/modernizr.js', false, $this->version, false );
			// wp_enqueue_script( 'waa-tree-script', $plugin_url . 'js/christmas-tree-touchpoints.js', false, $this->version, true );
		}
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
			'labels'              => $labels,
			'public'              => true,
			'rewrite'             => array( 'slug' => 'every-little-helpers' ),
			'capability_type'     => 'post',
			'has_archive'         => false,
			'exclude_from_search' => true,
			'show_in_nav_menus'   => false,
			'hierarchical'        => false,
			'publicly_queryable'  => false,
			'menu_position'       => 2,
			'menu_icon'           => 'dashicons-star-filled',
			'supports'            => array( 'title', 'author', 'revisions', 'page-attributes' ),
		);

		register_post_type( 'waa_xmas_touchpoints', $args );
	}

	public function setupCustomFields()
	{
		if(function_exists("register_field_group"))
		{
			register_field_group(array (
				'id' => 'acf_xmas-touchpoints',
				'title' => 'Xmas Touchpoints',
				'fields' => array (
					array (
						'key' => 'field_5469d34db2fc6',
						'label' => 'Touchpoints',
						'name' => 'waa_touchpoints',
						'type' => 'repeater',
						'instructions' => 'Add examples of good customer feedback on a variety of social platforms (max 6 per day)',
						'sub_fields' => array (
							array (
								'key' => 'field_5469d384b2fc7',
								'label' => 'Title',
								'name' => 'waa_ctp_title',
								'type' => 'text',
								'column_width' => '',
								'default_value' => '',
								'placeholder' => '',
								'prepend' => '',
								'append' => '',
								'formatting' => 'html',
								'maxlength' => '',
							),
							array (
								'key' => 'field_5469d74a324ae',
								'label' => 'Image',
								'name' => 'waa_ctp_image',
								'type' => 'image',
								'instructions' => 'Should be 400x240px in size, optimised to about 70% jpg when exported from Photoshop.',
								'column_width' => '',
								'save_format' => 'url',
								'preview_size' => 'thumbnail',
								'library' => 'all',
							),
							array (
								'key' => 'field_5469d407b2fc8',
								'label' => 'Content',
								'name' => 'waa_ctp_content',
								'type' => 'textarea',
								'column_width' => '',
								'default_value' => '',
								'placeholder' => '',
								'maxlength' => '',
								'rows' => '',
								'formatting' => 'br',
							),
							array (
								'key' => 'field_5469d421b2fc9',
								'label' => 'Link',
								'name' => 'waa_ctp_link',
								'type' => 'text',
								'column_width' => '',
								'default_value' => '',
								'placeholder' => '',
								'prepend' => '',
								'append' => '',
								'formatting' => 'html',
								'maxlength' => '',
							),
							array (
								'key' => 'field_5469d459b2fca',
								'label' => 'Icon',
								'name' => 'waa_ctp_icon',
								'type' => 'select',
								'column_width' => '',
								'choices' => array (
									'offer' => 'Colleague offer',
									'facebook' => 'Facebook',
									'news' => 'News',
									'twitter' => 'Twitter',
									'yammer' => 'Yammer',
									'youtube' => 'YouTube',
								),
								'default_value' => '',
								'allow_null' => 0,
								'multiple' => 0,
							),
						),
						'row_min' => '',
						'row_limit' => 6,
						'layout' => 'row',
						'button_label' => 'Add Touchpoint',
					),
				),
				'location' => array (
					array (
						array (
							'param' => 'post_type',
							'operator' => '==',
							'value' => 'waa_xmas_touchpoints',
							'order_no' => 0,
							'group_no' => 0,
						),
					),
				),
				'options' => array (
					'position' => 'acf_after_title',
					'layout' => 'no_box',
					'hide_on_screen' => array (
					),
				),
				'menu_order' => 0,
			));
		}
	}
}
