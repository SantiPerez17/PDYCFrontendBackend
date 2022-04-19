jQuery.extend(jQuery.validator.messages, {
    required: "Debe completar este campo.",
    remote: "Por favor, complete este campo.",
    email: "Debe ingresar una dirección de correo válida",
    url: "Por favor, escribe una URL válida.",
    date: "Ingrese una fecha válida.",
    dateISO: "Por favor, escribe una fecha (ISO) válida.",
    number: "Por favor, escribe un número entero válido.",
    digits: "Por favor, escribe sólo dígitos.",
    creditcard: "Por favor, escribe un número de tarjeta válido.",
    equalTo: "Por favor, escribe el mismo valor de nuevo.",
    accept: "Por favor, escribe un valor con una extensión aceptada.",
    maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
    minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
    rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
    range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
    max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
    min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
});
function deshabilitarTipoBusqueda() {
    if ($('input[name=tipoBusqueda]:checked').val() == 'dni') {
        $("#TrNroTraexp").attr('disabled', true);
        $("#TrNroTraexp").val('');
        $("#TrNroTraexp").removeAttr('placeholder');
        $("#documento").attr("placeholder", "Ingrese su dni sin puntos");
        $("#sexo").attr('disabled', false);
        $("#documento").attr('disabled', false);
        $("#fecha_desde").attr('disabled', false);
        $("#fecha_hasta").attr('disabled', false);
    } else if ($('input[name=tipoBusqueda]:checked').val() == 'tramite') {
        $('#documento-error').hide();
        $('#sexo-error').hide();
        $("#TrNroTraexp").attr("placeholder", "Ingrese un número de trámite");
        $("#TrNroTraexp").attr('disabled', false);
        $("#sexo").attr('disabled', true);
        $("#documento").removeAttr('placeholder');
        $("#sexo").val('');
        //$("#fecha_desde").val('');
        //$("#fecha_hasta").val('');
        $("#documento").val('');
        $("#documento").attr('disabled', true);
        $("#fecha_desde").attr('disabled', true);
        $("#fecha_hasta").attr('disabled', true);
    }
}
var validator = null;
$(document).ready(function () {

    //selecciona la búsqueda por defecto si no hay ninguna
    if ($('input[name=tipoBusqueda]:checked').val() == null) {
        $('input:radio[name="tipoBusqueda"]').filter('[value="dni"]').attr('checked', true);
    }
    deshabilitarTipoBusqueda();

    $('input:radio[name=tipoBusqueda]').change(function () {
        deshabilitarTipoBusqueda();
    });

    var rules = new Object();
    var messages = new Object();
    $('#sexo').each(function () {
        rules[this.name] = { required: true };
        messages[this.name] = { required: 'Debe seleccionar una identidad' };
    });
    $('#documento').each(function () {
        rules[this.name] = { required: true, digits: true };
        messages[this.name] = { required: 'Debe ingresar un dni' };
    });

    $('#TrNroTraexp').each(function () {
        rules[this.name] = { required: true, digits: true };
        messages[this.name] = { required: 'Debe ingresar un número de trámite' };
    });

    $('#fecha_desde').each(function () {
        rules[this.name] = { required: true };
        messages[this.name] = { required: 'Debe ingresar una fecha' };
    });

    $('#fecha_hasta').each(function () {
        rules[this.name] = { required: true };
        messages[this.name] = { required: 'Debe ingresar una fecha' };
    });
    validator = $("#FormBuscarTramite").validate({
        ignore: [],
        rules: rules,
        messages: messages,
        submitHandler: function (form) {
            $('#loading').fadeIn();
            form.submit();
        }

    });
    //se aplica una máscara en el input dni
    $('.formato-dni').mask('00000000');

    $('.formato-fecha').mask("00/00/0000", { clearIfNotMatch: true });

    $('.formato-tramite').mask('00000000000000');

    $('#calendario_fdesde').click(function () {
        $("#fecha_desde").focus();
    });

    //cuando hace click en el icono aparece el calendario
    $('#calendario_fhasta').click(function () {
        $("#fecha_hasta").focus();
    });

    var fecha = new Date();
    var mesActual = fecha.getMonth();
    var diaActual = fecha.getDate();
    var anoActual = fecha.getFullYear();
    var inicio = new Date(anoActual - 1, mesActual, diaActual);

    //inicializo input Fecha Desde
    $("#fecha_desde").datetimepicker({
        format: 'DD/MM/YYYY',
        defaultDate: inicio,
        icons: {
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right'
        }

    });

    //inicializo input Fecha Hasta
    $("#fecha_hasta").datetimepicker({
        format: 'DD/MM/YYYY',
        defaultDate: new Date(),
        minDate: inicio,
        icons: {
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right'
        }
    });

    //se ejecuta cuando hay un cambio de fecha en el calendario
    $("#fecha_desde").on("dp.change", function (e) {
        var fecha_desde = $('#fecha_desde').val();
        var fecha_hasta = $('#fecha_hasta').val();
        if (fecha_desde != null) {
            if (fecha_desde == '') {
                $('#fecha_desde').data("DateTimePicker").date(inicio);
            }
            else {
                if (fecha_desde.split("/")[2] == "0000") {
                    $('#fecha_desde').data("DateTimePicker").date(inicio);
                }
                else {
                    //si la fecha desde es mayor a la fecha hasta 
                    if (moment(fecha_desde, 'DD/MM/YYYY') < moment(fecha_hasta, 'DD/MM/YYYY')) {

                        $('#fecha_hasta').data("DateTimePicker").minDate(e.date);
                    }
                    else {
                        $('#fecha_desde').data("DateTimePicker").date(inicio);
                    }
                }
            }
        }
    });

    //se ejecuta cuando hay un cambio de fecha en el calendario
    $("#fecha_hasta").on("dp.change", function (e) {
        var fecha_hasta = $('#fecha_hasta').val();
        if (fecha_hasta != null) {
            if (fecha_hasta == '') {
                $('#fecha_hasta').data("DateTimePicker").date(fecha);
            }
            else {
                if (fecha_hasta.split("/")[2] == "0000") {
                    $('#fecha_hasta').data("DateTimePicker").date(inicio);
                }
                else {
                    $('#fecha_desde').data("DateTimePicker").maxDate(e.date);
                }
            }
        }
    });
});

