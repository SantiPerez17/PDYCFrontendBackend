using MyMusic2._0.Models;
using MyMusic2._0.Models.ViewModels;
using MyMusic2._0.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace MyMusic2._0.Controllers
{
    public class CambiarClaveController : Controller
    {
        private UserRESTService userService = new UserRESTService();

        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<bool> CambiarClave(string usuario, string password, string accessToken)
        {
            try
            {
                var user = await userService.GetUser(usuario);
                var id = user.id;

                var req = new DTOUser()
                {
                    id = id,
                    email = usuario,
                    password = password
                };

                var res = await userService.EditUser(req, accessToken);

                TempData["success"] = "Se ha cambiado la clave exitosamente.";
                RedirectToAction("Index", "Login");
                return true;
           

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al cambiar clave: " + ex.ToString();
                RedirectToAction("Index", "Login");
                return false;
            }
        }

    }
}