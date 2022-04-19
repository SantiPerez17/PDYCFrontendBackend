using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyMusic2._0.Models.DTO
{
    public class DTOPlaylist
    {
        public long id { get; set; }
        public string name { get; set; }
        public string author { get; set; }
        public List<DTOSong> songs { get; set; }

    }
}