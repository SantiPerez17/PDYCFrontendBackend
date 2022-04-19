jQuery.extend(jQuery.validator.messages, {
    required: "Campo obligatorio.",
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


function closeError() {
    $('.mensajes').css("display", "none");
    $('.mensajes-success').css("display", "none");
}



function buscarAjaxDocumentosAdicionalesPorTramite(tr_id) {
    $.ajax({
        type: "GET",
        data: { "tr_id": tr_id },
        url: "../../Tramite/getJsonDocumentosAdicionalesPorTramite/" + tr_id,
        datatype: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.documentos_adicionales.length > 0) {
                $("#tabla_archivos_adicionales").empty();
                var header = "<thead><tr class='btn-secondary'><th style='text-align: center; vertical-align: middle;'>Descripcion</th><th style='text-align: center; vertical-align: middle;'>Acciones</th></tr></thead><tbody>";
                $("#tabla_archivos_adicionales").append(header);
                $.each(data.documentos_adicionales, function (index, value) {
                    var nuevafila;
                    nuevafila = "<tr id=row_" + value.file_id + ">" +
                        "<td  style='text-align: center; vertical-align: middle;'> " + value.descripcion + "</td>" +
                        "<td  style='text-align: center; vertical-align: middle;'><a target='_blank' title='Descargar archivo' href='../../Tramite/Archivo/?idArchivo=" + value.file_id.toString() + "'><i class='fa fa-download' aria-hidden='true'></i></a>&nbsp&nbsp&nbsp" +
                        "<a   target='_blank' title='Eliminar archivo' data-toggle='modal' class='modal-eliminar' data-tipo='" + value.tipo_archivo + "' data-tramite= '" + tr_id + "' data-id='" + value.file_id.toString() + "' data-target='#modal_delete_file'><i class='fa fa-trash' aria-hidden='true'></i></a></td></tr></tbody>";
                    $("#tabla_archivos_adicionales").append(nuevafila);
                })
                $('#showDivDocAdicional').show();
                cargarTablaArchivos("tabla_archivos_adicionales");
            }
            else {
                $('#showDivDocAdicional').hide();
            }
        },
        error: function (err) {

        }
    });
}

function buscarAjaxHCPorTramite(tr_id) {
    $.ajax({
        type: "GET",
        data: { "tr_id": tr_id },
        url: '../../Tramite' + '/getJsonHCPorTramite/' + tr_id,
        datatype: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.resultado) {
                $("#div_detalle_hc").empty();
                var link;
                link = data.data.descripcion + "<a target='_blank' title='Descargar archivo' href='../../Tramite/Archivo/?idArchivo=" + data.data.file_id.toString() + "'><i class='fa fa-download' aria-hidden='true'></i></a>&nbsp&nbsp&nbsp" +
                 "<a   href='../../Tramite/eliminarArchivo/?idArchivo=" + data.data.file_id.toString() + "' target='_blank' title='Eliminar archivo' data-toggle='modal' class='modal-eliminar' data-tipo='" + data.data.tipo_archivo + "' data-id='" + data.data.file_id.toString() + "' data-target='#modal_delete_file'><i class='fa fa-trash' aria-hidden='true'></i></a>";
                $("#div_detalle_hc").append(link);
                $('#div_detalle_hc').show();
                $('#button_historia_clinica').hide();
            }
            else {
                $('#button_historia_clinica').show();
            }
        },
        error: function (err) {

        }
    });

}

function buscarAjaxOrdenProvisionPorTramite(tr_id) {
    $.ajax({
        type: "GET",
        data: { "tr_id": tr_id },
        url: '../../Tramite' + '/getJsonOrdenProvisionPorTramite/' + tr_id,
        datatype: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.resultado) {
                $("#div_detalle_op").empty();
                var link; var botonConfirmar;
                link = data.data.descripcion + "<a target='_blank' title='Descargar archivo' href='../../Tramite/Archivo/?idArchivo=" + data.data.file_id.toString() + "'><i class='fa fa-download' aria-hidden='true'></i></a>";    
                $("#div_detalle_op").append(link);
                $('#div_detalle_op').show();
                $('#button_orden_provision').hide();
                botonConfirmar = "<button type='button' id='enviar_orden_provision' class='btn btn-success col-md-4' data-toggle='modal' data-target='#modal_confirmar_orden_provision'>Enviar Trámite con orden de Provisíón</button>";
                $('#div_boton_confirmar').append(botonConfirmar);
            }
            else {
                $('#button_orden_provision').show();
            }
        },
        error: function (err) {

        }
    });

}

