using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;

namespace RedhawkApps.Web {

    public class MvcApplication : HttpApplication {
        protected void Application_Start() {
            AreaRegistration.RegisterAllAreas();

            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            DevExtremeBundleConfig.RegisterBundles(BundleTable.Bundles);
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;


          

            // Uncomment to use pre-17.2 routing for .Mvc() and .WebApi() data sources
            // DevExtreme.AspNet.Mvc.Compatibility.DataSource.UseLegacyRouting = true;
            // Uncomment to use pre-17.2 behavior for the "required" validation check
            // DevExtreme.AspNet.Mvc.Compatibility.Validation.IgnoreRequiredForBoolean = false;
        }




    }

    





}
