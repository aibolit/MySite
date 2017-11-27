<!--
  To change this license header, choose License Headers in Project Properties.
  To change this template file, choose Tools | Templates
  and open the template in the editor.
-->

<!DOCTYPE html>

<html>

<head>
    <asset:javascript src="site/site.js" />
    <asset:stylesheet src="site/site.css" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Aleks Tamarkin</title>
</head>

<body>
    <div class="rootPane">
        <div class="contentPane">
            <div class="myPhoto">
                <asset:image src="mypic.jpg" /> </div>
            <div class="titleLabel"></div>
            <div class="contactLabel"></div>
            <div class="descLabel"></div>
            <div class="projectsDiv"></div>
        </div>
    </div>
    <div id="modal" style="visibility: hidden; position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 100">
        <div id="modal-shade"></div>
        <div id="modal-root"></div>
    </div>
</body>

</html>