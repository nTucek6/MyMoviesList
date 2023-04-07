
namespace Entities
{
    public class DiscussionsCommentsEntity
    {
        public int Id { get; set; }
        public int DiscussionId { get; set; }
        public int UserId { get; set; }
        public string Comment { get; set; }
        public DateTime TimePosted { get; set; }

    }
}
