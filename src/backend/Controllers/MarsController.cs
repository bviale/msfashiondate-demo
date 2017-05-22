using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MSFashionDateBackend.Config;
using MSFashionDateBackend.Models;
using MSFashionDateBackend.Models.InternalDTO;
using MSFashionDateBackend.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MSFashionDateBackend.Controllers
{
    [Route("api/[controller]")]
    public class MarsController : Controller
    {
        private readonly AppSettings _appSettings;

        public MarsController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        public async Task<MarsPicturesResponse> Get(PaginationOptions paginationOptions)
        {
            var storage = new TableStorageContainer(_appSettings.StorageConnectionString);

            var collection =  await storage.GetMarsPictures();

            var totalCount = collection.Count;

            collection = collection.Skip(paginationOptions.PageIndex * paginationOptions.PageSize)
                            .Take(paginationOptions.PageSize)
                            .ToList();

            return new MarsPicturesResponse
            {
                Pagination = new PaginationOptionsResponse
                {
                    PageIndex = paginationOptions.PageIndex,
                    PageSize = paginationOptions.PageSize,
                    TotalCount = totalCount
                },
                Pictures = collection
            };
        }
    }
}
