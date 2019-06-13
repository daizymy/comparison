<?php

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/* also read https://codex.wordpress.org/Writing_a_Plugin */

/*

Plugin Name: BA Comparsion
Description: Compare products
Version: 2019-05-17
Author: Philipp Paul
Author URI: https://www.babyartikel.de/magazin

*/

/* Plugin-Code UNTERhalb dieser Zeile */


// Product Comparsion

function wp_ba_comparsion($atts) { 
	$a = shortcode_atts( array (
        	'variables' => false,
        	'template' => 'mag-product',
			'area' => 'area1',
			'varname' => 'pid',
    	), $atts );

	if ($a['variables']) {
		$variables = explode("&",preg_replace('/\s+/', '', $a['variables'])); 
		foreach ($variables as &$vars) {
			$v = explode("=",$vars);
			$var[$v[0]]=$v[1];
		}
	};
	wp_enqueue_script('wp-ba-comparsion', plugin_dir_url(__FILE__) . 'js/ba-comparsion.js', array('jquery'), '1.0');
	wp_enqueue_style( 'wp-ba-comparsion', plugin_dir_url(__FILE__) . 'css/style.css' );
	$result = '
	<div class="comparsionWrapper">
			<input type="text" id="compareItems" value="201700004903,201900001522">
			<button id="comparsionStart" class="btn btn-default">Berechnen</button>
			<div id="comparsionResults"></div>
	</div>
	';
	return $result;
};

add_shortcode( 'comparsion', 'wp_ba_comparsion' );

/* Plugin-Code OBERhalb dieser Zeile */

 ?>