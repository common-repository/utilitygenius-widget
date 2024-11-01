<?php
/**
 * Plugin Name:       UtilityGenius Widget
 * Description:       A Gutenberg block for displaying either an Ad or Full Page UtilityGenius widget.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           1.0.2
 * Author:            UtilityGenius
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       utility-genius-widget
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_utility_genius_widget_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_utility_genius_widget_block_init' );
