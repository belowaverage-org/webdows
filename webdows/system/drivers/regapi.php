<?php
// Below Average //Shale Data Manager JSON // Krisdb2009 // 1.5.6 // Unix Safe // Collision Safe //
//Settings
$pathToDB     = __DIR__.'../registry/';
$ext          = '.dat';
$crypt        = '1234567812345678'; //16/24/32 Char long key
$cryptEnabled = true;
//
//Clean path input because its dirty
function cleanPath($path)
{
    $path = str_replace('\\', '/', $path);
    $list = array('.', './', '../');
    $path = str_replace($list, '', $path);
    return $path;
}
//
//$array = loadDB('asdf\asdf\asdf'); //Loads a database to an array
function loadDB($path)
{
    $path = cleanPath($path);
    global $pathToDB;
    global $ext;
    global $crypt;
    if(file_exists($pathToDB.$path.$ext))
    {
        $file = fopen($pathToDB.$path.$ext, "r"); //File Path Open
        $locked = true;
        while($locked)
        {
            if(flock($file, LOCK_SH)) //If can lock read.
            {
                $data = json_decode(decrypt(@file_get_contents($pathToDB.$path.$ext), $crypt), true);
                flock($file, LOCK_UN);
                $locked = false;
            }
            else
            {
                $locked = true;
            }
        }
        fclose($file);
    }
    else
    {
        $data = array();
    }
    return $data;
}
//
//putDB($array, 'asdf\asdf\asdf'); //Save a database from array (locks file when writing to prevent file deletion.)
function putDB($arraydata, $path)
{
    $path = cleanPath($path);
    global $pathToDB;
    global $ext;
    global $crypt;
    if(file_exists($pathToDB.$path.$ext))
    {
        global $DBencryptionKey;
        $file = fopen($pathToDB.$path.$ext, "c"); //File Path Open
        if(flock($file, LOCK_EX)) //If can lock write
        {
            ftruncate($file, 0);
            fwrite($file, encrypt(json_encode($arraydata),$crypt));
            fflush($file);
            flock($file, LOCK_UN);
        }
        fclose($file);
        return true;
    }
    else
    {
        $dir = preg_replace('#[^\/\/]*$#', '', $pathToDB.$path); //Path minus last segment e.g. (asdf/asdf/asd) to (asdf/asdf)
        @mkdir($dir, 0777, true);
        file_put_contents($pathToDB.$path.$ext, encrypt(json_encode($arraydata),$crypt), LOCK_EX);
        return true;
    }
}
//
//dropDB('asdf\asdf\asdf'); //Delete the database
function dropDB($path)
{
    $path = cleanPath($path);
    global $pathToDB;
    global $ext;
    @unlink($pathToDB.$path.$ext);
}
//
//listDB('asdf\asdf\asdf'); //List the database's in a folder
function listDB($path)
{
    $path = cleanPath($path);
    global $pathToDB;
    global $ext;
    $glob = glob($pathToDB.$path.'/*'.$ext);
    $glob = str_replace($pathToDB.$path.'/','', $glob);
    $glob = str_replace($ext,'', $glob);
    return $glob;
}
//
//Future functions
//cleanDB(); procedure to scan the whole database and remove whitespace and empty folders
//
//backupDB(); procedure to scan the whole database, and back it up in a zip file with the date stamped on it.
//
//restorebackupDB($date); procedure to find the latest backup, if $date is not given, and restore it.
//Encryption Functionality
function encrypt($data, $key)
{
    global $cryptEnabled;
    if($cryptEnabled)
    {
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_CBC);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        return base64_encode($iv . mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, $data, MCRYPT_MODE_CBC, $iv)); 
    }
    else
    {
        return $data;
    }
}
//
function decrypt($data, $key)
{
    if(base64_decode($data, true))
    {
        $data = base64_decode($data);
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_CBC);
        $iv = substr($data, 0, $iv_size);
        $data = substr($data, $iv_size);
        return rtrim(@mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, $data, MCRYPT_MODE_CBC, $iv), chr(0));
    }
    else
    {
        return $data;
    }
}
//
?>