function buscarAjaxRecetasPorTramite(tr_id) {
    $.ajax({
        type: "GET",
        data: { "tr_id": tr_id },
        url: '../../Tramite' + '/getJsonRecetasPorTramite/' + tr_id,
        datatype: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.lista_recetas.length > 0) {
                $("#tabla_recetas").empty();
                var header = "<thead><tr class='btn-secondary'><th style='text-align: center; vertical-align: middle;'>Descripcion</th><th style='text-align: center; vertical-align: middle;'>Acciones</th></tr></thead><tbody>";
                $("#tabla_recetas").append(header);
                $.each(data.lista_recetas, function (index, value) {
                    var nuevafila;
                    nuevafila = "<tr>" +
                        "<td  style='text-align: center; vertical-align: middle;'> " + value.descripcion + "</td>" +
                        "<td  style='text-align: center; vertical-align: middle;'><a target='_blank' title='Descargar archivo' href='../../Tramite/Archivo/?idArchivo=" + value.file_id.toString() + "'><i class='fa fa-download' aria-hidden='true'></i></a>&nbsp&nbsp&nbsp" +
                        "<a   target='_blank' title='Eliminar archivo' data-toggle='modal' class='modal-eliminar' data-tipo='" + value.tipo_archivo + "' data-tramite= '" + tr_id + "' data-id='" + value.file_id.toString() + "' data-target='#modal_delete_file'><i class='fa fa-trash' aria-hidden='true'></i></a></td></tr></tbody>";
                    $("#tabla_recetas").append(nuevafila);
                })
                $('#showDivRecetas').show();
                cargarTablaArchivos('tabla_recetas');
            }
            else {
                $("#showDivRecetas").hide();
            }
        },
        error: function (err) {

        }
    });

}

$("#modal-btn-confirmar").on("click", function (e) {
    var id = $("#recetaId").val();
    var s = "recetas[" + id + "].recAnuladoUsu";
    document.getElementById(s).setAttribute("value", "SI");
    $("#recetaId_" + id).addClass("none");
    $('#modal_anular_receta').modal('hide');
    e.preventDefault();
});


function inicializardatetimepicker(id) {
    var fecha = new Date();
    var mesActual = fecha.getMonth();
    var diaActual = fecha.getDate();
    var anoActual = fecha.getFullYear();
    var inicio = new Date(anoActual, mesActual, diaActual);
    //inicializo input Fecha Desde
    $(".fecha").datetimepicker({
        format: 'DD/MM/YYYY',
        defaultDate: inicio,
        icons: {
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right'
        }
    });
}


function eliminarRP(pos) {
    //si la posicion es 0 entonces elimino el div denominado div_receta_0_rp_1
    if (pos == 0) {
        $('#div_receta_' + pos + '_rp_1').remove();
        arreglo_rps[pos]--;
        $('#agregarRP-' + (pos)).show();
    }
    else {
        $('#div_receta_' + (pos) + '_rp_1').remove();
        //ELIMINO EL DIV CORRESPONDIENTE A LA RP
        arreglo_rps[pos - 1]--;
        $('#agregarRP-' + (pos)).show();
    }
}

function eliminarReceta(div, id) {
    $('#modal_anular_receta').modal({
        show: true
    });
}

$('.modal-eliminar').click(function (e) {
    var recetaId = $(this).data('id');
    $(".modal-body #recetaId").val(recetaId);

});

