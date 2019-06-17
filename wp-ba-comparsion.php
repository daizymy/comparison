<?php

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/* also read https://codex.wordpress.org/Writing_a_Plugin */

/*

Plugin Name: BA product comparison
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

	wp_enqueue_script('wp-ba-comparsion', plugin_dir_url(__FILE__) . 'js/ba-comparsion.js', array('jquery'));
	wp_enqueue_style( 'wp-ba-comparsion', plugin_dir_url(__FILE__) . 'css/style.css' );
	$result = '
			<div class="row">
				<div class="col-12 padding-0">
					<input type="text" id="compareItems" value="201300000302,201700004903,201900001522">
					<button id="comparsionStart" class="btn btn-default">Berechnen</button>
				</div>
			</div>
			<div class="row small" id="comparisonListWrapper">
				<div id="comparisonFeatures" class="col-4 padding-0 compareItemParent"></div>

				<div id="comparisonCarousel1" class="col-4 padding-0 carousel slide" data-ride="carousel" data-interval=false>
					<ol class="carousel-indicators"></ol>
					<div id="comparisonProducts1" class="carousel-inner"></div>
					<a class="carousel-control-prev" href="#comparisonCarousel1" role="button" data-slide="prev">
				    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
				    <span class="sr-only">Previous</span>
				  </a>
				  <a class="carousel-control-next" href="#comparisonCarousel1" role="button" data-slide="next">
				    <span class="carousel-control-next-icon" aria-hidden="true"></span>
				    <span class="sr-only">Next</span>
				  </a>
				</div>

				<div id="comparisonCarousel2" class="col-4 padding-0 carousel slide" data-ride="carousel" data-interval=false>
					<ol class="carousel-indicators"></ol>
					<div id="comparisonProducts2" class="carousel-inner"></div>
					<a class="carousel-control-prev" href="#comparisonCarousel2" role="button" data-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="sr-only">Previous</span>
					</a>
					<a class="carousel-control-next" href="#comparisonCarousel2" role="button" data-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="sr-only">Next</span>
					</a>
				</div>
			</div>
	';
	return $result;
};

add_shortcode( 'comparsion', 'wp_ba_comparsion' );

/* Plugin-Code OBERhalb dieser Zeile */

 ?>
