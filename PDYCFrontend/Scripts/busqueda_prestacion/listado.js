$(document).ready(documentReady);

function documentReady() {
    
    $('.dataTables_processing').css("display", "block");


    getData();


    $("#iniciados").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        let filtro = 7;
        getData();
    });

    $("#pendientesV").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 8;
        getData();
    });

    $("#pendientesA").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 4;
        getData();
    });

    $("#aprobados").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 1;
        getData();
    });

    $("#rechazados").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 2;
        getData();
    });

    $("#observados").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 6;
        getData();
    });

    $("#enDGP").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 11;
        getData();
    });

    $("#enDGPDesa").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 12;
        getData();
    });

    $("#enDirectorio").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 9;
        getData();
    });

    $("#enDirectorioDesa").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 13;
        getData();
    });

    $("#enCompras").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 10;
        getData();
    });



    $("#conProvision").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 14;
        getData();
    });

    $("#denegados").click(function () {
        //$('.none').css("display", "none");
        $('#tramites').addClass("none");
        $('.dataTables_processing').css("display", "block");
        filtro = 16;
        getData();
    });



    var removeAccents = function (data) {
        return !data ?
            '' :
            typeof data === 'string' ?
                data
                    .replace(/\n/g, ' ')
                    .replace(/[áÁ]/g, 'a')
                    .replace(/[éÉ]/g, 'e')
                    .replace(/[íÍ]/g, 'i')
                    .replace(/[óÓ]/g, 'o')
                    .replace(/[úÚ]/g, 'u')
                    :
                data;
    };

    $.fn.dataTableExt.ofnSearch['string'] = removeAccents;
    $.fn.dataTableExt.ofnSearch['html'] = removeAccents;
}




function colorEstado(estado) {
    switch (estado) {
        case 'Iniciado':
            return '<span class="badge badge-pill badge-primary">' + estado + '</span>';
            break;
        case 'Aprobado':
            return '<span class="badge badge-pill badge-success">' + estado + '</span>';
            break;
        case 'Desaprobado':
            return '<span class="badge badge-pill badge-danger">' + estado + '</span>';
            break;
        case 'Para Auditar':
            return '<span class="badge badge-pill badge-info ">' + estado + '</span>';
            break;
        case 'Para Visar':
            return '<span class="badge badge-pill badge-secondary">' + estado + '</span>';
            break;
        case 'Observado':
            return '<span class="badge badge-pill badge-warning ">' + estado + '</span>';
            break;
        case 'En Directorio AF':
            return '<span class="badge badge-pill badge-success ">' + estado + '</span>';
            break;
        case 'En Directorio DF':
            return '<span class="badge badge-pill badge-danger ">' + estado + '</span>';
            break;
        case 'En DGP AF':
            return '<span class="badge badge-pill badge-success ">' + estado + '</span>';
            break;
        case 'En DGP DF':
            return '<span class="badge badge-pill badge-danger ">' + estado + '</span>';
            break;
        case 'En Compras':
            return '<span class="badge badge-pill badge-success ">' + estado + '</span>';
            break;
        case 'Ad Referendum':
            return '<span class="badge badge-pill badge-danger ">' + estado + '</span>';
            break;
        case 'Orden de Provisión':
            return '<span class="badge badge-pill badge-success ">' + estado + '</span>';
            break;
        case 'Denegado':
            return '<span class="badge badge-pill badge-danger ">' + estado + '</span>';
            break;
        case 'Otra':
            return '<span class="badge badge-pill badge-dark ">' + estado + '</span>';
            break;

    }
}

function mostrarFecha(fecha) {
    var str = fecha;
    var p = str.split(" ");
    var t = p[0].split("/");
    return t[2] + '-' + t[1] + '-' + t[0] + ' ' + p[1] + ' ' + p[2];
}