//ARMA EL HTML DE LA RP
function construir_html_rp(pos) {
    $("#div_receta_" + pos + "_rp_0").after(
                    '<div id="div_receta_' + pos + '_rp_1">' +                      
                        '<div class="row form-group">' +
                          '<div class="col col-12 col-md-4">' +
                               '<label for="seleccion_patologia">Patologias</label>'
                         + '<select class="col-12 col-sm-12 form-control required" name="recetas[' + pos + '].rps[1].seleccion_patologia" id="recetas[' + pos + '].rps[1].seleccion_patologia">' + '</select>' +
                           '</div>' +
                           '<div class="col col-12 col-md-4">' +
                                         '<label for="seleccion_droga">Drogas</label>'
                                           + '<select  class="col-12 col-sm-12 form-control required" name="recetas[' + pos + '].rps[1].seleccion_droga" id="recetas[' + pos + '].rps[1].seleccion_droga">' + '</select>' +
                           '</div>' +
                           '<div class="col col-12 col-md-4">' +
                                    '<label for="seleccion_producto">Productos</label>'
                                     + '<select class="col-12 col-sm-12 form-control" name="recetas[' + pos + '].rps[1].seleccion_producto" id="recetas[' + pos + '].rps[1].seleccion_producto">' + '</select>' +

                          '</div>' +
                       '</div>' +
                       '<div class="row form-group">'+
                         '<div class="col col-12 col-md-3">' +
                            '<label for="dosis_diaria">Envases solicitados</label>' +
                            ' <input type="text" class="form-control formato-envases-solicitados required" id="recetas[' + pos + '].rps[1].cant_env_solicitados" name="recetas[' + pos + '].rps[1].cant_env_solicitados" >' +
                         '</div>' +
                         '<div class="col col-12 col-md-3">' +
                            '<label for="dosis_diaria">Dosis Diaria</label>' +
                            '<input type="text" class="form-control formato-dosis required" id="recetas[' + pos + '].rps[1].dosis_diaria" name="recetas[' + pos + '].rps[1].dosis_diaria" >' +
                         '</div>' +
                         '<div class="col col-12 col-md-3">' +
                             '<label for="duracion_ciclo">Duración dias</label>' +
                              '<input type="text" class="form-control formato-duracion required" id="recetas[' + pos + '].rps[1].duracion_ciclo" name="recetas[' + pos + '].rps[1].duracion_ciclo" >' +
                         '</div>' +
                         '<div class="div-x-2">' +
                            '<i class="fas fa-times right fas fa-times right ml-4 mt-4" title="Anular RP"  onclick="eliminarRP(' + pos + ')"></i>' +
                         '</div>' +
                       '</div>' +

                     '</div>'
       );
    cargar_select_patologias(pos, 1);   
    var seleccion_droga = "recetas[" + pos + "].rps[1].seleccion_droga";
    var seleccion_producto = "recetas[" + pos + "].rps[1].seleccion_producto";
    var selector_droga = escapar_corchetes(seleccion_droga);
    var selector_producto = escapar_corchetes(seleccion_producto);
    $(selector_droga).append("<option value=''>SELECCIONAR</option>");
    $(selector_producto).append("<option value=''>SELECCIONAR</option>");
}

//AGREGA UNA RP A UNA RECETA EN BASE A LA POSICION "pos"
function agregarRP(pos) {
    $('#agregarRP-' + pos).hide();
    //SI ARRANCA EN 0 LA POSICION
    if (pos == 0) {
        arreglo_rps[pos]++;
        construir_html_rp(pos);
    }
    else {
        if (pos == 1) {
            if (arreglo_rps[pos] < 2) {
                arreglo_rps[pos]++;
            }
        }
        else {
            //SI LLEGO AL LIMITE DE RPS POR RECETA ENTONCES NO DEJO QUE SIGA AGREGANDO RPS
            if (arreglo_rps[pos - 1] < 2) {
                arreglo_rps[pos - 1]++;
            }
        }
        construir_html_rp(pos);
    }
}

