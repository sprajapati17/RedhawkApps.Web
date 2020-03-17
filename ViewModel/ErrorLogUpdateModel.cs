using RedhawkApps.Model.DataModel.Enum;
using RedhawkApps.Web.Models.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RedhawkApps.Web.ViewModel
{
    public class ErrorLogUpdateViewModel
    {
        public int ActivityLogPolicyId { get; set; }

        [Required]
        public string Comment { get; set; }

        //Diamond
        public int DiamondUserId { get; set; }
        public string DiamondUserName { get; set; }
    }


  
}