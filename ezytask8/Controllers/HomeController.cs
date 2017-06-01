using ezytask8.Models;
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
        private async Task<ForexDataViewModel> GetCurrencyData()
        {
            var forexDataViewModel = new ForexDataViewModel();
            forexDataViewModel.ForexDataList = new List<ForexData>();
            forexDataViewModel.ErrorMessage = "";
            await Task.Run(() =>
            {
                try
                {
                    Thread.Sleep(2000); //simulate slow loading
                    XDocument xmlDoc = XDocument.Load("http://www.forex.se/ratesxml.asp?id=492");
                    forexDataViewModel.ForexDataList = xmlDoc.Descendants("row").
                                    Where(x => x.Element("swift_code").Value == "EUR" ||
                                               x.Element("swift_code").Value == "USD")
                                   .Select(x => new ForexData
                                   {
                                       CurrencyCode = x.Element("swift_code").Value,
                                       Currency = decimal.Parse(x.Element("CurrencyGuide").Value),
                                       CurrencyName = x.Element("swift_name").Value
                                   }).ToList();
                    if (!forexDataViewModel.ForexDataList.Any())
                    {
                        forexDataViewModel.ErrorMessage = "No items found";
                    }
                }
                catch (Exception ex)
                {
                    forexDataViewModel.ErrorMessage = ex.Message;
                }                
            });
            return forexDataViewModel;
        }     
        public async Task<JsonResult> GetCurrencyDataAsync()
        {
            return Json(await GetCurrencyData(), JsonRequestBehavior.AllowGet);
        }  
    }
}