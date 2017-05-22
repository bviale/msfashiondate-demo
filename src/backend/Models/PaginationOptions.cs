using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MSFashionDateBackend.Models
{
    public class PaginationOptions
    {
        public int PageIndex { get; set; } = 0;

        public int PageSize { get; set; } = 15;
    }

    public class PaginationOptionsResponse : PaginationOptions
    { 
        public int TotalCount { get; set; }
    }
}
