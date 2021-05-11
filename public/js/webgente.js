/* Inicializando o mapa, initView é inicializado dentro de uma tag script do index.ejs pois recebe dados do backend */

var bounds = [[0,0],[1007.17,2195]]

var map = L.map('map', {
    crs: L.CRS.Simple,
    maxZoom: 4,
    minZoom: -2,
    zoomSnap: 0.25,
    maxBounds: bounds,
    scrollWheelZoom: false
});

$('#map').height(window.innerHeight-70-document.getElementById('navbar-webgente').clientHeight)

window.onresize = function() {
    $('#map').height(window.innerHeight-70-document.getElementById('navbar-webgente').clientHeight)
}

/* Adicionando escala gráfica ao mapa */

var optionsScale = {
    metric: true, //Define a unidade em m/km
    imperial: false //Define a unidade em mi/ft
};

L.control.scale(optionsScale).addTo(map);

/* TODO: Mudar a imagem carregada de acordo com o tipo de dispositivo */
var image = L.imageOverlay('/img/landing.png',bounds).addTo(map);
var image2 = L.imageOverlay('/img/landing.png',bounds);

map.setView([500,1100],-0.5);

map.on('click',() => { map.setView([500,1100],-0.5); })

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

/* Inicializando botões de ferramentas */

// Adicionando botão de set view para visao inicial
var home = L.easyButton('<img src="img/home.png">',function(btn, map){ map.setView([500,1100],-0.5); }).addTo(map);

// Adiciona o botao de seleção de feições
var selectButton = L.easyButton('fas fa-hand-pointer',function(btn, map){ map.setView([500,1100],-0.5); }).addTo(map);

// Adiciona o botao de visualizar informacoes com dois estados
var infoButton = L.easyButton('<img src="img/info_enabled.png">',function(btn, map){ map.setView([500,1100],-0.5); }).addTo(map);

// Adiciona botao para ativar a ferramenta de pesquisas
var searchButton = L.easyButton('<img src="/img/search_disabled.png">',function(btn, map){ map.setView([500,1100],-0.5); }).addTo(map);

// Adiciona botão para habilitar ou desabilitar a legenda
var legendButton = L.easyButton('<img src="img/legend_disabled.png">',function(btn, map){ map.setView([500,1100],-0.5); }).addTo(map);

/* Geolocalização */
var geolocationButton = L.easyButton('fas fa-map-marker-alt',function(btn, map){ map.setView([500,1100],-0.5); }).addTo(map);

// Adiciona botão para habilitar ou desabilitar ferramentas de medição
var measurementButton = L.easyButton('fas fa-ruler',function(btn, map){ map.setView([500,1100],-0.5); }).addTo(map);

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