using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MSFashionDateBackend.Models.InternalDTO
{
    public class MarsPicturesResponse
    {
        public List<MarsPictureItem> Pictures { get; set; }

        public PaginationOptionsResponse Pagination { get; set; }
    }

    public class MarsPictureItem : MarsPictureModel
    {
        public string CameraName { get { return Camera.ToString(); } }

        public string RoverName { get { return Rover.ToString(); } }
    }
}
