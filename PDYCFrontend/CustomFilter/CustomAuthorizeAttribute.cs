using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace MyMusic2._0.CustomFilter
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);

            if (!filterContext.HttpContext.User.Identity.IsAuthenticated || filterContext.HttpContext.Session == null || filterContext.HttpContext.Session.Keys.Count == 0)
            {
                FormsAuthentication.SignOut();
                filterContext.Controller.TempData["danger"] = "Debe iniciar sesión para acceder a esta acción";
                filterContext.Result = new RedirectResult("~/Login/Index");
                return;
            }

            if (filterContext.Result is HttpUnauthorizedResult)
            {
                filterContext.Controller.TempData["danger"] = "No tiene los permisos para acceder a esta sección";
                filterContext.Result = new RedirectResult("~/Home/Index");
                return;
            }
        }
    }
}