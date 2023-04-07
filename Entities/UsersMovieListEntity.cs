using Entities.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class UsersMovieListEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public StatusEnum StatusId { get; set; }
        public int? Score { get; set; }
        public DateTime TimeAdded { get; set; }
    }
}
