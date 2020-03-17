using Newtonsoft.Json;
using RedhawkApps.Model.DataModel;
using RedhawkApps.Model.FormModel.Auth;
using RedhawkApps.Web.Services;
using RedhawkApps.Web.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Net;
using System.Net.Http;

namespace RedhawkApps.Web.Controllers
{
    public class AuthController : Controller
    {
      
        // GET: Login
        [HttpGet]
        [Route("~/auth/login")]
        public ActionResult Login()
        {
            return View("Login");
          
        }
        

        [HttpPost]
        [Route("~/auth/login")]
        [ValidateAntiForgeryToken]
        //[CSRF]
        public async Task<ActionResult> Login(LoginModel loginFM)
        {

            try
            {
                var response = await ApiClient.LoginAsync(loginFM);

                if (response.IsSuccessStatusCode)
                {
                    var content = response.Content.ReadAsAsync<Dictionary<string, string>>();

                    HttpCookie rh_token = new HttpCookie("access_token");
                    rh_token.Value = content.Result["access_token"];
                    Response.Cookies.Add(rh_token);
                    System.Web.Security.FormsAuthentication.SetAuthCookie(loginFM.Username, false);

                    try
                    {
                        var getInfoResponse = await ApiClient.GetUserInfo(loginFM, content.Result["access_token"]);

                        var UserInfocontent = getInfoResponse.Content.ReadAsAsync<Dictionary<string, string>>();

                        var profileData = new HomeViewModel
                        {
                            UserId = Convert.ToInt32(UserInfocontent.Result["UserId"]),
                            LoginDomain = UtilityService.ConvertLoginDomainString(UserInfocontent.Result["LoginDomain"].ToString()),
                            CompanyId = Convert.ToInt32(UserInfocontent.Result["CompanyId"]),
                            UserName = UserInfocontent.Result["UserName"]
                        };

                        this.Session["UserProfile"] = profileData;
                    }
                    catch (Exception ex)
                    {
                        ModelState.AddModelError("", ex.InnerException.ToString());
                        return View("Login", new LoginModel()
                        {
                            Username = loginFM.Username,
                        });
                    }

                    return Redirect("~/");
                }
                else
                {
                    //login fails with status code from asp.net api 

                    if (response.StatusCode == System.Net.HttpStatusCode.Forbidden)
                    {
                        System.Web.Security.FormsAuthentication.SignOut();
                        return Redirect("~/auth/login");
                    }

                    else
                    {
                        //  Response.StatusCode = (int)response.StatusCode;
                        //var content = response.Content.ReadAsAsync<Dictionary<string, string>>();
                      //  ModelState.AddModelError("", content.Result["error_description"]);
                        ModelState.AddModelError("", "Invalid UserName or Password");
                        return View("Login", new LoginModel()
                        {
                            Username = loginFM.Username,
                        });
                    }

                    //return View("Login", new LoginModel()
                    //{
                    //    Username = loginFM.Username,
                    //});
                }

            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.InnerException.ToString());
                return View("Login", new LoginModel()
                {
                    Username = loginFM.Username,
                });
            }

        }

        [HttpGet]
        [Route("~/auth/logout")]
        public ActionResult Logout()
        {
            Response.Cookies[TokenConstant.kAuthCookie].Expires = DateTime.Now.AddDays(-1);
            FormsAuthentication.SignOut();
            return Redirect("~/auth/login");
        }

     



    }
}