using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MSFashionDateBackend.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MSFashionDateBackend.Controllers
{
    [Route("api/[controller]")]
    public class TemperatureController : Controller
    {
        private static double CAPTOR1_INITIAL_VALUE = -65.00;
        private static double CAPTOR2_INITIAL_VALUE = -64.00;

        private static double Captor1Value = CAPTOR1_INITIAL_VALUE;
        private static double Captor2Value = CAPTOR2_INITIAL_VALUE;

        private static double CAPTOR1_RAND_COEF = 0.04;
        private static double CAPTOR2_RAND_COEF = 0.02;

        private static Random _r = new Random(123456789);

        // GET: api/values
        [HttpGet]
        public IEnumerable<TemperatureDataModel> Get(int? nbHistory)
        {
            var temperatures = new List<TemperatureDataModel>();

            if (!nbHistory.HasValue)
            {
                temperatures.AddRange(this.GenerateCaptorsTemperature());
            }
            else
            {
                for (var i = 0; i < nbHistory.Value; i++)
                    temperatures.AddRange(this.GenerateCaptorsTemperature());
            }
                
            return temperatures;
        }

        private IEnumerable<TemperatureDataModel> GenerateCaptorsTemperature()
        {
            var delta1 = RandomDoubleBetween(-CAPTOR1_RAND_COEF, CAPTOR1_RAND_COEF);
            var delta2 = RandomDoubleBetween(-CAPTOR2_RAND_COEF, CAPTOR2_RAND_COEF);

            Captor1Value += delta1;
            Captor2Value += delta2;

            return new List<TemperatureDataModel>
            {
                new TemperatureDataModel
                {
                    CaptorId = "captor1",
                    CelsiusValue = Captor1Value
                },
                new TemperatureDataModel
                {
                    CaptorId = "captor2",
                    CelsiusValue = Captor2Value
                }
            };
        }

        private static double RandomDoubleBetween(double min, double max)
        {
            var next = _r.NextDouble();

            return min + (next * (max - min));
        }
    }
}
