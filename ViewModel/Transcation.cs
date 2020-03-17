using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RedhawkApps.Web.ViewModel
{
    public class Transcation
    {
        public int ErrorId { get; set; }
        public string ProcessingStatus { get; set; }
        public string CompanionPolicyNumber { get; set; }
        public int CompanyId { get; set; }
        public string FileDate { get; set; }
        public int CeaXmlId { get; set; }
    }
}