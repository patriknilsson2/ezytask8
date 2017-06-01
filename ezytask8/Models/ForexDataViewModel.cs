using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ezytask8.Models
{
    public class ForexDataViewModel
    {
        public string ErrorMessage { get; set; }
        public List<ForexData> ForexDataList { get; set; }
    }
}