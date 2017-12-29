<?php
header("Access-Control-Allow-Origin: *");
$callback=$_GET['callback'];
$result=json_encode(array('data'=>array('music'=>array(
	array(
		'title'=> '001',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/001.mp3'
	),
	array(
		'title'=> '002',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/002.mp3'
	),
	array(
		'title'=> '003',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/003.mp3'
	),
	array(
		'title'=> '004',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/004.mp3'
	),
	array(
		'title'=> '005',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/005.mp3'
	),
	array(
		'title'=> '006',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/006.mp3'
	),
	array(
		'title'=> '007',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/007.mp3'
	),
	array(
		'title'=> '008',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/008.mp3'
	),
	array(
		'title'=> '009',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/009.mp3'
	),
	array(
		'title'=> '010',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/010.mp3'
	),
	array(
		'title'=> '011',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/011.mp3'
	),
	array(
		'title'=> '012',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/012.mp3'
	),
	array(
		'title'=> '013',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/013.mp3'
	),
	array(
		'title'=> '014',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/014.mp3'
	),
	array(
		'title'=> '015',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/015.mp3'
	),
	array(
		'title'=> '016',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/016.mp3'
	),
	array(
		'title'=> '017',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/017.mp3'
	),
	array(
		'title'=> '018',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/018.mp3'
	),
	array(
		'title'=> '019',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/019.mp3'
	),
	array(
		'title'=> '020',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/020.mp3'
	),
	array(
		'title'=> '021',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/021.mp3'
	),
	array(
		'title'=> '022',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/022.mp3'
	),
	array(
		'title'=> '023',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/023.mp3'
	),
	array(
		'title'=> '024',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/024.mp3'
	),
	array(
		'title'=> '025',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/025.mp3'
	),
	array(
		'title'=> '026',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/026.mp3'
	),
	array(
		'title'=> '027',
		'author'=> '来源于网络',
		'url'=> 'http://qiniu.luojianet.com/3dmusic/027.mp3'
	)
)),'result'=>0,'msg'=>'获取成功！'));
echo $callback."($result)"; 
// echo json_encode(array('data'=>array('places'=>6),'ret'=>100,'msg'=>'获取成功！'));
// echo json_encode({a:1,b:2});
?>

