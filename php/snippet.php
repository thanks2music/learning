<?php
/**
  * URLでステージング環境とローカル環境を判定
  *
  * @return bool
  */
function is_dev() {
  $current_url = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  $staging_keywords = [ 'ts-volleyballking-staging', 'localhost' ];

  foreach ( $staging_keywords as $keyword ) {
    if ( str_contains( $current_url, $keyword ) ) {
      return true;
    }
  }

  return false;
}
