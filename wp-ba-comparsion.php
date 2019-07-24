<?php

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/* also read https://codex.wordpress.org/Writing_a_Plugin */

/*

Plugin Name: wp_ba_comparetool
Description: Compare products
Version: 2019-05-17
Author: Liliya Pyak
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

	wp_enqueue_script('js-js-mobile-js', plugin_dir_url(__FILE__) . 'js/js-mobile.js', array('jquery'));
	wp_enqueue_script('js-ba-comparison-js', plugin_dir_url(__FILE__) . 'js/ba-comparsion.js', array('jquery'));
	//wp_enqueue_style('css-css-mobile-css', plugin_dir_url(__FILE__) . 'css/css-mobile.css');
	wp_enqueue_style( 'css-style-css', plugin_dir_url(__FILE__) . 'css/style.css' );
	wp_enqueue_script('jqSw', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.4/jquery.touchSwipe.min.js');

//
wp_enqueue_script('swipeScr','https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.4/jquery.touchSwipe.min.js');
	$result = '
			<div class="row">
				<div class="col-12 padding-0">
					<input type="text" id="compareItems" value="201900001821,201400007688,201700001700,201800005002">
					<button id="comparsionStart" class="btn btn-primary">Berechnen</button>
				</div>
			</div>

			<div class="row small" id="comparisonListHeader">
				<div id="comparisonHeaderCarousel1" class="col-6 padding-0 carousel slide carousel-sync1"  data-ride="false" data-interval=false>
					<div id="comparisonHeaderProducts1" class="carousel-inner"></div>
					<ol class="carousel-indicators" style="position:relative;"></ol>
				</div>

				<div id="comparisonHeaderCarousel2" class="col-6 padding-0 carousel slide carousel-sync2"  data-ride="false" data-interval=false>
					<div id="comparisonHeaderProducts2" class="carousel-inner"></div>
					<ol class="carousel-indicators" style="position:relative;"></ol>
				</div>
			</div>
			

			<div class="row small" id="comparisonListWrapper" style="display:none;">
				<div id="comparisonCarousel1" class="col-6 padding-0  carousel slide carousel-sync1" data-ride="false" data-interval=false>
					<ol class="carousel-indicators" style="position:relative;"></ol>
					<div id="comparisonProducts1" class="carousel-inner"></div>
				  	

					  	<a  class="carousel-control-prev" href="#comparisonCarousel1" role="button" data-slide="prev">
						    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
						    <span class="sr-only">Previous</span>
					  	</a>


					  	<a class="carousel-control-next" href="#comparisonCarousel1" role="button" data-slide="next">
							<span class="carousel-control-next-icon" aria-hidden="true"></span>
							<span class="sr-only">Next</span>
						</a>


				</div>


				<div id="comparisonCarousel2" class="col-6 padding-0 carousel slide carousel-sync2" data-ride=false data-interval=false>
					<ol class="carousel-indicators" style="position:relative;"></ol>
					<div id="comparisonProducts2" class="carousel-inner"></div>

						<a class="carousel-control-prev" href="#comparisonCarousel2" role="button" data-slide="prev">
							<span class="carousel-control-prev-icon" aria-hidden="true""></span>
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
