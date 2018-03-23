<?php

define( 'THEME_VERSION', '0.0.1' );

if ( !function_exists( 'theme_setup' ) ) {

// Register Theme Features
   function theme_setup() {

      // Add theme support for document Title tag
      add_theme_support( 'title-tag' );
   }

   add_action( 'after_setup_theme', 'theme_setup' );

}

// Register Scripts
function theme_scripts() {
  $themecsspath = get_stylesheet_directory() . '/css/styles.css';
  $themejspath = get_stylesheet_directory() . '/js/bundle.js';

  // wp_enqueue_style( 'theme.style', get_bloginfo( 'template_directory' ).'/dist/style.css', array(), THEME_VERSION );
  wp_enqueue_style( 'theme.style', get_bloginfo( 'template_directory' ).'/dist/style.css', array(), filemtime( $themecsspath ) );
  // wp_enqueue_script( 'theme.js', get_bloginfo( 'template_directory' ).'/dist/main.bundle.js', array(), THEME_VERSION );
  wp_enqueue_script( 'theme.js', get_bloginfo( 'template_directory' ).'/dist/bundle.js', array(), THEME_VERSION );
}

add_action( 'wp_enqueue_scripts', 'theme_scripts' );

/*=============================
=            Widgets           =
=============================*/
function create_widget( $name, $id, $description ) {
    register_sidebar(array(
      'name' => __( $name ),
      'id'   => $id,
      'description' => __( $description ),
      'before_widget' => '<div class="widget">',
      'after_widget' => '</div>',
      'before_title' => '<h2>',
      'after_title' => '</h2>'
    ));
}

create_widget( 'Front Page Left', 'front-left', 'Displays on the left of the hompage');
create_widget( 'Front Page Center', 'front-center', 'Displays on the center of the hompage');
create_widget( 'Front Page Right', 'front-right', 'Displays on the right of the hompage');
// sidebar
create_widget( 'Page Sidebar', 'page', 'Displays on side of pages with sidebar');

/*=============================
=            Google Fonts            =
=============================*/
function tutsplus_add_google_fonts() {
  wp_register_style( 'googleFonts', 'http://fonts.googleapis.com/css?family=Open+Sans:400,300' );
  wp_enqueue_style( 'googleFonts' );
}

add_action( 'wp_enqueue_scripts', 'tutsplus_add_google_fonts' );

/*=============================
=            Menus            =
=============================*/
add_theme_support( 'menus' );

function domsters_static_register_menu() {
  register_nav_menu('main-menu', __( 'Main Menu') );
}

add_action('init', 'domsters_static_register_menu');

// // load CSS
// function theme_styles() {
//     wp_enqueue_style( 'custom_css', get_template_directory_uri() . '/css/basic.css' );
// }

// add_action( 'wp_enqueue_scripts', 'theme_styles' );

// // load JavaScript
// function theme_js() {
//   wp_enqueue_script( 'global_js', get_template_directory_uri() . '/js/global.js', '', '', true );
//     wp_enqueue_script( 'home_js', get_template_directory_uri() . '/js/home.js', '', '', true );
// }
// add_action( 'wp_enqueue_scripts', 'theme_js' );