function historico_tramites_afiliado(id) {
    var table = $('#' + id).DataTable({
        "columns": [
                  { "width": "1%" },
                    { "width": "1%" },
                    { "width": "1%" },
                    { "width": "1%" },
                    { "width": "1%" }, 
                    {
                        "width": "1%",
                       "render": function (data, type, full, meta) {

                           return mostrarFecha(data);

                       }
                    },
                    { "width": "1%" }, { "width": "2%" }, { "width": "10%" }, { "width": "2%" }
        ],
        "order": [[5, "desc"]],
        responsive: true,
        paging: true,
        "autoWidth": false,
        fixedHeader: {
            header: true,
            headerOffset: 50,
        },
        "ordering": true,
        "bLengthChange": false,
        "iDisplayLength": 10,
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": ">>",
                "sPrevious": "<<"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
     });

     var detailRows = [];

     $('#historico_tramites_afiliado tbody').on('click', 'tr td.details-control', function () {
         // Add event listener for opening and closing detail
             var tr = $(this).closest('tr');
             var row = table.row(tr);

             if (row.child.isShown()) {
                 // This row is already open - close it
                 row.child.hide();
                 tr.removeClass('shown');
             }
             else {
                 // Open this row
                 row.child(format(row.data())).show();
                 tr.addClass('shown');
             }
     });
   

     table.on('draw', function () {
         $.each(detailRows, function (i, id) {
             $('#' + id + ' td.details-control').trigger('click');
         });
     });


     function mostrarFecha(fecha) {
         var str = fecha;
         var p = str.split(" ");
         var t = p[0].split("/");
         return t[2] + '-' + t[1] + '-' + t[0] + ' ' + p[1] + ' ' + p[2];
     }


}