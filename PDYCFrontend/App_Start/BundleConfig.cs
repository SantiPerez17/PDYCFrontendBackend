using System.Web;
using System.Web.Optimization;

namespace MyMusic2._0
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery-validate-1.15.js").Include("~/Scripts/validator-bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/select2").Include("~/Content/select2.css"));

            bundles.Add(new ScriptBundle("~/bundles/js-footer").Include(
                        "~/Scripts/jquery-easing/jquery.easing.js",
                        "~/Scripts/js-sb-admin/sb-admin.js",
                        "~/Scripts/js/mdb.js",
                        "~/Scripts/dataTables/datatables.js",
                        "~/Scripts/dataTables/buttons.bootstrap4.js",
                        "~/Scripts/dataTables/buttons.html5.js",
                        "~/Scripts/dataTables/dataTables.buttons.js",
                        "~/Scripts/dataTables/jszip.js",
                        "~/Scripts/dataTables/pdfmake.js",
                        "~/Scripts/dataTables/vfs_fonts.js",
                        "~/Scripts/js/script.js",
                        "~/Scripts/jquery.mask.js",
                        "~/Scripts/moment.js",
                        "~/Scripts/moment-with-locales.js",
                        "~/Scripts/bootstrap-datetimepicker.js"));

            bundles.Add(new ScriptBundle("~/bundles/ingreso-js").Include(
                        "~/Scripts/ingreso/jquery-2.1.1.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables").Include(
                        "~/Scripts/bootstrap.bundle.js"));

            bundles.Add(new ScriptBundle("~/bundles/select2").Include("~/Scripts/select2/select2.js").Include("~/Scripts/select2/select2_es.js"));
            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información sobre los formularios. De este modo, estará
            // preparado para la producción y podrá utilizar la herramienta de creación disponible en http://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/bootstrap-datetimepicker.css",
                        "~/Content/bootstrap.css",
                        "~/Content/sb-admin.css",
                        "~/Content/icheck-bootstrap.css",
                        //"~/Content/fontawesome.css",
                        "~/Content/solid.css",
                        "~/Content/dataTables/datatables.css",
                        "~/Content/dataTables/buttons.bootstrap4.css",
                        "~/Content/estilos.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}
