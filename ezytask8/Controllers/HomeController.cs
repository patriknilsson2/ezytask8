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
        public async Task<JsonResult> GetCurrencyDataAsync()
        {
            return Json(await new CurrencyController().GetCurrencyData(), JsonRequestBehavior.AllowGet);
        }  
    }
}