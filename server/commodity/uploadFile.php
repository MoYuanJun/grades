<?PHP
/**文件上传:
 * 返回格式：
 * {
 * error: '0' || '1',   //文件上传（失败 || 成功）
 * img: url   //返回上传后的图片路径
 * }
 */
header('Access-Control-Allow-Origin:*');
//导入相关全局配置 
require_once '../config/upload.php';
//导入文件上传类
require_once '../libs/UploadFileClass.php';
//调用文件上传类
$file = $_FILES['file']; //获取传给后端的files
$upload = new UploadFile(true, '../img/commodity/', array('jpg', 'jpeg', 'png')); //创建文件上传类
$upload->upload_file($file);//调用文件上传类并执行方法，导入files

if( $upload->get_msg() === '文件上传成功' ){ //获取文件上传信息（失败 || 成功）
    $result['error'] = '1';
    $result['img'] = $com_img_default_url.$upload->get_new_name();  //获取上传后的文件名
} else {
    $result['error'] = '1';
}
echo json_encode($result);

?>