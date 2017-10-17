<?php
function wfsBuild($dir) {
    $contents = array();
    foreach(scandir($dir) as $node) {
        if($node == '.')          continue;
        if($node == '..')         continue;
        if($node == '.git')       continue;
        if($node == 'Thumbs.db')  continue;
        if($node == 'CNAME')      continue;
        if($node == '.gitignore') continue;
        if($node == 'readme.md')  continue;
		if($node == '.gitmodules')  continue;
		if($node == 'WFS.php')  continue;
        if (is_dir($dir.DIRECTORY_SEPARATOR.$node)) {
            $contents[$node] = wfsBuild($dir.DIRECTORY_SEPARATOR.$node);
        } else {
            $contents[] = $node;
        }
    }
    return $contents;
}
$wfs = wfsBuild('./');
file_put_contents('webdows/config/wfs.json', json_encode($wfs));
?>