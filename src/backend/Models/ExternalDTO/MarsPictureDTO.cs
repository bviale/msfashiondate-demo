using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MSFashionDateBackend.Models.ExternalDTO
{
    // Mapped with external NASA API
    //
    public class MarsPictureDTO
    {
        public int id { get; set; }

        public MarsPictureCameraDTO camera { get; set; }

        public string img_src { get; set; }

        public string earth_date { get; set; }
    }

    public class MarsPictureCameraDTO
    {
        public string name { get; set; }
    }

    public class MarsPictureResponseDTO
    {
        public List<MarsPictureDTO> photos { get; set; }
    }
}
