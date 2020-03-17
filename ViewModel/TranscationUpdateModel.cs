using RedhawkApps.Model.DataModel.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RedhawkApps.Web.ViewModel
{
    public class TranscationUpdateModel
    {
        public int ErrorId { get; set; }
        public string Comment { get; set; }
        public ProcessingStatusEnum ProcessingStatus { get; set; }
    }
}