using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class MovieReviewsEntity
    {
        public int Id { get; set; }
        public int UserId  { get; set; }
        public int MovieId  { get; set; }
        public string Review { get; set; }
        public DateTime TimeCreated  { get; set; }

}
}
