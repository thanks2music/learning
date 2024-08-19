<?php
if ( !defined( 'ABSPATH' ) ) exit;

// Remove unnecessary functions
// 本体バージョンを非表示
remove_action( 'wp_head','wp_generator' );
// フィードを消す
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'feed_links_extra', 3 );
// EditURIとwlwmanifestは使用しない
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
// 短縮用URLをheadで表示する必要無し
remove_action( 'wp_head', 'wp_shortlink_wp_head' );

// NOTE: 以下の機能はプロジェクトに応じてコメントをオフにする事
// REST APIは使用しないなら閉じておく
remove_action('wp_head','rest_output_link_wp_head');
// コメントフィードを非表示にする
remove_action('wp_head', 'feed_links_extra', 3);
// ブログカードは使わない
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'wp_oembed_add_host_js' );
//Gutenbergを使わないなら、CSSは必要ない
function disable_gutenberg_css() {
  wp_dequeue_style('wp-block-library');
}
add_action( 'wp_enqueue_scripts', 'disable_gutenberg_css', 9999);

// 絵文字のAssetは読み込まない
function remove_emoji() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
}
add_action( 'init', 'remove_emoji' );

// 不要なDNSフェッチを消す
function remove_dns_prefetch( $hints, $relation_type ) {
	if ( 'dns-prefetch' === $relation_type ) {
		return array_diff( wp_dependencies_unique_hosts(), $hints );
	}
	return $hints;
}
add_filter( 'wp_resource_hints', 'remove_dns_prefetch', 10, 2 );

// ブロックエディタ用のCSSをインラインで出力させない (global-styles-inline-css)
add_action( 'wp_enqueue_scripts', 'remove_inline_global_styles' );
function remove_inline_global_styles() {
	wp_dequeue_style( 'global-styles' );
}

// WordPressのバージョンが付与されたQueryString付きファイル名にはしない
function vc_remove_wp_ver_css_js( $src ) {
  if ( strpos( $src, 'ver=' . get_bloginfo( 'version' ) ) )
    $src = remove_query_arg( 'ver', $src );
  return $src;
}
add_filter( 'style_loader_src', 'vc_remove_wp_ver_css_js', 9999 );
add_filter( 'script_loader_src', 'vc_remove_wp_ver_css_js', 9999 );

// for Plugins
// if Elementor
// Google Fontsの削除
// add_filter( 'elementor/frontend/print_google_fonts', '__return_false' );
// Font Awesome読み込みを停止
// add_action( 'elementor/frontend/after_register_styles',function() {
// 	foreach( [ 'solid', 'regular', 'brands' ] as $style ) {
// 		wp_deregister_style( 'elementor-icons-fa-' . $style );
// 	}
// }, 20 );

// if WPML
// global $sitepress;
// if (! empty( $sitepress )) {
//   remove_action( 'wp_head', array( $sitepress, 'meta_generator_tag' ));
// }

