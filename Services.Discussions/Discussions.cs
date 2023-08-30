
namespace Services.Discussions
{
    public class Discussions
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Discussion { get; set; }
        public User User { get; set; }
        public DateTime TimePosted { get; set; }
        public int CommentsCount { get; set; }

    }
}
