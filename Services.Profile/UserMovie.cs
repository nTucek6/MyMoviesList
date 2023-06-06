using Entities.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Profile
{
    public class UserMovie
    {
        public int Id { get; set; }
        public string MovieName { get; set; }
        public byte[] MovieImageData { get; set; }
        public int? Score { get; set; }
        public DateTime? TimeAdded { get; set; }
        public string? Status { get; set; }
    }
}
