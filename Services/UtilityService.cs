using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RedhawkApps.Web.Services
{
    public static class UtilityService
    {

        public static  string ConvertLoginDomainString(string loginDomain)
        {
            if (string.IsNullOrEmpty(loginDomain))
            {
                return string.Empty;
            }
          
            return char.ToUpper(loginDomain[0]) + loginDomain.Substring(1).ToLower();
        }
        
    }
}