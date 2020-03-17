using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RedhawkApps.Web.ViewModel
{
    public class SkipErrorLogViewModel
    {
        public int ActivityLogPolicyId { get; set; }
        public string Comment { get; set; }
        public int CEA_Xml_Id { get; set; }

        //Diamond
        public int DiamondUserId { get; set; }
        public string DiamondUserName { get; set; }
    }
}