using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.PersonInfo
{
    public class MovieInfoPerson
    {
       public int Id { get; set; }
       public string MovieName { get; set; }
       public byte[] MovieImageData { get; set; }
       public string CharacterName { get; set;}

    }
}
