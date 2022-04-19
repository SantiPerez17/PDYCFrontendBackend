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
    public class RegistroController : Controller
    {
        private UserRESTService userService = new UserRESTService();

        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<string> Registro(string usuario, string password)
        {
            try
            {

                var req = new User()
                {
                    email = usuario,
                    password = password
                };

                var res = await userService.AddUser(req);

                TempData["success"] = "Se ha registrado exitosamente!";
                return "Usuario registrado exitosamente!";
           

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al registrar: " + ex.ToString();
                return "";
            }
        }

    }
}