using RedhawkApps.Model.DataModel;
using RedhawkApps.Model.FormModel.Auth;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace RedhawkApps.Web.Services
{
    public  class ApiClient
    {

        public static string ApiEndpoint
        {
            get
            {
                string value = ConfigurationManager.AppSettings["ApiUrl"];
                return value;
            }
        }
        //public static async Task<XsrfResp> GetTokenAsync()
        //{
        //    HttpResponseMessage response = null;

        //    using (HttpClient client = new HttpClient())
        //    {
        //        client.BaseAddress = new Uri(ApiEndpoint);
        //        response = await client.GetAsync("GetAntiForgeryToken");
        //    }

        //    return await response.Content.ReadAsAsync<XsrfResp>();
        //}
        //public static async Task<string> GetTokenStringAsync(HttpResponseBase response)
        //{
        //    XsrfResp resp = await GetTokenAsync();
        //    HttpCookie cookie = new HttpCookie(
        //        TokenConstant.kAntiForgeryCookie,
        //        resp.CookieToken);
        //    cookie.Expires = DateTime.Now.AddHours(0.1);
        //    response.SetCookie(cookie);
        //    return resp.FormToken;
            

        //}

        public static async Task<HttpResponseMessage> LoginAsync(LoginModel loginModel)
        {
            HttpResponseMessage response = null;
           
            var data = new Dictionary<string, string>
            {
                {"grant_type", "password"},
                {"username", loginModel.Username},
                {"password", loginModel.Password}
            };
            var content = new FormUrlEncodedContent(data);

            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(ApiEndpoint);
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));
                response = await client.PostAsync("token", content);

            }
            return response;
            
        }

        public static async Task<HttpResponseMessage> GetUserInfo(LoginModel loginModel,string token)
        {
            HttpResponseMessage response = null;
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(ApiEndpoint);
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                response =  await client.PostAsJsonAsync("GetUserInfo", loginModel);

            }
            return response;

        }


        


    }
}