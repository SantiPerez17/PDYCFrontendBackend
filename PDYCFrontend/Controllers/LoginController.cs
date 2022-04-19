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
    public class LoginController : Controller
    {
        private UserRESTService userService = new UserRESTService();

        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Login");
        }

        [HttpPost]
        public async Task<string> Login(string usuario, string password)
        {
            try
            {
                var aut = "";
                var req = new User()
                {
                    email = usuario,
                    password = password
                };

                var res = await userService.Login(req);
                if (res != null) {
                    aut = res.Headers.GetValues("Authorization").ElementAt(0);
                }
                if (aut != "")
                {
                    TempData["success"] = "Se ha logueado exitosamente.";
                    return aut;
                }
                else {
                    TempData["danger"] = "Error al loguear.";
                    //RedirectToAction("Index", "Login");
                    return "";
                }               

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al loguear: " + ex.ToString();
                //RedirectToAction("Index", "Login");
                return "";
            }
        }

        [HttpDelete]
        public async Task<string> DeleteUser(string email, string accessToken)
        {
            try
            {
                
                var user = await userService.GetUser(email);
                var id = user.id;
                var res = await userService.DeleteUser(id, accessToken);

                TempData["success"] = "El user se elimino correctamente.";
                return "Baja exitosa.";

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al eliminar el user: " + ex.ToString();
                return "";
            }

        }

    }
}