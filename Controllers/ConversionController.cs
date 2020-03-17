using Newtonsoft.Json;
using RedhawkApps.Model.FormModel.Conversion;
using RedhawkApps.Web.ViewModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RedhawkApps.Web.Controllers
{
    public class ConversionController : Controller
    {
        //GET: Conversion
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult ExecuteSingleTransaction()
        {
            ConversionSearchModel model = new ConversionSearchModel();
            return View("_SearchConversionGrid",model);
        }

        [HttpGet]
        public ActionResult Reports(bool isImplemented, string Name)
        {
            AnonymousModel am = new AnonymousModel();
            am.isImplemented = isImplemented;
            am.name = Name;
            return View("~/Views/Conversion/Reports.cshtml", am);
        }

        public string GetApiUrl()
        {
            string value = ConfigurationManager.AppSettings["ApiUrl"].Trim();

            if (!string.IsNullOrEmpty(value))
            {
                if (!value.EndsWith("/"))
                    value += "/";
            }

            return value;
        }
        public JsonResult Upload()
        {
            ConversionData request = null;
            ConversionData response = null;

            HttpPostedFileBase file = null;

            try
            {
                request = JsonConvert.DeserializeObject<ConversionData>(Request.Form[0]);
                response = request.Clone();
            }
            catch (Exception ex)
            {
                response = new ConversionData
                {
                    Error = ex.Message
                };
                return this.Json(response);
            }

            try
            {
                if (Request.Files.Count > 0)
                {
                    HttpFileCollectionBase files = Request.Files;
                    request.FileName = Path.GetFileName(Request.Files[0].FileName);
                    file = files[0];
                }
            }
            catch (Exception ex)
            {
                response.Error = ex.Message;
                return this.Json(response);
            }

            switch (request.Operation)
            {
                case ConversionOperation.UploadPreConversion601:
                case ConversionOperation.UploadPreConversionPayment:
                case ConversionOperation.UploadPreConversionAgency:
                case ConversionOperation.UploadPreConversionAgencyPolicy:
                    try
                    {
                        request.FileContent = this.GetFileContent(file);
                    }
                    catch (Exception ex)
                    {
                        response.Error = ex.Message;
                    }
                    break;
            }

            if (!response.HasError)
            {
                try
                {
                    switch (request.Operation)
                    {
                        case ConversionOperation.UploadPreConversion601:
                            //TODO:
                            response.IsPreConversionFileSaved = true;
                            break;
                        case ConversionOperation.UploadPreConversionPayment:
                            //TODO:
                            response.IsPreConversionPaymentLoaded = true;
                            break;
                        case ConversionOperation.UploadPreConversionAgency:
                            //TODO:
                            response.IsPreConversionAgencyLoaded = true;
                            break;
                        case ConversionOperation.UploadPreConversionAgencyPolicy:
                            //TODO:
                            response.IsPreConversionAgencyPolicyLinked = true;
                            break;

                        case ConversionOperation.ExecutePreConversion:
                            //TODO:
                            response.IsPreConversionExecutionCompleted = true;
                            break;
                        case ConversionOperation.ExecuteConversion:
                            //TODO:
                            response.IsConversionExecutionCompleted = true;
                            break;
                        case ConversionOperation.ExecuteReconciliation:
                            //TODO:
                            response.IsReconciliationExecutionCompleted = true;
                            break;
                    }
                }
                catch (Exception ex)
                {
                    response.Error = ex.Message;
                }
            }

            return this.Json(response);
        }

        private byte[] GetFileContent(string file)
        {
            if (!string.IsNullOrEmpty(file))
            {
                return System.IO.File.ReadAllBytes(file);
            }

            return null;
        }
        private byte[] GetFileContent(HttpPostedFileBase file)
        {
            if (file == null)
                return null;
            MemoryStream stream = new MemoryStream();
            file.InputStream.CopyTo(stream);
            byte[] data = stream.ToArray();
            return data;
        }


    }

    public class AnonymousModel
    {
        public bool isImplemented { get; set; }
        public string name { get; set; }
    }

    public class ConversionData
    {
        public ConversionUserModelData UserModel { get; set; }
        public int SessionId { get; set; }
        public string Operation { get; set; }
        public string FileName { get; set; }
        public byte[] FileContent { get; set; }
        public string Error { get; set; }
        public bool HasError
        {
            get { return !string.IsNullOrEmpty(this.Error); }
        }

        // Pre-Conversion
        public bool IsPreConversionFileSaved { get; set; }
        public string PreConversionFileName { get; set; }

        public bool IsPreConversionPaymentLoaded { get; set; }
        public bool IsPreConversionPaymentSkipped { get; set; }
        public string PreConversionPaymentFileName { get; set; }

        public bool IsPreConversionAgencyLoaded { get; set; }
        public string PreConversionDefaultAgency { get; set; }
        public string PreConversionAgencyFileName { get; set; }

        public bool IsPreConversionAgencyPolicyLinked { get; set; }
        public string PreConversionAgencyPolicyFileName { get; set; }
        // Pre-Conversion

        public bool IsPreConversionExecutionCompleted { get; set; }
        public bool IsConversionExecutionCompleted { get; set; }
        public bool IsReconciliationExecutionCompleted { get; set; }
        public ConversionData()
        {
            this.UserModel = new ConversionUserModelData();
        }
        public ConversionData Clone()
        {
            ConversionData data = new ConversionData();
            data.UserModel = this.UserModel.Clone();
            data.SessionId = this.SessionId;
            data.Operation = this.Operation;

            data.IsPreConversionFileSaved = this.IsPreConversionFileSaved;
            data.PreConversionFileName = this.PreConversionFileName;

            data.IsPreConversionPaymentLoaded = this.IsPreConversionPaymentLoaded;
            data.IsPreConversionPaymentSkipped = this.IsPreConversionPaymentSkipped;
            data.PreConversionPaymentFileName = this.PreConversionPaymentFileName;

            data.IsPreConversionAgencyLoaded = this.IsPreConversionAgencyLoaded;
            data.PreConversionDefaultAgency = this.PreConversionDefaultAgency;
            data.PreConversionAgencyFileName = this.PreConversionAgencyFileName;

            data.IsPreConversionAgencyPolicyLinked = this.IsPreConversionAgencyPolicyLinked;
            data.PreConversionAgencyPolicyFileName = this.PreConversionAgencyPolicyFileName;

            data.IsPreConversionExecutionCompleted = this.IsPreConversionExecutionCompleted;
            data.IsConversionExecutionCompleted = this.IsConversionExecutionCompleted;
            data.IsReconciliationExecutionCompleted = this.IsReconciliationExecutionCompleted;

            return data;
        }
    }
    public class ConversionUserModelData
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public ConversionUserModelData Clone()
        {
            ConversionUserModelData data = new ConversionUserModelData
            {
                UserId = this.UserId,
                UserName = this.UserName,
                Password = this.Password
            };
            return data;
        }
    }
    public static class ConversionOperation
    {
        public const string UploadPreConversion601 = "UploadPreConversion601";
        public const string UploadPreConversionPayment = "UploadPreConversionPayment";
        public const string UploadPreConversionAgency = "UploadPreConversionAgency";
        public const string UploadPreConversionAgencyPolicy = "UploadPreConversionAgencyPolicy";

        public const string ExecutePreConversion = "ExecutePreConversion";
        public const string ExecuteConversion = "ExecuteConversion";
        public const string ExecuteReconciliation = "ExecuteReconciliation";
    }
}