using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MSFashionDateBackend.Models;
using MSFashionDateBackend.Models.ExternalDTO;
using System.Net;
using System.Net.Http;
using System.Globalization;
using MSFashionDateBackend.Config;
using Microsoft.Extensions.Options;
using MSFashionDateBackend.Storage;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MSFashionDateBackend.Controllers
{
    [Route("api/[controller]")]
    public class MarsParserController : Controller
    {
        const string NASA_API_KEY = "i2Fu91JU5GPX0mgjPWHNkpDfy3CTwoJ8MA8SrJd7";
        const string MARS_API_URL_FORMAT = "https://api.nasa.gov/mars-photos/api/v1/rovers/{0}/photos?earth_date={1}&api_key={2}";
        const string API_DATE_FORMAT = "yyyy-MM-dd";

        List<MarsPictureCamera> INTEREST_CAMERAS = new List<MarsPictureCamera>
        {
            MarsPictureCamera.FHAZ,
            MarsPictureCamera.RHAZ,
            MarsPictureCamera.CHEMCAM,
            MarsPictureCamera.MAHLI,
            MarsPictureCamera.MARDI,
            MarsPictureCamera.NAVCAM,
            MarsPictureCamera.PANCAM,
            MarsPictureCamera.MINITES
        };

        private readonly AppSettings _appSettings;

        public MarsParserController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        [HttpDelete]
        public async Task<string> Delete()
        {
            var storage = new TableStorageContainer(_appSettings.StorageConnectionString);
            await storage.ClearMarsPictures();
            return "OK";
        }

        [HttpGet]
        public async Task<string> Get()
        {
            var date = DateTime.Now;
            var i = 5;
            var debug = "";

            var storage = new TableStorageContainer(_appSettings.StorageConnectionString);
            var client = new HttpClient();

            while (i >= 0)
            {
                var rovers = Enum.GetValues(typeof(MarsPictureRover)).Cast<MarsPictureRover>();
                foreach (var rover in rovers)
                {
                    try
                    {
                        var url = string.Format(MARS_API_URL_FORMAT, rover.ToString().ToLower(), date.ToString(API_DATE_FORMAT), NASA_API_KEY);
                        var response = await client.GetAsync(url);

                        if (!response.IsSuccessStatusCode)
                        {
                            Console.Error.WriteLine("An HTTP error occured with request " + url);
                            break;
                        }

                        var dtoResponse = await response.Content.ReadAsAsync<MarsPictureResponseDTO>();
                        var pictures = new List<MarsPictureModel>();

                        if (dtoResponse != null && dtoResponse.photos.Count > 0)
                        {
                            foreach (var photo in dtoResponse.photos)
                            {
                                var strcamera = photo.camera == null ? null : photo.camera.name;

                                MarsPictureCamera camera;
                                Enum.TryParse(strcamera, out camera);

                                if (INTEREST_CAMERAS.Contains(camera))
                                {
                                    pictures.Add(new MarsPictureModel
                                    {
                                        Camera = camera,
                                        EarthDate = DateTime.ParseExact(photo.earth_date, API_DATE_FORMAT, CultureInfo.InvariantCulture),
                                        Id = photo.id,
                                        ImageUrl = photo.img_src,
                                        Rover = rover
                                    });
                                }
                            }

                            await storage.SavePicturesByDate(pictures, date);
                        }
                    }
                    catch(Exception e)
                    {
                        Console.Error.WriteLine("An exception occured : " + e.Message);
                    }
                }

                date = date.AddDays(-1);
                i--;
            }


            return debug;
        }
    }
}
