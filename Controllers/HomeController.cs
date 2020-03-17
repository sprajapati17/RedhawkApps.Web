using Newtonsoft.Json;
using RedhawkApps.Model.DataModel;
using RedhawkApps.Model.FormModel.ErrorCorrection;
using RedhawkApps.Model.InboundXml;
using RedhawkApps.Web.Services;
using RedhawkApps.Web.ViewModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Xml;

namespace RedhawkApps.Web.Controllers
{

    [Authorize]
    public class HomeController : Controller
    {
        
        public ActionResult Index()
       {

            var profileData = this.Session["UserProfile"] as HomeViewModel;
            if (profileData == null)
            {
                FormsAuthentication.SignOut();
                return Redirect("~/auth/login");
            }
            return View("Index", profileData);

        }


        #region PI Dashboard

        [HttpGet]
        [Route("dashboard")]
        public ActionResult Dashboard()
        {
            return PartialView("_dashboard");
        }

        #endregion

        [HttpGet]
        [Route("errorlog")]
        public ActionResult ErrorLog()
        {

            return PartialView("_ErrorLog");
        }

        [HttpGet]
        [Route("errorlogfixed")]
        public ActionResult ErrorLogFixed()
        {
            return PartialView("_ErrorLogFixed");
        }

        [HttpGet]
        [Route("errorTransaction")]
        public ActionResult ErrorTransaction()
        {
            var profileData = this.Session["UserProfile"] as HomeViewModel;
            if (profileData.LoginDomain.ToString().ToLower() == "insuresoft" || profileData.LoginDomain.ToString().ToLower() == "calquake" || profileData.LoginDomain.ToString().ToLower() == "redhawk")
            {
                return PartialView("_transcation");
            }else
            {

                return new HttpUnauthorizedResult();

            }
        }

        [HttpGet]
        [Route("getInboundXml")]
        public ActionResult GetInboundXml(int id)
        {
            InboundXmlUpdateModel model = new InboundXmlUpdateModel();
            ErrorLog error = new ErrorLog();
            error.CEA_Xml_id = id;
            using (var client = new HttpClient())
            {

                try
                {
                    var token = Request.Cookies["access_token"].Value;
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiUrl"].ToString());
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                    client.DefaultRequestHeaders.Accept.Add(
                       new MediaTypeWithQualityHeaderValue("application/json"));

                    //HTTP GET 
                    var responseTask = client.PostAsJsonAsync<ErrorLog>("GetXmlFromCeaXmlId", error);
                    responseTask.Wait();

                    var result = responseTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        InboundXmlModel inboundModel = new InboundXmlModel();
                        var readTask = result.Content.ReadAsAsync<InboundXmlModel>();
                        readTask.Wait();
                        if (readTask.Result.InboundXMLString != null && readTask.Result.InboundXMLString != " ")
                        {
                            inboundModel.InboundXMLString = readTask.Result.InboundXMLString;
                            inboundModel.XmlElements = XmlClient.GetAllUniqueElements(inboundModel.InboundXMLString);
                            model.ActivityLogPolicyId = id;
                        }
                        else
                        {
                            ModelState.AddModelError(string.Empty, "Inbound XMl  Not Found");
                        }
                        model.InboundXmlModel = inboundModel;
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Server error. Please contact administrator.");
                        return RedirectToAction("ErrorLog");
                    }


                }
                catch(Exception ex)
                {
                    
                    return RedirectToAction("_ErrorLog");
                }

                return PartialView("_XmlEditorPopup",model);
            }
        }
    }
}