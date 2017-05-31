using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace ezytask8.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public async Task<List<ForexData>> CurrencyData()
        {
            List<ForexData> forexDataList = new List<ForexData>();
            await Task.Run(() =>
            {
                try
                {
                    Thread.Sleep(1000);
                    XDocument xmlDoc = XDocument.Load("http://www.forex.se/ratesxml.asp?id=492");
                    forexDataList = xmlDoc.Descendants("row").
                                    Where(x => x.Element("swift_code").Value == "EUR" || x.Element("swift_code").Value == "USD")
                                   .Select(x => new ForexData
                                   {
                                       LanguageCode = x.Element("swift_code").Value,
                                       Currency = x.Element("CurrencyGuide").Value
                                   })
                                   .ToList();
                }
                catch (Exception ex)
                {

                }                
            });
            return forexDataList;
        }     
        public async Task<JsonResult> GetCurrencyDataAsync()
        {
            return Json(await CurrencyData(), JsonRequestBehavior.AllowGet);
        }
        public class ForexData
        {
            public string LanguageCode { get; set; }
            public string Currency { get; set; }
        }

    }
}