using Entities.Enum;

namespace Entities
{
    public class UsersMovieListEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public StatusEnum StatusId { get; set; }
        public int? Score { get; set; }
        public string? Review { get; set; }
        public DateTime TimeAdded { get; set; }
         
    }
}
