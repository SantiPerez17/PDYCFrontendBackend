using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyMusic2._0.Models.DTO
{
    public class DTOSong
    {
        public long id { get; set; }
        public string name { get; set; }
        public string author { get; set; }
        public Genre genre { get; set; }

        //public string genreStr {
        //    get
        //    {
        //        return genre.ToString();
        //    }
        //}

    }
}