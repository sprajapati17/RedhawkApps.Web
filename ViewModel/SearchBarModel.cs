using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RedhawkApps.Web.ViewModel
{
    public class SearchBarModel
    {
        public string CompanionPolicyNumber { get; set; }
        public string FileStartDate { get; set; }
        public string FileEndDate { get; set; }

        public string Company { get; set; }
        public string ProcessingStatus { get; set; }
    }
}