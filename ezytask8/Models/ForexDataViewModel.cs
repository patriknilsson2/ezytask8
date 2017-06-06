using System;
using System.Collections.Generic;
using System.Globalization;
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
public static class StringHelper
{
    public static string ToTitleCase(this string s)
    {
        return CultureInfo.CurrentCulture.TextInfo.ToTitleCase(s.ToLower());
    }
}
