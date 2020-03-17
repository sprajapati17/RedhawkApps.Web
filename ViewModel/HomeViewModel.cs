using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RedhawkApps.Web.ViewModel
{
    [Serializable]
    public class HomeViewModel
    {
        public int UserId { get; set; }
        public int CompanyId { get; set; }
        public string UserName { get; set; }
        public string LoginDomain { get; set; }
        public string Role { get; set; }
    }
}