function cargarTablaArchivos(id) {
    var tabla = $('#' + id).DataTable({
        "columns": [
      { "width": "1%" },
      { "width": "1%" },

        ],
        "autoWidth": false,
        stateSave: true,
        responsive: true,
        responsive: true,
        destroy: true,
        "info": false,
        "bLengthChange": false,
        "ordering": false,
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "pageLength": 5,
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
}

function inicializarSelect2Suggestions() {
    $(".profesional").select2({
        allowClear: true,
        placeholder: "Ingrese una matricula",
        formatInputTooShort: function () {
            return "Este es mi mensaje";
        },
        language: "es",
        ajax: {
            url: $("#ajaxUrlGetAutoCompleteSearchSuggestion").val(),
            data: function (params) {
                return {
                    q: params.term || "",
                    page: params.page || 1
                };
            },
            dataType: "json",
            type: "GET",
            cache: true,
            delay: 250,
            //type: 'POST',
            contentType: "application/json; charset=utf-8",
            processResults: function (data, params) {
                params.page = params.page || 1;
                return {
                    results: $.map(data, function (obj) {
                        return { id: obj.id, text: obj.text };
                    }),
                    cache: true,
                    // if more then 30 items in dropdown, remaining set of items  will be show on numbered page link in dropdown control.
                    pagination: { more: (params.page * 1000) < data.length }
                };
            }
        },
        templateResult: function (item) {
            if (item.loading) return item.text;
            return item.text;
        },
        escapeMarkup: function (markup) { return markup; } // let our custom formatter work

        // Minimum length of input in search box before ajax call triggers
    });
}

function escapar_corchetes(myid) {
    return "#" + myid.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1");
}

function cargar_select_patologias(id, indice_rp,seleccion_patologia) {
    var seleccion = "recetas[" + id + "].rps[" + indice_rp + "].seleccion_patologia";
    var select_producto = "recetas[" + id + "].rps[" + indice_rp + "].seleccion_producto";
    var selector_id = escapar_corchetes(seleccion);
    var seleccionar_producto = escapar_corchetes(select_producto);
    $.ajax({
        url: '../../Patologia/getPatologias',
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            $(selector_id).empty();
            var response = response.data;
            if (response.length > 0) {
                $(selector_id).append("<option value=''>SELECCIONAR</option>");
                for (i in response) {
                    if (seleccion_patologia == response[i].id) {
                        $(selector_id).append("<option selected=selected value='" + response[i].id + "'>" + response[i].text + "</option>");
                    }
                    else {
                        $(selector_id).append("<option value=" + response[i].id + ">" + response[i].text + "</option>");
                    }
                }
            }          
            else {
                $(selector_id).append("<option value=''>SELECCIONAR</option>");
            }            
            $(selector_id).unbind('change').bind('change', function (e) {
                $(seleccionar_producto).empty();
                optionSeleccionado = $(this).val();
                document.getElementById(seleccion).setAttribute("value", optionSeleccionado);
                $(seleccionar_producto).append("<option value=''>SELECCIONAR</option>")
                cargar_select_drogas(id,indice_rp,optionSeleccionado);
            });
        },
        error: function (x, e) {

        }
    });
}

function cargar_select_drogas(id, indice_rp, seleccion_patologia,seleccion_droga) {
    var seleccion = 'recetas[' + id + '].rps[' + indice_rp + '].seleccion_droga';
    var select_producto = 'recetas[' + id + '].rps[' + indice_rp + '].seleccion_producto';
    var selector_id = escapar_corchetes(seleccion);
    var seleccionar_producto = escapar_corchetes(select_producto);
    $.ajax({
        data: { "patologiaid": seleccion_patologia },
        url: '../../Droga/getDrogasPorPatologia/' + seleccion_patologia,
        datatype: 'json',
        type: 'get',
        success: function (response) {
            $(selector_id).empty();
            var response = response.data;
            if (response.length > 0) {
                $(selector_id).append("<option value=''>SELECCIONAR</option>");
                for (i in response) {
                    if (seleccion_droga == response[i].id) {
                        $(selector_id).append("<option selected=selected value='" + response[i].id + "'>" + response[i].text + "</option>");
                    }
                    else {
                        $(selector_id).append("<option value=" + response[i].id + ">" + response[i].text + "</option>");

                    }
                }
            }
            else {
            
                $(selector_id).append("<option value='-1'>SELECCIONAR</option>");           
            }          
            $(selector_id).unbind('change').bind('change', function (e) {
                optionseleccionado = $(this).val();
                document.getElementById(seleccion).setAttribute("value", optionseleccionado);
              
                $(seleccionar_producto).empty();
                cargar_select_productos(id, indice_rp, optionseleccionado);
            });
        },
        error: function (x, e) {

        }
    });
}

function cargar_select_productos(id, indice_rp, seleccion_droga,seleccion_producto) {
    var seleccion = 'recetas[' + id + '].rps[' + indice_rp + '].seleccion_producto';
    var selector_id = escapar_corchetes(seleccion);
    $.ajax({
        data: { "drogaid": seleccion_droga },
        url: '../../Producto/getProductosPorDroga/' + seleccion_droga,
        dataType: 'json',
        type: 'get',
        success: function (response) {
            $(selector_id).empty();
            var response = response.data;
            if (response.length > 0) {
                $(selector_id).append("<option value=''>SELECCIONAR</option>");
                for (i in response) {
                    if (seleccion_producto == response[i].id) {
                        $(selector_id).append("<option selected=selected value='" + response[i].id + "'>" + response[i].text + "</option>");
                    }
                    else {
                        $(selector_id).append("<option value=" + response[i].id + ">" + response[i].text + "</option>");

                    }                
                }
            }
            else {
                $(selector_id).append("<option value=''>SELECCIONAR</option>");
            }       
            $(selector_id).unbind('change').bind('change', function (e) {
                optionSeleccionado = $(this).val();
                document.getElementById(seleccion).setAttribute("value", optionSeleccionado);
            });
        },
        error: function (x, e) {
            
        }
    });
}

var validator = null;
$(document).ready(function () {
    $('#agregar_receta').click(function (e) {
        arreglo_rps.push(1);
        tc = parseInt($("#totalRows").val());
        tc++;
        $("#totalRows").val(tc);
        inicializardatetimepicker(tc);
        $("#recetas").after('<input type="hidden" name="recetas.index" value="' + tc + '" />' +

                            '<div class="div_contenedor" id="div_contenedor-' + tc + '"> ' +
                            '<div class="col col-12 col-sm-12">' +
                              '<h4>Datos de Receta</h4>' +
                               '<hr>' +
                             '</div>' +
                               '<div class="row form-group">' +
                                  '<div class="col col-12 col-md-4">' +
                                     ' <label for="numero_receta">Numero de Receta</label>' +
                                     '<input type="text" class="form-control obligatorio_receta required" id="recetas[' + tc + '].numero_receta" name="recetas[' + tc + '].numero_receta">' +

                                  '</div>' +
                                  '<div class="col col-12 col-md-4">' +
                                     '<label for="fecha_prescripcion_receta">Fecha Prescripción Receta</label>' +
                                      '<div class="input-group date">' +
                                        '<input type="text" class="form-control formato-fecha fecha startDate" id="recetas[' + tc + '].fecha_prescripcion_receta" name="recetas[' + tc + '].fecha_prescripcion_receta">' +
                                        '<span class="input-group-text" style="background-color:#dee2e6; cursor:pointer"><i class="from-control fa fa-fw fa-calendar color-calendario" id="calendario_fdesde"></i></span>' +
                                      '</div>' +
                                  '</div>' +
                                  '<div class="col col-12 col-md-3 mt-4 offset-md-1">' +
                                    '<button type="button"  id=' + tc + ' class="btn btn-danger mt-2 waves-effect waves-light"  data-tipo=' + tc + ' data-toggle="modal" data-target="#modal_receta2" >Eliminar Receta</button>' +
                                  '</div>' +
                             '</div>' +
                              '<div class="row form-group">' +
                                 '<div class="col col-12 col-sm-12 col-md-4">' +
                                   '<label for="profesional_id">Profesional</label>'
                                       + '<select class="col-12 col-sm-12 form-control select2 select profesional required " id="recetas[' + tc + '].profesional_id" name="recetas[' + tc + '].profesional_id">' + '</select>' +
                                 '</div>' +
                                 '<input type="hidden" id="ajaxUrlGetAutoCompleteSearchSuggestion" value="../Tramite/ajaxUrlGetAutoCompleteSearchSuggestion" />' +
                              '</div>'+
                        '<div class="col col-12 col-sm-12">' +
                            '<h4>Datos de RP</h4>' +
                        '</div>' +
                        '<hr>' +
                        '<div id="div_receta_' + tc + '_rp_0"  class="div_rp_uno">' +
                           '<input type="hidden" id="totalrp" value="0" />' +                         
                            '<div class="row form-group">' +
                               '<div class="col col-12 col-md-4">' +
                                     '<label for="seleccion_patologia">Patologias</label>'
                                       + '<select class="col-12 col-sm-12 form-control required" name="recetas[' + tc + '].rps[0].seleccion_patologia"  id="recetas[' + tc + '].rps[0].seleccion_patologia">' + '</select>' +
                               '</div>' +
                                '<div class="col col-12 col-md-4">' +
                                     '<label for="seleccion_droga">Drogas</label>'
                                       + '<select class="col-12 col-sm-12 form-control required" name="recetas[' + tc + '].rps[0].seleccion_droga" id="recetas[' + tc + '].rps[0].seleccion_droga" >' + '</select>' +
                               '</div>' +
                                '<div class="col col-12 col-md-4">' +
                                     '<label for="seleccion_producto">Productos</label>'
                                    + '<select class="col-12 col-sm-12 form-control"  name="recetas[' + tc + '].rps[0].seleccion_producto" id="recetas[' + tc + '].rps[0].seleccion_producto">' + '</select>' +
                               '</div>' +
                            '</div>' +
                            '<div class="row form-group">' +
                              '<div class="col col-12 col-md-3">' +
                                 '<label for="dosis_diaria">Envases solicitados</label>' +
                               ' <input type="text" class="form-control required formato-envases-solicitados" id="recetas[' + tc + '].rps[0].cant_env_solicitados" name="recetas[' + tc + '].rps[0].cant_env_solicitados">' +
                               '</div>' +
                               '<div class="col col-12 col-md-3">' +
                                 '<label for="dosis_diaria">Dosis Diaria</label>' +
                                 '<input type="text" class="form-control required formato-dosis" id="recetas[' + tc + '].rps[0].dosis_diaria" name="recetas[' + tc + '].rps[0].dosis_diaria">' +
                                '</div>' +
                               '<div class="col col-12 col-md-3">' +
                                  '<label for="duracion_ciclo">Duración dias</label>' +
                                  '<input type="text" class="form-control required formato-duracion" id="recetas[' + tc + '].rps[0].duracion_ciclo" name="recetas[' + tc + '].rps[0].duracion_ciclo">' +
                                '</div>' +
                                '<input type="hidden" name="recetas[' + tc + '].rps[0].numero_rp" value="1" />' +
                            '</div>' +
                   '</div>' +
                   '<div class="row form-group">' +
                      '<div class="col col-12 col-sm-12 col-md-4">' +
                         '<button class="btn btn-primary col-12 col-md-12 mt-2 col-sm-2 col-md-4" id="agregarRP-' + tc + '" type="button" onclick="agregarRP(' + tc + ')">' +
                                 'Agregar RP' +
                         '</button>' +
                      '</div>' +
                  '</div>' +
       '</div>' + '</div>')

        var select_drogas = 'recetas[' + tc + '].rps[0].seleccion_droga';
        var select_productos = 'recetas[' + tc + '].rps[0].seleccion_producto';
        var seleccion_default_drogas = escapar_corchetes(select_drogas);
        var seleccion_default_productos = escapar_corchetes(select_productos);
        $(seleccion_default_drogas).append("<option value=''>SELECCIONAR</option>");
        $(seleccion_default_productos).append("<option value=''>SELECCIONAR</option>")
        cargar_select_patologias(tc, 0);
        $(".select").select2();
        inicializarSelect2Suggestions();
        inicializardatetimepicker(tc);
    });
    var rules = new Object();
    var messages = new Object();

    $('#sexo').each(function () {
        rules[this.name] = { required: true };
        messages[this.name] = { required: 'Debe seleccionar un sexo' };
    });


    $('.subir-archivo').click(function (e) {

        var tipo_archivo = $(this).attr("data-tipo-archivo");
        var div = $("#info-file-" + tipo_archivo);
        var descripcion_archivo = '';
        var valor = '';
        if (tipo_archivo == 'doc-hc') {
            descripcion_archivo = $("#descripcion_archivo_hc").val();
            valor = 2;
        }
        if (tipo_archivo == 'doc-adicional') {
            descripcion_archivo = $("#descripcion_archivo_adicional").val();
            valor = 1;
        }
        if (tipo_archivo == 'doc-receta') {
            descripcion_archivo = $("#descripcion_archivo_receta").val();
            valor = 3;
        }
        if (tipo_archivo == 'doc-op') {
            descripcion_archivo = $("#descripcion_archivo_op").val();
            valor = 7
        }

        var tr_id = $("#tr_id").val();
        var progressbar = div.find(".progressbar");
        var progress_bar = div.find(".progress-bar");
        var success = div.find(".alert-success");
        var danger = div.find(".alert-danger");
        var input = $("#validacion-" + tipo_archivo);
        progress_bar.html("0%");
        progress_bar.css("width", "0%");
        progress_bar.attr("aria-valuenow", "0");
        success.css("display", "none");
        danger.css("display", "none");

        // Checking whether FormData is available in browser  
        if (window.FormData !== undefined) {
            var fileUpload = $("#file-" + tipo_archivo).get(0);
            var files = fileUpload.files;
            //SI HAY ALGUN ARCHIVO PARA SUBIR 
            if ((fileUpload.files.length > 0)) {
                if (valor != '' && descripcion_archivo != '') {
                    var fileData = new FormData();
                    fileData.append("file", fileUpload.files[0]);
                    fileData.append('tipo_archivo', tipoArchivo(tipo_archivo));
                    fileData.append('descripcion_archivo', descripcion_archivo);
                    fileData.append("tr_id", tr_id);
                    fileData.append("tipo_documento", valor);
                    progressbar.css("display", "block");
                    $.ajax({
                        url: '../../Tramite/SubirArchivo',
                        type: "POST",
                        contentType: false, // Not to set any content header  
                        processData: false, // Not to process data  
                        data: fileData,
                        dataType: 'json',
                        success: function (data) {
                            progressbar.css("display", "none");
                            if (data.resultado) {
                                input.val("1");
                                //si es HC
                                if (data.resultado && valor == 2) {
                                    $("#div_detalle_hc").empty();
                                    var link;
                                    link = data.archivo.DESCRIPCION + "<a target='_blank' title='Descargar archivo' href='../../Tramite/Archivo/?idArchivo=" + data.archivo.FILE_ID.toString() + "'><i class='fa fa-download' aria-hidden='true'></i></a>&nbsp&nbsp&nbsp" +
                                     "<a   href='../../Tramite/eliminarArchivo/?idArchivo=" + data.archivo.FILE_ID.toString() + "' target='_blank' title='Eliminar archivo' data-toggle='modal' class='modal-eliminar' data-tramite= '" + data.archivo.TR_ID + "' data-tipo='" + data.archivo.TIPO_DOC_ID.toString() + "'  data-id='" + data.archivo.FILE_ID.toString() + "' data-target='#modal_delete_file'><i class='fa fa-trash' aria-hidden='true'></i></a>";
                                    $("#div_detalle_hc").append(link);
                                    $('#div_detalle_hc').show();
                                    $('#button_historia_clinica').hide();

                                }
                                //si es archivo es Orden orden de provision
                                if (data.resultado && valor == 7) {
                                    $("#div_detalle_op").empty();
                                    var link;
                                    var botonConfirmar;
                                    link = data.archivo.DESCRIPCION + "&nbsp&nbsp&nbsp<a target='_blank' title='Descargar archivo' href='../../Tramite/Archivo/?idArchivo=" + data.archivo.FILE_ID.toString() + "'><i class='fa fa-download' aria-hidden='true'></i></a>";
                                    $("#div_detalle_op").append(link);
                                    $('#div_detalle_op').show();
                                    $('#button_orden_provision').hide();
                                    botonConfirmar = "<button type='button' id='enviar_orden_provision' class='btn btn-success col-md-4' data-toggle='modal' data-target='#modal_confirmar_orden_provision'>Enviar Trámite con orden de Provisíón</button>";
                                    $('#div_boton_confirmar').append(botonConfirmar);
                                   // buscarAjaxOrdenProvisionPorTramite(data.archivo.TR_ID);
                                }

                                //Si es el archivo corresponde a una receta
                                if (data.resultado && valor == 3) {
                                    var nuevafila;
                                    nuevafila = "<tr>" +
                                        "<td  style='text-align: center; vertical-align: middle;'> " + data.archivo.DESCRIPCION + "</td>" +
                                        "<td  style='text-align: center; vertical-align: middle;'><a target='_blank' title='Descargar archivo' href='../../Tramite/Archivo/?idArchivo=" + data.archivo.FILE_ID.toString() + "'><i class='fa fa-download' aria-hidden='true'></i></a>&nbsp&nbsp&nbsp" +
                                        "<a   target='_blank' title='Eliminar archivo' class='modal-eliminar'  data-toggle='modal' data-target='#modal_delete_file' data-tipo='" + data.archivo.TIPO_DOC_ID.toString() + "' data-id='" + data.archivo.FILE_ID.toString() + "'  ><i class='fa fa-trash' aria-hidden='true'></i></a></td></tr></tbody>";

                                    $('#tabla_recetas tbody').append(nuevafila);
                                    buscarAjaxRecetasPorTramite(data.archivo.TR_ID);
                                    $('#descripcion_archivo_receta').val('');
                                    //$('#file-doc-receta').val('');
                                }
                                //Si el archivo corresponde a un archivo adicional 
                                if (data.resultado && valor == 1) {
                                    var nuevafila;
                                    nuevafila = "<tr>" +
                                        "<td  style='text-align: center; vertical-align: middle;'> " + data.archivo.DESCRIPCION + "</td>" +
                                        "<td  style='text-align: center; vertical-align: middle;'><a target='_blank' title='Descargar archivo' href='../../Tramite/Archivo/?idArchivo=" + data.archivo.FILE_ID.toString() + "'><i class='fa fa-download' aria-hidden='true'></i></a>&nbsp&nbsp&nbsp" +
                                        "<a   target='_blank' title='Eliminar archivo'  data-toggle='modal' class='modal-eliminar'  data-target='#modal_delete_file' data-tipo='" + data.archivo.TIPO_DOC_ID + "' data-id='" + data.archivo.FILE_ID.toString() + "'><i class='fa fa-trash' aria-hidden='true'></i></a></td></tr></tbody>";

                                    $('#tabla_archivos_adicionales tbody').append(nuevafila);
                                    buscarAjaxDocumentosAdicionalesPorTramite(data.archivo.TR_ID);
                                    $('#descripcion_archivo_adicional').val('');
                                    //$('#file-doc-adicional').val('');
                                }
                                success.css("display", "block");
                                success.find("span:first").html("Archivo subido");
                            }
                            else {
                                danger.css("display", "block");
                                danger.find("span:first").html(result);
                            }
                        },
                        error: function (err) {
                            progressbar.css("display", "none");
                            danger.css("display", "block");
                            danger.find("span:first").html(err.statusText);
                        },
                        xhr: function () {
                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener("progress", uploadProgressHandler.bind(null, tipo_archivo), false);
                            return xhr;
                        }
                    });
                }
                else {
                    progressbar.css("display", "none");
                    danger.css("display", "block");
                    danger.find("span:first").html("Ingrese una descripcion");
                }
            }
            else {
                progressbar.css("display", "none");
                danger.css("display", "block");
                danger.find("span:first").html("Ningun archivo seleccionado.");
            }

        }
        else {
            progressbar.css("display", "none");
            danger.css("display", "block");
            danger.find("span:first").html("Formato de datos invalido.");
        }
        resize();

    })

    function tipoArchivo(tipo_archivo) {
        switch (tipo_archivo) {
            case "doc-adicional":
                return "Documento adicional";
            case "doc-hc":
                return "Historia Clinica";
            case "doc-receta":
                return "Receta";
            case "doc-op":
                return "Orden de Provision";
            default:
                return null;
        }
    }


    function uploadProgressHandler(tipo_archivo, event) {
        var percent = (event.loaded / event.total) * 100;
        var progress = Math.round(percent);
        var div = $("#info-file-" + tipo_archivo);
        var progress_bar = div.find(".progress-bar");
        //Si llego al 100 el xhr seteamos 99 en la vista
        if (progress == 100) {
            progress_bar.html(progress - 1 + "%");
        }
        else {
            progress_bar.html(progress + "%");
        }
        progress_bar.css("width", progress + "%");
        progress_bar.attr("aria-valuenow", progress);
    }

    function resize() {
        var info = $(".info-file-upload");
        var div;
        if (window.innerWidth < 768) {
            div = $(".div-wrapper");
        }
        else {
            div = $(".div-wrapper").parent();
        }
        for (var i = 0; i < info.length; i++) {
            $(info.get(i)).insertAfter(div.get(i));
        }
    }

    var fecha = new Date();
    var mesActual = fecha.getMonth();
    var diaActual = fecha.getDate();
    var anoActual = fecha.getFullYear();
    var inicio = new Date(anoActual, mesActual, diaActual);

    //inicializo input Fecha Desde

    inicializarDateTimePicker();

    function inicializarDateTimePicker() {
        $(".fecha").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: inicio,
            //agrego maxDate
            maxDate: inicio,
            icons: {
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right'
            }
        });
    }

    //El numero de receta restringe a que sea sólo numeros.
    $('.obligatorio_receta').mask('0000000000000');
    //se aplica una máscara en el input fecha
    $('.formato-fecha').mask("00/00/0000", { clearIfNotMatch: true });
    //el input dni se inicializa con un placeholder
    $("#documento").attr("placeholder", "Ingrese su dni sin puntos");
    //se aplica una máscara en el input dni
    $('.formato-dni').mask('00000000');
   
});



