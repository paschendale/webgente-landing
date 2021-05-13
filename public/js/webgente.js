/* Inicializando o mapa, initView é inicializado dentro de uma tag script do index.ejs pois recebe dados do backend */

var bounds = [[0,0],[4724.41,3543.31]]

var boundsToShow =  [[2100,1050],[2650,2500]]

var map = L.map('map', {
    crs: L.CRS.Simple,
    maxZoom: 4,
    minZoom: -2,
    zoomSnap: 0.25,
    maxBounds: bounds,
    scrollWheelZoom: false
});

/* dando resize no mapa pra ficar abaixo da navbar */
$('#map').height(window.innerHeight-document.getElementById('navbar-website').clientHeight-document.getElementById('navbar-webgente').clientHeight)

window.onresize = function() {
    $('#map').height(window.innerHeight-document.getElementById('navbar-website').clientHeight-document.getElementById('navbar-webgente').clientHeight) 
    map.fitBounds(boundsToShow);
}

/* Adicionando escala gráfica ao mapa */

var optionsScale = {
    metric: true, //Define a unidade em m/km
    imperial: false //Define a unidade em mi/ft
};

L.control.scale(optionsScale).addTo(map);

/* TODO: Mudar a imagem carregada de acordo com o tipo de dispositivo */
var image = L.imageOverlay('/img/mapbackground2.png',bounds).addTo(map);
var image2 = L.imageOverlay('/img/mapbackground2.png',bounds);

map.fitBounds(boundsToShow);

map.on('click',() => { map.fitBounds(boundsToShow); })

/* Inicializa o Controle de Camadas com as Camadas Base Estáticas */

var baseMaps = {
    'Camadas Base <a id="metadata-toggler" target="_blank" style="outline: none;"><i class="fas fa-info-circle"></i></a>': image
};

var overlayMaps = {
    'Grupo de Camadas A': {'Camadas de Sobreposição <a id="metadata-toggler" target="_blank" style="outline: none;"><i class="fas fa-info-circle"></i></a>': image2}
};

var optionsControl = {
    collapsed: true,
    groupsCollapsable: true,
    groupCheckboxes: true
};

Lc = L.control.groupedLayers(baseMaps,overlayMaps,optionsControl).addTo(map);

/* Adicionando marker de tour completo ao sistema */

var fullTour = L.marker([2198, 1776]).addTo(map);

/* Adicionando marker com popup do getFeatureInfo */

// HTML do Popup

popupHtml = '<div class="popup-inner-div"><p><a class="link-table-collapse" style="color:black;font-weight: bold;" data-toggle="collapse" href="#row-0">MUB_Lote: 01.01.0034.0077.000</a></p></div><div id="row-0" class="panel-collapse collapse"><div class="panel-body"><table><tbody><tr><th>Atributo</th><th>Valor</th></tr><tr><td>id</td><td>1429</td></tr><tr><td>inscricao</td><td>01.01.0034.0077.000</td></tr><tr><td>inscricao_lote</td><td>01.01.0034.0077</td></tr><tr><td>total_unidades_lote</td><td>1</td></tr><tr><td>area_total_construida</td><td>396.2607708985073</td></tr><tr><td>testada_1</td><td>15.41</td></tr><tr><td>testada_2</td><td>0</td></tr><tr><td>cod_test_2</td><td>0</td></tr><tr><td>sec_test_2</td><td>0</td></tr><tr><td>testada_3</td><td>0</td></tr><tr><td>cod_test_3</td><td>0</td></tr><tr><td>sec_test_3</td><td>0</td></tr><tr><td>testada_4</td><td>0</td></tr><tr><td>cod_test_4</td><td>0</td></tr><tr><td>sec_test_4</td><td>0</td></tr><tr><td>area_construida_unidade</td><td>396.2607708985073</td></tr></tbody></table></div></div><div class="popup-inner-div"><p><a class="link-table-collapse" style="color:black;font-weight: bold;" data-toggle="collapse" href="#row-1">CAD_Quadra: 01.01.0034</a></p></div><div id="row-1" class="panel-collapse collapse"><div class="panel-body"><table><tbody><tr><th>Atributo</th><th>Valor</th></tr><tr><td>id</td><td>34</td></tr><tr><td>distrito</td><td>1</td></tr><tr><td>setor</td><td>1</td></tr><tr><td>quadra</td><td>34</td></tr></tbody></table></div></div><div class="popup-inner-div"><p><a class="link-table-collapse" style="color:black;font-weight: bold;" data-toggle="collapse" href="#row-2">EDF_Edificacao: 01.01.0034.0077.000</a></p></div><div id="row-2" class="panel-collapse collapse"><div class="panel-body"><table><tbody><tr><th>Atributo</th><th>Valor</th></tr><tr><td>id</td><td>6414</td></tr><tr><td>inscricao</td><td>01.01.0034.0077.000</td></tr><tr><td>area_construida</td><td>396.26</td></tr></tbody></table></div></div>'
var featuresInfo = L.marker([2090, 2400]).addTo(map).bindPopup(popupHtml);

