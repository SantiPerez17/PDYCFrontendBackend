using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyMusic2._0.Helpers
{
    public static class NavItemHelper
    {
        public static IHtmlString MenuItem(this HtmlHelper htmlHelper, string text, string faClass, string action, string controller, string id)
        {
            var li = new TagBuilder("li");
            li.AddCssClass("nav-item");

            var routeData = htmlHelper.ViewContext.RouteData;
            var currentAction = routeData.GetRequiredString("action");
            var currentController = routeData.GetRequiredString("controller");

            if (string.Equals(currentController, controller, StringComparison.OrdinalIgnoreCase))
            {
                if (string.Equals(currentAction, action, StringComparison.OrdinalIgnoreCase))
                {
                    li.AddCssClass("nav-item-selected");
                }
            }

            //var a = htmlHelper.  .Action(text, action, controller, new { @class = "nav-link" });

            var a = new TagBuilder("a");
            a.AddCssClass("nav-link");

            UrlHelper u = new UrlHelper(htmlHelper.ViewContext.RequestContext);

            a.Attributes.Add("href", u.Action(action, controller, null));

            var i = new TagBuilder("i");
            i.AddCssClass(faClass);
            i.AddCssClass("fa-fw");
            i.AddCssClass("fa");

            var span = new TagBuilder("span");
            span.AddCssClass("nav-link-text");
            span.SetInnerText(text);

            a.InnerHtml = i.ToString() + span.ToString();

            li.InnerHtml = a.ToString();
            return new HtmlString(li.ToString());
        }
    }
}