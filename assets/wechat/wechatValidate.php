<?php
/**
 * Created by IntelliJ IDEA.
 * User: henry
 * Date: 16/5/19
 * Time: 上午9:33
 */
    $timestamp = $_GET['timestamp'];
    $nonce     = $_GET['nonce'];
    $token     = 'buddyWechat';
    $signature = $_GET['signature'];
    $array     = array($timestamp,$nonce,$token);
    sort( $array );
    $tmpstr = implode('',$array);
    $tmpstr = sha1($tmpstr);
    if($tmpstr == $signature) {
        echo $_GET['echostr'];
        exit;
    }