if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // do nothing
} else {
    featuresInfo.openPopup();
}

/* Inicializando botões de ferramentas */

// Adicionando botão de set view para visao inicial
var home = L.easyButton('<img src="img/home.png">',function(btn, map){ map.fitBounds(boundsToShow); }).addTo(map);

// Adiciona o botao de seleção de feições
var selectButton = L.easyButton('fas fa-hand-pointer',function(btn, map){ map.fitBounds(boundsToShow); }).addTo(map);

// Adiciona o botao de visualizar informacoes com dois estados
var infoButton = L.easyButton('<img src="img/info_enabled.png">',function(btn, map){ map.fitBounds(boundsToShow); }).addTo(map);

// Adiciona botao para ativar a ferramenta de pesquisas
var searchButton = L.easyButton('<img src="/img/search_disabled.png">',function(btn, map){ map.fitBounds(boundsToShow); }).addTo(map);

// Adiciona botão para habilitar ou desabilitar a legenda
var legendButton = L.easyButton('<img src="img/legend_disabled.png">',function(btn, map){ map.fitBounds(boundsToShow); }).addTo(map);

/* Geolocalização */
var geolocationButton = L.easyButton('fas fa-map-marker-alt',function(btn, map){ map.fitBounds(boundsToShow); }).addTo(map);

// Adiciona botão para habilitar ou desabilitar ferramentas de medição
var measurementButton = L.easyButton('fas fa-ruler',function(btn, map){ map.fitBounds(boundsToShow); }).addTo(map);

// Coordenadas
map.on("mousemove",function (e) {
        
    lat = e.latlng.lat;
    lng = e.latlng.lng;

    n = lng.toFixed(3);
    e = lat.toFixed(3);

    // Atualizando conteudo do container
    $('#webgente-coordinates-container').html('<i onclick="searchByCoordinates()" class="fas fa-search webgente-search-coordinates"></i> N: ' + n + '; ' + 'E: ' + e + ' <a target="_blank" href="https://epsg.io/' + 31983 + '">(EPSG:' + 31983 + ')</a>')
    
    // Atualizando padding do panel com base na largura da escala gráfica
    scaleMargin = document.getElementsByClassName('leaflet-control-scale')[0].clientWidth + 5
    $('#webgente-coordinates-panel').css('padding-left', scaleMargin + 10)
})

/* Criador do modal com os links do Youtube */
function createVideoModal (link) {

    link = 'https://www.youtube.com/embed/' + link + '?autoplay=1';

    $('body').append('<div class="modal fade" id="modal-video" tabindex="-1" role="dialog" aria-labelledby="videoModal" aria-hidden="true"> <div class="modal-dialog modal-dialog-centered"> <div class="modal-content"> <div class="modal-body"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> <div> <iframe width="100%" height="350" src="'+link+'" allowfullscreen></iframe> </div> </div> </div> </div> </div>')

    $('#modal-video').on('hidden.bs.modal', function () {
        $('#modal-video').remove();
    });

    $('#modal-video').modal('toggle');

}

/* Bindando links do Youtube às ferramentas */
/* Copiar código após o watch?v= para entrada na função */

// Ferramentas de coordenadas
$('#webgente-coordinates-container').click(() => {
    createVideoModal('ad_iwSaFDLM')
});

//Controle de camadas
$('.leaflet-control-layers-toggle').click(() => {
    createVideoModal('Q3dvbM6Pias')
});

