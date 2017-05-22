using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MSFashionDateBackend.Models
{
    public class MarsPictureModel : TableEntity
    {
        public int Id { get; set; }

        public DateTime EarthDate { get; set; }

        public string ImageUrl { get; set; }

        public MarsPictureCamera Camera { get; set; }

        public MarsPictureRover Rover { get; set; }

        // Storage field
        public int _Camera
        {
            get
            {
                return (int)Camera;
            }

            set
            {
                Camera = (MarsPictureCamera)value;
            }
        }

        public int _Rover
        {
            get
            {
                return (int)Rover;
            }

            set
            {
                Rover = (MarsPictureRover)value;
            }
        }
    }

    public enum MarsPictureCamera
    {
        FHAZ,
        RHAZ,
        MAST,
        CHEMCAM,
        MAHLI,
        MARDI,
        NAVCAM,
        PANCAM,
        MINITES
    }

    public enum MarsPictureRover
    {
        Curiosity,
        Opportunity,
        Spirit
    }
}
